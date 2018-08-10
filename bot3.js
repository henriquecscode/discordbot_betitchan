require('dotenv').load(); //DONT PASS THIS LINE INTO GLITCH.COM SINCE IT ALREADY GETS THE .ENV FILE

console.log("Running"); //First thing that outputs in the console
const Discord = require("discord.js");
const exp = require("./exp.js");
const client = new Discord.Client();

var prefix = "test" //The prefix that must be inplace before every message. Change here if tired of previous one
var prefixlenght = prefix.length

var commands = [

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

client.on('ready', function () { //Loads the info from the data file - Asyln
    exp.Load();
});

client.on("message", (message) => { //When there is a message in the server, gets an event and stores the message

    message.content = message.content.toLowerCase();//Makes the message case insensitive
    let sender = message.member; //This sender is used for permissions and other commands - Returns a GuildMember
    let expsender = message.author; //This sender is used for the exp commands - Returns a User

    //Adds exp to the author of the message - Asyln - NOT WORKING
    if (expsender.bot == false) { //Id of the sender sender is not the bot
        exp.AddExp(message);
    }

    //Commands
    if (message.content.startsWith(`${prefix}`)) { //Only executes if it is a message to the exp bot

        let logchannel = message.guild.channels.find('id', '477146921618767893'); //Gets the logchannel of the current server by ID so it can output the log messages

        let Smessage = message.content.trim().split(/ +/g); // This variable creates an array (Smessage) - trim() ensures there are no spaces before and after the text and spil(/ +/g) makes so the elements of the array are the words separated by one or more spaces
        let args = Smessage.slice(1); // This slices off the prefix in Smessage, only leaving the command and the arguments.
        /*
        Smessaage[0] is prefix
        Smessage[1] is the command
        args[0] is the command
        */

        //No command
        if (Smessage.length == 1) //The user has just put the prefix
        {
            return message.channel.send(`${sender} Don't know the commands Nii-Chan? Type **-chan Help** and it will tell you the common commands! Bakatshi o>o`);
        }

        else {
            switch (Smessage[1]) {

                //Exp commands - asyln
                case "rank": //if the command rank is used
                    exp.GetRank(message);
                    break;

                case "leaderboard"://if leaderboard is used
                    exp.GetLeaderboard(message);
                    break;

                case "manualmemberaccountcreation": //You will need to do this command one time for adding every member to the database
                    if (sender.hasPermission("ADMINISTRATOR")) { //Only admins have the permission
                        exp.Create(message);
                    }
                    break;


                case "save":
                    if (sender.hasPermission("ADMINISTRATOR")) {
                        exp.Save(message);
                    }
                    break;

                //Main commands - Henry
                case "kick":
                    if (sender.hasPermission("KICK_MEMBERS")) {
                        let kuser = message.mentions.members.first();
                        if (!kuser) return message.channel.send(`${sender} Dare?`);
                        if (!kuser.hasPermission("KICK_MEMBERS")) {

                            kuser.kick(); //Kick action
                            console.log("Kicking detected"); //Log in glitch.com
                            logchannel.send(`${kuser} was kicked by ${sender}`); //Log in logchannel
                            return message.channel.send(`${kuser} 's Mou Shindeiru!`);
                        }

                        else {
                            return message.channel.send(`${sender} Oi, trying to kick my Sensei? o.o`);
                        }

                    }

                    else {
                        return message.channel.send(`${sender} Oni-chan, you don't have permission to use this command, wari ;-;`);
                    }
                    break;

                case "ban":
                    if (sender.hasPermission("BAN_MEMBERS")) {
                        let buser = message.mentions.members.first();
                        if (!buser) return message.channel.send(`${sender} Dare?`);
                        if (!buser.hasPermission("BAN_MEMBERS")) {

                            message.guild.member(buser).ban(); //Ban action
                            console.log("Ban detected"); //Log in glitch.com 
                            logchannel.send(`${buser} was banned by ${sender}`); //Log in logchannel
                            return message.channel.send(`${buser} 's Mou Shindeiru!`);
                        }

                        else {
                            return message.channel.send(`${sender} Oi, trying to ban my Sensei? o.o`);
                        }
                    }

                    else {
                        return message.channel.send(`${sender} Oni-chan, you don't have permission to use this command, wari ;-;`);
                    }
                    break;

                case "mute":
                    if (sender.hasPermission("MANAGE_MESSAGES")) {
                        let muser = message.mentions.members.first();
                        if (!muser) return message.channel.send(`${sender} Dare?`);
                        if (!muser.hasPermission("MANAGE_MESSAGES")) {
                            let muterole = message.guild.roles.find('name', "Muted");

                            if (!muser.roles.has(muterole.id)) {

                                muser.addRole(muterole.id); //Mute action
                                console.log("Mute detected"); //Log in glitch.com
                                logchannel.send(`${muser} was muted by ${sender}`); //Log in logchannel
                                return message.channel.send(`${muser} You can't Shaberu for now! :3`);
                            }
                            else {
                                return message.channel.send(`${sender} This Stromer can't Shaberu! You said that! .-.`);
                            }

                        }
                        else {
                            return message.channel.send(`${sender} Trying to mute someone who's stronger that you? >>>///<<<`);
                        }

                    }

                    else {
                        return message.channel.send(`${sender} Oni-chan, you don't have permission to use this command, wari ;-;`);
                    }
                    break;

                case "unmute":
                    if (sender.hasPermission("MANAGE_MESSAGES")) {
                        let umuser = message.mentions.members.first();
                        if (!umuser) return message.channel.send(`${sender} Dare?`);
                        if (!umuser.hasPermission("MANAGE_CHANNELS")) {
                            let muterole = message.guild.roles.find('name', "Muted");

                            if (umuser.roles.has(muterole.id)) {

                                umuser.removeRole(muterole.id); //Unmute action
                                console.log("Unmute detected"); //Log in glitch.com
                                logchannel.send(`${umuser} was umuted by ${sender}`); //Log in logchannel
                                return message.channel.send(`${umuser} you can Shaberu now! :3`);
                            }
                            else {
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
                    break;

                case "delete":
                    async function deletemessages() { //Creates an async function so we can use the await command

                        if (sender.hasPermission("MANAGE_MESSAGES")) { //The sender can indeed delete messages
                            let numbertodelete = message.content.slice(prefixlenght + 8); //8 is the size of the " delete "

                            if (message.content === `${prefix} delete` || isNaN(numbertodelete)) { //The user didn't specify a valid number or just posted "-chan delete"
                                return message.channel.send(`${sender} Oni-Chan, please tell me how many messages should I delete 8.8!`);
                            }
                            else {

                                message.delete(); //Deletes the command message and catches the error if there was any
                                let todelete = await message.channel.fetchMessages({ limit: numbertodelete }); //Grabs the last "numbertodelete" messages in the channel
                                message.channel.bulkDelete(todelete) //Delete action
                                    .catch(error => console.error(error)); //Catches any errors
                                console.log("Delete detected"); //Log in glitch.com
                                logchannel.send(`${todelete.size} messages deleted by ${sender}`); //Log in logchannel
                                return message.channel.send(`**Nii-Chan I've deleted ${todelete.size} baka messages for you!**`); // Lets post into console how many messages we are deleting)
                            }
                        }

                        else { //The sender does not have the permissions
                            return message.channel.send(`${sender} Oni-chan, you don't have permission to use this command, wari ;-;`);
                        }
                    }
                    deletemessages(); //Runs the function we have just defined
                    break;

                case "addrole":
                    if (sender.hasPermission("ADMINISTRATOR")) { //Checks if the sender has the permission to add a role
                        let adduser = message.mentions.members.first(); //Gets the user to which the role is going to be added
                        let addrole = message.mentions.roles.first(); //Gets the role that is going to be added

                        if (!adduser || !addrole) { //There was a error
                            return message.channel.send(`${sender} Nii-Chan! You did something wrong! Baka! Q-Q`);
                        }
                        else { //No error in the mentions
                            if (!adduser.roles.has(addrole.id)) { //The user does not have the role to be given
                                if (!adduser.hasPermission("ADMINISTRATOR")) { //The user is not an admin: the role can be added

                                    adduser.addRole(addrole.id); //Add role action
                                    console.log("Add role detected"); //Log in glitch.com
                                    logchannel.send(`${sender} has added the role ${addrole} to ${adduser}`);
                                    return message.channel.send(`OMEDETETO! ${adduser} You have just got this Role! ${addrole}`)
                                }
                                else { //We are trying to give a role to another administrator
                                    return message.channel.send(` ${sender} BAKA! Don't deal with the KAMI!`);
                                }
                            }
                            else {
                                return message.channel.send(`${adduser} already has ${addrole}`);
                            }
                        }
                    }
                    else { //Sender does not have permission
                        return message.channel.send(`${sender} Oni-chan, you don't have permission to use this command, wari ;-;`); //
                    }
                    break;

                case "removerole":
                    if (sender.hasPermission("ADMINISTRATOR")) { //Checks if the sender has the permission to removed a role
                        let removeuser = message.mentions.members.first(); //Gets the user to which the role is going to be removed
                        let removerole = message.mentions.roles.first(); //Gets the role that is going to be removed

                        if (!removeuser || !removerole) { //There was a error
                            return message.channel.send(`${sender} Nii-Chan! You did something wrong! Baka! Q-Q`);
                        }
                        else { //No error in the mentions
                            if (removeuser.roles.has(removerole.id)) { //The user has the role to be removen
                                if (!removeuser.hasPermission("ADMINISTRATOR")) { //The user is not an admin: the role can be removed
                                    removeuser.removeRole(removerole.id); //Remove role action
                                    console.log("Remove role detected"); //Log in glitch.com
                                    logchannel.send(`${sender} has removed the role ${removerole} from ${removeuser}`); //Log in logchannel
                                    return message.channel.send(`OMEDETETO! ${removeuser}has got ${removerole} removen`)
                                }
                                else { //We are trying to remove a role from an administrator
                                    return message.channel.send(` ${sender} BAKA! Don't deal with the KAMI!`);
                                }
                            }
                            else {
                                return message.channel.send(`${removeuser} does not have ${removerole}`);
                            }
                        }
                    }
                    else { //Sender does not have permission
                        return message.channel.send(`${sender} Oni-chan, you don't have permission to use this command, wari ;-;`); //
                    }
                    break;

                case "help":
                    var allcommandsstring = "";
                    message.channel.send(`${sender} Here is a list of what you can do`);
                    for (var i = 0; i < commands.length; i++) {
                        allcommandsstring += "**" + commands[i][0] + "**" + " ~" + commands[i][1] + "~" + '\n'; //Makes so each new command is in bold, followed by its description and is succeeded by a new line
                    }
                    allcommandsstring += "Oni-Chan, these are all the bots the you can use Imada :3";
                    return message.channel.send(allcommandsstring);
                //Outputs the multiple commands: the first element of each row of the commands 2d array

                default:

                    return message.channel.send(chansmessages(message.content));
                    break;
            }

        }
    }
});

client.login(process.env.TOKEN); //Logs in using the token

client.on("guildMemberAdd", (member) => { //IF someone joins the server adds his information to the savefile
    console.log("Member joined the server");
    exp.MemberAdd(member);
});

client.on("guildMemberRemove", (member) => { //IF someone leaves the server removes his information from the savefile
    console.log("Member left the server");
    exp.MemberRemove();
  });

//Controls the bot's answers to simple commands
function chansmessages(usermessage) {

    var index; //Used to randomize when having mulitple return options

    usermessage = usermessage.slice(prefixlenght + 1); //Removes the prefix so we can work with the other part of the message

    for (var i = 0; i < commands.length; i++) //Runs through all commands' elements to see if the message coincides with any function of the bot
    {
        if (usermessage === commands[i][0].toLowerCase()) { //Checks if the command is the same as in the commands[i][0] array
            index = Math.floor(Math.random() * (commands[i].length - 2) + 2); //Randomizes an index of the available response options
            return commands[i][index]; //Returns the correspondent string to that index
        }
    }

    //Last case scenario where the string put after the prefix is not recognized
    return "Oni-Chan my Sensei didn't add this command!";

}

//To the level system
function MemberInfoSet(id, set, string) { // Id is the id of the member , set is what you want to change : 0 for id, 1 for lvl and 2 for XP and string the new id, lvl or xp
    for (var i = 0; i < MemberInfo.length; i++) { // For each member (MemberInfo.length is the number of member), we take their information
        UniqueMemberInfo = MemberInfo[i].split(separator) // Each information is separated by a string of your choise, here separator, and we use .split() to create an array with the info EX here : (separator = "$$")
        /*UniqueMemberInfo = 42847457156825$$7$$61*.split("$$") * is what is inside MemberInfo[i]
        UniqueMemberInfo[0] = 42847457156825 : user id
        UniqueMemberInfo[1] = 7 : lvl
        UniqueMemberInfo[2] = 61 : xp */

        if (UniqueMemberInfo[0] == id) { //looking for the user with the id
            UniqueMemberInfo[set] = string // When found, we remplace the lvl (if set = 1) or xp (if set = 0) by the string EX:
            //someone with an id have gained 17 xp and have now 78 xp , so we use MemberInfoSet(the id, 2, 78)
            MemberInfo[i] = Union(UniqueMemberInfo, separator) // tricky part, we use the function Union to recompacting the information EX:
            /* we had  UniqueMemberInfo[0] = 42847457156825 , UniqueMemberInfo[1] = 7 ,UniqueMemberInfo[2] = 78
            and now with Union(GuildInfo, "$$"), we have MemberInfo[i] = 42847457156825$$7$$78*/
        }
    }
}

function MemberInfoGet(id, get) {//Here we don't change any information, we just want it. id for the user we want to have his info and get for the info we want : 0 for id, 1 for lvl and 2 for XP
    for (var i = 0; i < MemberInfo.length; i++) { //same as MemberInfoSet
        UniqueMemberInfo = MemberInfo[i].split(separator)
        if (UniqueMemberInfo[0] == id) { var Gget = UniqueMemberInfo[get] } //We check every id and when there is the one we wanted we store the info we wanted in a variable
    }
    return Gget //return what we wanted
}

function Union(Uarray, Usymbols) { // Uarray for the array we want to unify into a single string and Usymbols for what string will be between everyinfo

    var CompressedArray = Uarray[0];
    for (var i = 1; i < Uarray.length; i++) {
        CompressedArray += Usymbols + Uarray[i];
    }
    return CompressedArray // we send back the information
}
  //End of level system functions

