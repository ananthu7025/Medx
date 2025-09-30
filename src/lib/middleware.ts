import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from './auth';
import { AuthUser, UserRole } from '@/types';
import { parse } from 'cookie';

export function getAuthUser(request: NextRequest): AuthUser | null {
  const cookies = parse(request.headers.get('cookie') || '');
  const token = cookies.token;

  if (!token) {
    return null;
  }

  return verifyToken(token);
}

export function requireAuth(
  handler: (req: NextRequest, user: AuthUser) => Promise<Response>
) {
  return async (req: NextRequest) => {
    const user = getAuthUser(req);

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    return handler(req, user);
  };
}

export function requireRole(roles: UserRole[]) {
  return (handler: (req: NextRequest, user: AuthUser) => Promise<Response>) => {
    return requireAuth(async (req, user) => {
      if (!roles.includes(user.role)) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
      }

      return handler(req, user);
    });
  };
}