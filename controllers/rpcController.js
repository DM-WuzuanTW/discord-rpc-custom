const { Client, RichPresence } = require('discord.js-selfbot-v13');
const { getSettings, setRunningState } = require('../config/database');

class RpcController {
    constructor() {
        this.client = null;
        this.status = 'stopped';
        this.lastError = null;
    }

    async start() {
        if (this.client) this.stop();

        try {
            const config = await getSettings();
            if (!config.token) {
                this.status = 'error';
                this.lastError = 'No Token provided';
                return;
            }

            this.status = 'starting';
            this.lastError = null;

            this.client = new Client({ checkUpdate: false });
            this._registerEvents(config);
            await this.client.login(config.token);
            setRunningState(true);
        } catch (err) {
            this.status = 'error';
            this.lastError = err.message;
            console.error('[RPC] Start error:', err.message);
            setRunningState(false);

            if (this.client) {
                this.client.destroy();
                this.client = null;
            }
        }
    }

    stop() {
        if (this.client) {
            try { this.client.destroy(); } catch (e) { }
            this.client = null;
        }
        this.status = 'stopped';
        this.lastError = null;
        setRunningState(false);
    }

    getStatus() {
        return { status: this.status, error: this.lastError };
    }

    _registerEvents(config) {
        this.client.on('ready', async () => {
            this.status = 'running';
            console.log('[RPC] Connected as', this.client.user.tag);
            await this._setActivity(config);
        });

        this.client.on('error', (err) => {
            console.error('[RPC] Client error:', err.message);
            this.status = 'error';
            this.lastError = err.message;
        });
    }

    async _setActivity(config) {
        try {
            let appId = config.application_id;
            if (!appId || appId.trim() === '') appId = '1337440954086490112';

            const r = new RichPresence(this.client)
                .setApplicationId(appId)
                .setType('PLAYING')
                .setState(config.state || ' ')
                .setName(config.details || 'Unknown Game')
                .setDetails(config.details || ' ');

            const tsMode = config.timestamp_mode || 'elapsed';
            if (tsMode === 'elapsed') {
                r.setStartTimestamp(Date.now());
            } else if (tsMode === 'local') {
                const midnight = new Date();
                midnight.setHours(0, 0, 0, 0);
                r.setStartTimestamp(midnight.getTime());
            } else if (tsMode === 'custom' && config.custom_timestamp) {
                const ts = new Date(config.custom_timestamp).getTime();
                if (!isNaN(ts)) {
                    ts > Date.now() ? r.setEndTimestamp(ts) : r.setStartTimestamp(ts);
                }
            } else if (tsMode !== 'none') {
                r.setStartTimestamp(Date.now());
            }

            if (config.large_image_id && config.large_image_id.trim()) {
                const largeId = config.large_image_id.trim();
                if (largeId.startsWith('http://') || largeId.startsWith('https://')) {
                    try {
                        const ext = await RichPresence.getExternal(this.client, appId, largeId);
                        if (ext?.[0]) r.setAssetsLargeImage(`mp:${ext[0].external_asset_path}`);
                    } catch (e) {
                        this.lastError = `Image error: ${e.message}`;
                    }
                } else {
                    r.setAssetsLargeImage(largeId);
                }
                if (config.large_image_text) r.setAssetsLargeText(config.large_image_text);
            }

            if (config.small_image_id && config.small_image_id.trim()) {
                const smallId = config.small_image_id.trim();
                if (smallId.startsWith('http://') || smallId.startsWith('https://')) {
                    try {
                        const ext = await RichPresence.getExternal(this.client, appId, smallId);
                        if (ext?.[0]) r.setAssetsSmallImage(`mp:${ext[0].external_asset_path}`);
                    } catch (e) { }
                } else {
                    r.setAssetsSmallImage(smallId);
                }
                if (config.small_image_text) r.setAssetsSmallText(config.small_image_text);
            }

            if (config.btn1_label && config.btn1_url?.startsWith('http')) {
                r.addButton(config.btn1_label, config.btn1_url);
            }
            if (config.btn2_label && config.btn2_url?.startsWith('http')) {
                r.addButton(config.btn2_label, config.btn2_url);
            }

            if (this.client?.user) {
                this.client.user.setActivity(r);
            }
        } catch (err) {
            console.error('[RPC] Activity error:', err.message);
        }
    }

    async getAssets(req, res) {
        try {
            const config = await getSettings();
            if (!config.token) return res.status(400).json({ error: 'Token not set' });

            const appId = config.application_id;
            if (!appId) return res.status(400).json({ error: 'Application ID not set' });

            const response = await fetch(`https://discord.com/api/v9/oauth2/applications/${appId}/assets`, {
                headers: {
                    'Authorization': config.token,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                const errText = await response.text();
                let errorMsg = `Discord API ${response.status}`;

                if (errText.includes('10002') || errText.includes('Unknown Application')) {
                    errorMsg = 'Application not found (404)';
                } else if (response.status === 401) {
                    errorMsg = 'Invalid token or no permission (401)';
                }

                throw new Error(errorMsg);
            }

            const assets = await response.json();
            const assetData = assets.map(a => ({ name: a.name, id: String(a.id) }));
            res.json({ success: true, assets: assetData });
        } catch (err) {
            console.error('[RPC] Asset fetch error:', err.message);
            res.status(500).json({ error: err.message });
        }
    }
}

module.exports = new RpcController();
