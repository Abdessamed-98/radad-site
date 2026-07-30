/* Static dot grid, densest and largest behind the mark, shrinking away with
 * distance until the dots vanish entirely.
 *
 * Nothing here animates. Size and opacity are baked per dot at build time,
 * so the whole field rasterises once and costs nothing per frame — no
 * compositor layers, no mask (a mask over many children rebuilds a large
 * intermediate texture whenever any of them changes), and nothing behind the
 * frosted disc to keep dirtying its backdrop-filter.
 *
 * Dots that fall below a visible size are dropped rather than emitted at
 * sub-pixel sizes, which just shimmer. That makes the sequence sparse, so
 * every dot carries an explicit grid position — auto-placement would shuffle
 * the survivors into the wrong cells.
 *
 * Geometry comes from fixed constants, never Math.random(), so server and
 * client markup always agree. */

const COLS = 48;
const ROWS = 16;

/** Falloff origin in normalised field space — sits under the logo. */
const ORIGIN_X = 0.5;
const ORIGIN_Y = 0.26;

/** Envelope radii as fractions of the field box. Distance is measured in raw
 *  box fractions, so the ellipse matches the field's own proportions. */
const RADIUS_X = 0.62;
const RADIUS_Y = 0.92;

/** Dot diameter at the centre, in px. Falls to nothing at the envelope edge. */
const MAX_SIZE = 4.4;

/** Below this the dot is sub-pixel and only shimmers — drop it instead. */
const MIN_SIZE = 0.9;

/** Smooth ease so the field thins out gradually rather than on a hard ring. */
const smoothstep = (t: number) => t * t * (3 - 2 * t);

type Dot = { col: number; row: number; size: number; opacity: number };

export function DotWave() {
  const dots: Dot[] = [];

  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const dx = (c + 0.5) / COLS - ORIGIN_X;
      const dy = (r + 0.5) / ROWS - ORIGIN_Y;

      const u = Math.hypot(dx / RADIUS_X, dy / RADIUS_Y);
      if (u >= 1) continue;

      const t = smoothstep(1 - u);
      const size = MAX_SIZE * t;
      if (size < MIN_SIZE) continue;

      dots.push({
        col: c + 1,
        row: r + 1,
        size,
        // a little opacity falloff too, so the smallest dots retire cleanly
        opacity: 0.35 + 0.65 * t,
      });
    }
  }

  return (
    <div className="hero-grid" aria-hidden="true">
      {dots.map((d, i) => (
        <i
          key={i}
          style={{
            gridColumn: d.col,
            gridRow: d.row,
            width: `${d.size.toFixed(2)}px`,
            height: `${d.size.toFixed(2)}px`,
            opacity: d.opacity.toFixed(2),
          }}
        />
      ))}
    </div>
  );
}
