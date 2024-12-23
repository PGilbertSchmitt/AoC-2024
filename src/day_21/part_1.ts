
import { concat, equals, repeat, sum, times } from "ramda";
import { Vec } from "src/types";
import { sample } from "./input";

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
type NumericKey = keyof typeof NumericKeypadMap;

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
  'v': [1, 1],
  '>': [1, 2],
} as const;

const InvalidDirectionPos: Vec = [0, 0];
type DirKey = keyof typeof DirectionalKeypadMap;

type Config = [boolean, boolean, boolean, boolean];

type TranslateFn = (r: number, c: number, origR: number, origC: number) => DirKey[];

const normalize = (x: number, y: number): Vec => {
  const nx = x === 0 ? 0 : x > 0 ? 1 : -1;
  const ny = y === 0 ? 0 : y > 0 ? 1 : -1;
  return [nx, ny];
};

const precalculateVectorFn = (config: [boolean, boolean, boolean, boolean], invalidVec: Vec): TranslateFn => {
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

  const configedPairs: Array<[Vec, TranslateFn]> = dynamicPairs.map(([v, s], i) => {
    const [vert, lat] = s.split('') as [DirKey, DirKey];
    
    const vertFirst = config[i];
    // Overrides for invalid positions (blank space on num keys/dir keys)
    const vertFirstFn = (r: number, c: number) => concat(repeat(vert, Math.abs(r)), repeat(lat, Math.abs(c)));
    const latFirstFn = (r: number, c: number) => concat(repeat(lat, Math.abs(c)), repeat(vert, Math.abs(r)));

    // The worst thing I've ever done, maybe
    const tfn: TranslateFn = (deltaR, deltaC, origR, origC) =>
      vertFirst
        ? equals(invalidVec, [deltaR + origR, origC]) ? latFirstFn(deltaR, deltaC) : vertFirstFn(deltaR, deltaC)
        : equals(invalidVec, [origR, deltaC + origC]) ? vertFirstFn(deltaR, deltaC) : latFirstFn(deltaR, deltaC);

    return [v, tfn];
  });

  return (x, y, origR, origC) => {
    if (x === 0 && y === 0) return [];

    const nVec = normalize(x, y);
    if (x === 0 || y === 0) {
      return staticPairs.find(p => equals(p[0], nVec))![1](Math.abs(x || y));
    }

    return configedPairs.find(p => equals(p[0], nVec))![1](x, y, origR, origC);
  };
};

const allConfigs = () => {
  const configs: Config[] = [];

  times(i => {
    configs.push(i.toString(2).padStart(4, '0').split('').map(x => x === '1') as Config);
  }, 16);

  return configs;
};

const translateFromNumeric = (vectorFn: TranslateFn, code: NumericKey[]): DirKey[] => {
  let curPos: Vec = NumericKeypadMap.A;
  let nextSequence: DirKey[] = [];
  for (const ch of code) {
    const target = NumericKeypadMap[ch];
    const [x, y] = curPos;
    const [tx, ty] = target;
    const dx = tx - x;
    const dy = ty - y;
    const segment = vectorFn(dx, dy, x, y);
    segment.push('A');
    nextSequence = nextSequence.concat(segment);
    curPos = target;
  }
  return nextSequence;
};

const translateFromDirs = (vectorFn: TranslateFn, code: DirKey[]): DirKey[] => {
  const translateFrom = (code: DirKey[]) => {
    let curPos: Vec = DirectionalKeypadMap.A;
    let nextSequence: DirKey[] = [];
    for (const ch of code) {
      const target = DirectionalKeypadMap[ch];
      const [x, y] = curPos;
      const [tx, ty] = target
      const dx = tx - x;
      const dy = ty - y;
      const segment = vectorFn(dx, dy, x, y);
      segment.push('A');
      nextSequence = nextSequence.concat(segment);
      curPos = target;
    }
    return nextSequence;
  };

  const tmp = translateFrom(code);
  // const tmp2 = translateFrom(tmp);
  return translateFrom(tmp);
}

const shortestLength = (code: NumericKey[]) => {
  let shortest = Infinity;
  allConfigs().forEach(c => {
    const numVFn = precalculateVectorFn(c, InvalidNumericPos);
    const dirVFn = precalculateVectorFn(c, InvalidDirectionPos);
  
    const strLen = translateFromDirs(dirVFn, translateFromNumeric(numVFn, code)).length;
    if (strLen < shortest) {
      shortest = strLen;
    }
  });
  return shortest;
};

export const codeComplexity = (input: string) =>
  sum(input
    .trim()
    .split('\n')
    .map(line => {
      const code = line.split('');
      return parseInt(line) * shortestLength(code as NumericKey[]);
    })
  )
