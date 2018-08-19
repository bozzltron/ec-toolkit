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

var model = require('../model'),
  GeneticString = require('../data-structures/genetic-string'),
  ascii = require('../data/ascii')

model
  .populate(40)
  .initializeEach(()=>{ 
    let agent = new GeneticString()
    agent.generate(ascii, 20)
    return agent
  })
  .terminate((agent)=>{
    return agent.matches && agent.matches[0] == '42'
  })
  .rankEach(function(agent){

    // This function determines an agents fitness, which is quantified as rank.
    agent.rank = 0

    // Evaluate the candidate code
    try { 
      agent.result = new RegExp(agent.code)

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

  })
  .select(function(agents) {

    agents = agents.sort((a, b)=>{ return b.rank - a.rank })
    
    let table = agents.map((agent)=>{
      return { code:agent.code.substring(0,80), length:agent.code.length,  result:agent.result,  matches: agent.matches, rank: agent.rank}
    })
    console.table(table)

    return agents.slice(0,20)
  })
  .variate((agents)=>{
    // crossovers
    for(let i=0; i<20; i++){
      let mom = Math.floor(Math.random() * Math.floor(15))
      let dad = Math.floor(Math.random() * Math.floor(15))
      agents.unshift(new GeneticString(agents[mom].crossoverWith(agents[dad])))
    }

    // mutations
    for(let i=0; i<1; i++){
      let index = Math.floor(Math.random() * Math.floor(20))
      agents[index].mutate(ascii, 1)
    }

    return agents;
  })
  .run()
  .then((agent)=>{
    console.log("FINAL RESULT", agent.code)
    console.log(agent.matches)
  })

