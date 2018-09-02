'use strict;'
const cTable = require('console.table'),
  Model = require('../model'),
  GeneticString = require('../data-structures/genetic-string'),
  ascii = require('../data/ascii'),
  util = require('../util')

/*
  Evolving a simple Math equation
  The purpose of this example is to demonstrate Genetic Programming by
  evolving an equation from the ascii character set.  By applying the 
  right selection pressures to the set we can produce an equation that 
  results in 42, without the program knowing anything about mathematics.
*/

class EquationModel extends Model {
  
  constructor(config) {
    super(Object.assign({
      population: 20,
      keep: 15,
      mutations: 1,
      crossovers: 5,
      values: ascii
    }, config))
  }

  initializeEach(){
    let agent = new GeneticString()
    agent.generate(ascii, 20)
    return agent
  }

  terminate(agent){
    return isNaN(agent.code) && !agent.code.includes('42') && agent.result == 42
  }

  rankEach(agent){
    // This function determines an agents fitness, which is quantified as rank.
    agent.rank = 0

    // Evaluate the candidate code
    try { 
      agent.result = eval(agent.code)
    } catch(e) {}

    // A higher rank for code that contains numbers
    agent.rank += /[0-9]/.test(agent.code) ? 1 : 0

    // A higher rank for code that contains math operators
    agent.rank += /[-+*\/]/.test(agent.code) ? 1 : 0

    // A higher rank for code that is less than 20 characters.  This prevents code "bloat".
    agent.rank += agent.code.length < 20 ? 1 : 0

    // A higher rank for code that evaluates to a number value
    agent.rank += typeof(agent.result) == 'number' ? 1 : 0

    if(typeof(agent.result) == 'number'){
      // A higher rank as the number results approach the value we are looking for
      let proximity = Math.round( (1 /  Math.abs(42 - agent.result ) * 100)) 
      agent.rank += !isNaN(proximity) ? proximity : 0
    }
  }

	variate(agents){
    for(let i=0; i<this.config.crossovers; i++){
      let mom = util.getRandomNumberBetween(0, agents.length)
      let dad = util.getRandomNumberBetween(0, agents.length)
      dad = mom == dad ? dad++ : dad
      agents.push(new GeneticString(agents[mom].crossoverWith(agents[dad])))
		}
    for(let i=0; i<this.config.mutations; i++){
      let index = util.getRandomNumberBetween(0, agents.length)
      agents[index].mutate(1, this.config.values)
    }
		return agents
	}

  log(agents){
    if(this.config.log){
      let table = agents.map((agent)=>{
        return { code:agent.code.substring(0,80), length:agent.code.length,  result:agent.result,  rank: agent.rank}
      })
      console.table(table)
    }
  }
}

module.exports = EquationModel

