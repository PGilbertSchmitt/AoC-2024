import { Vec } from 'src/types';
import { buildPath, PathElem } from './part_1';
import { dropLast, isNil, isNotNil, sum, times, uniq } from 'ramda';
import { tally } from 'src/utils';

interface CheatDiff {
  dr: number;
  dc: number;
  cost: number;
}

// My gut reaction is that the order of these diffs doesn't really matter since
// we need to check them all anyways, and the work when we find a more efficient
// path isn't that much.
// Overall, this generates 840 total distinct diffs
const precalcCheatDiffs = (maxDist: number): CheatDiff[] => {
  const diffs: CheatDiff[] = [];
  times(r => {
    const remainder = maxDist - r;
    times(c => {
      const cost = r + c;
      if (cost > 0) {
        diffs.push({
          dr: r,
          dc: c,
          cost,
        });
        const positiveR = r > 0;
        const positiveC = c > 0;
        // Holy shit, is this FIZZBUZZ??
        if (positiveR) {
          diffs.push({
            dr: -r,
            dc: c,
            cost,
          });
        }
        if (positiveC) {
          diffs.push({
            dr: r,
            dc: -c,
            cost,
          });
        }
        if (positiveC && positiveR) {
          diffs.push({
            dr: -r,
            dc: -c,
            cost,
          });
        }
      }
    }, remainder + 1);
  }, maxDist + 1);

  // uniq be expensive, which is why this is precalculated
  return uniq(diffs);
};

export const longCheats = (
  input: string,
  minSavings: number,
  cheatDist: number,
) => {
  const { path, pathMap, posKey } = buildPath(input);

  const diffs = precalcCheatDiffs(cheatDist);
  const cheatSquares = ({ cost, pos: [r, c] }: PathElem) =>
    sum(
      diffs
        .map(diff => {
          const newR = r + diff.dr;
          const newC = c + diff.dc;
          const key = posKey(newR, newC);
          if (isNil(key)) return 0;
          const cheatSpace = pathMap.get(key);
          if (isNil(cheatSpace)) return 0;
          const savings = cheatSpace.cost - (cost + diff.cost);
          return savings >= minSavings ? 1 : 0;
        })
        .filter(isNotNil),
    );

  let validSavings = 0;
  for (const elem of dropLast(1, path)) {
    validSavings += cheatSquares(elem);
  }

  return validSavings;
};
