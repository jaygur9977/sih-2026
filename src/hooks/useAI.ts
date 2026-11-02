import { useCallback, useEffect, useState } from 'react';
import { aiService } from '../services/aiService';
import type { FeatureVector, ModelMetrics, Prediction } from '../types/ai';

export function useAI() {
  const [features, setFeatures] = useState<FeatureVector[]>([]);
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [metrics, setMetrics] = useState<ModelMetrics | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const [feat, pred, met] = await Promise.all([
        aiService.getFeatures(),
        aiService.getPredictions(),
        aiService.getModelMetrics(),
      ]);
      setFeatures(feat);
      setPredictions(pred);
      setMetrics(met);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load AI prediction data');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    features,
    predictions,
    metrics,
    loading,
    error,
    refresh: fetchData,
  };
}
