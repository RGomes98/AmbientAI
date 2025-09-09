import type { AirQuality } from '@/lib/schemas/air-quality.schema';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';

export function DashboardHeader({ latestEntry }: { latestEntry: AirQuality | null }) {
  let formatted: string | null = null;

  if (latestEntry) {
    formatted = new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).format(new Date(latestEntry.timestamp));
  }

  return (
    <header className='flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)'>
      <div className='flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6'>
        <SidebarTrigger className='-ml-1 cursor-pointer' />
        <Separator orientation='vertical' className='mx-2 data-[orientation=vertical]:h-4' />
        <div className='ml-auto flex items-center gap-2'>
          <span className='text-base font-medium max-sm:hidden'>Monitoramento Ambiental</span>
          {formatted ? (
            <p className='text-xs'>(Última Atualização: {formatted})</p>
          ) : (
            <p className='text-muted-foreground text-xs'>(Nenhuma atualização disponível)</p>
          )}
        </div>
      </div>
    </header>
  );
}
