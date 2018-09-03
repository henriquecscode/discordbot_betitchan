// server.js
// where your node app starts

// init project

const http = require('http');
const express = require('express');
const app = express();

//Edit here
//
//
//


console.log("Running"); //First thing that outputs in the console
const Discord = require("discord.js");
const exp = require("./exp.js");
const mod = require("./mod.js");
const entertainers = require("./entertainers.js");
const welcome = require ("./welcome.js");
const music = require("./music.js");
const client = new Discord.Client();


//
//
//
// Don't Edit here

app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
  console.log(`Keeping the bot alive`); 
  exp.Save();
}, 280000);
//Don't mess: Keep the bot alive in the hosting

//EDIT FROM HERE