const fs = require("fs");

const getData = (path, cb) => {
  fs.readFile(path, "utf-8", (err, fileData) => {
    if (err) return cb(err, null);
    try {
      cb(null, JSON.parse(fileData));
    } catch (err) {
      return cb(new Error("Could not read file"), null);
    }
  });
};

module.exports = { getData };
