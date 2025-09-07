import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLogin } from '@/hooks/login/useLogin.hook';
import { LoaderCircle } from 'lucide-react';

export function LoginForm({ className, ...props }: React.ComponentProps<'form'>) {
  const { isLoading, handleLogin } = useLogin();

  return (
    <form method='POST' onSubmit={handleLogin} className={cn('flex flex-col gap-6', className)} {...props}>
      <div className='flex flex-col items-center gap-2 text-center'>
        <h1 className='text-3xl font-bold'>AmbientAI</h1>
        <p className='text-muted-foreground text-sm text-balance'>
          Sua plataforma de monitoramento e educação ambiental.
        </p>
      </div>
      <div className='grid gap-6'>
        <div className='grid gap-3'>
          <Label htmlFor='username'>E-mail</Label>
          <Input id='username' name='username' type='email' placeholder='email@exemplo.com' required />
        </div>
        <div className='grid gap-3'>
          <div className='flex items-center'>
            <Label htmlFor='password'>Senha</Label>
          </div>
          <Input id='password' name='password' type='password' placeholder='********' required />
        </div>
        <Button disabled={isLoading} type='submit' className='w-full cursor-pointer'>
          {isLoading ? <LoaderCircle className='h-5 w-5 animate-spin text-white' /> : 'Entrar'}
        </Button>
      </div>
    </form>
  );
}
