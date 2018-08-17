## Evolutionary Computing Tookit
The purpose of this module is to provide the tools needed to explore Evolutionary Computing with JavaScript.

### model.js
EC Toolkit comes with model.js which allows you to quickly setup each step of an evolutionary model.

```
const model = require('./model');
model
  .populate(40) // Start with an initial populuation of agents
  .initializeEach(()=>{ 
    return {code: 'randomly generated code'};   // Initialize each agent with this function by returning the agents initial state.
  })
  .rankEach((agent)=>{

    // This function determines an agents fitness, which is quantified as rank.
    agent.rank = 0;

    // Add rules that increase the rank value
    agent.rank += aFitnessEvaluation(agent.code) ? 1 : 0;

  })
  .select((agents)=>{
    // Decide which agents you want to keep based on their rank
    return agents;
  })
  .variate((agents)=>{
    // Evolve agents via your own combination of crossover or mutations
    return agents;
  })
  .limit(1000) // Limit the model to 1000 generations (Each loop is a generation).
  .run()

```
