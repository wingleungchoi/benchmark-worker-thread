const { workerData, parentPort, threadId } = require('worker_threads');

(async () => {
  const { data } = workerData;
  // console.log(`running task on thread: ${threadId}`)
  const stringified = await (new Promise((resolve, reject) => {
    try {
      const stringified = JSON.stringify(data)
      resolve(stringified);
    } catch (error) {
      reject(error);
    }
  }))
  parentPort.postMessage({ stringified: stringified, status : 'Done' })
})()

