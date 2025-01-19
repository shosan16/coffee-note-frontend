import React, { useState, useEffect } from 'react';
import { Button } from '~/components/ui/button';
// import { Input } from '~/components/ui/input';
// import { Textarea } from '~/components/ui/textarea';
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/select';
import { Label } from '~/components/ui/label';
import { Bean, Droplet, Scale } from 'lucide-react';

import { AmountInput } from '~/components/features/user/new/amount-input/AmountInput';
import { StepsInput } from '~/components/features/user/new/steps-input/StepsInput';

type Step = {
  id: string;
  minutes: number;
  seconds: number;
  action: string;
};

export default function New() {
  // const [title, setTitle] = useState('');
  const [ratio, setRatio] = useState('0:0');
  const [coffeeAmount, setCoffeeAmount] = useState(0);
  const [waterAmount, setWaterAmount] = useState(0);
  // const [dripperName, setDripperName] = useState<string>('Light');
  // const [grinderName, setGrinderName] = useState<string>('Light');
  // const [roastLevel, setRoastLevel] = useState<string>('');
  // const [grindLevel, setGrindLevel] = useState<string>('');
  // const [description, setDescription] = useState('');
  const [steps, setSteps] = useState<Step[]>([
    { id: '', minutes: 0, seconds: 0, action: '' },
  ]);

  useEffect(() => {
    if (coffeeAmount > 0) {
      const calculatedRatio = (waterAmount / coffeeAmount).toFixed(1);
      setRatio(`1:${calculatedRatio}`);
    }
  }, [coffeeAmount, waterAmount]);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      // title,
      coffeeAmount,
      waterAmount,
      // dripperName,
      // grinderName,
      // roastLevel,
      // grindLevel,
      // description,
      steps,
    });
    // TODO: フォームの送信処理（例：サーバーにデータを送信）
  };

  return (
    <div className="mx-auto w-full max-w-screen-lg">
      <form onSubmit={handleSubmit} className="space-y-6">
        <h2>ユーザーレシピ登録画面</h2>
        {/* コーヒー豆と水の量 */}
        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <Scale className="h-4 w-4" />
            Ratio
          </Label>
          <div className="text-primary text-2xl font-bold">{ratio}</div>
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
          </div>
        </div>

        <StepsInput steps={steps} setSteps={setSteps} />

        {/* アクションボタン */}
        <div className="flex justify-end space-x-4">
          {/* 下書き保存ボタン */}
          <Button
            type="button"
            variant="outline"
            // onClick={handleSaveDraft}
            className="w-auto px-6"
          >
            Save
          </Button>
          {/* 提出ボタン */}
          <Button type="submit" className="w-auto px-6">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}
