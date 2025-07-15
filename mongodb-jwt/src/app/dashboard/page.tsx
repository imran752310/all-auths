// app/dashboard/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await fetch('/api/auth/profile', {
        credentials: 'include', // 🔑 Required to send cookie
      });

     
      const data = await res.json();
      setUser(data.user);
    };

    fetchProfile();
  }, []);

  
  return (
    <div className="p-10">
      <h1>Welcome to Dashboard!</h1>
    </div>
  );
}
