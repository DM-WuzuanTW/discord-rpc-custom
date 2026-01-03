# Discord Custom RPC Manager

專業級 Discord RPC 管理解決方案，專為 Windows 環境打造。

## 核心功能

- **視覺化管理**：現代化 UI 設計，完全圖形化操作。
- **多設定檔支援**：可建立、儲存多組 RPC 設定，隨時切換。
- **永久儲存**：使用 SQLite 資料庫，設定不會遺失。
- **背景執行**：最小化至系統工作列 (System Tray)，不佔用桌面空間且持續運行 RPC。
- **專業架構**：模組化程式碼設計，易於維護與擴充。
- **無需安裝**：提供免安裝版 (Portable) 與安裝版 (Installer)。

## 技術架構

本專案採用以下技術堆疊：

- **Runtime**: Node.js (LTS)
- **Framework**: Electron
- **Frontend**: React + Vite + Vanilla CSS (Premium Dark Mode)
- **Database**: better-sqlite3
- **RPC**: discord-rpc
- **Packaging**: electron-builder

## 專案結構

```
/src
  /core          # RPC 核心邏輯 (Connection, Activity Management)
  /database      # SQLite 資料庫封裝
  /ui            # React 前端介面
    /components  # UI 元件
    /styles      # 全域樣式與變數
  /services      # 背景服務與其他 Utilities
  /main          # Electron 主程序 (IPC, Tray, Window)
.github          # CI/CD設定
```

## 開發與建置說明

### 前置需求
- Node.js 18+
- npm

### 安裝依賴
```bash
npm install
```

### 開發模式 (Local Development)
同時啟動 React Dev Server 與 Electron：
```bash
npm run electron:dev
```

### 產品打包 (Production Build)
建置 Windows 執行檔 (包含 `.exe` 安裝檔與 Portable 免安裝版)：
```bash
npm run dist
```
輸出檔案位於 `dist-electron/` 目錄。

## GitHub Actions 自動發佈
本專案已設定 CI/CD 流程：
1. Push code 到 GitHub。
2. Action 自動觸發 Build。
3. 若為 Tag (例如 `v1.0.0`)，會自動發布 Release 到 GitHub Releases 頁面。

## 故障排除
- **RPC 無反應**：請確認 Discord 桌面版已啟動。
- **無法安裝依賴**：請確認 Windows Build Tools 已安裝 (若需編譯 native modules)。

---
Designed by Antigravity Agent.
