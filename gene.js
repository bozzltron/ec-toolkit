'use strict;'

const characters = require('./data/ascii'),
	Mutate = require('./mutate'),
	_ = require('lodash');

class Gene {

	constructor(code, size) {
		this.code = code
		this.size = size || 20 
	
		if(!this.code) {
			this.code = Mutate.generateCode(this.size)
		} 
		
 	}

}

module.exports = Gene;