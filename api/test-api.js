const express = require("express");
const app = express();
const path = require("path");

app.post("/pokemon-types", function (req, res) {
    res.sendFile(path.join(__dirname+'/pokemon/types.json'))
});

app.listen(8000, () => {
    console.log("Server listening on port 8000")
});