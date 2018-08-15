for(let i=0; i<100; i++){
  let proximity = Math.round( (1 /  Math.abs(42 - i ) * 1000)) 
  console.log(`${i} proximity to 42 is ${proximity}`)
}