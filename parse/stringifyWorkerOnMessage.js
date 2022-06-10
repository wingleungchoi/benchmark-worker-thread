const { parentPort, threadId } = require('worker_threads');

parentPort.on('message', (task) => {
  const { data } = task
  // console.log(`running task on thread: ${threadId}`)
  // console.log('data', data)
  const stringified = JSON.stringify(data)
  // console.log('stringified', stringified)
  // console.log('stringified', { stringified: stringified, status : 'Done' })
  parentPort.postMessage({ stringified: stringified, status : 'Done' })
})
