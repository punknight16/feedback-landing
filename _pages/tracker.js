var AppContext = {
	cover_section: [],
	why_section: [],
	how_section: [],
	cta_section: [],
	cover_height: 0,
	why_height: 1000,
	how_height: 2000,
	cta_height: 3000
};
AppContext.timer = 0;
AppContext.current_height = 0;

setTimeout(function(){ 
		console.log('Report: ', JSON.stringify(AppContext));
		goReport(AppContext);
}, 10000);


function startTime(){

	AppContext.timer++;
	console.log(AppContext.timer)

	if (AppContext.current_height >= AppContext.cta_height){
		AppContext.cta_section.push(AppContext.timer);
	} else if (AppContext.current_height >= AppContext.how_height){
		AppContext.how_section.push(AppContext.timer);
	} else if (AppContext.current_height >= AppContext.why_height){
		AppContext.why_section.push(AppContext.timer);
	} else {
		AppContext.cover_section.push(AppContext.timer);
	}


	if(AppContext.timer<10){
		setTimeout(function(){startTime()}, 1000);	
	} else {
		return;
	}
}

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

$(function() {
	startTime();
})