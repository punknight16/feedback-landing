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

function updateHeartlyticaGET(cb){
	var url = "https://96abf83276.execute-api.us-west-2.amazonaws.com/prod/update"
	$.get(url, function(result){
		cb(null, result);
	});
};

function updateHeartlyticaPOST(session_id, app_id, sections, cb){
	var body = {
		session_id: session_id,
		app_id: app_id,
		sections: sections
	};
	var url = "https://96abf83276.execute-api.us-west-2.amazonaws.com/prod/update"
	$.post(url, JSON.stringify(body), function(result){
		cb(null, result);
	});
};

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
		updateHeartlyticaPOST(AppContext.session_id, AppContext.app_id, AppContext.sections, function(err, result){
			console.log('err: ', err);
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
	
	
	AppContext.timer = 0;
	

	startScrollListener(AppContext, 51);
	
	sliceSectionsByTime(AppContext, 10);
	sliceSectionsByTime(AppContext, 20);
	sliceSectionsByTime(AppContext, 30);
	sliceSectionsByTime(AppContext, 40);
	sliceSectionsByTime(AppContext, 50);	
	
});