const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/likeliontest') ;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
    console.log("Mongo DB ON");
});

let Post = new mongoose.Schema({
    id:String,
    title:String,
    content:String,
    created_time:String,
    updated_time:String,
});

let postModel = mongoose.model('postModel',Post);

exports.Post = postModel;