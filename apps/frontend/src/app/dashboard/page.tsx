import { ChartAreaInteractive } from '@/components/dashboard/chart-area-interactive';
import { DashboardHeader } from '@/components/dashboard/dashboard-header';
import { SectionCards } from '@/components/dashboard/section-cards';
import { SectionGraphics } from '@/components/dashboard/section-graphics';
import { Sidebar } from '@/components/shared/sidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

import {
  getFilteredAirQuality,
  getLatestAirQuality,
  getWeeklyAverages,
} from '@/services/air-quality.service';

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
  const query = { take: String(200), startTimestamp: start, endTimestamp: end };

  const averages = await getWeeklyAverages();
  const latestData = await getLatestAirQuality();
  const chartData = await getFilteredAirQuality(query);

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
        <DashboardHeader latestEntry={latestData} />
        <div className='flex flex-1 flex-col'>
          <div className='@container/main flex flex-1 flex-col gap-2'>
            <div className='grid h-full grid-rows-[fit-content(100%)_fit-content(100%)_auto] gap-4 py-4 md:gap-4 md:py-4'>
              <SectionCards latestEntry={latestData} averages={averages} />
              <SectionGraphics latestEntry={latestData} />
              <ChartAreaInteractive data={chartData} />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
