// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

// Create instance of express
var app = express();

// Sets an initial port
var PORT = process.env.PORT || 3000;

// Run morgan for logging
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Set the public assets
app.use(express.static("./public"));

// MongoDB configuration with mongoose
mongoose.connect("mongodb://127.0.0.1:27017");
var db = mongoose.connection;

// Show any mongoose errors
db.on("error", function(error) {
	console.log("Mongoose Error: ", error);
});

// Once logged into the db through mongoose, log a success message
db.once("open", function() {
	console.log("Mongoose connection successful.");
});

// Model controllers
var articleRoute = require('./controllers/articleRoute');
var noteRoute = require('./controllers/noteRoute');
app.use('/', articleRoute);
app.use('/', noteRoute);

module.exports = app;

// Listener
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});