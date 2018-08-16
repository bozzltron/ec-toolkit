'use strict;'

var _ = require('lodash'),
	Mutate = require('./mutate')

class Model {

	constructor() {
		this.generations = Infinity
		this.target = true
		this.parameters = []
		this.population = 10
		this.sleepFor = 0
		_.bindAll(this, 'where', 'run', 'populate', 'limit', 'produces', 'select')
	}

	run() {
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
					agents.forEach(this._rankEach)
					agents = this._select(agents)
					agents = this._variate(agents)
					count++
					console.log("count " + count);
				}
			}.bind(this), this.sleepFor)
		} else {
			while(this.evolving && count < this.generations) {
				agents.forEach(this._rankEach)
				agents = this._select(agents)
				agents = this._variate(agents)
				count++;
				console.log("count " + count);
			}
		}

		return this
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

	where() {
		this.params = Array.from(arguments)
		return this; 
	}

	produces(target) {
		this.target = target
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

	initialize(fn){
		this.initialize = fn
		return this
	}

	getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max))
	}

}

module.exports = new Model();