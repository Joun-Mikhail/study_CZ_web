// Outline of Czechia from Natural Earth (public domain), 1:110m, via
// github.com/johan/world.geo.json. Equirectangular, x scaled by cos(49.8°).
// PROTOTYPE: the real map would use the 1:10m data.
export const CZ_MAP = { width: 600, height: 360, path: "M428.3 354.3L386.4 327.7L343.8 335.0L273.4 292.1L241.5 302.6L190.4 360.1L123.0 314.9L71.8 254.5L25.5 220.7L15.9 161.4L0.0 119.6L65.9 89.0L99.6 54.0L164.8 26.8L187.5 0.0L211.5 16.2L251.9 1.5L295.0 46.7L362.8 59.0L357.1 97.6L406.4 126.7L420.0 90.4L482.2 106.1L490.8 150.2L558.2 158.6L600.0 227.9L572.9 228.0L558.9 253.3L538.1 259.5L532.1 291.4L514.7 298.1L512.3 311.2L481.3 325.7L441.1 323.3L428.3 354.3Z", minX: 7.900473743544493, maxY: 51.117268, scale: 140.56680789955402, k: 0.6454576877239506 };

export function project(lat: number, lon: number): [number, number] {
  return [(lon * CZ_MAP.k - CZ_MAP.minX) * CZ_MAP.scale, (CZ_MAP.maxY - lat) * CZ_MAP.scale];
}
