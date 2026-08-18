export function Legend() {
  return (
    <div className="fw-legend" aria-label="Map legend">
      <div className="fw-legend-title">Legend</div>

      <div className="fw-legend-block">
        <div className="fw-legend-label">Confidence</div>
        <ul className="fw-legend-list">
          <li>
            <span className="fw-swatch" style={{ background: "#f9d65c" }} />
            Low
          </li>
          <li>
            <span className="fw-swatch" style={{ background: "#f4863a" }} />
            Nominal
          </li>
          <li>
            <span className="fw-swatch" style={{ background: "#e63946" }} />
            High
          </li>
        </ul>
      </div>

      <div className="fw-legend-block">
        <div className="fw-legend-label">Radiative power</div>
        <div className="fw-legend-sizes">
          <span className="fw-size-dot" style={{ width: 8, height: 8 }} />
          <span className="fw-size-dot" style={{ width: 14, height: 14 }} />
          <span className="fw-size-dot" style={{ width: 22, height: 22 }} />
          <span className="fw-legend-size-caption">weaker → stronger</span>
        </div>
      </div>
    </div>
  );
}
