import { parseInput } from "./part_1";
import { append, intersection, last } from "ramda";

export const largestLanParty = (input: string) => {
  const connections = parseInput(input);

  const bronKerboshAlgo = (
    r: string[], // Current maximal clique
    p: string[], // Remaining vertexes in graph
    x: string[], // Explored vertexes
  ): string[] => {
    if (p.length === 0 && x.length === 0) return r;
  
    let maximumClique: string[] = [];
    let curP = [...p];
    let curX = [...x];
    while (curP.length > 0) {
      const v = last(curP)!;
      const n = connections.get(v)!.to.map(c => c.id);
      const interN = intersection(n);
      const newClique = bronKerboshAlgo(
        append(v, r),
        interN(curP),
        interN(curX),
      );
      if (newClique.length > maximumClique.length) {
        maximumClique = newClique;
      }
      curP.pop();
      curX.push(v);
    }
    return maximumClique;
  };

  const maximumClique = bronKerboshAlgo([], Array.from(connections.keys()), []);
  return maximumClique.sort().join(',');
};
