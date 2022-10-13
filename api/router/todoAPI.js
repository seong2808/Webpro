const { json } = require("express/lib/response");

module.exports = function(app, fs, xmlconv) {
    app.get('/getData', function(req, res) {
        // 공공 API 요청

            const url='http://apis.data.go.kr/B552584/EvCharger/getChargerInfo';
            const key ='9kAcOyFnkyCI3Jf/uk//wBVqwdON1RXgOXNuvdHVev4r95EscgNns2e2yFgKfkWeOTrjbXolkvbwcuNw2hYmlA==';
            const param = {
                'serviceKey': key,
                'numOfRows':5306,
                'pageNo':1,
                'zcode':44 
            }
            const reqURL = url + '?' + new URLSearchParams(param);

            fetch(reqURL)
            .then(response => {
                return response.text();
            }).then(data => {
                reDate = xmlconv.xml2json(data,{compact:true,spaces:4});
                res.send(reDate);
            }).catch(err => {
                console.log(err);
            });
        
    });
}