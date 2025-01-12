import { useEffect } from 'react';
import { Button } from '~/components/ui/button';
import { Clock } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '~/components/ui/popover';
import { Card, CardContent } from '~/components/ui/card';
import { useTimeField } from './useTimeField';
import { TimeFieldSelect } from './TimeFieldSelect';

type TimeFieldProps = {
  minutes: number;
  seconds: number;
  className?: string;
  onChange: (minutes: number, seconds: number) => void;
};

export const TimeField = ({
  minutes,
  seconds,
  className,
  onChange,
}: TimeFieldProps) => {
  const {
    minutes: selectedMinutes,
    seconds: selectedSeconds,
    handleMinuteChange,
    handleSecondChange,
  } = useTimeField(minutes, seconds);

  /**
   * 時間選択のオプションを生成する関数。
   *
   * @param maxValue - 最大値
   * @param interval - オプション間の間隔（例: 5分ごとの選択肢を作る場合は5）
   * @returns 時間のオプション配列（例: ['00', '05', '10', '15']）
   */
  const generateTimeOptions = (
    maxValue: number,
    interval: number = 1,
  ): string[] => {
    const options: string[] = [];
    const optionCount: number = Math.ceil(maxValue / interval);
    for (let i = 0; i < optionCount; i++) {
      const value: string = (i * interval).toString().padStart(2, '0');
      options.push(value);
    }
    return options;
  };

  const minuteOptions: string[] = generateTimeOptions(16);
  const secondOptions: string[] = generateTimeOptions(60, 5);

  useEffect(() => {
    onChange(parseInt(selectedMinutes, 10), parseInt(selectedSeconds, 10));
  }, [selectedMinutes, selectedSeconds, onChange]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={`w-[120px] justify-start text-left font-normal ${className}`}
        >
          <Clock className="mr-2 h-4 w-4" />
          {selectedMinutes}:{selectedSeconds}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="start" side="bottom">
        <Card className="border-0">
          <CardContent className="p-3">
            <div className="flex justify-between space-x-4">
              <TimeFieldSelect
                label="Minutes"
                value={selectedMinutes}
                onValueChange={handleMinuteChange}
                options={minuteOptions}
              />
              <TimeFieldSelect
                label="Seconds"
                value={selectedSeconds}
                onValueChange={handleSecondChange}
                options={secondOptions}
              />
            </div>
          </CardContent>
        </Card>
      </PopoverContent>
    </Popover>
  );
};
