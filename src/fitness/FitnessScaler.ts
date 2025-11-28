/**
 * Fitness scaling interface
 */

export interface FitnessScaler {
  scale(fitnesses: number[]): number[];
}

