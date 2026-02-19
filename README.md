<p align="center">
  <img src="https://cdn.discordapp.com/embed/avatars/0.png" width="80" alt="logo">
</p>

<h1 align="center">Discord RPC Custom</h1>

<p align="center">
  <strong>A custom Discord Rich Presence manager with a modern web interface</strong>
  <br>
  自訂 Discord Rich Presence 管理器，附帶現代化網頁介面
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-18+-339933?logo=node.js&logoColor=white" alt="Node.js">
  <img src="https://img.shields.io/badge/Express-4.x-000000?logo=express" alt="Express">
  <img src="https://img.shields.io/badge/License-MIT-blue" alt="License">
  <img src="https://img.shields.io/badge/i18n-zh--TW%20%7C%20en%20%7C%20ja-blueviolet" alt="i18n">
</p>

---

## Features / 功能特色

- Custom Rich Presence with real-time live preview
  <br>自訂 Rich Presence 並即時預覽
- Discord asset images and external URL support
  <br>支援 Discord 資產圖片與外部連結
- Up to 2 custom buttons
  <br>最多 2 個自訂按鈕
- Multiple timestamp modes: elapsed, local time, custom
  <br>多種時間顯示模式：經過時間、當地時間、自訂
- Multi-language UI — English, 繁體中文, 日本語
  <br>多語言介面，自動偵測瀏覽器語言
- AES-256-CBC + HMAC-SHA256 token encryption
  <br>Token 加密保護
- Auto-save and auto-restore on restart
  <br>自動儲存，重啟後自動恢復

---

## Quick Start / 快速開始

```bash
# Clone the repository / 複製專案
git clone https://github.com/DM-WuzuanTW/discord-rpc-custom.git
cd discord-rpc-custom

# Install dependencies / 安裝依賴
npm install

# Start the server / 啟動伺服器
npm start
```

Then open `http://localhost:3000` in your browser.
<br>開啟瀏覽器前往 `http://localhost:3000`

---

## Usage / 使用說明

1. Create an application at the [Discord Developer Portal](https://discord.com/developers/applications)
   <br>在 Discord Developer Portal 建立應用程式

2. Note your **Application ID** and upload image assets under Rich Presence settings
   <br>記下 Application ID，並上傳圖片資產

3. Enter your **User Token** and **Application ID** in the web UI
   <br>在網頁介面中輸入 User Token 與 Application ID

4. Click **Auto Fetch** to load available assets
   <br>點選「自動讀取」載入圖片資產

5. Configure your presence and click **Start RPC**
   <br>設定完成後，點選「啟動 RPC」

---

## Security / 安全性

| Measure / 項目 | Details / 說明 |
|----------------|----------------|
| Token encryption | AES-256-CBC with HMAC-SHA256 integrity verification |
| Encryption key | Auto-generated, stored in `secret.key` (git-ignored) |
| Database | `database.sqlite` excluded from version control |
| HTTP headers | `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy` |
| Image proxy | Content-Type whitelist, protocol validation, timeout |
| Request limits | Body size capped at 1MB |

> **Warning / 警告**
> This project uses a Discord user token (selfbot), which may violate Discord's Terms of Service. Use at your own risk.
> <br>本專案使用 Discord User Token（selfbot），可能違反 Discord 服務條款，請自行承擔風險。

---

## License / 授權

Released under the [MIT License](LICENSE).
<br>本專案以 MIT License 釋出。
