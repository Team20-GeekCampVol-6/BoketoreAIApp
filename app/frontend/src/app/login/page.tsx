'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const handleSignUp = async () => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    })
    if (error) {
      setMessage(`Error: ${error.message}`)
    } else {
      setMessage('Confirmation email sent! Please check your inbox.')
    }
  }

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (error) {
      setMessage(`Error: ${error.message}`)
    } else {
      // Redirect to home page after successful login
      window.location.href = '/'
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center">Login / Sign Up</h1>
        <div className="space-y-4">
          <div>
            <label htmlFor="email" className="text-sm font-medium">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 mt-1 border rounded-md"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label htmlFor="password" className="text-sm font-medium">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 mt-1 border rounded-md"
              placeholder="••••••••"
            />
          </div>
        </div>
        <div className="flex flex-col space-y-4">
          <button onClick={handleLogin} className="px-4 py-2 font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600">
            Login
          </button>
          <button onClick={handleSignUp} className="px-4 py-2 font-semibold text-white bg-green-500 rounded-md hover:bg-green-600">
            Sign Up
          </button>
        </div>
        {message && <p className="text-center text-red-500">{message}</p>}
      </div>
    </div>
  )
}
