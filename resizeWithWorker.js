const { Worker, isMainThread,  workerData } = require('worker_threads');

const resizeWithWorker = (inputFilePath, outputFileName) => {
  if (isMainThread) {
    // console.log("this is the main thread")
    return new Promise((resolve, reject) => {

      const workerOne = new Worker('./resizeWorker.js', { workerData: {inputFilePath, outputFileName} });

      workerOne.on('message',(data) => {
        // console.log("message", data)
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
//   await resizeWithWorker('./inputs/example.jpg', 'example.png')
// })()

exports.resizeWithWorker = resizeWithWorker;
