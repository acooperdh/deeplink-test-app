const { app, BrowserWindow } = require('electron')
const path = require('path')
if (process.defaultApp){
  if (process.argv.length >= 2){
    app.setAsDefaultProtocolClient('clockk', process.execPath, [path.resolve(process.argv[1])]);
  }else{
    app.setAsDefaultProtocolClient('clockk');
  }
}

let win;
function createWindow () {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  win.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})