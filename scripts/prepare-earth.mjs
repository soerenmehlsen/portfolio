import { readFile, writeFile } from "node:fs/promises";
import { ShapeUtils, Vector2, Vector3 } from "three";

// Bake precise, closed continent surfaces offline. No map service or runtime
// polygon triangulation is needed by the hero. Natural Earth is public domain.
const source =
  "https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_50m_land.geojson";
const data = process.argv[2]
  ? JSON.parse(await readFile(process.argv[2], "utf8"))
  : await (await fetch(source)).json();
const points = [],
  indices = [],
  coasts = [],
  cache = new Map();
const point = (p) => {
  const q = p.clone().normalize();
  const packed = [q.x, q.y, q.z].map((v) => Math.round(v * 32767));
  const key = packed.join(",");
  if (cache.has(key)) return cache.get(key);
  const index = points.length;
  points.push(new Vector3(...packed).normalize());
  cache.set(key, index);
  return index;
};
const unit = ([lon, lat]) => {
  const a = (lon * Math.PI) / 180,
    b = (lat * Math.PI) / 180;
  return new Vector3(
    Math.cos(a) * Math.cos(b),
    Math.sin(b),
    -Math.sin(a) * Math.cos(b)
  );
};
const maxEdgeSquared = (2 * Math.sin(Math.PI / 180)) ** 2;
const simplify = (ring) => {
  const input = ring.map(unit),
    keep = new Set([0, input.length - 1]);
  const stack = [[0, input.length - 1]],
    toleranceSquared = 0.0008 ** 2;
  while (stack.length) {
    const [first, last] = stack.pop();
    const a = input[first],
      edge = input[last].clone().sub(a);
    let farthest = -1,
      distance = toleranceSquared;
    for (let i = first + 1; i < last; i++) {
      const t = Math.max(
        0,
        Math.min(1, input[i].clone().sub(a).dot(edge) / (edge.lengthSq() || 1))
      );
      const d = input[i].distanceToSquared(a.clone().addScaledVector(edge, t));
      if (d > distance) {
        distance = d;
        farthest = i;
      }
    }
    if (farthest !== -1) {
      keep.add(farthest);
      stack.push([first, farthest], [farthest, last]);
    }
  }
  return [...keep]
    .sort((a, b) => a - b)
    .slice(0, -1)
    .map((i) => input[i]);
};
const split = (a, b, c) => {
  const p = points[a],
    q = points[b],
    r = points[c];
  const ab = p.distanceToSquared(q),
    bc = q.distanceToSquared(r),
    ca = r.distanceToSquared(p);
  const longest = Math.max(ab, bc, ca);
  if (longest > maxEdgeSquared) {
    if (ab === longest) {
      const m = point(p.clone().add(q));
      split(a, m, c);
      split(m, b, c);
    } else if (bc === longest) {
      const m = point(q.clone().add(r));
      split(a, b, m);
      split(a, m, c);
    } else {
      const m = point(r.clone().add(p));
      split(a, b, m);
      split(m, b, c);
    }
    return;
  }
  // Keep all top faces outward, independent of the source polygon winding.
  const outward = q.clone().sub(p).cross(r.clone().sub(p)).dot(p);
  if (Math.abs(outward) > 1e-12)
    indices.push(a, ...(outward > 0 ? [b, c] : [c, b]));
};
for (const feature of data.features) {
  const polygons =
    feature.geometry.type === "Polygon"
      ? [feature.geometry.coordinates]
      : feature.geometry.coordinates;
  for (const polygon of polygons) {
    const rings = polygon
      .map(simplify)
      .filter((ring, i) => i === 0 || ring.length >= 3);
    if (rings[0].length < 3) continue;
    const center = rings[0]
      .reduce((sum, p) => sum.add(p), new Vector3())
      .normalize();
    const east = new Vector3(0, 1, 0).cross(center).normalize();
    const north = center.clone().cross(east).normalize();
    // Local stereographic projection handles poles and the date line without
    // stretching triangles across the opposite side of the globe.
    const projected = rings.map((ring) =>
      ring.map((p) => {
        const divisor = Math.max(1e-6, 1 + p.dot(center));
        return new Vector2(p.dot(east) / divisor, p.dot(north) / divisor);
      })
    );
    rings.forEach((ring, i) => {
      if (ShapeUtils.isClockWise(projected[i]) !== (i !== 0)) {
        ring.reverse();
        projected[i].reverse();
      }
    });
    const mapping = rings.flat().map(point);
    const triangles = ShapeUtils.triangulateShape(
      projected[0],
      projected.slice(1)
    );
    for (const triangle of triangles) split(...triangle.map((i) => mapping[i]));
    for (const ring of rings) {
      for (let i = 0; i < ring.length; i++) {
        const a = point(ring[i]),
          b = point(ring[(i + 1) % ring.length]);
        if (a !== b) coasts.push(a, b);
      }
    }
  }
}
const packed = Int16Array.from(
  points.flatMap((p) => [p.x, p.y, p.z].map((v) => Math.round(v * 32767)))
);
const encode = (array) => Buffer.from(array.buffer).toString("base64");
const IndexArray = points.length < 65536 ? Uint16Array : Uint32Array;
await writeFile(
  new URL("../src/app/lib/earth-land.json", import.meta.url),
  JSON.stringify({
    source,
    license:
      "Public domain: https://www.naturalearthdata.com/about/terms-of-use/",
    indexBytes: IndexArray.BYTES_PER_ELEMENT,
    points: encode(packed),
    triangles: encode(IndexArray.from(indices)),
    coasts: encode(IndexArray.from(coasts)),
  }) + "\n"
);
console.log(
  `Prepared ${points.length} land vertices, ${indices.length / 3} triangles and ${coasts.length / 2} coast edges.`
);
