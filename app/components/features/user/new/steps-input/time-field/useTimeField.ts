import { useState, useEffect } from 'react';

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
) => {
  const [minutes, setMinutes] = useState(
    initialMinutes.toString().padStart(2, '0'),
  );
  const [seconds, setSeconds] = useState(
    initialSeconds.toString().padStart(2, '0'),
  );

  useEffect(() => {
    setMinutes(initialMinutes.toString().padStart(2, '0'));
    setSeconds(initialSeconds.toString().padStart(2, '0'));
  }, [initialMinutes, initialSeconds]);

  /**
   * 分の値を変更する関数。
   * 2桁の文字列に変換して状態を更新する。
   * 例: `5` → `05`, `12` → `12`
   *
   * @param minute
   */
  const handleMinuteChange = (minute: string) => {
    setMinutes(minute);
  };

  /**
   * 秒の値を変更する関数。
   * 2桁の文字列に変換して状態を更新する。
   * 例: `5` → `05`, `12` → `12`
   *
   * @param second
   */
  const handleSecondChange = (second: string) => {
    setSeconds(second);
  };

  return {
    minutes,
    seconds,
    handleMinuteChange,
    handleSecondChange,
  };
};
