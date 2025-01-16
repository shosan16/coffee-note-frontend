import { useState } from 'react';

/**
 * 時間フィールドのカスタムフック。
 * 初期の分と秒を受け取り、分と秒の状態とそれを変更する関数を提供する。
 *
 * @param initialMinutes 範囲：0 ~ 15
 * @param initialSeconds 範囲：0 ~ 59
 * @returns 分と秒の状態とそれを変更する関数
 */
export const useTimeField = (
  initialMinutes: number,
  initialSeconds: number,
  onChange: (minutes: number, seconds: number) => void,
) => {
  /**
   * 2桁の文字列に変換して状態を更新する。
   * 例: `5` → `05`, `12` → `12`
   */
  const [minutes, setMinutes] = useState<string>(
    initialMinutes.toString().padStart(2, '0'),
  );

  /**
   * 2桁の文字列に変換して状態を更新する。
   * 例: `5` → `05`, `12` → `12`
   */
  const [seconds, setSeconds] = useState<string>(
    initialSeconds.toString().padStart(2, '0'),
  );

  const handleMinuteChange = (value: string) => {
    setMinutes(value);
    onChange(parseInt(value, 10), parseInt(seconds, 10));
  };

  const handleSecondChange = (value: string) => {
    setSeconds(value);
    onChange(parseInt(minutes, 10), parseInt(value, 10));
  };

  return {
    minutes,
    seconds,
    handleMinuteChange,
    handleSecondChange,
  };
};
