const fs = require('fs');
const path = require('path');

const bundlePath = path.join(__dirname, "/project-dist/bundle.css")
const bundle = fs.createWriteStream(bundlePath);
const Stylesfolder = path.join(__dirname, "/styles");

fs.readdir(Stylesfolder, function (err, files) {
  for (var i = 0; i <= files.length; i++) {
    var filePath = Stylesfolder + '/' + files[i];
    if (path.parse(filePath).ext === ".css") {
      fs.readFile(filePath, 'utf8', function (err, data) {
        data = "\n" + data + " "
        bundle.write(data);
      });
    }
  }
  console.log('file has been created');
});