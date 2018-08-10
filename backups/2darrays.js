console.log("Running"); //First thing that outputs in the console
const Discord = require("discord.js");
const client = new Discord.Client();

var personalinfo = ["Bob worker man 23", "Mary unemployed women  60", "Henry coder man 16"];
var allinfo;

    for (var i = 0; i < personalinfo.length; i++) {
        allinfo.push(personalinfo.split(" "));
    }
    for (var i = 0; i < allinfo.length; i++) {
        for (var j = 0; j < 4; j++) {
            console.log(allinfo[i][j]);
        }
    }
