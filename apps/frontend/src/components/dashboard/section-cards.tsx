import { IconTrendingDown, IconTrendingUp } from '@tabler/icons-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import type { AirQuality } from '@/lib/schemas/air-quality.schema';

const airQualityMap = {
  Good: { label: 'Boa', color: 'text-green-500' },
  Moderate: { label: 'Moderada', color: 'text-yellow-500' },
  Poor: { label: 'Ruim', color: 'text-orange-500' },
  Hazardous: { label: 'Perigosa', color: 'text-red-500' },
};

export function SectionCards({ latestEntry }: { latestEntry: AirQuality | null }) {
  if (!latestEntry) {
    return null; //Adicinar Empty State
  }

  const { label, color } = airQualityMap[latestEntry.airQuality];

  return (
    <div className='*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-4 @xl/main:grid-cols-2 @5xl/main:grid-cols-4'>
      <Card className='@container/card'>
        <CardHeader>
          <CardDescription>Temperatura Atual</CardDescription>
          <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
            {latestEntry.temperature}°C
          </CardTitle>
          <CardAction>
            <Badge variant='outline'>
              <IconTrendingUp />
              +12.5%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className='flex-col items-start gap-1.5 text-sm'>
          <div className='line-clamp-1 flex gap-2 font-medium'>
            Tendência de alta este mês <IconTrendingUp className='size-4' />
          </div>
          <div className='text-muted-foreground'>Média comparada aos últimos 3 meses</div>
        </CardFooter>
      </Card>
      <Card className='@container/card'>
        <CardHeader>
          <CardDescription>Umidade Atual</CardDescription>
          <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
            {latestEntry.humidity}%
          </CardTitle>
          <CardAction>
            <Badge variant='outline'>
              <IconTrendingDown />
              -20%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className='flex-col items-start gap-1.5 text-sm'>
          <div className='line-clamp-1 flex gap-2 font-medium'>
            Queda de 20% neste período <IconTrendingDown className='size-4' />
          </div>
          <div className='text-muted-foreground'>Comparado à média dos últimos 3 meses</div>
        </CardFooter>
      </Card>
      <Card className='@container/card'>
        <CardHeader>
          <CardDescription>Índice de Proximidade Industrial</CardDescription>
          <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
            {latestEntry.proximityToIndustrialAreas}%
          </CardTitle>
          <CardAction>
            <Badge variant='outline'>
              <IconTrendingUp />
              +12.5%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className='flex-col items-start gap-1.5 text-sm'>
          <div className='line-clamp-1 flex gap-2 font-medium'>
            Aumento da exposição industrial <IconTrendingUp className='size-4' />
          </div>
          <div className='text-muted-foreground'>Média de distância e influência industrial</div>
        </CardFooter>
      </Card>
      <Card className='@container/card'>
        <CardHeader>
          <CardDescription>Qualidade do Ar</CardDescription>
          <CardTitle className={`text-2xl font-semibold tabular-nums @[250px]/card:text-3xl ${color}`}>
            {label}
          </CardTitle>
          <CardAction>
            <Badge variant='outline'>
              <IconTrendingUp />
              +4.5%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className='flex-col items-start gap-1.5 text-sm'>
          <div className='line-clamp-1 flex gap-2 font-medium'>
            Melhora contínua na qualidade <IconTrendingUp className='size-4' />
          </div>
          <div className='text-muted-foreground'>Índice baseado em múltiplos poluentes atmosféricos</div>
        </CardFooter>
      </Card>
    </div>
  );
}
