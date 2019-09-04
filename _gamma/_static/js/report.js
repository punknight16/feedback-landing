$( document ).ready(function() {
    $.ajax('https://ap5txlqyt6.execute-api.us-west-2.amazonaws.com/prod/inspect')
	  .done(data => {
	  	var sections = JSON.parse(data.body).sections;
	  	var keys = Object.keys(sections);
	  	$.each( keys, function( i, key ) {
			  $('#ajax-data').append(`
			  	<h3>Section ${i} (<span class='text-color2'>${sections[key].length}s</span>)</h3>
			  	<div class='card'><div class='data bg-color2' style='width:${sections[key].length*2}px'></div></div>
			  `);
			});
	  })
	  .fail((xhr, status) => console.log('error:', status));
});