const Database = require('better-sqlite3');
const path = require('path');
const { app } = require('electron');
const fs = require('fs');

// Ensure user data directory exists
const userDataPath = app.getPath('userData');
const dbPath = path.join(userDataPath, 'rpc_manager.db');

const db = new Database(dbPath, { verbose: null }); // Set verbose: console.log for debugging if needed

// Initialize Database
const initDb = () => {
    // Create settings table
    const createTable = `
    CREATE TABLE IF NOT EXISTS rpc_settings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      clientId TEXT NOT NULL,
      details TEXT,
      state TEXT,
      largeImageKey TEXT,
      largeImageText TEXT,
      smallImageKey TEXT,
      smallImageText TEXT,
      button1Label TEXT,
      button1Url TEXT,
      button2Label TEXT,
      button2Url TEXT,
      startTimestamp INTEGER,
      useTimestamp BOOLEAN DEFAULT 0,
      timestampType TEXT DEFAULT 'elapsed', -- 'elapsed', 'fixed'
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `;

    // Create active config table (stores the ID of the active setting)
    const createActiveTable = `
    CREATE TABLE IF NOT EXISTS app_state (
      key TEXT PRIMARY KEY,
      value TEXT
    );
  `;

    db.exec(createTable);
    db.exec(createActiveTable);
}

// Settings Operations
const getSettings = () => {
    return db.prepare('SELECT * FROM rpc_settings ORDER BY updatedAt DESC').all();
};

const getSettingById = (id) => {
    return db.prepare('SELECT * FROM rpc_settings WHERE id = ?').get(id);
};

const addSetting = (setting) => {
    const stmt = db.prepare(`
    INSERT INTO rpc_settings (
      name, clientId, details, state, 
      largeImageKey, largeImageText, smallImageKey, smallImageText,
      button1Label, button1Url, button2Label, button2Url,
      useTimestamp, timestampType
    ) VALUES (
      @name, @clientId, @details, @state,
      @largeImageKey, @largeImageText, @smallImageKey, @smallImageText,
      @button1Label, @button1Url, @button2Label, @button2Url,
      @useTimestamp, @timestampType
    )
  `);
    return stmt.run(setting);
};

const updateSetting = (id, setting) => {
    const stmt = db.prepare(`
    UPDATE rpc_settings SET
      name = @name,
      clientId = @clientId,
      details = @details,
      state = @state,
      largeImageKey = @largeImageKey,
      largeImageText = @largeImageText,
      smallImageKey = @smallImageKey,
      smallImageText = @smallImageText,
      button1Label = @button1Label,
      button1Url = @button1Url,
      button2Label = @button2Label,
      button2Url = @button2Url,
      useTimestamp = @useTimestamp,
      timestampType = @timestampType,
      updatedAt = CURRENT_TIMESTAMP
    WHERE id = @id
  `);
    return stmt.run({ ...setting, id });
};

const deleteSetting = (id) => {
    return db.prepare('DELETE FROM rpc_settings WHERE id = ?').run(id);
};

// State Operations
const getActiveSettingId = () => {
    const row = db.prepare('SELECT value FROM app_state WHERE key = ?').get('active_setting_id');
    return row ? parseInt(row.value) : null;
};

const setActiveSettingId = (id) => {
    const stmt = db.prepare(`
    INSERT INTO app_state (key, value) VALUES ('active_setting_id', ?)
    ON CONFLICT(key) DO UPDATE SET value = excluded.value
  `);
    return stmt.run(id.toString());
};

module.exports = {
    initDb,
    getSettings,
    getSettingById,
    addSetting,
    updateSetting,
    deleteSetting,
    getActiveSettingId,
    setActiveSettingId
};
