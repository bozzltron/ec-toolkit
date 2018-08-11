const evolve = require('../evolve'),
  Gene = require('../gene')

describe("Evolve", function(){

  it("should accept parameters", function(){
    evolve.where("a", "b", "c");
    expect(evolve.params).toEqual(["a", "b", "c"])
  })

  it("should limit generations", function(){
    evolve.limit(1)
    expect(evolve.generations).toEqual(1)
  })

  it("should set target", function(){
    evolve.limit(1).produces(50)
    expect(evolve.target).toEqual(50)
  })

  it("should establish an initial populate", function(){
    evolve.populate(20)
    expect(evolve.population).toEqual(20)
  })  

  it("should allow chaining", function(){
    evolve
    .populate(100)
    .limit(1)
  
  })

})