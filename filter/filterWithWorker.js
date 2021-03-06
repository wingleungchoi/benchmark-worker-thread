const { Worker, isMainThread,  workerData } = require('worker_threads');
var path = require('path');

const filterWithWorker = ({arr, id, key}) => {
  if (isMainThread) {
    // console.log("this is the main thread")
    return new Promise((resolve, reject) => {

      const workerFilePath = path.join(__dirname, 'filterWorker.js');
      const workerOne = new Worker(workerFilePath, { workerData: {arr, id, key} });

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
//   await filterWithWorker('./inputs/example.jpg', 'example.png')
// })()

exports.filterWithWorker = filterWithWorker;
