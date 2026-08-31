import React from 'react';
import { Magnet, Disc, Radio } from 'lucide-react';

export default function MetalDetection({ metalDetected, rawFieldValue, isOnline = true }) {
  const isMetal = Boolean(metalDetected);

  return (
    <div className={`neu-card p-4 sm:p-5 flex flex-col justify-between transition-all duration-300 ${
      isMetal ? 'border-2 border-purple-400 shadow-sm' : ''
    }`}>
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-2.5 border-b border-slate-300/40">
          <span className="text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500">
            FIELD 06 • INDUCTIVE
          </span>
          <span className="neu-inset-sm flex items-center gap-1 text-[10px] font-mono uppercase px-2.5 py-1 text-slate-700">
            <Radio className="w-2.5 h-2.5 text-emerald-600 animate-pulse" />
            {isOnline ? 'ONLINE' : 'OFFLINE'}
          </span>
        </div>

        <h3 className="text-base sm:text-lg font-black text-slate-800 tracking-wide mt-2.5 flex items-center gap-2 font-mono">
          <Magnet className={`w-5 h-5 ${isMetal ? 'text-purple-600 animate-pulse' : 'text-slate-500'}`} />
          PROXIMITY SENSOR
        </h3>
        <p className="text-xs text-slate-500 mt-0.5">
          Inductive coil metal sorting detection
        </p>

        {/* Status Display Area */}
        <div className="neu-inset my-4 p-4 flex flex-col items-center justify-center text-center">
          {isMetal ? (
            <div className="space-y-1.5">
              <div className="neu-button inline-flex p-3 text-purple-600 border border-purple-300 animate-pulse">
                <Disc className="w-8 h-8 text-purple-600 animate-spin" />
              </div>
              <div>
                <div className="text-xl font-black text-purple-700 tracking-wider font-mono">
                  METAL DETECTED
                </div>
                <div className="text-xs font-semibold text-purple-600 mt-0.5">
                  Ferrous Metallic Item in Chute
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-1.5">
              <div className="neu-button inline-flex p-3 text-slate-500 border border-slate-300">
                <Magnet className="w-8 h-8 text-slate-400" />
              </div>
              <div>
                <div className="text-xl font-black text-slate-700 tracking-wider font-mono">
                  NO METAL
                </div>
                <div className="text-xs font-semibold text-slate-500 mt-0.5">
                  Chute Zone Clear / Non-Metallic
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="pt-2 border-t border-slate-300/40 flex items-center justify-between text-[11px] font-mono text-slate-500">
        <span>Raw: <strong className="text-slate-700 font-bold">{rawFieldValue ?? (isMetal ? '1' : '0')}</strong></span>
        <span className={isMetal ? 'text-purple-700 font-bold' : 'text-slate-500 font-semibold'}>
          {isMetal ? 'COIL INDUCTION ACTIVE' : 'STANDBY'}
        </span>
      </div>
    </div>
  );
}
