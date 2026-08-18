/**
 * Shape of a single hotspot detection as returned by the backend's
 * GET /fires endpoint (which itself proxies NASA FIRMS).
 *
 * `confidence` differs by satellite/sensor:
 *  - VIIRS reports a category: "low" | "nominal" | "high"
 *  - MODIS reports a 0-100 numeric confidence
 * We accept both and normalize with `normalizeConfidence` below.
 */
export interface FireDetection {
  latitude: number;
  longitude: number;
  brightness: number;
  confidence: "low" | "nominal" | "high" | number;
  acq_date: string; // "YYYY-MM-DD"
  acq_time: string; // "HHMM" (UTC)
  frp: number; // fire radiative power, MW
}

export type ConfidenceBucket = "low" | "nominal" | "high";

export type DayRange = 1 | 3 | 7;

export type BoundingBox = readonly [minLon: number, minLat: number, maxLon: number, maxLat: number];

/** Collapse either a categorical or numeric FIRMS confidence value into one of three buckets. */
export function normalizeConfidence(confidence: FireDetection["confidence"]): ConfidenceBucket {
  if (typeof confidence === "number") {
    if (confidence >= 80) return "high";
    if (confidence >= 30) return "nominal";
    return "low";
  }
  const value = confidence.toLowerCase();
  if (value === "h" || value === "high") return "high";
  if (value === "l" || value === "low") return "low";
  return "nominal";
}

/** Parse FIRMS' "YYYY-MM-DD" + "HHMM" (UTC) fields into a Date. */
export function parseAcquiredAt(fire: FireDetection): Date {
  const hh = fire.acq_time.padStart(4, "0").slice(0, 2);
  const mm = fire.acq_time.padStart(4, "0").slice(2, 4);
  return new Date(`${fire.acq_date}T${hh}:${mm}:00Z`);
}
