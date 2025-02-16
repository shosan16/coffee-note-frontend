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
        return allowDecimal ? '0.0' : '0';
      }
      return allowDecimal ? val.toFixed(1) : Math.round(val).toFixed(0);
    },
    [allowDecimal],
  );

  const [inputValue, setInputValue] = useState<string>(formatValue(value));

  /**
   * 新しい値を範囲内に丸めて状態を更新し、外部に通知します。
   *
   * @param newValue - 新しく設定する数値
   */
  const handleValueChange = useCallback(
    (newValue: number) => {
      const valueToUse = isNaN(newValue) ? 0 : newValue;
      const clampedValue = Math.min(Math.max(0, valueToUse), maxValue);
      const finalValue = allowDecimal
        ? parseFloat(clampedValue.toFixed(1))
        : Math.round(clampedValue);
      onChange(finalValue);
      setInputValue(formatValue(finalValue));
    },
    [allowDecimal, formatValue, maxValue, onChange],
  );

  /**
   * 入力の変更を処理します。
   *
   * @param e - 変更イベント
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (!isNaN(parseFloat(newValue))) {
      setInputValue(newValue);
    }
  };

  /**
   * 入力フィールドのフォーカスが外れたときの処理をします。
   */
  const handleInputBlur = useCallback(() => {
    const parsed = parseFloat(inputValue);
    handleValueChange(parsed);
  }, [handleValueChange, inputValue]);

  /**
   * Enterキー押下時に値を確定し、登録された関数を呼び出します。
   *
   * @param e - キーボードイベント
   */
  const handleEnterKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        handleInputBlur();
        onEnter();
      }
    },
    [handleInputBlur, onEnter],
  );

  /**
   * クイック調整ボタンをクリックしたときに呼び出し、
   * 指定した値で入力を更新して入力要素にフォーカスを当てます。
   *
   * @param quickValue - クイック調整で設定する数値
   */
  const handleQuickAdjust = useCallback(
    (quickValue: number) => {
      handleValueChange(quickValue);
      if (inputRef.current) {
        inputRef.current.focus();
        inputRef.current.select();
      }
    },
    [handleValueChange, inputRef],
  );

  /**
   * ポップオーバーが開いたときに入力フィールドにフォーカスを移動し、テキストを選択する。
   */
  useEffect(() => {
    if (isOpen && inputRef.current) {
      const frameId = requestAnimationFrame(() => {
        inputRef.current?.focus();
        inputRef.current?.select();
      });
      return () => {
        if (frameId !== undefined) {
          cancelAnimationFrame(frameId);
        }
      };
    }
  }, [isOpen, inputRef]);

  /**
   * 外部からの `value` や `allowDecimal` の変更に応じて `inputValue` を更新する。
   */
  useEffect(() => {
    setInputValue(formatValue(value));
  }, [value, allowDecimal, formatValue]);

  return {
    formatValue,
    inputValue,
    setInputValue,
    handleValueChange,
    handleInputChange,
    handleInputBlur,
    handleEnterKeyDown,
    handleQuickAdjust,
  };
};
