import React from 'react';

export type Amount = {
  label: string;
  value: number;
  maxValue: number;
  step: number;
  quickAdjustValues: number[];
  icon: React.ReactNode;
  allowDecimal?: boolean;
};

export type AmountProps = Amount & {
  onChange: (value: number) => void;
};
