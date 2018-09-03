const Model = require('../model'),
  GeneticString = require('../data-structures/genetic-string'),
  cTable = require('console.table');

describe("Model", function(){

  it("should construct a model", function(){
    let config = {
      generations:1,
      population:1
    }
    let model = new Model(config)
    expect(model.config).toEqual({ 
      generations : 1, 
      population : 1, 
      keep : 0, 
      crossovers : 0, 
      mutations : 0, 
      log : true, 
      values : [  ] })
  })

  it("should sort", function(){
    let model = new Model({})
    let agents = [{code:"abc", rank: 1}, {code:"123", rank:2}]
    expect(model.sort(agents)).toEqual([{code:"123", rank:2}, {code:"abc", rank: 1}])
  })  

  it("should select", function(){
    let model = new Model({keep:1})
    let agents = [{code:"abc", rank: 1}, {code:"123", rank:2}]
    expect(model.select(agents).length).toEqual(1)
  })  

  it("should crossover", function(){
    let model = new Model({crossovers:2})
    let agents = [new GeneticString("abc"), new GeneticString("123")]
    let offspring = model.crossover(agents)
    expect(offspring.length).toEqual(2)
    expect(agents).not.toEqual(offspring)
  }) 
  
  it("should mutate", function(){
    let model = new Model({mutations:2, values:["x", "y", "z"]})
    let agents = [new GeneticString("abc"), new GeneticString("123")]
    let mutated = model.mutate([new GeneticString(agents[0].code), new GeneticString(agents[1].code)])
    expect(mutated.length).toEqual(2)
    expect(agents).not.toEqual(mutated)
  }) 

  it("should log", function(){
    let model = new Model({log:true})
    let spy = spyOn(console, 'table')
    model.log([])
    expect(spy).toHaveBeenCalled()
  })

  it("should run", async function(){
    let model = new Model({generations:1, log:true})
    let promise = await model.run()
    expect(typeof(promise)).toEqual('promise')
  })


})