## Evolutionary Computing Tookit
The purpose of this module is to provide the tools needed to explore Evolutionary Computing with JavaScript.

### model.js
EC Toolkit comes with model.js which allows you to quickly setup each step of an evolutionary model.

```
const Model = require('./model'),
  GeneticString = require('./data-structures/genetic-string'),
  ascii = require('./data/ascii'),

class ExampleModel extends Model {
  
  constructor() {
    this.config = {
      population: 100,
      keep: 50,
      crossovers: 100,
      mutations: 1,
      initialSize:10,
      values: ascii
    }
  }

  initializeEach(){
    // initialize each agent
    let agent = new GeneticString()
    agent.generate(this.config.values, this.config.initialSize)
    return agent
  }

  terminate(agent){
    // define termination condition
    return true
  }

  rankEach(agent){
    // calculate fitness of each agent
    agent.fitness ++
  }

}

let model = new ExampleModel();

model.run().then((result)=>{
  console.log("result", result")
}

```
