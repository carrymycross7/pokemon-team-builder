const express = require("express");
const fs = require('fs');
const app = express();
const path = require("path");
const body_parser = require('body-parser');
const router = express.Router();
const POKE_WEAKNESS = require("./api/sort-weakness");
const MODIFY = require("./api/modify-types");
const strengths = require('./pokemon/strengths.json');
const {db} = require('./firebase.js');
global.appRoot = path.resolve(__dirname);

app.use(express.static(path.join(__dirname,'ui/script')));
app.use('/img', express.static(path.join(__dirname, 'ui/img')));


// init body-parser
app.use(body_parser.json()); // support json encoded bodies
app.use(body_parser.urlencoded({extended: true})); // support url-encoded bodies

// send file when person hits the / in their url
app.get("/", async function (req, res) {
    res.sendFile(path.join(__dirname+'/ui/view/test.html'))
});

// serve the js file
app.get("/battle-info.js", function (req, res) {
    res.sendFile(path.join(__dirname + '/ui/script/battle-info.js'));
});

// serve the js file
app.get("/selectize.css", function (req, res) {
    res.sendFile(path.join(__dirname + '/ui/style/selectize.css'));
});
// serve the style sheet for commonly used classes for the page
app.get("/types-standard.css", function (req, res) {
    res.sendFile(path.join(__dirname + '/ui/style/types-standard.css'));
});

app.get("/home", function (req, res) {
    res.sendFile(path.join(__dirname+'/ui/view/battle-info.html'))
});

app.post('/add-type', async function (req, res) {
    let new_type = req.body;
    const snapshot = await db.collection('types').get();
    let list = snapshot.docs.map(doc => doc.data());
    
    const col = await db.collection('types').doc('type').set(
        new_type
    );
    
    res.send(col);
});

app.get("/pokemon-strengths", function (req, res) {
    res.sendFile(path.join(__dirname+'/pokemon/strengths.json'))
});
/*
    Main call to get all types.
    
    Covers R in CRUD for Read
 */
app.get("/pokemon-types", async function (req, res) {
    let type_list = JSON.parse(fs.readFileSync(path.join(__dirname+'/pokemon/types.json')));
    const snapshot = await db.collection('types').get();
    let list = snapshot.docs.map(doc => doc.data());
    type_list.new_list = list; // adding our new list from firebase TODO: refactor UI to use firebase exclusively
    res.send(type_list);
});

/*
* Takes parameter that is an object with the type that will be extracted from the json
*
*
*
* */
app.post("/pokemon-weakness", async function (req, res, next) {
    // parse json file into object
    let weakness_list = JSON.parse(fs.readFileSync(path.join(__dirname+'/pokemon/type-weakness.json')));
    let found_weaknesses = await POKE_WEAKNESS.find(weakness_list,req.body.TYPES);
    res.json(found_weaknesses);
});


/*
    Gets all the resistances for the pokemon types.
 */
app.get("/resistances", async (req, res) => {
   res.json(JSON.parse(fs.readFileSync(path.join(__dirname+'/pokemon/resistances.json'))));
});

// test route
app.get("/hello", function (req, res) {
    res.send("hello! I am alive!!!!");
});

app.listen(8000, async () => {
    console.log("Server listening on port 8000");
});

