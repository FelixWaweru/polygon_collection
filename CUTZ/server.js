// Initialize server
var express = require('express');
var app = express();
const router = express.Router();

// Setup routes
router.use(function (req,res,next) {
  console.log('/' + req.method);
  next();
});

router.get('/', function(req,res){
  res.sendFile(path + 'index.html');
});

// Run Server
app.use(express.static(__dirname));
app.use('/', router);
app.listen("3000", "127.0.0.1", function () {
  console.log('Example app listening on port 3000!')
})