// repositories/fileRepository.js
const { none } = require("../config/file-upload-config");
const { File } = require("../models");
const fs = require("fs");
const path = require('path');

const saveFileDetails = async (fileDetails) => {
  try {
    return await File.create(fileDetails);
  } catch (error) {
    // Manejo de errores
    console.error("Error saving the file details...", error);
    return none;
  }
};

const cleanDirectory = (directory) => {
  fs.readdir(directory, (err, files) => {
    if (err) throw err;

    for (const file of files) {
      fs.unlink(path.join(directory, file), err => {
        if (err) throw err
      })
    }
  })
}

module.exports = { saveFileDetails, cleanDirectory };
