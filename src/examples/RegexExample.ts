/**
 * Example: Evolving a regex pattern
 * Evolves a regex pattern that matches "42" in the string "I turned 42 today"
 */

import { Model } from '../core/Model';
import { GeneticString } from '../data-structures/GeneticString';
import { Individual } from '../types';
import { TournamentSelection } from '../selection';
import { SigmaScaling } from '../fitness';

export class RegexModel extends Model {
  private testString: string = "I turned 42 today";

  constructor(config?: Partial<Record<string, unknown>>) {
    super({
      values: Array.from('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ.*+?^$|()[]{}'),
      population: 20,
      keep: 10,
      crossovers: 10,
      mutations: 5,
      log: true,
      initialSize: 2,
      generations: 100,
      selectionStrategy: new TournamentSelection(3),
      fitnessScaler: new SigmaScaling(),
      eliteSize: 1,
      ...config
    });
  }

  initializeEach(): Individual {
    const agent = new GeneticString();
    agent.generate(this.config.values || [], this.config.initialSize || 2);
    return agent;
  }

  terminate(agent: Individual): boolean {
    return (agent as any).matches && (agent as any).matches[0] === '42';
  }

  rankEach(agent: Individual): void {
    const geneticString = agent as GeneticString;
    agent.rawFitness = 0;

    // Evaluate the candidate regex
    try {
      (agent as any).result = new RegExp(geneticString.code, 'g');
      agent.rawFitness += 1; // Valid regex

      (agent as any).matches = this.testString.match((agent as any).result);
      agent.rawFitness += 1; // Executed without exception
    } catch (e) {
      (agent as any).result = null;
      (agent as any).matches = null;
    }

    // Reward finding numbers
    try {
      const test1 = "I turned 1 today".match((agent as any).result);
      if (test1 && test1[0] === '1') {
        agent.rawFitness += 1;
      }
    } catch (e) {
      // Ignore
    }

    // Reward shorter patterns (prevent bloat)
    if (geneticString.code.length < 20) {
      agent.rawFitness += 1;
    }

    // Reward finding matches
    if ((agent as any).matches && (agent as any).matches.length > 0) {
      agent.rawFitness += 1;
    }

    // Reward matching numbers
    if ((agent as any).matches && !isNaN(Number((agent as any).matches[0]))) {
      agent.rawFitness += 1;
    }

    // Set fitness (will be scaled if scaler is configured)
    agent.fitness = agent.rawFitness;
  }

  protected getLogData(agent: Individual): Record<string, any> {
    return {
      code: (agent as GeneticString).code.substring(0, 50),
      length: (agent as GeneticString).code.length,
      result: (agent as any).result?.toString() || 'null',
      matches: (agent as any).matches?.[0] || 'none'
    };
  }
}



