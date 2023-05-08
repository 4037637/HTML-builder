const fs = require('fs');
const path = require('path');

fs.readdir(path.join(__dirname, '/secret-folder'), {withFileTypes: true}, (err, files) => {
    if (err) return err
    else {
      files.forEach(file => {
        if (!file.isDirectory()) {
          var filePath = path.join(__dirname, '/secret-folder/', file.name)
          fs.stat(filePath, (err, stats) => {
            console.log(file.name = file.name.split('.')[0] + ' - ' + path.parse(filePath).ext.replace('.', '') + ' - ' + stats.size + 'b')
          })
        };
      })
    };
  }
)