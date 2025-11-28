/**
 * Tournament selection - selects individuals through tournaments
 */

import { Individual } from '../types';
import { SelectionStrategy } from './SelectionStrategy';
import { getRandomNumberBetween } from '../utils/util';

export class TournamentSelection implements SelectionStrategy {
  constructor(private tournamentSize: number = 3) {
    if (tournamentSize < 2) {
      throw new Error('Tournament size must be at least 2');
    }
  }

  select(population: Individual[], count: number): Individual[] {
    if (population.length === 0) return [];
    if (count <= 0) return [];

    const selected: Individual[] = [];
    const populationCopy = [...population]; // Work with copy to avoid modifying original

    // Ensure population is sorted by fitness (descending)
    populationCopy.sort((a, b) => (b.fitness || 0) - (a.fitness || 0));

    for (let i = 0; i < count; i++) {
      // Select random individuals for tournament
      const tournament: Individual[] = [];
      const indices = new Set<number>();

      while (indices.size < Math.min(this.tournamentSize, populationCopy.length)) {
        const index = getRandomNumberBetween(0, populationCopy.length - 1);
        indices.add(index);
      }

      indices.forEach(idx => tournament.push(populationCopy[idx]));

      // Winner is the one with highest fitness
      tournament.sort((a, b) => (b.fitness || 0) - (a.fitness || 0));
      selected.push(tournament[0]);
    }

    return selected;
  }
}

