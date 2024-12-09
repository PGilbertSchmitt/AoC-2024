export const parseConditionalMuls = (input: string) => {
  const muls = input.matchAll(/mul\((\d+),(\d+)\)|do\(\)|don't\(\)/g);
  let enabled = true;
  let sum = 0;
  for (const mul of muls) {
    switch (mul[0].slice(0, 3)) {
      case 'mul': {
        if (enabled) {
          sum += parseInt(mul[1]) * parseInt(mul[2]);
        }
        break;
      }
      case 'do(': {
        enabled = true;
        break;
      }
      case 'don': {
        enabled = false;
        break;
      }
      default:
        throw new Error('Unknown instruction');
    }
  }
  return sum;
};
