import { sum } from 'ramda';

export const parseMuls = (input: string) => {
  const muls = input.matchAll(/mul\((\d+),(\d+)\)/g);
  return sum(Array.from(muls).map(mul => parseInt(mul[1]) * parseInt(mul[2])));
};
