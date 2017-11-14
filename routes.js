'use strict'

module.exports = function(app) {
	app.use('/todo', require('./api/todo/index'));
}