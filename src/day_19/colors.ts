import { ValueOf } from 'src/types';

// doubles as an index
export const Colors = {
  WHITE: 0,
  BLUE: 1,
  BLACK: 2,
  RED: 3,
  GREEN: 4,
} as const;

export type Color = ValueOf<typeof Colors>;
