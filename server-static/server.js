var express = require('express')
var bodyParser = require('body-parser')
var app = express()

app.use(express.static(__dirname))
app.use(bodyParser.json())

var messages = [
    {
        name: 'Bart',
        message: 'eat my shorts'
    },

    {
        name: 'Homer',
        message: 'doh'
    }
]

// url, request, response
app.get('/messages', (req, res) => {
    res.send(messages)
})

app.post('/messages', (req, res) => {
    // res.send(messages)
    console.log(req.body)
    // recieves message from postman, pushes message onto messages array, which jquery gets on the front end
    messages.push(req.body)
    res.sendStatus(200)
})

var server = app.listen(3000, () => {
    console.log('server is listening on port', server.address().port)
})

