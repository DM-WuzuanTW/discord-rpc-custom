const DiscordRPC = require('discord-rpc');

class RpcManager {
    constructor() {
        this.client = null;
        this.currentClientId = null;
        this.status = 'disconnected'; // disconnected, connecting, connected
        this.startTimestamp = null;
    }

    async connect(clientId) {
        if (this.currentClientId === clientId && this.status === 'connected') {
            return;
        }

        if (this.client) {
            await this.destroy();
        }

        this.currentClientId = clientId;
        this.client = new DiscordRPC.Client({ transport: 'ipc' });

        this.status = 'connecting';

        try {
            this.client.on('ready', () => {
                this.status = 'connected';
                console.log('RPC Connected', clientId);
            });

            await this.client.login({ clientId });
            return true;
        } catch (error) {
            console.error('RPC Connection Failed', error);
            this.status = 'disconnected';
            this.currentClientId = null;
            throw error;
        }
    }

    async setActivity(config) {
        if (!this.client || this.status !== 'connected') {
            await this.connect(config.clientId);
        }

        const activity = {
            details: config.details || undefined,
            state: config.state || undefined,
            largeImageKey: config.largeImageKey || undefined,
            largeImageText: config.largeImageText || undefined,
            smallImageKey: config.smallImageKey || undefined,
            smallImageText: config.smallImageText || undefined,
            instance: false,
        };

        // Handle Timestamps
        if (config.useTimestamp) {
            if (!this.startTimestamp) {
                this.startTimestamp = new Date();
            }
            activity.startTimestamp = this.startTimestamp;
        } else {
            this.startTimestamp = null;
        }

        // Handle Buttons
        const buttons = [];
        if (config.button1Label && config.button1Url) {
            buttons.push({ label: config.button1Label, url: config.button1Url });
        }
        if (config.button2Label && config.button2Url) {
            buttons.push({ label: config.button2Label, url: config.button2Url });
        }

        if (buttons.length > 0) {
            activity.buttons = buttons;
        }

        try {
            await this.client.setActivity(activity);
            return true;
        } catch (error) {
            console.error('Failed to set activity', error);
            throw error;
        }
    }

    async clearActivity() {
        if (this.client) {
            await this.client.clearActivity();
        }
        this.startTimestamp = null;
    }

    async destroy() {
        if (this.client) {
            try {
                await this.client.destroy();
            } catch (e) {
                // quiet fail
            }
        }
        this.client = null;
        this.currentClientId = null;
        this.status = 'disconnected';
        this.startTimestamp = null;
    }

    getStatus() {
        return this.status;
    }
}

module.exports = new RpcManager();
