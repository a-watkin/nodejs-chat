fs = require('fs');

data = fs.readdirSync('/home');
console.log('data', data);

console.log('this comes after');