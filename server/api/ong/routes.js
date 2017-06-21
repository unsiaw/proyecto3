var express = require('express');
var controller = require('./controller');
var jwt = require('express-jwt');
var config = require('../../../config');

var router = express.Router();

router.get('/', controller.list_all);
router.get('/:id', controller.list_one);
router.post('/', jwt({secret: config.session.secret_key}), controller.create_ong);
router.put('/:id', jwt({secret: config.session.secret_key}), controller.update_ong);
//router.patch('/:id', controller.patch);
router.delete('/:id', jwt({secret: config.session.secret_key}), controller.delete_ong);

module.exports = router;