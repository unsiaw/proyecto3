var express = require('express');
var controller = require('./controller');

var router = express.Router();

router.get('/', controller.list_all);
router.get('/:id', controller.list_one);
router.post('/:id', controller.create_comment);

module.exports = router;