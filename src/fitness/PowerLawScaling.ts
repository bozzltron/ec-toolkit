/**
 * Power law scaling
 * Scales fitness using power law: f' = f^k
 */

import { FitnessScaler } from './FitnessScaler';

export class PowerLawScaling implements FitnessScaler {
  constructor(private exponent: number = 2.0) {
    if (exponent <= 0) {
      throw new Error('Exponent must be positive');
    }
  }

  scale(fitnesses: number[]): number[] {
    if (fitnesses.length === 0) return [];

    // Find minimum to shift all values to non-negative
    const minFitness = Math.min(...fitnesses);
    const shift = minFitness < 0 ? Math.abs(minFitness) + 1 : 0;

    // Apply power law scaling
    return fitnesses.map(f => {
      const shifted = f + shift;
      return Math.pow(shifted, this.exponent);
    });
  }
}

