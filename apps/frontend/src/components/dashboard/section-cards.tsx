import { IconTrendingDown, IconTrendingUp } from '@tabler/icons-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import type { AirQuality } from '@/lib/schemas/air-quality.schema';
import { AlertCircle } from 'lucide-react';

const airQualityMap = {
  Good: { label: 'Boa', color: 'text-green-500' },
  Moderate: { label: 'Moderada', color: 'text-yellow-500' },
  Poor: { label: 'Ruim', color: 'text-orange-500' },
  Hazardous: { label: 'Perigosa', color: 'text-red-500' },
};

export function SectionCards({ latestEntry }: { latestEntry: AirQuality | null }) {
  const cards = [
    {
      description: 'Temperatura Atual',
      value: latestEntry ? `${latestEntry.temperature}°C` : null,
      trend: { icon: IconTrendingUp, label: '+12.5%' },
      footer: { main: 'Tendência de alta este mês', detail: 'Comparado à média dos últimos 3 meses' },
    },
    {
      description: 'Umidade Atual',
      value: latestEntry ? `${latestEntry.humidity}%` : null,
      trend: { icon: IconTrendingDown, label: '-20%' },
      footer: { main: 'Queda de 20% neste período', detail: 'Comparado à média dos últimos 3 meses' },
    },
    {
      description: 'Índice de Proximidade Industrial',
      value: latestEntry ? `${latestEntry.proximityToIndustrialAreas}%` : null,
      trend: { icon: IconTrendingUp, label: '+12.5%' },
      footer: {
        main: 'Aumento da exposição industrial',
        detail: 'Média de distância e influência industrial',
      },
    },
    {
      description: 'Qualidade do Ar',
      value: latestEntry ? airQualityMap[latestEntry.airQuality].label : null,
      trend: { icon: IconTrendingUp, label: '+4.5%' },
      footer: {
        main: 'Melhora contínua na qualidade',
        detail: 'Índice baseado em múltiplos poluentes atmosféricos',
      },
      valueColor: latestEntry ? airQualityMap[latestEntry?.airQuality].color : null,
    },
  ];

  return (
    <div className='*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-4 @xl/main:grid-cols-2 @5xl/main:grid-cols-4'>
      {cards.map((card, index) => {
        const TrendIcon = card.trend.icon;

        if (!card.value) {
          return (
            <div
              key={index}
              className='from-primary/5 to-card dark:from-primary/10 dark:to-card flex h-[182px] w-full flex-col items-center justify-center gap-2 rounded-xl bg-gradient-to-t p-4 text-center shadow-xs'
            >
              <AlertCircle className='text-muted-foreground/70 h-10 w-10' />
              <span className='text-foreground text-lg font-semibold'>Nenhum dado</span>
              <span className='text-muted-foreground text-sm'>
                Não há registros disponíveis para os indicadores atuais.
              </span>
            </div>
          );
        }

        return (
          <Card key={card.description} className='@container/card'>
            <CardHeader>
              <CardDescription>{card.description}</CardDescription>
              <CardTitle
                className={`text-2xl font-semibold tabular-nums @[250px]/card:text-3xl ${card.valueColor}`}
              >
                {card.value}
              </CardTitle>
              <CardAction>
                <Badge variant='outline'>
                  <TrendIcon />
                  {card.trend.label}
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className='flex-col items-start gap-1.5 text-sm'>
              <div className='line-clamp-1 flex gap-2 font-medium'>
                {card.footer.main} <TrendIcon className='size-4' />
              </div>
              <div className='text-muted-foreground'>{card.footer.detail}</div>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}
