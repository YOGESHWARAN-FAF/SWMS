import React from 'react';
import { Layers } from 'lucide-react';
import DigitalTwinBin from './DigitalTwinBin';
import { BIN_CONFIG, SENSOR_MODE } from '../config/sensorConfig';

export default function DigitalTwin({ sensorData, isOnline }) {
  const b1 = sensorData?.bin1 ?? 0;
  const b2 = sensorData?.bin2 ?? 0;
  const b3 = sensorData?.bin3 ?? 0;

  const rawFields = sensorData?.rawFields || {};

  return (
    <section className="space-y-3.5">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <div className="neu-button p-2.5 text-emerald-700 flex items-center justify-center">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-black text-slate-800 tracking-wide uppercase font-mono">
              Smart Bin Digital Twin
            </h2>
            <p className="text-xs text-slate-500">
              Real-Time 3D Waste Telemetry • Ultrasonic Level Visualizer
            </p>
          </div>
        </div>

        {/* Sensor Mode indicator */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="neu-inset-sm px-3 py-1 text-[11px] font-mono text-slate-600">
            Mode: <strong className="text-emerald-800 font-bold">{SENSOR_MODE}</strong>
          </span>
        </div>
      </div>

      {/* 3-Column Responsive Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-5">
        
        {/* Bin 01: PET / PLASTIC */}
        <DigitalTwinBin
          config={BIN_CONFIG.bin1}
          fillPercentage={b1}
          rawFieldValue={rawFields.field1}
          isOnline={isOnline}
        />

        {/* Bin 02: DRY / RECYCLABLE */}
        <DigitalTwinBin
          config={BIN_CONFIG.bin2}
          fillPercentage={b2}
          rawFieldValue={rawFields.field2}
          isOnline={isOnline}
        />

        {/* Bin 03: ORGANIC / GENERAL */}
        <DigitalTwinBin
          config={BIN_CONFIG.bin3}
          fillPercentage={b3}
          rawFieldValue={rawFields.field3}
          isOnline={isOnline}
        />

      </div>
    </section>
  );
}
