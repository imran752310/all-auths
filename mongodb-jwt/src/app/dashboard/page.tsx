// // app/dashboard/page.tsx
// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';

// export default function Dashboard() {
//   const [user, setUser] = useState<{ name: string; email: string } | null>(null);
//   const router = useRouter();

//   useEffect(() => {
//     const fetchProfile = async () => {
//       const res = await fetch('/api/auth/profile', {
//         credentials: 'include', // 🔑 Required to send cookie
//       });

     
//       const data = await res.json();
//       setUser(data.user);
//     };

//     fetchProfile();
//   }, []);

  
//   return (
//     <div className="p-10">
//       <h1>Welcome to Dashboard!</h1>
//     </div>
//   );
// }



'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];

      if (!token) return router.push('/login');

      const res = await fetch('/api/auth/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        router.push('/login');
      } else {
        const data = await res.json();
        setUser(data.user);
      }
    };

    fetchProfile();
  }, []);

  if (!user) return <p>Loading...</p>;

  return (
    <div className="p-10 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Welcome to Dashboard, {user.name}!</h1>
      <table className="w-full border mt-4">
        <tbody>
          <tr>
            <td className="border p-2">Name</td>
            <td className="border p-2">{user.name}</td>
          </tr>
          <tr>
            <td className="border p-2">Email</td>
            <td className="border p-2">{user.email}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
