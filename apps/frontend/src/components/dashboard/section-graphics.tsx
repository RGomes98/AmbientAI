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
          value={latestEntry?.pm01Count ?? null}
          maxValue={150}
          label='PM₀.₁'
          description='Partículas Ultrafinas'
          units='/0.1L'
          color='#0ea5e9'
        />
        <GaugeChart
          value={latestEntry?.pm02Count ?? null}
          maxValue={25}
          label='PM₂.₅'
          description='Partículas Finas'
          units='/0.1L'
          color='#f97316'
        />
        <GaugeChart
          value={latestEntry?.pm003Count ?? null}
          maxValue={500}
          label='PM₀.₃'
          description='Partículas Médias'
          units='/0.1L'
          color='#eab308'
        />
        <GaugeChart
          value={latestEntry?.pm005Count ?? null}
          maxValue={500}
          label='PM₀.₅'
          description='Partículas Grossas'
          units='/0.1L'
          color='#14b8a6'
        />
        <GaugeChart
          value={latestEntry?.rco2 ?? null}
          maxValue={5000}
          label='CO₂'
          description='Dióxido de Carbono'
          units='ppm'
          color='#22c55e'
        />
        <GaugeChart
          value={latestEntry?.tvocIndex ?? null}
          maxValue={500}
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
