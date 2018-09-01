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
      log:true,
      crossovers:7,
      keep:90,
      mutations:74,
      population:100
    }, config))
  }

  initializeEach(){ 
    let agent = new GeneticString()
    agent.generate(ascii, 20)
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

    agent.rank + agent.code.length < 20 ? 1 : 0

    agent.rank += agent.matches && agent.matches.length > 0 ? 1 : 0

    agent.rank += agent.matches && !isNaN(agent.matches[0]) ? 1 : 0

    agent.rank += !agent.code.includes('4') && !agent.code.includes('2') ? 1 : 0
  }

  select(agents){
    agents = agents.sort((a, b)=>{ return b.rank - a.rank })
    
    if(this.config.log) {
      let table = agents.map((agent)=>{
        return { code:agent.code.substring(0,50), length:agent.code.length,  result:agent.result,  matches: agent.matches, rank: agent.rank}
      })

      console.table(table)
    }

    return agents.slice(0,35)
  }

  variate(agents) {
    // crossovers
    for(let i=0; i<this.crossovers; i++){
      let mom = Math.floor(Math.random() * Math.floor(10))
      let dad = Math.floor(Math.random() * Math.floor(10))
      agents.push(new GeneticString(agents[mom].crossoverWith(agents[dad])))
    }

    // mutations
    for(let i=0; i<this.mutations; i++){
      let index = math.getRandomNumberBetween(0,40)
      agents[index].mutate(ascii, 1)
    }

    return agents
  }

}

module.exports = EvolveRegexPatternModel

