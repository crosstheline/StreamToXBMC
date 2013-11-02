/*
 * Copyright (c) 2010 The Chromium Authors. All rights reserved.  Use of this
 * source code is governed by a BSD-style license that can be found in the
 * LICENSE file.
 */
var regex = /'file': '(.+?)'/;
var url = document.URL;
var ein = /einthusan/;
var allmyv = /allmyvideos/;
var vidto = /vidto/;
var playedto = /played/;
var megafiles = /megafiles/;
var bestreams = /bestreams/;
var cbs = /cbs/;

if(allmyv.test(url))
    regex = /"file" : "(.+?)"/;
else if(vidto.test(url))
    regex = /file_link = '(.+?)'/;
else if(playedto.test(url))
    regex = /file: "(.+?)"/
else if(megafiles.test(url))
    regex = /file_link = '(.+?)'/
else if(bestreams.test(url))
    regex = /file: "(.+?)"/
else if(cbs.test(url))
    regex = /video.settings.pid = '(.*?)';/


// Test the text of the body element against our regular expression.
    if (regex.test(document.body.innerHTML)) {
      // The regular expression produced a match, so notify the background page.
      chrome.extension.sendRequest({msg:regex.exec(document.body.innerHTML), url:url}, function(response) {});
    } else {
      // No match was found.
    }
