type UseAmountInputProps = {
  allowDecimal?: boolean;
};

export const useAmountInput = ({
  allowDecimal = false,
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

  return {
    formatValue,
  };
};
