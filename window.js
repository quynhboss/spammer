const {app, BrowserWindow, session} = require('electron');
const url = require('url');

let mainWindow;


// const {getCurrentWindow, globalShortcut} = require('electron').remote;

app.on('ready', async () => {
	mainWindow = new BrowserWindow({
		resizable: false,
		modal: true, show: false,
		// height: 800,
		// width: 1000, 
		autoHideMenuBar: true,
		webPreferences: {
			enableRemoteModule: true,
			nodeIntegration: false,
		},
		icon: __dirname + '/facebook.png',
		title: "Tool spam FB",
		webviewTag: true
	});

	mainWindow.maximize();
	// mainWindow.loadURL('http://localhost:2022');
	mainWindow.loadURL('http://localhost:2022');
	mainWindow.webContents.openDevTools();
	mainWindow.on('ready-to-show', function () {
		mainWindow.show();
	});
	// mainWindow.webContents.insertCSS('html,body{ overflow: hidden !important; }');
	mainWindow.on('closed', function () {
		mainWindow = null
	});
});