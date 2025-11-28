# EC-Toolkit v2.0

A modern, TypeScript-based Evolutionary Computing Toolkit for JavaScript/TypeScript.

## Features

- ✅ **TypeScript** - Full type safety and modern tooling
- ✅ **Multiple Selection Methods** - Tournament, Roulette Wheel, Rank-based, Truncation
- ✅ **Fitness Scaling** - Linear, Sigma, Power Law scaling to prevent premature convergence
- ✅ **Explicit Elitism** - Preserve best solutions across generations
- ✅ **Extensible Architecture** - Easy to add custom operators and strategies
- ✅ **Validation & Error Handling** - Robust configuration validation
- ✅ **Modern API** - Clean, intuitive interface

## Installation

```bash
npm install ec-toolkit
```

## Quick Start

```typescript
import { Model, GeneticString, TournamentSelection, SigmaScaling } from 'ec-toolkit';

class MyModel extends Model {
  initializeEach() {
    const agent = new GeneticString();
    agent.generate(['0', '1'], 10);
    return agent;
  }

  rankEach(agent) {
    // Calculate fitness
    agent.fitness = agent.code.split('1').length - 1; // Count 1s
  }

  terminate(agent) {
    return agent.fitness === 10; // Stop when all 1s
  }
}

const model = new MyModel({
  population: 50,
  keep: 30,
  crossovers: 30,
  mutations: 5,
  generations: 100,
  selectionStrategy: new TournamentSelection(3),
  fitnessScaler: new SigmaScaling(),
  eliteSize: 2
});

const result = await model.run();
console.log('Best solution:', result.best);
```

## Selection Strategies

### Tournament Selection
```typescript
import { TournamentSelection } from 'ec-toolkit';

const selection = new TournamentSelection(3); // Tournament size
```

### Roulette Wheel Selection
```typescript
import { RouletteWheelSelection } from 'ec-toolkit';

const selection = new RouletteWheelSelection();
```

### Rank-Based Selection
```typescript
import { RankBasedSelection } from 'ec-toolkit';

const selection = new RankBasedSelection(2.0); // Selection pressure
```

### Truncation Selection
```typescript
import { TruncationSelection } from 'ec-toolkit';

const selection = new TruncationSelection(); // Selects top N
```

## Fitness Scaling

### Sigma Scaling
```typescript
import { SigmaScaling } from 'ec-toolkit';

const scaler = new SigmaScaling();
```

### Linear Scaling
```typescript
import { LinearScaling } from 'ec-toolkit';

const scaler = new LinearScaling(2.0, 0.0); // multiplier, offset
```

### Power Law Scaling
```typescript
import { PowerLawScaling } from 'ec-toolkit';

const scaler = new PowerLawScaling(2.0); // exponent
```

## Examples

See `src/examples/` for complete examples:
- **EquationExample** - Evolves math equations
- **RegexExample** - Evolves regex patterns

## API Reference

### Model Class

The `Model` class is the base class for all evolutionary models.

#### Methods to Override

- `initializeEach(): Individual` - Create a new individual
- `rankEach(agent: Individual): void` - Calculate fitness
- `terminate(agent: Individual): boolean` - Check termination condition (optional)

#### Configuration

```typescript
interface ModelConfig {
  population: number;           // Population size
  keep: number;                 // Individuals to keep for reproduction
  eliteSize?: number;           // Elite individuals to preserve (default: 0)
  crossovers: number;           // Number of crossovers per generation
  mutations: number;           // Number of mutations per generation
  generations?: number;         // Max generations (default: Infinity)
  crossoverRate?: number;       // Crossover probability 0-1 (default: 1.0)
  mutationRate?: number;        // Mutation probability 0-1 (auto-calculated)
  selectionStrategy?: SelectionStrategy; // Selection method
  fitnessScaler?: FitnessScaler; // Fitness scaling strategy
  log?: boolean;                // Enable logging (default: true)
  logInterval?: number;         // Log every N generations (default: 1)
  onGeneration?: (gen: number, best: Individual, stats: GenerationStats) => void;
  onComplete?: (result: EvolutionResult) => void;
}
```

## Data Structures

### GeneticString
String-based individual representation with mutation and crossover.

```typescript
import { GeneticString } from 'ec-toolkit';

const agent = new GeneticString();
agent.generate(['A', 'B', 'C'], 10); // Generate random string
agent.mutate(1, ['A', 'B', 'C']);    // Mutate
const child = agent.crossoverWith(otherAgent); // Crossover
```

### GeneticObject
Object-based individual representation.

```typescript
import { GeneticObject } from 'ec-toolkit';

const agent = new GeneticObject({ x: 1, y: 2 });
const child = agent.crossoverWith(otherAgent);
```

## Migration from v1.0

The API has changed significantly. Key differences:

1. **TypeScript** - Now requires TypeScript (or use compiled JS)
2. **Selection Strategy** - Must specify selection method explicitly
3. **Fitness Scaling** - Optional but recommended
4. **Elitism** - Now explicit via `eliteSize` config
5. **Async Support** - `rankEach` can be async

See `MIGRATION.md` for detailed migration guide.

## Performance Tips

1. **Use Tournament Selection** - Often faster convergence than truncation
2. **Enable Fitness Scaling** - Prevents premature convergence
3. **Set Elite Size** - Preserve 5-10% of best individuals
4. **Adjust Mutation Rate** - Start with 1/population, adjust based on results
5. **Use Logging Callbacks** - More efficient than console.table for large populations

## Contributing

Contributions welcome! Please see `CONTRIBUTING.md` for guidelines.

## License

ISC

## Changelog

### v2.0.0
- Complete TypeScript rewrite
- Multiple selection methods
- Fitness scaling strategies
- Explicit elitism
- Improved error handling
- Configuration validation
- Modern build system

### v1.0.0
- Initial release
- Basic genetic algorithm
- String and object representations
