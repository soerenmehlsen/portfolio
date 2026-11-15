import {
  BufferAttribute,
  BufferGeometry,
  Float32BufferAttribute,
  SphereGeometry,
  Vector3,
  type TorusKnotGeometry,
} from "three";
import earth from "@/app/lib/earth-land.json";

const RADIUS = 1.5;
export const LAND_HEIGHT = 0.018;

/** Vector continent tops and vertical coast walls retain genuinely sharp edges. */
export function createGlobeMorphs(knot: TorusKnotGeometry) {
  const tubeNormals = knot.getAttribute("normal");
  const gathered = new Float32Array(tubeNormals.count * 3);
  for (let i = 0; i < tubeNormals.count; i++) {
    gathered[i * 3] = tubeNormals.getX(i) * RADIUS;
    gathered[i * 3 + 1] = tubeNormals.getY(i) * RADIUS;
    gathered[i * 3 + 2] = tubeNormals.getZ(i) * RADIUS;
  }
  knot.morphAttributes.position = [new Float32BufferAttribute(gathered, 3)];
  knot.morphAttributes.normal = [tubeNormals.clone()];
  knot.computeBoundingSphere();

  const decode = (data: string) =>
    Uint8Array.from(atob(data), (c) => c.charCodeAt(0)).buffer;
  const packed = new Int16Array(decode(earth.points));
  const IndexArray = earth.indexBytes === 2 ? Uint16Array : Uint32Array;
  const triangles = new IndexArray(decode(earth.triangles));
  const edges = new IndexArray(decode(earth.coasts));
  const positions: number[] = [],
    targets: number[] = [],
    normals: number[] = [];
  const indices = Array.from(triangles);
  const units: Vector3[] = [];
  const append = (p: Vector3, normal: Vector3, bottom = false) => {
    const index = positions.length / 3;
    const start = bottom ? RADIUS - 0.001 : RADIUS;
    const finish = bottom ? start : RADIUS + LAND_HEIGHT;
    positions.push(p.x * start, p.y * start, p.z * start);
    targets.push(p.x * finish, p.y * finish, p.z * finish);
    normals.push(normal.x, normal.y, normal.z);
    return index;
  };
  for (let i = 0; i < packed.length; i += 3) {
    const p = new Vector3(packed[i], packed[i + 1], packed[i + 2]).normalize();
    units.push(p);
    append(p, p);
  }
  for (let i = 0; i < edges.length; i += 2) {
    const a = units[edges[i]],
      b = units[edges[i + 1]];
    const outward = b.clone().sub(a).cross(a.clone().add(b)).normalize();
    // Separate wall/top vertices keep coast normals crisp instead of smoothing
    // them into the oceans, which made the old raster relief look melted.
    const topA = append(a, outward),
      topB = append(b, outward);
    const bottomA = append(a, outward, true),
      bottomB = append(b, outward, true);
    indices.push(topA, bottomA, topB, topB, bottomA, bottomB);
  }
  const land = new BufferGeometry();
  land.setAttribute("position", new Float32BufferAttribute(positions, 3));
  land.setAttribute("normal", new Float32BufferAttribute(normals, 3));
  land.setIndex(indices);
  land.morphAttributes.position = [new Float32BufferAttribute(targets, 3)];
  land.computeBoundingSphere();

  const coast = new BufferGeometry();
  coast.setAttribute(
    "position",
    new Float32BufferAttribute(
      units.flatMap((p) => [p.x * RADIUS, p.y * RADIUS, p.z * RADIUS]),
      3
    )
  );
  coast.setIndex(new BufferAttribute(edges, 1));
  return { sphere: new SphereGeometry(RADIUS, 256, 128), land, coast };
}
