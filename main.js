import { app, BrowserWindow } from 'electron';

let splash;
let mainWindow;

function createSplash(){

  splash = new BrowserWindow({

    width:500,
    height:300,

    frame:false,

    alwaysOnTop:true,

    transparent:false,

    backgroundColor:'#050816'
  });

  splash.loadFile(
    'Public/splash.html'
  );
}

function createWindow(){

  mainWindow = new BrowserWindow({

    width:1200,
    height:900,

    backgroundColor:'#050816',

    show:false,

    webPreferences:{
      nodeIntegration:false,
      contextIsolation:true
    }
  });

  mainWindow.loadURL(
    'https://quimicaapp-production-8943.up.railway.app/'
  );

  mainWindow.once('ready-to-show', () => {

    splash.close();

    mainWindow.show();
  });
}

app.whenReady().then(() => {

  createSplash();

  createWindow();
});

app.on('window-all-closed', () => {

  app.quit();
});