const {data} = require('./test-data/large-file');
const path = require('path');
const { slowFilter } = require('./filter');
const { filterWithWorker } = require('./filterWithWorker');

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
  // const result = await Promise.all(slowFilterWithoutWorkers)
  // console.log(JSON.stringify(result))
  // console.timeEnd('slowFilter');

  console.time('filterWithWorker');
  const filterWithWorkerPromises = testCases.map(testCase => filterWithWorker(testCase))
  const result = await Promise.all(filterWithWorkerPromises)
  console.log(JSON.stringify(result))
  console.timeEnd('filterWithWorker');
})()
