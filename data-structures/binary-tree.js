const BinaryTreeNode = require('./binary-tree-node')

class BinaryTree {

  constructor(root){
    this.root = root
  }

  pluck(){

  }

  inOrder(){
    let ary = []
    this.walkInOrder(Object.assign({}, this.root), ary)
    return ary.map((node)=>{ return node.value })
  }

  walkInOrder(node, ary) {
    if(node.left && !node.walked){
      return this.walkInOrder(node.left, ary)
    } else if(node.right && !node.walked) {
      return this.walkInOrder(node.right, ary)
    } else {
      if(!node.walked) {
        ary.push(node)
        node.walked = true
        return this.walkInOrder(node.parent, ary)
      }
    }
  }

}

module.exports = BinaryTree;