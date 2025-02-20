import { z } from 'zod';

export const Recipe = z.object({
  coffeeAmount: z.number().min(1, 'Coffee amount must be at least 1'),
  waterAmount: z.number().min(1, 'Water amount must be at least 1'),
  grinderName: z.string().nonempty('Grinder name is required'),
  dripperName: z.string().nonempty('Dripper name is required'),
  steps: z
    .array(
      z.object({
        minutes: z.number().min(0, 'Minutes must be at least 0'),
        seconds: z.number().min(0, 'Seconds must be at least 0'),
        action: z.string().nonempty('Action is required'),
      }),
    )
    .min(1, 'At least one step is required'),
});

export type RecipeInput = z.infer<typeof Recipe>;
