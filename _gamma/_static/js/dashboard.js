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


function goReport(){
			var form = document.createElement("form");
		  form.method = "GET";
		  form.action = "./report.html";   
		  document.body.appendChild(form);
		  form.submit();
		}