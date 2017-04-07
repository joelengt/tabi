var request = require('request')
var crypto  = require('crypto')

var baseUrl = 'https://api.culqi.com/v2';


request({
    url: baseUrl + '/charges',
    method: 'POST',
    headers: {
        'Content-type': 'application/json',
        'Authorization': 'Bearer sk_test_mCpkD0ccXRLLp87W' 
    },
    json: true,
    body: {
      "amount": "10000",
      "currency_code": "PEN",
      "email": "richard@piedpiper.com",
      "source_id": "Aqui token_id o card_id"
    },
    function (err, response, result) {
    if (err) callback (err);
    else {
        if (response.statusCode != 200) callback(new Error('No se pudo conectar al servidor.'))
        else {
            
            console.log(response);

        }
    }
});

