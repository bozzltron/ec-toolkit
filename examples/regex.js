'use strict;'
const cTable = require('console.table'),
  _ = require('lodash')

/*
  Evolving a regex matcher
  The purpose of this example is to demonstrate Genetic Programming by
  evolving an regex pattern from the ascii character set.  By applying the 
  right selection pressures to the set we can produce pattern that satisfies
  our test.
*/

var Model = require('../model'),
  GeneticString = require('../data-structures/genetic-string'),
  ascii = require('../data/ascii'),
  math = require('../util')

class EvolveRegexPatternModel extends Model {

  constructor(config){
    super(Object.assign({
      values: ascii,
      population: 20,
      keep: 10,
      crossovers: 10,
      mutations: 5,
      log:true,
      initialSize:2
    }, config))
  }

  initializeEach(){ 
    let agent = new GeneticString()
    agent.generate(ascii, this.config.initialSize)
    return agent
  }

  terminate(agent) {
    return agent.matches && agent.matches[0] == '42'
  }

  rankEach(agent){
    // This function determines an agents fitness, which is quantified as rank.
    agent.rank = 0

    // Evaluate the candidate code
    try { 
      agent.result = new RegExp(agent.code, 'g')

      // Increase rank if the result is a valid regex object
      agent.rank += 1

      agent.matches = "I turned 42 today".match(agent.result)

      // Increase rank if executing the regex doensn't throw an exception
      agent.rank += 1
    } catch(e) {}

    try { 

      // Increase rank if it can find 1
      agent.rank += "I turned 1 today".match(agent.result)[0] == '1' ? 1 : 0
    } catch(e) {}

    agent.rank + agent.code.length < 20 ? 1 : 0

    agent.rank += agent.matches && agent.matches.length > 0 ? 1 : 0

    agent.rank += agent.matches && !isNaN(agent.matches[0]) ? 1 : 0

  }

  variate(agents) {
    // crossovers
    for(let i=0; i<this.config.crossovers; i++){
      let mom = Math.floor(Math.random() * Math.floor(10))
      let dad = Math.floor(Math.random() * Math.floor(10))
      agents.push(new GeneticString(agents[mom].crossoverWith(agents[dad])))
    }

    // mutations
    for(let i=0; i<this.config.mutations; i++){
      let index = math.getRandomNumberBetween(0, agents.length)
      agents[index].mutate(1, this.config.values)
    }

    return agents
  }

  log(agents){
    if(this.config.log) {
      let table = agents.map((agent)=>{
        return { code:agent.code.substring(0,50), length:agent.code.length,  result:agent.result,  matches: agent.matches, rank: agent.rank}
      })

      console.table(table)
    }
  }

}

module.exports = EvolveRegexPatternModel

