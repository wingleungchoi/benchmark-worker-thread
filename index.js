const Benchmark = require('benchmark');
const { resize, resize10Times } = require('./resize');
const { resizeWithWorker } = require('./resizeWithWorker');
var suite = new Benchmark.Suite;

// // add tests
// suite.add('async resize', async function() {
//   await resize('./inputs/example.jpg', 'example.png')
// })
// .add('async resize 10 times', async function() {
//   await resize10Times('./inputs/example.jpg', 'example.png')
// })
// // add listeners
// .on('cycle', function(event) {
//   console.log(String(event.target));
// })
// .on('complete', function() {
//   console.log('Fastest is ' + this.filter('fastest').map('name'));
// })
// // run async
// .run({ 'async': true });

(async () => {
  const iterations = 100;
  console.time('resize');
  for(var i = 0; i < iterations; i++ ){
    await resize('./inputs/example.jpg', 'example.png')
  }
  console.timeEnd('resize')

  console.time('resize10Times');
  for(var i = 0; i < iterations; i++ ){
    await resize10Times('./inputs/example.jpg', 'example.png')
  }
  console.timeEnd('resize10Times');

  console.time('resizeWithWorker');
  for(var i = 0; i < iterations; i++ ){
    await resizeWithWorker('./inputs/example.jpg', 'example.png')
  }
  console.timeEnd('resizeWithWorker')
})()
