const fs = require('fs');
const sharp = require('sharp');
const { workerData, parentPort } = require('worker_threads');

(async () => {
  const { inputFilePath, outputFileName } = workerData;
  // console.log('workerData', workerData)
  const dir = './outputs/worker/1time/'
  const outputFilePath = `${dir}/0_${outputFileName}`

  if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
  }
  await sharp(inputFilePath)
    .rotate()
    .resize(200)
    .png()
    .toFile(outputFilePath)
  parentPort.postMessage({ fileName: outputFilePath, status : 'Done' })
})()
