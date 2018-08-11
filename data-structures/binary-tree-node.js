'use strict;'
const uuidv4 = require('uuid/v4');

class BinaryTreeNode {

  constructor(value){
    this.value = value
    this.left = null
    this.right = null
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