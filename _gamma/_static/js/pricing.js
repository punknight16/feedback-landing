$('#basicButton').on('click', function(e){
	callBetaModal();
});

$('#standardButton').on('click', function(e){
	callBetaModal();
});

$('#premiumButton').on('click', function(e){
	callBetaModal();
});

$('#donateButton').on('click', function(e){
	callDonateModal();
});

$('#continueButton').on('click', function(e){
	callGetStartedModal();
});

$('#getStartedButton').on('click', function(e){
	goDashboard();
});


function goDashboard(){
			var form = document.createElement("form");
		  form.method = "GET";
		  form.action = "./dashboard.html";   
		  document.body.appendChild(form);
		  form.submit();
		}