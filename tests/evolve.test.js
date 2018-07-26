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


})