# 🔥 Fire Watch

**Fire Watch** is an environmental science project designed to monitor wildfire and deforestation-related fire activity using satellite-based fire hotspot data.

The project aims to provide an interactive dashboard where users can visualize fire hotspots on a map, inspect individual detections, and observe changes in fire activity over a selected period.

> 🚧 **Project Status:** Under Construction
> The frontend is currently being developed. The FastAPI backend and NASA FIRMS data integration are planned but have not yet been implemented.

---

## 🎯 Project Goal

The goal of Fire Watch is to make satellite fire detection data easier to understand through an interactive visualization.

Instead of looking at raw fire detection data, users will be able to see fire hotspots directly on a map and examine information such as:

* Location
* Detection date and time
* Fire brightness
* Fire radiative power (FRP)
* Detection confidence
* Number of detected hotspots

The project is intended for an **environmental science project** and may eventually be focused on a specific region in the Philippines.

---

## ✨ Planned Features

### 🗺️ Interactive Fire Map

* Interactive map using **Leaflet**
* Fire hotspots displayed as markers
* Map focused on the selected monitoring region
* Dark/muted map style to make fire data easier to see

### 🔥 Fire Hotspot Visualization

Each detected fire will be represented using a circle marker.

Marker properties will represent fire characteristics:

* **Color** → detection confidence
* **Size/opacity** → fire brightness or Fire Radiative Power (FRP)

Planned confidence levels:

| Confidence | Visualization |
| ---------- | ------------- |
| Low        | 🟡 Yellow     |
| Nominal    | 🟠 Orange     |
| High       | 🔴 Red        |

### 📊 Monitoring Controls

The dashboard will include:

* 1-day fire data
* 3-day fire data
* 7-day fire data
* Total hotspot count for the current map view
* Loading states
* Empty states
* Error handling

### 📍 Fire Information

Clicking a hotspot will display information such as:

* Detection date
* Detection time
* Brightness
* Confidence
* Fire Radiative Power (FRP)

### 📖 Legend

A map legend will explain how marker colors and sizes represent the fire data.

### 📱 Responsive Design

The interface will be designed to work across:

* Desktop
* Tablet
* Mobile

---

## 🛠️ Technology Stack

### Frontend

* React
* TypeScript
* Leaflet
* React Leaflet

### Backend — Planned

* FastAPI
* Python

### Data Source — Planned

* NASA FIRMS (Fire Information for Resource Management System)

### API — Planned

The frontend is expected to communicate with the FastAPI backend through an endpoint similar to:

```http
GET /fires?bbox={minLon},{minLat},{maxLon},{maxLat}&days={1|3|7}
```

The backend will be responsible for retrieving and processing fire hotspot data rather than exposing external API credentials in the frontend.

---

## 📦 Planned Data Structure

A fire detection is expected to contain information similar to:

```json
{
  "latitude": 8.123,
  "longitude": 125.456,
  "brightness": 320.5,
  "confidence": "high",
  "acq_date": "2026-08-18",
  "acq_time": "1030",
  "frp": 45.2
}
```

The exact data structure may change as the backend and NASA FIRMS integration are implemented.

---

## 🏗️ Project Structure

The frontend is planned to be organized into reusable components:

```text
src/
├── components/
│   ├── MapView
│   ├── ControlPanel
│   ├── Legend
│   └── FireMarker
│
├── types/
│   └── fire.ts
│
├── services/
│   └── api.ts
│
└── App.tsx
```

The backend will be added later and will be responsible for handling fire data and communication with NASA FIRMS.

---

## 🔐 Security

External API credentials will **not** be stored in the frontend.

The planned architecture is:

```text
NASA FIRMS
     ↓
FastAPI Backend
     ↓
React + TypeScript Frontend
     ↓
Interactive Fire Map
```

This keeps external API credentials and data retrieval logic on the backend.

---
## 🚀 Getting Started

### Prerequisites

Make sure you have installed:

* Node.js
* npm

### Install dependencies

```bash
npm install
```

### Start the development server

```bash
npm run dev
```

The backend is **not yet implemented**, so some functionality may currently be unavailable or use temporary/mock data.

---

## 🧭 Development Roadmap

The project will be developed in roughly the following stages:

1. **Frontend foundation**

   * Build the map
   * Create dashboard components
   * Define TypeScript data types

2. **Fire visualization**

   * Add fire markers
   * Implement confidence-based styling
   * Implement brightness/FRP-based marker scaling

3. **Backend**

   * Create FastAPI application
   * Create `/fires` endpoint
   * Integrate NASA FIRMS

4. **Frontend ↔ Backend integration**

   * Fetch real fire data
   * Add loading and error handling
   * Filter data based on selected date range and map area

5. **Polish**

   * Responsive design
   * Performance improvements
   * UI improvements
   * Testing

---

## 🌱 Purpose

Fire Watch is being developed as an **environmental science project** to explore how satellite data and software technologies can be combined to visualize and understand fire activity.

The project is currently under active development, and its architecture and features may change as development progresses.
