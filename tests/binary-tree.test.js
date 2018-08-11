const BinaryTree = require('../data-structures/binary-tree'),
  BinaryTreeNode = require('../data-structures/binary-tree-node')

describe("BinaryTree", function(){

  it("should initialize", function(){
    let root = new BinaryTreeNode('+')
    let tree = new BinaryTree(root)
    expect(tree.root).toEqual(root);
  })

  it("should walk in order", function(){
    let root = new BinaryTreeNode('+')
    root.addLeft('x')
    root.addRight('y')
    let tree = new BinaryTree(root)
    expect(tree.inOrder()).toEqual(['x', '+', 'y'])
  })

})