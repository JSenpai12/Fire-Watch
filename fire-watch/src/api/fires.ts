import type { BoundingBox, DayRange, FireDetection } from "../types/fire";

// The frontend never talks to NASA FIRMS directly and never holds an API key —
// all requests go through our own backend, which proxies FIRMS server-side.
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "/api";

export class FireFetchError extends Error {
  constructor(message: string, public readonly cause?: unknown) {
    super(message);
    this.name = "FireFetchError";
  }
}

function isFireDetection(value: unknown): value is FireDetection {
  if (typeof value !== "object" || value === null) return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v.latitude === "number" &&
    typeof v.longitude === "number" &&
    typeof v.brightness === "number" &&
    (typeof v.confidence === "string" || typeof v.confidence === "number") &&
    typeof v.acq_date === "string" &&
    typeof v.acq_time === "string" &&
    typeof v.frp === "number"
  );
}

/**
 * Fetch active fire detections within a bounding box for the given trailing
 * day range. Throws FireFetchError on network failure, non-2xx responses,
 * or a response that doesn't match the expected shape.
 */
export async function fetchFires(bbox: BoundingBox, days: DayRange, signal?: AbortSignal): Promise<FireDetection[]> {
  const params = new URLSearchParams({
    bbox: bbox.join(","),
    days: String(days),
  });

  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}/fires?${params.toString()}`, { signal });
  } catch (err) {
    if (err instanceof DOMException && err.name === "AbortError") throw err;
    throw new FireFetchError("Couldn't reach the Fire Watch backend. Check your connection and try again.", err);
  }

  if (!response.ok) {
    throw new FireFetchError(
      response.status === 503 || response.status === 502
        ? "The FIRMS data source is unavailable right now. Try again shortly."
        : `Backend returned an error (HTTP ${response.status}).`,
    );
  }

  let payload: unknown;
  try {
    payload = await response.json();
  } catch (err) {
    throw new FireFetchError("The backend returned a response that wasn't valid JSON.", err);
  }

  if (!Array.isArray(payload) || !payload.every(isFireDetection)) {
    throw new FireFetchError("The backend returned data in an unexpected shape.");
  }

  return payload;
}
