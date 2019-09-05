function provisionHeartlyticaGET(cb){
	var url = "https://96abf83276.execute-api.us-west-2.amazonaws.com/prod/provision"
	$.get(url, function(result){
		cb(null, result);
	});
};

function provisionHeartlyticaPOST(session_id, app_id, sections, cb){
	var body = {
		session_id: session_id,
		app_id: app_id,
		sections: sections
	};
	var url = "https://96abf83276.execute-api.us-west-2.amazonaws.com/prod/provision"
	$.post(url, JSON.stringify(body), function(result){
		cb(null, result);
	});
};
function startHeartbeatPost(session_id, app_id, sections, cb){
	
	var body = {
		session_id: session_id,
		app_id: app_id,
		sections: sections
	};
	/*
	$.post( "http://localhost:3000/startHeartbeatPost", JSON.stringify(body), function( result ) {
	  return cb(result);
	}, "json");
*/
	localStorage.setItem("AppContext", JSON.stringify(body));
}

function pulseHeartbeatPost(session_id, app_id, sections, cb){
	var body = {
		session_id: session_id,
		app_id: app_id,
		sections: sections
	};
	/*
	$.post( "http://localhost:3000/pulseHeartbeatPost", JSON.stringify(body), function( result ) {
	  return cb(result);
	}, "json");
	*/
	/*localStorage.setItem("AppContext", JSON.stringify(body));*/
	console.log('body: ', JSON.stringify(body));
}

function startScrollListener(AppContext, timeout){
	
	var id = setInterval(function(){
		if(AppContext.timer >= timeout){
			clearInterval(id)
		}
		AppContext.timer++
		var section_id;
		
		for (var i = Object.keys(AppContext.sections).length - 1; i >= 0; i--) {
			section_id = 'section_'+i;
			if (AppContext.current_height >= AppContext.heights[section_id]){
				AppContext.sections[section_id].push(AppContext.timer);
				break;
			}
		};
	}, 1000);
}

function sliceSectionsByTime(AppContext, time){
	var timeout = time * 1000;
	setTimeout(function(){ 
		pulseHeartbeatPost(AppContext.session_id, AppContext.app_id, AppContext.sections, function(result){
			console.log('result: ', result);
		});
	}, timeout);
}



$( document ).ready(function() { 
	AppContext = {
		sections: {}, 
		heights: {}, 
		app_id: window.location.href, 
		session_id: 'session_id-'+Math.random().toString(32).substring(2)
	};
	

	$(window).scroll(function() {
		AppContext.current_height = $(this).scrollTop();
	});

	var $sections = $('body').find('section');
	if( $sections.length ===0 ) throw 'no sections'
	var section_id, section_selector;
	for (var i = 0; i < $sections.length; i++) {
		section_id = 'section_'+i;
		section_selector = 'section:eq('+i+')';
		AppContext.sections[section_id] =  [];
		AppContext.heights[section_id] = $(section_selector).offset().top;
	};

	
	provisionHeartlyticaPOST(AppContext.session_id, AppContext.app_id, AppContext.sections, function(err, result){
		console.log('result: ', result);
	});
	
	/*
	startHeartbeatPost(AppContext.session_id, AppContext.app_id, AppContext.sections, function(result){
		console.log('result: ', result);
	});
	
	AppContext.timer = 0;
	AppContext.current_height = 0;

	startScrollListener(AppContext, 51);
	
	sliceSectionsByTime(AppContext, 10);
	sliceSectionsByTime(AppContext, 20);
	sliceSectionsByTime(AppContext, 30);
	sliceSectionsByTime(AppContext, 40);
	sliceSectionsByTime(AppContext, 50);	
	*/
});