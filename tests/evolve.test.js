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

  it("should select valid code over invalid", function(){
    let genes = [
      new Gene(['<', '>']),
      new Gene(['return','42'])
    ];
    genes.forEach((gene)=>{
      console.log("gene solution", gene.solution)
      console.log("gene rank", gene.rank)
    })
    let selection = evolve.select(genes)
    expect(selection.code).toEqual('return 42')
  })

})