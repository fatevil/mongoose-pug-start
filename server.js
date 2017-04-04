'use strict';

const config = require('./config');
const express = require('express');
const DB = require('./modules/database');
const multer = require('multer');
const upload = multer();

const app = express();
app.set('view engine', 'pug');

// serve files
app.use(express.static('public'));

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


const catSchema = {
    name: String,
    age: Number,
    gender: {
        type: 'String',
        enum: ['male', 'female'],
    },
    color: String,
    weight: Number,
};

const Cat = DB.getSchema('Cat', catSchema);

app.post('/cats', upload.array(), (req, res) => {
    console.log('POST');

    const newCat = req.body;

    delete newCat._id;

    console.log(newCat);

    Cat.create(req.body).then((post) => {
        res.send({
            status: 'OK',
            post: post
        });
    }).catch(() => {
        res.send({
            status: 'error',
            message: 'Database error'
        });
    });
});

app.patch('/cats', upload.array(), (req, res) => {
    console.log('PUT');

    const catId = req.body._id;

    const catData = req.body;
    delete catData._id;

    Cat.update({
        _id: catId
    }, {
        $set: catData
    }, () => {
        console.log('Cat updated');
        res.send({
            status: 'OK'
        });
    });
});

app.delete('/cats/:catId', (req, res) => {
    console.log(req.params);

    const catId = req.params.catId;

    console.log('DELETE cat ' + catId);

    Cat.findById(catId).remove().exec()
        .then(() => {
            res.send({
                status: 'OK'
            });
        }).catch((err) => {
            res.json(err);
        });
});

app.get('/cats', (req, res) => {
    Cat.find().exec().then((posts) => {
        res.send(posts);
    });
});

app.get('/cats/pug', function(req, res) {

    Cat.find().exec().then((array) => {
        res.render('index', {
            title: 'Hey',
            message: 'Hello there!',
            posts: array
        })
    });
})