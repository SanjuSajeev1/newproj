/**
 * Rounded-rect path with one concave (inverted-radius) corner for premium cards.
 * Corner cuts use a circular arc biting inward toward the card center.
 */
const CORNER_R = 16;
const CUT_R = 26;

export type ConcaveCorner = 'topRight' | 'bottomLeft';

export function buildCategoryClipPath(
  w: number,
  h: number,
  cut: ConcaveCorner,
  cornerR: number = CORNER_R,
  cutR: number = CUT_R,
): string {
  const r = Math.min(cornerR, Math.min(w, h) / 2 - 1);
  const c = Math.min(cutR, Math.min(w, h) / 2 - 4);
  const W = Math.max(w, r + c + 8);
  const H = Math.max(h, r + c + 8);

  if (cut === 'topRight') {
    return [
      `M ${r} 0`,
      `L ${W - c} 0`,
      `A ${c} ${c} 0 0 1 ${W} ${c}`,
      `L ${W} ${H - r}`,
      `A ${r} ${r} 0 0 1 ${W - r} ${H}`,
      `L ${r} ${H}`,
      `A ${r} ${r} 0 0 1 0 ${H - r}`,
      `L 0 ${r}`,
      `A ${r} ${r} 0 0 1 ${r} 0`,
      'Z',
    ].join(' ');
  }

  return [
    `M ${r} 0`,
    `L ${W - r} 0`,
    `A ${r} ${r} 0 0 1 ${W} ${r}`,
    `L ${W} ${H - r}`,
    `A ${r} ${r} 0 0 1 ${W - r} ${H}`,
    `L ${c} ${H}`,
    `A ${c} ${c} 0 0 1 0 ${H - c}`,
    `L 0 ${r}`,
    `A ${r} ${r} 0 0 1 ${r} 0`,
    'Z',
  ].join(' ');
}
