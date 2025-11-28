/**
 * Truncation selection - selects top N individuals
 */

import { Individual } from '../types';
import { SelectionStrategy } from './SelectionStrategy';

export class TruncationSelection implements SelectionStrategy {
  select(population: Individual[], count: number): Individual[] {
    // Population should already be sorted by fitness (descending)
    return population.slice(0, Math.min(count, population.length));
  }
}

