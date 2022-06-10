const { parentPort, threadId } = require('worker_threads');
const { slowFilter } = require('./filter');

parentPort.on('message', async (task) => {
  const { arr, id, key } = task
  // console.log(`running task on thread: ${threadId}`)
  const result = await slowFilter({ arr, id, key })
  parentPort.postMessage({ result: result, status : 'Done' })
})
