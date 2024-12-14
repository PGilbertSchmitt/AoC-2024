import { all, count, filter, isNotNil, sum, uniq } from 'ramda';
import { Vec } from '../types';
import { coordToKey } from '../utils';

export interface Region {
  id: string;
  fences: number;
  locations: Vec[];
}

interface SearchSpace {
  r: number;
  c: number;
  id?: string;
}

type PosKeyFn = (x: number, y: number) => number | null;

export class Garden {
  private garden: string[][];
  private regions: Map<number, Region>;
  private posKey: PosKeyFn;
  private posKeyPlus: PosKeyFn;

  constructor(grid: string[][]) {
    this.regions = new Map();
    this.garden = grid;
    const height = this.garden.length;
    const width = this.garden[0].length;
    this.posKey = coordToKey(height - 1, width - 1);
    // Needed for the bulk calculation
    this.posKeyPlus = coordToKey(height, width);
    this.fillRegions();
  }

  fenceCost() {
    return sum(
      Array.from(new Set(this.regions.values())).map(
        ({ fences, locations }) => fences * locations.length,
      ),
    );
  }

  bulkFenceCost() {
    const regions = Array.from(new Set(this.regions.values())).map(reg => ({
      ...reg,
    }));

    return sum(
      // Number of corners is the same as the number of sides
      regions.map(reg => this.regionCorners(reg) * reg.locations.length),
    );
  }

  private fillRegions() {
    this.garden.forEach((line, row) => {
      line.forEach((id, col) => {
        this.pushSpace(id, [row, col]);
      });
    });
  }

  private priorNeighbors([r, c]: Vec): Array<Vec> {
    return [
      [r - 1, c],
      [r, c - 1],
    ];
  }

  private pushSpace(id: string, pos: Vec) {
    const neighboringRegions = this.priorNeighbors(pos)
      .map(p => {
        const key = this.posKey(...p);
        return isNotNil(key) ? this.regions.get(key) : null;
      })
      .filter(isNotNil)
      .filter(reg => reg.id === id);

    const key = this.posKey(...pos)!;
    switch (neighboringRegions.length) {
      case 0: {
        this.regions.set(key, { id, fences: 4, locations: [pos] });
        break;
      }
      case 1: {
        const existingRegion = neighboringRegions[0];
        existingRegion.fences += 2;
        existingRegion.locations.push(pos);
        this.regions.set(key, existingRegion);
        break;
      }
      case 2: {
        const [regA, regB] = neighboringRegions;
        // Thank you reference equality
        if (regA !== regB) {
          // Two regions that need to be merged
          const totalRegion: Region = {
            id,
            fences: regA.fences + regB.fences, // This just works out, I think...
            locations: [...regA.locations, ...regB.locations, pos],
          };
          totalRegion.locations.forEach(loc =>
            this.regions.set(this.posKey(...loc)!, totalRegion),
          );
        } else {
          // Fence count doesn't change
          regA.locations.push(pos);
          this.regions.set(key, regA);
        }
        break;
      }
      default:
        throw new Error('not possible');
    }
  }

  private atGardenPlot(r: number, c: number) {
    const line = this.garden[r];
    return line && line[c];
  }

  private searchSpace(r: number, c: number): SearchSpace {
    return {
      r,
      c,
      id: this.atGardenPlot(r, c),
    };
  }

  // Because the number of sides is equal to the number of corners
  // I wish I could imagine a cleaner way to do this crap
  // This is where the imposter syndrome creeps up
  private regionCorners(reg: Region) {
    const regionSet = new Set(reg.locations.map(p => this.posKeyPlus(...p)));

    const searchLocationsWithDups = [...reg.locations];
    reg.locations.forEach(([r, c]) => {
      const searchSpaces: Vec[] = [
        [r + 1, c],
        [r, c + 1],
        [r + 1, c + 1],
      ];
      searchSpaces.forEach(s => {
        searchLocationsWithDups.push(s);
      });
    });

    const searchLocations = uniq(searchLocationsWithDups);

    let corners = 0;

    const isRegion = (space: SearchSpace) => {
      const key = this.posKeyPlus(space.r, space.c);
      return isNotNil(key) && regionSet.has(key);
    };

    for (const [r, c] of searchLocations) {
      const regionPoints = [
        this.searchSpace(r, c),
        this.searchSpace(r - 1, c),
        this.searchSpace(r - 1, c - 1),
        this.searchSpace(r, c - 1),
      ].filter(isRegion);

      switch (regionPoints.length) {
        case 1:
        case 3: {
          // Corner of the region (1 is other corner, 3 is inner corner)
          corners += 1;
          break;
        }
        case 2: {
          const [spotA, spotB] = regionPoints;
          if (spotA.r === spotB.r || spotA.c === spotB.c) {
            // Edge, no corner
          } else {
            // throw new Error('GOTEEM');
            // Not an edge, which ironically makes this an edge-case. This means a region wraps around
            // another region and pinches together at a corner without being contiguous like this:
            // . 0 0
            // 0 . 0
            // 0 0 0
            // This means we have 2 corners. I've checked, and this scenario does exist in the full input.
            corners += 2;
          }
          break;
        }
        case 4: {
          // Inside a region, no corner
          break;
        }
        default:
          throw new Error("Not possible, I don't think...");
      }
    }

    return corners;
  }
}
