import { isNotNil } from 'ramda';
import { input, sample, sample2 } from './input';

export type GateOp = 'XOR' | 'AND' | 'OR';

export type GateNode = {
  label: string;
  op: GateOp;
  children: [string, string];
};

export const parseInput = (
  input: string,
  swaps: Record<string, string> = {},
) => {
  const [wiresStr, gatesStr] = input.trim().split('\n\n');
  const signals = wiresStr.split('\n').reduce((m, line) => {
    const [label, value] = line.split(': ');
    return m.set(label, value === '1');
  }, new Map<string, boolean>());

  const gates = new Map<string, GateNode>();
  const zs: string[] = [];
  gatesStr.split('\n').forEach(line => {
    const [_, sourceA, op, sourceB, visibleLabel] = line.match(
      /(\w+) (XOR|AND|OR) (\w+) -> (\w+)/,
    )!;
    const label = swaps[visibleLabel] || visibleLabel;
    gates.set(label, {
      label,
      op: op as GateOp,
      children: [sourceA, sourceB],
    });
    if (label[0] === 'z') {
      const index = parseInt(label.slice(1));
      zs[index] = label;
    }
  });

  return {
    signals,
    gates,
    zs,
  };
};

export const logic = (op: GateOp, a: boolean, b: boolean): boolean => {
  switch (op) {
    case 'AND':
      return a && b;
    case 'OR':
      return a || b;
    case 'XOR':
      return a !== b;
  }
};

export const runCircuit = (input: string) => {
  const { signals, gates, zs } = parseInput(input);

  const calculate = (label: string): boolean => {
    const cachedValue = signals.get(label)!;
    if (isNotNil(cachedValue)) return cachedValue;
    const node = gates.get(label)!;
    const [a, b] = node.children;
    const value = logic(node.op, calculate(a), calculate(b));
    signals.set(label, value);
    return value;
  };

  return zs.reduce(
    (sum, z, i) => sum + ((calculate(z) ? 1n : 0n) << BigInt(i)),
    0n,
  );
};
