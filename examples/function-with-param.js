'use strict;'
const cTable = require('console.table');

/*
  Evolving JavaScript Code
  The purpose of this example is to demonstrate Genetic Programming by
  evolving JavaScript from a syntax value set.  By applying the 
  right selection pressures to the set we can produce function that 
  produces the target result (42), without the program knowing anything 
  about JavaScript.
*/

var Model = require('../model'),
  GeneticBinaryTree = require('../data-structures/genetic-binary-avl'),
  operators = require('../data/operators'),
  code = ['return', 'arguments[0]'].concat(Array.from('0123456789[]{}:,;()./\\')).concat(operators),
  util = require('../util')

class FunctionWithParamsModel extends Model {
    constructor(config) {
      super(Object.assign({
        population: 100,
        keep: 50,
        crossovers: 100,
        mutations: 10,
        initialSize: 3,
        log:true,
        values: code
      }, config))
    }
  
    initializeEach(){
      let tree = new GeneticBinaryTree()
      tree.generate(code, this.config.initialSize)
      return tree
    }
  
    rankEach(agent){

      // This function determines an agents fitness, which is quantified as rank.
      agent.rank = 0

      // Evaluate the candidate code
      try { 
        agent.code = agent.tree.keys().join(' ')
        agent.compiled = Function(agent.code)
        agent.rank += 1
        agent.result = agent.compiled()
        agent.rank += 1
        agent.result = agent.result.call({}, 3)
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
      let table = agents.map((agent)=>{
        return { code:agent.code.substring(0,80), length:agent.code.length,  result:agent.result,  rank: agent.rank}
      })
      console.table(table)    
    }
  }
  
  module.exports = FunctionWithParamsModel
  

