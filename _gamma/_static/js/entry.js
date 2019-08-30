$('#registerButton').on('click', function(e){
	var app_idInput = $('#registerAppIdInput').val();
	var emailInput = $('#registerEmailInput').val();
	var passwordInput = $('#registerPasswordInput').val();
	
	var error_obj = {
		app_idIsValid: true, 
		emailIsValid: true, 
		passwordIsValid: true
	};
	error_obj.app_idIsValid = validateInput(app_idInput);
	error_obj.emailIsValid = validateEmailInput(emailInput);
	error_obj.passwordIsValid = validatePasswordInput(passwordInput);
	if(!error_obj.app_idIsValid || !error_obj.emailIsValid || !error_obj.passwordIsValid) {
		
		if(!error_obj.app_idIsValid) $('#registerAppIdInput').addClass('bg-error');	
		if(!error_obj.emailIsValid) $('#registerEmailInput').addClass('bg-error');	
		if(!error_obj.passwordIsValid) $('#registerPasswordInput').addClass('bg-error');	

		$('#registerErrorPanel').removeClass('hide');
	} else {
		doRegister(emailInput, passwordInput, app_idInput, function(err, result){
			if(err) {
				callErrorModal(err);		
			} else {
				console.log('register success');
				callConfirmModal()
			}
		});
	}
});

$('#openConfirmLink').on('click', function(e){
	callConfirmModal();
})

$('#confirmButton').on('click', function(e){
	var confirmEmailInput = $('#confirmEmailInput').val();
	var confirmCodeInput = $('#confirmCodeInput').val();

	var error_obj = {
		emailIsValid: true, 
		codeIsValid: true
	};

	error_obj.emailIsValid = validateEmailInput(confirmEmailInput);
	error_obj.codeIsValid = validateInput(confirmCodeInput);

	if(!error_obj.emailIsValid || !error_obj.codeIsValid) {
		
		if(!error_obj.emailIsValid) $('#confirmEmailInput').addClass('bg-error');	
		if(!error_obj.codeIsValid) $('#confirmCodeInput').addClass('bg-error');	

		$('#confirmErrorPanel').removeClass('hide');
	} else {
		doConfirm(confirmEmailInput, confirmCodeInput, function(err, result){
			hideModal();
			if(err) {
				callErrorModal(err);		
			} else {
				console.log('confirm success');
				$('#loginEmailInput').val(confirmEmailInput);
				$('#loginButton').addClass('button');
			}
		});
	}
});

$('#loginButton').on('click', function(e){
	var loginEmailInput = $('#loginEmailInput').val();
	var loginPasswordInput = $('#loginPasswordInput').val();
	
	var error_obj = {
		emailIsValid: true, 
		passwordIsValid: true
	};

	error_obj.emailIsValid = validateEmailInput(loginEmailInput);
	error_obj.passwordIsValid = validateInput(loginPasswordInput);

	if(!error_obj.emailIsValid || !error_obj.passwordIsValid) {
		
		if(!error_obj.emailIsValid) $('#loginEmailInput').addClass('bg-error');	
		if(!error_obj.codeIsValid) $('#loginPasswordInput').addClass('bg-error');	

		$('#loginErrorPanel').removeClass('hide');
	} else {
		doLogin(loginEmailInput, loginPasswordInput, function(err, result){
			if(err) {
				callErrorModal(err);
			} else {
				console.log('login success');
				goHome();		
			}
		});
	}
});

$('#forgotPasswordLink').on('click', function(e){
	callForgotPasswordModal();
});

$('#forgotButton').on('click', function(e){
	var forgotEmailInput = $('#forgotEmailInput').val();
	var isValid = validateEmailInput(forgotEmailInput);
	
	if(!isValid) {
			$('#forgotEmailInput').addClass('bg-error');
			$('#forgotErrorPanel').removeClass('hide');
	} else {
		doForgot(forgotEmailInput, function(err, result){
			if(err) {
				callErrorModal(err);
			} else {
				callResetPasswordModal();
			}
		});
	}
});

$('#resetPasswordLink').on('click', function(e){
	callResetPasswordModal();
});

$('#resetButton').on('click', function(e){
	var resetEmailInput = $('#resetEmailInput').val();
	var resetCodeInput = $('#resetCodeInput').val();
	var resetPasswordInput = $('#resetPasswordInput').val();
	
	var error_obj = {
		emailIsValid: true, 
		codeIsValid: true, 
		passwordIsValid: true
	};
	
	error_obj.emailIsValid = validateEmailInput(resetEmailInput);
	error_obj.codeIsValid = validateInput(resetCodeInput);
	error_obj.passwordIsValid = validatePasswordInput(resetPasswordInput);
	

	if(!error_obj.emailIsValid || !error_obj.codeIsValid || !error_obj.passwordIsValid) {
		
		if(!error_obj.emailIsValid) $('#resetEmailInput').addClass('bg-error');	
		if(!error_obj.codeIsValid) $('#resetCodeInput').addClass('bg-error');	
		if(!error_obj.passwordIsValid) $('#resetPasswordInput').addClass('bg-error');	

		$('#resetErrorPanel').removeClass('hide');

	} else {
		doReset(resetEmailInput, resetCodeInput, resetPasswordInput, function(err, result){
			hideModal();
			if(err) {
				callErrorModal(err);
			} else {
				$('#loginEmailInput').val(resetEmailInput);
				$('#loginButton').addClass('button');
			}
		});
	}
});
function validateInput(input){
	if(typeof input === 'undefined' || input=='') {
		return false 
	} else {
		return true;
	}
}
function validateEmailInput(emailInput){
	var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(String(emailInput).toLowerCase());
}
function validatePasswordInput(y){
	var error = false;
	if (y.length < 8) {
	  error = true;
	}
	if (y.search(/[a-z]/) == -1) {
	  error = true;
	}
	if (y.search(/[A-Z]/) == -1) {
	  error = true;
	}
	if (y.search(/[0-9]/) == -1) {
	  error = true;
	}
	if (error) {
	  return false; //if there is an error return false because password is not valid.
	} else {
		return true;
	}
}

function goHome(){
			var form = document.createElement("form");
		  form.method = "GET";
		  form.action = "./home.html";   
		  document.body.appendChild(form);
		  form.submit();
		}