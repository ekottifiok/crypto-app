const { app, BrowserWindow, ipcMain, Notification } = require('electron');
const path = require('path');
const shell = require('electron').shell
const axios = require('axios')


// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

let alertBTCvalue = 0;
let notificationFlag = 1;



const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 650,
    height: 380,
    webPreferences: {
      autoHideMenuBar: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  const adjustWindow = new BrowserWindow({
    autoHideMenuBar: true,
    parent: mainWindow,
    modal: true,
    show: false,
    height: 200,
    width: 400,
    webPreferences: {
      autoHideMenuBar: true,
      preload: path.join(__dirname, 'childPreload.js'),
    },
  })

  ipcMain.on('create-adjust-window', () => {
    modal = path.join(__dirname, 'assets', 'html', 'notify.html')
    adjustWindow.loadFile(modal)
    adjustWindow.show()
  })

  ipcMain.on('quit-adjust-window', () => {
    adjustWindow.hide()
  })

  ipcMain.on('update-btc-value', (_event, value) => {
    alertBTCvalue = value
    notificationFlag = 1;
  })




  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'assets', 'html', 'index.html'));

  setInterval(() => axios.get("https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC&tsyms=USD")
    .then(res => {
      let api_btc_usd = res.data.BTC.USD
      mainWindow.send('current-btc-value', api_btc_usd)
      if (+alertBTCvalue > 0 && notificationFlag && +alertBTCvalue < +api_btc_usd) {
        new Notification({
          title: 'BTC Alert',
          body: 'BTC just went above your target price',
        }).show();
        notificationFlag = 0
      }
    }).catch(() => console.log("axios failed")), 1000)

  setInterval(() => mainWindow.send('alert-btc-value', alertBTCvalue), 1000)


  // Open the DevTools.
  // mainWindow.webContents.openDevTools();

  const isMac = process.platform === 'darwin'

};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
