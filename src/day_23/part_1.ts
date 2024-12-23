import { concat, reduce } from "ramda";
import { sample } from "./input";

interface Connection {
  id: string;
  to: Connection[];
}

type ConnectionMap = Map<string, Connection>;

export const parseInput = (input: string): ConnectionMap => reduce(
  (conns: ConnectionMap, line) => {
    const [a, b] = line.split('-');

    const aConn = conns.get(a) || {
      id: a,
      to: [],
    };
    const bConn = conns.get(b) || {
      id: b,
      to: [],
    };

    aConn.to.push(bConn);
    bConn.to.push(aConn);
    conns.set(a, aConn);
    conns.set(b, bConn);

    return conns;
  },
  new Map(),
  input.trim().split('\n'),
);

export const lanPartiesforT = (input: string) => {
  const connections = parseInput(input);

  const triplets: Set<string> = new Set();

  for (const [id, first] of connections) {
    if (id.startsWith('t')) {
      sharedConnections(first.to).forEach(([a, b]) => {
        triplets.add([id, a, b].sort().join('-'));
      });
    }
  }

  return triplets.size;
};

const sharedConnections = ([next, ...rest]: Connection[]): [string, string][] => {
  if (rest.length === 0) return [];
  const mutuals = rest.filter(c => next.to.includes(c)).map(c => [next.id, c.id] as [string, string]);
  return concat(mutuals, sharedConnections(rest));
};
