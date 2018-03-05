'use strict'

var Tasks = require('./tasks.model'),
	mongoose = require('mongoose');

var TasksService = function(){
	var _self = this;

	_self.saveTask = function(name, description, cb){
		Tasks.create({
			'name': name,
			'description' :  description
		}, function(err, id){
			if(err) {return cb('Unable to save to DB')};
			return cb('Task added successfully');
		});
	}

	_self.taskList = function(cb){
		Tasks.find({isActive: true}).sort({'createdAt':-1}).exec(function(err, taskData){
			if(err) return cb("Unable to get task list");
			return cb(taskData);
		});
	}

	_self.updateTask = function(id,  updatedTask, cb){
		Tasks.findOneAndUpdate({_id:id},updatedTask,function(err, res){
			if(err) { return cb("Unable to update")};
			return cb("successfully updated");
		});
	}

	_self.deleteTask = function(id,cb){
		Tasks.findOneAndUpdate({_id:id},{isActive: false}, function(err,res){
			if (err) {
		        return cb('Unable to delete');
		    }
		    return cb('successfully deleted');
		    
		});
	}	
	return {
		'saveTask' : _self.saveTask,
		'deleteTask' : _self.deleteTask,
		'updateTask' : _self.updateTask,
		'getTaskList' : _self.taskList
	}
}

module.exports = new TasksService();

