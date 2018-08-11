'use strict;'

var _ = require('lodash'),
	Mutate = require('./mutate')

class Model {

	constructor() {
		this.generations = undefined
		this.target = true
		this.parameters = []
		this.population = 10
		this.sleepFor = 0
		_.bindAll(this, 'where', 'run', 'populate', 'limit', 'produces', 'select')
	}

	run() {
		this.evolving = true;
		var trait = "";
		var count = 0;

		// initialize
		var agents = [];
		console.log(`Initialize ${this.population} agents...`)
		for(var i=0; i<this.population; i++) {
			agents.push({code: this.initialize()})
		}

		console.log("init agents", agents)

		console.log("generations", this.generations)
		
			if(this.sleepFor) {
				setInterval(function(){
					if(this.evolving && count < this.generations) {
						agents = this.select(agents)
						count++
						console.log("count " + count);
					}
				}.bind(this), this.sleepFor)
			} else {
				while(this.evolving) {
				agents = this.select(agents)
				count++;
				console.log("count " + count);
			}
			
		}
		return this
	}

	select(agents) {

			// rank genes
			agents.forEach((agent)=>{
				agent.rank = this.rank(agent)
			})
			
			agents = Mutate.sortByRank(agents)
			
			// evaulate goal
			if(agents[0].rank == Infinity){
				// we done it
				console.log("---------------- Result", agents[0].code)
				this.evolving = false
			}
			
			agents.forEach((agent)=>{
				console.log("code", agent.code, "rank", agent.rank, "valid", agent.isValid, "result", agent.result)
			})

			// Variation (crossover and mutation)
			//agents = Util.crossoverGeneration(agents).map((code)=>{ return {code}})
			agents = Mutate.cloneWithVariants(agents[0].code, 19, 2).map((code)=>{ return {code:code} })

			return agents
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

	initialize(fn){
		this.initialize = fn
		return this
	}

	from(data){
		this.data = data
		return this
	}

}

module.exports = new Model();