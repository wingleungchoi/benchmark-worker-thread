const { Worker, isMainThread,  workerData } = require('worker_threads');
var path = require('path');

const stringifyWithWorker = (data) => {
  if (isMainThread) {
    // console.log("this is the main thread")
    return new Promise((resolve, reject) => {

      const wokrerFilePath = path.join(__dirname, 'stringifyWorker.js');
      const workerOne = new Worker(wokrerFilePath, { workerData: {data} });

      workerOne.on('message',(data) => {
        // console.log("worker done message", data)
        resolve(data);
      })
      
      workerOne.on('error',(err) => {
        // console.log(err);
        reject(err);
      })

      workerOne.on('exit',(code) => {
        if(code != 0) {
          console.error(`Worker stopped with exit code ${code}`)
          reject(err);
        }
      })
    })
  } else {
    return Promise.reject(new Error("Can only call encode() from main thread"));
  }
}

// (async () => {
//   await stringifyWithWorker('./inputs/example.jpg', 'example.png')
// })()

exports.stringifyWithWorker = stringifyWithWorker;
