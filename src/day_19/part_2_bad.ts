import { isNotNil } from "ramda";
import { ColorList, newColorList } from "./color_list";
import { ColorTrie } from "./color_trie";
import { parseInput } from "./part_1";
import { Color, Colors } from "./colors";
import { bigSum } from "../utils";

const fromColorString = (colors: Color[]): string =>
  colors.map(color => {
    switch (color) {
      case Colors.WHITE: return 'w';
      case Colors.RED: return 'r';
      case Colors.BLUE: return 'u';
      case Colors.GREEN: return 'g';
      case Colors.BLACK: return 'b';
    }
  }).join('');

export const totalValidTowels = (input: string) => {
  const { patterns, sequences } = parseInput(input);

  const trie = new ColorTrie();
  patterns.forEach(pattern => trie.addPattern(pattern));
  const sequenceLists = sequences.map(newColorList);

  return bigSum(sequenceLists.map((seq, i) => {
    const memo = new Map<number, bigint>();

    const countValidSequences = (sequence: ColorList): bigint => {
      const memoized = memo.get(sequence.i);
      if (isNotNil(memoized)) return memoized;

      const [done, matches] = trie.allMatches(sequence);
      const count = (done ? 1n : 0n) + bigSum(matches.map(match => countValidSequences(match)));
      memo.set(sequence.i, count);
      return count;
    };

    const count = countValidSequences(seq);
    
    console.log(`${count} <- ${fromColorString(sequences[i])}`);
    return BigInt(count);
  }));
};

console.log(totalValidTowels(`
ggur, g, rgwr, rggw, wwru, uurgu, urg, uuugr, gwugu, wwwr, gw, gruu, urwr, rug, ruuruu, wrg, w, gwg, grg, rwrg, wwu, wgu, rrg, ugr, wrrgg, urgr, ugu, rwu, wg, rru, rwrrgugr, guu, wgwr, gww, wgug, uuu, grrr, ugwrr, uugwg, gg, urw, rwwrru, rwgr, gwu, wggw, rwwu, gr, rgr, gwug, guggwr, ggg, wwr, ugwrrw, grr, rgu, grwu, gugg, rgg, grguug, wgggr, ggrrug, wrug, ggrr, rgrg, ggr, uuuu, ug, ruur, grgg, urwgrg, wgg, urruu, wug, ggggw, wrgr, wrurrrg, wr, rrug, ur, rrw, ggu, rwg, wrugg, uurrr, rgw, rur, uu, wgw, u, wrr, uur, ugw, gur, ggww, rwr, wru, ugg, ugwg, rrgug, wrgwuuur, ruurwr, ruu, rgwg, ru, www, gug, rrr, uug, wgggrw, rrwgu, ruru, uurggr, ruugw, wugr, uru, rg, wuru, uuru, uggr, wrw, gru, guur, gurwu

gggurgwrgguuug`));
