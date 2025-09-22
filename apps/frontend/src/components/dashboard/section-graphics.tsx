'use client';

import { AirQuality } from '@/lib/schemas/air-quality.schema';
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { GaugeChart } from './gauge-chart';

export function SectionGraphics({ latestEntry }: { latestEntry: AirQuality | null }) {
  return (
    <Card className='@container/card mx-4 gap-4 pb-0 lg:mx-4'>
      <CardHeader>
        <CardTitle>Concentração de Poluentes no Ar</CardTitle>
        <CardDescription>
          <span className='hidden @[540px]/card:block'>
            Indicadores atualizados sobre a composição do ar, com foco nos principais poluentes monitorados.
          </span>
          <span className='@[540px]/card:hidden'>Níveis atuais dos principais poluentes do ar</span>
        </CardDescription>
      </CardHeader>
      <div className='*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] justify-items-center gap-2 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-4'>
        <GaugeChart
          value={latestEntry?.pm01 ?? null}
          maxValue={150}
          label='PM₀.₁'
          description='Partículas Ultrafinas'
          units='µg/m³'
          color='#0ea5e9'
        />
        <GaugeChart
          value={latestEntry?.pm02 ?? null}
          maxValue={150}
          label='PM₂.₅'
          description='Partículas Finas'
          units='µg/m³'
          color='#f97316'
        />
        <GaugeChart
          value={latestEntry?.pm10 ?? null}
          maxValue={300}
          label='PM₁₀'
          description='Partículas Grossas'
          units='µg/m³'
          color='#eab308'
        />
        <GaugeChart
          value={latestEntry?.co2 ?? null}
          maxValue={2000}
          label='CO₂'
          description='Dióxido de Carbono'
          units='ppm'
          color='#22c55e'
        />
        <GaugeChart
          value={latestEntry?.tvocIndex ?? null}
          maxValue={1000}
          label='TVOC'
          description='Compostos Voláteis'
          units=' Índice'
          color='#a855f7'
        />
        <GaugeChart
          value={latestEntry?.noxIndex ?? null}
          maxValue={10}
          label='NOx'
          description='Óxidos de Nitrogênio'
          units=' Índice'
          color='#ef4444'
        />
      </div>
    </Card>
  );
}
