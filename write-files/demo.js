var fs = require('fs')


var data = {
    name: 'test'
}

// you have to stringify to write it as json
fs.writeFile('data.json', JSON.stringify(data), (err) => {
    console.log('write finished', err)
})