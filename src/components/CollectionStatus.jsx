import React from 'react';
import { Truck, CheckCircle2, AlertTriangle, AlertOctagon, ArrowRight } from 'lucide-react';
import { getBinStatus, getCollectionAction } from '../utils/sensorUtils';
import { BIN_CONFIG } from '../config/sensorConfig';

export default function CollectionStatus({ sensorData }) {
  const b1 = sensorData?.bin1 ?? 0;
  const b2 = sensorData?.bin2 ?? 0;
  const b3 = sensorData?.bin3 ?? 0;

  const binItems = [
    { config: BIN_CONFIG.bin1, fill: b1 },
    { config: BIN_CONFIG.bin2, fill: b2 },
    { config: BIN_CONFIG.bin3, fill: b3 },
  ];

  const totalUrgent = binItems.filter(b => b.fill >= 95).length;
  const totalPrepare = binItems.filter(b => b.fill >= 80 && b.fill < 95).length;

  return (
    <div className="neu-card p-4 sm:p-5 space-y-3.5">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2.5 border-b border-slate-300/40">
        <div className="flex items-center gap-2.5">
          <div className="neu-button p-2 text-amber-600 flex items-center justify-center">
            <Truck className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-black text-slate-800 tracking-wide uppercase font-mono">
              Waste Collection Status
            </h3>
            <p className="text-[11px] sm:text-xs text-slate-500">
              Automated logistics dispatch triggers & bin routing
            </p>
          </div>
        </div>

        {/* Action Summary Pill */}
        <div className="flex items-center gap-2 text-xs font-mono self-start sm:self-auto">
          {totalUrgent > 0 ? (
            <span className="px-2.5 py-1 rounded-full bg-rose-50 text-rose-700 border border-rose-300 font-bold animate-pulse flex items-center gap-1.5 shadow-sm text-[11px]">
              <AlertOctagon className="w-3.5 h-3.5 text-rose-600" />
              {totalUrgent} TRUCK DISPATCH REQ.
            </span>
          ) : totalPrepare > 0 ? (
            <span className="px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-300 font-bold flex items-center gap-1.5 shadow-sm text-[11px]">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
              {totalPrepare} QUEUED FOR DISPATCH
            </span>
          ) : (
            <span className="neu-inset-sm px-3 py-1 text-emerald-800 font-bold flex items-center gap-1.5 text-[11px]">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              ALL BINS OPTIMAL
            </span>
          )}
        </div>
      </div>

      {/* 3 Bin Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {binItems.map(({ config, fill }) => {
          const status = getBinStatus(fill);
          const action = getCollectionAction(fill);

          return (
            <div
              key={config.id}
              className={`p-3.5 rounded-2xl transition-all duration-300 ${
                fill >= 95
                  ? 'bg-rose-50 border-2 border-rose-300 shadow-sm'
                  : fill >= 80
                  ? 'bg-amber-50 border-2 border-amber-300 shadow-sm'
                  : 'neu-inset'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[11px] font-mono font-bold text-slate-500">
                    {config.name}
                  </span>
                  <h4 className="text-xs sm:text-sm font-black text-slate-800 font-mono mt-0.5">
                    {config.category}
                  </h4>
                </div>
                <span className="text-lg font-black text-slate-800 font-mono">
                  {fill}%
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full h-2 bg-slate-300/60 rounded-full overflow-hidden my-2.5">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${
                    fill >= 95 ? 'bg-rose-500' : fill >= 80 ? 'bg-amber-500' : fill >= 50 ? 'bg-sky-500' : 'bg-emerald-600'
                  }`}
                  style={{ width: `${Math.max(3, fill)}%` }}
                ></div>
              </div>

              <div className="space-y-1 text-xs">
                <div className="flex items-center justify-between text-slate-600">
                  <span className="text-[11px] text-slate-500 font-mono">Status:</span>
                  <span className={`font-bold font-mono text-[11px] ${status.textClass}`}>
                    {status.label}
                  </span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span className="text-[11px] text-slate-500 font-mono">Action:</span>
                  <span className={`font-bold font-mono text-[11px] text-right ${action.color}`}>
                    {action.status}
                  </span>
                </div>
              </div>

              <div className="mt-2.5 pt-2 border-t border-slate-300/40 flex items-center justify-between text-[10px] font-mono text-slate-500">
                <span>Task:</span>
                <span className="text-slate-700 font-semibold flex items-center gap-1">
                  {action.actionText}
                  <ArrowRight className="w-2.5 h-2.5 text-emerald-600" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
