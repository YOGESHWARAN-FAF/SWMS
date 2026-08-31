import React from 'react';
import Header from '../components/Header';
import SystemStatus from '../components/SystemStatus';
import KPIGrid from '../components/KPIGrid';
import DigitalTwin from '../components/DigitalTwin';
import SafetyPanel from '../components/SafetyPanel';
import FillLevelChart from '../components/FillLevelChart';
import SmokeChart from '../components/SmokeChart';
import CollectionStatus from '../components/CollectionStatus';
import AlertsPanel from '../components/AlertsPanel';
import SensorHealth from '../components/SensorHealth';
import EdgeAINote from '../components/EdgeAINote';
import { useThingSpeak } from '../hooks/useThingSpeak';

export default function Dashboard() {
  const {
    sensorData,
    historyData,
    channelMeta,
    loading,
    isRefreshing,
    error,
    connectionStatus,
    lastUpdated,
    systemStatus,
    alerts,
    clearAlerts,
    refetch,
  } = useThingSpeak();

  return (
    <div className="min-h-screen bg-[#ebf2ec] text-slate-800 antialiased selection:bg-emerald-500/20 selection:text-emerald-900 pb-8 sm:pb-12">
      
      {/* Background Ambient Soft Lighting */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-32 left-1/4 w-96 h-96 bg-emerald-200/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 -right-32 w-96 h-96 bg-teal-200/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        
        {/* Navigation & Header */}
        <Header
          connectionStatus={connectionStatus}
          lastUpdated={lastUpdated}
          isRefreshing={isRefreshing}
          onRefresh={refetch}
          channelId={channelMeta?.id || '3470506'}
        />

        {/* Main Content Area - Neumorphic & Mobile Optimized */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-3.5 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-4 sm:space-y-6">
          
          {/* 1. Global System Status & Emergency Alert Banner */}
          <SystemStatus
            systemStatus={systemStatus}
            sensorData={sensorData}
          />

          {/* 2. Top Level KPI Metrics Grid */}
          <KPIGrid
            sensorData={sensorData}
            connectionStatus={connectionStatus}
            systemStatus={systemStatus}
          />

          {/* 3. Centerpiece: Smart Bin Digital Twin */}
          <DigitalTwin
            sensorData={sensorData}
            isOnline={connectionStatus === 'LIVE'}
          />

          {/* 4. Multi-Sensor Safety Monitoring (Flame, Smoke/Gas, Metal) */}
          <SafetyPanel
            sensorData={sensorData}
            isOnline={connectionStatus === 'LIVE'}
          />

          {/* 5. Historical Telemetry Analytics Grid */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-3.5 sm:gap-5">
            <FillLevelChart historyData={historyData} />
            <SmokeChart historyData={historyData} />
          </section>

          {/* 6. Waste Collection Logistics & Recent Event Alerts */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-3.5 sm:gap-5">
            <CollectionStatus sensorData={sensorData} />
            <AlertsPanel alerts={alerts} onClearAlerts={clearAlerts} />
          </section>

          {/* 7. Sensor Health & Hardware Diagnostics Matrix */}
          <SensorHealth
            sensorData={sensorData}
            connectionStatus={connectionStatus}
            channelMeta={channelMeta}
          />

          {/* 8. Edge AI & Architectural Context Note */}
          <EdgeAINote />

        </main>

        {/* Footer */}
        <footer className="mt-8 border-t border-slate-300/60 bg-[#ebf2ec]/80 backdrop-blur-md py-4 sm:py-6 text-center text-xs text-slate-500 font-mono">
          <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
            <p className="font-bold text-slate-700">
              SmartBin AI • Neumorphic Digital Twin • Channel #3470506
            </p>
            <p className="text-emerald-800 font-semibold text-[11px] sm:text-xs">
              Edge AI + IoT + Digital Twin + Multi-Sensor Safety Monitoring
            </p>
          </div>
        </footer>

      </div>
    </div>
  );
}
