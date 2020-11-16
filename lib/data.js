/*
 *  Library for storing and editing data
 *
 */

// Import dependencies
const fs = require("fs");
const path = require("path");

// Module container
const lib = {};

// Base directory of data folder
lib.baseDir = path.join(__dirname, "/../.data/");

// Write data file
lib.create = (dir, file, data, callback) => {
  // Open file for writing
  fs.open(`${lib.baseDir}${dir}/${file}.json`, "wx", (err, fileDescriptor) => {
    if (!err && fileDescriptor) {
      // Convert data to string
      const stringData = JSON.stringify(data);

      // Write file and close
      return fs.writeFile(fileDescriptor, stringData, (err) => {
        if (!err) {
          return fs.close(fileDescriptor, (err) => {
            if (!err) {
              return callback(false);
            }

            callback("Error closing new file");
          });
        }

        callback("Error writing new file");
      });
    }

    callback("Could not create new file, it may already exists");
  });
};

// Read data from file
lib.read = (dir, file, callback) => {
  fs.readFile(`${lib.baseDir}${dir}/${file}.json`, "utf8", (err, data) => {
    callback(err, data);
  });
};

// Update data inside file
lib.update = (dir, file, data, callback) => {
  // Open file for writing
  fs.open(`${lib.baseDir}${dir}/${file}.json`, "r+", (err, fileDescriptor) => {
    if (!err && fileDescriptor) {
      // Convert data to string
      const stringData = JSON.stringify(data);

      // Truncate file
      return fs.ftruncate(fileDescriptor, (err) => {
        if (!err) {
          // Write to file and close
          return fs.writeFile(fileDescriptor, stringData, (err) => {
            fs.close(fileDescriptor, (err) => {
              if (!err) {
                return callback(false);
              }

              callback("Error closing file");
            });
          });

          callback("Error writing to existing file");
        }

        callback("Error truncating file");
      });
    }

    callback("Could not open file for updating, it may not exists");
  });
};

// Delete file
lib.delete = (dir, file, callback) => {
  // Unlink file
  fs.unlink(`${lib.baseDir}${dir}/${file}.json`, (err) => {
    if (!err) {
      return callback(false);
    }

    callback("Error deleting file");
  });
};

// Export module
module.exports = lib;
