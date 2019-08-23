exports.handler = async (event) => {
    // TODO implement
    var date = new Date().toISOString();
    var body = {app_id: 'a0', date: date, sections: 
        {'section_0': {
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
        },
      }
    };
    
    
    const response = {
        statusCode: 200,
        body: JSON.stringify(body),
    };
    return response;
};
