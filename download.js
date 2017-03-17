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
	episodeLinks.push('<table>')
	for (var j = 0; j < myarray .length; j += 2) {
    		episodeLinks.push('<tr><td>')
    		episodeLinks.push(myarray [i])
    		episodeLinks.push('</td><td>')
    		episodeLinks.push(myarray [i+1])
    		episodeLinks.push('</td></tr>')
	};
	episodeLinks.push('</table>')	
}

<script type='text/javascript' src='https://code.jquery.com/jquery-1.11.0.min.js'></script>
//<!-- If you want to use jquery 2+: https://code.jquery.com/jquery-2.1.0.min.js -->
<script type='text/javascript'>
$(document).ready(function () {
console.log("HELLO")
function exportTableToCSV($table, filename) {
var $headers = $table.find('tr:has(td)')

// Temporary delimiter characters unlikely to be typed by keyboard
// This is to avoid accidentally splitting the actual contents
,tmpColDelim = String.fromCharCode(11) // vertical tab character
,tmpRowDelim = String.fromCharCode(0) // null character
// actual delimiter characters for CSV format
,colDelim = '","'
,rowDelim = '"\r\n"';
// Grab text from table into CSV formatted string
var csv = '"';
csv += formatRows($headers.map(grabRow));
csv += rowDelim;
//csv += formatRows($rows.map(grabRow)) + '"';
// Data URI
var csvData = 'data:application/csv;charset=utf-8,' + encodeURIComponent(csv);
$(this)
.attr({
'download': filename
,'href': csvData
//,'target' : '_blank' //if you want it to open in a new window
});
//------------------------------------------------------------
// Helper Functions
//------------------------------------------------------------
// Format the output so it has the appropriate delimiters
function formatRows(rows){
return rows.get().join(tmpRowDelim)
.split(tmpRowDelim).join(rowDelim)
.split(tmpColDelim).join(colDelim);
}
// Grab and format a row from the table
function grabRow(i,row){
var $row = $(row);
//for some reason $cols = $row.find('td') || $row.find('th') won't work...
var $cols = $row.find('td');
if(!$cols.length) $cols = $row.find('th');
return $cols.map(grabCol)
.get().join(tmpColDelim);
}
// Grab and format a column from the table
function grabCol(j,col){
var $col = $(col),
$text = $col.text();
return $text.replace('"', '""'); // escape double quotes
}
}
// This must be a hyperlink
$("#export").click(function (event) {
// var outputFile = 'export'
var outputFile = window.prompt("What do you want to name your output file (Note: This won't have any effect on Safari)") || 'export';
outputFile = outputFile.replace('.csv','') + '.csv'
// CSV
exportTableToCSV.apply(this, [$('#dvData>table'), outputFile]);
// IF CSV, don't do event.preventDefault() or return false
// We actually need this to be a typical hyperlink
});
});
