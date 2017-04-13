const express = require('express')

module.exports = (function() {
    'user strict';
    const router = express.Router();

    // Large available apartmets with space over 40 square meter (Large)
    router.get('/large', function(req, res) {
        res.send('Timpurinkuja 1A 15, Timpurinkuja 1A 16, Timpurinkuja 1A 17');
    });

    // Middle available apartmets with space between 20 and 40 square meter
    router.get('/middle', function(req, res) {
        res.send('Albertinkatu 8 45, Bulevardi 14');
    });

    // Small available apartmets with less than 20 and 40 square meter space
    router.get('/middle', function(req, res) {
        res.send('Timpurinkuja 2B, Albertinkatu 7 41, Bulevardi 15');
    });
    return router;

})();