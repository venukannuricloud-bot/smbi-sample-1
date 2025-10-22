import { useState, ReactNode } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ChartCardProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  timeframes?: { label: string; value: string }[];
  onTimeframeChange?: (value: string) => void;
  className?: string;
}

export default function ChartCard({
  title,
  subtitle,
  children,
  timeframes,
  onTimeframeChange,
  className = '',
}: ChartCardProps) {
  const [selectedTimeframe, setSelectedTimeframe] = useState(
    timeframes?.[0]?.value || '30d'
  );

  const handleTimeframeChange = (value: string) => {
    setSelectedTimeframe(value);
    onTimeframeChange?.(value);
    console.log('Timeframe changed to:', value);
  };

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <CardTitle>{title}</CardTitle>
            {subtitle && <CardDescription>{subtitle}</CardDescription>}
          </div>
          {timeframes && timeframes.length > 0 && (
            <Tabs value={selectedTimeframe} onValueChange={handleTimeframeChange}>
              <TabsList>
                {timeframes.map((timeframe) => (
                  <TabsTrigger
                    key={timeframe.value}
                    value={timeframe.value}
                    data-testid={`tab-${timeframe.value}`}
                  >
                    {timeframe.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          )}
        </div>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
