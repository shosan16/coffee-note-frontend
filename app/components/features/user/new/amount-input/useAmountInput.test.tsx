import { renderHook, act } from '@testing-library/react';
import { useAmountInput } from './useAmountInput';

describe('useAmountInput', () => {
  describe('formatValue', () => {
    it('should return "0" for null, undefined, or NaN', () => {
      const onChange = vi.fn();
      const onEnter = vi.fn();
      const { result } = renderHook(() =>
        useAmountInput({
          allowDecimal: false,
          maxValue: 100,
          onChange,
          onEnter,
        }),
      );

      expect(result.current.formatValue(null)).toBe('0');
      expect(result.current.formatValue(undefined)).toBe('0');
      expect(result.current.formatValue(NaN)).toBe('0');
    });

    it('should return the raw number as string if allowDecimal is false', () => {
      const onChange = vi.fn();
      const onEnter = vi.fn();
      const { result } = renderHook(() =>
        useAmountInput({
          allowDecimal: false,
          maxValue: 100,
          onChange,
          onEnter,
        }),
      );

      expect(result.current.formatValue(3.14)).toBe('3');
    });

    it('should return a string with one decimal place if allowDecimal is true', () => {
      const onChange = vi.fn();
      const onEnter = vi.fn();
      const { result } = renderHook(() =>
        useAmountInput({
          allowDecimal: true,
          maxValue: 100,
          onChange,
          onEnter,
        }),
      );

      expect(result.current.formatValue(3.14)).toBe('3.1');
    });
  });

  describe('handleValueChange', () => {
    it('should clamp the value to max if it exceeds max', () => {
      const onChange = vi.fn();
      const onEnter = vi.fn();
      const { result } = renderHook(() =>
        useAmountInput({
          allowDecimal: false,
          maxValue: 100,
          onChange,
          onEnter,
        }),
      );

      act(() => {
        result.current.handleValueChange(150);
      });

      // exceed: 150 -> clamp to 100
      expect(onChange).toHaveBeenCalledWith(100);
      // inputValue にもフォーマット後の "100" がセットされる
      expect(result.current.inputValue).toBe('100');
    });

    it('should clamp the value to 0 if negative', () => {
      const onChange = vi.fn();
      const onEnter = vi.fn();
      const { result } = renderHook(() =>
        useAmountInput({
          allowDecimal: false,
          maxValue: 100,
          onChange,
          onEnter,
        }),
      );

      act(() => {
        result.current.handleValueChange(-50);
      });

      // negative -> clamp to 0
      expect(onChange).toHaveBeenCalledWith(0);
      // inputValue も "0"
      expect(result.current.inputValue).toBe('0');
    });

    it('should set value to 0 if NaN', () => {
      const onChange = vi.fn();
      const onEnter = vi.fn();
      const { result } = renderHook(() =>
        useAmountInput({
          allowDecimal: true,
          maxValue: 100,
          onChange,
          onEnter,
        }),
      );

      act(() => {
        result.current.handleValueChange(NaN);
      });

      expect(onChange).toHaveBeenCalledWith(0);
      // allowDecimal = true のため "0.0"
      expect(result.current.inputValue).toBe('0.0');
    });

    it('should round to 1 decimal place if allowDecimal is true', () => {
      const onChange = vi.fn();
      const onEnter = vi.fn();
      const { result } = renderHook(() =>
        useAmountInput({
          allowDecimal: true,
          maxValue: 100,
          onChange,
          onEnter,
        }),
      );

      act(() => {
        result.current.handleValueChange(3.14159);
      });

      // Number(clampedValue.toFixed(1)) -> 3.1
      expect(onChange).toHaveBeenCalledWith(3.1);
      // inputValue もフォーマット後の "3.1"
      expect(result.current.inputValue).toBe('3.1');
    });

    it('should round the value with Math.round if allowDecimal is false', () => {
      const onChange = vi.fn();
      const onEnter = vi.fn();
      const { result } = renderHook(() =>
        useAmountInput({
          allowDecimal: false,
          maxValue: 100,
          onChange,
          onEnter,
        }),
      );

      act(() => {
        result.current.handleValueChange(3.14159);
      });

      // allowDecimal = false -> Math.round(3.14159) -> 3
      expect(onChange).toHaveBeenCalledWith(3);
      // inputValue も "3"
      expect(result.current.inputValue).toBe('3');
    });
  });

  describe('handleEnterKeyDown', () => {
    const scenarios = [
      {
        scenarioName: 'allowDecimal is true',
        allowDecimal: true,
        inputValue: '42.5',
        expectedValue: 42.5,
        expectedInput: '42.5',
      },
      {
        scenarioName: 'allowDecimal is false',
        allowDecimal: false,
        inputValue: '42.5',
        expectedValue: 43,
        expectedInput: '43',
      },
    ];

    it.each(scenarios)(
      'should parse the inputValue and call handleValueChange and onEnter if $scenarioName and the Enter key is pressed',
      ({ allowDecimal, inputValue, expectedValue, expectedInput }) => {
        const onChange = vi.fn();
        const onEnter = vi.fn();
        const { result } = renderHook(() =>
          useAmountInput({
            allowDecimal,
            maxValue: 100,
            onChange,
            onEnter,
          }),
        );

        act(() => {
          result.current.setInputValue(inputValue);
        });

        act(() => {
          result.current.handleEnterKeyDown({
            key: 'Enter',
          } as React.KeyboardEvent<HTMLInputElement>);
        });

        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onChange).toHaveBeenCalledWith(expectedValue);
        expect(onEnter).toHaveBeenCalledTimes(1);
        expect(result.current.inputValue).toBe(expectedInput);
      },
    );

    it('should do nothing if a non-Enter key is pressed', () => {
      const onChange = vi.fn();
      const onEnter = vi.fn();
      const { result } = renderHook(() =>
        useAmountInput({
          allowDecimal: true,
          maxValue: 100,
          onChange,
          onEnter,
        }),
      );

      act(() => {
        result.current.handleEnterKeyDown({
          key: 'Escape',
        } as React.KeyboardEvent<HTMLInputElement>);
      });
      // Enterキーではないので onEnter や onChange は呼ばれない
      expect(onEnter).not.toHaveBeenCalled();
      expect(onChange).not.toHaveBeenCalled();
    });

    it('should treat inputValue as 0 if it is invalid when key is Enter', () => {
      const onChange = vi.fn();
      const onEnter = vi.fn();
      const { result } = renderHook(() =>
        useAmountInput({
          allowDecimal: true,
          maxValue: 100,
          onChange,
          onEnter,
        }),
      );

      // 不正な文字列をセット
      act(() => {
        result.current.setInputValue('abc');
      });

      // Enterキーを押下
      act(() => {
        result.current.handleEnterKeyDown({
          key: 'Enter',
        } as React.KeyboardEvent<HTMLInputElement>);
      });

      // handleValueChange により onChange が呼ばれ、NaN 扱いで 0 になる
      expect(onChange).toHaveBeenCalledWith(0);
      expect(onEnter).toHaveBeenCalled();
      expect(result.current.inputValue).toBe('0.0');
    });
  });
});
