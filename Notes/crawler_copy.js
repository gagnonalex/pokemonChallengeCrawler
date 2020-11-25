const fs = require('fs');
const got = require('got');
const jsdom = require("jsdom");
const https = require('https')
const { JSDOM } = jsdom;

const pokemonURL = 'https://pokemondb.net/pokedex/national';

/**
 * Returns a Pokemon Object
 *
 * @param {number} id the id number (without the #)
 * @param {string} idName the if with the #
 * @param {string} name the Pokemon name
 * @param {string} type1 the first type of the pokemon
 * @param {string} type2 the second type of the pokemon (might be null)
 * @param {string} photoLink the link of the pokemon pohoto
 * @return {Pokemon} A pokemon object 
 */
class Pokemon {
    constructor(id, idName, name, type1, type2, photoLink) {
        this.id = id;
        this.idName = idName;
        this.name = name;
        this.type1 = type1;
        this.type2 = type2;
        this.photoLink = photoLink;
    }
};


D
const dom = new JSDOM(response.body);
var list = dom.window.document.getElementsByClassName('infocard')
var pokemonarray = [];

Array.prototype.forEach.call(list, function (el) {
    var lgdata = el.getElementsByClassName("infocard-lg-data")
    var idname = lgdata[0].getElementsByTagName("small")[0].innerHTML;
    var id = parseInt(idname.substring(1));
    var name = el.getElementsByClassName("ent-name")[0].innerHTML;
    var type1 = el.getElementsByClassName("itype")[0].innerHTML;
    var type2 = "";
    if (el.getElementsByClassName("itype")[1]) {
        var type2 = el.getElementsByClassName("itype")[1].innerHTML;
    }
    var list = el.getElementsByClassName("infocard-lg-img");
    var photoLink = list[0].getElementsByClassName("img-fixed")[0].dataset.src;
    pokemonarray.push({
        key: id,
        metadata: new Pokemon(id, idname, name, type1, type2, photoLink),
        //  id: id,
        //  idname: idname,
        // name: name,
        //  type1: type1,
        //  type2: type2,
        //  photoLink: photoLink,
        data: el.innerHTML
    });


});

//writintg the file
fs.writeFile("test.json", JSON.stringify(pokemonarray), function (err) {
    if (err) {
        return console.log(err);
    }
});

var data = JSON.stringify(pokemonarray[0]);
var documentid = "file://test7.txt";
console.log("data = " + data);
//trying to send the first object to the source
var options = {
    host: "apiqa.cloud.coveo.com",
    path: "/push/v1/organizations/servicenowreampokemonchallenge3qeoysvc/sources/servicenowreampokemonchallenge3qeoysvc-rosm2a33xdeptfpoyjg5vusg5e/documents?documentId=" + documentid,
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': "xx1a6846d0-c258-4d4c-b494-e6c29f7bc157",
    }
};
console.log("options = " + JSON.stringify(options));
const req = https.request(options, (res) => {
    console.log(`statusCode: ${res.statusCode}`)

    res.on('data', (d) => {
        process.stdout.write(d)
    })
})

req.on('error', (error) => {
    console.error(error)
})

req.write(data)
req.end()

    // const req = https.request(options, function (res) {
    //     console.log('STATUS: ' + res.statusCode);
    //     console.log('HEADERS: ' + JSON.stringify(res.headers));
    //     res.setEncoding('utf8');
    //     res.on('data', function (chunk) {
    //         console.log('BODY: ' + chunk);
    //     });
    //     //req.write(data)
    // });

}).catch (err => {
    console.log(err);
});
