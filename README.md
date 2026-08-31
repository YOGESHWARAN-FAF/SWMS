# 🌐 AI-Powered Smart Waste Segregation Bin — Digital Twin Dashboard

> **Edge AI + IoT + Digital Twin + Multi-Sensor Safety Monitoring**

A production-quality **React.js + Vite** Industrial IoT Digital Twin platform built for real-time telemetry monitoring, multi-compartment smart waste bin visualization, optical flame & gas safety alerting, hardware diagnostics, and historical telemetry analytics.

---

## 🏗️ System Architecture

```text
                    SMART WASTE BIN
                         │
        ┌────────────────┴────────────────┐
        │                                 │
        ▼                                 ▼
   ESP32-CAM                         Physical Sensors
        │                                 │
        ▼                                 │
 Local AI Model                           │
        │                                 │
 Waste Classification                     │
        │                                 │
        └────────────────┬────────────────┘
                         ▼
                  ESP32 IoT Controller
                         │
                         ▼
                    ThingSpeak
                         │
                         ▼
                  React Dashboard
                         │
                         ▼
                 Digital Twin View
```

### 🧠 Edge AI Isolation Guarantee
- **ESP32-CAM**: The vision classification model runs **100% locally on the ESP32-CAM microcontroller hardware**.
- **React Dashboard**: The frontend does **NOT** simulate, infer, or fake AI classifications or confidence scores. It serves exclusively as a high-fidelity **Digital Twin and Industrial IoT Safety & Telemetry Control Center**.

---

## 📡 ThingSpeak Field Mapping

| Field | Sensor Name | Monitored Metric | Range / Values | Destination / Component |
|---|---|---|---|---|
| **Field 1** | Ultrasonic Sensor 1 | Bin 01 Fill Level | 0% – 100% | **BIN 01 — PET / PLASTIC** |
| **Field 2** | Ultrasonic Sensor 2 | Bin 02 Fill Level | 0% – 100% | **BIN 02 — DRY / RECYCLABLE** |
| **Field 3** | Ultrasonic Sensor 3 | Bin 03 Fill Level | 0% – 100% | **BIN 03 — ORGANIC / GENERAL** |
| **Field 4** | Optical Flame Sensor | Fire / Spark Hazard | 0 = Safe, 1 = Flame Alert | **Flame Sensor & Emergency Overlay** |
| **Field 5** | Gas / Smoke (MQ-2) | Air Quality / Smoke PPM | 0 – 1000+ PPM | **Gas Radial Gauge (<300 Safe, ≥800 Danger)** |
| **Field 6** | Inductive Proximity | Ferrous Metal Detection | 0 = No Metal, 1 = Metal | **Proximity Sensor / Metal Indicator** |

---

## ⚙️ Thresholds & Safety Logic

### 🗑️ Bin Fill Levels
- **0–49%**: `NORMAL` (Optimal capacity)
- **50–79%**: `GETTING FULL` (Monitoring active)
- **80–94%**: `ALMOST FULL` (Capacity warning • Prepare for collection)
- **95–100%**: `FULL` (Immediate **COLLECTION REQUIRED**)

### ☣️ Gas / Smoke Concentration (MQ-2)
- **< 300 PPM**: `SAFE`
- **300–599 PPM**: `MODERATE`
- **600–799 PPM**: `HIGH`
- **≥ 800 PPM**: `DANGER` (Emergency condition trigger)

### 🚨 Global Safety System States
- **SYSTEM NORMAL**: No flame detected + Smoke < 300 PPM + All bins < 80%
- **SYSTEM WARNING**: Any bin ≥ 80% OR Smoke between 300–799 PPM
- **SYSTEM EMERGENCY**: Flame detected (`Field 4 = 1`) OR Smoke ≥ 800 PPM (`Field 5 ≥ 800`)
  - *Displays prominent animated emergency overlay banner and halts sorting indicators.*

---

## 🚀 Quick Start

### 1. Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### 2. Environment Configuration
Create a `.env` file in the root directory:

```env
VITE_THINGSPEAK_CHANNEL_ID=3470506
VITE_THINGSPEAK_READ_API_KEY=W2K6VI4WUKVWX3N3
```

Template file `.env.example` is also provided.

### 3. Installation
```bash
npm install
```

### 4. Run Development Server
```bash
npm run dev
```

### 5. Build for Production
```bash
npm run build
```

### 6. Preview Production Bundle
```bash
npm run preview
```

---

## 🛠️ Project Structure

```text
smart-waste/
├── .env                         # ThingSpeak Channel ID & Read Key
├── .env.example                 # Environment template
├── index.html                   # HTML entrypoint with Google Fonts
├── package.json                 # Dependencies & scripts
├── postcss.config.js            # PostCSS configuration
├── tailwind.config.js           # Tailwind dark industrial theme tokens
├── src/
│   ├── config/
│   │   └── sensorConfig.js      # Sensor thresholds, mode & bin metadata
│   ├── services/
│   │   └── thingspeak.js        # ThingSpeak REST API client & normalizer
│   ├── utils/
│   │   ├── sensorUtils.js       # Fill calculation, status & parsing utilities
│   │   └── alertUtils.js        # Non-duplicative state transition logger
│   ├── hooks/
│   │   └── useThingSpeak.js     # 10s polling hook with lifecycle cleanup
│   ├── components/
│   │   ├── Header.jsx           # Live pulse indicator, sync button, channel ID
│   │   ├── SystemStatus.jsx     # Emergency banner & global status bar
│   │   ├── KPIGrid.jsx          # 7 top metrics KPI cards
│   │   ├── StatusCard.jsx       # Reusable glassmorphic card component
│   │   ├── DigitalTwin.jsx      # Master 3D-styled bin container
│   │   ├── DigitalTwinBin.jsx   # Animated fluid bin with level markings
│   │   ├── SafetyPanel.jsx      # Multi-sensor safety container
│   │   ├── FlameSensor.jsx      # Optical fire detector
│   │   ├── SmokeGauge.jsx       # Animated radial SVG gas gauge
│   │   ├── MetalDetection.jsx   # Inductive proximity sensor state
│   │   ├── SensorHealth.jsx     # Diagnostics grid for all 6 physical sensors
│   │   ├── CollectionStatus.jsx # Waste logistics recommendation planner
│   │   ├── AlertsPanel.jsx      # Real-time event log with severity filtering
│   │   ├── FillLevelChart.jsx   # Recharts fill % historical time series
│   │   ├── SmokeChart.jsx       # Recharts gas/smoke historical time series
│   │   ├── LoadCellPlaceholder.jsx # Future hardware expansion card (-- g)
│   │   ├── PowerPlaceholder.jsx    # Future power telemetry card (-- W, -- V)
│   │   └── EdgeAINote.jsx       # ESP32-CAM Edge AI architecture diagram
│   ├── pages/
│   │   └── Dashboard.jsx        # Complete assembled layout
│   ├── App.jsx                  # Root React component
│   ├── main.jsx                 # Vite application entrypoint
│   └── index.css                # Tailwind directives & industrial dark styles
└── README.md
```

---

## 🎨 Design & Aesthetic Principles
- **Dark Industrial Control Center Theme**: Custom tailored palette (`#060911`, `#0b111e`, `#162238`) with glassmorphism panels.
- **Dynamic Fluid Twin Animation**: Bins visually rise and fall in real-time matching calibrated ultrasonic percentages.
- **Hardware Decoupled Architecture**: Strict adherence to physical sensor boundaries without synthetic predictions.
- **Responsive Layout**: Seamlessly adapts from desktop (3-column) to tablet (2-column) and mobile (1-column).
