import { useCallback, useEffect, useState } from "react";
import { MapView } from "./components/MapView";
import { ControlPanel } from "./components/ControlPanel";
import { Legend } from "./components/Legend";
import { fetchFires, FireFetchError } from "./api/fires";
import type { BoundingBox, DayRange, FireDetection } from "./types/fire";
import "./App.css";

// Target region: Bukidnon province, Northern Mindanao, Philippines — a
// landlocked, heavily forested province where agricultural burning and
// deforestation-linked fire activity are both relevant to monitor.
const REGION_NAME = "Bukidnon, Philippines";
const REGION_CENTER: [number, number] = [8.05, 125.05];
const REGION_ZOOM = 9;
const REGION_BBOX: BoundingBox = [124.4, 7.5, 125.6, 8.6]; // minLon, minLat, maxLon, maxLat

type Status = "loading" | "error" | "empty" | "ready";

export default function App() {
  const [days, setDays] = useState<DayRange>(3);
  const [fires, setFires] = useState<FireDetection[]>([]);
  const [status, setStatus] = useState<Status>("loading");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [reloadToken, setReloadToken] = useState(0);

  const loadFires = useCallback(
    async (signal: AbortSignal) => {
      setStatus("loading");
      setErrorMessage(null);
      try {
        const data = await fetchFires(REGION_BBOX, days, signal);
        if (signal.aborted) return;
        setFires(data);
        setStatus(data.length === 0 ? "empty" : "ready");
        setLastUpdated(new Date());
      } catch (err) {
        if (signal.aborted) return;
        setFires([]);
        setStatus("error");
        setErrorMessage(err instanceof FireFetchError ? err.message : "Unexpected error while loading hotspot data.");
      }
    },
    [days],
  );

  useEffect(() => {
    const controller = new AbortController();
    loadFires(controller.signal);
    return () => controller.abort();
  }, [loadFires, reloadToken]);

  return (
    <div className="fw-app">
      <MapView center={REGION_CENTER} zoom={REGION_ZOOM} fires={fires} />

      <ControlPanel
        regionName={REGION_NAME}
        days={days}
        onDaysChange={setDays}
        hotspotCount={fires.length}
        status={status}
        errorMessage={errorMessage}
        lastUpdated={lastUpdated}
        onRetry={() => setReloadToken((t) => t + 1)}
      />

      <Legend />
    </div>
  );
}
