var express = require('express')
var bodyParser = require('body-parser')

const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';

// for environment variables from .env file
require('dotenv').config()

const db = ({
    username: process.env.DB_USER,
    password: process.env.DB_PASS
})

// console.log(db)

var app = express()
app.disable('x-powered-by')

// for mongodb
const mongoose = require('mongoose');
var Schema = mongoose.Schema;

// tell mongoose to use default es6 promise library
mongoose.Promise = Promise

// TODO: replace this with a docker container
// make database connection
// var dbUrl = `mongodb://${db.username}:${db.password}@ds139722.mlab.com:39722/bobbytables`

var dbUrl = "mongodb://localhost:27017"

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

var session = require('express-session')


// The empty object here is due to a deprechated method.
mongoose.connect(dbUrl, {}, (err) => {
    console.log('mongo db conncetions', err)
})

var Message = mongoose.model('Message', {
	name: String,
	message: String
})

// A schema mpas to a mongodb colelctions
var userSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// The model.
var User = mongoose.model('User', userSchema);

// This is a problem because I define it everytime the app restarts and it's saving data.
// var user = new User({name: "A", password: "test"})
// var testSave = user.save()
// console.log('wat ', testSave)

// Write a functiont to insert users if they're not already there.
let insertUsers = function() {
	// query for the users
	var result = User.findOne({name: 'J'});
	console.log('result ', result)
}

// insertUsers()


const users = {
	"A": "$pbkdf2-sha512$25000$5LyXkpLyvte6V4oxxjhn7A$A.qsFPYjIESoubZ0.QOlRLKrBnQF91zeXPswUpRmyvEXjh1cS5RKicN5skfDMEdDFGmsDRq1NgGN9biXxcLTTg"
}

bcrypt.compare("", users['A'], function (err, result) {
	// result == true
	console.log('result ', result)
});


// url, request, response
app.get('/messages', (req, res) => {
	// changed to get messages from the database
	// and then send them to the frontend
	Message.find({}, (err, messages) => {
		if(err) {
			console.log(err)
		}
		console.log('messages ', messages)
		res.send(messages)
	})
})

// this doesn't really do anything?
app.get('/messages/:user', (req, res) => {
	Message.find({}, (err, messages) => {
		if(err) {
			console.log(err)
		}
		console.log('sending messages ')
		res.send(messages)
	})
})

// app.get('login', (req, res) => {

// })


app.post('/messages', async (req, res) => {
	try {
		// new database object, req.body contains the same structure
		// req.body is: [Object: null prototype] { name: 'A', message: 'test' }
		var message = new Message(req.body)

		// Saves the message in the db using a promise.
		// The variable savedMessage isn't used.
		var savedMessage = await message.save()
		io.emit('message', req.body)
		res.sendStatus(200)

	} catch (error) {
		res.sendStatus(500)
		return console.error(error)
	} finally {
		// call logger maybe, or close recourse
		// console.log('hello from finally')
	}
})

app.post('/delete', (req, res) => {
	// console.log('test')

	Message.remove({}, (err) => {
		if(err) {
			// console.log(err)
			res.sendStatus(500)
		} else {
			// console.log('it worked?')
			io.emit('delete-messages')
			res.sendStatus(200)
		}
	})

})

// logs a message anytime a client connects
io.on('connection', (socket) => {
	console.log('a user connected')
})

var server = http.listen(3000, () => {
    console.log('server is listening on port', server.address().port)
})
