const Discord = require("discord.js");

const Canvas = require('canvas')
const snekfetch = require('snekfetch');

//EDIT according to the image in use
var welcome = "welcome.png"; //path
var canvaswith = 750; //width of the canvas not the picture
var canvasheight = 225; //height of the canvas not the picture

//VARIABLES to define the text and the avatar placement
//Avatar
var avatarsizemultiplier = 1.5 //Size of the avatar, relatively to 1/4 of the image height
var avatarsurroundingsize = 3 //Size of the white circle surrounding the avatar
var avatarymiddle = canvasheight/2;
var avatarxmiddle = 100; //Position of the avatar in the x axis
var radius = canvasheight/4;

//Info
var texty = 70; //title's top left y
var textx = 200; //title's top left x
var textspacement = 10; //absolute spacement between title and subtitle
var titlefontsize = 40;
var titlefonttype = 'Times New Roman';
var subtitlefontsize = 30;
var subtitlefonttype = 'Times New Roman';

exports.Welcomeimage = async function (member) {

  const canvas = Canvas.createCanvas(canvaswith, canvasheight);
  const ctx = canvas.getContext('2d');
  console.log("Creation of canvas complete");

  const background = await Canvas.loadImage(welcome); //await the image to load
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height); //streches the image to the canvas
  console.log("Drawn image");

  //Information display
  ctx.fillStyle = '#ffffff' //color of the font
  ctx.strokeStyle = '#ffffff' //color of the stroke

  ctx.font = `${titlefontsize}px ${titlefonttype}`; //Font size from library
  ctx.fillText(`Welcome ${member.user.tag}`, textx, texty) //ctx.fillText(string, x, y)
  //ctx.strokeText(`Welcome ${member.user.tag}`,textx, texty) //strokeText: draws the path correpsonding to the text

  ctx.font = `${subtitlefontsize}px ${subtitlefonttype}`;
  ctx.fillText(`to Stromi2Bee Official \nPlease enjoy your time here \nOnii-Chan`, textx, texty + titlefontsize + textspacement);
  //ctx.strokeText(`to Stromi2Bee Official \nPlease enjoy your time here`, textx, texty + titlefontsize + textspacement);
  console.log("Information added");


  //White circle surrounding the avatar
  ctx.fillstyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(avatarxmiddle, avatarymiddle, radius * avatarsizemultiplier + avatarsurroundingsize, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.fill();


  //Circle clip surronding
  ctx.beginPath(); //Picks up the pen
  ctx.arc(avatarxmiddle, avatarymiddle, radius * avatarsizemultiplier, 0, Math.PI * 2, true); //ctx.arc(xcenter,ycenter,radius,startAngle,endAngle,counterclockwise: boolean;
  ctx.closePath(); //Put the pen down
  ctx.clip(); //Clips off the region you drew on from the canvas
  console.log("Cut avatar circle");

  //Avatar placement
  const { body: buffer } = await snekfetch.get(member.user.displayAvatarURL); //Get the icon of the user in form of a buffer
  const avatar = await Canvas.loadImage(buffer); //Awaits for the canvas to load the image(avatar)
  ctx.drawImage(avatar, avatarxmiddle - radius * avatarsizemultiplier, avatarymiddle - radius * avatarsizemultiplier, radius * 2 * avatarsizemultiplier, radius * 2 * avatarsizemultiplier);//Draw a shape onto the main canvas //drawImage(image, xposition, yposition, width, height)
  console.log("Loaded avatar");

  const attachment = new Discord.Attachment(canvas.toBuffer(), 'welcome-image.png');
  let welcomechannel = member.guild.channels.get("473807283894353960"); //Gets the welcome channel by its id
  welcomechannel.send(member, attachment) //Sends the image
  return attachment;
} 