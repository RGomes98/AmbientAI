'use client';

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';

import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { useState } from 'react';
import { AirQuality } from '@/lib/schemas/air-quality.schema';
import { calculateAqi } from '@/utils/air-quality.util';
import { useRouter, useSearchParams } from 'next/navigation';
import { Query } from '@/utils/query.util';
import z from 'zod';
import { useMobile } from '@/hooks/shared/useMobile.hook';

const chartConfig = {
  value: {
    label: 'AQI',
    color: 'var(--primary)',
  },
} satisfies ChartConfig;

const timeRangeDescriptions: { [key: string]: { long: string; short: string } } = {
  '14d': { long: 'Total para os últimos 14 dias', short: 'Últimos 14 dias' },
  '7d': { long: 'Total para os últimos 7 dias', short: 'Últimos 7 dias' },
  '1d': { long: 'Total para as últimas 24 horas', short: 'Últimas 24 horas' },
};

export function ChartAreaInteractive({ data }: { data: AirQuality[] }) {
  const searchParams = useSearchParams();
  const initialRange = z.enum(['1d', '7d', '14d']).catch('7d').parse(searchParams.get('range'));

  const [timeRange, setTimeRange] = useState<string>(initialRange);
  const isMobile = useMobile();
  const router = useRouter();

  if (!data.length) {
    return null; //Adicinar Empty State
  }

  const currentDescription = timeRangeDescriptions[timeRange];

  const chartData = data.map(({ co, no2, pm10, pm25, so2, timestamp }) => ({
    value: calculateAqi({ co, no2, pm10, pm25, so2 }).aqi,
    timestamp,
  }));

  function handleChangeTimeRange(range: string) {
    if (typeof window === 'undefined') return;
    setTimeRange(range);

    const url = Query.mutateParamsToURL({
      type: 'set',
      params: { range },
      url: window.location.href,
    });

    if (!url) return;
    router.push(url.toString(), { scroll: false });
  }

  return (
    <Card className='@container/card mx-4 lg:mx-4'>
      <CardHeader>
        <CardTitle>Índice de Qualidade do Ar (AQI)</CardTitle>
        <CardDescription>
          <span className='hidden @[540px]/card:block'>{currentDescription.long}</span>
          <span className='@[540px]/card:hidden'>{currentDescription.short}</span>
        </CardDescription>
        <CardAction>
          <ToggleGroup
            type='single'
            value={timeRange}
            onValueChange={(value) => {
              if (value) handleChangeTimeRange(value);
            }}
            variant='outline'
            className='hidden *:data-[slot=toggle-group-item]:!px-4 @[767px]/card:flex'
          >
            <ToggleGroupItem className='cursor-pointer' value='14d'>
              Últimos 14 dias
            </ToggleGroupItem>
            <ToggleGroupItem className='cursor-pointer' value='7d'>
              Últimos 7 dias
            </ToggleGroupItem>
            <ToggleGroupItem className='cursor-pointer' value='1d'>
              Últimas 24 horas
            </ToggleGroupItem>
          </ToggleGroup>
          <Select
            value={timeRange}
            onValueChange={(value) => {
              if (value) handleChangeTimeRange(value);
            }}
          >
            <SelectTrigger
              className='flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden'
              size='sm'
              aria-label='Select a value'
            >
              <SelectValue placeholder='Last 3 months' />
            </SelectTrigger>
            <SelectContent className='rounded-xl'>
              <SelectItem value='14d' className='cursor-pointer rounded-lg'>
                Últimos 14 dias
              </SelectItem>
              <SelectItem value='7d' className='cursor-pointer rounded-lg'>
                Últimos 7 dias
              </SelectItem>
              <SelectItem value='1d' className='cursor-pointer rounded-lg'>
                Últimas 24 horas
              </SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
      <CardContent className='px-2 pt-4 sm:px-6 sm:pt-6'>
        <ChartContainer config={chartConfig} className='aspect-auto h-[250px] w-full'>
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id='fillValue' x1='0' y1='0' x2='0' y2='1'>
                <stop offset='20%' stopColor='var(--color-aqi-warning)' stopOpacity={0.8} />
                <stop offset='95%' stopColor='var(--color-aqi-ok)' stopOpacity={0.6} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} strokeDasharray='3 3' />
            <XAxis
              dataKey='timestamp'
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString('pt-BR', { month: 'short', day: 'numeric' });
              }}
            />
            <YAxis tickLine={false} axisLine={false} tickMargin={8} width={30} />
            <ChartTooltip
              cursor={false}
              defaultIndex={isMobile ? -1 : 10}
              content={
                <ChartTooltipContent
                  indicator='dashed'
                  labelFormatter={(_title, content) => {
                    const { payload } = content[0];
                    return new Date(payload?.timestamp).toLocaleDateString('pt-BR', {
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    });
                  }}
                />
              }
            />
            <Area
              stackId={1}
              dataKey='value'
              type='stepBefore'
              fill='url(#fillValue)'
              stroke='url(#fillValue)'
              activeDot={{ fill: 'transparent' }}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
