const util = require('../util')

class GeneticString {

  constructor(code){
    this.code = code || ''
    return this
  }

  generate (characters, howMuch){
    this.code = util.sample(characters, howMuch)
  }

  mutate (characters, howMuch, type) {
    type = typeof(type) == 'number' ? type : this.getRandomInt(3)
    for(let i=0; i<howMuch; i++){
      let index = this.getRandomInt(this.code.length-1)
      let sample = util.sample(characters)
      switch(type){
        case 0:
          // add 
          this.code = this.code.concat(sample)
        break;
        case 1:
          // swap
            this.code = this.replaceAt(index, sample)
        break;
        case 2:
          // remove
          this.code = this.code.slice(0,index) + this.code.slice(index+1, this.code.length)
        break
      }
    }
  }

  getRandomInt (max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  crossoverWith(mom) {
    let breakpoint = util.getRandomNumberBetween(1,this.code.length), 
      dad = this.code.split('').slice(0, breakpoint)
    mom = mom.code.split('').slice(breakpoint, mom.code.length);    
    return dad.concat(mom).join('')
  }

  replaceAt (index, replacement) {
    return this.code.substr(0, index) + replacement + this.code.substr(index + replacement.length);
  }

}

module.exports = GeneticString;