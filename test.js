const Tree = require('AVL')

let mom = new Tree()
mom.load(Array.from('abcdef123456'))
console.log('mom', mom.keys())

let dad = new Tree()
dad.load(Array.from('ghijklnop789'))
console.log('dad', dad.keys())

let index =  Math.floor(Math.random() * (dad.keys().length - 1) + 1)
console.log("index", index)
let momHalf = mom.keys().slice(0, index)
let dadHalf = dad.keys().slice(index)
console.log("mom half", momHalf)
console.log("dadHalf", dadHalf)

let child = new Tree()
child.load(momHalf.concat(dadHalf))
console.log("child", child.keys())