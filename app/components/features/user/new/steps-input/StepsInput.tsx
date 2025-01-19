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

  return (
    <div className="w-full space-y-2">
      <Label>Steps</Label>
      <div className="space-y-3">
        {steps.map((step) => (
          <StepItem
            key={step.id}
            step={step}
            onUpdate={updateStep}
            onRemove={removeStep}
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
