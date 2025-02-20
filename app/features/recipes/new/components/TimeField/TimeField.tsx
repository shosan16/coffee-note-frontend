import { useMemo } from 'react';
import { Button } from '~/shared/components/ui/button';
import { Clock } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '~/shared/components/ui/popover';
import { Card, CardContent } from '~/shared/components/ui/card';
import { useTimeField } from '~/features/recipes/new/hooks/useTimeField';
import { TimeFieldSelect } from './TimeFieldSelect';

type TimeFieldProps = {
  minutes: number;
  seconds: number;
  onChange: (minutes: number, seconds: number) => void;
};

export const TimeField = ({ minutes, seconds, onChange }: TimeFieldProps) => {
  const { minuteValue, secondValue, handleMinuteChange, handleSecondChange } =
    useTimeField(minutes, seconds, onChange);

  /**
   * 時間選択のオプションを生成する関数。
   *
   * @param maxValue - 最大値
   * @param interval - オプション間の間隔（例: 5分ごとの選択肢を作る場合は5）
   * @returns 時間のオプション配列（例: ['00', '05', '10', '15']）
   */
  const generateTimeOptions = (maxValue: number, interval: number = 1) => {
    const options: string[] = [];
    const optionCount: number = Math.ceil(maxValue / interval);
    for (let i = 0; i < optionCount; i++) {
      options.push((i * interval).toString().padStart(2, '0'));
    }
    return options;
  };

  const minuteOptions = useMemo(() => generateTimeOptions(16), []);
  const secondOptions = useMemo(() => generateTimeOptions(60, 5), []);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-[200px] justify-center text-left font-normal"
        >
          <Clock className="mr-2 h-4 w-4" />
          {String(minuteValue).padStart(2, '0')}:
          {String(secondValue).padStart(2, '0')}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-50 p-0" align="center" side="bottom">
        <Card className="border-0">
          <CardContent className="p-3">
            <div className="flex space-x-4">
              <TimeFieldSelect
                label="Minutes"
                selectedValue={minuteValue}
                onValueChange={(value) =>
                  handleMinuteChange(parseInt(value, 10))
                }
                options={minuteOptions}
              />
              <TimeFieldSelect
                label="Seconds"
                selectedValue={secondValue}
                onValueChange={(value) =>
                  handleSecondChange(parseInt(value, 10))
                }
                options={secondOptions}
              />
            </div>
          </CardContent>
        </Card>
      </PopoverContent>
    </Popover>
  );
};
