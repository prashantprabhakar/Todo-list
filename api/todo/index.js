'use strict'


var express = require('express'),
	router = express.Router(),
	controller = require('./tasks.controller');


router.post('/addTask', controller.addTask);
router.post('/deleteTask', controller.deleteTask);
router.post('/updateTask', controller.updateTask);
router.get('/taskList', controller.taskList);

module.exports = router;
