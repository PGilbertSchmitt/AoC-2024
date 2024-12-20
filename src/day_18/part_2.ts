import { PriorityQueue } from "src/priority-queue";
import { coordToKey } from "src/utils";
import { getCoords, neighbors } from "./part_1";
import { Vec } from "../types";

interface QElem {
  distToEnd: number;
  location: Vec;
  prev?: QElem;
}

const pathFromNode = (elem: QElem) => {
  const path = [elem.location];
  let prev = elem.prev;
  while (prev) {
    path.push(prev.location);
    prev = prev.prev;
  }
  return path;
}

export const firstBlockedSpace = (input: string, size: number): Vec => {
  const posKey = coordToKey(size, size);
  const blocks = getCoords(input, Infinity);
  const finalPosKey = posKey(size, size)!;
  const currentWalls = new Set<number>();

  const findPath = (): Vec[] | null => {
    const queue = new PriorityQueue<QElem>((q1, q2) => q1.distToEnd < q2.distToEnd);
    queue.push({
      distToEnd: size * 2,
      location: [0, 0],
    });
    const visited = new Set<number>([posKey(0, 0)!]);

    while (true) {
      const currentPos = queue.pop();
      if (!currentPos) return null;

      for (const [x, y] of neighbors(currentPos.location)) {
        const nKey = posKey(x, y);
        if (nKey === finalPosKey) {
          return pathFromNode(currentPos);
        } else if (nKey !== null && !currentWalls.has(nKey) && !visited.has(nKey)) {
          visited.add(nKey);
          queue.push({
            distToEnd: (size*2) - x - y,
            location: [x, y],
            prev: currentPos,
          });
        }
      }
    }
  };

  const pathSet = new Set<number>();
  findPath()!.forEach(v => pathSet.add(posKey(...v)!));
  for (const block of blocks) {
    const blockKey = posKey(...block)!;
    currentWalls.add(blockKey);
    if (pathSet.has(blockKey)) {
      const newPath = findPath();
      if (newPath === null) return block;
      pathSet.clear();
      newPath.forEach(v => pathSet.add(posKey(...v)!));
    }
  }

  throw new Error('No solution');
};
