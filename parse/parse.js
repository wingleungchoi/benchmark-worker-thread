const parse = (jsonString) => new Promise((resolve, reject) => {
  try {
    const data = JSON.parse(jsonString)
    resolve(data);
  } catch (error) {
    reject(error);
  }
})

exports.parse = parse;
