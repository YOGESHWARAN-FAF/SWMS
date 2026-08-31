import React from 'react';
import { ShieldCheck, ShieldAlert } from 'lucide-react';
import FlameSensor from './FlameSensor';
import SmokeGauge from './SmokeGauge';
import MetalDetection from './MetalDetection';

export default function SafetyPanel({ sensorData, isOnline }) {
  const rawFields = sensorData?.rawFields || {};
  const hasSafetyHazard = sensorData?.flame || (sensorData?.smoke >= 800);

  return (
    <section className="space-y-3.5">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <div className={`neu-button p-2.5 flex items-center justify-center ${
            hasSafetyHazard ? 'text-rose-600 animate-pulse' : 'text-emerald-700'
          }`}>
            {hasSafetyHazard ? <ShieldAlert className="w-5 h-5" /> : <ShieldCheck className="w-5 h-5" />}
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-black text-slate-800 tracking-wide uppercase font-mono">
              Multi-Sensor Safety Monitoring
            </h2>
            <p className="text-xs text-slate-500">
              Fire Protection • Air Quality • Inductive Sorting Verification
            </p>
          </div>
        </div>

        {/* Status Pill */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider ${
            hasSafetyHazard
              ? 'bg-rose-50 text-rose-700 border border-rose-300 animate-bounce'
              : 'neu-inset-sm text-emerald-800'
          }`}>
            {hasSafetyHazard ? 'SAFETY ALERT ACTIVE' : 'ALL SENSORS SAFE'}
          </span>
        </div>
      </div>

      {/* 3-Column Safety Sensors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-5">
        
        {/* Field 4: Flame Sensor */}
        <FlameSensor
          flameDetected={sensorData?.flame}
          rawFieldValue={rawFields.field4}
          isOnline={isOnline}
        />

        {/* Field 5: Smoke / Gas Gauge */}
        <SmokeGauge
          smokeValue={sensorData?.smoke}
          rawFieldValue={rawFields.field5}
          isOnline={isOnline}
        />

        {/* Field 6: Inductive Proximity / Metal */}
        <MetalDetection
          metalDetected={sensorData?.metalDetected}
          rawFieldValue={rawFields.field6}
          isOnline={isOnline}
        />

      </div>
    </section>
  );
}
