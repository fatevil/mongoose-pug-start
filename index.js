'use strict';
const express = require('express');
const cookieParser = require('cookie-parser');
const moment = require('moment');
const app = express();
app.use(cookieParser());

app.get('/check', (req, res) => {
    console.log(req.cookies.myCookie);
    res.send(req.cookies.myCookie);
});

app.get('/*', (req, res) => {
    const param1 = req.path;
    const queryparams = req.query;
    const userAgentInfo = req.get('User-Agent');
    const ip = req.ip;



    res.cookie('myCookie', 'Floriana', { maxAge: 10000 });
    const requestCookie = req.cookies.myCookie;
    let responseMessage = '<a href=\"check\">check</a> Got to the root with path: ' + param1 + ' with query params: ' +
        JSON.stringify(queryparams) + '  ' + requestCookie + " " + moment(Date.now()).format() + "<br>" + userAgentInfo +
        '<br>' + ip;

    res.format({
        text: function() {
            res.send(responseMessage + " <br> TEXT");
        },

        html: function() {
            res.send(responseMessage + " <br> HTML");
        },

        json: function() {
            res.send(responseMessage + " <br> JSON)");
        }
    });

});
console.log('inspector started');
app.listen(3000);