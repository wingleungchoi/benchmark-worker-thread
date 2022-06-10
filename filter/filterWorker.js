const { workerData, parentPort, threadId } = require('worker_threads');
const { slowFilter } = require('./filter');

(async () => {
  const { arr, id, key } = workerData;
  // console.log(`running task on thread: ${threadId}`)
  const result = await slowFilter({ arr, id, key })
  parentPort.postMessage({ result: result, status : 'Done' })
})()

