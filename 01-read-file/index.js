const path = require('path');
const fs = require('fs');

const readableFile = fs.createReadStream(path.join(__dirname, '/text.txt'));
let readableText = '';
readableFile.on('data', chunk => readableText += chunk);
readableFile.on('end', () => console.log(readableText));