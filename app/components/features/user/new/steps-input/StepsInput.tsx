import React from 'react';
import { Button } from '~/components/ui/button';
import { Label } from '~/components/ui/label';
import { StepItem } from './StepItem';
import { useStepStore, Step } from './useStepStore';

type StepsInputProps = {
  errors: Record<string, string>;
};

export const StepsInput: React.FC<StepsInputProps> = ({ errors }) => {
  const steps = useStepStore((state) => state.steps);
  const addStep = useStepStore((state) => state.addStep);
  const removeStep = useStepStore((state) => state.removeStep);
  const updateStep = useStepStore((state) => state.updateStep);

  return (
    <div className="w-full space-y-2">
      <Label>Steps</Label>
      <div className="space-y-3">
        {steps.map((step: Step, index: number) => (
          <div key={step.id}>
            <StepItem
              step={step}
              isFirst={index === 0}
              index={index}
              errors={errors}
              onMinutesChange={(newMinutes: string) =>
                updateStep(step.id, 'minutes', parseInt(newMinutes, 10))
              }
              onSecondsChange={(newSeconds: string) =>
                updateStep(step.id, 'seconds', parseInt(newSeconds, 10))
              }
              onActionChange={(newAction: string) =>
                updateStep(step.id, 'action', newAction)
              }
              onRemove={() => removeStep(step.id)}
            />
          </div>
        ))}
      </div>
      <Button
        type="button"
        variant="outline"
        className="w-full"
        onClick={addStep}
      >
        <span className="mr-2">+</span>
        Add Step
      </Button>
    </div>
  );
};
