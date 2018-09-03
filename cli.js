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
    console.log("optimized", optimized)
  } else {
    let model = new Model(config)
    let result = await model.run()
    console.log("FINAL RESULT", result)
    console.log("generations", model.count)
  }
  
}

run()


