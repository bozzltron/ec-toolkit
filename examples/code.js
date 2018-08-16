'use strict;'

/*
  Evolving JavaScript Code
  The purpose of this example is to demonstrate Genetic Programming by
  evolving JavaScript from a syntax value set.  By applying the 
  right selection pressures to the set we can produce function that 
  produces the target result (42), without the program knowing anything 
  about JavaScript.
*/

var model = require('../model'),
  BinaryTree = require('../data-structures/binary-tree'),
  Code = require('../code'),
  reserved = require('../data/reserved'),
  ascii = require('../data/ascii'),
  operators = require('../data/operators'),
  code = reserved.concat(Array.from('0123456789P[]{}:,;()')).concat(operators) 

model
  .populate(20)
  .initializeEach(()=>{ 
    let tree = new BinaryTree()
    tree.generate(code, 7)
    return tree
  })
  .rankEach((agent)=>{

    // This function determines an agents fitness, which is quantified as rank.
    agent.rank = 0

    // Evaluate the candidate code
    try { 
      agent.code = agent.inOrderValues().join(' ')
      agent.compiled = Function(agent.code)
      agent.rank += 1
      agent.result = agent.compiled()
      agent.rank += 1
    } catch(e) {}

    agent.rank -= agent.code.length > 100 ? 1 : 0
    agent.rank += agent.code.includes('return') ? 1 : 0
    agent.rank += typeof(result) == 'number' ? 1 : 0
    
    let proximity = Math.round( (1 /  Math.abs(42 - agent.result ) * 100)) 
    agent.rank += !isNaN(proximity) ? proximity : 0

    // If it produces the result we are looking for, we're done
    if(agent.result === 42) {
      console.log("FINAL RESULT:", agent.code)
      console.log('tree', agent.toJSON())
      throw "Done!"
    }

  })
  .select((agents)=>{
    // Take top half
    agents = agents.sort((a, b)=>{ return b.rank - a.rank })
    
    let status = ''
    agents.forEach((agent)=>{
      status += `code  ${agent.code.substring(0,80)} length  ${agent.code.length}  result  ${agent.result}  rank  ${agent.rank}\n`
    })
    model.log(status, 20)

    return agents
  })
  .variate((agents)=>{
    // 5 crossovers
    for(let i=0; i<5; i++){
      let mom = Math.floor(Math.random() * Math.floor(10))
      let dad = Math.floor(Math.random() * Math.floor(10))
      agents.unshift(agents[mom].crossoverWith(agents[dad]))
    }

    // 1 mutations
    for(let i=0; i<1; i++){
      let index = Math.floor(Math.random() * Math.floor(20))
      agents[index].mutate(1, code)
    }

    // take the top 20
    return agents.slice(0,20)
  })
  ///.limit(1000)
  .run()

