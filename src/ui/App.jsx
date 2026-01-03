import React, { useState, useEffect } from 'react';
import { Layers } from 'lucide-react';
import ConfigList from './components/ConfigList';
import RpcForm from './components/RpcForm';

const DEFAULT_SETTING = {
    name: 'New Configuration',
    clientId: '',
    details: '',
    state: '',
    largeImageKey: '',
    largeImageText: '',
    smallImageKey: '',
    smallImageText: '',
    button1Label: '',
    button1Url: '',
    button2Label: '',
    button2Url: '',
    useTimestamp: 0,
    timestampType: 'elapsed'
};

function App() {
    const [settings, setSettings] = useState([]);
    const [activeId, setActiveId] = useState(null);
    const [rpcStatus, setRpcStatus] = useState('disconnected');
    const [loading, setLoading] = useState(true);

    const activeSetting = settings.find(s => s.id === activeId);

    useEffect(() => {
        loadData();

        // Status Listener
        if (window.api) {
            window.api.onRpcStatusChange((status) => {
                setRpcStatus(status);
            });

            // Initial status check
            window.api.getRpcStatus().then(setRpcStatus);
        }
    }, []);

    const loadData = async () => {
        if (!window.api) return;

        const loadedSettings = await window.api.getSettings();
        setSettings(loadedSettings);

        const savedActiveId = await window.api.getActiveId();
        if (loadedSettings.length > 0) {
            // If saved active ID exists locally but not in list (deleted), default to first
            const exists = loadedSettings.find(s => s.id === savedActiveId);
            setActiveId(exists ? savedActiveId : loadedSettings[0].id);
        } else {
            // Create default if none
            await handleAdd();
        }
        setLoading(false);
    };

    const handleAdd = async () => {
        const res = await window.api.saveSetting(DEFAULT_SETTING);
        await loadData();
        // Select the new one (last one)
        const newSettings = await window.api.getSettings();
        if (newSettings.length > 0) setActiveId(newSettings[0].id); // Actually DB order is desc updated
    };

    const handleUpdate = async (updatedSetting) => {
        await window.api.updateSetting(updatedSetting.id, updatedSetting);
        await loadData();
    };

    const handleDelete = async (id) => {
        if (settings.length <= 1) return; // Prevent deleting last
        await window.api.deleteSetting(id);
        await loadData();
    };

    const handleStartRpc = async (config) => {
        setRpcStatus('connecting');
        await window.api.saveSetting(config); // Save before start
        const res = await window.api.startRpc(config);
        if (res.success) {
            setRpcStatus('connected');
            await window.api.setActiveId(config.id);
        } else {
            setRpcStatus('disconnected');
            alert('Failed to start RPC: ' + res.error);
        }
    };

    const handleStopRpc = async () => {
        await window.api.stopRpc();
        setRpcStatus('disconnected');
    };

    const handleMinimize = () => window.api.minimize();
    const handleClose = () => window.api.close();

    if (loading) return <div className="flex items-center justify-center h-screen text-white">Loading...</div>;

    return (
        <div className="flex flex-col h-screen">
            {/* Custom Titlebar */}
            <div className="titlebar">
                <div className="flex items-center gap-2">
                    <Layers size={14} className="text-indigo-400" />
                    <span className="font-semibold">Discord RPC Manager</span>
                </div>
                <div className="titlebar-controls">
                    <div className="window-btn btn-min" onClick={handleMinimize}></div>
                    <div className="window-btn btn-close" onClick={handleClose}></div>
                </div>
            </div>

            <div className="app-container">
                <ConfigList
                    settings={settings}
                    activeId={activeId}
                    onSelect={setActiveId}
                    onAdd={handleAdd}
                />

                <div className="main-content bg-slate-900">
                    {activeSetting ? (
                        <RpcForm
                            setting={activeSetting}
                            onSave={handleUpdate}
                            onDelete={handleDelete}
                            onStart={handleStartRpc}
                            onStop={handleStopRpc}
                            rpcStatus={rpcStatus}
                        />
                    ) : (
                        <div className="flex items-center justify-center h-full text-gray-500">
                            Select or create a configuration
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default App;
