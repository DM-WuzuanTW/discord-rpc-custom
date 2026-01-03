const { app, BrowserWindow, ipcMain, Tray, Menu, nativeImage } = require('electron');
const path = require('path');
const db = require('../database/store');
const rpcManager = require('../core/rpcManager');

let mainWindow;
let tray;
let isQuitting = false;

// Initialize Database
db.initDb();

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 900,
        height: 700,
        minWidth: 800,
        minHeight: 600,
        frame: false, // Custom titlebar design
        titleBarStyle: 'hidden',
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            sandbox: false,
            contextIsolation: true,
            nodeIntegration: false
        },
        backgroundColor: '#0f172a', // slate-900 matches default theme
        icon: path.join(__dirname, '../../resources/icon.png') // Setup icon later
    });

    // Load UI
    // In dev, load from vite server. In prod, load from index.html
    const isDev = !app.isPackaged;
    const startUrl = isDev ? 'http://localhost:5173' : `file://${path.join(__dirname, '../../dist/index.html')}`;

    mainWindow.loadURL(startUrl);

    if (isDev) {
        // mainWindow.webContents.openDevTools();
    }

    mainWindow.on('close', (event) => {
        if (!isQuitting) {
            event.preventDefault();
            mainWindow.hide();
            return false;
        }
    });
}

function createTray() {
    const iconPath = path.join(__dirname, '../../resources/icon.png'); // Placeholder
    // Use a default icon if missing for dev stability
    const trayIcon = nativeImage.createFromPath(iconPath);

    tray = new Tray(trayIcon.isEmpty() ? path.join(__dirname, 'tray_fallback.png') : trayIcon);

    const contextMenu = Menu.buildFromTemplate([
        { label: 'Show App', click: () => mainWindow.show() },
        { type: 'separator' },
        { label: 'Stop RPC', click: () => stopRpcHandler() },
        { type: 'separator' },
        {
            label: 'Quit', click: () => {
                isQuitting = true;
                app.quit();
            }
        }
    ]);

    tray.setToolTip('Discord RPC Manager');
    tray.setContextMenu(contextMenu);

    tray.on('double-click', () => {
        mainWindow.show();
    });
}

// IPC Handlers
ipcMain.handle('db:get-settings', () => db.getSettings());
ipcMain.handle('db:get-setting', (_, id) => db.getSettingById(id));
ipcMain.handle('db:save-setting', (_, setting) => db.addSetting(setting));
ipcMain.handle('db:update-setting', (_, id, setting) => db.updateSetting(id, setting));
ipcMain.handle('db:delete-setting', (_, id) => db.deleteSetting(id));
ipcMain.handle('app:get-active-id', () => db.getActiveSettingId());
ipcMain.handle('app:set-active-id', (_, id) => db.setActiveSettingId(id));

// RPC Handlers
ipcMain.handle('rpc:start', async (_, config) => {
    try {
        await rpcManager.connect(config.clientId);
        await rpcManager.setActivity(config);
        updateTrayStatus(true);
        return { success: true };
    } catch (error) {
        return { success: false, error: error.message };
    }
});

const stopRpcHandler = async () => {
    await rpcManager.destroy();
    updateTrayStatus(false);
    if (mainWindow) mainWindow.webContents.send('rpc:status-change', 'disconnected');
    return { success: true };
};

ipcMain.handle('rpc:stop', stopRpcHandler);
ipcMain.handle('rpc:status', () => rpcManager.getStatus());

// Window Controls
ipcMain.on('window:minimize', () => mainWindow.minimize());
ipcMain.on('window:close', () => mainWindow.close());

function updateTrayStatus(active) {
    if (tray) {
        tray.setToolTip(active ? 'Discord RPC: Active' : 'Discord RPC: Idle');
    }
}

// App Lifecycle
app.whenReady().then(() => {
    createWindow();
    createTray();

    // Auto-start last active RPC
    const activeId = db.getActiveSettingId();
    if (activeId) {
        const config = db.getSettingById(activeId);
        if (config) {
            rpcManager.connect(config.clientId)
                .then(() => rpcManager.setActivity(config))
                .catch(console.error);
        }
    }

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        // Do nothing, keep running in tray
    }
});
