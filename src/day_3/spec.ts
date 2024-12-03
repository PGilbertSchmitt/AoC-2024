import _test, { TestFn } from 'ava';
import { getInput, sample1, sample2 } from './input';
import { parseMuls } from './part_1';
import { parseConditionalMuls } from './part_2';

const test = _test as TestFn<{ input: string }>;

test.before('Get input', async t => {
  t.context.input = (await getInput()).toString();
});

test('Part 1', async t => {
  t.is(parseMuls(sample1), 161, 'sample');
  t.is(parseMuls(t.context.input), 173731097, 'input');
});

test('Part 2', t => {
  t.is(parseConditionalMuls(sample2), 48, 'sample');
  t.is(parseConditionalMuls(t.context.input), 93729253, 'input');
});
