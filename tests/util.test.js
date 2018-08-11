const Mutate = require('../mutate')

describe("Mutate", function(){

  it("should select good code", function(){
    expect(Mutate.isValid("var x = 42")).toEqual(true)
  })

  it("should not select bad code", function(){
    expect(Mutate.isValid("*bad")).toEqual(false)
  })

  it("should return sample characters", function(){
    expect(Mutate.sample(1).length).toEqual(1)
  })

  it("should mutate the code", function(){
    let code = Mutate.generateCode(20)
    let mutated = Mutate.mutate(code, 4)
    expect(code).not.toEqual(mutated)
  })

  it("should derive code from existing code", function(){
    let code = Mutate.generateCode(20)
    let derivative = Mutate.chunk(code, undefined, 1).join('')
    expect(code).not.toEqual(derivative)
  })

  it("should crossover code", function(){
    let mom = Mutate.generateCode(20)
    let dad = Mutate.generateCode(20)
    let kids = Mutate.crossover(mom, dad)
    expect(kids[0]).not.toEqual(mom)
    expect(kids[1]).not.toEqual(mom)
    expect(kids[2]).not.toEqual(dad)
    expect(kids[3]).not.toEqual(dad)
  })

  it("should rank invalid code as 0", function(){
    expect(Mutate.rank([], '*ger')).toEqual(0)
  })

  it("should rank valid code that returns nothing as 1", function(){
    expect(Mutate.rank([], 'var x = 3')).toEqual(1)
  })

  it("should rank valid code that returns something as 2", function(){
    expect(Mutate.rank([], 'var x = 3; return x')).toEqual(2)
  })

  it("should rank valid code that returns a value that matches the target as 3", function(){
    expect(Mutate.rank([3], 'return arguments[0]', 3)).toEqual(3)
  })

  it("should divide arrays in two", function(){
    let ary = [1,2,3,4,5,6,7,8,9,10]
    let divided = Mutate.arrayDivide(ary)
    expect(divided[0]).toEqual([1,2,3,4,5])
    expect(divided[1]).toEqual([6,7,8,9,10])
  })

  it("should equalize arrays in two", function(){
    let ary = [1,2,3,4,5,6,7,8,9,10]
    let divided = Mutate.arrayDivide(ary)
    expect(divided[0]).toEqual([1,2,3,4,5])
    expect(divided[1]).toEqual([6,7,8,9,10])
  })

  it("should create pairs", function(){
    let ary = [1,2,3,4,5,6,7,8,9,10]
    let pairs = Mutate.generatePairs(ary)
    expect(pairs).toEqual([[1,6],[2,7],[3,8],[4,9],[5,10]])
  })

  it("should create pairs from odd array", function(){
    let ary = [1,2,3,4,5]
    let pairs = Mutate.generatePairs(ary)
    expect(pairs).toEqual([[1,4],[2,5],[3,1]])
  })

  it("should crossover a generation", function(){
    let oldGen = []
    for(let i=0; i<10; i++) {
      oldGen.push({code:Mutate.generateCode(20)})
    }
    let nextGen = Mutate.crossoverGeneration(oldGen)
    expect(nextGen.length).toEqual(6)
    for(let i=0; i<10; i++) {
      expect(oldGen.includes(nextGen[i])).toEqual(false)
    }
  })  

  it("should sort by rank", function(){
    expect(Mutate.sortByRank([{rank:2}, {rank:3}, {rank:1}])).toEqual([{rank:3}, {rank:2}, {rank:1}])
  })

  it("should clone with variants", function(){
    let clones = Mutate.cloneWithVariants('thing1', 4, 20)
    expect(clones.length).toEqual(5)
    expect(clones[0]).not.toEqual(clones[1])
    expect(clones[0]).not.toEqual(clones[2])
    expect(clones[0]).not.toEqual(clones[3])
    expect(clones[0]).not.toEqual(clones[4])
  })

  it("should ranks words by partial matching", function(){
    let rank = Mutate.findMostCompleteWord('--ret---')
    
    expect(rank).toEqual(3)
    rank = Mutate.findMostCompleteWord('--function---')
    expect(rank).toEqual(8)
  })

})