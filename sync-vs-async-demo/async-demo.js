fs = require('fs');

function phoneNumber(err, data) {
    console.log('data:', data);
}

fs.readdir('/home', phoneNumber);


// console.log('data', data);

console.log('this comes after');