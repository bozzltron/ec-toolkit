'use strict;'

const cTable = require('console.table'),
	 AsyncFunction = Object.getPrototypeOf(async function(){}).constructor,
	 util = require('./util')

class Model {

	constructor(config) {
		this.sleepFor = 0
		this.config = Object.assign({}, {
			generations: Infinity,
			population: 0,
			keep: 0,
			crossovers: 0,
			mutations: 0,
			log:true,
			values: []
		}, config)
	}

	run() {

		return new Promise(async function(resolve, reject) {
			
			this.evolving = true;
			this.count = 0;
	
			// initialize
			let agents = []
			for(var i=0; i<this.config.population; i++) {
				agents.push(this.initializeEach.bind(this)())
			}
	
			if(this.config.log) {
				console.log(`Initialize ${this.config.population} agents...`)
				console.log(`limit to ${this.config.generations} generations...`)
			}

			try {
				while(this.evolving && this.count < this.config.generations) {
					for(let i=0; i<agents.length; i++){
						let agent = agents[i]
						this.rankEach instanceof AsyncFunction ? await this.rankEach(agent) : this.rankEach(agent)
						if(this.terminate(agent)) {
							this.evolving = false
							resolve(Object.assign({},agent), this.count)
							break
						}
					}
					agents = this.sort(agents)
					this.log(agents)
					let parents = this.select(agents)
					let offspring = this.crossover(parents)
					offspring = this.mutate(offspring)
					agents = parents.concat(offspring)
					this.count++
				}
				if(this.evolving) {
					resolve(agents[0])
				}
			} catch(e){
				reject(e)
			}
			
		}.bind(this));

	}

	sort(agents){
		return agents.sort((a, b)=>{ return b.rank - a.rank })
	}

	select(agents){
		return agents.slice(0, this.config.keep)
	}

	crossover(agents){
		let offspring = []
    for(let i=0; i<this.config.crossovers; i++){
      let mom = util.getRandomNumberBetween(0, agents.length)
			let dad = util.getRandomNumberBetween(0, agents.length)
			while(dad == mom){
        dad = util.getRandomNumberBetween(0, agents.length)
      }
      offspring.push(agents[mom].crossoverWith(agents[dad]))
		}
		return offspring		
	}

	mutate(agents){
    for(let i=0; i<this.config.mutations; i++){
      let index = util.getRandomNumberBetween(0, agents.length)
      agents[index].mutate(1, this.config.values)
		}
		return agents		
	}

	log(agents){
		if(this.config.log){
			console.table(agents)
		}
	}

}

module.exports = Model