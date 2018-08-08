const Discord = require("discord.js");
const client = new Discord.Client();

var prefix = "-chan" //The prefix that must be inplace before every message. Change here if tired of previous one
var prefixlenght = prefix.length

var commands = [

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
    "https://cdn.discordapp.com/attachments/476111531512299521/476399161206636544/Emoji_Dab.png"
    ]

];
//2d array that contains the functionality of each function
//Each row's first element contains the string with the name of the command
//Each ro'w second element contains what is going to be display by the help command
//The other elements of the row are the possile answers
//Edit this to add more commands


//Might be used to call the switch function so it is easier to display the help

function Chansmessages(usermessage)
{

    var index; //Used to randomize when having mulitple return options

    usermessage = usermessage.slice(prefixlenght+1); //Removes the prefix so we can work with the other part of the message
    
    for(var i = 0; i < commands.length;i++) //Runs through all commands' elements to see if the message coincides with any function of the bot
    {
        if(usermessage === commands[i][0].toLowerCase()){ //Checks if the command is the same as in the commands[i][0] array
            index = Math.floor(Math.random() * (commands[i].length-2) + 2); //Randomizes an index of the available response options
            return commands[i][index]; //Returns the correspondent string to that index
        }
    }

     //Last case scenario where the string put after the prefix is not recognized
    return "Oni-Chan my Sensei didn't add this command!";
    
/*
    switch(usermessage){
        case "ping": //Just a test command for now
            return "pong!";
        case "Stromi":
            return "2Bee is cool!";
        case "Help":
            return "Will get added soon";
        case "devaster":
            index = Math.floor(Math.random() * adevaster.length);
            return adevaster[index];
        case "neko":
            index = Math.floor(Math.random() * aneko.length); //Randomizes a number bettwen 0 and the size of the aneko - 1
            return aneko[index];
        case "":
            return "Oni-Chan please put your command!";
        default:
            return "Oni-Chan my Sensei didn't add this command!";
    }*/
}
//Controls the bot's answers

client.on("ready", () => {
  console.log("Watashiwa KITA!");
});
//Outputs "Watashiwa KITA!" in the console when running the code

client.on("message", (message) => { //When there is a message in the server, gets an event and stores the message

    message.content = message.content.toLowerCase();//Makes the message case insensitive

    if (message.content.startsWith(`${prefix}`)) { //Only executes if it is a message to the bot
        let sender = message.member;

        //KICK
        if (message.content.startsWith(`${prefix} kick`)) {
            console.log("Kicking detected");

            if (sender.hasPermission("KICK_MEMBERS")) {
                let kuser = message.mentions.members.first();
                if(!kuser) return message.channel.send(`${sender} Dare?`);
                if(!kuser.hasPermission("KICK_MEMBERS")){
                    kuser.kick();
                    return message.channel.send(`${kuser} 's Mou Shindeiru!`);
                }

                else{
                    return message.channel.send(`${sender} Oi, trying to kick my Sensei? o.o`);
                }
                
            }

            else {
                return message.channel.send(`${sender} Oni-chan, you don't have permission to use this command, wari ;-;`);
            }
        }

        //BAN
        else if (message.content.startsWith(`${prefix} ban`)) {
            console.log("Ban detected");

            if (sender.hasPermission("BAN_MEMBERS")) {
                let buser = message.mentions.members.first();
                if(!buser) return message.channel.send(`${sender} Dare?`);
                if(!buser.hasPermission("BAN_MEMBERS"))
                {
                    message.guild.member(buser).ban();
                    return message.channel.send(`${buser} 's Mou Shindeiru!`);
                }

                else{
                    return message.channel.send(`${sender} Oi, trying to ban my Sensei? o.o`);
                }
            }

            else {
               return message.channel.send(`${sender} Oni-chan, you don't have permission to use this command, wari ;-;`);
            }
        }

        //MUTE
        else if (message.content.startsWith(`${prefix} mute`)) {
            console.log("Mute detected");
            if (sender.hasPermission("MANAGE_MESSAGES")) {
                let muser = message.mentions.members.first();
                if(!muser) return message.channel.send(`${sender} Dare?`);
                if (!muser.hasPermission("MANAGE_MESSAGES")) {
                    let muterole = message.guild.roles.find('name', "Muted");

                    if(!muser.roles.has(muterole.id)){
                        muser.addRole(muterole.id);
                        return message.channel.send(`${muser} You can't Shaberu for now! :3`);
                    }
                    else{
                        return message.channel.send(`${sender.muser} This Stromer can't Shaberu! You said that! .-.`);
                    }

                }
                else {
                    return message.channel.send(`${sender} Trying to mute someone who's stronger that you? >>>///<<<`);
                }

            }

            else {
                return message.channel.send( `${sender} Oni-chan, you don't have permission to use this command, wari ;-;`);
            }
        }

        //UNMUTE
        else if (message.content.startsWith(`${prefix} unmute`)) {
            console.log("Unmute detected");
            if (sender.hasPermission("MANAGE_MESSAGES")) {
                let umuser = message.mentions.members.first();
                if(!umuser) return message.channel.send(`${sender} Dare?`);
                if (!umuser.hasPermission("MANAGE_CHANNELS")) {
                    let muterole = message.guild.roles.find('name', "Muted");

                    if(umuser.roles.has(muterole.id)){
                        umuser.removeRole(muterole.id);
                        return message.channel.send(`${umuser} you can Shaberu now! :3`);
                    }
                    else{
                        return message.channel.send(`${sender.umuser} This Stromer can Shaberu! You said that! .-.`);
                    }
                }
                else {
                    return message.channel.send(`${sender} Trying to unmute someone who's stronger that you? How cute :>`);
                }
            }

            else {
                return message.channel.send(`${sender} Oni-chan, you don't have permission to use this command, wari ;-;`);
            }
        }

        //No command
        else if(message.content === `${prefix}`) //The user has just put -chan
        {
            return message.channel.send(`${sender} Don't know the commands Nii-Chan? Type **-chan Help** and it will tell you the common commands! Bakatshi o>o` );
        }

        //HELP
        else if(message.content.startsWith(`${prefix} help`))
        {
            var allcommandsstring = "";
            message.channel.send(`${sender} Here is a list of what you can do`);
            for(var i = 0; i < commands.length; i++)
            {
                allcommandsstring += "**" + commands[i][0] + "**" + " ~" + commands[i][1] + "~" + '\n'; //Makes so each new command is in bold, followed by its description and is succeeded by a new line
            }
            allcommandsstring += "Oni-Chan, these are all the bots the you can use Imada :3";
            message.channel.send(allcommandsstring);
            //Outputs the multiple commands: the first element of each row of the commands 2d array
        }

        else {
            return message.channel.send(Chansmessages(message.content));
        }

    }

});

client.login("NDc2MzcxNjgyOTA3NTIxMDM1.Dkx5cg.AZmbkFC1fB4OD7hzErfmqhONKsE");

/*client.on("message", (message) => { //When there is a message in the server, gets an event and stores the message
    if (message.content.startsWith(prefix +  " ping")) {
      message.channel.send("pong!");
    }
  });*/
  //Saving the code
