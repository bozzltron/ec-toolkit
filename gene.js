'use strict;'

const characters = require('./data/ascii'),
	Util = require('./util'),
	_ = require('lodash');

class Gene {

	constructor(code, target, size) {
		this.target = target
		this.size = size || 20 

		if(!code) {
			this.generate()
		} else {
			this.code = code
		}
		this.evaluate()
 	}

	generate(){
			this.code = Util.sample().join("")
	    return this.code
	}

	evaluate () {
		try {
			this.solution = Function(this.code);
			if(typeof(this.solution) == 'function') {
				this.rank = 2
				if(this.solution() === this.target){
					this.rank = 3
				}			
			} else if(typeof(this.solution) != undefined){
				this.rank = 1 
			}
		} catch(e) {
			this.solution = undefined;
			this.rank = 0
		}
	}

}

module.exports = Gene;