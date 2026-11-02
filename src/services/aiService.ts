import { apiClient } from '../api/client';
import { API_ENDPOINTS } from '../api/endpoints';
import { mockFeatureVectors, mockModelMetrics, mockPredictions } from '../mocks/aiData';
import type { FeatureVector, ModelMetrics, Prediction } from '../types/ai';

export const aiService = {
  async getFeatures(): Promise<FeatureVector[]> {
    return apiClient.get<FeatureVector[]>(API_ENDPOINTS.AI.FEATURES, async () => {
      return [...mockFeatureVectors];
    });
  },

  async getPredictions(): Promise<Prediction[]> {
    return apiClient.get<Prediction[]>(API_ENDPOINTS.AI.PREDICTIONS, async () => {
      return [...mockPredictions];
    });
  },

  async getModelMetrics(): Promise<ModelMetrics> {
    return apiClient.get<ModelMetrics>(API_ENDPOINTS.AI.METRICS, async () => {
      return { ...mockModelMetrics };
    });
  },
};
