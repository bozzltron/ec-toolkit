const _ = require('lodash')

class GeneticString {

  constructor(code){
    this.code = code || ''
    return this
  }

  generate (characters, howMuch){
    this.code = _.sampleSize(characters, howMuch).join('')
  }

  mutate (characters, howMuch, type) {
    let ary = this.code.split("")
    type = typeof(type) == 'number' ? type : this.getRandomInt(3)
    for(let i=0; i<howMuch; i++){
      let index = this.getRandomInt(ary.length)
      switch(type){
        case 0:
          // add 
          ary.push(_.sampleSize(characters, 1)[0])
        break;
        case 1:
          // swap
            ary[index] = _.sampleSize(characters, 1)[0]
        break;
        case 2:
          // remove
          ary.splice(index, 1);
        break
      }
    }
    this.code = ary.join("")
  }

  getRandomInt (max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  crossoverWith(mom) {
    let breakpoint = this.getRandomInt(this.code.length), 
      dad = this.code.split('').slice(0, breakpoint)
    mom = mom.code.split('').slice(breakpoint, mom.code.length - 1);    
    return dad.concat(mom).join('')
  }

}

module.exports = GeneticString;