import type { DayRange } from "../types/fire";

const DAY_OPTIONS: DayRange[] = [1, 3, 7];

interface ControlPanelProps {
  regionName: string;
  days: DayRange;
  onDaysChange: (days: DayRange) => void;
  hotspotCount: number;
  status: "loading" | "error" | "empty" | "ready";
  errorMessage: string | null;
  lastUpdated: Date | null;
  onRetry: () => void;
}

export function ControlPanel({
  regionName,
  days,
  onDaysChange,
  hotspotCount,
  status,
  errorMessage,
  lastUpdated,
  onRetry,
}: ControlPanelProps) {
  return (
    <div className="fw-panel">
      <div className="fw-panel-header">
        <span className="fw-status-dot" data-status={status} />
        <div>
          <div className="fw-eyebrow">Fire Watch</div>
          <div className="fw-region">{regionName}</div>
        </div>
      </div>

      <div className="fw-panel-section">
        <div className="fw-label">Detection window</div>
        <div className="fw-toggle-group" role="group" aria-label="Day range">
          {DAY_OPTIONS.map((option) => (
            <button
              key={option}
              type="button"
              className="fw-toggle"
              data-active={option === days}
              onClick={() => onDaysChange(option)}
            >
              {option}d
            </button>
          ))}
        </div>
      </div>

      <div className="fw-panel-section">
        <div className="fw-label">Hotspots in view</div>
        {status === "loading" ? (
          <div className="fw-stat fw-stat-loading">
            <span className="fw-scan" />
            scanning
          </div>
        ) : status === "error" ? (
          <div className="fw-stat fw-stat-error">—</div>
        ) : (
          <div className="fw-stat">{hotspotCount.toLocaleString()}</div>
        )}
      </div>

      {status === "error" && (
        <div className="fw-alert" role="alert">
          <div className="fw-alert-title">Data feed interrupted</div>
          <p>{errorMessage ?? "Something went wrong fetching hotspot data."}</p>
          <button type="button" className="fw-retry" onClick={onRetry}>
            Retry
          </button>
        </div>
      )}

      {status === "empty" && (
        <div className="fw-alert fw-alert-quiet">
          <div className="fw-alert-title">No hotspots detected</div>
          <p>No active fires in this area for the last {days} day{days > 1 ? "s" : ""}.</p>
        </div>
      )}

      <div className="fw-panel-footer">
        {lastUpdated ? <>Updated {lastUpdated.toISOString().slice(11, 19)} UTC</> : <>Not yet synced</>}
      </div>
    </div>
  );
}
