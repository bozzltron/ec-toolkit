/**
 * Core Model class for evolutionary algorithms
 */

import {
  Individual,
  ModelConfig,
  GenerationStats,
  EvolutionResult,
  SelectionStrategy
} from '../types';
import { TruncationSelection } from '../selection';
import { FitnessScaler } from '../fitness';
import { validateConfig } from '../utils/Validator';
import { mean, standardDeviation, getRandomNumberBetween } from '../utils/util';

export abstract class Model {
  protected config: ModelConfig;
  protected evolving: boolean = false;
  protected count: number = 0;
  protected selectionStrategy: SelectionStrategy;
  protected fitnessScaler?: FitnessScaler;
  protected stats: GenerationStats[] = [];

  constructor(config: ModelConfig) {
    // Validate configuration
    const validation = validateConfig(config);
    if (!validation.valid) {
      throw new Error(`Invalid configuration: ${validation.errors.join(', ')}`);
    }

    // Set defaults
    this.config = {
      generations: Infinity,
      log: true,
      logInterval: 1,
      crossoverRate: 1.0,
      eliteSize: 0,
      ...config
    };

    // Set selection strategy
    this.selectionStrategy = config.selectionStrategy || new TruncationSelection();

    // Set fitness scaler if provided
    this.fitnessScaler = config.fitnessScaler;

    // Calculate mutation rate if not provided
    if (this.config.mutationRate === undefined) {
      this.config.mutationRate = this.config.mutations / this.config.population;
    }
  }

  /**
   * Initialize a single individual
   * Must be implemented by subclasses
   */
  abstract initializeEach(): Individual;

  /**
   * Calculate fitness for an individual
   * Must be implemented by subclasses
   */
  abstract rankEach(agent: Individual): void | Promise<void>;

  /**
   * Check if evolution should terminate
   * Override for custom termination conditions
   */
  terminate(_agent: Individual): boolean {
    return false;
  }

  /**
   * Run the evolutionary algorithm
   */
  async run(): Promise<EvolutionResult> {
    this.evolving = true;
    this.count = 0;
    this.stats = [];

    // Initialize population
    const agents: Individual[] = [];
    for (let i = 0; i < this.config.population; i++) {
      agents.push(this.initializeEach());
    }

    if (this.config.log) {
      console.log(`Initialized ${this.config.population} agents...`);
      console.log(`Limit to ${this.config.generations} generations...`);
    }

    try {
      while (this.evolving && this.count < (this.config.generations || Infinity)) {
        // Evaluate fitness for all agents
        for (let i = 0; i < agents.length; i++) {
          const agent = agents[i];
          const rankResult = this.rankEach(agent);
          if (rankResult instanceof Promise) {
            await rankResult;
          }

          // Store raw fitness before scaling
          if (agent.rawFitness === undefined) {
            agent.rawFitness = agent.fitness || agent.rank || 0;
          }

          // Check termination condition
          if (this.terminate(agent)) {
            this.evolving = false;
            const bestAgent = { ...agent };
            const result: EvolutionResult = {
              best: bestAgent,
              generation: this.count,
              population: agents,
              stats: this.stats,
              terminatedEarly: true
            };

            if (this.config.onComplete) {
              this.config.onComplete(result);
            }

            return result;
          }
        }

        // Scale fitness if scaler is provided
        if (this.fitnessScaler) {
          const rawFitnesses = agents.map(a => a.rawFitness || a.fitness || 0);
          const scaledFitnesses = this.fitnessScaler.scale(rawFitnesses);
          agents.forEach((agent, i) => {
            agent.fitness = scaledFitnesses[i];
          });
        } else {
          // Use raw fitness if no scaler
          agents.forEach(agent => {
            if (agent.fitness === undefined) {
              agent.fitness = agent.rawFitness || agent.rank || 0;
            }
          });
        }

        // Sort by fitness (descending)
        agents.sort((a, b) => (b.fitness || 0) - (a.fitness || 0));

        // Calculate and record statistics
        const stats = this.calculateStats(agents, this.count);
        this.stats.push(stats);

        // Log if enabled
        if (this.config.log && this.count % (this.config.logInterval || 1) === 0) {
          this.log(agents, stats);
        }

        // Callback for generation
        if (this.config.onGeneration) {
          this.config.onGeneration(this.count, agents[0], stats);
        }

        // Select parents
        const parents = this.select(agents);

        // Create offspring through crossover
        const offspring = this.crossover(parents);

        // Apply mutations
        const mutated = this.mutate(offspring);

        // Combine elite and offspring
        const currentPopulation = [...agents]; // Save current population for elite selection
        agents.length = 0;
        agents.push(...this.combineEliteAndOffspring(currentPopulation, mutated));

        this.count++;
      }

      // Evolution completed
      agents.sort((a, b) => (b.fitness || 0) - (a.fitness || 0));

      const result: EvolutionResult = {
        best: { ...agents[0] },
        generation: this.count - 1,
        population: agents,
        stats: this.stats,
        terminatedEarly: false
      };

      if (this.config.onComplete) {
        this.config.onComplete(result);
      }

      return result;
    } catch (error) {
      this.evolving = false;
      throw error;
    }
  }

  /**
   * Select parents from population
   */
  protected select(agents: Individual[]): Individual[] {
    return this.selectionStrategy.select(agents, this.config.keep);
  }

  /**
   * Combine elite individuals with offspring
   */
  protected combineEliteAndOffspring(
    currentPopulation: Individual[],
    offspring: Individual[]
  ): Individual[] {
    const eliteSize = this.config.eliteSize || 0;
    const elite: Individual[] = [];

    // Preserve elite from current population
    if (eliteSize > 0 && currentPopulation.length > 0) {
      // Sort current population by fitness
      const sorted = [...currentPopulation].sort(
        (a, b) => (b.fitness || 0) - (a.fitness || 0)
      );
      elite.push(...sorted.slice(0, eliteSize));
    }

    // Combine elite and offspring
    const combined = [...elite, ...offspring];

    // Trim to population size if needed
    return combined.slice(0, this.config.population);
  }

  /**
   * Perform crossover to create offspring
   */
  protected crossover(parents: Individual[]): Individual[] {
    const offspring: Individual[] = [];
    const crossoverRate = this.config.crossoverRate || 1.0;

    for (let i = 0; i < this.config.crossovers; i++) {
      // Select two different parents
      const momIndex = getRandomNumberBetween(0, parents.length - 1);
      let dadIndex = getRandomNumberBetween(0, parents.length - 1);
      while (dadIndex === momIndex && parents.length > 1) {
        dadIndex = getRandomNumberBetween(0, parents.length - 1);
      }

      const mom = parents[momIndex];
      const dad = parents[dadIndex];

      // Perform crossover if probability allows
      if (Math.random() < crossoverRate && (mom as any).crossoverWith) {
        const child = (mom as any).crossoverWith(dad);
        offspring.push(child);
      } else {
        // No crossover, use parent
        offspring.push({ ...mom });
      }
    }

    return offspring;
  }

  /**
   * Apply mutations to offspring
   */
  protected mutate(offspring: Individual[]): Individual[] {
    const mutationRate = this.config.mutationRate || 0;

    return offspring.map(individual => {
      if (Math.random() < mutationRate && typeof (individual as any).mutate === 'function') {
        // Clone if clone method exists, otherwise mutate in place
        const mutated = (individual as any).clone ? 
          (individual as any).clone() : 
          individual;
        
        // Apply mutation (mutate in place)
        (mutated as any).mutate(
          1, // Mutate 1 character/unit per individual
          this.config.values || []
        );
        return mutated;
      }
      return individual;
    });
  }

  /**
   * Calculate generation statistics
   */
  protected calculateStats(agents: Individual[], generation: number): GenerationStats {
    const fitnesses = agents.map(a => a.fitness || 0);
    const bestFitness = Math.max(...fitnesses);
    const worstFitness = Math.min(...fitnesses);
    const avgFitness = mean(fitnesses);
    const stdDevFitness = standardDeviation(fitnesses);

    return {
      generation,
      bestFitness,
      worstFitness,
      avgFitness,
      stdDevFitness
    };
  }

  /**
   * Log population state
   */
  protected log(agents: Individual[], stats: GenerationStats): void {
    if (!this.config.log) return;

    console.log(`\nGeneration ${stats.generation}:`);
    console.log(`  Best Fitness: ${stats.bestFitness.toFixed(4)}`);
    console.log(`  Avg Fitness: ${stats.avgFitness.toFixed(4)}`);
    console.log(`  Std Dev: ${stats.stdDevFitness.toFixed(4)}`);

    // Show top individuals
    const topN = Math.min(5, agents.length);
    const table = agents.slice(0, topN).map((individual, index) => ({
      rank: index + 1,
      fitness: (individual.fitness || 0).toFixed(4),
      rawFitness: (individual.rawFitness || individual.fitness || 0).toFixed(4),
      ...this.getLogData(individual)
    }));

    if (table.length > 0) {
      console.table(table);
    }
  }

  /**
   * Get additional data to log for an individual
   * Override in subclasses to add custom fields
   */
  protected getLogData(_agent: Individual): Record<string, any> {
    return {};
  }
}

