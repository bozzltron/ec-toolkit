/**
 * Sigma scaling (standard deviation scaling)
 * Scales fitness based on standard deviation: f' = max(0, 1 + (f - mean) / (2 * stdDev))
 */

import { FitnessScaler } from './FitnessScaler';
import { mean, standardDeviation } from '../utils/util';

export class SigmaScaling implements FitnessScaler {
  scale(fitnesses: number[]): number[] {
    if (fitnesses.length === 0) return [];

    const avgFitness = mean(fitnesses);
    const stdDev = standardDeviation(fitnesses);

    // If standard deviation is zero, return uniform values
    if (stdDev === 0) {
      return fitnesses.map(() => 1.0);
    }

    // Sigma scaling formula: f' = max(0, 1 + (f - mean) / (2 * stdDev))
    return fitnesses.map(f => {
      const scaled = 1 + (f - avgFitness) / (2 * stdDev);
      return Math.max(0, scaled); // Ensure non-negative
    });
  }
}

