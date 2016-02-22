var mongoose = require("mongoose");
mongoose.connect('mongodb://192.168.0.4:27017/work');
var Schema = mongoose.Schema;

var listSchema = new Schema ({
  "user_id" : Schema.ObjectId,
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
  "user_id" : Schema.ObjectId,
  "text" : String
});

module.exports = {
	list : mongoose.model('list',listSchema),
  task : mongoose.model('task',taskSchema),
  memo : mongoose.model('memo',memoSchema)
};
