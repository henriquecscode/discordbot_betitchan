require('dotenv').load(); //DONT PASS THIS LINE INTO GLITCH.COM SINCE IT ALREADY GETS THE .ENV FILE

console.log("Running"); //First thing that outputs in the console
const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require('fs');//EXP - thing needed to store data in a txt file if the bot goes off 

var prefix = "-chan" //The prefix that must be inplace before every message. Change here if tired of previous one
var prefixlenght = prefix.length

//Variables for the exp
var expprefix = "!cp" //did I really need to explain this ? xD
var Smessage //don't worry about this
var SSmessage //Not being used

var MemberInfo //information of every user
var UniqueMemberInfo //information of one user
var xp //xp of one user, because it's prettier than UniqueMemberInfo[2] (explained latter)
var lvl//lvl of one user, because it's prettier than UniqueMemberInfo[1] (explained latter)
var Axp //xp of everyone
var Alvl //lvl of everyone
var Aid // id of everyone
var xplvlup //xp needed to lvl up
var separator = "f47h$$"//the separator separate info (lvl, xp and user id) in the MemberInfo
var separator2 = "g26t��"//the separator2 separate members in the txt file
//End of variables for the exp

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
    fs.readFile("savefile.txt", 'utf8', function (err, data) { //if you want information when the bot is off and get it back you need this
      if (err) throw err;//I don't know what this is
      MemberInfo = data.split(separator2) //get an array from the stored string
      
      /*for(var i = 0; i < MemberInfo.length; i++){
        Allinfo.push(MemberInfo[i].split(separator));
      }*/
      //Should work better not yet - Henry
      console.log("I'm ready!")
    })
  });

client.on("message", (message) => { //When there is a message in the server, gets an event and stores the message

    message.content = message.content.toLowerCase();//Makes the message case insensitive
    let sender = sender; //The sender is the author of the message

    //Adds exp to the author of the message - Asyln
    if (sender.bot == false) {
        var bonus //bonus xp
        lvl = parseInt(MemberInfoGet(sender.id, 1)) //we obtain we this function xp and lvl
        xp = parseInt(MemberInfoGet(sender.id, 2)) //parseInt is necessary because MemberInfoGet(sender.id, 2) is a string not a number
        xplvlup = Math.pow(2 * lvl, 2) + 35 * lvl + 50 //the algorithm for the xp needed to lvl up, you are free to change it
        if (message.content.length <= 10) { bonus = 1 / 2 } //if some post shorts messages (like 10 or less characters) he will have 1/4 of the xp he should gain
        else if (message.content.length <= 20) { bonus = 1 } //same as before
        else if (message.content.length <= 40) { bonus = 1.1 } //same as before                 //You are free to change this
        else if (message.content.length <= 80) { bonus = 1.2 } //same as before
        else { bonus = 1.3 }//if someone post a message with more that 80 characters, he will have an xp boost of 1.3
        console.log(bonus)
        console.log(Math.ceil((Math.random() * 5 + lvl / 2) * bonus))
        xp += Math.ceil((Math.random() * 5 + lvl / 2) * bonus) // xp gained algorithm, free to change this
        if (xp >= xplvlup) { // if you have enough xp to lvl up
            xp = xp - xplvlup // you lose the xp needed to level up
            lvl++ //you gain one level
            MemberInfoSet(sender.id, 2, xp) //set the new xp into database
            MemberInfoSet(sender.id, 1, lvl)//set the new lvl
            message.channel.send("GG! " + sender + " is now level " + lvl + "!") //message when lvl up change it please :D
        } else { //if you not lvl up
            MemberInfoSet(sender.id, 2, xp) //you just set the xp
        }

        //Main commands -Henry
        if (message.content.startsWith(`${prefix}`)) { //Only executes if it is a message to the chan bot

            let logchannel = message.guild.channels.find('name', 'betit_log'); //Gets the logchannel of the current server so it can output the log messages

            let cont = message.content.slice(prefix.length).split(" "); // This variable slices off the prefix, then puts the rest in an array based off the spaces
            let args = cont.slice(1); // This slices off the command in cont, only leaving the arguments.

            //KICK
            if (message.content.startsWith(`${prefix} kick`)) {

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
            }

            //BAN
            else if (message.content.startsWith(`${prefix} ban`)) {

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
            }

            //MUTE
            else if (message.content.startsWith(`${prefix} mute`)) {

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
            }

            //UNMUTE
            else if (message.content.startsWith(`${prefix} unmute`)) {

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
            }

            //DELETE
            else if (message.content.startsWith(`${prefix} delete`)) {

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
            }

            //ADD ROLE
            else if (message.content.startsWith(`${prefix} addrole`)) {

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
            }

            //REMOVE ROLE
            else if (message.content.startsWith(`${prefix} removerole`)) {

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
            }

            //No command
            else if (message.content === `${prefix}`) //The user has just put -chan
            {
                return message.channel.send(`${sender} Don't know the commands Nii-Chan? Type **-chan Help** and it will tell you the common commands! Bakatshi o>o`);
            }

            //HELP
            else if (message.content.startsWith(`${prefix} help`)) {

                var allcommandsstring = "";
                message.channel.send(`${sender} Here is a list of what you can do`);
                for (var i = 0; i < commands.length; i++) {
                    allcommandsstring += "**" + commands[i][0] + "**" + " ~" + commands[i][1] + "~" + '\n'; //Makes so each new command is in bold, followed by its description and is succeeded by a new line
                }
                allcommandsstring += "Oni-Chan, these are all the bots the you can use Imada :3";
                message.channel.send(allcommandsstring);
                //Outputs the multiple commands: the first element of each row of the commands 2d array
            }

            else {
                return message.channel.send(chansmessages(message.content));
            }

        }

        //Exp commands - Asyln
        else if (message.content.startsWith(`${expprefix}`)) { //Only executes if it is a message to the exp bot
            Smessage = message.content.split(" ")
            switch (Smessage[1]) {

                case "rank": //if the command rank is used
                    var rank = 1 //your rank in the server is set to one
                    var MentionedUser //the user you mentionned in the message
                    var Title //the title of the embed
                    var thumbnail //the pfp
                    Alvl = [] //Everyone's lvl in an array
                    Axp = []//Everyone's xp in an array

                    if (message.mentions.users.firstKey() !== undefined) { //if someone is mentionned
                        MentionedUser = message.mentions.users.firstKey() //then we take his id
                        Title = "Stats of " + message.mentions.users.first().username //we set the title with his username
                        thumbnail = message.mentions.users.first().avatarURL //and his avatarURL
                    }

                    else { //if not
                        MentionedUser = message.author.id //we take the id of the author of the comment
                        Title = "Your stats :"
                        thumbnail = message.author.avatarURL //and his avatarURL
                    }

                    lvl = parseInt(MemberInfoGet(MentionedUser, 1)) //We obtain the xp and lvl of the MentionedUser or the author if none
                    xp = parseInt(MemberInfoGet(MentionedUser, 2))

                    for (var i = 0; i < MemberInfo.length; i++) { //for everyuser
                        UniqueMemberInfo = MemberInfo[i].split(separator) //we take their information
                        Alvl.push(UniqueMemberInfo[1]) //and we only take their xp and lvl
                        Axp.push(UniqueMemberInfo[2])
                    }
                    for (var i = 0; i < Alvl.length; i++) {//now we calcualte the rank of the user, if someone have higher lvl or same lvl or same lvl but higher xp, your gain one rank
                        if (lvl < Alvl[i]) { rank++ }
                        else if (lvl == Alvl[i]) {
                            if (xp < Axp[i]) { rank++ }
                        }
                    }
                    xplvlup = Math.pow(2 * lvl, 2) + 35 * lvl + 50 //we caculate the xp needed to lvl up
                    var embed = new Discord.RichEmbed(); //a new embed
                    embed.addField(Title, //the title of the embed
                        "lvl : " + lvl + "\n" + //your lvl
                        "xp : " + xp + "\n" +//your xp
                        "xp needed to lvl up : " + (xplvlup - xp) + "\n" + //the xp you have still to gain before lvl up
                        "rank in this server : " + rank + "/" + MemberInfo.length //and your rank
                    )
                    embed.setThumbnail(thumbnail) //the pfp
                    embed.setColor(0x35A7BF)  //the color of the embed
                    message.channel.send("", embed) //then we send it
                    break;

                //ok leaderboard is a lot tricky so yeah it's will be a bit hard to explain
                case "leaderboard":
                    var leaderboarduser = ["your mom ", "your mom ", "your mom ", "your mom ", "your mom ", "your mom ", "your mom ", "your mom ", "your mom ", "your mom "] //This are the base value for the leaderboard if there is less than 10 members
                    var leaderboardlvl = ["is gay ", "is gay ", "is gay ", "is gay ", "is gay ", "is gay ", "is gay ", "is gay ", "is gay ", "is gay "]
                    var leaderboardxp = ["omegalul", "omegalul", "omegalul", "omegalul", "omegalul", "omegalul", "omegalul", "omegalul", "omegalul", "omegalul"]
                    var bestone = 0 //ok this value is the best user in the array. If the best user is in MemberInfo, then it's will be 4, well, than exactly that but you will understand later
                    Alvl = [] //Everyone's lvl
                    Axp = []//Everyone's xp
                    Aid = []//Everyone's id
                    for (var i = 0; i < MemberInfo.length; i++) { // that the same thing as rank
                        UniqueMemberInfo = MemberInfo[i].split(separator)
                        Aid.push(UniqueMemberInfo[0])
                        Alvl.push(UniqueMemberInfo[1])
                        Axp.push(UniqueMemberInfo[2])
                    }
                    for (var i = 0; i < 10; i++) {//10 for the 10 best users in the leaderboard.
                        bestone = 0 //reseted

                        for (var j = 0; j < Alvl.length; j++) {
                            if (parseInt(Alvl[j]) < Alvl[bestone]) { } //If bestone has a better lvl than the current tested player , nothing to do
                            else if (parseInt(Alvl[j]) == Alvl[bestone]) { //If bestone have the same lvl than the current tested player
                                if (parseInt(Axp[j]) >= Axp[bestone]) { bestone = j }
                            }// and if the current tested player have a better xp than bestone, he become bestone
                            else { bestone = j }//and if the current tested player have a better lvl than bestone , he become the new bestone
                        }

                        if (Alvl.length !== 1) { //if there is still players to test, with your server it'll be always true
                            console.log(Aid[bestone])
                            leaderboarduser[i] = message.guild.members.get(Aid[bestone]).user.username //we get the username of the best player
                            leaderboardlvl[i] = "lvl : " + Alvl[bestone] //we get the lvl of the player
                            leaderboardxp[i] = "xp : " + Axp[bestone] // we get the xp of the player
                            Aid.splice(bestone, 1) //and most important part we reomve from the list the best player so when we will find the second it will not be this best player again
                            Alvl.splice(bestone, 1) //that why bestone will be the best player in MemberInfo the first time but the second the second time etc...
                            Axp.splice(bestone, 1)
                        }
                        else { i = 10 } // if there is no longer players to test we stop here
                    }
                    var embed = new Discord.RichEmbed(); //a new embed
                    embed.addField("Leaderboard", //title of the first column
                        "1  : " + leaderboarduser[0] + "\n" + //fthe usernames
                        "2  : " + leaderboarduser[1] + "\n" +
                        "3  : " + leaderboarduser[2] + "\n" +
                        "4  : " + leaderboarduser[3] + "\n" +
                        "5  : " + leaderboarduser[4] + "\n" +
                        "6  : " + leaderboarduser[5] + "\n" +
                        "7  : " + leaderboarduser[6] + "\n" +
                        "8  : " + leaderboarduser[7] + "\n" +
                        "9  : " + leaderboarduser[8] + "\n" +
                        "10 : " + leaderboarduser[9]
                        , true)

                    embed.addField("LVL",//title of the second column

                        leaderboardlvl[0] + "\n" + //the lvls
                        leaderboardlvl[1] + "\n" +
                        leaderboardlvl[2] + "\n" +
                        leaderboardlvl[3] + "\n" +
                        leaderboardlvl[4] + "\n" +
                        leaderboardlvl[5] + "\n" +
                        leaderboardlvl[6] + "\n" +
                        leaderboardlvl[7] + "\n" +
                        leaderboardlvl[8] + "\n" +
                        leaderboardlvl[9]
                        , true)

                    embed.addField("XP",//title of the thrid column
                        leaderboardxp[0] + "\n" +//the xp
                        leaderboardxp[1] + "\n" +
                        leaderboardxp[2] + "\n" +
                        leaderboardxp[3] + "\n" +
                        leaderboardxp[4] + "\n" +
                        leaderboardxp[5] + "\n" +
                        leaderboardxp[6] + "\n" +
                        leaderboardxp[7] + "\n" +
                        leaderboardxp[8] + "\n" +
                        leaderboardxp[9]
                        , true)
                    embed.setColor(0x35A7BF) //the color of the embed
                    message.channel.send("", embed) //we send the embed
                    break;

                case "manualmemberaccountcreation": //You will need to do this command one time for adding every member to the database, only ADMINS should be authorized to do this command as this reset everything
                    var EveryUserId = message.guild.members.keyArray() //message.guild.members.keyArray() this will give all users id
                    for (var i = 0; i < EveryUserId.length; i++) { //Create every account
                        MemberInfo[i] = EveryUserId[i] + separator + "1" + separator + "0"
                    }
                    message.channel.send("members succesfully added to database!")
                    break;

                case "save":
                    var CompressedInfo = union(MemberInfo, separator2) //we take the MemberInfo array and transform it into a big string with members separated by separator2
                    const fs = require('fs');
                    fs.writeFile('savefile.txt', CompressedInfo, (err) => { //and then save it
                        if (err) throw err;
                        message.channel.send("Saved !")
                    });
                    break;


                default: //don't worry about this
                    message.channel.send("sorry this command is shit i can't understand it")
            }
        };
    }

});

client.login(process.env.TOKEN); //Logs in using the token

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
            MemberInfo[i] = union(UniqueMemberInfo, separator) // tricky part, we use the function union to recompacting the information EX:
            /* we had  UniqueMemberInfo[0] = 42847457156825 , UniqueMemberInfo[1] = 7 ,UniqueMemberInfo[2] = 78
            and now with union(GuildInfo, "$$"), we have MemberInfo[i] = 42847457156825$$7$$78*/
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

function union(Uarray, Usymbols) { // Uarray for the array we want to unify into a single string and Usymbols for what string will be between everyinfo

    var CompressedArray = Uarray[0];
    for (var i = 1; i < Uarray.length; i++) {
        CompressedArray += Usymbols + Uarray[i];

        return CompressedArray // we send back the information
    }
}
  //End of level system functions

