<p align="center">
  <img src="https://cdn.discordapp.com/embed/avatars/0.png" width="80" alt="logo">
</p>

<h1 align="center">Discord RPC Custom</h1>

<p align="center">
  <strong>自訂 Discord Rich Presence 管理器｜Custom Discord Rich Presence Manager</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-18+-339933?logo=node.js&logoColor=white" alt="Node.js">
  <img src="https://img.shields.io/badge/Express-4.x-000000?logo=express" alt="Express">
  <img src="https://img.shields.io/badge/License-MIT-blue" alt="License">
  <img src="https://img.shields.io/badge/Language-zh--TW%20%7C%20en%20%7C%20ja-blueviolet" alt="i18n">
</p>

---

## 簡介 / Overview

透過瀏覽器介面輕鬆管理 Discord Rich Presence，支援自訂圖片、按鈕、時間戳記，以及多國語言介面。

A browser-based Discord Rich Presence manager with custom images, buttons, timestamps, and multi-language UI support.

---

## 功能特色 / Features

| 功能 | Feature |
|------|---------|
| 自訂 Rich Presence 並即時預覽 | Custom Rich Presence with live preview |
| 支援 Discord 資產圖片與外部 URL | Discord asset images & external URL support |
| 最多 2 個自訂按鈕 | Up to 2 custom buttons |
| 多種時間顯示模式（經過／當地／自訂） | Multiple timestamp modes (elapsed / local / custom) |
| 多語言介面（繁體中文、English、日本語） | Multi-language UI (zh-TW, en, ja) |
| AES-256-CBC + HMAC-SHA256 Token 加密 | AES-256-CBC + HMAC-SHA256 token encryption |
| 自動儲存，重啟後自動恢復 | Auto-save & auto-restore on restart |

---

## 快速開始 / Quick Start

### 1. 安裝 / Install

```bash
git clone https://github.com/DM-WuzuanTW/discord-rpc-custom.git
cd discord-rpc-custom
npm install
```

### 2. 啟動 / Run

```bash
npm start
```

開啟瀏覽器前往 `http://localhost:3000`

Open your browser at `http://localhost:3000`

---

## 使用說明 / Usage

### 步驟 / Steps

1. 前往 [Discord Developer Portal](https://discord.com/developers/applications) 建立應用程式
   <br>Go to Discord Developer Portal and create an application

2. 記下 **Application ID**，並在 Rich Presence 設定中上傳圖片資產
   <br>Note the **Application ID** and upload image assets in Rich Presence settings

3. 在網頁介面中輸入 **User Token** 與 **Application ID**
   <br>Enter your **User Token** and **Application ID** in the web UI

4. 點選「自動讀取」載入圖片資產
   <br>Click "Auto Fetch" to load your assets

5. 設定完成後，點選「啟動 RPC」
   <br>Configure your presence and click "Start RPC"

---

## 專案結構 / Project Structure

```
discord-rpc-custom/
  server.js                  -- Express 伺服器入口 / Server entry
  config/
    database.js              -- SQLite 資料庫 / Database
  controllers/
    rpcController.js         -- Discord RPC 核心邏輯 / RPC logic
    settingsController.js    -- 設定 API / Settings API
    proxyController.js       -- 圖片代理 / Image proxy
  routes/
    apiRoutes.js             -- API 路由 / API routes
  utils/
    crypto.js                -- AES-256-CBC 加密 / Encryption
  public/
    index.html               -- 網頁介面 / Web UI
    css/
      style.css              -- 樣式 / Styles
    js/
      main.js                -- 前端邏輯 / Frontend logic
      i18n.js                -- 多語言系統 / i18n system
```

---

## 安全性 / Security

| 項目 | 說明 |
|------|------|
| Token 加密 | AES-256-CBC 搭配 HMAC-SHA256 完整性驗證 |
| 加密金鑰 | 自動產生，存於 `secret.key`（已排除於 Git） |
| 資料庫 | `database.sqlite` 已排除於 Git |
| HTTP 標頭 | `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy` |
| 圖片代理 | Content-Type 白名單、協議驗證、超時限制 |
| 請求限制 | Body 大小上限 1MB |

> **注意 / Warning**
> 本專案使用 Discord User Token（selfbot），這可能違反 Discord 服務條款，請自行承擔風險。
> This project uses a Discord user token (selfbot). Use at your own risk — this may violate Discord's Terms of Service.

---

## 授權 / License

本專案以 [MIT License](LICENSE) 釋出。

Released under the [MIT License](LICENSE).
