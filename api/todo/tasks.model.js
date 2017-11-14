'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema,
    SchemaTypes = Schema.Types;

var TasksSchema = new Schema({  
  type: String,
  name: String,
  description:String,
  isActive: {type:Boolean, default: true},
  createdAt: {type: Date, default: Date.now},
  updatedAt : {type: Date, default: Date.now},  
  category: String
});

module.exports = mongoose.model('Tasks', TasksSchema);