const fs = require("fs");

const getData = (path) => {
  const fileData = fs.readFileSync(path, "utf-8");
  return JSON.parse(fileData);
};

module.exports = { getData };
