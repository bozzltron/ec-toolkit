'use strict;'
const cTable = require('console.table'),
  model = require('../model'),
  GeneticString = require('../data-structures/genetic-string'),
  ascii = require('../data/ascii')

/*
  Evolving a simple Math equation
  The purpose of this example is to demonstrate Genetic Programming by
  evolving an equation from the ascii character set.  By applying the 
  right selection pressures to the set we can produce an equation that 
  results in 42, without the program knowing anything about mathematics.
*/

model
  .populate(20)
  .initializeEach(()=>{ 
    let agent = new GeneticString()
    agent.generate(ascii, 20)
    return agent
  })
  .terminate((agent)=>{
    return isNaN(agent.code) && !agent.code.includes('42') && agent.result == 42
  })
  .rankEach((agent)=>{

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

  })
  .select((agents) =>{

    agents = agents.sort((a, b)=>{ return b.rank - a.rank })
    
    let table = agents.map((agent)=>{
      return { code:agent.code.substring(0,80), length:agent.code.length,  result:agent.result,  rank: agent.rank}
    })
    console.table(table)

    return agents.slice(0,15)
  })
  .variate((agents)=>{
    // crossovers
    for(let i=0; i<5; i++){
      let mom = Math.floor(Math.random() * Math.floor(15))
      let dad = Math.floor(Math.random() * Math.floor(15))
      agents.unshift(new GeneticString(agents[mom].crossoverWith(agents[dad])))
    }

    // mutations
    for(let i=0; i<1; i++){
      let index = Math.floor(Math.random() * Math.floor(20))
      agents[index].mutate(ascii, 1)
    }
    return agents
  })
  .run()
  .then((agent)=>{
    console.log("FINAL RESULT", agent.code)
  })

