var AWS = require('aws-sdk');
AWS.config.update({region: 'us-west-2'});
var documentClient = new AWS.DynamoDB.DocumentClient();

exports.handler = (event, context, callback) => {
    console.log("event: ", event);
    var section_id, timebox_id, length, add_section;
    var app_id = event.app_id;
    var sections = event.sections;
    var lastActionTime = new Date().toISOString();
    
    var params1 = {
      TableName : 'feedback-landing',
      Key : { 
        app_id : app_id
      }
    };
    
    for (var i = 0; i < Object.keys(sections).length; i++) {
      section_id = Object.keys(sections)[i];
      timebox_id = Object.keys(sections[section_id])[0];
      length = sections[section_id][timebox_id].length;
      sections[section_id][timebox_id] = new Array(length).fill(1);
    }
    
    var params2 = {
      TableName : 'feedback-landing',
      Item: {
        app_id: app_id,
        date: lastActionTime,
        sections: sections
      }
    };
    

  getItem(params1, function(err, data1){
    if(err) return err;
    //console.log('getItem result: ', data1);
    if(!Object.keys(data1).length){ //if result == {} then putItem
      putItem(params2, function(err, data2){
        if(err) return err;
        //console.log('putItem result: ', data2);
        return data2;
      });
    } else {
      for (var i = 0; i < Object.keys(data1.Item.sections).length; i++) {
        section_id = Object.keys(data1.Item.sections)[i];
        if(typeof sections[section_id] == 'undefined') {
          sections[section_id] = {};
          sections[section_id][timebox_id] = [];
        }
        if(typeof sections[section_id][timebox_id] == 'undefined') {
          sections[section_id][timebox_id] = [];
        }
        if(typeof data1.Item.sections[section_id] == 'undefined'){
          data1.Item.sections[section_id] = {};
          data1.Item.sections[section_id][timebox_id] = [];
        }
        if(typeof data1.Item.sections[section_id][timebox_id] == 'undefined'){
          data1.Item.sections[section_id][timebox_id] = [];
        }
        console.log('sections: ', sections);
        console.log('section_id: ', section_id);
        console.log('timebox_id: ', timebox_id);
        var array1 = data1.Item.sections[section_id][timebox_id];
        var array2 = sections[section_id][timebox_id];
        console.log('array1: ', array1);
        console.log('array2: ', array2);
        if(array1.length>array2.length){
          array1.map(function (num, idx) {
            if(typeof array2[idx] !== 'undefined'){
              array1[idx] =  num + array2[idx];  
            } else {
              array1[idx] = num;
            }
          });
        } else {
          array2.map(function (num, idx) {
            if(typeof array1[idx] !== 'undefined'){
              array1[idx] = num + array1[idx];  
            } else {
              array1[idx] = num;
            }
          });
        }
      }
      var params3 = {
        TableName:'feedback-landing',
        Key:{
          app_id : app_id
        },
        UpdateExpression: "set sections = :s",
        ExpressionAttributeValues:{
          ":s": data1.Item.sections
        },
        ReturnValues:"UPDATED_NEW"
      };
      updateItem(params3, function(err, data3){
        if(err) return err;
        console.log('updateItem result: ', data3);
        return data3;
      });
    }
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

function putItem(params, cb){
  documentClient.put(params, function(err, data) {
    if (err) {
      console.log("putItem Error", err);
      return cb(err);
    } else {
      console.log("putItem Success", data);
      return cb(null, data);
    }
  }); 
};

function updateItem(params, cb){
  documentClient.update(params, function(err, data) {
    if (err) {
      console.log("updateItem Error", err);
      return cb(err);
    } else {
      console.log("updateItem Success", data);
      return cb(null, data);
    }
  });
};