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
    },

    checkTokens: async (req, res) => {
        const { tokens } = req.body;
        if (!Array.isArray(tokens) || tokens.length === 0) {
            return res.status(400).json({ error: 'Tokens array is required' });
        }

        const fetchFn = global.fetch; // using global fetch (Node.js 18+)
        const results = [];

        for (let i = 0; i < tokens.length; i++) {
            let token = tokens[i].trim();
            if (!token) continue;

            // Remove quotes if present
            token = token.replace(/^"(.*)"$/, '$1');

            try {
                const response = await fetchFn('https://discord.com/api/v9/users/@me', {
                    headers: {
                        'Authorization': token,
                        'Content-Type': 'application/json'
                    }
                });

                if (response.ok) {
                    const user = await response.json();
                    results.push({ token, valid: true, user: `${user.username}#${user.discriminator}`, id: user.id });
                } else if (response.status === 401) {
                    results.push({ token, valid: false, error: 'Token 無效或已過期 (401)' });
                } else if (response.status === 403) {
                    results.push({ token, valid: false, error: 'Token 遇到驗證/需解鎖 (403)' });
                } else {
                    results.push({ token, valid: false, error: `狀態碼: ${response.status}` });
                }
            } catch (err) {
                results.push({ token, valid: false, error: `連線失敗: ${err.message}` });
            }

            // avoid rate limit slightly
            if (i < tokens.length - 1) {
                await new Promise(r => setTimeout(r, 500));
            }
        }

        res.json({ success: true, results });
    }
};

module.exports = settingsController;
