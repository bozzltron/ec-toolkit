/**
 * Configuration validation utilities
 */

import { ModelConfig } from '../types';

export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

/**
 * Validate model configuration
 */
export function validateConfig(config: ModelConfig): ValidationResult {
  const errors: string[] = [];

  // Population validation
  if (!Number.isInteger(config.population) || config.population <= 0) {
    errors.push('population must be a positive integer');
  }

  if (!Number.isInteger(config.keep) || config.keep <= 0) {
    errors.push('keep must be a positive integer');
  }

  if (config.keep > config.population) {
    errors.push('keep cannot exceed population size');
  }

  // Elite size validation
  if (config.eliteSize !== undefined) {
    if (!Number.isInteger(config.eliteSize) || config.eliteSize < 0) {
      errors.push('eliteSize must be a non-negative integer');
    }
    if (config.eliteSize > config.keep) {
      errors.push('eliteSize cannot exceed keep');
    }
  }

  // Crossover validation
  if (!Number.isInteger(config.crossovers) || config.crossovers < 0) {
    errors.push('crossovers must be a non-negative integer');
  }

  if (config.crossoverRate !== undefined) {
    if (typeof config.crossoverRate !== 'number' || 
        config.crossoverRate < 0 || config.crossoverRate > 1) {
      errors.push('crossoverRate must be between 0 and 1');
    }
  }

  // Mutation validation
  if (!Number.isInteger(config.mutations) || config.mutations < 0) {
    errors.push('mutations must be a non-negative integer');
  }

  if (config.mutationRate !== undefined) {
    if (typeof config.mutationRate !== 'number' || 
        config.mutationRate < 0 || config.mutationRate > 1) {
      errors.push('mutationRate must be between 0 and 1');
    }
  }

  // Generations validation
  if (config.generations !== undefined) {
    if (!Number.isInteger(config.generations) || config.generations <= 0) {
      errors.push('generations must be a positive integer');
    }
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

