'use strict;'

var Gene = require('./gene'),
	_ = require('lodash')

class Evolve {

	constructor() {
		this.generations = 1
		this.target = true
		this.parameters = []
		_.bindAll(this, 'where', 'run')
	}

	select(arr) {
		var fnIndex = -1;
		var curr = arr[0];
		var index = 0;
		arr = arr.sort((a, b)=>{
			return b.rank - a.rank
		})
				
		return arr.slice(0, Math.round(arr.length/2))
	}

	run() {
		var evolving = true;
		var trait = "";
		var count = 0;

		// initialize
		var agents = [];
		for(var i=0; i<this.population; i++) {
			agents.push(new Gene())
		}

		while(evolving && count < this.generations) {

			var best = this.select(agents)

			for(let i=0; i<best.length-1; i+=2){
				
			}

			console.log(JSON.stringify(agents.map((agent)=>{ return { 
				code: agent.code,
				solution: agent.solution
			} }), 2, 2))

			console.log("Selected ", agent.code)

			if(agent.rank == 1) {
				evolving = false;
			}

			trait = agent.code

			count++;
			console.log("count " + count);
		}
	}

	limit(generations) {
		this.generations = generations || 100000
		return this
	}

	where() {
		this.params = Array.from(arguments)
		return this; 
	}

	produces(target) {
		this.target = target
	  this.run()
		return this
	}

	populate(population){
		this.population = this.population
		return this
	}

}

module.exports = new Evolve();