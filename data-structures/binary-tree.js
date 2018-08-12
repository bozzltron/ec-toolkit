const BinaryTreeNode = require('./binary-tree-node'),
  _ = require('lodash'),
  objectAssignDeep = require('object-assign-deep')

class BinaryTree {

  constructor(root){
    this.root = root
  }

  generate(values, range, exact='false') {
    let size = exact ? range : Math.floor((Math.random() * range) + 1)
    let ary = []
    for(let i=0; i<size; i++){
      let value = _.sampleSize(values, 1)[0]
      ary.push(new BinaryTreeNode(value))
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
    let ary = this.inOrder()
    let sample =  _.sampleSize(ary, 1)[0]
    return Object.assign({}, sample)
  }

  inOrder(){
    let ary = []
    this.walkInOrder(this.root, ary)
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

  crossoverWith(tree) {
    let child = new BinaryTree(this.root)
    let removalPrune = child.prune()
    console.log('removalPrune', new BinaryTree(removalPrune).inOrderValues())
    let replacementPrune = tree.prune()
    console.log('replacementPrune', new BinaryTree(replacementPrune).inOrderValues())
    let nodeToBeReplaced = child.find(removalPrune.id, child.root)
    console.log('tobereplaced', nodeToBeReplaced)
    nodeToBeReplaced = replacementPrune
    console.log('tobereplaced2', nodeToBeReplaced)
    return child
  }

  find(id, object){
    // let found
    // let ary = this.inOrder()
    // let i = 0
    // let node = ary[i]
    // while(node.id != id){
    //   i++
    //   node = ary[i]
    // }
    // return node
    
    if(object.id == id) return object
    if(object.left) this.find(id, object.left)
    if(object.right) this.find(id, object.right)
    
  }

  findAndReplace(id, find, replace) {

  }

}

module.exports = BinaryTree;