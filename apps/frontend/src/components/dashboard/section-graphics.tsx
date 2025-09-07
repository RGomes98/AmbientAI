'use client';

import { AirQuality } from '@/lib/schemas/air-quality.schema';
import { GaugeChart } from './gauge-chart';
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card';

export function SectionGraphics({ latestEntry }: { latestEntry: AirQuality | null }) {
  if (!latestEntry) {
    return null; //Adicinar Empty State
  }

  return (
    <Card className='@container/card mx-4 gap-4 lg:mx-4'>
      <CardHeader>
        <CardTitle>Concentração de Poluentes no Ar</CardTitle>
        <CardDescription>
          <span className='hidden @[540px]/card:block'>
            Indicadores atualizados sobre a composição do ar, com foco nos principais poluentes monitorados.
          </span>
          <span className='@[540px]/card:hidden'>Níveis atuais dos principais poluentes do ar</span>
        </CardDescription>
      </CardHeader>
      <div className='*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-5'>
        <GaugeChart
          value={latestEntry.pm25}
          maxValue={55}
          label='PM₂.₅'
          description='Partículas Finas'
          units='µg/m³'
          color='#f97316'
        />
        <GaugeChart
          value={latestEntry.pm10}
          maxValue={155}
          label='PM₁₀'
          description='Partículas Grossas'
          units='µg/m³'
          color='#eab308'
        />
        <GaugeChart
          value={latestEntry.no2}
          maxValue={360}
          label='NO₂'
          description='Dióxido de Nitrogênio'
          units='ppb'
          color='#ef4444'
        />
        <GaugeChart
          value={latestEntry.so2}
          maxValue={185}
          label='SO₂'
          description='Dióxido de Enxofre'
          units='ppb'
          color='#d946ef'
        />
        <GaugeChart
          value={latestEntry.co}
          maxValue={12.4}
          label='CO'
          description='Monóxido de Carbono'
          units='ppm'
          color='#64748b'
        />
      </div>
    </Card>
  );
}
