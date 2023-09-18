# discord-otochat-ai
Discord AI-like Bot<p>
Discordで動く~~怪文書生成Bot~~自然言語処理(笑)AIです。<p>
Glitchでインポートすれば再現できます。
```js
/*
Paste this code into GAS.
After that, please execute it once and allow the access authority etc.
Set the GAS timer at 5 minute intervals and run it.
*/

var GLITCH_PROJECT_NAME = "" // Enter your Glitch project name here.
var GLITCH_URL = `https://${GLITCH_PROJECT_NAME}.glitch.me`;
function wakeGlitch(){
 var json = {
   'type':'wake'
 };
 sendGlitch(GLITCH_URL, json);
}
function sendGlitch(uri, json){
 var params = {
   'contentType' : 'application/json; charset=utf-8',
   'method' : 'post',
   'payload' : json,
   'muteHttpExceptions': true
 };
 response = UrlFetchApp.fetch(uri, params);
}
```
質問などがあればDiscordの **@otoneko.** まで<p>
このコードを基にした自作Bot **Otochat AI**: https://bit.ly/otochat-ai<p>
Support: https://discord.gg/yKW8wWKCnS
