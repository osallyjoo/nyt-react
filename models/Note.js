// Require mongoose
var mongoose = require("mongoose");

var Schema = mongoose.Schema;

// Create the Note schema
var NoteSchema = new Schema({
	body: {
		type: String
	}
});

// Create the Note model with the NoteSchema
var Note = mongoose.model("Note", NoteSchema, "Note");

// Export the Note model
module.exports = Note;
