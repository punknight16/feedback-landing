/*function inspectHeartlyticaGET(cb){
	var url = "https://96abf83276.execute-api.us-west-2.amazonaws.com/prod/inspect"
	$.get(url, function(result){
		cb(null, result);
	});
};
*/

function inspectHeartlyticaPOST(session_id, cb){
	var body = {
		session_id: session_id
	};
	var url = "https://96abf83276.execute-api.us-west-2.amazonaws.com/prod/inspect"
	$.post(url, JSON.stringify(body), function(result){
		cb(null, result);
	});
};

$( document ).ready(function() {
	var path = window.location.href;
	var index = path.indexOf('?q=');
	
	var query_param = path.substring(index+3);
	
  inspectHeartlyticaPOST(query_param, function(err, data){
		if(err) { 
			callErrorModal(err);
		} else if (Object.keys(data).length===0) {
			
			$('#ajax-data').append(`
			  <small class='pb-20'><span class='text-error'>*</span>No Results</small>
			`);
		} else {	
	  	var sections = data.Item.sections;
	  	$.each( sections, function( i, section ) {
			  $('#ajax-data').append(`
			  	<h3> ${i} (<span class='text-color2'>${section.length}s</span>)</h3>
			  	<div class='card'><div class='data bg-color2' style='width:${section.length*2}px'></div></div>
			  `);
			});
		}  	
	})

});

/* $('#searchErrorText').text('no results');
$('#searchErrorPanel').removeClass('hide'); */
