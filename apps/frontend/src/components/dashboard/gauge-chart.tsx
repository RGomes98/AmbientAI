import { RadialBarChart, RadialBar, PolarAngleAxis } from 'recharts';
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '../ui/chart';
import { AlertCircle } from 'lucide-react';

type GaugeChartProps = {
  value: number | null;
  maxValue: number;
  label: string;
  description: string;
  units: string;
  color?: string;
  minValue?: number;
  endAngle?: number;
  startAngle?: number;
};

export function GaugeChart({
  value,
  maxValue,
  label,
  units,
  description,
  color,
  minValue = 0,
  endAngle = 0,
  startAngle = 180,
}: GaugeChartProps) {
  if (value === null) {
    return (
      <div className='from-primary/5 to-card dark:from-primary/10 dark:to-card my-6 flex h-[175px] w-full flex-col items-center justify-center gap-2 rounded-xl bg-gradient-to-t p-4 text-center shadow-xs'>
        <AlertCircle className='text-muted-foreground/60 h-10 w-10' />
        <span className='text-foreground text-lg font-semibold'>Sem Leitura</span>
        <span className='text-muted-foreground text-sm'>
          Não há dados de &quot;{description}&quot; no momento.
        </span>
      </div>
    );
  }

  const totalAngleSpan = Math.abs(endAngle - startAngle);
  const clampedValue = Math.max(minValue, Math.min(value, maxValue));
  const percent = (clampedValue - minValue) / (maxValue - minValue);

  const filledValue = percent * totalAngleSpan;
  const data = [{ name: 'value', value: filledValue, realValue: value }];

  const chartConfig = {
    value: {
      label: label,
      color: 'var(--primary)',
    },
  } satisfies ChartConfig;

  return (
    <div className='relative h-full w-fit'>
      <ChartContainer
        config={chartConfig}
        className='mx-auto aspect-square w-full max-w-[225px] min-w-[225px]'
      >
        <RadialBarChart
          cx='50%'
          cy='65%'
          data={data}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={95}
          outerRadius={135}
        >
          <PolarAngleAxis type='number' domain={[0, totalAngleSpan]} tick={false} />
          <RadialBar dataKey='value' fill={color} background={{ fill: '#eee' }} cornerRadius={5} />
          <ChartTooltip
            cursor={false}
            content={
              <ChartTooltipContent
                indicator='dot'
                labelFormatter={() => description}
                formatter={(_value, _name, props) => {
                  const color = props.color;
                  const realValue = props.payload.realValue;

                  return (
                    <div className='flex w-full items-center gap-2'>
                      <span style={{ backgroundColor: color }} className='h-2.5 w-2.5 shrink-0 rounded-xs' />
                      <div className='flex w-full justify-between'>
                        <span className='text-foreground'>{label}</span>
                        <span className='text-foreground font-semibold'>{realValue.toFixed(1)}</span>
                      </div>
                    </div>
                  );
                }}
              />
            }
          />
        </RadialBarChart>
      </ChartContainer>
      <div className='absolute top-[52%] left-[50%] z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col gap-1 text-center'>
        <div className='flex items-end justify-center gap-0.5'>
          <span className='text-foreground font-poppins text-[1rem] leading-none font-semibold'>
            {value.toFixed(1)}
          </span>
          <span className='text-foreground font-poppins text-[0.65rem] leading-3.5 font-semibold'>
            {units}
          </span>
        </div>
        <span className='text-foreground font-roboto text-[0.75rem]'>{description}</span>
      </div>
      <div className='font-poppins text-foreground absolute bottom-12 flex w-full items-center justify-between pr-0.5 pl-2 text-sm font-semibold'>
        <span>{minValue}</span>
        <span>{maxValue}</span>
      </div>
    </div>
  );
}
