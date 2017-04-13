const express = require('express');

module.exports = (function() {
    'use strict';
    const router = express.Router();

    router.post(function(req, res) {
        User.create(req.body).then((post) => {
            res.send({
                status: 'OK',
                post: post
            });
        }).catch((err) => {
            next(err)
        });
    })
    router.route('/')
        .get(function(req, res) {

            const id = req.params.id;
            User.findById(id).exec().then((array) => {
                res.send(array);
            }).catch((err) => {
                next(err)
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
            }).catch((err) => {
                next(err)
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
                    next(err)
                });
        });
    return router;
})();