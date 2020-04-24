const { app, screen, Tray, globalShortcut, BrowserWindow } = require('electron')
const ioHook = require('iohook')
const path = require('path')
const keyCodes = require('./keys')
const { changeImg, toggleWindow } = require('./utils')
const iconPath = path.join(__dirname, 'images/oval@2x.png')

let mainWindow
let trays
app.on('ready', createWindow)
app.on('window-all-closed', function() {
  ioHook.unregisterAllShortcuts()
  globalShortcut.unregisterAll()
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function() {
  if (mainWindow === null) createWindow()
})

function createWindow() {
  let display = screen.getPrimaryDisplay()
  let height = display.bounds.height
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
    trays.setTitle(keyCodes[event.rawcode] || '' + '')
  })

  // If you want to show something like 'CMD + C' (Copy)
  // ioHook.registerShortcut([3675, 42], (keys) => {
  //   trays.setTitle(`${keyCodes[55]} + ${keyCodes[56] }` || null)
  //   console.log('Shortcut called with keys:', keys)
  // });

  globalShortcut.register('Command+)', () => {
    toggleWindow(mainWindow)
  })

  globalShortcut.register('Command+1', () => {
    if (mainWindow.isVisible()) {
      changeImg('1', mainWindow)
    }
  })

  globalShortcut.register('Command+2', () => {
    if (mainWindow.isVisible()) {
      changeImg('2', mainWindow)
    }
  })

  globalShortcut.register('Command+3', () => {
    if (mainWindow.isVisible()) {
      changeImg('3', mainWindow)
    }
  })

  globalShortcut.register('Command+4', () => {
    if (mainWindow.isVisible()) {
      changeImg('4', mainWindow)
    }
  })
  ioHook.start()

  mainWindow.setAlwaysOnTop(true, 'floating')
  mainWindow.setVisibleOnAllWorkspaces(true)
  mainWindow.loadURL(`file://${__dirname}/html/index.html`)

  // Open the DevTools.---
  // mainWindow.webContents.openDevTools()

  mainWindow.on('closed', function() {
    mainWindow = null
  })
}
