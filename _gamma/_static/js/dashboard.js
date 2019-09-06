/*function scanHeartlyticaGET(cb){
	var url = "https://96abf83276.execute-api.us-west-2.amazonaws.com/prod/list"
	$.get(url, function(result){
		cb(null, result);
	});
};*/

function scanHeartlyticaPOST(app_id, cb){
	var body = {
		app_id: app_id
	};
	var url = "https://96abf83276.execute-api.us-west-2.amazonaws.com/prod/list"
	$.post(url, JSON.stringify(body), function(result){
		cb(null, result);
	});
};

function validateInput(input){
	if(typeof input === 'undefined' || input=='') {
		return false 
	} else {
		return true;
	}
}


$('#searchButton').on('click', function(e){
	var searchInput = $('#searchInput').val();
	var isValid = validateInput(searchInput);
	if(!isValid){
		$('#searchErrorPanel').removeClass('hide')
	} else {
	//var app_id = "file:///Users/lunitari/Code/Websites/feedback-landing/_gamma/sample.html";
	  scanHeartlyticaPOST(searchInput, function(err, data){
			if(err) {
				callErrorModal(err);	
			} else if (data.Items.length===0) {	
				$('#searchErrorText').text('no results');
				$('#searchErrorPanel').removeClass('hide');
			} else {	
		  	$.each( data.Items, function( i, val ) {
				  $('#ajax-data').append(`
				  	<h3>
				  		session: <span 
				  			class="btn btn-link" 
				  			data-id="${val.session_id}"
				  			onclick="goReport(this)">${val.session_id}</span>
				  	</h3>
				  `);
				});
			}
	  });
	}
});

function goReport(element){
	var session_id = $(element).attr("data-id");
	var form = document.createElement("form");
  var element1 = document.createElement("input");
  form.method = "GET";
  form.action = "./report.html";
  element1.value=session_id;
  element1.name="q";
  form.appendChild(element1); 
  document.body.appendChild(form);
  form.submit();
}