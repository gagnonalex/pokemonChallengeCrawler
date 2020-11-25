const DEBUG = false

const fs = require('fs');
const got = require('got');
const jsdom = require("jsdom");
const https = require('https')
const { JSDOM } = jsdom;

const POKEMON_URL = {
    BASE: 'https://pokemondb.net',
    ALL: 'https://pokemondb.net/pokedex/national'
}
const POKEDEX_DATA = "main > .tabset-basics > .tabs-panel-list > .tabs-panel > .grid-row:nth-child(1) > div:nth-child(2)";
const TRAINING_BREEDING = "main > .tabset-basics > .tabs-panel-list > .tabs-panel > .grid-row:nth-child(1) > div:nth-child(3)";
const QUERY_SELECTOR = {
    POKEMON_URL: ".infocard-lg-data > a",
    NATIONAL_NUMBER: POKEDEX_DATA + "> .vitals-table > tbody > tr:nth-child(1) > td > strong",
    NAME: "main > h1",
    DESCRIPTION: "main > div > div > p",
    TYPE1: POKEDEX_DATA + "> .vitals-table > tbody > tr:nth-child(2) > td > a",
    TYPE2: POKEDEX_DATA + "> .vitals-table > tbody > tr:nth-child(2) > td > a:nth-child(2)",
    GENERATION: "main > div:nth-child(4) > div > p > abbr",
    SPECIES: POKEDEX_DATA + "> .vitals-table > tbody > tr:nth-child(3) > td",
    HEIGHT: POKEDEX_DATA + "> .vitals-table > tbody > tr:nth-child(4) > td",
    WEIGHT: POKEDEX_DATA + "> .vitals-table > tbody > tr:nth-child(5) > td",
    ABILITIES: POKEDEX_DATA + "> .vitals-table > tbody > tr:nth-child(6) > td",
    LOCAL_NUMBER: POKEDEX_DATA + "> .vitals-table > tbody > tr:nth-child(7) > td",
    MALE_PERCENTAGE: TRAINING_BREEDING + "> div > div:nth-child(2) > .vitals-table > tbody > tr:nth-child(2) > td > span",
    FEMALE_PERCENTAGE: TRAINING_BREEDING + "> div > div:nth-child(2) > .vitals-table > tbody > tr:nth-child(2) > td > .text-pink",
    POKEMON_PICTURE_LINK: "main > .tabset-basics > div:nth-child(2) > div > div > div > p > a > img",
}


got(POKEMON_URL.ALL).then(response => {

    const dom = new JSDOM(response.body);
    var list = dom.window.document.getElementsByClassName('infocard')
    var cpt = 0;

    var pokemonarray = [];

    Array.prototype.forEach.call(list, function (el) {

        // if (cpt == 0) {

        var pokemonlink = POKEMON_URL.BASE + el.querySelector(QUERY_SELECTOR.POKEMON_URL).href;
        if (DEBUG) console.log("pokemonUrl = " + pokemonlink)
        got(pokemonlink).then(response => {
            const dom = new JSDOM(response.body);
            /**
             *Template
               var __ = dom.window.document.querySelector(QUERY_SELECTOR.).innerHTML;
            if (DEBUG) console.log("__ = " + __)
             *
             */

            var nationalnumber = dom.window.document.querySelector(QUERY_SELECTOR.NATIONAL_NUMBER).innerHTML;
            if (DEBUG) console.log("nationalnumber = " + nationalnumber)



            var name = dom.window.document.querySelector(QUERY_SELECTOR.NAME).innerHTML;
            if (DEBUG) console.log("name = " + name)

            var type = dom.window.document.querySelector(QUERY_SELECTOR.TYPE1).innerHTML;
            if (DEBUG) console.log("type = " + type)

            if (dom.window.document.querySelector(QUERY_SELECTOR.TYPE2)) {
                type += ";" + dom.window.document.querySelector(QUERY_SELECTOR.TYPE2).innerHTML;
                if (DEBUG) console.log("type = " + type)
            }

            var generation = dom.window.document.querySelector(QUERY_SELECTOR.GENERATION).innerHTML;
            if (DEBUG) console.log("generation = " + generation)

            var species = dom.window.document.querySelector(QUERY_SELECTOR.SPECIES).innerHTML;
            if (DEBUG) console.log("species = " + species)

            var heightm = dom.window.document.querySelector(QUERY_SELECTOR.HEIGHT).innerHTML.split(" ")[0].replace(/\&nbsp;/g, '').replace("m", "");
            if (DEBUG) console.log("heightm = " + heightm)

            var heightft = dom.window.document.querySelector(QUERY_SELECTOR.HEIGHT).innerHTML.replace(/\&nbsp;/g, '').split(" ")[1].replace('(', '').replace(')', '');
            if (DEBUG) console.log("heightft = " + heightft)

            var weightkg = dom.window.document.querySelector(QUERY_SELECTOR.WEIGHT).innerHTML.replace(/\&nbsp;/g, '').split(" ")[0].replace('kg', '');
            if (DEBUG) console.log("weightkg = " + weightkg)

            var weightlbs = dom.window.document.querySelector(QUERY_SELECTOR.WEIGHT).innerHTML.replace(/\&nbsp;/g, '').split(" ")[1].replace('(', '').replace(')', '').replace('lbs', '');
            if (DEBUG) console.log("weightlbs = " + weightlbs)

            var abilitiesobj = dom.window.document.querySelector(QUERY_SELECTOR.ABILITIES);
            var abilitylist = abilitiesobj.querySelectorAll("a");
            var abilities = "";
            for (i = 0; i < abilitylist.length; i++) {
                if (i == 0) { abilities = abilitylist[i].innerHTML; }
                else { abilities += ";" + abilitylist[i].innerHTML; }
            }
            if (DEBUG) console.log("abilities = " + abilities)

            var localnumberobj = dom.window.document.querySelector(QUERY_SELECTOR.LOCAL_NUMBER);
            var localnumberstr = localnumberobj.textContent.replace(/ *\([^)]*\) */g, ';');//.split(" ");
            var localnumbers = localnumberstr.slice(0, -1);
            if (DEBUG) console.log("localnumbers = " + localnumbers);


            var description = dom.window.document.querySelector(QUERY_SELECTOR.DESCRIPTION).innerHTML;
            if (DEBUG) console.log("description = " + description)

            var maleperc = "0";
            var malepercHtml = dom.window.document.querySelector(QUERY_SELECTOR.MALE_PERCENTAGE);
            if (malepercHtml) {
                maleperc = malepercHtml.innerHTML.split(" ")[0].replace("%", "")
            }
            if (DEBUG) console.log("maleperc = " + maleperc)

            var femaleperc = "0";
            var femalepercHtml = dom.window.document.querySelector(QUERY_SELECTOR.FEMALE_PERCENTAGE)
            if (femalepercHtml) {
                femaleperc = femalepercHtml.innerHTML.split(" ")[0].replace("%", "");
            }
            if (DEBUG) console.log("femaleperc = " + femaleperc)

            var photolink = dom.window.document.querySelector(QUERY_SELECTOR.POKEMON_PICTURE_LINK).src;
            if (DEBUG) console.log("photolink = " + photolink)


            var obj = {
                nationalnumber: nationalnumber,
                name: name,
                description: description,
                type: type,
                generation: generation,
                species: species,
                heightm: heightm,
                heightft: heightft,
                weightkg: weightkg,
                weightlbs: weightlbs,
                abilities: abilities,
                localnumbers: localnumbers,
                maleperc: maleperc,
                femaleperc: femaleperc,
                photolink: photolink,
                documentId: pokemonlink
            };

            fs.appendFile('rawExport.txt', JSON.stringify(obj) + ",", function (err) {
                if (err) {
                    // append failed
                } else {
                    // done
                }
            })
        });
        cpt++;
        // }
    });


}).catch(err => {
    console.log(err);
});