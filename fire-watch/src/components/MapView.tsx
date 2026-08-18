import { MapContainer, TileLayer } from "react-leaflet";
import type { LatLngExpression } from "leaflet";
import type { FireDetection } from "../types/fire";
import { FireMarker } from "./FireMarker";

// CartoDB Dark Matter — a muted dark basemap so warm fire markers stay the
// clear focal point. No API key required for reasonable, attributed usage.
const DARK_TILE_URL = "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";
const DARK_TILE_ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';

interface MapViewProps {
  center: LatLngExpression;
  zoom: number;
  fires: FireDetection[];
}

export function MapView({ center, zoom, fires }: MapViewProps) {
  return (
    <MapContainer
      center={center}
      zoom={zoom}
      minZoom={4}
      maxZoom={14}
      className="fw-map"
      preferCanvas
      attributionControl={true}
    >
      <TileLayer url={DARK_TILE_URL} attribution={DARK_TILE_ATTRIBUTION} subdomains="abcd" maxZoom={20} />
      {fires.map((fire, index) => (
        // FIRMS detections don't carry a stable unique id, so key on the
        // coordinate + acquisition time, which is unique in practice.
        <FireMarker key={`${fire.latitude}-${fire.longitude}-${fire.acq_date}-${fire.acq_time}-${index}`} fire={fire} />
      ))}
    </MapContainer>
  );
}
