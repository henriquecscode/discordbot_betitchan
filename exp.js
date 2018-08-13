const fs = require('fs');//EXP - thing needed to store data in a txt file if the bot goes off 
const Discord = require("discord.js"); //Here used for the commands and the embeds

var MemberInfo //information of every user
var UniqueMemberInfo //information of one user
var xp //xp of one user, because it's prettier than UniqueMemberInfo[2] (explained latter)
var lvl//lvl of one user, because it's prettier than UniqueMemberInfo[1] (explained latter)
var Axp //xp of everyone
var Alvl //lvl of everyone
var Aid // id of everyone
var xplvlup //xp needed to lvl up
var separator = ","//the separator separate info (lvl, xp and user id) in the MemberInfo
var separator2 = ";"//the separator2 separate members in the txt file
//you should see the functions first!

exports.Load = function (savefile = "savefile.txt") { //Loads the info from the savefile, standardly is savefile.txt
  fs.readFile(savefile, 'utf8', function (err, data) { //if you want information when the bot is off and get it back you need this
    if (err) throw err;//Probably throws the error away
    MemberInfo = data.split(separator2) //get an array from the stored string

    /*for(var i = 0; i < MemberInfo.length; i++){
      Allinfo.push(MemberInfo[i].split(separator));
    }*/
    //Should work better not yet
    console.log("Loaded EXP System");
  })
};

exports.Save = function () {
  console.log("Save request");
  var CompressedInfo = Union(MemberInfo, separator2) //we take the MemberInfo array and transform it into a big string with members separated by separator2
  const fs = require('fs');
  fs.writeFile('savefile.txt', CompressedInfo, (err) => { //and then save it
    if (err) throw err;
  });
}

exports.AddExp = function (message) {

  var bonus //bonus xp
  lvl = parseInt(MemberInfoGet(message.author.id, 1)) //we obtain we this fonction xp and lvl
  xp = parseInt(MemberInfoGet(message.author.id, 2)) //parseInt is necessary because MemberInfoGet(message.author.id, 2) is a string not a number
  xplvlup = Math.pow(2 * lvl, 2) + 35 * lvl + 50 //the algorithm for the xp needed to lvl up, you are free to change it
  if (message.content.length <= 10) { bonus = 1 / 2 } //if some post shorts messages (like 10 or less characters) he will have 1/4 of the xp he should gain
  else if (message.content.length <= 20) { bonus = 1 } //same as before
  else if (message.content.length <= 40) { bonus = 1.1 } //same as before                 //You are free to change this
  else if (message.content.length <= 80) { bonus = 1.2 } //same as before
  else { bonus = 1.3 }//if someone post a message with more that 80 characters, he will have an xp boost of 1.3
  //console.log(bonus)
  //console.log(Math.ceil((Math.random() * 5 + lvl / 2) * bonus))
  xp += Math.ceil((Math.random() * 5 + lvl / 2) * bonus) // xp gained algorithm, free to change this
  if (xp >= xplvlup) { // if you have enough xp to lvl up
    xp = xp - xplvlup // you lose the xp needed to level up
    lvl++ //you gain one level
    MemberInfoSet(message.author.id, 2, xp) //set the new xp into database
    MemberInfoSet(message.author.id, 1, lvl)//set the new lvl
    message.channel.send("GG! " + message.author + " is now level " + lvl + "!") //message when lvl up change it please :D
  } else { //if you not lvl up
    MemberInfoSet(message.author.id, 2, xp) //you just set the xp
  }
};

exports.GetRank = function (message) {

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
}

exports.CallGetLeaderboard = function (message) {
  GetLeaderboard(message);
}

exports.Create = function (message) {
  var EveryUserId = message.guild.members.keyArray() //message.guild.members.keyArray() this will give all users id
  for (var i = 0; i < EveryUserId.length; i++) { //Create every account
    MemberInfo[i] = EveryUserId[i] + separator + "1" + separator + "0"
  }
  message.channel.send("members succesfully added to database!");
  console.log("EXP System creatd"); //Log in glitch.com
}

exports.MemberAdd = function (memberid) {
  MemberInfo.push(memberid + separator + "1" + separator + "0") // we add his information to the database with a base lvl of 1 and xp of 0
  console.log("Member added to EXP System");
}

exports.CallMemberRemove = function (memberid) { //Export function that calls the local one
  MemberRemove(memberid);
}


exports.LogMemberInfo = function (logchannel) {
  var loginfo = [];
  for (var i in MemberInfo) {
    if (loginfo.length < 15) { //Only prints 15 member's info to safely keep below the 2000 characters message
      loginfo.push(`${MemberInfo[i]} \n`);
    }
    else {
      logchannel.send(`\`\`\`${loginfo}\`\`\``);
      loginfo = [];
    }
  }
  if (loginfo.length != 0) {//If Memberinfo.lenght != 0 there will still be information stored that we need to output
    logchannel.send(`\`\`\` ${loginfo} \`\`\``);
  }
}

function GetLeaderboard(message) {
  console.log("Leaderboard request");
  var leaderboarduser = ["", "", "", "", "", "", "", "", "", ""] //This are the base value for the leaderboard if there is less than 10 members
  var leaderboardlvl = ["", "", "", "", "", "", "", "", "", ""]
  var leaderboardxp = ["", "", "", "", "", "", "", "", "", ""]
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
      leaderboarduser[i] = message.guild.members.find('id', Aid[bestone]) //we get the member with that id
      if (leaderboarduser[i] === null) { //If the user is not found for not being in the server
        console.log("User not found");
        MemberRemove(Aid[bestone]); //Remove the user from the data base
        console.log("Removing from data base");
        return GetLeaderboard(message); //Run the code again
      }
      else {
        leaderboarduser[i] = leaderboarduser[i].nickname //we get the nickname of that member
        if (leaderboarduser[i] === null) { //The guild member has not changed is nickname on the server
          leaderboarduser[i] = message.guild.members.find('id', Aid[bestone]).user.username //Displays his true name instead of his nickname
        }
        leaderboarduser[i] = `${i + 1}: ${leaderboarduser[i]}`; //Gets the line for the leaderbord
        leaderboardlvl[i] = "lvl : " + Alvl[bestone]; //we get the lvl of the player
        leaderboardxp[i] = "xp : " + Axp[bestone]; // we get the xp of the player
        Aid.splice(bestone, 1) //and most important part we reomve from the list the best player so when we will find the second it will not be this best player again
        Alvl.splice(bestone, 1) //that why bestone will be the best player in MemberInfo the first time but the second the second time etc...
        Axp.splice(bestone, 1)
      }
    }
    else { i = 10 } // if there is no longer players to test we stop here
  }
  var embed = new Discord.RichEmbed(); //a new embed
  embed.addField("Leaderboard", leaderboarduser, true); //addField(name, vaule, inline);
  embed.addField("LVL", leaderboardlvl, true);
  embed.addField("XP", leaderboardxp, true);
  embed.setColor(0x35A7BF) //the color of the embed
  message.channel.send("", embed) //we send the embed
}

function MemberRemove(memberid) { //Removes the member from the data base
  for (var i = 0; i < MemberInfo.length; i++) {
    UniqueMemberInfo = MemberInfo[i].split(separator) //We check every profile
    if (UniqueMemberInfo[0] == memberid) {//And when we find the good one
      MemberInfo.splice(i, 1) // we remove his information
      i = MemberInfo.length //Ends the loop
    }
  }
  console.log("Member removed from EXP System");
}

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

