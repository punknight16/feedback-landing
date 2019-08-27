var http = require('http');
var fs = require('fs');

var server = http.createServer(function(req, res){
	var path = req.url;
	switch(path){
		case '/':
			var stream = fs.createReadStream(__dirname+'/index.html');
			stream.pipe(res);	
			break;
		case 'favicon.png':
			fs.readFile(attachment, function(err, data) {
			   var base64data = new Buffer(data).toString('base64');
			   
			});
			break;
		case 'helper.js':
			var stream = fs.createReadStream(__dirname+'/index.html');
			stream.pipe(res);	
			break;
	}
}).listen(3000, function(){console.log('server running')});