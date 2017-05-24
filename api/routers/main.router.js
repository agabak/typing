(function(){
	'use strict'
 var express = require('express'),
		router = express.Router();

        let  data= [
             {title:'express'},
             {title:'express1'},
             {title:'express2'},
             {title:'express3'}
        ]
	
	/*Main Router */
	router.get('/',function(req,res){
		res.json(data)
	});

	/* Get New Note Router */
	router.get('/users',function(req,res){
		res.json({title:'express from user controller'})
	});
	
	/* Get New Note Router */
	router.post('/login',function(req,res){
	  return registerController.getUsers(req,res)
	});

	
	 /*POST NEW Notes Router */
	router.post('/user',function(req,res){
		return registerController.create(req,res)
	}); 
	
	module.exports = router;
}());