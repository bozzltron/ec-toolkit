const BinaryTree = require('../data-structures/binary-tree'),
  BinaryTreeNode = require('../data-structures/binary-tree-node')

describe("BinaryTree", function(){

  let tree;

  beforeEach(function(){
    let root = new BinaryTreeNode(';')
    root.addLeft('+')
    root.getLeft().addLeft('x')
    root.getLeft().addRight('3')
    root.addRight('-')
    root.getRight().addLeft('y')
    root.getRight().addRight('4')
    tree = new BinaryTree(root)
  })

  it("should initialize", function(){
    let root = new BinaryTreeNode('+')
    tree = new BinaryTree(root)
    expect(tree.root).toEqual(root);
  })

  it("should walk in order", function(){
    expect(tree.inOrderValues()).toEqual(['x', '+', '3', ';', 'y', '-', '4'])
  })

  it("should prune a subtree from a tree", function(){
    let branch = tree.prune();
    expect(branch.inOrderValues()).not.toEqual(tree.inOrderValues())
  })

  it("should generate a tree from a set of values", function(){
    let tree = new BinaryTree()
    tree.generate(['let', 'x','=', '3', ';', 'y', '-', '2', '/', '+'], 10, true)
    console.log("generated tree", JSON.stringify(tree, 2, 2))
    expect(tree.inOrderValues().length).toEqual(10)
  })

})