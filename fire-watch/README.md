# Fire Watch

A wildfire / deforestation hotspot monitoring dashboard, built on NASA FIRMS
satellite detections. React + TypeScript frontend, talking to a FastAPI
backend that proxies FIRMS (no API key ever touches the browser).

## Stack

- React 18 + TypeScript, Vite
- Leaflet + react-leaflet, CartoDB Dark Matter basemap
- No CSS framework — hand-styled to read as an instrument panel, not a CRUD admin UI

## Getting started

```bash
npm install
cp .env.example .env   # optional — only needed if your backend isn't at localhost:8000
npm run dev
```

The dev server proxies `/api/*` to `http://localhost:8000` (your FastAPI
backend) by default — see `vite.config.ts`. Point `VITE_API_BASE_URL` at a
different backend URL for staging/production builds.

## Project structure

```
src/
  types/fire.ts        FireDetection interface + confidence/time helpers
  api/fires.ts          fetch client for GET /fires, typed + error-handled
  components/
    MapView.tsx          full-screen Leaflet map, dark basemap
    FireMarker.tsx        single hotspot: color by confidence, radius by FRP
    ControlPanel.tsx      day-range toggle, hotspot count, loading/error/empty states
    Legend.tsx             color + size key
  App.tsx                owns fetch state, region config, composes the layout
  App.css / index.css    design tokens + layout
```

## Backend contract

```
GET /fires?bbox={minLon},{minLat},{maxLon},{maxLat}&days={1|3|7}
```

Expected response: a JSON array of

```ts
{
  latitude: number;
  longitude: number;
  brightness: number;
  confidence: "low" | "nominal" | "high" | number; // VIIRS category or MODIS 0-100
  acq_date: string;   // "YYYY-MM-DD"
  acq_time: string;   // "HHMM", UTC
  frp: number;        // fire radiative power, MW
}
```

## Notes / next steps

- The monitored region (currently Bukidnon, Philippines) is a constant in
  `App.tsx` (`REGION_NAME`, `REGION_CENTER`, `REGION_BBOX`). Swap these to
  target a different province, or wire the bbox to the map's live viewport
  if you want it to refetch as the user pans.
- `FireMarker` keys on lat/lon/date/time since FIRMS detections don't carry
  a stable id — fine in practice, but worth knowing if you see key warnings
  on very dense, coincident detections.
- Confidence and FRP scaling live in `FireMarker.tsx` (`CONFIDENCE_COLOR`,
  `radiusForFrp`) if you want to retune the visual encoding.
