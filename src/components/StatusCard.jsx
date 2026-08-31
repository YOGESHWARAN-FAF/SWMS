import React from 'react';

export default function StatusCard({
  title,
  value,
  subvalue,
  icon: Icon,
  badgeText,
  badgeType = 'default', // 'emerald' | 'rose' | 'amber' | 'sky' | 'purple' | 'default'
  trend,
  className = '',
}) {
  const getBadgeStyle = () => {
    switch (badgeType) {
      case 'rose':
        return 'text-rose-700 bg-rose-50 border-rose-200 shadow-sm';
      case 'amber':
        return 'text-amber-800 bg-amber-50 border-amber-200 shadow-sm';
      case 'emerald':
        return 'text-emerald-800 bg-emerald-50 border-emerald-200 shadow-sm';
      case 'purple':
        return 'text-purple-800 bg-purple-50 border-purple-200 shadow-sm';
      case 'sky':
        return 'text-sky-800 bg-sky-50 border-sky-200 shadow-sm';
      default:
        return 'text-slate-700 bg-white/80 border-slate-200 shadow-sm';
    }
  };

  const getIconStyle = () => {
    switch (badgeType) {
      case 'rose':
        return 'text-rose-600';
      case 'amber':
        return 'text-amber-600';
      case 'emerald':
        return 'text-emerald-600';
      case 'purple':
        return 'text-purple-600';
      case 'sky':
        return 'text-sky-600';
      default:
        return 'text-emerald-700';
    }
  };

  return (
    <div
      className={`neu-card p-3.5 sm:p-4 flex flex-col justify-between transition-all duration-200 hover:-translate-y-0.5 ${className}`}
    >
      {/* Top row: Title and Inset Icon */}
      <div className="flex items-center justify-between gap-2">
        <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500">
          {title}
        </span>

        {Icon && (
          <div className="neu-inset-sm p-2 flex items-center justify-center flex-shrink-0">
            <Icon className={`w-4 h-4 ${getIconStyle()}`} />
          </div>
        )}
      </div>

      {/* Center: Primary Value with subvalue */}
      <div className="my-2 flex items-baseline gap-1.5 flex-wrap">
        <span className="text-base sm:text-xl font-black text-slate-800 font-mono tracking-tight">
          {value}
        </span>
        {subvalue && (
          <span className="text-[11px] font-mono text-slate-500 font-semibold">
            {subvalue}
          </span>
        )}
      </div>

      {/* Bottom row: Badge and Sub-label */}
      <div className="pt-2 border-t border-slate-300/40 flex items-center justify-between gap-1 text-[10px] font-mono">
        {badgeText && (
          <span className={`px-2 py-0.5 rounded-full font-bold uppercase tracking-wider border ${getBadgeStyle()}`}>
            {badgeText}
          </span>
        )}
        {trend && (
          <span className="text-slate-500 font-medium text-right truncate">
            {trend}
          </span>
        )}
      </div>
    </div>
  );
}
