const stringify = (data) => new Promise((resolve, reject) => {
  try {
    const stringified = JSON.stringify(data)
    resolve(stringified);
  } catch (error) {
    reject(error);
  }
})

exports.stringify = stringify;
