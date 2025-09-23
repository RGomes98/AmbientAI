import { IconMinus, IconTrendingDown, IconTrendingUp } from '@tabler/icons-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import type { AirQuality, AirQualityWeeklyComparison } from '@/lib/schemas/air-quality.schema';
import { AlertCircle } from 'lucide-react';
import { calculateAqi } from '@/utils/air-quality.util';

const airQualityColorMap: Record<string, string> = {
  Bom: 'text-green-500',
  Moderado: 'text-yellow-500',
  Ruim: 'text-orange-500',
  Insalubre: 'text-red-600',
  'Muito Insalubre': 'text-fuchsia-800',
  Perigoso: 'text-red-800',
};

function getTrend(
  current: number,
  previous: number,
  interpretation: 'neutral' | 'lowerIsBetter' = 'neutral',
) {
  if (!previous || previous === 0) {
    return {
      percent: 0,
      icon: IconMinus,
      text: 'Sem comparação disponível',
    };
  }

  const diff = current - previous;
  const percent = (diff / previous) * 100;
  const isUp = percent >= 0;

  switch (interpretation) {
    case 'lowerIsBetter':
      return {
        percent: Number(-percent.toFixed(1)),
        icon: isUp ? IconTrendingDown : IconTrendingUp,
        text: isUp ? 'Tendência de piora' : 'Tendência de melhora',
      };

    case 'neutral':
    default:
      return {
        percent: Number(percent.toFixed(1)),
        icon: isUp ? IconTrendingUp : IconTrendingDown,
        text: isUp ? 'Tendência de alta' : 'Tendência de queda',
      };
  }
}

type SectionCardsProps = {
  latestEntry: AirQuality | null;
  averages: AirQualityWeeklyComparison | null;
};

export function SectionCards({ latestEntry, averages }: SectionCardsProps) {
  const cards = [
    {
      description: 'Temperatura Atual',
      value: latestEntry ? `${latestEntry.atmpCompensated}°C` : null,
      trend: averages
        ? getTrend(averages.thisWeekAvg.atmpCompensated, averages.lastWeekAvg.atmpCompensated)
        : null,
      footerDetail: 'Comparado à média da última semana',
    },
    {
      description: 'Umidade Atual',
      value: latestEntry ? `${latestEntry.rhumCompensated}%` : null,
      trend: averages
        ? getTrend(averages.thisWeekAvg.rhumCompensated, averages.lastWeekAvg.rhumCompensated)
        : null,
      footerDetail: 'Comparado à média da última semana',
    },
    {
      description: 'Concentração de CO₂',
      value: latestEntry ? `${latestEntry.rco2} ppm` : null,
      trend: averages ? getTrend(averages.thisWeekAvg.rco2, averages.lastWeekAvg.rco2) : null,
      footerDetail: 'Comparado à média da última semana',
    },
    {
      description: 'Qualidade do Ar',
      value: latestEntry ? calculateAqi(latestEntry).category : null,
      valueColor: latestEntry ? airQualityColorMap[calculateAqi(latestEntry).category] : null,
      trend: averages
        ? getTrend(averages.thisWeekAvg.pm02, averages.lastWeekAvg.pm02, 'lowerIsBetter')
        : null,
      footerDetail: 'Comparado à média da última semana',
    },
  ];

  return (
    <div className='*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-4 @xl/main:grid-cols-2 @5xl/main:grid-cols-4'>
      {cards.map((card, index) => {
        if (!card.value || !card.trend) {
          return (
            <div
              key={index}
              className='bg-card/50 flex h-[182px] w-full flex-col items-center justify-center gap-2 rounded-xl p-4 text-center shadow-xs'
            >
              <AlertCircle className='text-muted-foreground/60 h-10 w-10' />
              <span className='text-foreground text-lg font-semibold'>Dados Indisponíveis</span>
              <span className='text-muted-foreground text-sm'>
                O sensor pode estar offline ou sincronizando as informações.
              </span>
            </div>
          );
        }

        const TrendIcon = card.trend.icon;

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
                  {card.trend.percent > 0 ? `+${card.trend.percent}%` : `${card.trend.percent}%`}
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className='flex-col items-start gap-1.5 text-sm'>
              <div className='line-clamp-1 flex items-center gap-1.5 font-medium'>
                {card.trend.text} <TrendIcon className='size-4' />
              </div>
              <div className='text-muted-foreground'>{card.footerDetail}</div>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}
