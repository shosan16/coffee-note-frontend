import { useState } from 'react';

type Step = {
  minutes: number;
  seconds: number;
  action: string;
};

export const useSteps = (
  initialSteps: Step[],
): [
  Step[],
  () => void,
  (index: number) => void,
  (index: number, field: keyof Step, value: number | string) => void,
] => {
  const [steps, setSteps] = useState<Step[]>(initialSteps);

  const addStep = () => {
    setSteps([...steps, { minutes: 0, seconds: 0, action: '' }]);
  };

  const removeStep = (index: number) => {
    if (steps.length > 1) {
      setSteps(steps.filter((_, i) => i !== index));
    }
  };

  const updateStep = (
    index: number,
    field: keyof Step,
    value: number | string,
  ) => {
    const newSteps = [...steps];
    if (field === 'minutes' || field === 'seconds') {
      newSteps[index][field] = Number(value);
    } else {
      newSteps[index][field] = value as string;
    }
    setSteps(newSteps);
  };

  return [steps, addStep, removeStep, updateStep];
};
