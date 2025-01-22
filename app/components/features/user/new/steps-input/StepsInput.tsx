import { Button } from '~/components/ui/button';
import { Label } from '~/components/ui/label';
import { StepItem } from './StepItem';
import { useStepStore, Step } from './useStepStore';

export const StepsInput = () => {
  const steps = useStepStore((state) => state.steps);
  const addStep = useStepStore((state) => state.addStep);
  const removeStep = useStepStore((state) => state.removeStep);
  const updateStep = useStepStore((state) => state.updateStep);

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

  const handleAdd = () => {
    addStep();
  };

  return (
    <div className="w-full space-y-2">
      <Label>Steps</Label>
      <div className="space-y-3">
        {steps.map((step: Step, index: number) => (
          <StepItem
            key={step.id}
            step={step}
            isFirst={index === 0}
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
      <Button variant="outline" className="w-full" onClick={() => handleAdd()}>
        <span className="mr-2">+</span>
        Add Step
      </Button>
    </div>
  );
};
