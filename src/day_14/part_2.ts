import { repeat, times } from 'ramda';
import { Bot, parseInput } from './part_1';

export const robotStepper = (input: string, width: number, height: number) => {
  const locationAfterSteps = (steps: number) => (bot: Bot) => {
    const {
      pos: [px, py],
      vel: [dx, dy],
    } = bot;
    let x = (dx * steps + px) % width;
    if (x < 0) x += width;
    let y = (dy * steps + py) % height;
    if (y < 0) y += height;
    bot.pos = [x, y];
  };

  const printBots = (bots: Array<Bot>) => {
    const canvas = times(() => repeat(' ', width), height);
    bots.forEach(({ pos: [x, y] }) => (canvas[y][x] = '#'));
    canvas.forEach(line => console.log(line.join('')));
  };

  const bots = parseInput(input);
  bots.forEach(locationAfterSteps(6398));
  printBots(bots);
};
