'use client';

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { BarChart2 } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AirQuality } from '@/lib/schemas/air-quality.schema';
import { Query } from '@/utils/query.util';
import { useMobile } from '@/hooks/shared/useMobile.hook';
import { DayRangeQueryParamSchema } from '@/lib/schemas/query.schema';

const metrics = {
  tvocIndex: {
    heading: { widescreen: 'Compostos Orgânicos Voláteis (TVOC)', mobile: 'TVOC' },
    description: { long: 'Níveis de compostos orgânicos voláteis', short: 'TVOC' },
  },
  rco2: {
    heading: { widescreen: 'Dióxido de Carbono (CO₂)', mobile: 'CO₂' },
    description: { long: 'Níveis de dióxido de carbono no ambiente', short: 'CO₂' },
  },
  noxIndex: {
    heading: { widescreen: 'Óxidos de Nitrogênio (NOx)', mobile: 'NOx' },
    description: { long: 'Níveis de óxidos de nitrogênio no ar', short: 'NOx' },
  },
  pm01Standard: {
    heading: { widescreen: 'Material Particulado PM1.0', mobile: 'PM1.0' },
    description: { long: 'Concentração de partículas PM1.0 no ar', short: 'PM1.0' },
  },
  pm02Standard: {
    heading: { widescreen: 'Material Particulado PM2.5', mobile: 'PM2.5' },
    description: { long: 'Concentração de partículas PM2.5 no ar', short: 'PM2.5' },
  },
  pm10Standard: {
    heading: { widescreen: 'Material Particulado PM10', mobile: 'PM10' },
    description: { long: 'Concentração de partículas PM10 no ar', short: 'PM10' },
  },
  atmpCompensated: {
    heading: { widescreen: 'Temperatura do Ar', mobile: 'Temperatura' },
    description: { long: 'Temperatura do ar registrada no ambiente', short: 'Temperatura' },
  },
  rhumCompensated: {
    heading: { widescreen: 'Umidade Relativa do Ar', mobile: 'Umidade' },
    description: { long: 'Umidade relativa do ar registrada', short: 'Umidade' },
  },
};

const timeRangeDescriptions: { [key: string]: { long: string; short: string } } = {
  '14d': { long: 'nos últimos 14 dias', short: 'Últimos 14 dias' },
  '7d': { long: 'nos últimos 7 dias', short: 'Últimos 7 dias' },
  '1d': { long: 'nas últimas 24 horas', short: 'Últimas 24 horas' },
};

type Metric = keyof typeof metrics;

export function ChartAreaInteractive({ data }: { data: AirQuality[] }) {
  const searchParams = useSearchParams();
  const initialRange = DayRangeQueryParamSchema.parse(searchParams.get('range'));

  const [selectedMetric, setSelectedMetric] = useState<Metric>('atmpCompensated');
  const [timeRange, setTimeRange] = useState<string>(initialRange);
  const isMobile = useMobile();
  const router = useRouter();

  const chartData = data.toReversed().map((data) => ({
    value: data[selectedMetric],
    timestamp: data.timestamp,
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

  const chartConfig = {
    value: {
      label: `${metrics[selectedMetric].heading.widescreen}:\u00A0\u00A0`,
      color: 'var(--primary)',
    },
  } satisfies ChartConfig;

  return (
    <Card className='@container/card mx-4 min-h-[335px] gap-2 lg:mx-4'>
      <CardHeader className='flex justify-between gap-2 max-sm:gap-4 min-md:items-center'>
        <div className='flex flex-col gap-1'>
          <CardTitle className='hidden @[540px]/card:block'>
            {metrics[selectedMetric].heading.widescreen}
          </CardTitle>
          <CardTitle className='@[540px]/card:hidden'>{metrics[selectedMetric].heading.mobile}</CardTitle>
          <CardDescription>
            <span className='hidden @[540px]/card:block'>
              {metrics[selectedMetric].description.long} {timeRangeDescriptions[timeRange].long}
            </span>
            <span className='@[540px]/card:hidden'>
              {metrics[selectedMetric].description.short} {timeRangeDescriptions[timeRange].short}
            </span>
          </CardDescription>
        </div>
        <CardAction className='flex gap-2 max-md:flex-col max-sm:items-end'>
          <Select value={selectedMetric} onValueChange={(value) => setSelectedMetric(value as Metric)}>
            <SelectTrigger
              className='w-40 cursor-pointer max-md:order-1 max-sm:w-fit'
              size='sm'
              aria-label='Selecione métrica'
            >
              <SelectValue placeholder='Selecione métrica' />
            </SelectTrigger>
            <SelectContent className='rounded-xl'>
              {Object.entries(metrics).map(([key, { description }]) => (
                <SelectItem key={key} value={key} className='cursor-pointer rounded-lg'>
                  {description.short}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={timeRange}
            onValueChange={(value) => {
              if (value) handleChangeTimeRange(value);
            }}
          >
            <SelectTrigger
              className='w-40 cursor-pointer max-sm:w-fit'
              size='sm'
              aria-label='Selecione o período'
            >
              <SelectValue placeholder='Selecione o período' />
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
      <CardContent className='h-full px-2 pt-4 sm:px-6 sm:pt-6'>
        <ChartContainer config={chartConfig} className='aspect-auto h-full w-full'>
          {chartData.length === 0 ? (
            <div className='text-muted-foreground flex flex-col items-center justify-center gap-3 pt-3 pb-12 text-center'>
              <BarChart2 className='text-muted-foreground/70 h-12 w-12' />
              <h3 className='text-lg font-semibold'>Nenhum dado disponível</h3>
              <p className='text-muted-foreground max-w-sm text-sm'>
                Não há dados para o período selecionado. Ajuste os filtros ou escolha outro intervalo de
                tempo.
              </p>
            </div>
          ) : (
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
              <YAxis tickLine={false} axisLine={false} tickMargin={8} width={40} />
              <ChartTooltip
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
          )}
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
