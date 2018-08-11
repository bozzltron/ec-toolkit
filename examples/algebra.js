'use strict;'

var evolve = require('../evolve'),
  Code = require('../code'),
  reserved = require('../data/reserved'),
  characters = require('../data/ascii')

evolve
  .from(characters)
  .populate(20)
  .initialize(function(){ return Code.generate(20) })
  .rank(function(agent){

    let rank = 0

    try { 
      compiled = Code.compile(agent.code)
      agent.result = compiled.apply(null, [42])
    } catch(e) {}

    rank += Code.partiallyStartsWith('return ', agent.code)

    rank += Code.partiallyIncludes('arguments[0]', agent.code.substring(7))

    agent.isValid = Code.isValid(agent.code)
    rank += agent.isValid ? 1 : 0

    rank += agent.code.length < 30 ? 1 : 0

    if(agent.isValid){
      agent.result = compiled.apply(null, [42])
      rank += typeof(agent.result) == 'number' ? 1 : 0
      rank += agent.result > 10 && agent.result < 25 ? 1 : 0
      if(agent.result === 21) {
        return Infinity
      }
    }


    return rank

  })
  .run()

