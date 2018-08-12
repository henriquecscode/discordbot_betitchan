const Discord = require("discord.js");
const YTDL = require ("ytdl-core"); //Youtube Download - Used to download the youtube link and stream it

var queue = []; //Stores the links of the musics to be played

exports.MusicPlay = function (message, link){
    if(!link){ //The user did not specify a link
        return message.channel.send(`${message.member} Please specify a youtube link`); //The return makes so there is no need for an else statement
    }

    if(!message.member.voiceChannel){ //The user is not in a voice channel
        return message.channel.send(`${message.member} Please join a voice channel`);
    }

    queue.push(link);

    if(!message.guild.voiceConnection){ //If we are not connected to the voice channel
        message.member.voiceChannel.join() //Async join the voice channel function
        .then(function(connection){
            MusicQueue(connection)
        })
    }
}

exports.MusicSkip = function(){
    if (queue.dispatcher){ //If there is a music playing
        queue.dispatcher.end(); //End the music
    }
}

exports.MusicStop = function(message){
    if (message.guild.voiceConnection){ //If it is connected to a voice channel
        message.guild.voiceChannel.disconnect(); //Disconnects from the voice channel
    }
}

function MusicQueue(connection){
    console.log("It reached so far");
    queue.dispatcher = connection.playStream(YTDL(queue[0], {filter: "audioonly"})); //Strema the music, using YTDL to download the queue[0] link, though only its audio (filter: "audioonly")
    console.log("And also kept going");
    queue.shift(); //Removes the first link of the queue 

    queue.dispatcher.on("end", function(){
        if(queue[0]){ //If there is still a music in the queue after having played one
            MusicQueue(connection) //Keeps playing music by calling itself
        }
        else{
            connection.disconnect(); //Disconnects the bot if the queue has no more musics in it
        }
    });
}