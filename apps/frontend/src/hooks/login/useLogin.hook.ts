import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { LoginPayloadSchema } from '@/lib/schemas/user.schema';

export function useLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    setIsLoading(true);
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    try {
      const body = LoginPayloadSchema.parse({
        username: formData.get('username'),
        password: formData.get('password'),
      });

      const response = await fetch('/api/session/login', { method: 'POST', body: JSON.stringify(body) });
      const message = await response.json();

      if (!response.ok) {
        toast.error(message);
        return;
      }

      toast.success(message);
      router.push('/dashboard');
    } catch (error) {
      console.error('Falha ao realizar o login', error);
    } finally {
      setIsLoading(false);
    }
  }

  return { isLoading, handleLogin };
}
