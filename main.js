const { app, screen, Tray, globalShortcut, BrowserWindow } = require('electron')
const ioHook = require('iohook');
const path = require('path');
const keyCodes = require('./keys');
const iconPath = path.join(__dirname, 'images/oval@2x.png');

let mainWindow
let trays;
app.on('ready', createWindow)
app.on('window-all-closed', function () {
  ioHook.unregisterAllShortcuts();
  globalShortcut.unregisterAll()
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow()
})

function createWindow () {
  let display = screen.getPrimaryDisplay();
  let height = display.bounds.height;
  trays = new Tray(iconPath)

  mainWindow = new BrowserWindow({
    width: 500,
    height: 190,
    x: 0,
    y: height,
    frame: false,
    transparent: true
  })

  mainWindow.setIgnoreMouseEvents(true)

  ioHook.on('keydown', event => {
    trays.setTitle(keyCodes[event.rawcode]  || '' + '')
  });

  // ioHook.registerShortcut([3675, 42], (keys) => {
  //   trays.setTitle(`${keyCodes[55]} + ${keyCodes[56] }` || null)
  //   console.log('Shortcut called with keys:', keys)
  // });

  globalShortcut.register('Command+)', () => {
    toggleWindow()
  });

  globalShortcut.register('Command+1', () => {
    if (mainWindow.isVisible()) {
      changeImg('1')
    }
  });

  globalShortcut.register('Command+2', () => {
    if (mainWindow.isVisible()) {
      changeImg('2')
    }
  }); 

  globalShortcut.register('Command+3', () => {
    if (mainWindow.isVisible()) {
      changeImg('3')
    }
  }); 


  function toggleWindow () {
    if (mainWindow.isVisible()) {
      mainWindow.hide();
  } else {
      mainWindow.show();
  }
  }

  function changeImg(img) {
    mainWindow.webContents.executeJavaScript(`document.querySelector("img").src="../images/${img}.png";`)
  }

  ioHook.start();

  mainWindow.setAlwaysOnTop(true, "floating");
  mainWindow.setVisibleOnAllWorkspaces(true);
  mainWindow.setFullScreenable(false);
  mainWindow.loadURL(`file://${__dirname}/html/index1.html`)

  // Open the DevTools.---
  // mainWindow.webContents.openDevTools()

  mainWindow.on('closed', function () {
    mainWindow = null
  })
}