import { verifyToken } from '@/utils/jwt';
import { prisma } from '@/lib/db';

export async function GET(req: Request) {
  const token = req.headers.get('Authorization')?.replace('Bearer ', '');

  if (!token) return new Response('No token', { status: 401 });

  try {
    const decoded = verifyToken(token) as any;

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: { id: true, name: true, email: true },
    });

    return Response.json({ user });
  } catch (err) {
    return new Response('Invalid token', { status: 403 });
  }
}
