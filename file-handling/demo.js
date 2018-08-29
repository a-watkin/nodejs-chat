var fs = require('fs')

// require can be used to read json data as an object
var data = require('./data.json')
console.log(data.name)

// this returns just a string by default
fs.readFile('./data.json', 'utf-8', (err, data) => {
    // make it JSON
    var data = JSON.parse(data)
    console.log(data.name)
})

