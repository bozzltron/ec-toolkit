const util = require('../util')

describe("Util", function(){

  it("should return a random item from an array", function(){
    let ary = ['a', 'b', 'c']
    let result = util.sample(ary);
    expect(result == 'a' || result == 'b' || result == 'c').toEqual(true)
  })

  it("should return a random number between", function(){
    let result = util.getRandomNumberBetween(0,3)
    expect(result == 0 || result == 1 || result == 2).toEqual(true)
  })

})