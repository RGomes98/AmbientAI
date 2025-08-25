'use client';

import type { Session } from '@/lib/schemas/user.schema';
import { createContext, useContext, type ReactNode } from 'react';

const SessionContext = createContext<Session | null>(null);

interface SessionProviderProps {
  children: ReactNode;
  session: Session | null;
}

export function SessionProvider({ children, session }: SessionProviderProps) {
  return <SessionContext.Provider value={session}>{children}</SessionContext.Provider>;
}

export function useSession() {
  const context = useContext(SessionContext);

  if (!context) {
    throw new Error('useSession must be used within a SessionProvider');
  }

  return context;
}
