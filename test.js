const BinaryTree = require('./data-structures/binary-tree')

let mother = {
  value: '+',
  left: {
    value: 'x'
  },
  right: {
    value: '3'
  }
}

let father = {
  value: '-',
  left: {
    value: 'z'
  },
  right: {
    value: '4'
  }
}

let child = Object.assign({}, father)
child.right = mother.right


console.log('object' , child);

let motherTree = new BinaryTree(mother)
let fatherTree = new BinaryTree(father)
let childTree = new BinaryTree(Object.assign({}, fatherTree.root))

childTree.root.right = motherTree.root.right

console.log('tree' , child);
