// Import Express
const express = require ('express')

// Import body parser
const bodyParser = require ('body-parser')

// import moongose
const mongoose = require('mongoose')

// initialize app
const app = express()

// import routes
const apiRoutes = require('./api-routes')

// configuration bodyparser
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// Connect Mongoose and set connection variable
mongoose.connect('mongodb://localhost/resthub');
let db = mongoose.connection;

// setup server port
var port = process.env.PORT || 8080;

// send message for default url
app.get('/', (req, res) => res.send('Hello World With Express and nodemon'));

// app apiRoutes
app.use('/api', apiRoutes);

// launch app to listen specified PORT
app.listen(port, function(){
    console.log(`Running Resthub on Port ${port}`)
});