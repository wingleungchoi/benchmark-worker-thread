const os = require('os');
const path = require('path');
const {data} = require('./test-data/large-file');
const { slowFilter } = require('./filter');
const { filterWithWorker } = require('./filterWithWorker');
const WorkerPool = require('./filterWorkerPool');

const pool = new WorkerPool(os.cpus().length, path.resolve(__dirname, 'filterWorkerOnMessage'));

const filterWithWorkerPool = async (data, pool) => {
  return await new Promise((resolve, reject) => {

    pool.runTask(data, (err, result) => {
      if (err) return reject(err)
      // console.log('result', result)
      return resolve(result)
    })
  })
}

(async () => {
  const testCases = [
    {arr: data, id: '2489651045', key: 'type'},
    {arr: data, id: '2489651062', key: 'type'},
    {arr: data, id: '2489651067', key: 'type'},
    {arr: data, id: '2489651078', key: 'type'},
    {arr: data, id: '2489651130', key: 'actor'},
    {arr: data, id: '2489666727', key: 'id'}
  ]

  // console.time('slowFilter');
  // const slowFilterWithoutWorkers = testCases.map(testCase => slowFilter(testCase))
  // const result0 = await Promise.all(slowFilterWithoutWorkers)
  // // console.log(JSON.stringify(result0))
  // console.timeEnd('slowFilter');

  // console.time('filterWithWorker');
  // const filterWithWorkerPromises = testCases.map(testCase => filterWithWorker(testCase))
  // const result1 = await Promise.all(filterWithWorkerPromises)
  // // console.log(JSON.stringify(result1))
  // console.timeEnd('filterWithWorker');

  console.time('filterWithWorkerPool');
  const filterWithWorkerPoolPromises = testCases.map(testCase => filterWithWorkerPool(testCase, pool))
  const result2 = await Promise.all(filterWithWorkerPoolPromises)
  // console.log(JSON.stringify(result2))
  console.timeEnd('filterWithWorkerPool');
})()
