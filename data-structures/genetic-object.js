const util = require('../util')

class GeneticObject {

  constructor(obj) {
    Object.assign(this, obj)
  }

  crossoverWith(mom){
    let child = Object.assign({}, this)
    let length = Object.getOwnPropertyNames(mom).length
    let index = util.getRandomNumberBetween(1, length)
    let keys = Object.keys(child)
    for(let i=index; i<length; i++){  
      let key = keys[i]
      child[key] = mom[key]
    }
    return new GeneticObject(child)
  }

}

module.exports = GeneticObject