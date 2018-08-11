'use strict;'

/*
  Evolving a simple Math equation
  The purpose of this example is to demonstrate Genetic Programming by
  evolving an equation from the ascii character set.  By applying the 
  right selection pressures to the set we can produce an equation that 
  results in 42, without the program knowing anything about mathematics.
*/

var model = require('../model'),
  Code = require('../code'),
  reserved = require('../data/reserved'),
  characters = require('../data/ascii')

model
  .from(characters)
  .populate(20)
  .initialize(function(){ return Code.generate(20) })
  .rank(function(agent){

    // This function determines an agents fitness, which is quantified as rank.
    let rank = 0

    // Evaluate the candidate code
    try { 
      agent.result = eval(agent.code)
    } catch(e) {}

    // If it produces the result we are looking for, we're done
    if(agent.result === 42) {
      return Infinity
    }

    // A higher rank for code that contains numbers
    rank += /[0-9]/.test(agent.code) ? 1 : 0

    // A higher rank for code that contains math operators
    rank += /[-+*\/]/.test(agent.code) ? 1 : 0

    // A higher rank for code that is less than 20 characters.  This prevents code "bloat".
    rank += agent.code.length < 20 ? 1 : 0

    // A higher rank for code that evaluates to a number value
    rank += typeof(agent.result) == 'number' ? 1 : 0

    if(typeof(agent.result) == 'number'){
      // A higher rank as the number results approach the value we are looking for
      rank += agent.result > 0 && agent.result < 50 ? 1 : 0
      rank += agent.result > 20 && agent.result < 50 ? 1 : 0
      rank += agent.result > 30 && agent.result < 50 ? 1 : 0
      rank += agent.result > 40 && agent.result < 50 ? 1 : 0
    }

    return rank

  })
  .run()

