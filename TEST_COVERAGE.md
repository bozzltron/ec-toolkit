# Test Coverage Analysis

## Current State

### Existing Tests (Legacy JavaScript)
The project has legacy JavaScript tests in `tests/` directory:
- `model.test.js` - Basic model tests (Jasmine)
- `genetic-string.test.js` - GeneticString tests
- `genetic-object.js` - GeneticObject tests (not a test file)
- `genetic-binary-tree.test.js` - Binary tree tests
- `genetic.binary.avl.test.js` - AVL tree tests
- `util.test.js` - Utility function tests

**Status**: ❌ Not compatible with new TypeScript codebase

### Test Framework Setup
- ✅ Jest configured (`jest.config.js`)
- ✅ TypeScript support (`ts-jest`)
- ✅ Coverage reporting configured
- ❌ No TypeScript tests written yet

## Coverage Goals

### Critical (Must Have)
- [ ] Core Model class
  - [ ] Initialization
  - [ ] Selection
  - [ ] Crossover
  - [ ] Mutation
  - [ ] Elitism
  - [ ] Fitness scaling
  - [ ] Termination
  - [ ] Error handling

### High Priority
- [ ] Selection strategies
  - [ ] TournamentSelection
  - [ ] RouletteWheelSelection
  - [ ] RankBasedSelection
  - [ ] TruncationSelection

- [ ] Fitness scaling
  - [ ] LinearScaling
  - [ ] SigmaScaling
  - [ ] PowerLawScaling

- [ ] Data structures
  - [ ] GeneticString (mutate, crossover, generate)
  - [ ] GeneticObject (crossover, clone)

- [ ] Utilities
  - [ ] Validator (config validation)
  - [ ] util functions (random, mean, stdDev, etc.)

### Medium Priority
- [ ] Examples
  - [ ] EquationExample
  - [ ] RegexExample

- [ ] Integration tests
  - [ ] Full evolution cycle
  - [ ] Multiple generations
  - [ ] Early termination

## Test Migration Plan

### Phase 1: Core Tests
1. Migrate `model.test.js` → `src/core/Model.test.ts`
2. Create tests for selection strategies
3. Create tests for fitness scaling

### Phase 2: Data Structure Tests
1. Migrate `genetic-string.test.js` → `src/data-structures/GeneticString.test.ts`
2. Create `GeneticObject.test.ts`

### Phase 3: Integration Tests
1. Create example integration tests
2. Create end-to-end evolution tests

## Running Tests

```bash
# Run all tests
npm test

# Run with coverage
npm run test:coverage

# Watch mode
npm run test:watch
```

## Coverage Targets

- **Minimum**: 60% overall coverage
- **Target**: 80% overall coverage
- **Critical paths**: 90%+ coverage (Model, Selection, Fitness)

## Notes

- Legacy tests use Jasmine, new tests use Jest
- Legacy tests test old JavaScript API, need complete rewrite
- Some legacy features (binary trees, AVL) not yet migrated to TypeScript

