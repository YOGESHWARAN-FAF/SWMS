import axios from 'axios';
import { normalizeBinFill } from '../utils/sensorUtils';
import { THINGSPEAK_CONFIG, FLAME_THRESHOLDS } from '../config/sensorConfig';

const CHANNEL_ID = import.meta.env.VITE_THINGSPEAK_CHANNEL_ID || THINGSPEAK_CONFIG.defaultChannelId;
const READ_API_KEY = import.meta.env.VITE_THINGSPEAK_READ_API_KEY || THINGSPEAK_CONFIG.defaultReadApiKey;
const BASE_URL = 'https://api.thingspeak.com';

/**
 * Safely parse numeric float values with default fallback
 */
function safeFloat(val, defaultVal = 0) {
  if (val === null || val === undefined || val === '') return defaultVal;
  const parsed = Number.parseFloat(val);
  return isNaN(parsed) ? defaultVal : parsed;
}

/**
 * Safely parse binary sensor (0 / 1)
 */
function safeBinary(val) {
  if (val === null || val === undefined || val === '') return false;
  const num = Number.parseFloat(val);
  if (isNaN(num)) return false;
  // 1 = True/Active, 0 = False/Safe. Support >= 1 in case of active high logic
  return num >= 1;
}

/**
 * Safely parse flame sensor (Kit sends analog value; threshold is >= 100 for fire hazard)
 */
function safeFlame(val) {
  if (val === null || val === undefined || val === '') return false;
  const num = Number.parseFloat(val);
  if (isNaN(num)) return false;
  return num >= (FLAME_THRESHOLDS?.TRIGGER_MIN ?? 100);
}

/**
 * Normalize single raw feed entry into structured sensor data object
 */
export function normalizeFeedEntry(entry) {
  if (!entry) {
    return {
      bin1: 0,
      bin2: 0,
      bin3: 0,
      flame: false,
      flameValue: 0,
      smoke: 0,
      metalDetected: false,
      timestamp: new Date().toISOString(),
      entryId: null,
      rawFields: {},
      isHealthy: false,
    };
  }

  const raw1 = entry.field1;
  const raw2 = entry.field2;
  const raw3 = entry.field3;
  const raw4 = entry.field4;
  const raw5 = entry.field5;
  const raw6 = entry.field6;

  // Check if at least one field has data
  const hasData = [raw1, raw2, raw3, raw4, raw5, raw6].some(f => f !== null && f !== undefined && f !== '');

  return {
    bin1: normalizeBinFill(raw1, 'bin1'),
    bin2: normalizeBinFill(raw2, 'bin2'),
    bin3: normalizeBinFill(raw3, 'bin3'),
    flame: safeFlame(raw4),
    flameValue: safeFloat(raw4, 0),
    smoke: safeFloat(raw5, 0),
    metalDetected: safeBinary(raw6),
    timestamp: entry.created_at || new Date().toISOString(),
    entryId: entry.entry_id || null,
    rawFields: {
      field1: raw1,
      field2: raw2,
      field3: raw3,
      field4: raw4,
      field5: raw5,
      field6: raw6,
    },
    isHealthy: hasData,
  };
}

/**
 * Fetch the latest single feed entry from ThingSpeak
 */
export async function getLatestSensorData() {
  try {
    const url = `${BASE_URL}/channels/${CHANNEL_ID}/feeds/last.json`;
    const response = await axios.get(url, {
      params: {
        api_key: READ_API_KEY,
      },
      timeout: 8000,
    });

    if (!response.data || response.data === -1) {
      throw new Error('Empty or invalid response from ThingSpeak API');
    }

    return {
      success: true,
      data: normalizeFeedEntry(response.data),
      raw: response.data,
    };
  } catch (error) {
    console.error('[ThingSpeak Service] Fetch latest failed:', error.message);
    return {
      success: false,
      error: error.message || 'Connection error',
      data: null,
    };
  }
}

/**
 * Fetch historical feeds for analytics & trend graphs
 */
export async function getHistoricalSensorData(results = THINGSPEAK_CONFIG.historyResultCount) {
  try {
    const url = `${BASE_URL}/channels/${CHANNEL_ID}/feeds.json`;
    const response = await axios.get(url, {
      params: {
        api_key: READ_API_KEY,
        results: results,
      },
      timeout: 8000,
    });

    if (!response.data || !Array.isArray(response.data.feeds)) {
      throw new Error('Invalid feed history structure received');
    }

    const normalizedFeeds = response.data.feeds.map(normalizeFeedEntry);

    return {
      success: true,
      channel: response.data.channel || {},
      feeds: normalizedFeeds,
    };
  } catch (error) {
    console.error('[ThingSpeak Service] Fetch history failed:', error.message);
    return {
      success: false,
      error: error.message || 'Failed to fetch history',
      feeds: [],
    };
  }
}
