var express = require('express');
var controller = require('./controller');
var jwt = require('express-jwt');
var config = require('../../../config');

var router = express.Router();

router.get('/', jwt({secret: config.session.secret_key}), controller.list_all);
router.get('/:id', jwt({secret: config.session.secret_key}), controller.list_one);
router.post('/', jwt({secret: config.session.secret_key}), controller.create_user);
router.put('/:id', jwt({secret: config.session.secret_key}), controller.update_user);
//router.patch('/:id', controller.patch);
router.delete('/:id', jwt({secret: config.session.secret_key}), controller.delete_user);

module.exports = router;