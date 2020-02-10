const changeImg = (img, mainWindow) => {
  mainWindow.webContents.executeJavaScript(
    `document.querySelector("img").src="../images/${img}.png";`
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
