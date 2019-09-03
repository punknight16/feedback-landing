var http = require('http');
var fs = require('fs');
var tables = {
	app_table: [{app_id: 'heartbeat'}],
	session_table: [] //session_id, app_id, ip_address, sections
};

var server = http.createServer(function(req, res){
	switch(req.method){
		case 'GET':
			getCloudfront(req, res);
			break;
		case 'POST':
			postAPIGateway(req, res);
			break;
		default:
			res.end('http method not supported');
	}
	
}).listen(3000, function(){console.log('server running')});


function getCloudfront(req, res){
	var path = req.url;
	var path_arr = path.split('/');
	console.log("path_arr: ", path_arr);
	switch(path_arr[1]){
		case '':
			var stream = fs.createReadStream(__dirname+'/index.html');
			stream.pipe(res);	
			break;
		case 'sample.html':
			var stream = fs.createReadStream(__dirname+'/sample.html');
			stream.pipe(res);	
			break;
		case '_static':
			if(path_arr[2] == 'css') res.setHeader('Content-Type', 'text/css');
			var stream = fs.createReadStream(__dirname+path);
			stream.pipe(res);	
			break;
		default:
			res.end('bad GET request');
	}
}

function postAPIGateway(req, res){
	var key_value = [];
	req.body = '';
	req.json = {};
	req.setEncoding('utf8')
	req.on('data', function(chunk){
		req.body += chunk;
	})
	req.on('end', function(){
		//console.log('req.body: ', req.body);
		req.json = JSON.parse(req.body);
		var path = req.url;
		//console.log('req.json', req.json);
		console.log('path: ', path);
		switch(path){
			case '/startHeartbeatPost':
				startHeartbeat(req, res);
				break;
			case '/pulseHeartbeatPost':
				pulseHeartbeat(req, res);
				break;
			default:
				res.end('bad post request');
		}
		//console.log('tables.session_table: ', JSON.stringify(tables.session_table));
	});
}

function startHeartbeat(req, res){
	if(isAppRegistered(req.json.app_id)){
		addSession(tables, req.json.app_id, req.json.session_id, req.connection.remoteAddress, req.json.sections);
		res.setHeader('Content-Type', 'application/json');
		res.end(JSON.stringify({ success: 'session started' }));
	} else {
		res.setHeader('Content-Type', 'application/json');
		res.end(JSON.stringify({ error: 'app not registered' }));
	}
}

function isAppRegistered(app_id){
	var test = tables.app_table.findIndex((item)=>{
		return (item.app_id == app_id)
	})
	return (test>=0) ? true : false;
}

function addSession(tables, app_id, session_id, ip_address, sections){
	//console.log('session added');
	//for security make sure that session does not already exist;
	tables.session_table.push({
		session_id: session_id,
		app_id: app_id,
		ip_address: ip_address,
		sections: sections
	});
	
}

function pulseHeartbeat(req, res){
	if(isSessionStarted(req.json.session_id)){
		addPulse(tables, req.json.session_id, req.json.sections);
		res.setHeader('Content-Type', 'application/json');
		res.end(JSON.stringify({ success: 'pulse received' }));
	} else {
		res.setHeader('Content-Type', 'application/json');
		res.end(JSON.stringify({ error: 'session not started' }));
	}
}

function isSessionStarted(session_id){
	var test = tables.session_table.findIndex((item)=>{
		return (item.session_id == session_id)
	})
	return (test>=0) ? true : false;
}

function addPulse(table, session_id, sections){
	
	var index = tables.session_table.findIndex((item)=>{
		return (item.session_id == session_id)
	});
	Object.keys(tables.session_table[index].sections).map((section)=>{
		tables.session_table[index].sections[section] = sections[section];
	});
}