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


setTimeout(function(){ 
		console.log('Report: ', JSON.stringify(AppContext));
		goReport(AppContext);
}, 10000);




$(window).scroll(function() {
	AppContext.current_height = $(this).scrollTop();
});

function goReport(AppContext){
  var form = document.createElement("form");
  var element1 = document.createElement("input");
  form.method = "GET";
  form.action = "./report.html";
  element1.value=JSON.stringify(AppContext);
  element1.name="AppContext";
  form.appendChild(element1); 
  document.body.appendChild(form);
  form.submit();
}

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