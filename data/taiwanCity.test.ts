import {
  bgtiles,
  isTaiwanCityWalkable,
  mapheight,
  mapwidth,
  objmap,
  tiledim,
} from './taiwanCity';

describe('Taiwan city map', () => {
  test('uses a complete 48 by 32 grid of 32px tiles', () => {
    expect(mapwidth).toBe(48);
    expect(mapheight).toBe(32);
    expect(tiledim).toBe(32);
    expect(bgtiles[0]).toHaveLength(mapwidth);
    expect(objmap[0]).toHaveLength(mapwidth);
    expect(bgtiles[0].every((column) => column.length === mapheight)).toBe(true);
    expect(objmap[0].every((column) => column.length === mapheight)).toBe(true);
  });

  test('connects apartment, entrance and outdoor social areas', () => {
    expect(isTaiwanCityWalkable(10, 6)).toBe(true);
    expect(isTaiwanCityWalkable(23, 12)).toBe(true);
    expect(isTaiwanCityWalkable(10, 20)).toBe(true);
    expect(isTaiwanCityWalkable(30, 27)).toBe(true);
  });

  test('blocks the outer boundary and building facade', () => {
    expect(isTaiwanCityWalkable(0, 10)).toBe(false);
    expect(isTaiwanCityWalkable(47, 10)).toBe(false);
    expect(isTaiwanCityWalkable(10, 13)).toBe(false);
  });
});
