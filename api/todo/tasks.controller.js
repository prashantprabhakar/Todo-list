'use strict';

var Task = require('./tasks.model');
var TaskService = require('./tasks.service');
let co = require('co');

exports.taskList = function(req,resp,next){
	TaskService.getTaskList(function(taskData, err1){
		if(err1) return resp.status(200).json({error:true, message:err1 });
		return resp.status(200).json({error:false, data: taskData});
	});
}

exports.addTask =  function(req, resp){
	console.log("Code reached inside add task function");
	console.log(req.body);
	//console.log(if(req.body));
	//console.log(if(req.body != 'undefined'));
	if(req.body != 'undefined'){
		console.log(true);	
	}
	else{
		console.log(false);
	}
	co(function*(){
		if(req.body != 'undefined'){
			// check for basic validations
			if(!req.body.name)
				return resp.status(200).json({error: true, message:'Task name is required'});
			var task = req.body;
			console.log(task);			
			TaskService.saveTask(task.name, task.description, function(resp1,err1){
				if(err1) return resp.status(200).json({error:true, message:err1 });
				return resp.status(200).json({error:false, message:resp1});
			});
		}
		else{
			return resp.status(200).json({error:true, message:'Required params are missing in request'});
		}		
	});
}

exports.updateTask = function(req,resp, next){
	co(function*(){
		if(req.body && req.body != 'undefined'){
			var id = req.body.id;
			if(!id || !req.body.updatedName || !req.body.updatedDescription){
				return resp.status(401).send({error: true, message: 'missing params'});
			}

			var updatedTask = {
				name : req.body.updatedName,
				description : req.body.updatedDescription
			}
			TaskService.updateTask(id, updatedTask, function(err1, res1){
				if(err1) return resp.status(200).json({error:true, message:err1 });
				return resp.status(200).json({error:false, message:res1});
			});
		}
	});
}

exports.deleteTask = function(req, resp, next){
	co(function*(){
		if(req.body && req.body != 'undefined'){
			if(!req.body.id)
				return resp.status(200).json({error:true, 'message': 'Id is mendatory for deletion of record'});
			var id = req.body.id;
			TaskService.deleteTask(id, function(res1, err1){
				if (err1) {
		            return resp.status(200).json({error: true,message: err});
		        } else {
		            return resp.status(200).json({error: false,message: 'Deleted Successfully'});
		        }
			});			
		}
		else{
			return resp.status(200).json({error:true, message:'Required params are missing in request'});
		}
	});
}
