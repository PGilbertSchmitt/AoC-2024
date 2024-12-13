import { parseInput } from './part_1';
import { Garden } from './garden';

export const costOfBulkFences = (input: string) => {
  const garden = new Garden(parseInput(input));
  return garden.bulkFenceCost();
};
