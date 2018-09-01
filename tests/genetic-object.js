let GeneticObject = require('../data-structures/genetic-object'),
  ascii = require('../data/ascii')

describe("GeneticObject", function(){

  it("should crossover", function(){
    let dad = new GeneticObject({
      population: 50,
      crossovers: 50,
      mutations: 50
    })
    let mom = new GeneticObject({
      population: 100,
      crossovers: 100,
      mutations: 100
    })
    let child = dad.crossoverWith(mom)
    expect(child).not.toEqual(mom)
    expect(child).not.toEqual(dad)
  })

})
