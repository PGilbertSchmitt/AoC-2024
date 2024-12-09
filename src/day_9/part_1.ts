import { sum, times } from "ramda";

export const parseInput = (input: string) => input
    .trim()
    .split('')
    .reduce(
      (list: Array<number>, ch, i) => {
        const count = parseInt(ch);
        times(() => list.push(i % 2 === 0 ? i / 2 : -1), count);
        return list;
      },
      [],
    );

export const compactFilesystemNaive = (input: string) => {
  const fileSystem = parseInput(input);

  let firstSpaceIdx = fileSystem.findIndex(v => v < 0);
  let lastDataIdx = fileSystem.length - 1;

  while (firstSpaceIdx < lastDataIdx) {
    fileSystem[firstSpaceIdx] = fileSystem[lastDataIdx];
    fileSystem[lastDataIdx] = -1;

    while (fileSystem[firstSpaceIdx] >= 0) firstSpaceIdx++;
    while (fileSystem[lastDataIdx] < 0) lastDataIdx--;
  }

  return sum(fileSystem.filter(x => x !== -1).map((x, i) => x * i));
};
