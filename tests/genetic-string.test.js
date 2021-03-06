let GeneticString = require('../data-structures/genetic-string'),
  ascii = require('../data/ascii')

describe("GeneticString", function(){

  it("should initialize", function(){
    let string = new GeneticString("hello world")
    expect(string.code).toEqual("hello world")
  })

  it("should generate a string from a character set", function(){
    let string = new GeneticString()
    string.generate(ascii, 20)
    expect(string.code.length).toEqual(20)
  })

  it("should mutate by adding a character", function(){
    let string = new GeneticString()
    string.generate(ascii, 20)
    let mutated = new GeneticString(string.code)
    mutated.mutate(1, ascii, 0)
    expect(mutated.code).not.toEqual(string.code)
    expect(mutated.code.length > string.code.length).toEqual(true)
  })

  it("should mutate by swapping a character", function(){
    let string = new GeneticString()
    string.generate(ascii, 20)
    let mutated = new GeneticString(string.code)
    mutated.mutate(1, ascii, 1)
    expect(mutated.code).not.toEqual(string.code)
    expect(mutated.code.length == string.code.length).toEqual(true)
  })

  it("should mutate by deleting a character", function(){
    let string = new GeneticString()
    string.generate(ascii, 20)
    let mutated = new GeneticString(string.code)
    mutated.mutate(1, ascii, 2)
    expect(mutated.code).not.toEqual(string.code)
    expect(mutated.code.length < string.code.length).toEqual(true)
  })

  it("should crossover with other strings", function(){
    let dad = new GeneticString()
    dad.generate(ascii, 20)
    let mom = new GeneticString()
    mom.generate(ascii, 20)
    let child = dad.crossoverWith(mom)
    expect(dad.code).not.toEqual(child.code)
    expect(mom.code).not.toEqual(child.code)
    expect(dad.code.length == child.code.length).toEqual(true)
    expect(mom.code.length == child.code.length).toEqual(true)
  })
  
});