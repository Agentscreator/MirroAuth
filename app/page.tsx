"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to landing page for new users
    // In a real app, you would check if the user is authenticated
    // and redirect accordingly
    router.push("/landing")
  }, [router])

  return null
}
