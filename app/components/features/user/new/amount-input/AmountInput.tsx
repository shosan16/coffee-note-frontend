import { useState, useRef } from 'react';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { Slider } from '~/components/ui/slider';
import { Card, CardContent } from '~/components/ui/card';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '~/components/ui/popover';
import { Minus, Plus } from 'lucide-react';
import { useAmountInput } from './useAmountInput';

type AmountInput = {
  label: string;
  value: number;
  maxValue: number;
  step: number;
  quickAdjustValues: number[];
  icon: React.ReactNode;
  allowDecimal?: boolean;
};

type AmountInputProps = AmountInput & {
  onChange: (value: number) => void;
};

export const AmountInput = (props: AmountInputProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    label,
    value,
    maxValue,
    step,
    quickAdjustValues,
    icon,
    allowDecimal = false,
    onChange,
  } = props;

  const {
    formatValue,
    inputValue,
    setInputValue,
    handleValueChange,
    handleEnterKeyDown,
    handleQuickAdjust,
  } = useAmountInput({
    value,
    allowDecimal,
    maxValue,
    onChange,
    onEnter: () => setIsOpen(false),
    inputRef,
    isOpen,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputBlur = () => {
    const parsed = parseFloat(inputValue);
    handleValueChange(isNaN(parsed) ? 0 : parsed);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        {icon}
        <Label htmlFor={`amount-input-${label}`}>{label}</Label>
      </div>
      <Popover open={isOpen} onOpenChange={setIsOpen} modal={false}>
        <PopoverTrigger asChild>
          <Button
            id={`amount-input-${label}`}
            variant="outline"
            className="w-full justify-between text-left font-normal"
          >
            <span>{formatValue(value)}g</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <Card>
            <CardContent className="space-y-6 pt-4">
              <div className="flex items-center justify-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleValueChange(value - step)}
                  disabled={value <= 0}
                  className="h-10 w-10"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <div className="relative">
                  <Input
                    ref={inputRef}
                    type="number"
                    value={inputValue}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    onKeyDown={handleEnterKeyDown}
                    className="w-24 pr-6 text-center text-lg"
                    min={0}
                    max={maxValue}
                    step={step}
                  />
                  <span className="text-muted-foreground absolute right-2 top-1/2 -translate-y-1/2 text-sm">
                    g
                  </span>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleValueChange(value + step)}
                  disabled={value >= maxValue}
                  className="h-10 w-10"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-2">
                <Slider
                  value={[value]}
                  onValueChange={([v]) => handleValueChange(v)}
                  max={maxValue}
                  step={step}
                  className="w-full"
                />
                <div className="text-muted-foreground flex justify-between text-sm">
                  <span>0g</span>
                  <span>{maxValue}g</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {Array.isArray(quickAdjustValues) &&
                  quickAdjustValues.map((quickValue) => (
                    <Button
                      key={quickValue}
                      variant={value === quickValue ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => handleQuickAdjust(quickValue)}
                      className="flex-1"
                    >
                      {formatValue(quickValue)}g
                    </Button>
                  ))}
              </div>
            </CardContent>
          </Card>
        </PopoverContent>
      </Popover>
    </div>
  );
};
