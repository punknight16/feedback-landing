exports.handler = async (event) => {
    // TODO implement
    var body = {"sections":{
    	"section_0":[5,9,18,19,32,33,34,35,36,37,50],
    	"section_1":[1,2,6,10,16,17,20,21,26,28,29,30,31,47,48,49],
    	"section_2":[4,7,8,11,13,14,15,22,23,25,27,38],
    	"section_3":[3,12,24,39,40,41,42,43,44,45,46]
    }};
    
    
    const response = {
        statusCode: 200,
        body: JSON.stringify(body)
    };
    return response;
};