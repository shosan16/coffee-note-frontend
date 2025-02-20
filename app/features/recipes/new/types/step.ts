export type Step = {
  id: string;
  minutes: number;
  seconds: number;
  action: string;
};

export type StepStore = {
  steps: Step[];
  addStep: () => void;
  removeStep: (id: string) => void;
  updateStep: (id: string, field: keyof Step, value: Step[keyof Step]) => void;
};
