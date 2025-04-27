const express = require("express");
const server = express();
const port = 3001;

// Route for the root path
server.get("/", function (req, res) {
    res.send('<h1>Welcome to SkillPro!</h1><a href="/hello">Go to Hello</a>');
});

server.get("/hello", function (req, res) {
    res.send("Hello from SkillPro!");
});

server.listen(port, function () {
    console.log("Express listening on " + port);
});