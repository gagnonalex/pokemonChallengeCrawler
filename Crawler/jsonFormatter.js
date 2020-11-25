const fs = require('fs');
const got = require('got');
const jsdom = require("jsdom");
const https = require('https')
const { JSDOM } = jsdom;

fs.readFile('log.txt', 'utf-8', function (err, data) {
    if (err) throw err;

    var newData = '{ "addOrUpdate": [' + data.slice(0, -1) + "]}"; // string

    fs.appendFile('crawledPokemon.json', newData , function (err) {
        if (err) {
            // append failed
        } else {
            // done
        }
    })
});

// var documentid = "file://test7.txt";
// console.log("data = " + data);
// //trying to send the first object to the source
// var options = {
//     host: "apiqa.cloud.coveo.com",
//     path: "/push/v1/organizations/servicenowreampokemonchallenge3qeoysvc/sources/servicenowreampokemonchallenge3qeoysvc-rosm2a33xdeptfpoyjg5vusg5e/documents?documentId=" + documentid,
//     method: 'PUT',
//     headers: {
//         'Content-Type': 'application/json',
//         'Authorization': "xx1a6846d0-c258-4d4c-b494-e6c29f7bc157",
//     }
// };
// console.log("options = " + JSON.stringify(options));
// const req = https.request(options, (res) => {
//     console.log(`statusCode: ${res.statusCode}`)

//     res.on('data', (d) => {
//         process.stdout.write(d)
//     })
// })

// req.on('error', (error) => {
//     console.error(error)
// })

// req.write(data)
// req.end()