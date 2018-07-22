const Gene = require('../gene');

describe("Gene", function(){

  it("should generate code", function(){
    let gene = new Gene()
    console.log("code", gene.code)
    expect(gene.code.length > 0).toEqual(true)
  })

  it("should inherit traits", function(){
    let gene = new Gene(["hello", "world"])
    expect(gene.code.includes("hello")).toEqual(true)
    expect(gene.code.includes("world")).toEqual(true)
  });

  it("should generate code", function(){
    let gene = new Gene()
    let code = gene.sample(1)
    console.log("generated", code)
    expect(gene.sample(1).length).toEqual(1)
  })

  it("should mutate the code", function(){
    let gene = new Gene()
    let code = gene.code
    gene.mutate(4)
    expect(gene.code).not.toEqual(code)
  })

  it("should initialize", function(){
    let gene = new Gene()
    expect(gene.code.split(' ').length).toEqual(gene.size)
  })

})