/**
 * Smart Waste Segregation Digital Twin - Sensor Configuration (White & Green Theme)
 */

// Ultrasonic Sensor Mode: 'DIRECT_PERCENTAGE' or 'RAW_DISTANCE'
export const SENSOR_MODE = 'DIRECT_PERCENTAGE';

// Bin specific configurations and distance calibration (for RAW_DISTANCE mode)
export const BIN_CONFIG = {
  bin1: {
    id: 'bin1',
    number: '01',
    name: 'BIN 01',
    category: 'PET / PLASTIC',
    shortCategory: 'Plastic',
    field: 'field1',
    emptyDistance: 40, // in cm
    fullDistance: 5,   // in cm
    accentColor: '#0284c7', // Sky / Cyan
    badgeColor: 'bg-sky-50 text-sky-700 border-sky-200',
    fillGradient: 'from-sky-500 via-blue-500 to-indigo-600',
    glassBg: 'bg-sky-500/10',
  },
  bin2: {
    id: 'bin2',
    number: '02',
    name: 'BIN 02',
    category: 'DRY / RECYCLABLE',
    shortCategory: 'Recyclable',
    field: 'field2',
    emptyDistance: 40,
    fullDistance: 5,
    accentColor: '#d97706', // Amber
    badgeColor: 'bg-amber-50 text-amber-800 border-amber-200',
    fillGradient: 'from-amber-400 via-orange-400 to-amber-500',
    glassBg: 'bg-amber-500/10',
  },
  bin3: {
    id: 'bin3',
    number: '03',
    name: 'BIN 03',
    category: 'ORGANIC / GENERAL',
    shortCategory: 'Organic',
    field: 'field3',
    emptyDistance: 40,
    fullDistance: 5,
    accentColor: '#16a34a', // Emerald Green
    badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    fillGradient: 'from-emerald-400 via-green-500 to-teal-600',
    glassBg: 'bg-emerald-500/10',
  },
};

// Flame Sensor Thresholds (Digital/Binary reading: 1 = Flame Alert, 0 = Safe/Normal)
export const FLAME_THRESHOLDS = {
  TRIGGER_VALUE: 1,
};

// Gas & Smoke Sensor Thresholds (MQ-2 Sensor in %: Alarm at >= 10%)
export const SMOKE_THRESHOLDS = {
  SAFE_MAX: 6,      // 0-6%: Normal clean baseline
  MODERATE_MAX: 8,  // 7-8%: Moderate level
  HIGH_MAX: 9,      // 9%: High warning
  DANGER_MIN: 10,   // >= 10%: Critical Smoke / Gas Alarm Trigger
};

// Bin Fill Level Thresholds (%)
export const BIN_THRESHOLDS = {
  NORMAL_MAX: 49,
  GETTING_FULL_MAX: 79,
  ALMOST_FULL_MAX: 94,
  FULL_MIN: 95,
  WARNING_TRIGGER: 80,
  COLLECTION_REQUIRED_TRIGGER: 95,
};

// ThingSpeak Polling Configuration
export const THINGSPEAK_CONFIG = {
  defaultChannelId: '3470506',
  defaultReadApiKey: 'W2K6VI4WUKVWX3N3',
  pollingIntervalMs: 10000, // 10 seconds
  historyResultCount: 40,
};

// Physical Sensor Field Mapping definition
export const SENSOR_FIELD_MAPPING = {
  field1: { name: 'Ultrasonic Sensor 1', target: 'Bin 1 Fill Level', unit: '%' },
  field2: { name: 'Ultrasonic Sensor 2', target: 'Bin 2 Fill Level', unit: '%' },
  field3: { name: 'Ultrasonic Sensor 3', target: 'Bin 3 Fill Level', unit: '%' },
  field4: { name: 'Flame Sensor', target: 'Fire Detection', unit: 'Digital (0=Safe, 1=Alarm)' },
  field5: { name: 'Gas / Smoke Sensor', target: 'Air Quality / Gas', unit: '% (Alarm: ≥10%)' },
  field6: { name: 'Inductive Proximity Sensor', target: 'Metal Detection', unit: 'Binary (0/1)' },
};
