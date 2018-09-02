const Model = require('../model')

describe("Model", function(){

  it("should limit generations", function(){
    let model = new Model({generations:1})
    expect(model.config.generations).toEqual(1)
  })

  it("should establish an initial populate", function(){
    let model = new Model({population:1})
    expect(model.config.population).toEqual(1)
  })  

})