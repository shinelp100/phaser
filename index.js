var express = require("express");
var app = new express();

app.use('/src',express.static('src'));

app.listen(3000,function(){
   console.log('is listening port 3000');
});