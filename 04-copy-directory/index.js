const fs = require('fs');
const path = require('path');

var pathToNewFolder = path.join(__dirname, '/files-copy')
var pathToOldFolder = path.join(__dirname, '/files')

function copyDir(oldFolderPath, newFolderPath) {

fs.rm(newFolderPath, {recursive: true}, err => {
  fs.mkdir(newFolderPath, {recursive: true}, err => {
    if (err) throw Error('Folder was not created');
    console.log('Folder was created')
  });
  fs.readdir(oldFolderPath, {withFileTypes: true}, (err, files) => {
    if (err) throw Error("This folder doesn't exist")
    else {
      files.forEach(file => {
        var filePath = path.join(oldFolderPath, '/', file.name)
        var fileNewPath = path.join(newFolderPath, '/', file.name)
        fs.copyFile(filePath, fileNewPath, err => {
          if (err) throw Error("Copying went wrong")
        }
        )
      })
    }
  })
})

}

copyDir(pathToOldFolder, pathToNewFolder)