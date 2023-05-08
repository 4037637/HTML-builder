/* Import necessary modules */

const fs = require('fs');
const path = require('path');

/* Create project-dist folder */

const projectDistPath = path.join(__dirname, "/project-dist")
fs.rm(projectDistPath, { recursive: true }, err => {
  fs.mkdir(projectDistPath, { recursive: true }, err => {
    if (err) throw Error('Folder was not created');
    createFiles()
  });
})

function createFiles() {

  /* Create index.html */

  const indexPath = path.join(__dirname, "/project-dist/index.html")
  const tempPath = path.join(__dirname, "/template.html")
  const componentsPath = path.join(__dirname, "/components")

  const indexStream = fs.createWriteStream(indexPath)
  const tempStream = fs.createReadStream(tempPath)

  var readTempText = ""
  tempStream.on('data', chunk => readTempText += chunk);
  tempStream.on('end', function () {

    fs.readdir(componentsPath, { withFileTypes: true }, (err, files) => {
      if (err) throw new Error("Components folder was not found")
      else {
        for (let i = 0; i < files.length; i++) {
          let filePath = path.join(componentsPath, "/", files[i].name)

            let fileName = files[i].name.split('.')[0];
            let readFileText = ""
            let fileStream = fs.createReadStream(filePath)
            fileStream.on('data', chunk => readFileText += chunk);
            fileStream.on('end', function () {
              if (path.parse(filePath).ext === ".html") {
                readTempText = readTempText.replace(`{{${fileName}}}`, readFileText)
              }
              if (i === files.length - 1) {
                indexStream.write(readTempText)
              }
            })
          
        }
      }
    })
  })

  // indexStream.write(finalText)
  /* Create style.css */

  const stylePath = path.join(projectDistPath, "/style.css")
  const styleCSS = fs.createWriteStream(stylePath);
  const stylesFolder = path.join(__dirname, "/styles");

  fs.readdir(stylesFolder, function (err, files) {
    for (var i = 0; i <= files.length; i++) {
      var filePath = stylesFolder + '/' + files[i];
      if (path.parse(filePath).ext === ".css") {
        fs.readFile(filePath, 'utf8', function (err, data) {
          data += "\n"
          styleCSS.write(data);
        });
      }
    }
    console.log('File style.css was created');
  });

  /* Copy assets to project-dist folder */

  const newAssetsPath = path.join(projectDistPath, "/assets")
  const oldAssetsPath = path.join(__dirname, "/assets")

  function copyFolder(oldPath, newPath) {
    fs.mkdir(newPath, { recursive: true }, err => {
      if (err) throw Error('CopyFolder was not created');
      console.log('CopyFolder was created')
    });
    fs.readdir(oldPath, { withFileTypes: true }, (err, files) => {
      if (err) throw Error("Old assets folder doesn't exist")
      else {
        files.forEach(file => {
          var fileOldPath = path.join(oldPath, "/", file.name)
          var fileNewPath = path.join(newPath, "/", file.name)
          if (file.isDirectory()) {
            copyFolder(fileOldPath, fileNewPath)
          } else {
            fs.copyFile(fileOldPath, fileNewPath, err => {
              if (err) throw Error("Copying went wrong")
            })
          }
        })
      }
    })
  }

  copyFolder(oldAssetsPath, newAssetsPath)

}