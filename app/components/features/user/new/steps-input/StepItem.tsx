import { Button } from '~/components/ui/button';
import { Textarea } from '~/components/ui/textarea';
import { Trash2 } from 'lucide-react';
import { TimeField } from './time-field/TimeField';

type Step = {
  minutes: number;
  seconds: number;
  action: string;
};

type StepItemProps = {
  step: Step;
  index: number;
  onUpdate: (index: number, field: keyof Step, value: number | string) => void;
  onRemove: (index: number) => void;
};

export const StepItem = ({
  step,
  index,
  onUpdate,
  onRemove,
}: StepItemProps) => {
  return (
    <div key={index} className="flex items-center space-x-2">
      <TimeField
        minutes={step.minutes}
        seconds={step.seconds}
        onChange={(minutes, seconds) => {
          onUpdate(index, 'minutes', minutes);
          onUpdate(index, 'seconds', seconds);
        }}
      />
      <Textarea
        placeholder="Action"
        value={step.action}
        onChange={(e) => onUpdate(index, 'action', e.target.value)}
        className="min-h-[2.5rem] flex-grow resize-none"
        rows={1}
      />
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onRemove(index)}
        className="h-10 w-10"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
};
