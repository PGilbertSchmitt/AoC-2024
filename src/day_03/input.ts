import { readFile } from 'fs/promises';

export const sample1 = `xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))`;

export const sample2 = `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`;

// Normally, I wouldn't do this, but the full input is multiline and contains other characters which would need to be escaped.
export const getInput = () => readFile('src/day_03/input.txt');
