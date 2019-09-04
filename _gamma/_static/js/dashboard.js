$('#reportLink1').on('click', function(e){
	console.log('fired');
	goReport();
});

$('#reportLink2').on('click', function(e){
	console.log('fired');
	goReport();
});
$('#reportLink3').on('click', function(e){
	console.log('fired');
	goReport();
});

$( document ).ready(function() {
    $.ajax('https://ap5txlqyt6.execute-api.us-west-2.amazonaws.com/prod/')
	  .done(data => {
	  	var arr = JSON.parse(data.body);
	  	$.each( arr, function( i, val ) {
			  $('#ajax-data').append(`
			  	<h3 id='reportLink${i}' data-id="${val.session_id}">
			  		session: <span class="btn btn-link">${val.session_id}</span>
			  	</h3>
			  `);
			});
	  })
	  .fail((xhr, status) => console.log('error:', status));
});


function goReport(){
			var form = document.createElement("form");
		  form.method = "GET";
		  form.action = "./report.html";   
		  document.body.appendChild(form);
		  form.submit();
		}