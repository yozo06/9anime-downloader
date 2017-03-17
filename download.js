// CONFIG
var siteName = "9anime"
var rootUrl = 'http://9anime.to'
var URL = window.location.origin
// END CONFIG

var episodeLinks = $('div.col-md-21.col-sm-20 a').map(function(i,el) { return $(el).attr('href'); });

$.ajaxSetup({async:false});
//$.getScript(rootUrl + "/Scripts/asp.js");

console.log('Starting ' + siteName + ' Batch Downloader script...');

var startEpisode;
do {
	startEpisode = Number(prompt("Enter episode (listing) number you want to start from", defaultText="1"));
	if(startEpisode <= 0 || startEpisode > episodeLinks.length) {
		alert("Episode number entered must be greater than 0 and lesser than total number of eps"); 
	} else {
		break; 
	}
} while(true);

var endEpisode;
do {
	endEpisode = Number(prompt("Enter episode (listing) number you want to end at", defaultText="2"));
	if(endEpisode <= 0 || endEpisode > episodeLinks.length || endEpisode < startEpisode) {
		alert("Episode number entered must be greater than 0 and lesser than total number of eps");
	} else {
		break;
	}
} while(true);

var i;
for(i=StarEpisode -1; i<=endEpisode - 1; i++)
{
	output.push('<table>')
	for (var i = 0; i < myarray .length; i += 2) {
    		output.push('<tr><td>')
    		output.push(myarray [i])
    		output.push('</td><td>')
    		output.push(myarray [i+1])
    		output.push('</td></tr>')
	};
	output.push('</table>')	
}
