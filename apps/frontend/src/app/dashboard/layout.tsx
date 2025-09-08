import { SessionProvider } from '@/providers/session.provider';
import { getCurrentUser } from '@/services/auth.service';

export default async function ProtectedLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const session = await getCurrentUser();
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
