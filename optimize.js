const Model = require('./model'),
  RegexModel = require('./examples/regex'),
  util = require('./util'),
  GeneticObject = require('./data-structures/genetic-object'),
  cTable = require('console.table')

/*

Input Parameters
  Initial population
  Initial length of code
  Number of agents to keep 
  Mutations per generation
  Crossovers per generation

Output Parameters
  Number of generations
  Highest rank (fitness) achieved
  Input parameters used

*/

class OptimizationModel extends Model {

  constructor(config){
    super(Object.assign(config, {
      population: 20,
      keep: 10,
      crossovers: 10,
      generations: 50
    }))
  }

  initializeEach(){
    let population = util.getRandomNumberBetween(10, 100)
    return new this.config.model({
      population: population,
      keep: util.getRandomNumberBetween(2, population),
      mutations: util.getRandomNumberBetween(0, population),
      crossovers: util.getRandomNumberBetween(0, population),
      generations: 100,
      initialSize: util.getRandomNumberBetween(1, 100),
      log: false
    })
  }

  async rankEach(model){
    // only run a model, if it has not already 
    if(!model.rank) {
      let result = await model.run()
      model.rank = result.rank 
    }
  }

  terminate(){
    return this.count == this.generations
  }

  crossover(models){
    for(let i=0; i<this.config.crossovers; i++){
      let momIndex = util.getRandomNumberBetween(0, models.length)
      let dadIndex = util.getRandomNumberBetween(0, models.length)
      while(dadIndex == momIndex){
        dadIndex = util.getRandomNumberBetween(0, models.length)
      }
      let mom = new GeneticObject(models[momIndex].config)
      let dad = new GeneticObject(models[dadIndex].config)
      models.push(new this.config.model(mom.crossoverWith(dad)))
    }
    return models
  }

  mutate(models){
    return models
  }

  log(models){
    let table = models.map((agent)=>{
      let config = Object.assign({}, agent.config)
      delete config.values
      return { config:JSON.stringify(config), rank: agent.rank}
    })

    console.table(table)
  }
}

module.exports = OptimizationModel
