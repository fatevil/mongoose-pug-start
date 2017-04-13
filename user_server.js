'use strict';
const express = require('express');
const config = require('./config');
const DB = require('./modules/database');
const app = express();

const users = require('./routes/users');
const people = require('./routes/people');
const apartments = require('./routes/apartments');

// connect to DB
const dbPromise = new Promise(
    (resolve, reject) => {
        DB.connect('mongodb://' + config.user + ':' + config.pwd + '@localhost/cats', resolve, reject)
    });

dbPromise.then((msg) => {
    console.log(msg);
    app.listen(3000);
}).catch((reason) => {
    console.log(reason);
});
// end connect to DB

const userSchema = {
    name: String,
    password: String
};
const User = DB.getSchema('User', userSchema);
app.use('/apartments', apartments);
app.use('/people', people);
app.use('/users', users);

// about middleware libraries:
// I think there's a lot of nice libraries, but none of them really "took my breath away"
// most of the time, I would have a sense to look for a library like this
// and we also worker with a few of them in the class
// I suppose I would be using
//      - body-parser, cookie-parser
//      - serve-static, session, 
//      - express debug? 
//      - passport

// for logging to files Winstonjs looks really nice 
// check https://github.com/winstonjs/winston
app.use((req, res, next) => {
    console.log(`${new Date()}: ${req.url} client: ${req.ip} ${req.headers['user-agent']}`);
    next();
});
app.use((err, req, res, next) => {
    res.status(500);
    res.send('error: There\'s been an error on server!');
});



//app.use(router);