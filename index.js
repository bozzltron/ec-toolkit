'use strict;'

var evolve = require('./evolve'),
  Code = require('./code'),
  reserved = require('./data/reserved'),
  characters = require('./data/ascii')

evolve
  .from(characters)
  .populate(20)
  .initialize(function(){ return Code.generate(20) })
  .rank(function(agent){

    let rank = 0
    let compiled = 'invaild'
    let result = 'invalid'

    try { 
      compiled = Code.compile(agent.code)
      agent.result = compiled.apply(null, [42])
    } catch(e) {}

    if(agent.result === 42) {
      return Infinity
    }

    rank += Code.partiallyStartsWith('return ', agent.code)

    //rank += /[0-9]{2}/.test(code) ? 1 : 0
    agent.isValid = Code.isValid(agent.code)
    rank += agent.isValid ? 1 : 0

    //rank += result == undefined ? 1 : 0
    rank += typeof(agent.result) == 'number' ? 1 : 0

    return rank

  })
  .run()

