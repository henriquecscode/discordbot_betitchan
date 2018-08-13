const Discord = require("discord.js"); //To get the embeds (for glitch.com)

commands = [

    [
        "Devast",
        "It will send the Devast.io link!",
        "http://devast.io"
    ],

    [
        "Starve",
        "It will send the Starve.io link!",
        "http://starve.io"
    ],

    [
        "Ping",
        "It will send to you the Pong",
        "pong"
    ],

    [
        "Stromi",
        "2Bee is the best!",
        "2Bee is cool"
    ],

    [
        "Neko",
        "Sends a neko nyan",
        "https://cdn.discordapp.com/attachments/476134769160355871/476384779235885097/latest.png",
        "https://cdn.discordapp.com/attachments/476134769160355871/476384816393093130/main-qimg-d658e310e79b5f5218c84efa57b4ca37.png",
        "https://cdn.discordapp.com/attachments/476134769160355871/476384857543540736/images.png",
        "https://cdn.discordapp.com/attachments/476134769160355871/476384885389525002/5c7d8589d338b29f6d785150be01a546.png",
        "https://cdn.discordapp.com/attachments/476134769160355871/476384922462978058/4476fae0ce8e29378ecf3c04e056e915.png",
        "https://cdn.discordapp.com/attachments/476134769160355871/476384966369083423/AF84E58430B8AF52E540B9DD849F1F93381E9924.png"
    ],

    [
        "Devaster",
        "Sends a Devaster Emoji, more coming soon!",
        "https://cdn.discordapp.com/attachments/476111531512299521/476399145817473048/DAngry.png",
        "https://cdn.discordapp.com/attachments/476111531512299521/476399147390337058/DCool.png",
        "https://cdn.discordapp.com/attachments/476111531512299521/476399148652822528/DGun.png",
        "https://cdn.discordapp.com/attachments/476111531512299521/476399149944668180/DHappy.png",
        "https://cdn.discordapp.com/attachments/476111531512299521/476399150930329600/DNervous.png",
        "https://cdn.discordapp.com/attachments/476111531512299521/476399152058728458/DPing.png",
        "https://cdn.discordapp.com/attachments/476111531512299521/476399155800178720/DScared.png",
        "https://cdn.discordapp.com/attachments/476111531512299521/476399158673014805/DSuprised.png",
        "https://cdn.discordapp.com/attachments/476111531512299521/476399153317150722/DSad.png",
        "https://cdn.discordapp.com/attachments/476111531512299521/476399161206636544/Emoji_Dab.png",
        "https://cdn.discordapp.com/emojis/476483742265901066.png?v=1",
        "https://cdn.discordapp.com/emojis/476483022716272640.png?v=1",
        "https://cdn.discordapp.com/emojis/476483022238253069.png?v=1",
        "https://cdn.discordapp.com/emojis/476483022808416256.png?v=1",
        "https://cdn.discordapp.com/emojis/476483023274246180.png?v=1"

    ]

];

//2d array that contains the functionality of each function
//Each row's first element contains the string with the name of the command
//Each row's second element contains what is going to be display by the help command
//The other elements of the row are the possile answers
//Edit this to add more commands

exports.GetCommands = function () { //When we need to display the help we need to access the commands array so we get it by calling this function
    return commands;
}

exports.GetAvatar = function (message) {
    var avatar;
    if (message.mentions.users.first() !== undefined) { //There is someone mentioned
        avatar = message.mentions.users.first().avatarURL; //Gets the avatar URL
    }
    else {
        avatar = message.author.avatarURL; //Gets the avatar URL
    }
    var embed = new Discord.RichEmbed(); //a new embed
    embed.setImage(avatar); //Sets the embed image to the person's avatar
    message.channel.send("", embed);
}

//Controls the bot's answers to simple commands
exports.Othermessages = function (message, entertainer) {


    var index; //Used to randomize when having mulitple return options

    for (var i = 0; i < commands.length; i++) //Runs through all commands' elements to see if the message coincides with any function of the bot
    {
        if (entertainer === commands[i][0].toLowerCase()) { //Checks if the entertainer is the same as in the commands[i][0] array
            index = Math.floor(Math.random() * (commands[i].length - 2) + 2); //Randomizes an index of the available response options
            return message.channel.send(commands[i][index]); //Returns the correspondent string to that index
        }
    }

    //Last case scenario where the string put after the prefix is not recognized
    return message.channel.send("Oni-Chan my Sensei didn't add this command!");

}