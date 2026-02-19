# Discord RPC Custom

自訂 Discord Rich Presence 管理工具，附帶現代化 Web 控制面板。

A custom Discord Rich Presence manager with a modern web UI.

![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-blue)

---

## ✨ 功能 / Features

- 🎮 自訂 Rich Presence，附帶即時預覽 / Custom Rich Presence with live preview
- 🖼️ 支援 Discord 資產圖片與外部圖片 URL / Discord asset images & external URL support
- 🔗 最多 2 個自訂按鈕 / Up to 2 custom buttons
- ⏱️ 多種時間模式（經過時間 / 當地時間 / 自訂）/ Multiple timestamp modes
- 🌐 多語言介面（繁體中文 / English / 日本語）/ Multi-language UI
- 🔒 AES-256-CBC Token 加密 + HMAC 完整性驗證 / Token encryption with HMAC integrity
- 💾 自動儲存、重啟後自動恢復 / Auto-save & auto-restore on restart

---

## 🚀 快速開始 / Quick Start

```bash
# 下載 / Clone
git clone https://github.com/DM-WuzuanTW/discord-rpc-custom.git
cd discord-rpc-custom

# 安裝依賴 / Install
npm install

# 啟動 / Run
npm start
```

開啟瀏覽器前往 `http://localhost:3000`

Open `http://localhost:3000` in your browser.

---

## 📖 使用教學 / Setup Guide

1. 前往 [Discord Developer Portal](https://discord.com/developers/applications) 建立應用程式
2. 記下你的 **Application ID**
3. 在應用程式的 Rich Presence 設定中上傳圖片資產
4. 在 Web 面板中輸入你的 **User Token** 和 **Application ID**
5. 點擊 **自動讀取** 載入圖片資產
6. 設定你的 Presence 內容，然後點擊 **啟動 RPC**

---

1. Go to [Discord Developer Portal](https://discord.com/developers/applications) and create an application
2. Note your **Application ID**
3. Upload image assets in the app's Rich Presence settings
4. Enter your **User Token** and **Application ID** in the web UI
5. Click **Auto Fetch** to load your assets
6. Configure your presence and click **Start RPC**

---

## 📁 專案結構 / Project Structure

```
├── server.js                 # Express 伺服器入口 / Server entry
├── config/
│   └── database.js           # SQLite 資料庫 / Database
├── controllers/
│   ├── rpcController.js      # Discord RPC 邏輯 / RPC logic
│   ├── settingsController.js # 設定 API / Settings API
│   └── proxyController.js    # 圖片代理 / Image proxy
├── routes/
│   └── apiRoutes.js          # API 路由 / API endpoints
├── utils/
│   └── crypto.js             # AES-256-CBC 加密 / Encryption
└── public/
    ├── index.html            # Web 介面 / Web UI
    ├── css/style.css         # 樣式 / Styles
    └── js/
        ├── main.js           # 前端邏輯 / Frontend logic
        └── i18n.js           # 多語言支援 / i18n support
```

---

## 🔒 安全性 / Security

- Token 使用 **AES-256-CBC** 加密 + **HMAC-SHA256** 完整性驗證
- 加密金鑰自動產生，儲存於 `secret.key`（已排除在 Git 之外）
- 資料庫檔案 `database.sqlite` 已排除在 Git 之外
- 安全標頭：`X-Content-Type-Options`、`X-Frame-Options`、`Referrer-Policy`
- 圖片代理驗證 Content-Type 與協議
- Request body 大小限制為 1MB

---

- Token encrypted with **AES-256-CBC** + **HMAC-SHA256** integrity verification
- Encryption key auto-generated, stored in `secret.key` (excluded from git)
- Database file `database.sqlite` excluded from git
- Security headers: `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`
- Image proxy validates content-type and protocol
- Request body size limited to 1MB

---

> ⚠️ **警告 / Warning**：此專案使用 Discord User Token（selfbot），使用風險自負，這可能違反 Discord 服務條款。
>
> This project uses a Discord user token (selfbot). Use at your own risk — this may violate Discord's Terms of Service.

## 📄 授權 / License

[MIT](LICENSE)
