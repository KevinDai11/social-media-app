const {model, Schema} = require('mongoose');

const userSchema = new Schema({  //create a new schema for user
    username: String,
    password: String,
    email: String,
    createdAt: String,

});

module.exports = model('User', userSchema);