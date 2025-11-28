/**
 * Example: Evolving a simple math equation
 * Evolves an equation from character set to produce the value 42
 */

import { Model } from '../core/Model';
import { GeneticString } from '../data-structures/GeneticString';
import { Individual } from '../types';
import { TournamentSelection } from '../selection';
import { SigmaScaling } from '../fitness';

export class EquationModel extends Model {
  constructor(config?: Partial<Record<string, unknown>>) {
    super({
      population: 80,
      keep: 70,
      crossovers: 80,
      mutations: 1,
      initialSize: 5,
      values: Array.from('+-/*0123456789'),
      generations: 100,
      selectionStrategy: new TournamentSelection(3),
      fitnessScaler: new SigmaScaling(),
      eliteSize: 2,
      ...config
    });
  }

  initializeEach(): Individual {
    const agent = new GeneticString();
    agent.generate(this.config.values || [], this.config.initialSize || 5);
    return agent;
  }

  terminate(agent: Individual): boolean {
    return !isNaN((agent as any).result) && (agent as any).result === 42;
  }

  rankEach(agent: Individual): void {
    const geneticString = agent as GeneticString;
    agent.rawFitness = 0;

    // Evaluate the candidate code
    try {
      // WARNING: Using eval is dangerous! In production, use a sandboxed evaluator
      (agent as any).result = eval(geneticString.code);
    } catch (e) {
      (agent as any).result = NaN;
    }

    // Reward code that contains numbers
    if (/[0-9]/.test(geneticString.code)) {
      agent.rawFitness += 1;
    }

    // Reward code that contains math operators
    if (/[-+*/]/.test(geneticString.code)) {
      agent.rawFitness += 1;
    }

    // Reward shorter code (prevent bloat)
    if (geneticString.code.length < 20) {
      agent.rawFitness += 1;
    }

    // Reward code that evaluates to a number
    if (typeof (agent as any).result === 'number') {
      agent.rawFitness += 1;
    }

    // Reward proximity to target value (42)
    if (typeof (agent as any).result === 'number') {
      const proximity = Math.round((1 / Math.abs(42 - (agent as any).result)) * 100);
      agent.rawFitness += !isNaN(proximity) ? proximity : 0;
    }

    // Set fitness (will be scaled if scaler is configured)
    agent.fitness = agent.rawFitness;
  }

  protected getLogData(agent: Individual): Record<string, any> {
    return {
      code: (agent as GeneticString).code.substring(0, 40),
      length: (agent as GeneticString).code.length,
      result: (agent as any).result
    };
  }
}

