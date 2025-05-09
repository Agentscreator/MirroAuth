import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import { Pool } from 'pg'

const pool = new Pool({ connectionString: process.env.DATABASE_URL })

export async function POST(req: Request) {
  const { fullName, birthday, username, password, phone } = await req.json()
  const hashed = await bcrypt.hash(password, 10)

  try {
    await pool.query(
      'INSERT INTO users (full_name, birthday, username, password_hash, phone_number) VALUES ($1, $2, $3, $4, $5)',
      [fullName, birthday, username, hashed, phone]
    )
    return NextResponse.json({ message: 'User registered successfully' })
  } catch (err) {
    return NextResponse.json({ error: 'Registration failed' }, { status: 500 })
  }
}
