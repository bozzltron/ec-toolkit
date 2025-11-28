/**
 * CLI interface for running examples
 */

import { EquationModel } from './examples/EquationExample';
import { RegexModel } from './examples/RegexExample';

const exampleName = process.argv[2] || 'equation';
const optimize = process.argv.includes('--optimize');

async function run() {
  const config: Record<string, unknown> = {};

  // Select model
  let ModelClass: typeof EquationModel | typeof RegexModel;
  switch (exampleName.toLowerCase()) {
    case 'equation':
      ModelClass = EquationModel;
      break;
    case 'regex':
      ModelClass = RegexModel;
      break;
    default:
      console.log(`Unknown example: ${exampleName}`);
      console.log('Available examples: equation, regex');
      process.exit(1);
  }

  try {
    if (optimize) {
      console.log('Optimization mode not yet implemented');
      console.log('Running standard evolution...');
    }

    console.log(`Running ${exampleName} example...\n`);
    const model = new ModelClass(config);
    const result = await model.run();

    console.log('\n=== FINAL RESULT ===');
    console.log('Best individual:', result.best);
    console.log('Generations:', result.generation);
    console.log('Terminated early:', result.terminatedEarly);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

run();



