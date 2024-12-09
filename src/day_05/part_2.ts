import { equals, sort as sort_, sum } from 'ramda';

interface Input {
  comparator: (a: number, b: number) => number;
  sections: Array<number[]>;
}

const parseInput = (input: string): Input => {
  const [pairsPart, sectionsPart] = input.trim().split('\n\n');

  const pairs = pairsPart.split('\n').map(line => {
    const [x, y] = line.split('|');
    return [parseInt(x), parseInt(y)];
  });

  const pairLookupMap = new Map<number, Map<number, number>>();
  pairs.forEach(([lesser, greater]) => {
    const lesserElMap =
      pairLookupMap.get(lesser) ||
      pairLookupMap.set(lesser, new Map()).get(lesser)!;
    const greaterElMap =
      pairLookupMap.get(greater) ||
      pairLookupMap.set(greater, new Map()).get(greater)!;
    lesserElMap.set(greater, -1);
    greaterElMap.set(lesser, 1);
  });

  return {
    comparator: (a, b) => pairLookupMap.get(a)?.get(b) || 0,
    sections: sectionsPart
      .split('\n')
      .map(line => line.split(',').map(x => parseInt(x))),
  };
};

export const sumOfMiddleFixedSections = (input: string) => {
  const { comparator, sections } = parseInput(input);

  const sort = sort_(comparator);

  const getFixedMiddleValue = (section: number[]) => {
    const updatedSection = sort(section);
    return equals(updatedSection, section)
      ? 0
      : updatedSection[(updatedSection.length - 1) / 2];
  };

  return sum(sections.map(getFixedMiddleValue));
};
