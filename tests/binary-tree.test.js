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
    let branch = new BinaryTree(tree.prune())
    expect(branch.inOrderValues()).not.toEqual(tree.inOrderValues())
  })

  it("should generate a tree from a set of values", function(){
    let tree = new BinaryTree()
    tree.generate(['let', 'x','=', '3', ';', 'y', '-', '2', '/', '+'], 10, true)
    expect(tree.inOrderValues().length).toEqual(10)
  })

  it("should find a node in the tree", function(){
    let nodes = tree.inOrder()
    let id = nodes[3].id
    let node = tree.find(id, tree.root)
    expect(node).toEqual(nodes[3])
  })

  it("should crossover two trees resulting in a tree unique from its parents", function(){
    let values = ['let', 'x','=', '3', ';', 'y', '-', '2', '/', '+']
    let father = new BinaryTree()
    father.generate(values, 6, true)
    let mother = new BinaryTree()
    mother.generate(values, 6, true)
    console.log('father', father.inOrderValues())
    console.log('mother', mother.inOrderValues())
    let child = father.crossoverWith(mother)
    expect(child.inOrderValues()).not.toEqual(father.inOrderValues())
    //expect(child).not.toEqual(mother)
    console.log('crossover child', child.inOrderValues())
  })

})