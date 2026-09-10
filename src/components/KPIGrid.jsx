import React from 'react';
import { Activity, Radio, Trash2, CheckSquare, Flame, Wind, Magnet } from 'lucide-react';
import StatusCard from './StatusCard';
import { getSmokeStatus } from '../utils/sensorUtils';
import { BIN_THRESHOLDS } from '../config/sensorConfig';

export default function KPIGrid({ sensorData, connectionStatus, systemStatus }) {
  const isOnline = connectionStatus === 'LIVE';

  const b1 = sensorData?.bin1 ?? 0;
  const b2 = sensorData?.bin2 ?? 0;
  const b3 = sensorData?.bin3 ?? 0;

  const collectionCount = [b1, b2, b3].filter(f => f >= BIN_THRESHOLDS.COLLECTION_REQUIRED_TRIGGER).length;
  const nearCount = [b1, b2, b3].filter(f => f >= BIN_THRESHOLDS.WARNING_TRIGGER && f < BIN_THRESHOLDS.COLLECTION_REQUIRED_TRIGGER).length;

  const smokeInfo = getSmokeStatus(sensorData?.smoke ?? 0);

  const getSystemBadgeType = () => {
    if (systemStatus?.state === 'EMERGENCY') return 'rose';
    if (systemStatus?.state === 'WARNING') return 'amber';
    return 'emerald';
  };

  const getSystemBadgeText = () => {
    if (systemStatus?.state === 'EMERGENCY') return 'CRITICAL';
    if (systemStatus?.state === 'WARNING') return 'ALERT';
    return 'NOMINAL';
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-3 sm:gap-4">
      
      {/* 1. Global System Status */}
      <StatusCard
        title="System State"
        value={systemStatus?.state || 'INIT'}
        badgeText={getSystemBadgeText()}
        badgeType={getSystemBadgeType()}
        icon={Activity}
        trend="Auto-Protection"
      />

      {/* 2. ThingSpeak Connection */}
      <StatusCard
        title="ThingSpeak"
        value={isOnline ? 'ONLINE' : 'OFFLINE'}
        badgeText={isOnline ? 'LIVE' : 'DISCONNECTED'}
        badgeType={isOnline ? 'emerald' : 'rose'}
        icon={Radio}
        trend="#3470506"
      />

      {/* 3. Total Bins */}
      <StatusCard
        title="Total Bins"
        value="3 Bins"
        badgeText="ACTIVE"
        badgeType="emerald"
        icon={Trash2}
        trend="Tri-Chamber"
      />

      {/* 4. Collection Required */}
      <StatusCard
        title="Collection"
        value={`${collectionCount} / 3`}
        subvalue={nearCount > 0 ? `(${nearCount} near)` : ''}
        badgeText={collectionCount > 0 ? 'URGENT' : nearCount > 0 ? 'QUEUE' : 'NORMAL'}
        badgeType={collectionCount > 0 ? 'rose' : nearCount > 0 ? 'amber' : 'emerald'}
        icon={CheckSquare}
        trend="≥95% Level"
      />

      {/* 5. Flame Status */}
      <StatusCard
        title="Flame Sensor"
        value={sensorData?.flame ? 'FIRE ALERT' : 'SAFE'}
        subvalue={sensorData?.flameValue !== undefined ? `State: ${sensorData.flameValue}` : ''}
        badgeText={sensorData?.flame ? 'ALERT (1)' : 'SAFE (0)'}
        badgeType={sensorData?.flame ? 'rose' : 'emerald'}
        icon={Flame}
        trend="Digital 0/1"
      />

      {/* 6. Smoke Status */}
      <StatusCard
        title="Gas / Smoke"
        value={`${Math.round(sensorData?.smoke ?? 0)}`}
        subvalue="%"
        badgeText={smokeInfo.level}
        badgeType={
          smokeInfo.severity === 'danger'
            ? 'rose'
            : smokeInfo.severity === 'warning'
            ? 'amber'
            : 'emerald'
        }
        icon={Wind}
        trend="MQ-2 Gas (%)"
      />

      {/* 7. Metal Detection Status */}
      <StatusCard
        title="Metal Sensor"
        value={sensorData?.metalDetected ? 'DETECTED' : 'CLEAR'}
        badgeText={sensorData?.metalDetected ? 'INDUCTIVE' : 'IDLE'}
        badgeType={sensorData?.metalDetected ? 'purple' : 'default'}
        icon={Magnet}
        trend="Proximity"
      />

    </div>
  );
}
