const fs = require('fs');
const { data } = require('./parse/test-data/large-file')
const { stringify } = require('./parse/stringify');
const { stringifyWithWorker } = require('./parse/stringifyWithWorker');

(async () => {
  const iterations = 1;
  console.time('stringify for ' + iterations + ' times');
  let stringified;
  for(var i = 0; i < iterations; i++ ){
    stringified = await stringify(data)
  }
  // console.log('stringified', stringified)
  console.timeEnd('stringify for ' + iterations + ' times');

  let stringifiedByWorker;
  console.time('stringifyWithWorker for ' + iterations + ' times');
  for(var i = 0; i < iterations; i++ ){
    stringifiedByWorker = await stringifyWithWorker(data)
  }
  console.log('stringifiedByWorker', stringifiedByWorker)
  console.timeEnd('stringifyWithWorker for ' + iterations + ' times');
})()
