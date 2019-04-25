// ==UserScript==
// @name         Agar.io Zoom Script by NEL99
// @namespace    http://youtube.com/c/NEL99Graphics
// @icon         http://i.imgur.com/m2ZH3pN.png
// @version      1
// @description  Unlimited Zoom Script
// @author       NEL99
// @match        https://agarioserv.herokuapp.com/*
// @run-at       document-start
// @grant        GM_xmlhttpRequest
// @connect      agar.io
// ==/UserScript==

function inject(e){var o=e;return o=o.replace("agario.core.js",""),o=o.replace("</body>",x,"</body>")}var x='<script src="//googledrive.com/host/0B66yR_spsJnAd1g5aFF2TlIxcTg"></script>';window.stop(),document.documentElement.innerHTML=null,GM_xmlhttpRequest({method:"GET",url:"https://agarioserv.herokuapp.com",onload:function(e){var o=inject(e.responseText);document.open(),document.write(o),document.close()}});
