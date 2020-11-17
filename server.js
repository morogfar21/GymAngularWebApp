const express = require("express");
const path = require("path");

const app = express();

app.use(express.static(__dirname + "/dist/itweb-ass2"));

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname + "/dist/itweb-ass2/index.html"));
});

app.listen(process.env.PORT || 8080);


// var express = require('express'),
//    path = require('path'),
//    fs = require('fs');
// var compression = require('compression');
// var app = express();
// var staticRoot = __dirname + '/dist/itweb-ass2';
// var env = process.env.NODE_ENV || 'development';

// app.set('port', (process.env.PORT || 5000));

// app.use(compression());
// /* other middleware */

// /* place any backend routes you have here */    

// app.use(function(req, res, next) {
//     //if the request is not html then move along
//     var accept = req.accepts('html', 'json', 'xml');
//     if (accept !== 'html') {
//         return next();
//     }

//     // if the request has a '.' assume that it's for a file, move along
//     var ext = path.extname(req.path);
//     if (ext !== '') {
//         return next();
//     }

//     fs.createReadStream(staticRoot + 'index.html').pipe(res);

// });

// app.use(express.static(staticRoot));

// app.listen(app.get('port'), function() {
//     console.log('app running on port', app.get('port'));
// });