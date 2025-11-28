/**
 * Selection strategy interface
 */

import { Individual } from '../types';

export interface SelectionStrategy {
  select(population: Individual[], count: number): Individual[];
}

