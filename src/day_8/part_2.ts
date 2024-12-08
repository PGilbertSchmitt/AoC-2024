import { AntinodeCalculator, Pos } from "./part_1";

export const harmonics: AntinodeCalculator = (toKey, [x1, y1], [x2, y2]) => {
  const xDiff = x2 - x1;
  const yDiff = y2 - y1;
  const points: number[] = [];

  points.push(toKey(x1, y1)!);

  let addX = x1+xDiff
  let addY = y1+yDiff;
  while (true) {
    let key = toKey(addX, addY);
    if (key === null) break;
    points.push(key);
    addX += xDiff;
    addY += yDiff;
  }

  let subX = x1-xDiff
  let subY = y1-yDiff;
  while (true) {
    let key = toKey(subX, subY);
    if (key === null) break;
    points.push(key);
    subX -= xDiff;
    subY -= yDiff;
  }

  return points;
};
