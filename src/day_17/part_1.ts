import { isNil } from "ramda";
import { input, sample } from "./input";

export const parseInput = (input: string) => {
  const [registerStr, programStr] = input.trim().split('\n\n');

  const [a, b, c] = registerStr.split('\n').map(line =>
    BigInt(parseInt(line.match(/Register [ABC]: (\d+)/)![1]))
  );

  const program = programStr.split(': ')[1].split(',').map(x => parseInt(x));

  return {
    a,
    b,
    c,
    program,
  };
};

export type State = ReturnType<typeof parseInput>;

export const Ins = {
  ADV: 0,
  BXL: 1,
  BST: 2,
  JNZ: 3,
  BXC: 4,
  OUT: 5,
  BDV: 6,
  CDV: 7,
} as const;

const safe = (n: number) => {
  if (n > Number.MAX_SAFE_INTEGER) throw new Error('DANGER');
  return n;
};

export const execute = (state: State, ptr: number): null | bigint => {
  const getCombo = (operand: number): bigint => {
    if (operand > 6) throw new Error('Cannot process combo operand greater than 6');
    if (operand < 4) return BigInt(operand);
    return [state.a, state.b, state.c][operand - 4];
  };

  const op = state.program[ptr];
  const operand = state.program[ptr + 1];

  if (isNil(operand) && op !== Ins.JNZ) {
    return null;
  }

  switch (op) {
    case Ins.ADV: {
      // A always gets lower
      const num = state.a;
      const den = 2n ** getCombo(operand);
      state.a = num / den;
      break;
    }
    case Ins.BXL: {
      // Limits B to 3 bits
      state.b = state.b ^ BigInt(operand);
      break;
    }
    case Ins.BST: {
      // Limits B to 3 bits
      state.b = getCombo(operand) & 7n;
      break;
    }
    // Because of how the program is configured, this basically
    // just kills the program as soon as A reaches 0, and jumps
    // to the beginning if not. So I don't even need to calc it
    // case Ins.JNZ: {
    //   if (state.a !== 0) {
    //     return operand;
    //   } else {
    //     return ptr + 2;
    //   }
    // }
    case Ins.BXC: {
      // B and C are guaranteed to be less than A
      state.b = state.b ^ state.c;
      break;
    }
    case Ins.OUT: {
      return getCombo(operand) & 7n;
    }
    case Ins.BDV: {
      // Guarantees that B is always less than A
      const num = state.a;
      const den = 2n ** getCombo(operand);
      state.b = num / den;
      break;
    }
    case Ins.CDV: {
      // Guarantees that C is always less than A
      const num = state.a;
      const den = 2n ** getCombo(operand);
      state.c = num / den;
      break;
    }
  }

  return null;
};

export const evaluateProgram = (vm: State): number[] => {
  const output: number[] = [];

  let ptr = 0;
  while (ptr < vm.program.length) {
    if (vm.program[ptr] === Ins.JNZ) {
      if (vm.a === 0n) {
        return output;
      } else {
        ptr = 0;
      }
    } else {
      const res = execute(vm, ptr);
      if (res !== null) {
        output.push(Number(res));
      }
      ptr += 2;
    }
  }

  throw new Error('...');
};

export const evaluateInitialProgram = (input: string) =>
  evaluateProgram(parseInput(input)).join(',');
