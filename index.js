const duration = `$replaceText[$replaceText[$splitText[1];(;];);] $textSplit[$songInfo[duration]; ]`

const current = `$replaceText[$replaceText[$splitText[1];(;];);] $textSplit[$songInfo[current_duration]; ]`

const duration1 = `$replaceText[$replaceText[$splitText[3];(;];);]$textSplit[$songInfo[duration]; ]`

const current1 = `$replaceText[$replaceText[$splitText[3];(;];);]$textSplit[$songInfo[current_duration]; ]`

const express = require('express');
const app = express();

app.get('/', (req, res) => {
	res.send('OI, ESTOU ONLINE');
});

app.listen(3000, () => {
	console.log('O bot foi adicionado!');
});

const dbdjs = require("dbd.js");

const bot = new dbdjs.Bot({

  

 token: "SEU TOKEN AQUI", 

 prefix: "seu prefix",

});

bot.status({

	text:"Song Love by: J.s",

	type: "LISTENING",

	time: 12

}) 

bot.status({

	text:"Fortnite",

	type: "PLAYING",

	time: 12

}) 

bot.variables({
 "duracao": ""
}) 

bot.onMessage() 

bot.command({

name: "play",

code: `

$onlyIf[$voiceID!=;{color:RED}{description: <:PeligroxX:785381669648597085>Entre em um canal de voz primeiro.}]

$title[<a:headphones:802038017707081779> add a playlist: $jsonRequest[http://api.somecool.repl.co/yt-search?search=$message;title;]]

$addField[Duration:;$jsonRequest[http://api.somecool.repl.co/yt-search?search=$message;duration;];no]

$addField[Add por:;$userTag[$authorID];no]

$addField[Volume Establecido:;%100;no]

$image[$jsonRequest[http://api.somecool.repl.co/yt-search?search=$message;thumbnail;]]

$playSong[$message;1s;yes;yes:x: Song not found]

$footer[Pedido por $username[$authorID];$authorAvatar] 

$addTimestamp

$color[RANDOM] `

})

bot.command({
	name: "np",
    code: `
$setUserVar[duration;$sendMessage[{title:$songInfo[title]}{url:$songInfo[url]}{description:$getObjectProperty[bar]
\`${current1} / ${duration1}\`

Pedido por <@$songInfo[userID]>}{thumbnail:$songInfo[thumbnail]}{color:GREEN}{footer:© J.s Bot | Music}{author:Now Playing:$userAvatar[$clientID]};yes]]
$djseval[const util = require('dbd.js-utils')
d.object.bar = util.progressBar(${current}, ${duration}, 20, "📀", "▬", "▬")]
$createObject[{}]`
})

bot.command({
  name: "queue",
  aliases: "playlist", 
  code: `
  $onlyIf[$voiceID!=;{color:RED}{description: <:PeligroxX:785381669648597085> Por favor entre em um canal de voz primeiro.}]
  $thumbnail[$serverIcon]
  $title[Playlist do servidor!]
  $description[10 primeiras musicas do serv:
  
  $queue[1]
  
  Canal: <#$voiceID>
  Pedido por: <@$songInfo[userID]>] 
  $footer[Pedido por 
  $username[$authorID];$authorAvatar]
  $addTimestamp
  $color[RANDOM] 
  `
})

bot.command({
  name: "volume", 
  aliases: "v", 
  code:`
  $argsCheck[>1;Volume da musica foi para \`100\`]
  $onlyIf[$message[1]<=100;{description:❌  Volume maximo é 100!}{color:RANDOM}]
  $if[$message[1]<=100]
  $volume[$message[1]]
  $endIf
  $if[$message[1]>=101]
  $addField[No se pudo! ;O volume maximo é 100;no]
  $endIf
  $color[RANDOM]
  $description[Volume aumentou para **$message[1]/100**]
  $deletecommand
  `
}) 

bot.command({
  name: "skip", 
  code: `
  $onlyIf[$voiceID!=;{color:RED}{description: 🤖BotError: Por favor entre em um canal de voz primeiro.}]
  $description[Música adiantada com sucesso!]
  $color[RANDOM]
  $skipSong
  $deletecommand
  `
})

bot.command({
  name: "stop",
  code: `
  $onlyIf[$voiceID!=;{color:RED}{description: <:PeligroxX:785381669648597085> Entre em um canal de voz primeiro.}]
$description[:A musica foi parada.]
$color[$getRoleColor[$highestRole[$clientID]]]
$stopSong
$suppressErrors
`
})

bot.command({
  name: "help",
  code: `
$title[Bot de música by: J.S]
$description[**Lista de comandos FVL music!**

\`play\` - Tocar uma música.
\`queue\` - Lista de reprodução.
\`skip\` - Pular música.
\`stop\`- Parar música.
\`volume\` - Aumentar volume da música.
\`np\` - Ver em qual min esta a música.

**Servidor Oficial do bot**
[clique aqui\\](https://discord.gg/7k7579zaBJ)] 
$footer[Pedido por $username[$authorID];$authorAvatar]
$color[RANDOM]
`
})
