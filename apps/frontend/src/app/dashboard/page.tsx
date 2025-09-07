import { Sidebar } from '@/components/shared/sidebar';
import { ChartAreaInteractive } from '@/components/dashboard/chart-area-interactive';
import { SectionCards } from '@/components/dashboard/section-cards';
import { DashboardHeader } from '@/components/dashboard/dashboard-header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { getFilteredAirQuality, getLatestAirQuality } from '@/services/air-quality.service';
import { SectionGraphics } from '@/components/dashboard/section-graphics';

import z from 'zod';

type DashboardProps = { searchParams: Promise<{ range?: string }> };

const QUERY_RANGES = ['1d', '7d', '14d'] as const;

export default async function Dashboard({ searchParams }: DashboardProps) {
  const params = await searchParams;
  const range = z.enum(QUERY_RANGES).catch('7d').parse(params.range);
  const days = { [QUERY_RANGES[0]]: 1, [QUERY_RANGES[1]]: 7, [QUERY_RANGES[2]]: 14 }[range] ?? 7;

  const now = new Date();
  const startDate = new Date(now);
  startDate.setDate(startDate.getDate() - days);

  const end = now.toISOString();
  const start = startDate.toISOString();

  const latestData = await getLatestAirQuality();
  const chartData = await getFilteredAirQuality({
    take: String(200),
    startTimestamp: start,
    endTimestamp: end,
  });

  return (
    <SidebarProvider
      style={
        {
          '--sidebar-width': 'calc(var(--spacing) * 72)',
          '--header-height': 'calc(var(--spacing) * 12)',
        } as React.CSSProperties
      }
    >
      <Sidebar variant='inset' />
      <SidebarInset>
        <DashboardHeader />
        <div className='flex flex-1 flex-col'>
          <div className='@container/main flex flex-1 flex-col gap-2'>
            <div className='grid grid-rows-[auto_auto_auto] gap-4 py-4 md:gap-4 md:py-4'>
              <SectionCards latestEntry={latestData} />
              <SectionGraphics latestEntry={latestData} />
              <ChartAreaInteractive data={chartData} />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
