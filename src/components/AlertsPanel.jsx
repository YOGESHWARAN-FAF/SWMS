import React, { useState } from 'react';
import { Bell, AlertTriangle, AlertOctagon, Info, ShieldCheck, Flame, Magnet, Trash2, CheckCircle2 } from 'lucide-react';
import { formatTimestamp } from '../utils/sensorUtils';

export default function AlertsPanel({ alerts = [], onClearAlerts }) {
  const [filter, setFilter] = useState('ALL');

  const getAlertIcon = (type) => {
    switch (type) {
      case 'FIRE':
        return <Flame className="w-3.5 h-3.5 text-rose-600" />;
      case 'FIRE_CLEARED':
      case 'SMOKE_CLEARED':
        return <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />;
      case 'SMOKE_DANGER':
        return <AlertOctagon className="w-3.5 h-3.5 text-rose-600" />;
      case 'SMOKE_HIGH':
        return <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />;
      case 'METAL_DETECTED':
        return <Magnet className="w-3.5 h-3.5 text-purple-600" />;
      case 'BIN_FULL':
        return <Trash2 className="w-3.5 h-3.5 text-rose-600" />;
      case 'BIN_WARNING':
        return <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />;
      default:
        return <Info className="w-3.5 h-3.5 text-sky-600" />;
    }
  };

  const getSeverityBadge = (severity) => {
    switch (severity) {
      case 'EMERGENCY':
      case 'CRITICAL':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'WARNING':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      case 'INFO':
      default:
        return 'bg-sky-50 text-sky-700 border-sky-200';
    }
  };

  const filteredAlerts = alerts.filter(a => {
    if (filter === 'ALL') return true;
    if (filter === 'EMERGENCY') return a.severity === 'EMERGENCY' || a.severity === 'CRITICAL';
    if (filter === 'WARNING') return a.severity === 'WARNING';
    if (filter === 'INFO') return a.severity === 'INFO';
    return true;
  });

  return (
    <div className="neu-card p-4 sm:p-5 space-y-3.5">
      
      {/* Header & Filter Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-2.5 border-b border-slate-300/40">
        <div className="flex items-center gap-2.5">
          <div className="neu-button p-2 text-purple-600 flex items-center justify-center">
            <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm sm:text-base font-black text-slate-800 tracking-wide uppercase font-mono">
                Recent Event Alerts
              </h3>
              <span className="neu-inset-sm px-2 py-0.2 text-[10px] font-mono font-bold text-slate-600">
                {alerts.length}
              </span>
            </div>
            <p className="text-[11px] sm:text-xs text-slate-500">
              State transition telemetry log
            </p>
          </div>
        </div>

        {/* Filter Buttons & Clear */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="neu-inset-sm flex items-center p-1 text-xs font-mono">
            {['ALL', 'EMERGENCY', 'WARNING', 'INFO'].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-2.5 py-1 rounded-lg transition-all text-[11px] font-bold ${
                  filter === f
                    ? 'neu-button text-emerald-800 font-black'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {alerts.length > 0 && (
            <button
              onClick={onClearAlerts}
              className="neu-button px-3 py-1 text-slate-600 hover:text-rose-600 text-[11px] font-mono font-semibold transition-all"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Alert Feed List */}
      <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
        {filteredAlerts.length === 0 ? (
          <div className="neu-inset py-6 text-center flex flex-col items-center justify-center space-y-1.5">
            <CheckCircle2 className="w-6 h-6 text-slate-400" />
            <p className="text-xs font-mono text-slate-500 font-bold">No active alerts in this filter</p>
            <p className="text-[11px] text-slate-400">Events trigger automatically on telemetry updates</p>
          </div>
        ) : (
          filteredAlerts.map((alert) => (
            <div
              key={alert.id}
              className={`p-3 rounded-2xl border flex items-start justify-between gap-2.5 transition-all ${
                alert.severity === 'EMERGENCY' || alert.severity === 'CRITICAL'
                  ? 'bg-rose-50/90 border-rose-300 shadow-sm'
                  : alert.severity === 'WARNING'
                  ? 'bg-amber-50/80 border-amber-300 shadow-sm'
                  : 'neu-inset'
              }`}
            >
              <div className="flex items-start gap-2.5">
                <div className="neu-button p-1.5 flex items-center justify-center flex-shrink-0 mt-0.5">
                  {getAlertIcon(alert.type)}
                </div>
                <div>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-xs font-bold text-slate-800 font-mono">
                      {alert.title}
                    </span>
                    <span className={`px-1.5 py-0.2 rounded text-[9px] font-mono font-bold uppercase border ${getSeverityBadge(alert.severity)}`}>
                      {alert.severity}
                    </span>
                  </div>
                  <p className="text-[11px] sm:text-xs text-slate-600 mt-0.5">
                    {alert.message}
                  </p>
                </div>
              </div>

              <div className="flex-shrink-0 text-right">
                <span className="text-[10px] font-mono text-slate-500 font-medium">
                  {formatTimestamp(alert.timestamp)}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
}
