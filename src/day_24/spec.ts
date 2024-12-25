import test from 'ava';
import { input, sample, sample2 } from './input';
import { runCircuit } from './part_1';

test('Part 1', t => {
  t.is(runCircuit(sample), 4n, 'sample');
  t.is(runCircuit(sample2), 2024n, 'sample2');
  t.is(runCircuit(input), 43942008931358n, 'input');
});

// Part 2: dvb,fhg,fsq,tnc,vcf,z10,z17,z39
// Did it pseudo-manually, but used the code on ./part_2 to look for
// patterns that didn't match
