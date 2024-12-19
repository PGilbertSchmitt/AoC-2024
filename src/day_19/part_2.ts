import { isNotNil } from "ramda";
import { bigSum } from "../utils";

// Slower than the other way, but might get results
const match = (memo: Map<string, bigint>, patterns: string[], sequence: string): bigint => {
  const memoized = memo.get(sequence);
  if (isNotNil(memoized)) return memoized;

  let total = 0n;
  for (const pattern of patterns) {
    if (pattern.length === sequence.length && pattern === sequence) {
      total++;
    } else if (pattern.length < sequence.length && sequence.startsWith(pattern)) {
      total += match(memo, patterns, sequence.slice(pattern.length));
    }
  }

  memo.set(sequence, total);
  return total;
}

export const totalValidTowels = (input: string) => {
  const [patternStr, sequenceStr] = input.trim().split('\n\n');
  const patterns = patternStr.split(', ');
  const sequences = sequenceStr.split('\n');
  
  return bigSum(sequences.map(seq => {
    const count = match(new Map(), patterns, seq)
    console.log(`${count} <- ${seq}`);
    return count;
  }));
};

// console.log(totalValidTowels(`
// ggur, g, rgwr, rggw, wwru, uurgu, urg, uuugr, gwugu, wwwr, gw, gruu, urwr, rug, ruuruu, wrg, w, gwg, grg, rwrg, wwu, wgu, rrg, ugr, wrrgg, urgr, ugu, rwu, wg, rru, rwrrgugr, guu, wgwr, gww, wgug, uuu, grrr, ugwrr, uugwg, gg, urw, rwwrru, rwgr, gwu, wggw, rwwu, gr, rgr, gwug, guggwr, ggg, wwr, ugwrrw, grr, rgu, grwu, gugg, rgg, grguug, wgggr, ggrrug, wrug, ggrr, rgrg, ggr, uuuu, ug, ruur, grgg, urwgrg, wgg, urruu, wug, ggggw, wrgr, wrurrrg, wr, rrug, ur, rrw, ggu, rwg, wrugg, uurrr, rgw, rur, uu, wgw, u, wrr, uur, ugw, gur, ggww, rwr, wru, ugg, ugwg, rrgug, wrgwuuur, ruurwr, ruu, rgwg, ru, www, gug, rrr, uug, wgggrw, rrwgu, ruru, uurggr, ruugw, wugr, uru, rg, wuru, uuru, uggr, wrw, gru, guur, gurwu

// gggurgwrgguuug`));
