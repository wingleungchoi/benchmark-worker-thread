const path = require('path');
const os = require('os');
const { data } = require('./test-data/large-file')
const { stringify } = require('./stringify');
const { stringifyWithWorker } = require('./stringifyWithWorker');
const WorkerPool = require('./stringWorkerPool');

(async () => {
  console.log('os.cpus().length', os.cpus().length);
  const pool = new WorkerPool(6, path.resolve(__dirname, 'parse', 'stringifyWorkerOnMessage'));
  
  const stringifyWithWorkerPool = async (data) => {
    return await new Promise((resolve, reject) => {
  
      pool.runTask(data, (err, result) => {
        if (err) return reject(err)
        // console.log('result', result)
        return resolve(result)
      })
    })
  }

  const iterations = 20;

  // console.time('stringify for ' + iterations + ' times');
  // let stringified;
  // const promisesWithoutWorkers = []
  // for(var i = 0; i < iterations; i++ ){
  //   // stringified = await stringify(data)
  //   promisesWithoutWorkers.push(stringify(data))
  // }
  // await Promise.all(promisesWithoutWorkers)
  // // console.log('stringified', stringified)
  // console.timeEnd('stringify for ' + iterations + ' times');

  // let stringifiedByWorker;
  // console.time('stringifyWithWorker for ' + iterations + ' times');
  // const promisesWithNewWorkers = []
  // for(var i = 0; i < iterations; i++ ){
  //   // stringifiedByWorker = await stringifyWithWorker(data)
  //   promisesWithNewWorkers.push(stringifyWithWorker(data))
  // }
  // await Promise.all(promisesWithNewWorkers)
  // // console.log('stringifiedByWorker', stringifiedByWorker)
  // console.timeEnd('stringifyWithWorker for ' + iterations + ' times');

  // let stringifiedByWorkerPool;
  // console.time('stringifyWithWorkerPool for ' + iterations + ' times');
  // const promisesWithWorkerPool = [];
  // for(var i = 0; i < iterations; i++ ){
  //   // stringifiedByWorkerPool = await stringifyWithWorkerPool({data})
  //   promisesWithWorkerPool.push(stringifyWithWorkerPool({data}))
  // }
  // await Promise.all(promisesWithWorkerPool)
  // // console.log('stringifiedByWorkerPool on line 45', stringifiedByWorkerPool)
  // console.timeEnd('stringifyWithWorkerPool for ' + iterations + ' times');
})()
