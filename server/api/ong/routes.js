var express = require('express');
var controller = require('./controller');

var router = express.Router();

router.get('/', controller.list_all);
router.get('/:id', controller.list_one);
router.post('/', controller.create_ong);
router.put('/:id', controller.update_ong);
//router.patch('/:id', controller.patch);
router.delete('/:id', controller.delete_ong);

module.exports = router;