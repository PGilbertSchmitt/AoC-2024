import { Garden } from './garden';

export const parseInput = (input: string) =>
  input
    .trim()
    .split('\n')
    .map(line => line.split(''));

export const costOfFences = (input: string) => {
  const garden = new Garden(parseInput(input));
  return garden.fenceCost();
};
