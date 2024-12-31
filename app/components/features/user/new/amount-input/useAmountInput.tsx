import { useState } from 'react';

type UseAmountInputProps = {
  allowDecimal?: boolean;
  maxValue: number;
  onChange: (value: number) => void;
  onEnter: () => void;
};

export const useAmountInput = ({
  allowDecimal = false,
  maxValue,
  onChange,
  onEnter,
}: UseAmountInputProps) => {
  /**
   * 数値をフォーマットする関数。
   *
   * @param {number | null | undefined} val - フォーマットする数値。nullまたはundefinedの場合、'0'を返す。
   * @returns {string} フォーマットされた数値の文字列。小数点以下1桁まで表示するか、整数として表示する。
   */
  const formatValue = (val: number | null | undefined): string => {
    if (val === null || val === undefined || isNaN(val)) {
      return '0';
    }
    return allowDecimal ? val.toFixed(1) : val.toFixed(0);
  };

  const [inputValue, setInputValue] = useState(formatValue(0));

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
   * Enterキー押下時の処理を行う関数。
   *
   * @param {React.KeyboardEvent<HTMLInputElement>} e - キーボードイベント。
   */
  const handleEnterKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const parsed = parseFloat(inputValue);
      handleValueChange(isNaN(parsed) ? 0 : parsed);
      onEnter();
    }
  };

  return {
    formatValue,
    inputValue,
    setInputValue,
    handleValueChange,
    handleEnterKeyDown,
  };
};
