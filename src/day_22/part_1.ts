import { sum } from 'ramda';

const PRUNE = Math.pow(2, 24) - 1;

export const nextSecret = (value: number): number => {
  const step1 = PRUNE & (value ^ (value << 6));
  const step2 = PRUNE & (step1 ^ (step1 >> 5));
  return PRUNE & (step2 ^ (step2 << 11));
};

const nthSecret =
  (n: number) =>
  (value: number): number => {
    let v = value;
    for (let i = 0; i < n; i++) {
      v = nextSecret(v);
    }
    return v;
  };

export const futureNumbers = (input: string): number => {
  const inits = input
    .trim()
    .split('\n')
    .map(x => parseInt(x));
  return sum(inits.map(nthSecret(2000)));
};
