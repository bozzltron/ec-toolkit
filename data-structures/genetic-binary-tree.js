const _ = require('lodash'),
  objectAssignDeep = require('object-assign-deep'),
  uuidv4 = require('uuid/v4');

class GeneticBinaryTree {

  constructor(root){
    this.root = root
    if(this.root){
      this.root.isRoot = true
      if(!this.root.id) {
        this.inOrder((node)=>{ 
          node.id = uuidv4()
          return node
        })
      }
    }
  }

  generate(values, range, exact='false') {
    let size = exact ? range : Math.floor((Math.random() * range) + 1)
    let ary = []
    for(let i=0; i<size; i++){
      ary.push(this.createNode(values))
    }
    this.root = this.addBranches(ary)
    this.root.isRoot = true
  }
  
  createNode(values){
    let value = _.sampleSize(values, 1)[0]
    return {
      value: value,
      id: uuidv4()
    }
  }

  addBranches(ary){
    if(ary.length == 0) return
    let middle = ary.length > 1 ? Math.round(ary.length / 2) : 0
    let root = ary[middle]
    if(ary.length > 1) {
      root.left = this.addBranches(ary.slice(0, middle))
      root.right = this.addBranches(ary.slice(middle + 1))
    }
    return root
  }

  size(){
    return this.inOrder().length
  }

  prune(){
    let ary = this.inOrder().filter((node)=>{ return !node.isRoot})
    let sample =  _.sampleSize(ary, 1)[0]
    return Object.assign({}, sample)
  }

  inOrder(fn){
    let ary = []
    this.walkInOrder(this.root, ary, fn)
    return ary
  }

  inOrderValues(fn){
    return this.inOrder(fn).map((node)=>{ return node.value })
  }

  walkInOrder(node, ary, fn) {
    if(!node) return
    if(node.left){
      this.walkInOrder(node.left, ary, fn)
    } 
    ary.push(fn ? fn(node) : node)
    if(node.right) {
      this.walkInOrder(node.right, ary, fn)
    } 
  }

  crossoverWith(tree) {
    let child = new GeneticBinaryTree()
    child.root = objectAssignDeep({}, this.root)
    let removalPrune = child.prune()
    let replacementPrune = tree.prune()
    let result = {}
    this.findParent(removalPrune.id, child.root, result)
    result.node[result.direction] = replacementPrune
    return child
  }

  findParent(id, node, result){
    if(node.left && node.left.id == id){
      result.node = node
      result.direction = 'left'
      return result 
    }
    if(node.right && node.right.id == id){
      result.node = node
      result.direction = 'right'
      return result 
    }
    if(node.left) this.findParent(id, node.left, result)
    if(node.right) this.findParent(id, node.right, result)
  }

  toJSON(){
    return JSON.stringify(this.root, 2, 2)
  }

  appendNode(values, ary){
    ary = ary || this.inOrder()
    ary = ary.filter((node)=>{ return !node.left || !node.right })
    if(!ary[0].left) {
      ary[0].left = this.createNode(values)
    } else if(!ary[0].right) {
      ary[0].right = this.createNode(values)
    }
    return ary
  }

  deleteNode(ary){
    ary = ary || this.inOrder()
    ary = ary.filter((node)=>{ return node.left || node.right })
    if(ary[0].left) {
      delete ary[0].left
    } else if(ary[0].right) {
      delete ary[0].right
    }
    return ary
  }

  mutate(nodesToMutate, values, type){
    let ary = this.inOrder(), index
    for(let i=0; i<nodesToMutate; i++){
      type = typeof(type) == 'number' ? type : Math.floor(Math.random() * Math.floor(2))
      switch(type){
        case 0: // add
          ary = this.appendNode(values, ary)
          break;
        case 1: // swap 
          let mutation = _.sampleSize(values, 1)[0]
          index = this.getRandomInt(ary.length)
          ary[index].value = mutation
          break;
        case 2: // delete
          this.deleteNode(ary)
          break;
      }
    }
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max))
  }
  
}

module.exports = GeneticBinaryTree;