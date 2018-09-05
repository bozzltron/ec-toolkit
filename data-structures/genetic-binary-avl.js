const _ = require('lodash'),
  Tree = require('avl'),
  util = require('../util')

class GeneticTree {

  constructor(ary){
    this.tree = new Tree()
    this.tree.load(ary)
  }

  generate(values, size){
    this.tree.load(_.sampleSize(values, size))
  }
  
  crossoverWith(dad) {
    let momKeys = this.tree.keys()
    let dadKeys = dad.tree.keys()
    let range = dadKeys.length > momKeys.length ? momKeys.length : dadKeys.length
    let index =  Math.floor(Math.random() * (range - 1) + 1)
    let momHalf = momKeys.slice(0, index)
    let dadHalf = dadKeys.slice(index)
    return new GeneticTree(momHalf.concat(dadHalf))
  }

  mutate(nodesToMutate, values, type){
    let ary = this.tree.keys(), index
    for(let i=0; i<nodesToMutate; i++){
      type = typeof(type) == 'number' ? type : Math.floor(Math.random() * Math.floor(2))
      switch(type){
        case 0: // add
          this.tree.insert(_.sampleSize(values, 1)[0])
          break;
        case 1: // swap 
          let mutation = _.sampleSize(values, 1)[0]
          index = util.getRandomNumberBetween(0, ary.length)
          ary[index] = mutation
          this.tree.destroy()
          this.tree.load(ary)
          break;
        case 2: // delete
          index = util.getRandomNumberBetween(0, ary.length)
          ary.splice(index, 1)
          this.tree.destroy()
          this.tree.load(ary)
          break;
      }
    }
  }

}

module.exports = GeneticTree