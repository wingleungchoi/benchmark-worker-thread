const fs = require('fs');
const sharp = require('sharp');

const resize = async (inputFilePath, outputFileName) => {
  const dir = './outputs/1time/'
  if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
  }
  await sharp(inputFilePath)
  .rotate()
  .resize(200)
  .png()
  .toFile(`./outputs/0_${outputFileName}`)
}

const resize10Times = async (inputFilePath, outputFileName) => {
  const dir = './outputs/10times'
  if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
  }
  const arr = new Array(10).fill(0)
  const promises = arr.map((e, index) => {
    return sharp(inputFilePath)
    .rotate()
    .resize(200)
    .png()
    .toFile(`${dir}/${index}_${outputFileName}`)
  })
  await Promise.all(promises)
}

exports.resize = resize;
exports.resize10Times = resize10Times;
