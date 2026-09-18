// Taiwan urban apartment + neighborhood map, based on the approved V0 concept art.
// The 1536x1024 image is used as a 48x32 atlas of unique 32px tiles.

export const tilesetpath = '/ai-town/assets/taiwan-city-map-v1.png';
export const tiledim = 32;
export const screenxtiles = 48;
export const screenytiles = 32;
export const tilesetpxw = 1536;
export const tilesetpxh = 1024;
export const mapwidth = screenxtiles;
export const mapheight = screenytiles;

const tileIndex = (x: number, y: number) => x + y * screenxtiles;

// Every location in the source image is its own tile.
export const bgtiles = [
  Array.from({ length: screenxtiles }, (_, x) =>
    Array.from({ length: screenytiles }, (_, y) => tileIndex(x, y)),
  ),
];

export function isTaiwanCityWalkable(x: number, y: number): boolean {
  if (x <= 0 || y <= 0 || x >= screenxtiles - 1 || y >= screenytiles - 1) return false;

  // Shared apartment interior.
  if (y >= 2 && y <= 9 && x >= 3 && x <= 44) return true;

  // Apartment entrance and stairwell connect the home to street level.
  if (y >= 10 && y <= 16 && x >= 22 && x <= 25) return true;

  // Storefront sidewalk, pocket park and city streets. A broad initial navigation
  // area prevents autonomous residents from becoming trapped during V1 testing.
  if (y >= 17 && y <= 30 && x >= 1 && x <= 46) return true;

  return false;
}

// Object-layer entries provide collision while redrawing the exact same source tile,
// so the full concept image remains visually unchanged.
export const objmap = [
  Array.from({ length: screenxtiles }, (_, x) =>
    Array.from({ length: screenytiles }, (_, y) =>
      isTaiwanCityWalkable(x, y) ? -1 : tileIndex(x, y),
    ),
  ),
];

export const animatedsprites: never[] = [];
