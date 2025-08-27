const fs = require("fs").promises;

const getData = (path) => {
  return fs
    .readFile(path, "utf-8")
    .then((fileData) => {
      return JSON.parse(fileData);
    })
    .catch((error) => {
      throw new Error(`Failed to read or parse file ${path}: ${error.message}`);
    });
};

module.exports = { getData };
