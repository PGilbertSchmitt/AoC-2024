import { max, sum, times } from "ramda";

type FSMap = Map<number, Array<[number, number]>>;

export const parseInput = (input: string): FSMap => input
  .trim()
  .split('')
  .reduce(
    (m, ch, i) =>
      m.set(i, [[parseInt(ch), i % 2 === 0 ? i / 2 : -1]]),
    new Map(),
  );

const checksum = (fileSystem: FSMap): number => {
  const elements: number[] = [];
  // This works because the JS Map maintains the order of insertion (so long as the
  // values are not removed)
  for (const parts of fileSystem.values()) {
    for (const [count, val] of parts) {
      times(() => elements.push(max(0, val)), count);
    }
  }
  return sum(elements.map((v, i) => v * i));
};

const last = <T>(list: T[]): T => list[list.length - 1];

export const compactFilesystem = (input: string) => {
  const fileSystem = parseInput(input);

  let largestSpace = Infinity;

  const tryToInsert = (count: number, id: number, dataIdx: number): boolean => {
    if (count > largestSpace) return false;
    for (let spaceIdx = 1; spaceIdx < dataIdx; spaceIdx += 2) {
      const spaceLocation = fileSystem.get(spaceIdx)!;
      const space = last(spaceLocation);
      if (count <= space[0]) {
        const [spaceCount] = spaceLocation.pop()!;
        spaceLocation.push([count, id]);
        spaceLocation.push([spaceCount - count, -1]);
        return true;
      }
    }
    largestSpace = count - 1;
    return false;
  }

  for (let dataIdx = fileSystem.size - 1; dataIdx > 1; dataIdx -= 2) {
    const entry = fileSystem.get(dataIdx)![0];
    if (tryToInsert(...entry, dataIdx)) {
      entry[1] = -1;
    }
  }

  return checksum(fileSystem);
}
