const BinaryTree = require('../data-structures/binary-tree'),
  BinaryTreeNode = require('../data-structures/binary-tree-node')

describe("BinaryTree", function(){

  let tree;

  beforeEach(function(){
    tree = new BinaryTree({
      value: ';',
      left: {
        value: '+',
        left: {
          value: 'x'
        },
        right: {
          value: '3'
        }
      },
      right: {
        value: '-',
        left: {
          value: 'y'
        },
        right: {
          value: '4'
        }
      }
    })
  })

  it("should initialize", function(){
    let root = {value: '+'}
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

  it("should crossover two trees resulting in a tree unique from its parents", function(){
    let values = ['let', 'x','=', '3', ';', 'y', '-', '2', '/', '+']
    let father = new BinaryTree()
    father.generate(values, 6, true)
    let mother = new BinaryTree()
    mother.generate(values, 6, true)
    console.log('father', father)
    console.log('mother', mother)
    let child = father.crossoverWith(mother)
    expect(child.inOrderValues()).not.toEqual(father.inOrderValues())
    expect(child.inOrderValues()).not.toEqual(mother.inOrderValues())
    console.log('crossover child', child)
    console.log('father', father)
  })

})