'use strict;'
const uuidv4 = require('uuid/v4');

class BinaryTreeNode {

  constructor(value){
    this.id = uuidv4()
    this.value = value
  }

  getRight(){
    return this.right
  }

  getLeft(){
    return this.left
  }

  addLeft(value){
    this.left = new BinaryTreeNode(value)
  }

  addRight(value){
    this.right = new BinaryTreeNode(value)
  }

  setValue(value){
    this.value = value
  }

}

module.exports = BinaryTreeNode;