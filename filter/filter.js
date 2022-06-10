const CryptoJS = require("crypto-js");

const slowFilter = ({arr, id, key}) =>
  new Promise((resolve, reject) => {
    try {
      resolve(arr.filter(
        e => {
          // to slow down the function
          const left = CryptoJS.AES.encrypt(e['id'], 'key').toString();
          const right = CryptoJS.AES.encrypt(id, 'key').toString();
          return CryptoJS.SHA256(e['id']).toString() == CryptoJS.SHA256(id).toString()
        }
      )[1][key])
    } catch(e) {
      reject(e)
    }
  })


exports.slowFilter = slowFilter;
