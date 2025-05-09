import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { Pool } from 'pg'

const pool = new Pool({ connectionString: process.env.DATABASE_URL })

export async function POST(req: Request) {
  const { username, password } = await req.json()

  try {
    // 1. Get user from DB
    const result = await pool.query(
      'SELECT id, username, password_hash FROM users WHERE username = $1',
      [username]
    )

    const user = result.rows[0]

    if (!user) {
      return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 })
    }

    // 2. Compare password
    const isMatch = await bcrypt.compare(password, user.password_hash)

    if (!isMatch) {
      return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 })
    }

    // 3. Generate JWT
    const token = jwt.sign(
      { userId: user.id, username: user.username },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    )

    // 4. Return token
    return NextResponse.json({ token, user: { id: user.id, username: user.username } })

  } catch (err) {
    console.error('Login error:', err)
    return NextResponse.json({ error: 'Login failed' }, { status: 500 })
  }
}
