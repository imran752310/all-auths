// // 'use client';

// // import { useEffect, useState } from 'react';
// // import { useRouter } from 'next/navigation';

// // export default function Dashboard() {
// //   const [user, setUser] = useState<{ name: string; email: string } | null>(null);
// //   const router = useRouter();

// //   useEffect(() => {
// //     const fetchProfile = async () => {
// //       const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];

// //       if (!token) return router.push('/login');

// //       const res = await fetch('/api/auth/profile', {
// //         headers: {
// //           Authorization: `Bearer ${token}`,
// //         },
// //       });

// //       if (!res.ok) {
// //         router.push('/login');
// //       } else {
// //         const data = await res.json();
// //         setUser(data.user);
// //       }
// //     };

// //     fetchProfile();
// //   }, []);

// //   if (!user) return <p>Loading...</p>;

// //   return (
// //     <div className="p-10 max-w-2xl mx-auto">
// //       <h1 className="text-2xl font-bold mb-4">Welcome to Dashboard, {user.name}!</h1>
// //       <table className="w-full border mt-4">
// //         <tbody>
// //           <tr>
// //             <td className="border p-2">Name</td>
// //             <td className="border p-2">{user.name}</td>
// //           </tr>
// //           <tr>
// //             <td className="border p-2">Email</td>
// //             <td className="border p-2">{user.email}</td>
// //           </tr>
// //         </tbody>
// //       </table>
// //     </div>
// //   );
// // }


// // // // src/app/dashboard/page.tsx
// // // 'use client'; // Only if using client hooks like useEffect

// // // import React from 'react';

// // // export default function DashboardPage() {
// // //   return (
// // //     <div className="p-10">
// // //       <h1 className="text-2xl font-bold">Welcome to your Dashboard</h1>
// // //     </div>
// // //   );
// // // }


// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';

// export default function Dashboard() {
//   const [user, setUser] = useState<{ name: string; email: string } | null>(null);
//   const router = useRouter();

//   useEffect(() => {
//     const fetchProfile = async () => {
//       const token = document.cookie
//         .split('; ')
//         .find(row => row.startsWith('token='))?.split('=')[1];

//       if (!token) {
//         console.warn('⚠️ No token found, redirecting...');
//         return router.push('/login');
//       }

//       const res = await fetch('/api/auth/profile', {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (!res.ok) {
//         console.warn('⚠️ Profile fetch failed, redirecting...');
//         router.push('/login');
//       } else {
//         const data = await res.json();
//         setUser(data.user);
//       }
//     };

//     // Delay slightly to let cookies be set
//     setTimeout(fetchProfile, 300); // 🛠️ delay helps after redirect
//   }, []);

//   if (!user) return <p>Loading...</p>;

//   return (
//     <div className="p-10 max-w-2xl mx-auto">
//       <h1 className="text-2xl font-bold mb-4">Welcome to Dashboard, {user.name}!</h1>
//       <table className="w-full border mt-4">
//         <tbody>
//           <tr>
//             <td className="border p-2">Name</td>
//             <td className="border p-2">{user.name}</td>
//           </tr>
//           <tr>
//             <td className="border p-2">Email</td>
//             <td className="border p-2">{user.email}</td>
//           </tr>
//         </tbody>
//       </table>
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
      try {
        const res = await fetch('/api/auth/profile', {
          credentials: 'include', // ✅ send cookie
        });

        if (!res.ok) {
          router.push('/login');
          return;
        }

        const data = await res.json();
        setUser(data.user);
      } catch (err) {
        console.error('Fetch error:', err);
        router.push('/login');
      }
    };

    fetchProfile();
  }, []);

  if (!user) return <p>Loading...</p>;

  return (
    <div className="p-10">
      <h1 className="text-xl">Welcome to Dashboard, {user.name}</h1>
    </div>
  );
}
