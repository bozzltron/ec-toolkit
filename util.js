module.exports = {

  getRandomNumberBetween: function(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min)
  },
  
  sample: function(ary, howMuch){
    howMuch = howMuch || 1
    let sample = ''
    for(let i=0; i<howMuch; i++) {
      sample += ary[Math.floor(Math.random() * ary.length)]
    }
    return sample
  },

  proximityTo(target, result){
    return Math.round( (1 /  Math.abs(target - result ) * 100)) 
  }

}