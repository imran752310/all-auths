'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function UserForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter(); // ✅ App Router compatible

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log('Sending data:', { email, password });

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include', // ✅ Recommended if using HttpOnly cookies
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || 'Something went wrong');

      // Optional: set cookie manually if not HttpOnly
      document.cookie = `token=${data.token}; path=/`;

      // ✅ Redirect to dashboard
      router.push('/dashboard');
    } catch (err: any) {
      console.error('Login error:', err.message);
      alert('Login failed');
    }
  };

  return (
    <div>
      <div className="max-w-md mx-auto mt-10 p-6 border rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
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
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

