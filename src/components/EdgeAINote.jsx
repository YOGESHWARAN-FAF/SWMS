import React from 'react';
import { Cpu, Camera, ArrowRight, Radio } from 'lucide-react';

export default function EdgeAINote() {
  return (
    <div className="neu-card p-4 sm:p-5 space-y-3.5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2.5 border-b border-slate-300/40">
        <div className="flex items-center gap-2.5">
          <div className="neu-button p-2 text-emerald-700 flex items-center justify-center">
            <Cpu className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-black text-slate-800 tracking-wide uppercase font-mono">
              Edge AI Architecture
            </h3>
            <p className="text-[11px] sm:text-xs text-slate-500">
              Hardware-accelerated edge inference decoupled from IoT telemetry monitoring
            </p>
          </div>
        </div>

        <span className="neu-inset-sm px-3 py-1 text-emerald-800 text-[10px] sm:text-xs font-mono font-bold self-start sm:self-auto">
          ON-DEVICE EDGE ISOLATION
        </span>
      </div>

      {/* Architecture Flow Diagram */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
        
        {/* Box 1: Edge AI Classification */}
        <div className="neu-inset p-3.5 space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Camera className="w-4 h-4 text-emerald-600" />
              <h4 className="text-xs font-bold text-slate-800 font-mono uppercase">
                1. Edge AI Classification (ESP32-CAM)
              </h4>
            </div>
            <span className="neu-button px-2 py-0.5 text-[9px] font-mono text-emerald-800 font-bold">
              ON-DEVICE
            </span>
          </div>

          <div className="neu-card-sm p-2 flex items-center gap-1.5 text-[11px] font-mono text-slate-700 flex-wrap">
            <span>Camera</span>
            <ArrowRight className="w-3 h-3 text-emerald-600" />
            <span className="text-emerald-700 font-bold">Local AI Model</span>
            <ArrowRight className="w-3 h-3 text-emerald-600" />
            <span>Classification</span>
            <ArrowRight className="w-3 h-3 text-emerald-600" />
            <span className="text-teal-700 font-bold">Servo Sorter</span>
          </div>

          <p className="text-[11px] text-slate-500 leading-relaxed">
            Waste classification inference runs <strong>100% locally on the ESP32-CAM micro-controller</strong>. No raw video or mock prediction tokens are forwarded over the web.
          </p>
        </div>

        {/* Box 2: Digital Twin & IoT Telemetry */}
        <div className="neu-inset p-3.5 space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Radio className="w-4 h-4 text-teal-600" />
              <h4 className="text-xs font-bold text-slate-800 font-mono uppercase">
                2. Digital Twin & Safety (React + IoT)
              </h4>
            </div>
            <span className="neu-button px-2 py-0.5 text-[9px] font-mono text-teal-800 font-bold">
              REAL-TIME IOT
            </span>
          </div>

          <div className="neu-card-sm p-2 flex items-center gap-1.5 text-[11px] font-mono text-slate-700 flex-wrap">
            <span>6 Physical Sensors</span>
            <ArrowRight className="w-3 h-3 text-teal-600" />
            <span className="text-emerald-700 font-bold">ThingSpeak Cloud</span>
            <ArrowRight className="w-3 h-3 text-teal-600" />
            <span>React Dashboard</span>
            <ArrowRight className="w-3 h-3 text-teal-600" />
            <span className="text-teal-700 font-bold">Digital Twin</span>
          </div>

          <p className="text-[11px] text-slate-500 leading-relaxed">
            Monitors <strong>real-time ultrasonic fill levels, optical fire safety, MQ-2 smoke levels, and inductive proximity telemetry</strong> without fake data.
          </p>
        </div>

      </div>
    </div>
  );
}
