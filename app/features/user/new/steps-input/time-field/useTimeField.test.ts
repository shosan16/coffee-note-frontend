import { renderHook, act } from '@testing-library/react';
import { useTimeField } from './useTimeField';

describe('useTimeField', () => {
  describe('initial state', () => {
    it('should initialize with formatted minutes and seconds', () => {
      const { result } = renderHook(() => useTimeField(5, 30));
      expect(result.current.minutes).toBe('05');
      expect(result.current.seconds).toBe('30');
    });
  });

  describe('handleMinuteChange', () => {
    it('should update minutes correctly', () => {
      const { result } = renderHook(() => useTimeField(10, 20));
      act(() => {
        result.current.handleMinuteChange('15');
      });
      expect(result.current.minutes).toBe('15');
    });
  });

  describe('handleSecondChange', () => {
    it('should update seconds correctly', () => {
      const { result } = renderHook(() => useTimeField(10, 20));
      act(() => {
        result.current.handleSecondChange('45');
      });
      expect(result.current.seconds).toBe('45');
    });
  });

  describe('effect on initial values change', () => {
    it('should update when initial values change', () => {
      const { result, rerender } = renderHook(
        ({ minutes, seconds }) => useTimeField(minutes, seconds),
        { initialProps: { minutes: 3, seconds: 25 } },
      );

      expect(result.current.minutes).toBe('03');
      expect(result.current.seconds).toBe('25');

      rerender({ minutes: 7, seconds: 40 });

      expect(result.current.minutes).toBe('07');
      expect(result.current.seconds).toBe('40');
    });
  });
});
