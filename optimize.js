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
    let population = util.getRandomNumberBetween(0, 1000)
    return new this.config.model({
      population: population,
      keep: util.getRandomNumberBetween(0, population),
      mutations: util.getRandomNumberBetween(0, population),
      crossovers: util.getRandomNumberBetween(0, population),
      generations: 100,
      initialSize: util.getRandomNumberBetween(0, 1000),
      log: false
    })
  }

  async rankEach(model){
    let result = await model.run()
    model.rank = result.rank
  }

  terminate(){
    return this.count == 100
  }

  variate(models){
    for(let i=0; i<this.config.crossovers; i++){
      let mom = new GeneticObject(models[util.getRandomNumberBetween(0, models.length)].config)
      let dad = new GeneticObject(models[util.getRandomNumberBetween(0, models.length)].config)
      models.push(new this.config.model(mom.crossoverWith(dad)))
    }
    return models
  }

  logEach(models){
    let table = models.map((agent)=>{
      let config = Object.assign(agent.config)
      delete config.values
      return { config:JSON.stringify(agent.config), rank: agent.rank}
    })

    console.table(table)
  }
}

module.exports = OptimizationModel
