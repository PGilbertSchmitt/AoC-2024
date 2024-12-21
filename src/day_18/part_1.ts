import { take } from 'ramda';
import { Vec } from 'src/types';
import { coordToKey, neighbors } from '../utils';

export const getCoords = (input: string, maxBytes: number): Vec[] =>
  take(maxBytes, input.trim().split('\n')).map(line => {
    const [_, col, row] = line.match(/(\d+),(\d+)/)!;
    return [parseInt(col), parseInt(row)];
  });

interface QElem {
  cost: number;
  location: Vec;
}

export const fewestPathSquares = (
  input: string,
  size: number,
  maxBytes: number,
) => {
  const posKey = coordToKey(size, size);
  const blocked = new Set(getCoords(input, maxBytes).map(v => posKey(...v)!));

  const queue: Array<QElem> = [{ cost: 0, location: [0, 0] }];
  let qIdx = 0;
  const finalPosKey = posKey(size, size)!;

  while (true) {
    const currentPos = queue[qIdx];

    if (!currentPos) break;

    const neighborCost = currentPos.cost + 1;
    for (const n of neighbors(currentPos.location)) {
      const nKey = posKey(...n);
      if (nKey === finalPosKey) {
        return neighborCost;
      } else if (nKey !== null && !blocked.has(nKey)) {
        blocked.add(nKey);
        queue.push({
          cost: neighborCost,
          location: n,
        });
      }
    }

    qIdx++;
  }

  return -1;
};
