var express = require('express');
var router = express.Router();

var messagebroker = require('../service/messageBroker');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.json({ title: '-- Express --' });
    messagebroker.send({ test: 'test'});
});

module.exports = router;
