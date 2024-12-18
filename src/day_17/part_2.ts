import { parseInput, evaluateProgram } from "./part_1";

const OCTALS = [0n, 1n, 2n, 3n, 4n, 5n, 6n, 7n];

export const findQuineGeneric = (input: string) => {
  const vm = parseInput(input);
  const { program } = vm;
  const maxIdx = program.length - 1;
  
  const tryOctal = (lastInit: bigint, depth: number): bigint | undefined => {
    const desiredValue = program[maxIdx - depth];
    const base = lastInit << 3n;
    const validInits: bigint[] = [];
    OCTALS.forEach(octal => {
      const init = base + octal;
      const output = evaluateProgram({
        a: init,
        b: 0n,
        c: 0n,
        program,
      });
      if (output[0] === desiredValue) {
        validInits.push(init);
      }
    });

    if (depth === maxIdx) {
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
