import { prisma } from '@/lib/db';
import { hashPassword } from '@/utils/hash';

export async function POST(req: Request) {
  const { name, email, password } = await req.json();

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) return new Response('User exists', { status: 400 });

  const hashed = await hashPassword(password);
  const user = await prisma.user.create({
    data: { name, email, password: hashed },
  });

  return Response.json({ user });
}
