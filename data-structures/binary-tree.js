const BinaryTreeNode = require('./binary-tree-node'),
  _ = require('lodash')

class BinaryTree {

  constructor(root){
    this.root = root
  }

  generate(values, range, exact) {
    let size = exact ? range : Math.floor((Math.random() * range) + 1)
    let ary = []
    for(let i=0; i<size; i++){
      let value = _.sampleSize(values, 1)[0]
      ary.push(new BinaryTreeNode(value))
    }
    console.log(ary)
    this.root = this.addBranches(ary)
  }

  addBranches(ary){
    if(ary.length == 0) return
    let middle = ary.length > 1 ? Math.round(ary.length / 2) : 0;
    console.log('middle', middle, 'node', ary[middle])
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
    let withoutRoot = _.remove(this.inOrder(), (node)=>{ return node.parent != null})
    let sample =  _.sampleSize(withoutRoot, 1)[0]
    let node = Object.assign({}, sample)
    node.parent = null
    return new BinaryTree(node)
  }

  inOrder(){
    let ary = []
    this.walkInOrder(Object.assign({}, this.root), ary)
    return ary
  }

  inOrderValues(){
    return this.inOrder().map((node)=>{ return node.value })
  }

  walkInOrder(node, ary) {
    if(!node) return
    if(node.left){
      this.walkInOrder(node.left, ary)
    } 
    ary.push(node)
    if(node.right) {
      this.walkInOrder(node.right, ary)
    } 
  }

}

module.exports = BinaryTree;