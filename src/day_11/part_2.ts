import { sum, times } from 'ramda';
import { blink } from './part_1';

export const blinkAtStones = (input: string, count: number) => {
  const startingStones = input.split(' ').map(x => parseInt(x));

  let stones = new Map(startingStones.map(x => [x, 1]));

  times(() => {
    const newStones = new Map<number, number>();

    const addStone = (value: number, count: number) => {
      newStones.set(value, count + (newStones.get(value) || 0));
    };

    for (const [stone, count] of stones.entries()) {
      const result = blink(stone);
      if (typeof result === 'number') {
        addStone(result, count);
      } else {
        const [a, b] = result;
        addStone(a, count);
        addStone(b, count);
      }
    }

    stones = newStones;
  }, count);

  return sum(Array.from(stones.entries()).map(([_, count]) => count));
};
