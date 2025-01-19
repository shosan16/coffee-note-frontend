import { Button } from '~/components/ui/button';
import { Textarea } from '~/components/ui/textarea';
import { Trash2 } from 'lucide-react';
import { TimeField } from './time-field/TimeField';

type Step = {
  id: string;
  minutes: number;
  seconds: number;
  action: string;
};

type StepItemProps = {
  step: Step;
  onUpdate: (id: string, field: keyof Step, value: string | string) => void;
  onRemove: (id: string) => void;
};

export const StepItem = ({ step, onUpdate, onRemove }: StepItemProps) => {
  return (
    <div className="flex items-center space-x-2">
      <TimeField
        minutes={step.minutes}
        seconds={step.seconds}
        onChange={(updatedMinutes, updatedSeconds) => {
          onUpdate(step.id, 'minutes', updatedMinutes.toString());
          onUpdate(step.id, 'seconds', updatedSeconds.toString());
        }}
      />
      <Textarea
        placeholder="Action"
        value={step.action}
        onChange={(e) => onUpdate(step.id, 'action', e.target.value)}
        className="min-h-[2.5rem] flex-grow resize-none"
        rows={1}
      />
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onRemove(step.id)}
        className="h-10 w-10"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
};
