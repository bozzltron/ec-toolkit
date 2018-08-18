const model = require('../model')

describe("Model", function(){

  it("should limit generations", function(){
    model.limit(1)
    expect(model.generations).toEqual(1)
  })

  it("should establish an initial populate", function(){
    model.populate(20)
    expect(model.population).toEqual(20)
  })  

  it("should allow chaining", function(){
    model
    .populate(100)
    .limit(1)
  
  })

})