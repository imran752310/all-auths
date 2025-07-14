"use client"

import Link from 'next/link';
import React, { useState } from 'react'

export default function UserForm() {

 const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
  console.log('Sending data:', { name, email, password });

  try {
    const res = await fetch('/api/auth/register',
        { 
            method : "POST" , 
            headers : {'Content-Type': 'application/json'}, 
            body: JSON.stringify({name,email,password})
        }
    )

    const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Something went wrong');

      setMessage('User created successfully!');
      setName('');
      setEmail('');
      setPassword('');

  } catch (err: any) {
      setMessage(err.message || 'Failed to create user');
    }
}

  return (
    <div>
        <div className="max-w-md mx-auto mt-10 p-6 border rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">Register New User</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Create Account
        </button>

      </form>

    <div>
        <Link href="/login/"
          
          className="w-full  py-2 rounded text-center hover:bg-blue-700"
        >
          Login
        </Link>
    </div>

      {message && (
        <p className="mt-4 text-center text-sm text-red-600">{message}</p>
      )}

    
    </div>
       
    </div>
  )
}

