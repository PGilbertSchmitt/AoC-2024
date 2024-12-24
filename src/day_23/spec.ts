import test from 'ava';
import { input, sample } from './input';
import { lanPartiesforT } from './part_1';
import { largestLanParty } from './part_2';

test('Part 1', t => {
  t.is(lanPartiesforT(sample), 7, 'sample');
  t.is(lanPartiesforT(input), 1284, 'input');
});

test('Part 2', t => {
  t.is(largestLanParty(sample), 'co,de,ka,ta', 'sample');
  t.is(
    largestLanParty(input),
    'bv,cm,dk,em,gs,jv,ml,oy,qj,ri,uo,xk,yw',
    'input',
  );
});
