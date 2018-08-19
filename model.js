'use strict;'

var _ = require('lodash')

class Model {

	constructor() {
		this.generations = Infinity
		this.target = true
		this.population = 10
		this.sleepFor = 0
		_.bindAll(this, 'run', 'populate', 'limit', 'select')
	}

	run() {

		return new Promise(function(resolve, reject) {
			
			this.evolving = true;
			let count = 0;
	
			// initialize
			let agents = []
			for(var i=0; i<this.population; i++) {
				agents.push(this._initializeEach())
			}
	
			console.log(`Initialize ${this.population} agents...`)
	
			console.log(`limit to ${this.generations} generations..`)
			
			if(this.sleepFor) {
				setInterval(function(){
					if(this.evolving && count < this.generations) {
						agents.forEach((agent)=>{ 
							this._rankEach(agent)
							if(this._terminate(agent)) {
								this.evolving = false
								resolve(agent)
							}
						})
						agents = this._select(agents)
						agents = this._variate(agents)
						count++
						console.log("count " + count);
					}
				}.bind(this), this.sleepFor)
			} else {
				while(this.evolving && count < this.generations) {
					agents.forEach((agent)=>{ 
						this._rankEach(agent)
						if(this._terminate(agent)) {
							this.evolving = false
							resolve(agent)
						}
					})
					agents = this._select(agents)
					agents = this._variate(agents)
					count++;
					console.log("count " + count);
				}
			}			

		}.bind(this));

	}

	initializeEach(fn){
		this._initializeEach = fn
		return this
	}

	rankEach(fn){
		this._rankEach = fn
		return this
	}

	limit(generations) {
		this.generations = generations 
		return this
	}

	populate(population){
		this.population = population
		return this
	}

	sleep(sec) {
		this.sleepFor = sec * 1000;
		return this;
	}

	rank(fn) {
		this.rank = fn
		return this
	}

	select(fn){
		this._select = fn
		return this
	}

	variate(fn) {
		this._variate = fn
		return this
	}

	terminate(fn) {
		this._terminate = fn
		return this
	}

	initialize(fn){
		this.initialize = fn
		return this
	}

	getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max))
	}

}

module.exports = new Model();