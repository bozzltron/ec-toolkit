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
  GeneticBinaryTree = require('../data-structures/genetic-binary-tree'),
  reserved = require('../data/reserved'),
  operators = require('../data/operators'),
  code = reserved.concat(Array.from('0123456789P[]{}:,;()')).concat(operators).concat('arguments[0]'),
  util = require('../util')

  class FunctionWithParamsModel extends Model {
    constructor(config) {
      super(Object.assign({
        population:40,
        keep: 30,
        crossovers: 10,
        mutations: 1,
        initialSize: 7
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
        agent.code = agent.inOrderValues().join(' ')
        agent.compiled = Function(agent.code)
        agent.rank += 1
        agent.result = agent.call({}, 3)
        agent.rank += 1
      } catch(e) {}

      agent.rank += agent.code.includes('arguments[0]') ? 1 : 0
      agent.rank -= agent.code.length > 100 ? 1 : 0
      agent.rank += agent.code.includes('return') ? 1 : 0
      agent.rank += typeof(result) == 'number' ? 1 : 0
      
      let proximity = Math.round( (1 /  Math.abs(42 - agent.result ) * 100)) 
      agent.rank += !isNaN(proximity) ? proximity : 0

    }
  
    terminate(agent){
      return agent.result === 42 
    }
  
    variate(agents){
  
      for(let i=0; i<this.config.crossovers; i++){
        let mom = util.getRandomNumberBetween(0, agents.length)
        let dad = util.getRandomNumberBetween(0, agents.length)
        while(dad == mom){
          dad = util.getRandomNumberBetween(0, agents.length)
        }
        agents.unshift(agents[mom].crossoverWith(agents[dad]))
      }
  
      for(let i=0; i<this.config.mutations; i++){
        let index = util.getRandomNumberBetween(0, agents.length)
        agents[index].mutate(1, code)
      }
      
      return agents
    }
  
    log(agents){
      let table = agents.map((agent)=>{
        return { code:agent.code.substring(0,80), length:agent.code.length,  result:agent.result,  rank: agent.rank}
      })
      console.table(table)    
    }
  }
  
  module.exports = FunctionWithParamsModel
  

