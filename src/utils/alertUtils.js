import { SMOKE_THRESHOLDS, BIN_THRESHOLDS } from '../config/sensorConfig';

/**
 * Evaluates state transitions and returns new alerts if state changed.
 */
export function generateAlertsFromTransition(prevState, nextState) {
  const newAlerts = [];
  const now = new Date().toISOString();

  if (!nextState) return newAlerts;

  // 1. Flame Sensor transition
  if (nextState.flame === true && (!prevState || prevState.flame !== true)) {
    newAlerts.push({
      id: `flame-alert-${Date.now()}-${Math.random()}`,
      type: 'FIRE',
      severity: 'EMERGENCY',
      title: 'Flame Detected',
      message: 'Critical optical flame sensor triggered! Immediate safety inspection required.',
      timestamp: now,
      icon: 'Flame',
    });
  } else if (prevState && prevState.flame === true && nextState.flame === false) {
    newAlerts.push({
      id: `flame-cleared-${Date.now()}-${Math.random()}`,
      type: 'FIRE_CLEARED',
      severity: 'INFO',
      title: 'Flame Hazard Cleared',
      message: 'Flame sensor reading returned to safe status.',
      timestamp: now,
      icon: 'ShieldCheck',
    });
  }

  // 2. Smoke / Gas Sensor transitions
  const prevSmoke = prevState?.smoke ?? 0;
  const nextSmoke = nextState.smoke ?? 0;

  if (nextSmoke >= SMOKE_THRESHOLDS.DANGER_MIN && prevSmoke < SMOKE_THRESHOLDS.DANGER_MIN) {
    newAlerts.push({
      id: `smoke-danger-${Date.now()}-${Math.random()}`,
      type: 'SMOKE_DANGER',
      severity: 'EMERGENCY',
      title: 'Gas / Smoke Hazard Level: DANGER',
      message: `Gas sensor reading escalated to ${nextSmoke} PPM (>= ${SMOKE_THRESHOLDS.DANGER_MIN} PPM).`,
      timestamp: now,
      icon: 'AlertTriangle',
    });
  } else if (nextSmoke >= 600 && nextSmoke < SMOKE_THRESHOLDS.DANGER_MIN && (prevSmoke < 600 || prevSmoke >= SMOKE_THRESHOLDS.DANGER_MIN)) {
    newAlerts.push({
      id: `smoke-high-${Date.now()}-${Math.random()}`,
      type: 'SMOKE_HIGH',
      severity: 'WARNING',
      title: 'Elevated Gas Concentration',
      message: `Gas reading reached HIGH level: ${nextSmoke} PPM.`,
      timestamp: now,
      icon: 'AlertCircle',
    });
  }

  // 3. Proximity / Metal Sensor transitions
  if (nextState.metalDetected === true && (!prevState || prevState.metalDetected !== true)) {
    newAlerts.push({
      id: `metal-detected-${Date.now()}-${Math.random()}`,
      type: 'METAL_DETECTED',
      severity: 'INFO',
      title: 'Metal Waste Detected',
      message: 'Inductive proximity sensor identified metallic object in sorting zone.',
      timestamp: now,
      icon: 'Magnet',
    });
  }

  // 4. Bin Capacity Transitions
  const bins = [
    { key: 'bin1', name: 'Bin 01 (PET / Plastic)' },
    { key: 'bin2', name: 'Bin 02 (Dry / Recyclable)' },
    { key: 'bin3', name: 'Bin 03 (Organic / General)' },
  ];

  bins.forEach(({ key, name }) => {
    const prevFill = prevState ? prevState[key] ?? 0 : 0;
    const nextFill = nextState[key] ?? 0;

    if (nextFill >= BIN_THRESHOLDS.COLLECTION_REQUIRED_TRIGGER && prevFill < BIN_THRESHOLDS.COLLECTION_REQUIRED_TRIGGER) {
      newAlerts.push({
        id: `${key}-full-${Date.now()}-${Math.random()}`,
        type: 'BIN_FULL',
        severity: 'CRITICAL',
        title: `${name} — FULL`,
        message: `${name} has reached ${nextFill}% capacity. Immediate collection dispatch required.`,
        timestamp: now,
        icon: 'Trash2',
      });
    } else if (nextFill >= BIN_THRESHOLDS.WARNING_TRIGGER && prevFill < BIN_THRESHOLDS.WARNING_TRIGGER) {
      newAlerts.push({
        id: `${key}-warn-${Date.now()}-${Math.random()}`,
        type: 'BIN_WARNING',
        severity: 'WARNING',
        title: `${name} — Near Capacity`,
        message: `${name} fill level reached ${nextFill}%. Preparing for collection cycle.`,
        timestamp: now,
        icon: 'AlertCircle',
      });
    }
  });

  return newAlerts;
}
