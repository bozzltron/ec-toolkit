/**
 * EC-Toolkit - Evolutionary Computing Toolkit
 * Main entry point
 */

// Core
export { Model } from './core/Model';
export type { ModelConfig, Individual, EvolutionResult, GenerationStats } from './types';

// Selection strategies
export {
  SelectionStrategy,
  TruncationSelection,
  TournamentSelection,
  RouletteWheelSelection,
  RankBasedSelection
} from './selection';

// Fitness scaling
export {
  FitnessScaler,
  LinearScaling,
  SigmaScaling,
  PowerLawScaling
} from './fitness';

// Data structures
export {
  GeneticString,
  GeneticObject
} from './data-structures';

// Utilities
export * from './utils/util';
export { validateConfig } from './utils/Validator';

