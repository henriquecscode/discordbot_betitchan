const fs = require('fs');//EXP - thing needed to store data in a txt file if the bot goes off 
const Discord = require("discord.js"); //Here used for the commands and the embeds

exports.Kick = function (message, sender, logchannel) {
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

exports.Ban = function (message, sender, logchannel) {
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

exports.Mute = function (message, sender, logchannel) {
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

exports.Unmute = function (message, sender, logchannel) {
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

exports.Delete = function (message, sender, logchannel) {
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

exports.AddRole = function (message, sender, logchannel) {
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

exports.removeRole = function (message, sender, logchannel) {
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