// Requires
const fs = require('fs');
const aws = require("./modules/aws");

// Dependencies
const {app, BrowserWindow, ipcMain, ipcRenderer } = require('electron');

// Create Window
function createWindow() {
	let win = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			nodeIntegration: true
		}
	});
	aws.init();
	win.loadFile("index.html");
	win.webContents.openDevTools();
}

// Get bucket list when requested
ipcMain.on('req-list-buckets', (e, arg) => {
	aws.getBuckets((buckets) => {
		e.reply('res-list-buckets', buckets);
	});
});

// Create window when ready
app.on('ready', createWindow);