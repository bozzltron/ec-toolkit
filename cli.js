const moduleName = process.argv[2],
  OptimizeModel = require('./optimize'),
  optimize = process.argv.includes('--optimize')

let Model, config = {}

try {
  Model = require(`./examples/${moduleName}.js`)
} catch(e) {
  console.log(`Could not find ${moduleName}`)
}

async function run() {

  if(optimize){
    console.log("optimizing...")
    let optimized = await new OptimizeModel({model:Model}).run()
    config = optimized.config
    config.generations = Infinity
    config.log = true
    console.log("optimized config", config)
  } else {
    let result = await new Model(config).run()
    console.log("FINAL RESULT", result)
  }
  
}

run()


