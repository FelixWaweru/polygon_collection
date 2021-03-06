// Initialize server
var express = require('express');
var app = express();
const router = express.Router();
const path2 = require('path');

var path = __dirname + "/";
var port = process.env.PORT || 3000;

// Setup routes
router.use(function (req,res,next) {
  console.log('/' + req.method);
  next();
});

router.get('/', function(req,res){
  res.sendFile(path + 'index.html');
});

router.get('/COMBZ', function (req, res) {
  res.sendFile(path + 'combz.html');
});

router.get('/gallery', function (req, res) {
  res.sendFile(path + 'gallery.html');
});


// Run Server
app.use(express.static(__dirname));
app.use('/', router);
app.listen(port, function () {
  console.log('Example app listening on port 3000!')
})