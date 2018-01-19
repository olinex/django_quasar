var
  shell = require('shelljs'),
  path = require('path');

shell.rm('-rf', path.resolve(__dirname, '../static/*')); //changed
shell.rm('-rf', path.resolve(__dirname, '../static/.*')); //changed
console.log(' Cleaned build artifacts.\n');
