const changeImg = (img, mainWindow) => {
  mainWindow.webContents.executeJavaScript(
    `document.querySelector("img").classList = "class${img}";`
  )
}

const toggleWindow = mainWindow => {
  if (mainWindow.isVisible()) {
    return mainWindow.hide()
  }
  mainWindow.show()
}

module.exports = {
  changeImg,
  toggleWindow
}
