var AWS = require('aws-sdk');
AWS.config.update({region: 'us-west-2'});
var documentClient = new AWS.DynamoDB.DocumentClient();
/*
exports.handler = async (event) => {
    // TODO implement
    const response = {
        statusCode: 200,
        body: JSON.stringify('Hello from Lambda!'),
    };
    return response;
};*/

exports.handler = (event, context, callback) => {
    var app_id = event.app_id;
    var date = new Date().toISOString();
    var params = {
      TableName : 'feedback-landing',
      Key : { 
        app_id : app_id
      }
    };
    
    /*var body = {app_id: 'a0', date: date, sections: {
      'section_0': {
          'timebox_0': [8, 4, 3, 2, 1],
          'timebox_1': [3, 2, 1],
          'timebox_2': [2, 1],
          'timebox_3': [2],
          'timebox_4': [1]
        },
        'section_1': {
          'timebox_0': [8, 4, 3, 2, 1],
          'timebox_1': [3, 2, 1],
          'timebox_2': [2, 1],
          'timebox_3': [2],
          'timebox_4': [1]
        },
        'section_2': {
          'timebox_0': [8, 4, 3, 2, 1],
          'timebox_1': [3, 2, 1],
          'timebox_2': [2, 1],
          'timebox_3': [2],
          'timebox_4': [1]
        },
        'section_3': {
          'timebox_0': [8, 4, 3, 2, 1],
          'timebox_1': [3, 2, 1],
          'timebox_2': [2, 1],
          'timebox_3': [2],
          'timebox_4': [1]
        },
        'section_4': {
          'timebox_0': [8, 4, 3, 2, 1],
          'timebox_1': [3, 2, 1],
          'timebox_2': [2, 1],
          'timebox_3': [2],
          'timebox_4': [1]
        }
      }};
    
    
    const response = {
        statusCode: 200,
        body: JSON.stringify(body),
    };
    return response;*/
    
    getItem(params, function(err, result){
      if(err) return err;
      callback(null, result);
    });
};

function getItem(params, cb){
  documentClient.get(params, function(err, data) {
    if (err) {
      console.log("getItem Error", err);
      return cb(err);
    } else {
      console.log("getItem Success", data);
      return cb(null, data);
    }
  });
}