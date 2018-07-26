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

  it("should rank invalid code as 0", function(){
    expect(Util.rank([], '*ger')).toEqual(0)
  })

  it("should rank valid code that returns nothing as 1", function(){
    expect(Util.rank([], 'var x = 3')).toEqual(1)
  })

  it("should rank valid code that returns something as 2", function(){
    expect(Util.rank([], 'var x = 3; return x')).toEqual(2)
  })

  it("should rank valid code that returns a value that matches the target as 3", function(){
    expect(Util.rank([3], 'return arguments[0]', 3)).toEqual(3)
  })

  it("should create pairs", function(){

  })

  it("should crossover a generation", function(){

  })

})