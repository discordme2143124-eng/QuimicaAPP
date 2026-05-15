import { app, BrowserWindow } from 'electron';

let mainWindow;

/* =========================================
   CREAR VENTANA
========================================= */

function createWindow(){

  mainWindow = new BrowserWindow({

    width:1200,

    height:900,

    backgroundColor:'#050816',

    webPreferences:{

      nodeIntegration:false,

      contextIsolation:true
    }
  });

  mainWindow.loadURL(
    'https://quimicaapp-production.up.railway.app'
  );
}

/* =========================================
   APP READY
========================================= */

app.whenReady().then(() => {

  createWindow();
});

/* =========================================
   CERRAR TODO
========================================= */

app.on('window-all-closed', () => {

  app.quit();
});