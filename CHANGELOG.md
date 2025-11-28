# Changelog

All notable changes to EC-Toolkit will be documented in this file.

## [2.0.0] - 2024

### Added
- **TypeScript support** - Complete rewrite in TypeScript with full type safety
- **Multiple selection methods**:
  - Tournament Selection
  - Roulette Wheel Selection
  - Rank-Based Selection
  - Truncation Selection (existing, now explicit)
- **Fitness scaling strategies**:
  - Linear Scaling
  - Sigma Scaling
  - Power Law Scaling
- **Explicit elitism** - `eliteSize` configuration option
- **Configuration validation** - Validates all config parameters
- **Improved error handling** - Proper error types and messages
- **Callbacks** - `onGeneration` and `onComplete` callbacks
- **Logging improvements** - Configurable log intervals, better formatting
- **Security sandbox** - Basic sandbox utilities (production use VM2/isolated-vm)
- **Comprehensive documentation** - README, migration guide, API docs
- **Modern build system** - TypeScript compiler, Jest testing

### Changed
- **Breaking**: Model constructor now requires explicit config
- **Breaking**: Selection strategy must be specified explicitly
- **Breaking**: Fitness uses `fitness` property instead of `rank`
- **Breaking**: Import paths changed (use package exports)
- **Breaking**: Requires TypeScript or compiled JavaScript

### Fixed
- Population replacement bug (elite preservation)
- Termination condition evaluation (now after all agents evaluated)
- Mutation rate calculation (now per-individual probability)
- Crossover parent selection (ensures different parents)

### Removed
- Old JavaScript examples (replaced with TypeScript versions)
- Unused dependencies (avl, binarytree, tree-model, uuid)
- Legacy API methods

### Migration
See [MIGRATION.md](MIGRATION.md) for detailed migration guide.

## [1.0.0] - Initial Release

### Features
- Basic genetic algorithm implementation
- String and object-based individuals
- Simple truncation selection
- Basic mutation and crossover operators
- Example models (equation, regex)



