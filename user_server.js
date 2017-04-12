'use strict';
const express = require('express');
const config = require('./config');
const DB = require('./modules/database');
const app = express();

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

const middlewareLogger = function(req, res, next) {
    console.log(`${new Date()}: ${req.url} client: ${req.ip} ${req.headers['user-agent']}`);
    next();
}

// about middleware libraries:
// I think there's a lot of nice libraries, but none of them really "took my breath away"
// most of the time, I would have a sense to look for a library like this
// and we also worker with a few of them in the class
// I suppose I would be using
//      - body-parser, cookie-parser
//      - serve-static, session, 
//      - express debug? 
//      - passport

// for loggin to files Winstonjs looks really nice 
// check https://github.com/winstonjs/winston
const logErrors = function(err, req, res, next) {
    console.error(err.stack);
    next(err);
}
const errorHandler = function(err, req, res, next) {
    res.status(500);
    res.send('error: There\'s been an error on server!');
}

app.use(middlewareLogger);
// error handlers should be the last ones!
app.use(logErrors);
app.use(errorHandler);


app.route('/user')
    .get(function(req, res) {

        const id = req.params.id;
        User.findById(id).exec().then((array) => {
            res.send(array);
        }).catch({
            next(err);
        });
    })
    .post(function(req, res) {
        User.create(req.body).then((post) => {
            res.send({
                status: 'OK',
                post: post
            });
        }).catch(() => {
            next(err);
        });
    })
    .put(function(req, res) {
        const id = req.params.id;
        User.update({
            _id: id
        }, {
            $set: req.body
        }, () => {
            res.send({
                status: 'OK'
            });
        }).catch({
            next(err);
        });
    })
    .delete(function(req, res) {
        const id = req.params.id;
        User.findById(id).remove().exec()
            .then(() => {
                res.send({
                    status: 'OK'
                });
            }).catch((err) => {
                next(err);
            });
    });