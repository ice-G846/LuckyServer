'use strict';

var express = require('express');
var controller = require('./webapp_msg.controller.js');

var router = express.Router();

router.get('/', controller.getMsgList);
router.get('/getChance', controller.getChance);
router.post('/addMsg', controller.addMsg);
router.post('/addChance', controller.addChance);

module.exports = router;