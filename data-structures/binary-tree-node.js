class BinaryTreeNode {

  constructor(value){
    this.value = value
  }

  hasLeft(){
    return this.left != undefined
  }

  hasRight(){
    return this.right != undefined
  }

  getRight(){
    return this.right
  }

  getLeft(){
    return this.left
  }

  addLeft(value){
    this.left = new BinaryTreeNode(value)
    this.left.parent = this
  }

  addRight(value){
    this.right = new BinaryTreeNode(value)
    this.right.parent = this
  }

  setValue(value){
    this.value = value
  }

}

module.exports = BinaryTreeNode;