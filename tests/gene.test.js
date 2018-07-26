const Gene = require('../gene');

describe("Gene", function(){

  it("should generate code", function(){
    let gene = new Gene()
    expect(gene.code.length > 0).toEqual(true)
  })

  it("should inherit traits", function(){
    let gene = new Gene("hello world")
    expect(gene.code == "hello world").toEqual(true)
  });

})