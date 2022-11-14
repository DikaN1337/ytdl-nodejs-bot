const fs = require('fs');
const ytdl = require('ytdl-core');
const readline = require('readline');
var prompt = require('prompt-sync')();

const questionconfirm = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

var url = prompt('URL do Video?\n');
	
const linkvideo = url;
const validURL = ytdl.validateURL(linkvideo);
if (validURL) {
	ytdl.getInfo(linkvideo).then(info => {
		const title = info.videoDetails.title;
		const channelName = info.videoDetails.ownerChannelName;
		const uploaded = info.videoDetails.uploadDate;
		console.log('\n\nVideo valido.\n\nNome: ' + title + '\nCanal: ' + channelName + '\nCarregado dia: ' + uploaded);
		questionconfirm.question('\n\nContinuar?\nS para continuar | N para cancelar\n', function (confirmresponse) {
			if ((confirmresponse == 'S' || confirmresponse == 's') || (confirmresponse == 'N' || confirmresponse == 'n')) {
				ytdl(linkvideo).pipe(fs.createWriteStream(title + '.mp4'));
				questionconfirm.close();
			}
		});
	});
}