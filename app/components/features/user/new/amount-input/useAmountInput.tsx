import { useState } from 'react';

type UseAmountInputProps = {
  allowDecimal?: boolean;
  max: number;
  onChange: (value: number) => void;
};

export const useAmountInput = ({
  allowDecimal = false,
  max,
  onChange,
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
    return allowDecimal ? val.toFixed(1) : val.toString();
  };

  const [inputValue, setInputValue] = useState(formatValue(0));

  const handleValueChange = (newValue: number) => {
    const valueToUse = isNaN(newValue) ? 0 : newValue;
    const clampedValue = Math.min(Math.max(0, valueToUse), max);
    const finalValue = allowDecimal
      ? Number(clampedValue.toFixed(1))
      : Math.round(clampedValue);
    onChange(finalValue);
    setInputValue(formatValue(finalValue));
  };

  return {
    formatValue,
    inputValue,
    setInputValue,
    handleValueChange,
  };
};
