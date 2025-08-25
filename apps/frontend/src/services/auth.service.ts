import { ENV } from '@/env';
import { SessionSchema } from '@/lib/schemas/user.schema';

import { Session } from '@/utils/session.util';

export async function getCurrentUser() {
  try {
    const token = await Session.getAuthorizationToken('access_token');

    if (!token) {
      throw new Error('unauthorized');
    }

    const response = await fetch(`${ENV.SERVER_URL}/auth/me`, {
      method: 'GET',
      next: { revalidate: 0 },
      headers: { Authorization: Session.generateAuthorizationHeaders(token) },
    });

    if (!response.ok) {
      const message = await response.text();
      throw new Error(`Failed to fetch user data: ${message}`);
    }

    return SessionSchema.parse(await response.json());
  } catch (error) {
    console.error(error);
    return null;
  }
}
