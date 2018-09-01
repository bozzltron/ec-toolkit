module.exports = {

  getRandomNumberBetween: function(min, max) {
      return Math.floor(Math.random() * (max - min) + min)
  },
  
  sample: function(ary, howMuch){
    howMuch = howMuch || 1
    let sample = ''
    for(let i=0; i<howMuch; i++) {
      sample += ary[Math.floor(Math.random() * ary.length)]
    }
    return sample
  }

}