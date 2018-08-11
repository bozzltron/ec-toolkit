var BinaryTree = require('./data-structures/binary-tree')
 
var binaryTree = new BinaryTree({
  value: '+',
  parent: null,
  left: { value: 'x' },
  right: { value: 'y'}
})

console.log(binaryTree.inOrder());