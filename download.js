// ==UserScript==
// @name        9anime link grabber
// @namespace   yozo
// @description Grabs download urls from 9anime
// @include     https://9anime.to/watch/*
// @include     https://9anime.is/watch/*
// @version     1
// @grant       GM_setClipboard
// @noframes
// ==/UserScript==

var x;
var q360p=[];
var q480p=[];
var q720p=[],q1080p=[];

function get(url, callback) {
    var args = Array.prototype.slice.call(arguments, 2);
    var req = new XMLHttpRequest();
    req.open('GET', url, true);
    req.responseType = 'json';
    req.onload = function() {
        callback.apply(this, args);
    };
    req.send();
}

function pad(s) {
    if(s.length >= 3)
        return s;
    else
        return ('000' + s).substr(-3);
}

function process_info(ep) {
    urls[ep] = [];
    var json = this.response;
    if(json.type == 'direct') {
        var params = [];
        Object.keys(json.params).forEach(function(k) {
            params.push(encodeURIComponent(k) + '=' + encodeURIComponent(this[k]));
        }, json.params);
        var url = json.grabber + '?' + params.join('&');
        get(url, function(ep) {
            this.response.data.forEach(function(vid) {
                var name = title + ' Episode ' + pad(ep) + '-' + vid.label;
                name = encodeURIComponent(name);
                urls[ep].push(vid.file + '&title=' + name);
            });
        }, ep);
    }
    else {
        urls[ep].push(json.target);
    }
    window.setTimeout(process_queue, 1000);
}

function process_queue() {
    var item = queue.shift();
    if(typeof item != 'undefined') {
        if(item[1] in urls)
            window.setTimeout(process_queue, 0);
        else {
            get('/ajax/episode/info?id=' + item[0] + '&update=0', process_info, item[1]);
        }
    }
    else {
        queue_running = false;
        var keys = Object.keys(urls);
        var all_urls = Object.keys(urls).map(function(k) { return urls[k]; });
        //console.log(all_urls);

        for(var i=0; i<all_urls.length ; i++){
            var j = all_urls[i].length;
            if(j<2){
                var q360 = all_urls[i][0];
                q360p[i]=q360;
                span_360.setAttribute('style','display:inline');
            }
            else if(j<3){
                var q360 = all_urls[i][0];
                q360p[i]=q360;
                span_360.setAttribute('style','display:inline');
                var q480 = all_urls[i][1];
                q480p[i] = q480;
                span_480.setAttribute('style','display:inline');
            }
            else if(j<4){
                var q360 = all_urls[i][0];
                q360p[i]=q360;
                span_360.setAttribute('style','display:inline');
                var q480 = all_urls[i][1];
                q480p[i] = q480;
                var q720 = all_urls[i][2];
                q720p[i] = q720;
                span_480.setAttribute('style','display:inline');
                span_720.setAttribute('style','display:inline');
            }
            else if(j<5){
                var q360 = all_urls[i][0];
                q360p[i]=q360;
                span_360.setAttribute('style','display:inline');
                var q480 = all_urls[i][1];
                q480p[i] = q480;
                var q720 = all_urls[i][2];
                q720p[i] = q720;  
                var q1080 = all_urls[i][3];
                q1080p[i] = q1080;
                span_480.setAttribute('style','display:inline');
                span_720.setAttribute('style','display:inline');
                span_1080.setAttribute('style','display:inline');
            }
        }
        //console.log(q360p);
        //console.log(q480p);
        //console.log(q720p);
        //console.log(q1080p);
        span_360.addEventListener('click', function copytocb(){    
            window.alert("All links(360p) are copied to clipboard.");
            var txt = [].concat.apply([], q360p).join('\n');
            GM_setClipboard(txt);});
        span_480.addEventListener('click', function copytocb(){    
            window.alert("All links(480p) are copied to clipboard.");
            var txt = [].concat.apply([], q480p).join('\n');
            GM_setClipboard(txt);});
        span_720.addEventListener('click', function copytocb(){    
            window.alert("All links(720p) are copied to clipboard.");
            var txt = [].concat.apply([], q720p).join('\n');
            GM_setClipboard(txt);});
        span_1080.addEventListener('click', function copytocb(){    
            window.alert("All links(1080p) are copied to clipboard.");
            var txt = [].concat.apply([], q1080p).join('\n');
            GM_setClipboard(txt);});
        //span_480.addEventListener('click', copytocb(q480p));
        //GM_setClipboard(txt);
        grabbing_div.style.display = 'none';
        download_button.style.display = 'none';
        l_div.style.display = 'block';
    }
}

function grab_links() {
    if(!queue_running) {
        queue_running = true;
        grabbing_div.style.display = 'block';
        download_button.style.display = 'none';
        process_queue();
    }
}

var urls = {};
var queue = [];
var queue_running = false;
var title = document.querySelector('h1.title').textContent.trim();
var servers = document.getElementById('servers');
var episodes = servers.querySelectorAll('ul:not(.hidden) a');
for(let i = 0, len = episodes.length; i < len; ++i) {
    let id = episodes[i].getAttribute('data-id');
    let ep = episodes[i].getAttribute('data-comment');
    queue.push([id, ep]);
}
var download_button = document.createElement('div');
download_button.setAttribute('class', 'alert alert-primary notice');
download_button.setAttribute('style', 'cursor:pointer;text-align:center;');
download_button.innerHTML = 'Grab download links';
download_button.addEventListener('click', grab_links);
var grabbing_div = document.createElement('div');
grabbing_div.setAttribute('class', 'alert alert-primary notice');
grabbing_div.setAttribute('style', 'text-align:center;display:none');
grabbing_div.innerHTML = 'Grabbing links, please wait...';
var l_div = document.createElement('div');
l_div.setAttribute('class', 'alert alert-primary notice');
l_div.setAttribute('style', 'text-align:center;display:none;');

var span_360 = document.createElement('span');
span_360.setAttribute('class', 'alert alert-primary notice');
span_360.setAttribute('style', 'cursor:pointer;text-align:center;margin-left:50px;margin-right:50px;display:none');
span_360.innerHTML = '360p';
l_div.appendChild(span_360);
var span_480 = document.createElement('span');
span_480.setAttribute('class', 'alert alert-primary notice');
span_480.setAttribute('style', 'cursor:pointer;text-align:center;margin-left:50px;margin-right:50px;display:none');
span_480.innerHTML = '480p';
l_div.appendChild(span_480);

var span_720 = document.createElement('span');
span_720.setAttribute('class', 'alert alert-primary notice');
span_720.setAttribute('style', 'cursor:pointer;text-align:center;margin-left:50px;margin-right:50px;display:none');
span_720.innerHTML = '720p';
l_div.appendChild(span_720);
var span_1080 = document.createElement('span');
span_1080.setAttribute('class', 'alert alert-primary notice');
span_1080.setAttribute('style', 'cursor:pointer;text-align:center;margin-left:50px;margin-right:50px;display:none');
span_1080.innerHTML = '1080p';
l_div.appendChild(span_1080);
servers.parentElement.insertBefore(l_div, servers);
servers.parentElement.insertBefore(download_button, servers);
servers.parentElement.insertBefore(grabbing_div, servers);
