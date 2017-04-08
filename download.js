var URL = window.location.origin

var opportunity = $('div._3p9kRQ59EPzoyXOgTz7NYA a').map(function(i,el) { return $(el).attr('href'); });
var op_url= URL+opportunity[0];
window.open(op_url);

var start_chat = document.getElementsByClassName("_2G_E8q0NNNYJBYrFTijbo6");
var Rate = start_chat[0];
Rate.click();

document.getElementById("offerMessageArea").value= "Hey I am Sanjali from India. I think I can help you. Please feel free to drop me a message. Thank you :)";

var submit = document.getElementsByClassName("_2VhLTLyqvnfoTfiXiNyoFF");
var Send = start_chat[0];
Send.click();

window.close();
