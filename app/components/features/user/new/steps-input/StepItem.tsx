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
  isFirst: boolean;
  onMinutesChange: (newMinutes: string) => void;
  onSecondsChange: (newSeconds: string) => void;
  onActionChange: (newAction: string) => void;
  onRemove: () => void;
};

export const StepItem = ({
  step,
  isFirst,
  onMinutesChange,
  onSecondsChange,
  onActionChange,
  onRemove,
}: StepItemProps) => {
  const handleMinutesChange = (newMinutes: string) => {
    onMinutesChange(newMinutes);
  };

  const handleSecondsChange = (newSeconds: string) => {
    onSecondsChange(newSeconds);
  };

  return (
    <div className="flex items-center space-x-2">
      <TimeField
        minutes={step.minutes}
        seconds={step.seconds}
        onChange={(updatedMinutes, updatedSeconds) => {
          handleMinutesChange(updatedMinutes.toString());
          handleSecondsChange(updatedSeconds.toString());
        }}
      />
      <Textarea
        placeholder="Action"
        value={step.action}
        onChange={(e) => onActionChange(e.target.value)}
        className="min-h-[2.5rem] flex-grow resize-none"
        rows={1}
      />

      {!isFirst ? (
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onRemove()}
          className="h-10 w-10"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      ) : (
        <div className="h-10 w-10" />
      )}
    </div>
  );
};
