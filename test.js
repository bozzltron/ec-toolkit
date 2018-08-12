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