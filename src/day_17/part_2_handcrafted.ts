import { parseInput } from './part_1';

// Handcrafted solver based on the hardcoded values on the program
const fastSolveFirstValue = (a: bigint) => {
  const b = (a & 7n) ^ 5n;
  return (b ^ 6n ^ (a >> b)) & 7n;
};

const OCTALS = [0n, 1n, 2n, 3n, 4n, 5n, 6n, 7n];

// I wish I had come up with this idea on my own, but alas, I needed to check the subreddit,
// and I learned about the program's property that each sub-octal in the initial A register
// doesn't affect the ones beneath it, so it can be calculated octal-by-octal in reverse. I
// did, however, discover on my own that the program always runs the same way every time:
// - The jump is at the end, and always points back to the beginning until A is 0
// - All operands are hardcoded
// With these 2 in mind, it's clear that the "program" really just hashes the bottom octal
// of the value of A into other octal value, then shinks A by that amount, then doing the
// same until A is 0. B and C change based on that initial octal value.
export const findQuineFast = (input: string) => {
  const { program } = parseInput(input);

  const tryOctal = (lastInit: bigint, depth: number): bigint | undefined => {
    const desiredValue = BigInt(program[15 - depth]);
    const base = lastInit << 3n;
    const validInits: bigint[] = [];
    OCTALS.forEach(octal => {
      const init = base + octal;
      if (fastSolveFirstValue(init) === desiredValue) {
        validInits.push(init);
      }
    });

    if (depth === 15) {
      return validInits[0];
    } else {
      for (const init of validInits) {
        const success = tryOctal(init, depth + 1);
        if (success) return success;
      }
    }
  };

  return tryOctal(0n, 0);
};
