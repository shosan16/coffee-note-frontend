import { Button } from '~/shared/components/ui/button';
import { Textarea } from '~/shared/components/ui/textarea';
import { Trash2 } from 'lucide-react';
import { TimeField } from '../TimeField/TimeField';
import { Step } from '../../stores/useStepStore';

type StepItemProps = {
  step: Step;
  isFirst: boolean;
  index: number;
  errors: Record<string, string>;
  onMinutesChange: (newMinutes: string) => void;
  onSecondsChange: (newSeconds: string) => void;
  onActionChange: (newAction: string) => void;
  onRemove: () => void;
};

export const StepItem = ({
  step,
  isFirst,
  index,
  errors,
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
    <div className="flex space-x-2">
      <div className="pb-2">
        <TimeField
          minutes={step.minutes}
          seconds={step.seconds}
          onChange={(updatedMinutes, updatedSeconds) => {
            handleMinutesChange(updatedMinutes.toString());
            handleSecondsChange(updatedSeconds.toString());
          }}
        />
      </div>

      <div className="w-full pb-2">
        <Textarea
          placeholder="Action"
          value={step.action}
          onChange={(e) => onActionChange(e.target.value)}
          className="min-h-[2.5rem] flex-grow resize-none"
          rows={1}
        />
        {errors[`steps-${index}-action`] && (
          <p className="text-sm text-red-500">
            {errors[`steps-${index}-action`]}
          </p>
        )}
      </div>

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
