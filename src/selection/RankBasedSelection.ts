/**
 * Rank-based selection - selection probability based on rank, not fitness
 */

import { Individual } from '../types';
import { SelectionStrategy } from './SelectionStrategy';

export class RankBasedSelection implements SelectionStrategy {
  constructor(private selectionPressure: number = 2.0) {
    // selectionPressure: 1.0 = uniform, 2.0 = linear, >2.0 = exponential
    if (selectionPressure < 1.0) {
      throw new Error('Selection pressure must be >= 1.0');
    }
  }

  select(population: Individual[], count: number): Individual[] {
    if (population.length === 0) return [];
    if (count <= 0) return [];

    // Sort by fitness (descending)
    const sorted = [...population].sort(
      (a, b) => (b.fitness || 0) - (a.fitness || 0)
    );

    // Calculate rank probabilities
    const n = sorted.length;
    const probabilities: number[] = [];
    let totalProbability = 0;

    for (let rank = 0; rank < n; rank++) {
      // Rank 0 is best, rank n-1 is worst
      // Probability proportional to (n - rank)^selectionPressure
      const prob = Math.pow(n - rank, this.selectionPressure);
      probabilities.push(prob);
      totalProbability += prob;
    }

    // Normalize probabilities
    for (let i = 0; i < probabilities.length; i++) {
      probabilities[i] /= totalProbability;
    }

    // Build cumulative distribution
    const cumulative: number[] = [];
    let cumulativeSum = 0;
    for (const prob of probabilities) {
      cumulativeSum += prob;
      cumulative.push(cumulativeSum);
    }

    // Select individuals
    const selected: Individual[] = [];
    for (let i = 0; i < count; i++) {
      const random = Math.random();
      
      // Find selected index
      let selectedIndex = sorted.length - 1;
      for (let j = 0; j < cumulative.length; j++) {
        if (cumulative[j] >= random) {
          selectedIndex = j;
          break;
        }
      }

      selected.push(sorted[selectedIndex]);
    }

    return selected;
  }
}

