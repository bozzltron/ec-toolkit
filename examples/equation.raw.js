'use strict;'

let agents = [];
let population = 10;
let chars = "012345678+-/*";
let initialLength = 10;
let generations = 0;

function sample(ary, howMuch){
    howMuch = howMuch || 1;
    let sample = '';
    for(let i=0; i<howMuch; i++) {
      sample += ary[Math.floor(Math.random() * ary.length)];
    }
    return sample;
}

for(let i=0; i<population; i++) {
    let agent = {
        code: sample(chars, 10)
    }
    agents.push(agent);
}

console.log("initialized", JSON.stringify(agents, 2,2))

function evaluate(agent){

  agent.fitness = 0;

  try {
      agent.result = eval(agent.code);

      agent.fitness += agent.result != undefined ? 1 : 0;

      agent.fitness += typeof(agent.result) == 'number' ? 1 : 0;

      agent.fitness += Math.round( (1 /  Math.abs(42 - agent.result ) * 100)) 
  } catch(e) {

  }
}

agents.forEach(evaluate);

console.log("evaluated", JSON.stringify(agents, 2,2))

function notTerminating(){
  let filtered = agents.filter((agent)=>{  
    return agent.result == 42 
  });
  if(filtered.length  > 0){
    console.log("final result", filtered[0])
  }
  return filtered.length == 0
}

function getRandomNumberBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

function generateWeighedList(list, weight) {
  var weighed_list = [];
  for (var i = 0; i < weight.length; i++) {
      var multiples = weight[i] * 100;
       
      for (var j = 0; j < multiples; j++) {
          weighed_list.push(list[i]);
      }
  }
  return weighed_list;
}

function crossover(mom, dad) {
  let length = mom.code.length > dad.code.length ? dad.code.length : mom.code.length;
  let breakpoint = getRandomNumberBetween(1, length);
  dad = dad.code.split('').slice(0, breakpoint)
  mom = mom.code.split('').slice(breakpoint, mom.code.length);    
  return {code:dad.concat(mom).join('')}
}

function mutate (agent, charsToMutate, characters) {
  let type = getRandomNumberBetween(0,3)
  for(let i=0; i<charsToMutate; i++){
      let index = getRandomNumberBetween(0,agent.code.length-1)
      let mutation = sample(characters, 1)
    switch(type){
      case 0:
        // add 
        agent.code = agent.code.concat(mutation)
      break;
      case 1:
        // swap
        agent.code = agent.code.substr(0, index) + mutation + agent.code.substr(index + mutation.length);
      break;
      case 2:
        // remove
      agent.code = agent.code.slice(0,index) + agent.code.slice(index+1, agent.code.length)
      break
    }
 }
}

while(notTerminating()){

  // select parents
  agents = agents.sort((a, b)=>{ return b.fitness - a.fitness });
  let parents = agents.slice(0,8)
  
  console.log("parents", parents)

  let offspring = [];
  let newAgents = 10;

  for(let i=0; i<newAgents; i++){
      let mom = getRandomNumberBetween(1, parents.length-1)
      let dad = getRandomNumberBetween(1, parents.length-1)
      while(dad == mom){
          dad = getRandomNumberBetween(1, parents.length-1)
      }
      offspring.push(crossover(parents[mom], parents[dad]))
  }

  console.log('offspring', offspring)

  agents = offspring;
  agents.forEach(evaluate);
  agents = agents.sort((a, b)=>{ return b.fitness - a.fitness });
  agents = agents.slice(0, 10);

  let mutationRate = 0.1;
  let mutations = getRandomNumberBetween(0, Math.round(offspring.length * mutationRate));
  for(let i=0; i<mutations; i++) {
    let index = getRandomNumberBetween(0, offspring.length-1);
    mutate(offspring[index], 1, chars);
  }
  
  console.log('selected', agents)
  console.log("generations", generations);
  generations++

}