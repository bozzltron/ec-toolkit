let GeneticTree = require('../data-structures/genetic-binary-avl'),
  ascii = require('../data/ascii')

describe("GeneticBinaryAVL", function(){

  it("should crossover", function(){
    let dad = new GeneticTree(Array.from('abcdef'))
    let mom = new GeneticTree(Array.from('123456'))
    let child = dad.crossoverWith(mom)
    expect(child.tree.keys()).not.toEqual(mom.tree.keys())
    expect(child.tree.keys()).not.toEqual(dad.tree.keys())
  })

  it("should mutate by inserting a node", function(){
    let parent = new GeneticTree(Array.from('abcdef'))
    let copy = new GeneticTree(parent.tree.keys())
    copy.mutate(1, ['1','2','3'], 0)
    expect(parent.tree.keys().length < copy.tree.keys().length)
    expect(parent.tree.keys() != copy.tree.keys())
  })

  it("should mutate by swapping the value of a node", function(){
    let parent = new GeneticTree(Array.from('abcdef'))
    let copy = new GeneticTree(parent.tree.keys())
    copy.mutate(1, ['1','2','3'], 1)
    expect(parent.tree.keys().length == copy.tree.keys().length)
    expect(parent.tree.keys() != copy.tree.keys())
  })

  it("should mutate by deleting a node", function(){
    let parent = new GeneticTree(Array.from('abcdef'))
    let copy = new GeneticTree(parent.tree.keys())
    copy.mutate(1, ['1','2','3'], 2)
    expect(parent.tree.keys().length > copy.tree.keys().length)
    expect(parent.tree.keys() != copy.tree.keys())
  })

})
