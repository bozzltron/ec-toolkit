# Migration Guide: v1.0 → v2.0

This guide helps you migrate from EC-Toolkit v1.0 to v2.0.

## Breaking Changes

### 1. TypeScript Required

v2.0 is written in TypeScript. You can:
- Use TypeScript directly
- Use compiled JavaScript from `dist/`
- Use type definitions for IntelliSense

### 2. Import Changes

**v1.0:**
```javascript
const Model = require('./model');
const GeneticString = require('./data-structures/genetic-string');
```

**v2.0:**
```typescript
import { Model, GeneticString } from 'ec-toolkit';
// or
const { Model, GeneticString } = require('ec-toolkit');
```

### 3. Model Configuration

**v1.0:**
```javascript
class MyModel extends Model {
  constructor() {
    this.config = {
      population: 100,
      keep: 50,
      crossovers: 100,
      mutations: 1,
      values: ['0', '1']
    };
  }
}
```

**v2.0:**
```typescript
class MyModel extends Model {
  constructor(config?: Partial<ModelConfig>) {
    super({
      population: 100,
      keep: 50,
      crossovers: 100,
      mutations: 1,
      values: ['0', '1'],
      ...config
    });
  }
}
```

### 4. Selection Strategy

**v1.0:**
- Only truncation selection (implicit)

**v2.0:**
- Must specify selection strategy explicitly
```typescript
import { TournamentSelection } from 'ec-toolkit';

super({
  // ... other config
  selectionStrategy: new TournamentSelection(3)
});
```

### 5. Fitness Calculation

**v1.0:**
```javascript
rankEach(agent) {
  agent.rank++; // Used 'rank' property
}
```

**v2.0:**
```typescript
rankEach(agent: Individual): void {
  agent.rawFitness = 10; // Store raw fitness
  agent.fitness = agent.rawFitness; // Will be scaled if scaler configured
}
```

### 6. Elitism

**v1.0:**
- Implicit (top individuals preserved through selection)

**v2.0:**
- Explicit via `eliteSize` config
```typescript
super({
  // ... other config
  eliteSize: 2 // Preserve top 2 individuals
});
```

## New Features

### 1. Fitness Scaling

**v2.0:**
```typescript
import { SigmaScaling } from 'ec-toolkit';

super({
  // ... other config
  fitnessScaler: new SigmaScaling()
});
```

### 2. Multiple Selection Methods

```typescript
import { 
  TournamentSelection,
  RouletteWheelSelection,
  RankBasedSelection 
} from 'ec-toolkit';

// Tournament selection
selectionStrategy: new TournamentSelection(3)

// Roulette wheel
selectionStrategy: new RouletteWheelSelection()

// Rank-based
selectionStrategy: new RankBasedSelection(2.0)
```

### 3. Callbacks

```typescript
super({
  // ... other config
  onGeneration: (gen, best, stats) => {
    console.log(`Gen ${gen}: best = ${best.fitness}`);
  },
  onComplete: (result) => {
    console.log('Evolution complete!', result);
  }
});
```

### 4. Configuration Validation

v2.0 validates configuration and throws errors for invalid values:
```typescript
// This will throw an error
new MyModel({
  population: -10, // Invalid!
  keep: 1000       // Invalid if population < 1000
});
```

## Example Migration

### v1.0 Example

```javascript
const Model = require('./model');
const GeneticString = require('./data-structures/genetic-string');

class ExampleModel extends Model {
  constructor() {
    this.config = {
      population: 100,
      keep: 50,
      crossovers: 100,
      mutations: 1,
      initialSize: 10,
      values: ['0', '1']
    };
  }

  initializeEach() {
    let agent = new GeneticString();
    agent.generate(this.config.values, this.config.initialSize);
    return agent;
  }

  terminate(agent) {
    return agent.rank === 10;
  }

  rankEach(agent) {
    agent.rank = agent.code.split('1').length - 1;
  }
}

let model = new ExampleModel();
model.run().then(result => {
  console.log("result", result);
});
```

### v2.0 Equivalent

```typescript
import { 
  Model, 
  GeneticString, 
  TournamentSelection,
  SigmaScaling 
} from 'ec-toolkit';
import { Individual } from 'ec-toolkit';

class ExampleModel extends Model {
  constructor(config?: Partial<any>) {
    super({
      population: 100,
      keep: 50,
      crossovers: 100,
      mutations: 1,
      initialSize: 10,
      values: ['0', '1'],
      selectionStrategy: new TournamentSelection(3),
      fitnessScaler: new SigmaScaling(),
      eliteSize: 2,
      ...config
    });
  }

  initializeEach(): Individual {
    const agent = new GeneticString();
    agent.generate(this.config.values || [], this.config.initialSize || 10);
    return agent;
  }

  terminate(agent: Individual): boolean {
    return agent.fitness === 10;
  }

  rankEach(agent: Individual): void {
    const geneticString = agent as GeneticString;
    agent.rawFitness = geneticString.code.split('1').length - 1;
    agent.fitness = agent.rawFitness;
  }
}

const model = new ExampleModel();
const result = await model.run();
console.log("result", result);
```

## Common Issues

### Issue: "rank is not defined"

**Solution:** Use `fitness` instead of `rank`:
```typescript
// Old
agent.rank = 10;

// New
agent.fitness = 10;
agent.rawFitness = 10; // Optional, for scaling
```

### Issue: "Selection strategy required"

**Solution:** Add selection strategy to config:
```typescript
super({
  // ... other config
  selectionStrategy: new TournamentSelection(3)
});
```

### Issue: "Cannot find module"

**Solution:** Ensure you're importing from the package:
```typescript
import { Model } from 'ec-toolkit';
// Not: import { Model } from './model';
```

## Need Help?

- Check the [README.md](README.md) for API documentation
- See [examples/](src/examples/) for complete examples
- Open an issue on GitHub



