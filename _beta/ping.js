function pingServer(AppContext, app_id, timebox_id, time){
	var timeout = time * 1000 + 1000;
	var slice_start = time-10;
	var slice_end = time+1;
	setTimeout(function(){ 
		var sections = {};
		for (var i = 0; i < Object.keys(AppContext.sections).length; i++) {
			var section_id = Object.keys(AppContext.sections)[i];
			sections[section_id] = {};
			sections[section_id][timebox_id] = AppContext.sections[section_id].slice(slice_start, slice_end);
		};
		goReport(app_id, sections);
	}, timeout);
}
function goReport(app_id, sections){
	var apigClient = apigClientFactory.newClient();
	//console.log(apigClient);

	var params = {};
	var body = {
		"app_id": app_id,
		"sections": sections
	}; 
	var additionalParams = {};

	apigClient.visitorPost(params, body, additionalParams)
  .then(function(result){
    // Add success callback code here.
    console.log("result: ", result);
    
  }).catch( function(error){
    // Add error callback code here.
    console.log(error);
  });
}

var AppContext = {sections: {}, heights: {}};
var $sections = $('body').find('section');
if($sections.length ===0 ) throw 'no sections'
var section_id, section_selector;
for (var i = 0; i < $sections.length; i++) {
	section_id = 'section_'+i;
	section_selector = 'section:eq('+i+')';
	AppContext.sections[section_id] =  [];
	AppContext.heights[section_id] = $(section_selector).offset().top;
};

AppContext.timer = 0;
AppContext.current_height = 0;

pingServer(AppContext, 'clearcut_ip', "timebox_0", 10);
pingServer(AppContext, 'clearcut_ip', "timebox_1", 20);
pingServer(AppContext, 'clearcut_ip', "timebox_2", 30);
pingServer(AppContext, 'clearcut_ip', "timebox_3", 40);
pingServer(AppContext, 'clearcut_ip', "timebox_4", 50);
	
	


$(window).scroll(function() {
	AppContext.current_height = $(this).scrollTop();
});

function noop(){};

function checkScroll(){
		checkScroll = noop;
		setInterval(function(){


			AppContext.timer++
			var section_id;
			
			console.log('timer: ', AppContext.timer)
			
			for (var i = Object.keys(AppContext.sections).length - 1; i >= 0; i--) {
				section_id = 'section_'+i;
				if (AppContext.current_height >= AppContext.heights[section_id]){
					AppContext.sections[section_id].push(AppContext.timer);
					break;
				}
			};
		}, 1000);
	}

$( document ).ready(function() {checkScroll()});