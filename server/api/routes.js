const routes = require('express').Router();

routes.use('/user', require('./user/routes'));
routes.use('/ong', require('./ong/routes'));

module.exports = routes;
