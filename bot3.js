require('dotenv').load(); //DONT PASS THIS LINE INTO GLITCH.COM SINCE IT ALREADY GETS THE .ENV FILE

console.log("Running"); //First thing that outputs in the console
const Discord = require("discord.js");
const commando = require("discord.js-commando");
const client = new Discord.Client();
const exp = require("./exp.js");
const mod = require("./mod.js");
const entertainers = require("./entertainers.js");
const welcome = require ("./welcome.js");
const music = require ("./music.js");

var prefix = "test" //The prefix that must be inplace before every message. Change here if tired of previous one
var prefixlenght = prefix.length

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

        let logchannel = message.guild.channels.find('name', 'betit_log'); //Gets the logchannel of the current server by ID so it can output the log messages

        let Smessage = message.content.trim().split(/ +/g); // This variable creates an array (Smessage) - trim() ensures there are no spaces before and after the text and spil(/ +/g) makes so the elements of the array are the words separated by one or more spaces
        let args = Smessage.slice(1); // This slices off the prefix in Smessage, only leaving the command and the arguments.
        /*
        Smessaage[0] is prefix
        Smessage[1] is the command
        args[0] is the command
        */

        //No command
        if (!Smessage[1]) //The user has just put the prefix
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
                    exp.CallGetLeaderboard(message);
                    break;

                case "save":
                    if (sender.hasPermission("ADMINISTRATOR")) {
                        exp.Save();
                        message.channel.send("Saved !");
                    }
                    break;

                //Main commands - Henry
                case "kick":
                    mod.Kick(message, sender, logchannel);
                    break;

                case "ban":
                    mod.Ban(message, sender, logchannel);
                    break;

                case "mute":
                    mod.Mute(message, sender, logchannel);
                    break;

                case "unmute":
                    mod.Unmute(message, sender, logchannel);
                    break;

                case "delete":
                    mod.Delete(message, sender, logchannel);                    
                    break;

                case "addrole":
                    mod.AddRole(message, sender, logchannel);
                    break;

                case "removerole":
                    mod.removeRole(message, sender, logchannel);
                    break;

            
                case "play":
                case "p": //This syntax allows to check both cases
                    music.MusicPlay(message, Smessage[2]);
                    break;

                case "skip":
                console.log("Skip Music request");
                    music.MusicSkip();
                    break;

                case "stop":
                console.log("Stop Music Request");
                    music.MusicStop(message);
                    break;

                case "help":
                    var allcommandsstring = "";
                    var entertainercommands = entertainers.GetCommands();
                    message.channel.send(`${sender} Here is a list of what you can do`);
                    for (var i = 0; i < entertainercommands.length; i++) {
                        allcommandsstring += "**" + entertainercommands[i][0] + "**" + " ~" + entertainercommands[i][1] + "~" + '\n'; //Makes so each new command is in bold, followed by its description and is succeeded by a new line
                    }
                    allcommandsstring += "Oni-Chan, these are all the bots the you can use Imada :3";
                    return message.channel.send(allcommandsstring);
                //Outputs the multiple commands: the first element of each row of the commands 2d array


                case "admin": //Enables the calling of certain functions to debug and check problems
                    if(sender.hasPermission("ADMINISTRATOR")){
                        switch(Smessage[2]){

                            case "exp.logmemberinfo":
                                exp.LogMemberInfo(logchannel);
                                message.channel.send("Operation performed: exp log member info");
                                console.log("Operation performed: log member info");
                                break;

                            case "exp.backupload":
                                exp.Load("savefilebackup.txt");
                                message.channel.send("Operation performed: exp backup load");
                                console.log("Operation performed: backupload");
                                break;

                            case "exp.manualmemberaccountcreation": //You will need to do this command one time for adding every member to the database
                                exp.Create(message);
                                message.channel.send("Operation performed exp manual member account creation");
                                console.log("Operation performed exp manual member account creation");
                                break;

                            default:
                                return message.channel.send("Command not recognized");

                        }
                        
                    }
                    else{
                        message.channel.send("This is an admin job. You are not allowed to do that");
                    }
                    break;

                case "avatar":
                    entertainers.GetAvatar(message);
                    break;

                default:
                    entertainers.Othermessages(message, Smessage[1]);
                    break;
            }

        }
    }
});

client.login(process.env.TOKEN); //Logs in using the token

client.on("guildMemberAdd", (member) => { //IF someone joins the server adds his information to the savefile
    if(member.guild.id == 473162355128139776){ //Grants that we are talking about Stromi2Bee server
        console.log("Member joined the server");
        exp.MemberAdd(member.user.id); //Adds to the database

        welcome.Welcomeimage(member) //Processes the member and sends the welcome image
    }

});

client.on("guildMemberRemove", (member) => { //IF someone leaves the server removes his information from the savefile
    if(member.guild.id == 392970070155984897){ //Grants that we are talking about Stromi2Bee server
        console.log("Member left the server");
        exp.CallMemberRemove(member.user.id);
    }
  });



