const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
    // Configs
    getSettings: () => ipcRenderer.invoke('db:get-settings'),
    getSetting: (id) => ipcRenderer.invoke('db:get-setting', id),
    saveSetting: (setting) => ipcRenderer.invoke('db:save-setting', setting),
    updateSetting: (id, setting) => ipcRenderer.invoke('db:update-setting', id, setting),
    deleteSetting: (id) => ipcRenderer.invoke('db:delete-setting', id),

    // App State
    getActiveId: () => ipcRenderer.invoke('app:get-active-id'),
    setActiveId: (id) => ipcRenderer.invoke('app:set-active-id', id),

    // RPC Control
    startRpc: (config) => ipcRenderer.invoke('rpc:start', config),
    stopRpc: () => ipcRenderer.invoke('rpc:stop'),
    getRpcStatus: () => ipcRenderer.invoke('rpc:status'),

    // Events
    onRpcStatusChange: (callback) => ipcRenderer.on('rpc:status-change', (_, status) => callback(status)),

    // Window
    minimize: () => ipcRenderer.send('window:minimize'),
    close: () => ipcRenderer.send('window:close'),
});
