/**
 * Roulette wheel (fitness-proportionate) selection
 */

import { Individual } from '../types';
import { SelectionStrategy } from './SelectionStrategy';

export class RouletteWheelSelection implements SelectionStrategy {
  select(population: Individual[], count: number): Individual[] {
    if (population.length === 0) return [];
    if (count <= 0) return [];

    // Calculate total fitness
    let totalFitness = 0;
    const fitnesses: number[] = [];

    for (const individual of population) {
      const fitness = Math.max(individual.fitness || 0, 0); // Ensure non-negative
      fitnesses.push(fitness);
      totalFitness += fitness;
    }

    // If all fitnesses are zero or negative, use uniform selection
    if (totalFitness <= 0) {
      const selected: Individual[] = [];
      for (let i = 0; i < count; i++) {
        const index = Math.floor(Math.random() * population.length);
        selected.push(population[index]);
      }
      return selected;
    }

    // Build cumulative fitness array
    const cumulative: number[] = [];
    let cumulativeSum = 0;
    for (const fitness of fitnesses) {
      cumulativeSum += fitness;
      cumulative.push(cumulativeSum);
    }

    // Select individuals
    const selected: Individual[] = [];
    for (let i = 0; i < count; i++) {
      const random = Math.random() * totalFitness;
      
      // Binary search for the selected individual
      let left = 0;
      let right = cumulative.length - 1;
      let selectedIndex = right;

      while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (cumulative[mid] >= random) {
          selectedIndex = mid;
          right = mid - 1;
        } else {
          left = mid + 1;
        }
      }

      selected.push(population[selectedIndex]);
    }

    return selected;
  }
}

