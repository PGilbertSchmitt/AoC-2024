import { Color } from './colors';

export type ColorList = {
  color: Color;
  i: number;
  next: ColorList | null;
};

export const newColorList = ([first, ...sequence]: Color[]): ColorList => {
  const root: ColorList = {
    color: first,
    i: 0,
    next: null,
  };

  let i = 1;
  let curNode = root;
  for (const color of sequence) {
    curNode.next = {
      color,
      i: i++,
      next: null,
    };
    curNode = curNode.next;
  }

  return root;
};
