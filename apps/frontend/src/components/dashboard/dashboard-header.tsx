'use client';

import type { AirQuality } from '@/lib/schemas/air-quality.schema';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import { useMobile } from '@/hooks/shared/useMobile.hook';

export function DashboardHeader({ latestEntry }: { latestEntry: AirQuality | null }) {
  let displayText: string | null = null;
  const isMobile = useMobile();

  if (latestEntry) {
    const date = new Date(latestEntry.timestamp);

    displayText = isMobile
      ? date.toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: 'long',
          hour: '2-digit',
          minute: '2-digit',
          timeZone: 'America/Sao_Paulo',
        })
      : date.toLocaleDateString('pt-BR', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          timeZone: 'America/Sao_Paulo',
        });
  }

  return (
    <header className='flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)'>
      <div className='flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6'>
        <SidebarTrigger className='-ml-1 cursor-pointer' />
        <Separator orientation='vertical' className='mx-2 data-[orientation=vertical]:h-4' />
        <div className='flex w-full items-center justify-between gap-2'>
          <span className='text-base font-medium max-sm:hidden'>Monitoramento Ambiental</span>
          {displayText ? (
            <div className='ml-auto'>
              <p className='hidden text-xs max-sm:block'>(Atual: {displayText})</p>
              <p className='text-xs max-sm:hidden'>(Última Atualização: {displayText})</p>
            </div>
          ) : (
            <div className='ml-auto'>
              <p className='text-muted-foreground hidden text-xs max-sm:block'>(Sem atualização)</p>
              <p className='text-muted-foreground text-xs max-sm:hidden'>(Nenhuma atualização disponível)</p>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
