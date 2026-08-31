import { useState, useEffect, useRef, useCallback } from 'react';
import { getLatestSensorData, getHistoricalSensorData } from '../services/thingspeak';
import { getSystemStatus } from '../utils/sensorUtils';
import { generateAlertsFromTransition } from '../utils/alertUtils';
import { THINGSPEAK_CONFIG } from '../config/sensorConfig';

export function useThingSpeak() {
  const [sensorData, setSensorData] = useState(null);
  const [historyData, setHistoryData] = useState([]);
  const [channelMeta, setChannelMeta] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState('CONNECTING'); // 'LIVE' | 'CONNECTING' | 'OFFLINE' | 'ERROR'
  const [lastUpdated, setLastUpdated] = useState(null);
  const [alerts, setAlerts] = useState([]);

  const prevSensorDataRef = useRef(null);
  const isMountedRef = useRef(true);

  // Core Data Fetcher
  const fetchData = useCallback(async (isManual = false) => {
    if (isManual) {
      setIsRefreshing(true);
    }

    try {
      // 1. Fetch latest sensor record
      const latestResult = await getLatestSensorData();

      if (!isMountedRef.current) return;

      if (latestResult.success && latestResult.data) {
        const currentData = latestResult.data;

        // Generate non-duplicative state transition alerts
        const newAlerts = generateAlertsFromTransition(prevSensorDataRef.current, currentData);
        if (newAlerts.length > 0) {
          setAlerts(prev => [...newAlerts, ...prev].slice(0, 50));
        }

        prevSensorDataRef.current = currentData;
        setSensorData(currentData);
        setLastUpdated(new Date());
        setConnectionStatus('LIVE');
        setError(null);
      } else {
        setConnectionStatus('OFFLINE');
        setError(latestResult.error || 'Unable to reach ThingSpeak feed');
      }

      // 2. Fetch history records for charts
      const historyResult = await getHistoricalSensorData(THINGSPEAK_CONFIG.historyResultCount);
      if (isMountedRef.current && historyResult.success) {
        setHistoryData(historyResult.feeds);
        if (historyResult.channel) {
          setChannelMeta(historyResult.channel);
        }
      }
    } catch (err) {
      if (isMountedRef.current) {
        console.error('[useThingSpeak] Polling error:', err);
        setConnectionStatus('ERROR');
        setError(err.message || 'Network Communication Error');
      }
    } finally {
      if (isMountedRef.current) {
        setLoading(false);
        setIsRefreshing(false);
      }
    }
  }, []);

  // Polling loop with proper cleanup
  useEffect(() => {
    isMountedRef.current = true;

    // Initial fetch immediately
    fetchData();

    // Set polling interval (10s)
    const intervalId = setInterval(() => {
      fetchData();
    }, THINGSPEAK_CONFIG.pollingIntervalMs);

    return () => {
      isMountedRef.current = false;
      clearInterval(intervalId);
    };
  }, [fetchData]);

  // Derived global system status
  const systemStatus = getSystemStatus(sensorData);

  const clearAlerts = useCallback(() => {
    setAlerts([]);
  }, []);

  return {
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
    refetch: () => fetchData(true),
  };
}
