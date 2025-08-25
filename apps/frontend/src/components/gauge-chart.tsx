import { RadialBarChart, RadialBar, PolarAngleAxis, Text } from 'recharts';
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from './ui/chart';

type GaugeChartProps = {
  value: number;
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
    <div className='relative h-full w-full'>
      <ChartContainer config={chartConfig} className='mx-auto aspect-square w-full max-w-[250px]'>
        <RadialBarChart
          cx='50%'
          cy='65%'
          data={data}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={105}
          outerRadius={150}
        >
          <PolarAngleAxis type='number' domain={[0, totalAngleSpan]} tick={false} />
          <RadialBar dataKey='value' fill={color} background={{ fill: '#eee' }} cornerRadius={5} />
          <ChartTooltip
            cursor={false}
            content={
              <ChartTooltipContent
                indicator='dot'
                labelFormatter={() => 'Índice'}
                formatter={(value, name, props) => {
                  const color = props.color;
                  const realValue = props.payload.realValue;

                  return (
                    <div className='flex w-full items-center gap-2'>
                      <span style={{ backgroundColor: color }} className='h-2.5 w-2.5 shrink-0 rounded-xs' />
                      <div className='flex w-full justify-between'>
                        <span className='text-gray-600'>{label}</span>
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
      <div className='absolute top-[55%] left-[50%] z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col gap-0.5 text-center'>
        <Text className='text-foreground font-poppins text-[1.35rem] font-semibold'>{`${value.toFixed(1)}${units}`}</Text>
        <Text className='text-foreground font-roboto text-[0.85rem]'>{description}</Text>
      </div>
      <div className='font-poppins text-foreground absolute bottom-12 flex w-full items-center justify-around gap-22 text-sm font-semibold'>
        <span>{minValue}</span>
        <span>{maxValue}</span>
      </div>
    </div>
  );
}
