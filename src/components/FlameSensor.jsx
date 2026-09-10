import React from 'react';
import { Flame, ShieldCheck, AlertOctagon, Radio } from 'lucide-react';

export default function FlameSensor({ flameDetected, rawFieldValue, isOnline = true }) {
  const isFlame = Boolean(flameDetected);

  return (
    <div className={`neu-card p-4 sm:p-5 flex flex-col justify-between transition-all duration-300 ${
      isFlame ? 'border-2 border-rose-400 shadow-neu-rose animate-pulse' : ''
    }`}>
      <div>
        <div className="flex items-center justify-between pb-2.5 border-b border-slate-300/40">
          <span className="text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500">
            FIELD 04 • OPTICAL
          </span>
          <span className="neu-inset-sm flex items-center gap-1 text-[10px] font-mono uppercase px-2.5 py-1 text-slate-700">
            <Radio className="w-2.5 h-2.5 text-emerald-600 animate-pulse" />
            {isOnline ? 'ONLINE' : 'OFFLINE'}
          </span>
        </div>

        <h3 className="text-base sm:text-lg font-black text-slate-800 tracking-wide mt-2.5 flex items-center gap-2 font-mono">
          <Flame className={`w-5 h-5 ${isFlame ? 'text-rose-500 animate-bounce' : 'text-slate-500'}`} />
          FLAME SENSOR
        </h3>
        <p className="text-xs text-slate-500 mt-0.5">
          Infrared optical fire & spark detection
        </p>

        {/* Status Display Area */}
        <div className="neu-inset my-4 p-4 flex flex-col items-center justify-center text-center">
          {isFlame ? (
            <div className="space-y-1.5">
              <div className="neu-button inline-flex p-3 text-rose-600 border border-rose-300 animate-pulse">
                <AlertOctagon className="w-8 h-8 text-rose-600" />
              </div>
              <div>
                <div className="text-xl font-black text-rose-600 tracking-wider font-mono">
                  ⚠ FIRE ALERT
                </div>
                <div className="text-xs font-bold text-rose-700 uppercase tracking-wider mt-0.5">
                  FLAME DETECTED (≥100 THRESHOLD)
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-1.5">
              <div className="neu-button inline-flex p-3 text-emerald-600 border border-emerald-300">
                <ShieldCheck className="w-8 h-8 text-emerald-600" />
              </div>
              <div>
                <div className="text-xl font-black text-emerald-700 tracking-wider font-mono">
                  SAFE
                </div>
                <div className="text-xs font-semibold text-slate-500 mt-0.5">
                  No Flame Detected (&lt;100)
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer Info */}
      <div className="pt-2 border-t border-slate-300/40 flex items-center justify-between text-[11px] font-mono text-slate-500">
        <span>
          Raw: <strong className="text-slate-700 font-bold">{rawFieldValue ?? (isFlame ? '≥100' : '0')}</strong>
          <span className="text-[10px] text-slate-400 font-normal ml-1">(Threshold: ≥100)</span>
        </span>
        <span className={isFlame ? 'text-rose-600 font-bold' : 'text-emerald-700 font-bold'}>
          {isFlame ? 'FIRE DETECTED' : 'NORMAL (SAFE)'}
        </span>
      </div>
    </div>
  );
}
