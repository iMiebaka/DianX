const { app, BrowserWindow } = require("electron");
const path = require("path");
const { execSync } = require("child_process");

const server = require("./server");
// const output = execSync("./index-linux", { encoding: "utf-8" });
// console.log(output);


function createWindow() {
  const win = new BrowserWindow({
    width: 1024,
    height: 800,
    show: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
    icon: path.join(__dirname, "splash/icons8-file-500.png"),
});

var splash = new BrowserWindow({
    width: 800,
    height: 600,
    transparent: true,
    frame: false,
    center: true,
    icon: path.join(__dirname, "splash/icons8-file-500.png"),
    // alwaysOnTop: true,
  });

  splash.loadFile("splash/index.html");
  splash.center();
  //win.removeMenu();
  win.loadURL("http://localhost:9339");

  setTimeout(function () {
    splash.close();
    win.show();
  }, 5000);
}
app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
