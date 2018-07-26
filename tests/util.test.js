const Util = require('../util')

describe("Util", function(){

  it("should select good code", function(){
    expect(Util.isValid("var x = 42")).toEqual(true)
  })

  it("should not select bad code", function(){
    expect(Util.isValid("*bad")).toEqual(false)
  })

  it("should return sample characters", function(){
    expect(Util.sample(1).length).toEqual(1)
  })

  it("should mutate the code", function(){
    let code = Util.generateCode(20)
    let mutated = Util.mutate(code, 4)
    expect(code).not.toEqual(mutated)
  })

  it("should derive code from existing code", function(){
    let code = Util.generateCode(20)
    let derivative = Util.chunk(code).join('')
    expect(code).not.toEqual(derivative)
  })

  it("should crossover code", function(){
    let mom = Util.generateCode(20)
    let dad = Util.generateCode(20)
    let kids = Util.crossover(mom, dad)
    expect(kids[0]).not.toEqual(mom)
    expect(kids[1]).not.toEqual(mom)
    expect(kids[0]).not.toEqual(dad)
    expect(kids[1]).not.toEqual(dad)
  })

  it("should rank code", function(){
    expect(Util.rank([], '*ger')).toEqual(0)
    expect(Util.rank([], 'return 42')).toEqual(1)
    expect(Util.rank([], 'return 2', 2)).toEqual(2)
  })

  it("should create pairs", function(){

  })

  it("should crossover a generation", function(){

  })

})