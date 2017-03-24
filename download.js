// CONFIG
var siteName = "9anime"
var rootUrl = 'http://9anime.to'
var URL = window.location.origin;
// END CONFIG

var episodeLinks = $('div.col-md-21.col-sm-20 a').map(function(i,el) { return $(el).attr('href'); });

$.ajaxSetup({async:false});
$.getScript(rootUrl + "/Scripts/asp.js");
var URL = window.location.origin

var long_url; 

var startEpisode; 
do {
	startEpisode = prompt("Enter episode number you want to start from");
	if(startEpisode <= 0 || startEpisode > episodeLinks.length) {
		alert("Episode number entered must be greater than 0 and lesser than total number of eps"); 
	} else {
		break; 
	}
} while(true); 

var endEpisode; 
do {
	endEpisode = prompt("Enter episode number you want to end at");
	if(endEpisode <= 0 || endEpisode > episodeLinks.length || endEpisode < startEpisode) {
		alert("Episode number entered must be greater than 0 and lesser than total number of eps");
	} else {
		break;
	}
} while(true); 
var videoQuality = prompt("Enter video quality you want to download. Example - '960x720.mp4' (without the quotes)"); 

var i; 
for (i = (episodeLinks.length - startEpisode); i >= (episodeLinks.length - endEpisode); i--) {
	jQuery.ajax({
         url:    URL + episodeLinks[i], 
         success: function(result) {
                    var $result = eval($(result));
					var stringStart = result.search("var wra"); 
					var stringEnd = result.search("document.write"); 
					var javascriptToExecute = result.substring(stringStart, stringEnd);
					eval(javascriptToExecute);
					
					$("body").append('<div id="episode' + i + '" style="display: none;"></div>')
					$('#episode' + i).append(wra); 
					
					var downloadQualityOptions = $('#episode' + i + ' a').map(function(i,el) { return $(el); });
					var j; 
					for(j = 0; j < downloadQualityOptions.length; j++) {
						if(videoQuality === downloadQualityOptions[j].html()) {
							long_url = downloadQualityOptions[j].attr('href');
							console.log(i);
							console.log(long_url);
							get_short_url(long_url, login, api_key);
						}
					}
                  },
         async:   false, 
		 script:  true
    });       
}

