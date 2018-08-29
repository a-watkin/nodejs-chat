var fs = require('fs')

fs.readdir('/home', (err, data) => {
    console.log(data)
})