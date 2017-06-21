var express = require('express');
var controller = require('./controller');
var jwt = require('express-jwt');
var config = require('../../../config');

var router = express.Router();

router.get('/', controller.list_all);
router.get('/:id', controller.list_one);
router.post('/:id', jwt({secret: config.session.secret_key}), controller.create_comment);

module.exports = router;