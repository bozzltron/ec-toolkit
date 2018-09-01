'use strict;'

const cTable = require('console.table'),
	 AsyncFunction = Object.getPrototypeOf(async function(){}).constructor

class Model {

	constructor(config) {
		this.sleepFor = 0
		this.config = Object.assign({}, {
			generations: Infinity,
			population: 0,
			keep: 0,
			crossovers: 0,
			mutations: 0,
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
			
			if(this.sleepFor) {
				setInterval(function(){
					if(this.evolving && this.count < this.config.generations) {
						for(let i=0; i<agents.length; i++){
							let agent = agents[i]
							this.rankEach(agent)
							if(this.terminate(agent)) {
								this.evolving = false
								resolve(agent, this.count)
							}
						}
						agents = this.select(agents)
						agents = this.variate.bind(this)(agents)
						this.count++
					}
				}.bind(this), this.sleepFor)
			} else {
				while(this.evolving && this.count < this.config.generations) {
					for(let i=0; i<agents.length; i++){
						let agent = agents[i]
						this.rankEach instanceof AsyncFunction ? await this.rankEach(agent) : this.rankEach(agent)
						if(this.terminate(agent)) {
							this.evolving = false
							resolve(agent, this.count)
						}
					}
					agents = this.select(agents)
					agents = this.variate.bind(this)(agents)
					this.count++;
				}
			}			
			resolve(agents[0], this.count)
		}.bind(this));

	}

	sleep(sec) {
		this.sleepFor = sec * 1000;
		return this;
	}

	select(agents){
		agents = agents.sort((a, b)=>{ return b.rank - a.rank })
		return agents.slice(0, this.config.keep)
	}

	variate(agents){
    for(let i=0; i<this.config.crossovers; i++){
      let mom = util.getRandomNumberBetween(0, agents.length)
      let dad = util.getRandomNumberBetween(0, agents.length)
      agents.push(agents[mom].crossoverWith(agents[dad]))
		}
    for(let i=0; i<this.config.mutations; i++){
      let index = util.getRandomNumberBetween(0, agents.length)
      agents[index].mutate(1, this.config.values)
    }
		return agents
	}

	logEach(agents){
		let table = agents.map((agent)=>{
      return { code:agent.code.substring(0,50), length:agent.code.length,  result:agent.result,  matches: agent.matches, rank: agent.rank}
    })
    console.table(table)
	}

}

module.exports = Model;