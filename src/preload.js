const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('cryptoAppAPI', {
    createAdjustWindow: () => ipcRenderer.send('create-adjust-window'),
    alertBTCValue: (callback) => ipcRenderer.on('alert-btc-value', callback),
    currentBTC: (callback) => ipcRenderer.on('current-btc-value', (_event, args) => callback(args)),
})
