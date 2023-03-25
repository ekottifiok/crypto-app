const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('cryptoChildAppAPI', {
    updateBTCValue: (value) => ipcRenderer.send('update-btc-value', value),
    windowQuit: () => ipcRenderer.send('quit-adjust-window')
})