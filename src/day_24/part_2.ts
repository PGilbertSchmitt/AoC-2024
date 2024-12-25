import { repeat } from 'ramda';
import { parseInput } from './part_1';
import { input } from './input';

const space = repeat('  ');

const displayGates = (input: string) => {
  const { gates, zs } = parseInput(input, {
    z10: 'vcf',
    vcf: 'z10',
    z39: 'tnc',
    tnc: 'z39',
    dvb: 'fsq',
    fsq: 'dvb',
    fhg: 'z17',
    z17: 'fhg',
  });

  const lines: string[] = [];
  const rendered = new Set<string>();

  const render = (label: string, depth = 0) => {
    if (label.match(/^[xy]/)) return;
    const node = gates.get(label)!;

    const [a, b] = node.children;
    if (!rendered.has(label)) {
      lines.push(`${space(depth).join('')}${label} <- ${a} ${node.op} ${b}`);
      rendered.add(label);
      if (!a.startsWith('z')) render(a, depth + 1);
      if (!b.startsWith('z')) render(b, depth + 1);
    }
  };

  for (const z of zs) {
    const bit = parseInt(z.slice(1));

    const zNode = gates.get(z)!;
    const zChildren = zNode.children.map(ch => gates.get(ch)!);
    if (bit <= 44 && zNode.op !== 'XOR')
      throw new Error(`No immediate XOR on ${z}`);

    if (bit >= 1 && bit <= 44) {
      const xorChild = zChildren.find(ch => ch.op === 'XOR');
      if (!xorChild) throw new Error(`No XOR child on ${z}`);
      const [x, y] = xorChild.children.sort().map(v => parseInt(v.slice(1)));
      if (x !== bit || y !== bit)
        throw new Error(`Invalid XOR chilren on ${z}`);
    }

    if (bit >= 2 && bit <= 44) {
      const orChild = zChildren.find(ch => ch.op === 'OR');
      if (!orChild) throw new Error(`No OR child on ${z}`);
      const subChilds = orChild.children.map(ch => gates.get(ch)!);
    }
  }

  lines.forEach(l => console.log(l));
};

displayGates(input);
