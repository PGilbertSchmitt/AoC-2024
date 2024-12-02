import { any, remove } from "ramda";
import { parseInput, safeEntry } from "./part_1";

const dampenEntry = (entry: number[], i: number): number[] => remove(i, 1, entry);

export const safeEntryWithDampener = (entry: number[]): boolean => {
  const allPossibilities: Array<number[]> = [
    entry,
    ...entry.map((_, i) => dampenEntry(entry, i)),
  ];

  return any(safeEntry, allPossibilities);
};

export const countSaferReports = (input: string): number =>
  parseInput(input).filter(safeEntryWithDampener).length;
