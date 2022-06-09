const { workerData, parentPort } = require('worker_threads');

(async () => {
  const { data } = workerData;
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

