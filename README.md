# Discord Custom RPC Manager

![License](https://img.shields.io/github/license/DM-WuzuanTW/discord-rpc-custom)
![Version](https://img.shields.io/github/v/release/DM-WuzuanTW/discord-rpc-custom)

A professional-grade, desktop-based Discord Rich Presence (RPC) manager. Built for Windows with a focus on aesthetics, performance, and usability.

## ✨ Features

- **Visual Config Manager**: Create, edit, and delete RPC configurations with a beautiful dark-themed UI.
- **Persistent Storage**: All settings are saved automatically using a local SQLite database.
- **Background Execution**: Minimizes to the System Tray to keep your RPC active without cluttering your desktop.
- **Multiple Profiles**: Switch between different gaming or work statuses instantly.
- **Rich Status Support**:
  - Details & State text
  - Large & Small Images (with tooltips)
  - Interactive Buttons
  - Elapsed/Fixed Timestamps
- **Portable & Installer**: Available as a standard setup `.exe` or a portable single-file executable.

## 🛠 Tech Stack

- **Core**: Node.js (LTS), Electron
- **Frontend**: React, Vite, Vanilla CSS (Glassmorphism Design)
- **Database**: better-sqlite3 (SQLite)
- **RPC**: discord-rpc
- **ICONS**: Lucide React (No Emojis used)

## 📂 Project Structure

```
/src
  /core          # RPC Connection & Logic
  /database      # SQLite Data Layer
  /ui            # React Frontend
  /main          # Electron Main Process & Tray
  /services      # Background Services
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm

### Installation
```bash
# Clone the repository
git clone https://github.com/DM-WuzuanTW/discord-rpc-custom.git

# Install dependencies
npm install
```

### Development
Run the app in development mode with hot-reloading:
```bash
npm run electron:dev
```

### Build
Generate the production binaries (Installer + Portable):
```bash
npm run dist
```
Artifacts will be output to `dist-electron/`.

## 📦 Releases

We use **GitHub Actions** for automated builds and releases.

1.  **Trigger**: Push a tag (e.g., `v1.0.0`).
2.  **Action**: 
    - Builds the application.
    - Generates `Discord-RPC-Custom-Setup.exe` (Installer).
    - Generates `Discord-RPC-Custom-Portable.exe` (Portable).
    - Creates a GitHub Release with auto-generated changelogs.

### Download Types
- **Setup.exe**: Standard Windows installer. Updates automatically if configured.
- **Portable.exe**: Single-file executable. No installation required, carry it on a USB drive.

## 🤝 Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
