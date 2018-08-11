const _ = require('lodash'),
  characters = require('./data/ascii')

const Mutate = {

  sample: function(howMuch){
      return _.sampleSize(characters, howMuch)
  },

  mutate: function(str, numOfChars) {
    let ary = str.split("")
    let type = Mutate.getRandomInt(3)
    for(let i=0; i<numOfChars; i++){
      let index = Mutate.getRandomInt(ary.length)
      switch(type){
        case 0:
          // swap
            ary[index] = Mutate.sample(1)[0]
        break;
        case 1:
          // add 
          ary.push(Mutate.sample(1)[0])
        break;
        case 2:
          // remove
          ary.splice(index, 1);
        break
      }
    }
    return ary.join("")
  },
  
  getNumberBetween: function(min,max) {
    return Math.floor(Math.random()*(max-min+1)+min);
  },
  
  getRandomInt: function (max) {
    return Math.floor(Math.random() * Math.floor(max));
  },

  chunk: function(str, randomRange, numCharsToMutate) {
    randomRange = randomRange || 2
		let chunks = str.split('')
		chunks = chunks.map((chunk)=>{
			chunk = Mutate.mutate(chunk, numCharsToMutate || Mutate.getRandomInt(randomRange))
      return chunk
		})
		return chunks
  },
  
  cloneWithVariants(agent, numOfVariants, mutationRange){
    let newGen = [agent]
    for(let i=0; i<numOfVariants; i++){
      newGen.push(Mutate.mutate(agent, Mutate.getRandomInt(mutationRange || 2)))
    }
    return newGen
  },

  crossover(mom, dad) {
		let momChunks = Mutate.chunk(mom, 1),
				dadChunks = Mutate.chunk(dad, 1),
				momMiddle = Math.round(momChunks.length/2),
				momFirstHalf = momChunks.slice(0, momMiddle),
				momSecondHalf = momChunks.slice(momMiddle),
				dadMiddle = Math.round(dadChunks.length/2),
				dadFirstHalf = dadChunks.slice(0, dadMiddle),
        dadSecondHalf = dadChunks.slice(dadMiddle),
        firstChild = _.shuffle(momFirstHalf.concat(dadSecondHalf)).join(''),
        secondChild = _.shuffle(dadFirstHalf.concat(momSecondHalf)).join('')

		return [ firstChild, secondChild ]
  },
  
  arrayDivide: function(ary){
    let half = Math.round( ary.length / 2 )
    return [ ary.slice(0, half), ary.slice(half) ]
  },

  generatePairs: function(ary){
    ary = ary.slice()
    let divided = Mutate.arrayDivide(ary)
    let newAry = []
    // if the original array length is odd, we add the first item of the first array to the second to make them equal
    if(divided[0].length > divided[1].length){
      divided[1].push(divided[0][0])
    }
    divided[0].forEach((item, i)=>{
      newAry.push([divided[0][i], divided[1][i]])
    })
    return newAry
  },

  crossoverGeneration: function(ary){
    let sorted = Mutate.sortByRank(ary)
    let divided = Mutate.arrayDivide(sorted)
    // selection - only take the top half
    let pairs = Mutate.generatePairs(divided[0])
    let newGeneration = []
    pairs.forEach((pair)=>{
      let crossover = Mutate.crossover(pair[0].code, pair[1].code)
      newGeneration = newGeneration.concat(crossover)
    })
    return newGeneration
  },

  sortByRank: function(ary) {
    return ary.sort((a, b)=>{return a.rank > b.rank ? -1 : 1})
  }

}

module.exports = Mutate