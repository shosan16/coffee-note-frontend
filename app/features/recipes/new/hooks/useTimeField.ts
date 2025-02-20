import { useState } from 'react';

/**
 * 時間フィールドのカスタムフック。
 * 初期の分と秒を受け取り、分と秒の状態（数値）とそれを変更する関数を提供する。
 *
 * @param initialMinutes 0~15
 * @param initialSeconds 0~59
 */
export const useTimeField = (
  initialMinutes: number,
  initialSeconds: number,
  onChange: (minutes: number, seconds: number) => void,
) => {
  const [minuteValue, setMinuteValue] = useState(initialMinutes);
  const [secondValue, setSecondValue] = useState(initialSeconds);

  const handleMinuteChange = (newMinutes: number) => {
    setMinuteValue(newMinutes);
    onChange(newMinutes, secondValue);
  };

  const handleSecondChange = (newSeconds: number) => {
    setSecondValue(newSeconds);
    onChange(minuteValue, newSeconds);
  };

  return { minuteValue, secondValue, handleMinuteChange, handleSecondChange };
};
