import { all, append, isNil, sum } from 'ramda';

const lt = (x: number, y: number) => x < y;
const gt = (x: number, y: number) => x > y;

type CompFn = typeof lt | typeof gt;
type CompPair = [number, CompFn];

type PairMap = Map<number, Array<CompPair>>;

interface Input {
  pairMap: PairMap;
  sections: Array<Map<number, number>>;
}

const parseInput = (input: string): Input => {
  const [pairsPart, sectionsPart] = input.trim().split('\n\n');
  return {
    pairMap: generateOrderMap(
      pairsPart.split('\n').map(line => {
        const [x, y] = line.split('|');
        return [parseInt(x), parseInt(y)];
      }),
    ),
    sections: sectionsPart.split('\n').map(line =>
      line
        .split(',')
        .map(x => parseInt(x))
        .reduce(
          // Quick index lookup. The section sizes range from 5 to 20 elements. It's possible that `findIndex` would
          // actually be faster for such small arrays (TODO worth looking into)
          (m, val, i) => m.set(val, i),
          new Map<number, number>(),
        ),
    ),
  };
};

const generateOrderMap = (
  pairs: Array<[number, number]>,
): Map<number, Array<CompPair>> =>
  pairs.reduce((m, [lesser, greater]) => {
    m.set(lesser, append([greater, lt], m.get(lesser) || []));

    return m.set(greater, append([lesser, gt], m.get(greater) || []));
  }, new Map<number, Array<CompPair>>());

// I've verified the assertion that the number in each section only appears at most 1 time, so there are
// no duplicates (if there were, this would not work).
const findValidSections = ({ pairMap, sections }: Input) =>
  sections.filter(section =>
    all(
      ([el, elIndex]) =>
        all(
          ([other, comp]) => {
            const otherIndex = section.get(other);
            return isNil(otherIndex) || comp(elIndex, otherIndex);
          },
          pairMap.get(el) || [],
        ),
      Array.from(section.entries()),
    ),
  );

export const sumOfMiddleValidSections = (input: string): number => {
  const validSections = findValidSections(parseInput(input));
  return sum(
    validSections.map(
      section => Array.from(section.keys())[(section.size - 1) / 2],
    ),
  );
};
