'use strict';

const config = require('./config');

const express = require('express');
const multer = require('multer')
const DB = require('./modules/database');

const app = express();

// handle multipart/form-data
const upload = multer();

// serve files
app.use(express.static('public'));

// connect to DB
const dbPromise = new Promise(
    (resolve, reject) => {
        DB.connect('mongodb://'+config.user+':'+config.pwd+'@localhost/alakerta', resolve, reject)
    });

dbPromise.then((msg) => {
    console.log(msg);
    app.listen(3000);
}).catch((reason) => {
    console.log(reason);
});
// end connect to DB


const catSchema = {
    name: String,
    age: Number,
    gender: {
        type: 'String',
        enum: ['male', 'female']
    },
    color: String,
    weight: Number
};

const Cat = DB.getSchema('Cat', catSchema);

app.post('/cats', upload.array(), (req, res) => {
    console.log(req.body);
    Cat.create(req.body).then(post => {
        res.send({status: 'OK', post: post});
    }).catch(() => {
        res.send({status: 'error', message: 'Database error'});
    });
});


