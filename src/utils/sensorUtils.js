import { SENSOR_MODE, BIN_CONFIG, SMOKE_THRESHOLDS, BIN_THRESHOLDS } from '../config/sensorConfig';

/**
 * Calculates bin fill percentage from raw ultrasonic distance in cm.
 * Formula: ((emptyDistance - currentDistance) / (emptyDistance - fullDistance)) * 100
 */
export function calculateFillPercentage(distance, emptyDistance = 40, fullDistance = 5) {
  if (distance === null || distance === undefined || isNaN(distance)) {
    return 0;
  }
  const numericDistance = Number.parseFloat(distance);
  if (isNaN(numericDistance)) return 0;

  if (emptyDistance <= fullDistance) return 0;

  const rawPercent = ((emptyDistance - numericDistance) / (emptyDistance - fullDistance)) * 100;
  return Math.min(100, Math.max(0, Math.round(rawPercent)));
}

/**
 * Normalizes a raw field value into a 0-100 percentage based on the active SENSOR_MODE.
 */
export function normalizeBinFill(rawValue, binKey = 'bin1') {
  if (rawValue === null || rawValue === undefined || rawValue === '') {
    return 0;
  }

  const num = Number.parseFloat(rawValue);
  if (isNaN(num)) return 0;

  if (SENSOR_MODE === 'RAW_DISTANCE') {
    const config = BIN_CONFIG[binKey] || { emptyDistance: 40, fullDistance: 5 };
    return calculateFillPercentage(num, config.emptyDistance, config.fullDistance);
  }

  // DIRECT_PERCENTAGE mode
  return Math.min(100, Math.max(0, Math.round(num)));
}

/**
 * Evaluates bin status text and styling metadata based on fill level.
 * 0–49%   → NORMAL
 * 50–79%  → GETTING FULL
 * 80–94%  → ALMOST FULL
 * 95–100% → FULL / COLLECTION REQUIRED
 */
export function getBinStatus(fillPercentage) {
  const percent = typeof fillPercentage === 'number' ? fillPercentage : Number.parseFloat(fillPercentage) || 0;

  if (percent >= BIN_THRESHOLDS.FULL_MIN) {
    return {
      label: 'FULL',
      sublabel: 'Collection Required',
      severity: 'danger',
      badgeClass: 'bg-rose-50 text-rose-700 border-rose-200 shadow-sm',
      textClass: 'text-rose-600',
      isWarning: true,
      isEmergency: false,
      isFull: true,
    };
  }
  if (percent >= BIN_THRESHOLDS.WARNING_TRIGGER) {
    return {
      label: 'ALMOST FULL',
      sublabel: 'Prepare for Collection',
      severity: 'warning',
      badgeClass: 'bg-amber-50 text-amber-800 border-amber-200 shadow-sm',
      textClass: 'text-amber-700',
      isWarning: true,
      isEmergency: false,
      isFull: false,
    };
  }
  if (percent >= BIN_THRESHOLDS.NORMAL_MAX + 1) {
    return {
      label: 'GETTING FULL',
      sublabel: 'Monitoring Active',
      severity: 'moderate',
      badgeClass: 'bg-sky-50 text-sky-700 border-sky-200 shadow-sm',
      textClass: 'text-sky-600',
      isWarning: false,
      isEmergency: false,
      isFull: false,
    };
  }
  return {
    label: 'NORMAL',
    sublabel: 'Capacity Optimal',
    severity: 'normal',
    badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200 shadow-sm',
    textClass: 'text-emerald-600',
    isWarning: false,
    isEmergency: false,
    isFull: false,
  };
}

/**
 * Evaluates Gas / Smoke sensor reading status.
 * < 300   → SAFE
 * 300–599 → MODERATE
 * 600–799 → HIGH
 * >= 800  → DANGER
 */
export function getSmokeStatus(smokeValue) {
  const val = typeof smokeValue === 'number' ? smokeValue : Number.parseFloat(smokeValue) || 0;

  if (val >= SMOKE_THRESHOLDS.DANGER_MIN) {
    return {
      level: 'DANGER',
      description: 'Hazardous gas or heavy smoke detected!',
      severity: 'danger',
      color: '#e11d48',
      badgeClass: 'bg-rose-50 text-rose-700 border-rose-200 shadow-sm',
      bgGradient: 'from-rose-50 to-red-100',
    };
  }
  if (val >= 600) {
    return {
      level: 'HIGH',
      description: 'Elevated gas concentration detected',
      severity: 'warning',
      color: '#ea580c',
      badgeClass: 'bg-orange-50 text-orange-700 border-orange-200 shadow-sm',
      bgGradient: 'from-orange-50 to-amber-100',
    };
  }
  if (val >= 300) {
    return {
      level: 'MODERATE',
      description: 'Moderate air particle reading',
      severity: 'moderate',
      color: '#d97706',
      badgeClass: 'bg-amber-50 text-amber-800 border-amber-200 shadow-sm',
      bgGradient: 'from-amber-50 to-yellow-100',
    };
  }
  return {
    level: 'SAFE',
    description: 'Air quality within clean atmospheric baseline',
    severity: 'safe',
    color: '#16a34a',
    badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200 shadow-sm',
    bgGradient: 'from-emerald-50 to-teal-100',
  };
}

/**
 * Calculates Global System Status:
 * NORMAL: No flame AND Smoke < 300 AND All bins < 80%
 * WARNING: Any bin >= 80% OR Smoke is MODERATE or HIGH (300-799)
 * EMERGENCY: Flame >= 100 OR Smoke >= 800
 */
export function getSystemStatus(sensorData) {
  if (!sensorData) {
    return {
      state: 'CONNECTING',
      message: 'Awaiting Live Telemetry Stream',
      severity: 'normal',
      color: '#0284c7',
    };
  }

  const { flame, smoke, bin1, bin2, bin3 } = sensorData;

  // EMERGENCY condition
  if (flame === true || (typeof smoke === 'number' && smoke >= SMOKE_THRESHOLDS.DANGER_MIN)) {
    return {
      state: 'EMERGENCY',
      message: flame ? 'Flame Hazard Detected — Immediate Inspection Required' : 'Critical Gas/Smoke Concentration Detected',
      severity: 'emergency',
      color: '#e11d48',
      pulse: true,
    };
  }

  // WARNING condition
  const hasHighBin = (bin1 >= BIN_THRESHOLDS.WARNING_TRIGGER) ||
                     (bin2 >= BIN_THRESHOLDS.WARNING_TRIGGER) ||
                     (bin3 >= BIN_THRESHOLDS.WARNING_TRIGGER);
  const hasElevatedSmoke = typeof smoke === 'number' && smoke >= 300 && smoke < SMOKE_THRESHOLDS.DANGER_MIN;

  if (hasHighBin || hasElevatedSmoke) {
    return {
      state: 'WARNING',
      message: hasHighBin ? 'Bin Capacity Threshold Reached — Collection Action Recommended' : 'Elevated Air Particle Levels',
      severity: 'warning',
      color: '#d97706',
      pulse: false,
    };
  }

  // NORMAL condition
  return {
    state: 'NORMAL',
    message: 'All Environmental & Capacity Sensors Operating Within Nominal Ranges',
    severity: 'safe',
    color: '#16a34a',
    pulse: false,
  };
}

/**
 * Waste collection requirement check.
 */
export function getCollectionAction(fillPercentage) {
  const percent = typeof fillPercentage === 'number' ? fillPercentage : Number.parseFloat(fillPercentage) || 0;

  if (percent >= BIN_THRESHOLDS.COLLECTION_REQUIRED_TRIGGER) {
    return {
      status: 'COLLECTION REQUIRED',
      actionText: 'Dispatch Waste Collector',
      urgent: true,
      color: 'text-rose-600',
      badgeClass: 'bg-rose-50 text-rose-700 border-rose-200',
    };
  }
  if (percent >= BIN_THRESHOLDS.WARNING_TRIGGER) {
    return {
      status: 'PREPARE FOR COLLECTION',
      actionText: 'Queue for Next Routing',
      urgent: false,
      color: 'text-amber-700',
      badgeClass: 'bg-amber-50 text-amber-800 border-amber-200',
    };
  }
  return {
    status: 'NO COLLECTION REQUIRED',
    actionText: 'Continuous Monitoring',
    urgent: false,
    color: 'text-emerald-700',
    badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  };
}

/**
 * Format timestamp safely
 */
export function formatTimestamp(isoString) {
  if (!isoString) return '--:--:--';
  try {
    const d = new Date(isoString);
    if (isNaN(d.getTime())) return '--:--:--';
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  } catch {
    return '--:--:--';
  }
}
