var mongoose = require("mongoose");
mongoose.connect('mongodb://127.0.0.1:27017/work');
var Schema = mongoose.Schema;

var listSchema = new Schema ({
  "user_id" : String,
	"description" : String,
	"created_at" : { type: Date, default: Date.now }
});

var taskSchema = new Schema ({
  "list_id" : Schema.ObjectId,
  "description" : String,
  "complete" : Boolean,
  "created_at" : { type: Date, default: Date.now }
});


var memoSchema = new Schema ({
  "user_id" : String,
  "text" : String
});

var pomodoroSchema = new Schema({
  "user_id" : String,
  "work" : Number,
  "relax" : Number
});

module.exports = {
	list : mongoose.model('list',listSchema),
  task : mongoose.model('task',taskSchema),
  memo : mongoose.model('memo',memoSchema),
  pomodoro : mongoose.model('pomodoro',pomodoroSchema)
};
