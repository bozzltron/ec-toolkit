'use strict;'

const operators = require('./data/operators'),
	reserved = require('./data/reserved'),
	characters = require('./data/characters'),
	_ = require('lodash');

let blocks = [].concat(reserved, operators, characters);

class Gene {

	constructor(trait, target, size) {
		this.target = target
		this.trait = trait || []
		this.library = blocks.concat(this.trait)
		this.size = size || 20 
		if(this.trait.length == 0) {
			this.generate()
		} else {
			this.code = this.trait.join(" ")
		}
		this.evaluate()
 	}

	sample(size) {
		size = size || this.size
		return _.sampleSize(this.library, size)
	}

	generate(){
	    this.code = this.sample().join(" ")
	    return this.code
	}

	mutate(numOfChars) {
		let ary = this.code.split(" ")
		for(let i=0; i<numOfChars; i++){
			let index = this.getNumberBetween(0, ary.length);
			ary[index] = this.sample(1)[0]
			this.code = ary.join(" ")
		}
	}

	getNumberBetween(min,max) {
    	return Math.floor(Math.random()*(max-min+1)+min);
	}

	evaluate () {
		try {
			this.solution = Function(this.code);
			console.log('evaluate', typeof(this.solution), this.solution, this.code)
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