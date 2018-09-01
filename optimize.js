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
      population: 100,
      keep: 50,
      crossovers: 50,
      generations: 100
    }))
  }

  initializeEach(){
    return new this.config.model({
      population: this.config.population,
      keep: util.getRandomNumberBetween(0, this.config.population),
      mutations: util.getRandomNumberBetween(0, this.config.population),
      crossovers: util.getRandomNumberBetween(0, this.config.population),
      generations: 100,
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

    let table = models.map((agent)=>{
      let config = Object.assign(agent.config)
      delete config.values
      return { config:JSON.stringify(agent.config), rank: agent.rank}
    })

    console.table(table)

    for(let i=0; i<this.config.crossovers; i++){
      let mom = new GeneticObject(models[util.getRandomNumberBetween(0, models.length)].config)
      let dad = new GeneticObject(models[util.getRandomNumberBetween(0, models.length)].config)
      models.push(new this.config.model(mom.crossoverWith(dad)))
    }
    return models
  }
}

module.exports = OptimizationModel
