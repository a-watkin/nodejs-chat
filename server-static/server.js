var express = require('express')
var bodyParser = require('body-parser')
require('dotenv').config()

var app = express()



const db = ({
    user: process.env.DB_USERNAME,
    password: process.DB_PASSWORD
})

console.log(db.user)

var mongoose = require('mongoose')

// uses the node.js http server module passing in the express app
// make sure that it is with an uppercase S
var http = require('http').Server(app)

var io = require('socket.io')(http)

app.use(express.static(__dirname))
// app.use(bodyParser.json())
// var jsonParser = bodyParser.json()
// var urlencodedParser = bodyParser.urlencoded({ extended: true })
// app.use(bodyParser.json({ type: 'application/*+json' }))

app.use(bodyParser.json())
// without this line the app crashes
// above works without crashing but body is undifined coming from the browser only

// so it works now so above seems to be where the problem was
// i guess urlencoded is needed
app.use(bodyParser.urlencoded({extended: false}))

// code is wroking now, but the app crashes every other save
// i think this is due to nodemon and the port not being released fast enough
// because it is literally every other save that causes a crash



var dbUrl = "mongodb://@ds247479.mlab.com:47479/bobbytables"

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
    // req.body is empty here from the front end but ok from postman
    console.log('req.body', req.body.name)

    // recieves message from postman, pushes message onto messages array, which jquery gets on the front end
    messages.push(req.body)
    io.emit('message', req.body)
    res.sendStatus(200)
})

// logs a message anytime a client connects
io.on('connection', (socket) => {
    console.log('a user connected')
})

var server = http.listen(3000, () => {
    console.log('server is listening on port', server.address().port)
})

