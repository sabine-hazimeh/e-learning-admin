const { app, BrowserWindow } = require("electron");
const url = require("url");
const path = require("path");

function createMainWindow() {
  const mainWindow = new BrowserWindow({
    title: "admin page",
    width: 1000,
    height: 600,
  });

  mainWindow.loadURL("http://localhost:3002");
}
app.whenReady().then(createMainWindow);
