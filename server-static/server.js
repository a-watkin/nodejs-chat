var express = require('express')
var bodyParser = require('body-parser')

// for environment variables from .env file
require('dotenv').config()

const db = ({
    username: process.env.DB_USER,
    password: process.env.DB_PASS
})

var app = express()


// for mongodb
var mongoose = require('mongoose')

// make database connection
var dbUrl = `mongodb://${db.username}:${db.password}@ds139722.mlab.com:39722/bobbytables`

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


// removed because it's also deprechiated, but without some second argument
// there's a warning message 
// second argument
// useMongoClient: true
mongoose.connect(dbUrl, {}, (err) => {
    console.log('mongo db conncetions', err)
})


var Message = mongoose.model('Message', {
	name: String,
	message: String
})


// url, request, response
app.get('/messages', (req, res) => {
	// changed to get messages fromt he database
	// and then send them to the frontend
	Message.find({}, (err, messages) => {
		if(err) {
			console.log(err)
		}
		res.send(messages)
	})
    
})

app.post('/messages', (req, res) => {
	// new database object, req.body contains the same structure
	var message = new Message(req.body)

	message.save((err) => {
		if(err) {
			sendStatus(500)

		}

		// Nested callback example - difficult to understand due to nesting
		Message.findOne({message: 'badword'}, (err, censored) => {
			if(censored) {
				console.log('censored words found', censored)
				Message.remove({_id: censored.id}, (err) => {
					console.log('Removed censored message')
				})
			}
		})

		// res.send(messages)
	    // req.body is empty here from the front end but ok from postman
	    console.log('req.body', req.body.name)

	    io.emit('message', req.body)
	    res.sendStatus(200)
	})
})

// logs a message anytime a client connects
io.on('connection', (socket) => {
    console.log('a user connected')
})

var server = http.listen(3000, () => {
    console.log('server is listening on port', server.address().port)
})

