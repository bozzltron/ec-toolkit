/**
 * Linear fitness scaling
 * Scales fitness linearly: f' = a * f + b
 */

import { FitnessScaler } from './FitnessScaler';
import { mean } from '../utils/util';

export class LinearScaling implements FitnessScaler {
  constructor(
    private multiplier: number = 2.0,
    private offset: number = 0.0
  ) {}

  scale(fitnesses: number[]): number[] {
    if (fitnesses.length === 0) return [];

    const avgFitness = mean(fitnesses);
    const minFitness = Math.min(...fitnesses);
    const maxFitness = Math.max(...fitnesses);

    // If all fitnesses are the same, return uniform values
    if (minFitness === maxFitness) {
      return fitnesses.map(() => 1.0);
    }

    // Calculate scaling factors
    // f' = multiplier * (f - avg) + offset
    return fitnesses.map(f => {
      const scaled = this.multiplier * (f - avgFitness) + this.offset;
      return Math.max(0, scaled); // Ensure non-negative
    });
  }
}

