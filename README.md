<p align="center">
  <img src="https://cdn.discordapp.com/embed/avatars/0.png" width="80" alt="logo">
</p>

<h1 align="center">Discord RPC Custom</h1>

<p align="center">
  <strong>A custom Discord Rich Presence manager with a modern web interface</strong>
  <br>
  <sub>自訂 Discord Rich Presence 管理器，附帶現代化網頁介面</sub>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-18+-339933?logo=node.js&logoColor=white" alt="Node.js">
  <img src="https://img.shields.io/badge/Express-4.x-000000?logo=express" alt="Express">
  <img src="https://img.shields.io/badge/License-MIT-blue" alt="License">
  <img src="https://img.shields.io/badge/i18n-zh--TW%20%7C%20en%20%7C%20ja-blueviolet" alt="i18n">
</p>

---

## Features

- Custom Rich Presence with real-time live preview （即時預覽）
- Discord asset images and external URL support （支援 Discord 資產圖片與外部連結）
- Up to 2 custom buttons （最多 2 個自訂按鈕）
- Multiple timestamp modes: elapsed, local time, custom （多種時間顯示模式）
- Multi-language UI — English, 繁體中文, 日本語
- AES-256-CBC + HMAC-SHA256 token encryption （Token 加密保護）
- Auto-save and auto-restore on restart （自動儲存，重啟恢復）

---

## Quick Start

```bash
# Clone the repository
git clone https://github.com/DM-WuzuanTW/discord-rpc-custom.git
cd discord-rpc-custom

# Install dependencies
npm install

# Start the server
npm start
```

Then open `http://localhost:3000` in your browser.

---

## Usage

1. Create an application at the [Discord Developer Portal](https://discord.com/developers/applications)
   <br><sub>在 Discord Developer Portal 建立應用程式</sub>

2. Note your **Application ID** and upload image assets under Rich Presence settings
   <br><sub>記下 Application ID，並上傳圖片資產</sub>

3. Enter your **User Token** and **Application ID** in the web UI
   <br><sub>在網頁介面中輸入 User Token 與 Application ID</sub>

4. Click **Auto Fetch** to load available assets
   <br><sub>點選「自動讀取」載入圖片資產</sub>

5. Configure your presence and click **Start RPC**
   <br><sub>設定完成後，點選「啟動 RPC」</sub>

---

## Project Structure

```
discord-rpc-custom/
  server.js                  -- Express server entry point
  config/
    database.js              -- SQLite database layer
  controllers/
    rpcController.js         -- Discord RPC core logic
    settingsController.js    -- Settings API handler
    proxyController.js       -- Image proxy with validation
  routes/
    apiRoutes.js             -- API route definitions
  utils/
    crypto.js                -- AES-256-CBC encryption utilities
  public/
    index.html               -- Web UI
    css/style.css            -- Stylesheet
    js/
      main.js                -- Frontend logic
      i18n.js                -- Internationalization (3 languages)
```

---

## Security

| Measure | Details |
|---------|---------|
| Token encryption | AES-256-CBC with HMAC-SHA256 integrity verification |
| Encryption key | Auto-generated, stored in `secret.key` (git-ignored) |
| Database | `database.sqlite` excluded from version control |
| HTTP headers | `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy` |
| Image proxy | Content-Type whitelist, protocol validation, timeout |
| Request limits | Body size capped at 1MB |

> **Warning**
> This project uses a Discord user token (selfbot), which may violate Discord's Terms of Service. Use at your own risk.
> <br>本專案使用 Discord User Token（selfbot），可能違反 Discord 服務條款，請自行承擔風險。

---

## License

Released under the [MIT License](LICENSE).
