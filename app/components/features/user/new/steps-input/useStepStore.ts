import { create } from 'zustand';
import { v4 as uuid } from 'uuid';

export type Step = {
  id: string;
  minutes: number;
  seconds: number;
  action: string;
};

type StepStore = {
  steps: Step[];
  addStep: () => void;
  removeStep: (id: string) => void;
  updateStep: (id: string, field: keyof Step, value: Step[keyof Step]) => void;
};

export const useStepStore = create<StepStore>((set) => ({
  steps: [{ id: uuid(), minutes: 0, seconds: 0, action: '' }],

  addStep: () => {
    set((state) => ({
      steps: [
        ...state.steps,
        { id: uuid(), minutes: 0, seconds: 0, action: '' },
      ],
    }));
  },

  removeStep: (id: string) => {
    set((state) => {
      if (state.steps.length <= 1) {
        return state;
      }
      return { steps: state.steps.filter((step) => step.id !== id) };
    });
  },

  updateStep: (id, field, value) => {
    set((state) => {
      return {
        steps: state.steps.map((step) => {
          if (step.id === id) {
            let newValue;
            if (field === 'minutes' || field === 'seconds') {
              newValue = Number(value);
            } else {
              newValue = value;
            }

            // ステップを更新して返す
            return {
              ...step,
              [field]: newValue,
            };
          } else {
            // 該当しないステップはそのまま返す
            return step;
          }
        }),
      };
    });
  },
}));
