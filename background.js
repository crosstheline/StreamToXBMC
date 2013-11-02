// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Called when a message is passed.  We assume that the content script
// wants to show the page action.
var videoLink;
var pageurl;
function onRequest(request, sender, sendResponse) {
  // Show the page action for the tab that the sender (content script)
  // was on.
  var cbs = /cbs/;
  var base = /base="(.+?)"\/>/
  var video = /<video src="(.+?)" /
  var mp4 = /\.mp4/
  var swfUrl = 'http://canstatic.cbs.com/chrome/canplayer.swf';
  chrome.pageAction.show(sender.tab.id);
  videoLink = request.msg[1];
  console.log(videoLink);
  pageurl = request.url;
  console.log(pageurl);
  if(cbs.test(pageurl))
  {
    var actualurl = "http://link.theplatform.com/s/dJ5BDC/"+videoLink+"?format=SMIL&Tracking=true&mbr=true";
    var res = actualurl;//encodeURIComponent(actualurl); 
    console.log("Success");
      $.ajax({
        type: "GET",
        url: res,
        success: function(xml) {
           console.log("Success response");
           var rtmpbase = base.exec(xml)[1];
           var playpath = video.exec(xml)[1];
           if(mp4.test(playpath))
           {
            playpath = 'mp4:'+playpath;
           }
           videoLink = rtmpbase+' playpath='+playpath+" swfurl="+swfUrl+" swfvfy=true";
           console.log(rtmpbase);
           console.log(playpath);
           console.log(videoLink);
        },
           error: function (xml) {
                alert(xml.status + ' ' + xml.statusText);
                }
      });
  }
  // Return nothing to let the connection be cleaned up.
  sendResponse({});
};

// Listen for the content script to send a message to the background page.
chrome.extension.onRequest.addListener(onRequest);

chrome.pageAction.onClicked.addListener(function() {
  var ip = localStorage["ip"];
  var port = localStorage["port"];
  if(!ip) {
    alert('XBMC IP address not configured, Do it from the options page');
    return;
  }
  if(!port)
    var address = 'http://' + ip +'/jsonrpc';
  else
    var address = 'http://' + ip + ':' + port +'/jsonrpc';
  console.log(address);
  var data = {};
  data.jsonrpc = "2.0";
  data.id = 1;
  data.method = "Player.Open";
  data.params = {};
  data.params.item = {};
  data.params.item.file = videoLink;
  $.ajax({
        type: 'POST',
        dataType: 'json',
        contentType: "application/json",
        data: JSON.stringify(data),
        url: address,
        success: function(sdata){
        console.log(sdata);
        }
    });
});