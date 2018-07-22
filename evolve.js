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
				
		return arr[0];
	}

	run() {
		// establish problem : calculate 42
		var evolving = true;
		var trait = "";
		var count = 0;
		
		while(evolving && count < this.generations) {

			// assign agents
			var agents = [];
			for(var i=0; i<3; i++) {
				let gene = new Gene(trait.split(" "), this.target, count)
				gene.mutate(1)
				agents.push(gene)
			}

			var agent = this.select(agents)

			console.log(JSON.stringify(agents.map((agent)=>{ return { 
				code: agent.code,
				solution: agent.solution
			} }), 2, 2))

			console.log("Selected ", agent.code)

			if(agent.solution == this.target) {
				evolving = false;
			}

			if(agent.solution) {
				trait = agent.code;
			}

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
		console.log("produces");
		this.target = target
	  this.run()
		return this
	}

}

module.exports = new Evolve();