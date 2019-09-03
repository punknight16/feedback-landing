var CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool;
var poolData = {
  UserPoolId : 'us-west-2_yREwxkIRe', // your user pool id here
  ClientId : '6jc28dkfj58fm2n7114petvl59' // your app client id here
};
var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

function doRegister(emailInput, passwordInput, app_idInput, cb){
	var cognitoUser;
	var dataAppId = {
    Name : 'custom:app_id',
    Value : app_idInput
  };
  var attributeAppId = new AmazonCognitoIdentity.CognitoUserAttribute(dataAppId);
	userPool.signUp(emailInput, passwordInput, [attributeAppId], null, function(err, result){
	    if (err) {
	        console.log(err);
	        return cb(err.message);
	    }
	    cognitoUser = result.user;
	    console.log('user name is ' + cognitoUser.getUsername());
	    return cb(null, cognitoUser);
	});
};

function doConfirm(emailInput, confirmInput, cb){
  var userData = {
      Username : emailInput,
      Pool : userPool
  };

  var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
  cognitoUser.confirmRegistration(confirmInput, true, function(err, result) {
      if (err) {
          console.log(err.message || JSON.stringify(err));
          return cb(err.message);
      }
      return cb(null, result);
  });
}



function doLogin(emailInput, passwordInput, cb){
	var userData = {
      Username : emailInput,
      Pool : userPool
  };
	var authenticationData = {
      Username : emailInput, // your username here
      Password : passwordInput, // your password here
  };
  var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);

  var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
  cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: function (result) {
      		console.log('success: ', result)
          var accessToken = result.getAccessToken().getJwtToken();
          return cb(null, accessToken);
      },

      onFailure: function(err) {
          console.log('error: ', err);
          return cb(err.message);
      },
      mfaRequired: function(codeDeliveryDetails) {
          console.log('this should not happen');
          var verificationCode = prompt('Please input verification code' ,'');
          cognitoUser.sendMFACode(verificationCode, this);
      }
  });
}

function doForgot(forgotEmailInput, cb){
	var userData = {
      Username : forgotEmailInput,
      Pool : userPool
  };
	var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
  cognitoUser.forgotPassword({
    onSuccess: function (data) {
       return cb(null, data);
    },
    onFailure: function(err) {
      console.log(err)
      return cb(err.message);
    }
	})
}


function doReset(resetUsernameInput, resetCodeInput, resetPasswordInput, cb){
	
	var userData = {
      Username : resetUsernameInput,
      Pool : userPool
  };
	var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
	cognitoUser.confirmPassword(resetCodeInput, resetPasswordInput, {
      onSuccess() {
        return cb(null, 'Password change confirmed!');
      },
      onFailure(err) {
      	console.log(err);

        return cb(err.message);
      }
    })
}

function doRefresh(cb){
	var cognitoUser = userPool.getCurrentUser();

	if (cognitoUser === null) {
			return cb('unauthenticated');
	} else {
		cognitoUser.getSession(function(err, session) {
			console.log('session ', session);
      if (err) {
        alert(JSON.stringify(err.message) || JSON.stringify(err));
        return;
      }
      AWS.config.credentials = new AWS.CognitoIdentityCredentials({
				IdentityPoolId : "us-west-2:56f2a023-cdbc-4fd9-932a-4841647e1904", // your identity pool id here 
				Logins : {
				      'cognito-idp.us-west-2.amazonaws.com/us-west-2_Vd4MBnDl5' :   
				      session.getIdToken().getJwtToken()
				}
				       }, {
				region: "us-west-2"
			});
		});
	}	
	AWS.config.credentials.refresh(function(err){
    if(err) console.log(err);
    else {
    	console.log("creds: ", AWS.config.credentials);
    	return cb(null, cognitoUser);
    }
	});
}