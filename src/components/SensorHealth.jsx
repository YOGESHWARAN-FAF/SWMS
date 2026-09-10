import React from 'react';
import { CheckCircle2, XCircle, Cpu } from 'lucide-react';
import { FLAME_THRESHOLDS } from '../config/sensorConfig';

export default function SensorHealth({ sensorData, connectionStatus, channelMeta: _channelMeta }) {
  const isChannelOnline = connectionStatus === 'LIVE';
  const raw = sensorData?.rawFields || {};

  const isFieldValid = (val) => val !== undefined && val !== null && val !== '';

  const sensors = [
    {
      id: 'field1',
      name: 'Ultrasonic Sensor 1',
      pin: 'Field 1 GPIO',
      target: 'Bin 01 (PET / Plastic)',
      isValid: isChannelOnline && isFieldValid(raw.field1),
      value: raw.field1 !== undefined && raw.field1 !== null ? `${raw.field1}%` : 'NO DATA',
    },
    {
      id: 'field2',
      name: 'Ultrasonic Sensor 2',
      pin: 'Field 2 GPIO',
      target: 'Bin 02 (Dry / Recyclable)',
      isValid: isChannelOnline && isFieldValid(raw.field2),
      value: raw.field2 !== undefined && raw.field2 !== null ? `${raw.field2}%` : 'NO DATA',
    },
    {
      id: 'field3',
      name: 'Ultrasonic Sensor 3',
      pin: 'Field 3 GPIO',
      target: 'Bin 03 (Organic / General)',
      isValid: isChannelOnline && isFieldValid(raw.field3),
      value: raw.field3 !== undefined && raw.field3 !== null ? `${raw.field3}%` : 'NO DATA',
    },
    {
      id: 'field4',
      name: 'Flame Sensor',
      pin: 'Field 4 Optical ADC',
      target: 'Fire Detection',
      isValid: isChannelOnline && isFieldValid(raw.field4),
      value: raw.field4 !== undefined && raw.field4 !== null
        ? `${raw.field4} (${Number.parseFloat(raw.field4) >= (FLAME_THRESHOLDS?.TRIGGER_MIN ?? 100) ? 'ACTIVE' : 'IDLE'})`
        : 'NO DATA',
    },
    {
      id: 'field5',
      name: 'Gas / Smoke Sensor',
      pin: 'Field 5 MQ-2 ADC',
      target: 'Air Quality / Gas',
      isValid: isChannelOnline && isFieldValid(raw.field5),
      value: raw.field5 !== undefined && raw.field5 !== null ? `${raw.field5} PPM` : 'NO DATA',
    },
    {
      id: 'field6',
      name: 'Proximity Sensor',
      pin: 'Field 6 Inductive',
      target: 'Metal Detection',
      isValid: isChannelOnline && isFieldValid(raw.field6),
      value: raw.field6 !== undefined && raw.field6 !== null ? (raw.field6 === '1' ? 'ACTIVE' : 'IDLE') : 'NO DATA',
    },
    {
      id: 'esp32',
      name: 'ESP32 IoT Gateway',
      pin: '2.4 GHz WiFi',
      target: 'Telemetry Node',
      isValid: isChannelOnline,
      value: isChannelOnline ? 'Connected' : 'OFFLINE',
    },
    {
      id: 'thingspeak',
      name: 'ThingSpeak Cloud',
      pin: 'Channel #3470506',
      target: 'REST Broker',
      isValid: isChannelOnline,
      value: isChannelOnline ? 'Connected' : 'OFFLINE',
    },
  ];

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
              Sensor Health & Diagnostics
            </h3>
            <p className="text-[11px] sm:text-xs text-slate-500">
              Live telemetry signal validation matrix
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono self-start sm:self-auto">
          <span className="neu-inset-sm px-3 py-1 text-emerald-800 font-bold text-[11px]">
            {sensors.filter(s => s.isValid).length} / {sensors.length} NODES ONLINE
          </span>
        </div>
      </div>

      {/* Diagnostics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3">
        {sensors.map((sensor) => (
          <div
            key={sensor.id}
            className={`p-3 rounded-2xl transition-all flex flex-col justify-between ${
              sensor.isValid
                ? 'neu-inset'
                : 'bg-rose-50 border-2 border-rose-300'
            }`}
          >
            <div className="flex items-start justify-between gap-1.5">
              <div>
                <span className="text-xs font-bold text-slate-800 font-mono block truncate max-w-[110px] sm:max-w-none">
                  {sensor.name}
                </span>
                <span className="text-[10px] text-slate-500 block mt-0.5 truncate">
                  {sensor.target}
                </span>
              </div>

              {sensor.isValid ? (
                <span className="neu-button flex items-center gap-1 px-1.5 py-0.5 text-[9px] font-bold uppercase text-emerald-800 font-mono flex-shrink-0">
                  <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600" /> OK
                </span>
              ) : (
                <span className="neu-button flex items-center gap-1 px-1.5 py-0.5 text-[9px] font-bold uppercase text-rose-800 font-mono flex-shrink-0">
                  <XCircle className="w-2.5 h-2.5 text-rose-600" /> OFF
                </span>
              )}
            </div>

            <div className="mt-2.5 pt-2 border-t border-slate-300/40 flex items-center justify-between text-[10px] font-mono text-slate-500">
              <span className="truncate max-w-[80px]">{sensor.pin}</span>
              <span className={`font-bold ${sensor.isValid ? 'text-emerald-700' : 'text-rose-600'}`}>
                {sensor.value}
              </span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
