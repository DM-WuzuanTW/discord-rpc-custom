# Discord RPC Custom

Custom Discord Rich Presence manager with a modern web UI.

![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-blue)

## Features

- 🎮 Custom Rich Presence with real-time preview
- 🖼️ Discord asset images & external URL support
- 🔗 Up to 2 custom buttons
- ⏱️ Multiple timestamp modes (elapsed / local / custom)
- 🌐 Multi-language UI (繁體中文 / English / 日本語)
- 🔒 AES-256-CBC token encryption with HMAC integrity
- 💾 Auto-save & auto-restore on restart

## Quick Start

```bash
# Clone
git clone https://github.com/DM-WuzuanTW/discord-rpc-custom.git
cd discord-rpc-custom

# Install
npm install

# Run
npm start
```

Open `http://localhost:3000` in your browser.

## Setup

1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Create an application and note the **Application ID**
3. Upload your image assets in the app's Rich Presence settings
4. Enter your **User Token** and **Application ID** in the web UI
5. Click **Auto Fetch** to load your assets
6. Configure your presence and click **Start RPC**

## Project Structure

```
├── server.js              # Express server entry
├── config/
│   └── database.js        # SQLite database
├── controllers/
│   ├── rpcController.js    # Discord RPC logic
│   ├── settingsController.js
│   └── proxyController.js  # Image proxy
├── routes/
│   └── apiRoutes.js        # API endpoints
├── utils/
│   └── crypto.js           # AES-256-CBC encryption
└── public/
    ├── index.html          # Web UI
    ├── css/style.css
    └── js/
        ├── main.js         # Frontend logic
        └── i18n.js         # Multi-language support
```

## Security

- Token is encrypted with **AES-256-CBC** + **HMAC-SHA256** integrity verification
- Encryption key is auto-generated and stored in `secret.key` (excluded from git)
- Database file `database.sqlite` is excluded from git
- Security headers: `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`
- Image proxy validates content-type and protocol
- Request body size limited to 1MB

> ⚠️ **Warning**: This project uses a Discord user token (selfbot). Use at your own risk — this may violate Discord's Terms of Service.

## License

[MIT](LICENSE)
