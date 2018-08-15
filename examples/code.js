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

    agent.rank += agent.code.length < 300 ? 1 : 0
    agent.rank += typeof(result) == 'number' ? 1 : 0

    agent.rank += agent.result > 0 ? 1 : 0
    agent.rank += agent.result > 20 ? 1 : 0
    agent.rank += agent.result > 30 ? 1 : 0
    agent.rank += agent.result < 43 ? 1 : 0

    // If it produces the result we are looking for, we're done
    if(agent.result === 42) {
      throw "Done!"
    }

  })
  .select((agents)=>{
    // Take top half
    agents = agents.sort((a, b)=>{ return b.rank - a.rank })
    
    agents.forEach((agent)=>{
      console.log('code', agent.code, 'result', agent.result, 'rank', agent.rank)
    })

    return agents
  })
  .variate((agents)=>{
    agents.unshift(agents[0].crossoverWith(agents[1]))
    agents.unshift(agents[0].crossoverWith(agents[2]))
    agents.unshift(agents[1].crossoverWith(agents[2]))
    agents.unshift(agents[1].crossoverWith(agents[3]))
    agents.unshift(agents[2].crossoverWith(agents[3]))
    let index = Math.floor(Math.random() * Math.floor(20))
    agents[index].mutate(1, code)
    return agents.slice(0,20)
  })
  .limit(1000)
  .run()

