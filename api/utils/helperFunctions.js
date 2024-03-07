const fs = require("fs");

const reformatFileName = (file) => {
  const { originalname, path } = file;
  const parts = originalname.split(".");
  const ext = parts[parts.length - 1];
  const newPath = path + "." + ext;
  fs.renameSync(path, newPath);
  return newPath;
};

module.exports = reformatFileName;
