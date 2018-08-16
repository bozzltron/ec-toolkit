const BinaryTree = require('../data-structures/binary-tree'),
  objectAssignDeep = require('object-assign-deep')

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

  it("should find a parent node", function(){
    tree = new BinaryTree({
      "value": ";",
      "id": "f4e7200e-f157-448b-b5b2-512aaef6873f",
      "left": {
        "value": "y",
        "id": "dc1abed5-97ad-48d6-8210-4fd18830a023",
        "left": {
          "value": "+",
          "id": "bdbd7ab0-752b-4b1b-985e-42dddab27cbe",
          "left": {
            "value": "/",
            "id": "9c54cb02-08b7-4efd-86a8-0d0c0e7f5de8"
          }
        }
      },
      "right": {
        "value": "+",
        "id": "77f48854-653a-42cd-8e65-47c061af9d72",
        "left": {
          "value": "+",
          "id": "e8dfb146-893f-4524-8c7d-00720cfe1988"
        }
      }
    })

    let result = {}
    tree.findParent('e8dfb146-893f-4524-8c7d-00720cfe1988', tree.root, result)
    expect(result).toEqual({ node:
      { value: '+',
        id: '77f48854-653a-42cd-8e65-47c061af9d72',
        left: { value: '+', id: 'e8dfb146-893f-4524-8c7d-00720cfe1988' } },
     direction: 'left' })
  })

  it("should crossover two trees resulting in a tree unique from its parents", function(){
    let values = ['let', 'x','=', '3', ';', 'y', '-', '2', '/', '+']
    let father = new BinaryTree()
    father.generate(values, 6, true)
    let mother = new BinaryTree()
    mother.generate(values, 6, true)
    let child = father.crossoverWith(mother)
    expect(child.inOrderValues()).not.toEqual(father.inOrderValues())
    expect(child.inOrderValues()).not.toEqual(mother.inOrderValues())
  })

  it("should append node", function(){
    let copy = new BinaryTree()
    copy.root = objectAssignDeep({}, tree.root)
    tree.appendNode(['let', 'x','=', '3', ';', 'y', '-', '2', '/', '+'])
    expect(tree.inOrderValues().length > copy.inOrderValues().length).toEqual(true)
  })

  it("should delete node", function(){
    let copy = new BinaryTree()
    copy.root = objectAssignDeep({}, tree.root)
    tree.deleteNode()
    expect(tree.inOrderValues().length < copy.inOrderValues().length).toEqual(true)
  })

  it("should mutate by appending a new node", function(){
    let copy = new BinaryTree()
    copy.root = objectAssignDeep({}, tree.root)
    tree.mutate(1, ['let', 'x','=', '3', ';', 'y', '-', '2', '/', '+'], 0)
    expect(tree.inOrderValues().length > copy.inOrderValues().length).toEqual(true)
  })

  it("should mutate by swapping an old value for a new value", function(){
    let copy = new BinaryTree()
    copy.root = objectAssignDeep({}, tree.root)
    tree.mutate(1, ['swap', 'values'], 1)
    expect(tree.inOrderValues()).not.toEqual(copy.inOrderValues())
  })

  it("should mutate by deleting", function(){
    let copy = new BinaryTree()
    copy.root = objectAssignDeep({}, tree.root)
    tree.mutate(1, ['let', 'x','=', '3', ';', 'y', '-', '2', '/', '+'], 2)
    expect(tree.inOrderValues().length < copy.inOrderValues().length).toEqual(true)
  })

})