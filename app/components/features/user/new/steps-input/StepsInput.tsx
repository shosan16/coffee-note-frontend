import { Button } from '~/components/ui/button';
import { Label } from '~/components/ui/label';
import { StepItem } from './StepItem';
import { useSteps } from './useSteps';

type Step = {
  id: string;
  minutes: number;
  seconds: number;
  action: string;
};

type StepsInputProps = {
  steps: Step[];
  setSteps: (steps: Step[]) => void;
};

export const StepsInput = ({
  steps: initialSteps,
  setSteps,
}: StepsInputProps) => {
  const [steps, addStep, removeStep, updateStep] = useSteps(
    initialSteps,
    setSteps,
  );

  const handleMinutesChange = (id: string, newMinutes: string) => {
    updateStep(id, 'minutes', parseInt(newMinutes, 10));
  };

  const handleSecondsChange = (id: string, newSeconds: string) => {
    updateStep(id, 'seconds', parseInt(newSeconds, 10));
  };

  const handleActionChange = (id: string, newAction: string) => {
    updateStep(id, 'action', newAction);
  };

  const handleRemove = (id: string) => {
    removeStep(id);
  };

  return (
    <div className="w-full space-y-2">
      <Label>Steps</Label>
      <div className="space-y-3">
        {steps.map((step: Step) => (
          <StepItem
            key={step.id}
            step={step}
            onMinutesChange={(newMinutes: string) =>
              handleMinutesChange(step.id, newMinutes)
            }
            onSecondsChange={(newSeconds: string) =>
              handleSecondsChange(step.id, newSeconds)
            }
            onActionChange={(newAction: string) =>
              handleActionChange(step.id, newAction)
            }
            onRemove={() => handleRemove(step.id)}
          />
        ))}
      </div>
      <Button variant="outline" className="w-full" onClick={addStep}>
        <span className="mr-2">+</span>
        Add Step
      </Button>
    </div>
  );
};
