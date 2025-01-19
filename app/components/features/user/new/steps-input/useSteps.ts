import { useState } from 'react';
import { v4 as uuid } from 'uuid';

type Step = {
  id: string;
  minutes: number;
  seconds: number;
  action: string;
};

export const useSteps = (
  initialSteps: Step[],
): [
  Step[],
  () => void,
  (id: string) => void,
  (id: string, field: keyof Step, value: Step[keyof Step]) => void,
] => {
  const [steps, setSteps] = useState<Step[]>(initialSteps);

  const addStep = () => {
    setSteps([...steps, { id: uuid(), minutes: 0, seconds: 0, action: '' }]);
  };

  const removeStep = (id: string) => {
    if (steps.length > 1) {
      setSteps(steps.filter((step) => step.id !== id));
    }
  };

  const updateStep = (
    id: string,
    field: keyof Step,
    value: Step[keyof Step],
  ) => {
    const newSteps = [...steps].map((step) => {
      if (step.id === id) {
        const updatedValue =
          field === 'minutes' || field === 'seconds' ? Number(value) : value;
        return {
          ...step,
          [field]: updatedValue,
        };
      }
      return step;
    });
    setSteps(newSteps);
  };

  return [steps, addStep, removeStep, updateStep];
};
