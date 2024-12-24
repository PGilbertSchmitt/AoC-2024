import { concat, equals, last, repeat, times, toPairs } from 'ramda';
import { Vec } from 'src/types';
import { bigSum } from 'src/utils';

// I'm positive this could have been solved in a much simpler manner, but hell if I could find it

/*
+---+---+---+
| 7 | 8 | 9 |
+---+---+---+
| 4 | 5 | 6 |
+---+---+---+
| 1 | 2 | 3 |
+---+---+---+
    | 0 | A |
    +---+---+
*/

const NumericKeypadMap = {
  7: [0, 0],
  8: [0, 1],
  9: [0, 2],
  4: [1, 0],
  5: [1, 1],
  6: [1, 2],
  1: [2, 0],
  2: [2, 1],
  3: [2, 2],
  0: [3, 1],
  A: [3, 2],
} as const;

const InvalidNumericPos: Vec = [3, 0];

/*
    +---+---+
    | ^ | A |
+---+---+---+
| < | v | > |
+---+---+---+
*/

const DirectionalKeypadMap = {
  A: [0, 2],
  '^': [0, 1],
  '<': [1, 0],
  v: [1, 1],
  '>': [1, 2],
} as const;

const InvalidDirectionPos: Vec = [0, 0];
type DirKey = keyof typeof DirectionalKeypadMap;

type TranslateFn = (
  r: number,
  c: number,
  origR: number,
  origC: number,
) => DirKey[];

type DirKeyGroup = Array<DirKey[]>;
type Tally = Record<string, bigint>;

const normalize = (x: number, y: number): Vec => {
  const nx = x === 0 ? 0 : x > 0 ? 1 : -1;
  const ny = y === 0 ? 0 : y > 0 ? 1 : -1;
  return [nx, ny];
};

const precalculateVectorFn = (
  config: [boolean, boolean, boolean, boolean],
  invalidVec: Vec,
): TranslateFn => {
  const staticPairs: Array<[Vec, (n: number) => DirKey[]]> = [
    [[1, 0], repeat('v')],
    [[-1, 0], repeat('^')],
    [[0, 1], repeat('>')],
    [[0, -1], repeat('<')],
  ];

  const dynamicPairs: Array<[Vec, string]> = [
    [[1, 1], 'v>'],
    [[1, -1], 'v<'],
    [[-1, 1], '^>'],
    [[-1, -1], '^<'],
  ];

  const configedPairs: Array<[Vec, TranslateFn]> = dynamicPairs.map(
    ([v, s], i) => {
      const [vert, lat] = s.split('') as [DirKey, DirKey];

      const vertFirst = config[i];
      // Overrides for invalid positions (blank space on num keys/dir keys)
      const vertFirstFn = (r: number, c: number) =>
        concat(repeat(vert, Math.abs(r)), repeat(lat, Math.abs(c)));
      const latFirstFn = (r: number, c: number) =>
        concat(repeat(lat, Math.abs(c)), repeat(vert, Math.abs(r)));

      // The worst thing I've ever done, maybe
      const tfn: TranslateFn = (deltaR, deltaC, origR, origC) =>
        vertFirst
          ? equals(invalidVec, [deltaR + origR, origC])
            ? latFirstFn(deltaR, deltaC)
            : vertFirstFn(deltaR, deltaC)
          : equals(invalidVec, [origR, deltaC + origC])
            ? vertFirstFn(deltaR, deltaC)
            : latFirstFn(deltaR, deltaC);

      return [v, tfn];
    },
  );

  return (x, y, origR, origC) => {
    if (x === 0 && y === 0) return [];

    const nVec = normalize(x, y);
    if (x === 0 || y === 0) {
      return staticPairs.find(p => equals(p[0], nVec))![1](Math.abs(x || y));
    }

    return configedPairs.find(p => equals(p[0], nVec))![1](x, y, origR, origC);
  };
};

const translate = (
  mapper: Record<string, Vec>,
  vectorFn: TranslateFn,
  code: string[],
): DirKeyGroup => {
  let curPos: Vec = mapper.A;
  let nextSequence: DirKeyGroup = [];
  for (const ch of code) {
    const target = mapper[ch];
    const [x, y] = curPos;
    const [tx, ty] = target;
    const dx = tx - x;
    const dy = ty - y;
    const segment = vectorFn(dx, dy, x, y);
    if (segment.length === 0) {
      last(nextSequence)!.push('A');
    } else {
      segment.push('A');
      nextSequence.push(segment);
    }
    curPos = target;
  }
  return nextSequence;
};

type Config = [boolean, boolean, boolean, boolean];
const cachedShortestSegment = (
  config: Config,
  seeds: string[],
  depth: number,
) => {
  const numVFn = precalculateVectorFn(config, InvalidNumericPos);
  const dirVFn = precalculateVectorFn(config, InvalidDirectionPos);

  const caches: Array<Map<string, Tally>> = times(() => new Map(), depth);

  const lookupValue = (code: string[], generation: number): Tally => {
    const curGen = caches[generation];
    const codeKey = code.join('');
    const cachedValue = curGen.get(codeKey);
    if (cachedValue) return cachedValue;

    const newTally = translate(DirectionalKeypadMap, dirVFn, code).reduce(
      (tally, subCode) => {
        const subTally =
          generation >= 1
            ? lookupValue(subCode, generation - 1)
            : { [subCode.join('')]: 1n };
        for (const [key, count] of toPairs(subTally)) {
          tally[key] ||= 0n;
          tally[key] += count;
        }
        return tally;
      },
      {} as Tally,
    );

    curGen.set(codeKey, newTally);
    return newTally;
  };

  return bigSum(
    seeds.map(seed => {
      const seedCodes = translate(NumericKeypadMap, numVFn, seed.split(''));
      return (
        BigInt(parseInt(seed)) *
        seedCodes.reduce((acc: bigint, code) => {
          const subTally = toPairs(lookupValue(code, depth - 1));
          return subTally.reduce((s, [k, v]) => s + BigInt(k.length) * v, acc);
        }, 0n)
      );
    }),
  );
};

const allConfigs = () => {
  const configs: Config[] = [];

  times(i => {
    configs.push(
      i
        .toString(2)
        .padStart(4, '0')
        .split('')
        .map(x => x === '1') as Config,
    );
  }, 16);

  return configs;
};

export const codeComplexity = (input: string, bots: number) => {
  const seeds = input.trim().split('\n');
  return allConfigs().reduce((lowest, c) => {
    const result = cachedShortestSegment(c, seeds, bots);
    return lowest === 0n || result < lowest ? result : lowest;
  }, 0n);
};
