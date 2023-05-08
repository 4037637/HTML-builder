const fs = require('fs');
const process = require('node:process');
const path = require('path');
const { stdin, stdout } = process;
const destination = fs.createWriteStream(path.join(__dirname, 'destination.txt'));

stdout.write('Здравствуйте. Введите, что нужно добавить\n');
stdin.on('data', data => {
  if (data.toString().trim() === 'exit') {
    process.exit();
  } else {
    stdout.write('Ответ успешно записан. Введите, что нужно добавить\n');
    destination.write(data)
  }
});

process.on('exit', () => stdout.write('Спасибо за внимание. До свидания!'));
process.on('SIGINT', () => process.exit());