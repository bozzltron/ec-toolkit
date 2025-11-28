/**
 * Core types and interfaces for EC-Toolkit
 */

/**
 * Represents an individual in the population
 */
export interface Individual {
  /** Unique identifier */
  id?: string;
  /** Raw fitness value (before scaling) */
  rawFitness?: number;
  /** Scaled fitness value (after scaling) */
  fitness: number;
  /** Rank in population (legacy, use fitness) */
  rank?: number;
  /** Additional metadata */
  [key: string]: any;
}

/**
 * Configuration for the evolutionary model
 */
export interface ModelConfig {
  /** Population size */
  population: number;
  /** Number of individuals to keep for reproduction */
  keep: number;
  /** Number of elite individuals to preserve (default: 0) */
  eliteSize?: number;
  /** Number of crossovers per generation */
  crossovers: number;
  /** Number of mutations per generation */
  mutations: number;
  /** Maximum number of generations (default: Infinity) */
  generations?: number;
  /** Crossover probability (0-1, default: 1.0) */
  crossoverRate?: number;
  /** Mutation probability (0-1, default: calculated from mutations) */
  mutationRate?: number;
  /** Enable logging (default: true) */
  log?: boolean;
  /** Log every N generations (default: 1) */
  logInterval?: number;
  /** Character set for string-based individuals */
  values?: string[];
  /** Initial size for generated individuals */
  initialSize?: number;
  /** Selection strategy */
  selectionStrategy?: SelectionStrategy;
  /** Fitness scaling strategy */
  fitnessScaler?: FitnessScaler;
  /** Callback after each generation */
  onGeneration?: (generation: number, best: Individual, stats: GenerationStats) => void;
  /** Callback when evolution completes */
  onComplete?: (result: EvolutionResult) => void;
}

/**
 * Statistics for a generation
 */
export interface GenerationStats {
  generation: number;
  bestFitness: number;
  worstFitness: number;
  avgFitness: number;
  stdDevFitness: number;
  diversity?: number;
}

/**
 * Result of evolution
 */
export interface EvolutionResult {
  /** Best individual found */
  best: Individual;
  /** Generation when solution was found */
  generation: number;
  /** Final population */
  population: Individual[];
  /** Evolution statistics */
  stats: GenerationStats[];
  /** Whether evolution terminated early */
  terminatedEarly: boolean;
}

/**
 * Selection strategy interface
 */
export interface SelectionStrategy {
  select(population: Individual[], count: number): Individual[];
}

/**
 * Fitness scaling strategy interface
 */
export interface FitnessScaler {
  scale(fitnesses: number[]): number[];
}

/**
 * Crossover operator interface
 */
export interface CrossoverOperator<T extends Individual> {
  crossover(parent1: T, parent2: T): T[];
  probability: number;
}

/**
 * Mutation operator interface
 */
export interface MutationOperator<T extends Individual> {
  mutate(individual: T, mutationRate: number): T;
}

