const express = require('express')

module.exports = (function() {
    'use strict';
    const router = express.Router();

    // Registred cizizens of Finland
    router.get('/citizens', function(req, res) {
        res.send('Taija, Meri, Ursula, Oskari');
    })

    // Registered people living in Finland, not cizizens
    router.get('/foreigners', function(req, res) {
        res.send('Marek, Florian, Robin, Abdul');
    })
    return router;
})();