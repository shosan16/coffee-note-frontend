import { useState, useEffect, useCallback } from 'react';

type UseAmountInputProps = {
  value: number;
  allowDecimal?: boolean;
  maxValue: number;
  onChange: (value: number) => void;
  onEnter: () => void;
  inputRef: React.RefObject<HTMLInputElement>;
  isOpen: boolean;
};

export const useAmountInput = ({
  value,
  allowDecimal = false,
  maxValue,
  onChange,
  onEnter,
  inputRef,
  isOpen,
}: UseAmountInputProps) => {
  /**
   * 数値をフォーマットして文字列に変換する。
   * - 入力が `null`、`undefined`、無効な数値（NaN）の場合、'0' を返す。
   * - `allowDecimal` が `true` の場合、小数点以下1桁まで表示する。
   * - `allowDecimal` が `false` の場合、整数として表示する。
   *
   * @param val - フォーマットする数値。
   * @returns フォーマットされた数値の文字列。
   *
   * @example
   * allowDecimal が true の場合
   * formatValue(3.14) -> '3.1'
   *
   * allowDecimal が false の場合
   * formatValue(3.14) -> '3'
   *
   * 無効な入力の場合
   * formatValue(null) ->'0'
   */
  const formatValue = useCallback(
    (val: number | null | undefined): string => {
      if (val === null || val === undefined || isNaN(val)) {
        return '0';
      }
      return allowDecimal ? val.toFixed(1) : val.toFixed(0);
    },
    [allowDecimal],
  );

  const [inputValue, setInputValue] = useState(formatValue(0));

  /**
   * 新しい値を範囲内に丸めて状態を更新し、外部に通知します。
   *
   * @param newValue - 新しく設定する数値
   */
  const handleValueChange = (newValue: number) => {
    const valueToUse = isNaN(newValue) ? 0 : newValue;
    const clampedValue = Math.min(Math.max(0, valueToUse), maxValue);
    const finalValue = allowDecimal
      ? Number(clampedValue.toFixed(1))
      : Math.round(clampedValue);
    onChange(finalValue);
    setInputValue(formatValue(finalValue));
  };

  /**
   * Enterキー押下時に値を確定し、登録された関数を呼び出します。
   *
   * @param e - キーボードイベント
   */
  const handleEnterKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const parsed = parseFloat(inputValue);
      handleValueChange(isNaN(parsed) ? 0 : parsed);
      onEnter();
    }
  };

  /**
   * 入力要素にフォーカスを移動します。
   */
  const focusInput = () => {
    inputRef.current?.focus();
  };

  /**
   * クイック調整ボタンをクリックしたときに呼び出し、
   * 指定した値で入力を更新して入力要素にフォーカスを当てます。
   *
   * @param quickValue - クイック調整で設定する数値
   */
  const handleQuickAdjust = (quickValue: number) => {
    handleValueChange(quickValue);
    focusInput();
  };

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
        inputRef.current?.select();
      }, 0);
    }
  }, [isOpen, inputRef]);

  useEffect(() => {
    setInputValue(formatValue(value));
  }, [value, allowDecimal, formatValue, setInputValue]);

  return {
    formatValue,
    inputValue,
    setInputValue,
    handleValueChange,
    handleEnterKeyDown,
    focusInput,
    handleQuickAdjust,
  };
};
