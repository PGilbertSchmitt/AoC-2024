import { sum } from "ramda";
import { toLists } from "./part_1";
import { tally } from "../utils";

export const similarityScore = (input: string) => {
  const [left, right] = toLists(input);
  const occurances = tally(right);
  return sum(left.map(x => x * (occurances.get(x) || 0)));
};