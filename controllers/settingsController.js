const { getSettings, updateSettings } = require('../config/database');
const rpcController = require('./rpcController');

const TOKEN_MASK = '••••••••••••••••••••••••••••••';

const settingsController = {
    getSettings: async (req, res) => {
        try {
            const settings = await getSettings();
            if (settings.token) settings.token = TOKEN_MASK;
            res.json(settings);
        } catch (err) {
            console.error('[Settings] Get failed:', err.message);
            res.status(500).json({ error: 'Failed to retrieve settings' });
        }
    },

    updateSettings: async (req, res) => {
        try {
            let data = req.body;
            const currentSettings = await getSettings();

            if ((!data.token || data.token === TOKEN_MASK) && currentSettings.token) {
                data.token = currentSettings.token;
            }

            await updateSettings(data);

            const status = rpcController.getStatus().status;
            if (status === 'running' || status === 'starting') {
                rpcController.start();
            }

            res.json({ success: true });
        } catch (err) {
            console.error('[Settings] Update failed:', err.message);
            res.status(500).json({ error: 'Failed to update settings' });
        }
    },

    getStatus: (req, res) => {
        res.json(rpcController.getStatus());
    },

    startRPC: (req, res) => {
        rpcController.start();
        res.json({ success: true });
    },

    stopRPC: (req, res) => {
        rpcController.stop();
        res.json({ success: true });
    }
};

module.exports = settingsController;
