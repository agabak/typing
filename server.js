(function(){
  'use strict';
   let express = require('express'),
       path = require('path'),
       bodyParser = require('body-parser'),
       port = process.env.PORT | 8080,
       app = express();

       app.use(express.static(path.join(__dirname)));
       app.use(bodyParser.json());

       app.listen(port,function(error){
           if(error) throw new Error('Its not working');
           console.log('Server running at port ' + port)
       });
}());