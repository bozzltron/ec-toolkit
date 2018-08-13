const BinaryTreeNode = require('./binary-tree-node'),
  _ = require('lodash'),
  objectAssignDeep = require('object-assign-deep'),
  uuidv4 = require('uuid/v4');

class BinaryTree {

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
      let value = _.sampleSize(values, 1)[0]
      ary.push({
        value: value,
        id: uuidv4()
      })
    }
    this.root = this.addBranches(ary)
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
    let child = new BinaryTree(Object.assign({}, this.root))
    let removalPrune = child.prune()
    console.log('removalPrune', removalPrune)
    let replacementPrune = tree.prune()
    console.log('replacementPrune', replacementPrune)
    let result = this.findParent(removalPrune.id, this.root)
    result.node[result.direction] = replacementPrune
    return child
  }

  findParent(id, node){
    if(node.left && node.left.id == id){
      return {node:node, direction:'left'}
    }
    if(node.right && node.right.id == id){
      return {node:node, direction:'right'}
    }
    if(node.left) this.findParent(id, node.left)
    if(node.right) this.findParent(id, node.right)
  }

}

module.exports = BinaryTree;