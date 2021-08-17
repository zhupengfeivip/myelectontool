// Modules to control application life and create native browser window
const { app, Menu, dialog, BrowserWindow } = require('electron')
const path = require('path')
// const dialogsss = require('electron').dialog

let mainWindow
function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    // backgroundColor: "#111",
    // show: false,
    resizable: false,
    fullscreen: false,
    fullscreenable: false,
    frame: true,
    titleBarStyle: 'hidden',
    title: "APP",
    center: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
      preload: path.join(__dirname, 'preload.js'),
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('www/index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  const menu = Menu.buildFromTemplate(menuForMac)
  Menu.setApplicationMenu(menu)
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

let menuForMac = [{
  label: "设置",
  submenu: [{
    label: '关于',
    accelerator: '',
    click: () => {
      dialog.showMessageBox(mainWindow, {
        type: "none",
        title: "关于",
        message: "\nzhupengfei",
      })
    }
  }, {
    label: '反馈',
    accelerator: '',
    click: () => {
      shell.openExternal("https://gitee.com/hamm/tester")
    }
  },
  { type: 'separator' }, {
    label: '调试',
    accelerator: "",
    click: (item, focusedWindow) => {
      if (focusedWindow) {
        focusedWindow.toggleDevTools()
      }
    }
  }, {
    label: '退出',
    // accelerator: function() {
    //     if (process.platform == 'darwin') {
    //         return 'Command+Q';
    //     } else {
    //         return 'Alt+F4';
    //     }
    // }(),
    accelerator: "",
    click: () => {
      app.quit()
    }
  }
  ]
}, {
  label: "窗口(&W)",
  submenu: [
    //     {
    //     label: '全屏',
    //     accelerator: '',
    //     click: () => {
    //         if (win.isFullScreen()) {
    //             win.setFullScreen(false)
    //         } else {
    //             win.setFullScreen(true)
    //         }
    //     }
    // }, 
    {
      label: '最大',
      accelerator: "",
      click: (item, focusedWindow) => {
        if (mainWindow.isMaximized()) {
          mainWindow.unmaximize()
        } else {
          mainWindow.maximize()
        }
      }
    },
    {
      label: '置顶',
      accelerator: "",
      click: (item, focusedWindow) => {
        if (mainWindow.isAlwaysOnTop()) {
          mainWindow.setAlwaysOnTop(false)
        } else {
          mainWindow.setAlwaysOnTop(true)
        }
      }
    },
    { type: 'separator' },
    {
      label: '沉浸',
      accelerator: "Command+Esc",
      click: (item, focusedWindow) => {
        if (mainWindow.isKiosk() || mainWindow.isFullScreen()) {
          mainWindow.setKiosk(false)
          setTimeout(() => { mainWindow.setFullScreen(false) }, 100)
        } else {
          mainWindow.setKiosk(true)
        }
      }
    }
  ]
},
  // {
  //   label: '编辑',
  //   submenu: [
  //     { role: 'undo', label: '撤销' },
  //     { role: 'redo', label: '重做' },
  //     { type: 'separator' },
  //     { role: 'cut', label: '剪切' },
  //     { role: 'copy', label: '复制' },
  //     { role: 'paste', label: '粘贴' },
  //     { role: 'selectall', label: '全选' }
  //   ]
  // }
]