import { any } from "ramda";

type Operator = (x: number, y: number) => number;
export const add: Operator = (x: number, y: number) => x + y;
export const mult: Operator = (x: number, y: number) => x * y;
export const concat: Operator = (x: number, y: number) => parseInt(`${x}${y}`);

export const calibrateOperators = (input: string, operators: Operator[]) =>
  input.trim().split('\n').reduce((total, line) => {
    const [resultStr, operandsStr] = line.split(': ');
    const result = parseInt(resultStr);
    const operands = operandsStr.split(' ').map(val => parseInt(val));

    const findValidEquation = (result: number, total: number, [operand, ...operands]: number[]): boolean => {
      if (total > result) return false;
      if (operand === undefined) return total === result;
      return any(op => findValidEquation(result, op(total, operand), operands), operators);
    }
    
    if (findValidEquation(result, 0, operands)) {
      total += result;
    }
    
    return total;
  }, 0);
