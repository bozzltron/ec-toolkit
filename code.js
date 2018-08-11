const _ = require('lodash'),
  characters = require('./data/ascii')

const Code = {

  generate: function(howMuch){
		return _.sampleSize(characters, howMuch).join('')
  },

  partiallyStartsWith: function(needle, haystack){
      let size = 1
      let chars = needle.substring(0,size)
      let rank = 0
      while(haystack.startsWith(chars) && size <= needle.length){
        rank++
        size++
        chars = needle.substr(0,size)
      }
      return rank
  },

  partiallyIncludes: function(needle, haystack){
    let size = 1
    let chars = needle.substring(0,size)
    let rank = 0
    while(haystack.includes(chars) && size <= needle.length){
      rank++
      size++
      chars = needle.substr(0,size)
    }
    return rank
  },

  partiallyIncludesAnyOf: function(list, code){
    let ranks = []
    list.forEach((word)=>{
      let size = 1
      let chars = word.substring(0,size)
      let rank = 0
      while(code.includes(chars) && size <= word.length){
        rank++
        size++
        chars = word.substr(0,size)
      }
      ranks.push(rank)
    })
    return ranks.reduce((sum, rank)=>{ return sum + rank})
  },


  compile: function(parameters, code) {
    return Function(`"use strict"; ${code}`)
  },

  isValid: function(code){
    try {
      Code.compile(code)
      return true
    } catch (err) {
      return false
    }
  },

}

module.exports = Code