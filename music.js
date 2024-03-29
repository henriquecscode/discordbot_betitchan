const Discord = require("discord.js-commando");
const YTDL = require("ytdl-core"); //Youtube Download - Used to download the youtube link and stream it
const opus = require("opusscript");
const ffmpeg = require("ffmpeg");

var server = { queue: [] }; //Stores the links of the musics to be played

exports.MusicPlay = function (message, link) {
    console.log("Play Music request");
    if (!link) { //The user did not specify a link
        return message.channel.send(`${message.member} Please specify a youtube link`); //The return makes so there is no need for an else statement
    }

    if (!message.member.voiceChannel) { //The user is not in a voice channel
        return message.channel.send(`${message.member} Please join a voice channel`);
    }

    server.queue.push(link); //Adds the link to the queue
    console.log(server.queue);
    if (!message.guild.voiceConnection) { //If we are not connected to the voice channel
        message.member.voiceChannel.join() //Async join the voice channel function
            .then(function (connection) {
                MusicQueue(connection)
            })
    }
}

exports.MusicSkip = function () {
    if (queue.dispatcher) { //If there is a music playing
        server.dispatcher.end(); //End the music
    }
}

exports.MusicStop = function (message) {
    if (message.guild.voiceConnection) { //If it is connected to a voice channel
        message.guild.voiceChannel.disconnect(); //Disconnects from the voice channel
    }
}

function MusicQueue(connection) {
    console.log("Starting to stream");
    try {
        server.dispatcher = connection.playStream(YTDL(server.queue[0], { filter: "audioonly" }))
    } catch (err) {
        console.error(err);
    }; //Stream the music, using YTDL to download the queue[0] link, though only its audio (filter: "audioonly")

    console.log("Ended music");
    server.queue.shift(); //Removes the first link of the queue 

    server.dispatcher.on("end", function () {
        if (server.queue[0]) { //If there is still a music in the queue after having played one
            MusicQueue(connection) //Keeps playing music by calling itself
        }
        else {
            connection.disconnect(); //Disconnects the bot if the queue has no more musics in it
        }
    });
}