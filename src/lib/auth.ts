import { SignJWT, jwtVerify } from 'jose';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';

// Admin credentials - password is hashed with bcrypt
const ADMIN_USERNAME = 'AdminSK4';
const ADMIN_PASSWORD_HASH = bcrypt.hashSync('Adminsuk@raya4', 10);

// JWT secret key - in production use env variable
const JWT_SECRET = new TextEncoder().encode('tpq-almanshurin-secret-key-2026-sk4');
const COOKIE_NAME = 'tpq_admin_token';

export async function verifyCredentials(username: string, password: string): Promise<boolean> {
  if (username !== ADMIN_USERNAME) return false;
  return bcrypt.compareSync(password, ADMIN_PASSWORD_HASH);
}

export async function createToken(): Promise<string> {
  return new SignJWT({ role: 'admin', username: ADMIN_USERNAME })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(JWT_SECRET);
}

export async function verifyToken(token: string): Promise<boolean> {
  try {
    await jwtVerify(token, JWT_SECRET);
    return true;
  } catch {
    return false;
  }
}

export async function getAuthStatus(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return false;
  return verifyToken(token);
}

export { COOKIE_NAME };
