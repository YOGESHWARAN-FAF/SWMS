import React from 'react';
import { AlertOctagon, AlertTriangle, ShieldAlert, ShieldCheck, Flame, Wind } from 'lucide-react';
import { SMOKE_THRESHOLDS } from '../config/sensorConfig';

export default function SystemStatus({ systemStatus, sensorData }) {
  const isEmergency = systemStatus.state === 'EMERGENCY';
  const isWarning = systemStatus.state === 'WARNING';

  return (
    <div className="w-full space-y-3">
      {/* 🚨 Emergency Notification Banner */}
      {isEmergency && (
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-rose-500 via-red-600 to-rose-600 border border-rose-400 text-white shadow-neu-rose p-4 sm:p-5 animate-pulse">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="p-2.5 sm:p-3 rounded-2xl bg-white/20 text-white shadow-inner flex-shrink-0">
                <AlertOctagon className="w-7 h-7 sm:w-8 sm:h-8" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-white text-rose-700">
                    CRITICAL HAZARD
                  </span>
                  <h2 className="text-base sm:text-xl font-black tracking-wide">
                    🚨 EMERGENCY CONDITION DETECTED
                  </h2>
                </div>

                <p className="text-xs sm:text-sm font-semibold text-rose-100 mt-1">
                  🚨 {systemStatus.message || 'Critical Emergency Hazard Detected — Immediate Inspection Required'}
                </p>

                <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-white/95">
                  <span className="flex items-center gap-1 font-bold bg-black/20 px-2 py-0.5 rounded">
                    <AlertTriangle className="w-3.5 h-3.5 text-yellow-300" /> Motor Operation Should Be Stopped
                  </span>
                  <span className="font-semibold underline">
                    Immediate Inspection Required
                  </span>
                </div>
              </div>
            </div>

            {/* Hardware Safety Badges */}
            <div className="flex flex-row sm:flex-col items-center sm:items-end gap-2 w-full sm:w-auto justify-between sm:justify-end">
              <div className="px-3 py-1 rounded-xl bg-black/30 text-white text-xs font-mono font-bold flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-yellow-300" />
                <span>Safety: <strong>EMERGENCY</strong></span>
              </div>
              <div className="px-3 py-1 rounded-xl bg-black/30 text-yellow-300 text-xs font-mono font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-yellow-300 animate-ping"></span>
                <span>Sorting: <strong>STOPPED</strong></span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Global Status Bar (Normal or Warning) */}
      {!isEmergency && (
        <div className={`relative p-3.5 sm:p-4 transition-all duration-300 ${
          isWarning ? 'neu-card bg-amber-50/90 border-amber-300' : 'neu-card-emerald'
        }`}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 sm:gap-4">
            <div className="flex items-center gap-3">
              <div className={`p-2.5 rounded-2xl flex-shrink-0 neu-inset-sm ${
                isWarning ? 'text-amber-700' : 'text-emerald-700'
              }`}>
                {isWarning ? <AlertTriangle className="w-5 h-5" /> : <ShieldCheck className="w-5 h-5" />}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] uppercase font-bold tracking-wider text-slate-500">System State:</span>
                  <span className={`text-xs sm:text-sm font-black tracking-wide font-mono ${
                    isWarning ? 'text-amber-700' : 'text-emerald-700'
                  }`}>
                    {isWarning ? 'SYSTEM WARNING' : 'SYSTEM NORMAL'}
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-0.5">{systemStatus.message}</p>
              </div>
            </div>

            {/* Quick indicators */}
            <div className="flex items-center gap-2 self-stretch sm:self-auto justify-end text-xs font-mono">
              <div className="neu-inset-sm flex items-center gap-1.5 px-3 py-1.5 text-slate-700">
                <Flame className={`w-3.5 h-3.5 ${sensorData?.flame ? 'text-rose-500' : 'text-emerald-600'}`} />
                <span>Fire: <strong>{sensorData?.flame ? 'ALERT (≥100)' : 'SAFE (<100)'}</strong></span>
              </div>
              <div className="neu-inset-sm flex items-center gap-1.5 px-3 py-1.5 text-slate-700">
                <Wind className={`w-3.5 h-3.5 ${sensorData?.smoke >= (SMOKE_THRESHOLDS?.DANGER_MIN ?? 800) ? 'text-rose-500' : sensorData?.smoke > (SMOKE_THRESHOLDS?.SAFE_MAX ?? 299) ? 'text-amber-600' : 'text-emerald-600'}`} />
                <span>Gas: <strong>{Math.round(sensorData?.smoke ?? 0)} PPM</strong></span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
