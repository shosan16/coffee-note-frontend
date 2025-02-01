import React, { useState, useEffect } from 'react';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { Bean, Droplet, Scale } from 'lucide-react';
import { AmountInput } from '~/components/features/user/new/amount-input/AmountInput';
import { StepsInput } from '~/components/features/user/new/steps-input/StepsInput';
import { useStepStore } from '~/components/features/user/new/steps-input/useStepStore';
import { RecipeInputSchema } from '~/components/features/user/new/RecipeInputSchema';

export default function CrateRecipePage() {
  const [ratio, setRatio] = useState('0:0');
  const [coffeeAmount, setCoffeeAmount] = useState(0);
  const [waterAmount, setWaterAmount] = useState(0);
  const [dripperName, setDripperName] = useState('');
  const [grinderName, setGrinderName] = useState('');
  const steps = useStepStore((state) => state.steps);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (coffeeAmount > 0) {
      const calculatedRatio = (waterAmount / coffeeAmount).toFixed(1);
      setRatio(`1:${calculatedRatio}`);
    }
  }, [coffeeAmount, waterAmount]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = {
      coffeeAmount,
      waterAmount,
      grinderName,
      dripperName,
      // roastLevel,
      // grindLevel,
      // description,
      steps,
    };

    const result = RecipeInputSchema.safeParse(formData);
    if (!result.success) {
      const newErrors: Record<string, string> = {};
      result.error.errors.forEach(
        (error: { path: (string | number)[]; message: string }) => {
          if (error.path.length > 0) {
            newErrors[error.path.join('-')] = error.message;
          }
        },
      );
      setErrors(newErrors);
      return;
    }

    console.log(formData);
    // TODO: フォーム送信処理
  };

  const handleGrinderNameChange = (value: string) => {
    setGrinderName(value);
    setErrors((prev) => ({ ...prev, grinderName: '' }));
  };

  const handleDripperNameChange = (value: string) => {
    setDripperName(value);
    setErrors((prev) => ({ ...prev, dripperName: '' }));
  };

  return (
    <div className="mx-auto w-full max-w-screen-lg">
      <form onSubmit={handleSubmit} className="space-y-6">
        <h2>ユーザーレシピ登録画面</h2>
        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <Scale className="h-4 w-4" />
            Ratio
          </Label>
          <div className="text-primary text-2xl font-bold">{ratio}</div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="grinder">Grinder</Label>
            <Input
              id="grinder"
              placeholder="Grinder"
              type="text"
              onChange={(e) => handleGrinderNameChange(e.target.value)}
            />
            {errors.grinderName && (
              <p className="text-sm text-red-500">{errors.grinderName}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="dripper">Dripper</Label>
            <Input
              id="dripper"
              placeholder="Dripper"
              type="text"
              onChange={(e) => handleDripperNameChange(e.target.value)}
            />
            {errors.dripperName && (
              <p className="text-sm text-red-500">{errors.dripperName}</p>
            )}
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-6">
            <AmountInput
              label="Bean"
              value={coffeeAmount}
              onChange={setCoffeeAmount}
              maxValue={50}
              step={0.1}
              quickAdjustValues={[15, 20, 25, 30, 35, 40]}
              icon={<Bean className="text-primary h-4 w-4" />}
              allowDecimal={true}
            />
            {errors.coffeeAmount && (
              <p className="text-sm text-red-500">{errors.coffeeAmount}</p>
            )}
          </div>
          <div className="space-y-6">
            <AmountInput
              label="Water"
              value={waterAmount}
              onChange={setWaterAmount}
              maxValue={1000}
              step={5}
              quickAdjustValues={[150, 200, 250, 300, 350, 400, 450, 500, 600]}
              icon={<Droplet className="text-primary h-4 w-4" />}
            />
            {errors.waterAmount && (
              <p className="text-sm text-red-500">{errors.waterAmount}</p>
            )}
          </div>
        </div>

        <StepsInput errors={errors} />

        <div className="flex justify-end space-x-4">
          <Button type="submit" className="w-auto px-6">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}
