import { FLAME_THRESHOLDS, SMOKE_THRESHOLDS, BIN_THRESHOLDS } from '../config/sensorConfig';

/**
 * Evaluates state transitions and returns new alerts if state changed.
 */
export function generateAlertsFromTransition(prevState, nextState) {
  const newAlerts = [];
  const now = new Date().toISOString();

  if (!nextState) return newAlerts;

  // 1. Flame Sensor Alarm Transition (Independent optical sensor threshold >= 100)
  const prevFlame = prevState?.flame === true;
  const nextFlame = nextState.flame === true;
  const flameThreshold = FLAME_THRESHOLDS?.TRIGGER_MIN ?? 100;

  if (nextFlame && (!prevState || !prevFlame)) {
    newAlerts.push({
      id: `flame-alert-${Date.now()}-${Math.random()}`,
      type: 'FIRE',
      severity: 'EMERGENCY',
      title: 'Fire / Flame Hazard Detected',
      message: `Critical fire safety alarm! Flame sensor triggered with reading ${nextState.flameValue ?? (nextState.rawFields?.field4 || '≥100')} (Threshold: ≥${flameThreshold}). Immediate fire suppression protocol required.`,
      timestamp: now,
      icon: 'Flame',
    });
  } else if (prevState && prevFlame && !nextFlame) {
    newAlerts.push({
      id: `flame-cleared-${Date.now()}-${Math.random()}`,
      type: 'FIRE_CLEARED',
      severity: 'INFO',
      title: 'Flame Hazard Cleared',
      message: `Flame sensor reading returned to normal safe status (<${flameThreshold}).`,
      timestamp: now,
      icon: 'ShieldCheck',
    });
  }

  // 2. Gas / Smoke Sensor Transitions (Independent MQ-2 threshold >= 100 PPM)
  const prevSmoke = prevState?.smoke ?? 0;
  const nextSmoke = nextState.smoke ?? 0;
  const prevSmokeHazard = prevSmoke >= SMOKE_THRESHOLDS.DANGER_MIN;
  const nextSmokeHazard = nextSmoke >= SMOKE_THRESHOLDS.DANGER_MIN;

  if (nextSmokeHazard && (!prevState || !prevSmokeHazard)) {
    newAlerts.push({
      id: `smoke-danger-${Date.now()}-${Math.random()}`,
      type: 'SMOKE_DANGER',
      severity: 'EMERGENCY',
      title: 'Hazardous Gas / Smoke Detected',
      message: `Critical air quality alarm! Gas level reached ${nextSmoke} PPM (≥ ${SMOKE_THRESHOLDS.DANGER_MIN} PPM threshold). Immediate ventilation required.`,
      timestamp: now,
      icon: 'AlertOctagon',
    });
  } else if (prevState && prevSmokeHazard && !nextSmokeHazard) {
    newAlerts.push({
      id: `smoke-cleared-${Date.now()}-${Math.random()}`,
      type: 'SMOKE_CLEARED',
      severity: 'INFO',
      title: 'Gas Hazard Cleared',
      message: `Gas/smoke levels returned to safe operating baseline (${nextSmoke} PPM).`,
      timestamp: now,
      icon: 'ShieldCheck',
    });
  } else if (nextSmoke > SMOKE_THRESHOLDS.MODERATE_MAX && nextSmoke < SMOKE_THRESHOLDS.DANGER_MIN && (prevSmoke <= SMOKE_THRESHOLDS.MODERATE_MAX || prevSmoke >= SMOKE_THRESHOLDS.DANGER_MIN)) {
    newAlerts.push({
      id: `smoke-high-${Date.now()}-${Math.random()}`,
      type: 'SMOKE_HIGH',
      severity: 'WARNING',
      title: 'Elevated Gas Concentration',
      message: `Gas reading reached elevated level: ${nextSmoke} PPM (Warning threshold).`,
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
