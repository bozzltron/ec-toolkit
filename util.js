const _ = require('lodash'),
  characters = require('./data/ascii')

const Util = {

  generateCode: function(length){
    return Util.sample(length).join('')
  },

  sample: function(size) {
		size = size || this.size
		return _.sampleSize(characters, size)
	},

  mutate: function(str, numOfChars) {
		let ary = str.split("")
		for(let i=0; i<numOfChars; i++){
			let index = Util.getNumberBetween(0, ary.length);
			ary[index] = Util.sample(1)[0]
			str = ary.join("")
    }
    return str
  },
  
  getNumberBetween: function(min,max) {
    return Math.floor(Math.random()*(max-min+1)+min);
  },
  
  compile:function(code){
    return Function('"use strict";' + code)
  },

  isValid: function(code){
    try {
      Util.compile(code)
      return true
    } catch (err) {
      return false
    }
  },

  chunk: function(str, numOfChars) {
		let chunks = str.split(' ')
		chunks = chunks.map((chunk)=>{
			if(!Util.isValid(chunk)) {
        chunk = Util.mutate(chunk, numOfChars || 1)
      }
      return chunk
		})
		return chunks
  },
  
  crossover(mom, dad) {
		let momChunks = Util.chunk(mom),
				dadChunks = Util.chunk(dad),
				momMiddle = Math.round(momChunks.length/2),
				momFirstHalf = momChunks.slice(0, momMiddle),
				momSecondHalf = momChunks.slice(momMiddle),
				dadMiddle = Math.round(dadChunks.length/2),
				dadFirstHalf = dadChunks.slice(0, dadMiddle),
        dadSecondHalf = dadChunks.slice(dadMiddle),
        firstChild = _.shuffle(momFirstHalf.concat(dadSecondHalf)).join(' '),
        secondChild = _.shuffle(dadFirstHalf.concat(momSecondHalf)).join(' ')

        // console.log("momChunks", momChunks)
        // console.log("momMiddle", momMiddle)
        // console.log("momFirstHalf", momFirstHalf)
        // console.log("momSecondHalf", momSecondHalf)
        // console.log("dadChunks", dadChunks)
        // console.log("dadMiddle", dadMiddle)
        // console.log("dadFirstHalf", dadFirstHalf)
        // console.log("dadSecondHalf", dadSecondHalf)
        // console.log("firstChhild", firstChild)
        // console.log("secondChild", secondChild)
		return [ firstChild, secondChild ]
  },
  
	rank: function(params, code, target) {
		try {
			let compiled = Util.compile(code);
      console.log("type", typeof(compiled))
      console.log("result", compiled.appy(null, params))
      if(typeof(compiled) == 'function') {
				if(compiled.appy(null, params) === target){
					return 2
        }			
        return 1
			}
		} catch(e) {
      return 0
      console.log(e);
		}
  },
  
  generatePairs: function(ary){

  },

  crossoverGeneration: function(ary){

  }

}

module.exports = Util