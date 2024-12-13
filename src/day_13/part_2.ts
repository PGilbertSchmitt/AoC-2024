import { isNotNil } from 'ramda';
import { bigSum, findButtonPresses, parseInput } from './part_1';

const OFFSET = 10000000000000;

export const costOfFarButtonPresses = (input: string) => {
  const machines = parseInput(input);

  return bigSum(
    machines
      .map(machine => {
        const [endX, endY] = machine.end;
        machine.end = [endX + OFFSET, endY + OFFSET];
        const result = findButtonPresses(machine);
        if (result) {
          const [aPresses, bPresses] = result;
          return aPresses * 3n + bPresses;
        }
      })
      .filter(isNotNil),
  );
};
