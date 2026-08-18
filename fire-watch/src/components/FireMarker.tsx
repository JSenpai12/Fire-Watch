import { CircleMarker, Popup } from "react-leaflet";
import { type FireDetection, normalizeConfidence, parseAcquiredAt, type ConfidenceBucket } from "../types/fire";

const CONFIDENCE_COLOR: Record<ConfidenceBucket, string> = {
  low: "#f9d65c", // yellow
  nominal: "#f4863a", // orange
  high: "#e63946", // red
};

const CONFIDENCE_LABEL: Record<ConfidenceBucket, string> = {
  low: "Low",
  nominal: "Nominal",
  high: "High",
};

/** Scale FRP (fire radiative power, MW) into a marker radius in pixels. */
function radiusForFrp(frp: number): number {
  const MIN_RADIUS = 4;
  const MAX_RADIUS = 15;
  // FRP is heavily right-skewed (a few very intense fires, many small ones),
  // so compress the range with sqrt rather than a linear map.
  const scaled = Math.sqrt(Math.max(frp, 0)) * 1.6;
  return Math.min(MAX_RADIUS, Math.max(MIN_RADIUS, scaled));
}

function formatTime(fire: FireDetection): string {
  const date = parseAcquiredAt(fire);
  return `${date.toISOString().slice(0, 10)} · ${date.toISOString().slice(11, 16)} UTC`;
}

interface FireMarkerProps {
  fire: FireDetection;
}

export function FireMarker({ fire }: FireMarkerProps) {
  const bucket = normalizeConfidence(fire.confidence);
  const color = CONFIDENCE_COLOR[bucket];
  const radius = radiusForFrp(fire.frp);

  return (
    <CircleMarker
      center={[fire.latitude, fire.longitude]}
      radius={radius}
      pathOptions={{
        color,
        fillColor: color,
        fillOpacity: 0.55,
        weight: 1,
        opacity: 0.9,
      }}
    >
      <Popup className="fw-popup">
        <div className="fw-popup-content">
          <div className="fw-popup-row fw-popup-heading">
            <span className="fw-dot" style={{ background: color }} />
            {CONFIDENCE_LABEL[bucket]} confidence
          </div>
          <dl className="fw-popup-grid">
            <dt>Detected</dt>
            <dd>{formatTime(fire)}</dd>
            <dt>Brightness</dt>
            <dd>{fire.brightness.toFixed(1)} K</dd>
            <dt>Radiative power</dt>
            <dd>{fire.frp.toFixed(1)} MW</dd>
            <dt>Location</dt>
            <dd>
              {fire.latitude.toFixed(4)}, {fire.longitude.toFixed(4)}
            </dd>
          </dl>
        </div>
      </Popup>
    </CircleMarker>
  );
}
