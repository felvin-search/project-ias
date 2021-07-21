const mongoose = require('mongoose');
const Schema = mongoose.Schema

const userSchema = new Schema({
    'email': String,
    'password': String,
    'prelims': Array,
    'mains': Array
})

const UserModel = mongoose.model('User', userSchema )
exports.UserModel = UserModel

