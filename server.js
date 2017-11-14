const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
// Tell the express to make folder accessible to public
app.use(express.static('public'));

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/to-do-list',(err, database)=>{
	if(err) return console.log(err);
	db = database;
	// start server onl when db is connected
	app.listen(3001, function(){
		console.log("Running on port 3001");
	})
});

require('./routes')(app);

app.get("/", function(req, res){
	//res.send("Hello");
	res.sendFile(__dirname+'/index.html');
});

app.post('/test',function(req,res){
	console.log(req.body);
});
