let mongoose = require('mongoose');

const server = 'localhost:27017';
const database = 'rest-api-workshop';
const username = 'superuser';
const password = '14725800' ;

// url example mongodb+srv://username:password@server/db
mongoose.connect('mongodb://' + username + ':' + password + '@' + server + '/' + database);

let CustomerSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        require: true,
        unique: true
    }
});

module.exports = mongoose.model('Customer', CustomerSchema);