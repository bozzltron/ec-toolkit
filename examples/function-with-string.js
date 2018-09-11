'use strict;'

/*
  Evolving JavaScript Code
  The purpose of this example is to demonstrate Genetic Programming by
  evolving JavaScript from a syntax value set.  By applying the 
  right selection pressures to the set we can produce function that 
  produces the target result (42), without the program knowing anything 
  about JavaScript.
*/

var Model = require('../model'),
  GeneticString = require('../data-structures/genetic-string'),
  ascii = require('../data/ascii'),
  util = require('../util')

class FunctionModel extends Model {

  constructor(config) {
    super(Object.assign({
      population: 959,
      keep: 474,
      crossovers: 354,
      mutations: 270,
      initialSize: 9,
      log:true,
      values: ascii
    }, config))
  }

  initializeEach(){
    let string = new GeneticString()
    string.generate(ascii, this.config.initialSize)
    return string
  }

  rankEach(agent){

    // This function determines an agents fitness, which is quantified as rank.
    agent.rank = 0

    // Evaluate the candidate code
    try { 
      agent.compiled = Function(agent.code)
      agent.rank += 1
      agent.result = agent.compiled()
      agent.rank += 1
    } catch(e) {}

    agent.rank -= agent.code.length > 100 ? 1 : 0
    agent.rank += agent.code.includes('return') ? 1 : 0
    agent.rank += typeof(result) == 'number' ? 1 : 0
    
    let proximity = util.proximityTo(42, agent.result)
    agent.rank += !isNaN(proximity) ? proximity : 0

  }

  terminate(agent){
    return agent.result === 42 
  }

  log(agents){
    if(this.config.log){
      let table = agents.map((agent)=>{
        return { 
          code:agent.code.substring(0,80), 
          //tree: agent.toJSON(),
          length:agent.code.length,  
          result:agent.result,  
          rank: agent.rank}
      })
      console.table(table)    
    }
  }
}

module.exports = FunctionModel

