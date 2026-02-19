const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const { encrypt, decrypt } = require('../utils/crypto');

const DB_PATH = path.join(__dirname, '../database.sqlite');

const db = new sqlite3.Database(DB_PATH, (err) => {
    if (err) console.error('[DB] Connection failed:', err.message);
});

initializeDatabase();

function initializeDatabase() {
    db.serialize(() => {
        db.run(`
            CREATE TABLE IF NOT EXISTS settings (
                id INTEGER PRIMARY KEY CHECK (id = 1),
                token TEXT,
                state TEXT,
                details TEXT,
                large_image_id TEXT,
                large_image_text TEXT,
                small_image_id TEXT,
                small_image_text TEXT,
                btn1_label TEXT,
                btn1_url TEXT,
                btn2_label TEXT,
                btn2_url TEXT,
                timestamp_mode TEXT,
                custom_timestamp TEXT,
                application_id TEXT,
                assets_list TEXT,
                is_running INTEGER DEFAULT 0
            )
        `, (err) => {
            if (err) console.error('[DB] Table creation error:', err.message);
            db.run("ALTER TABLE settings ADD COLUMN timestamp_mode TEXT", () => { });
            db.run("ALTER TABLE settings ADD COLUMN custom_timestamp TEXT", () => { });
            db.run("ALTER TABLE settings ADD COLUMN application_id TEXT", () => { });
            db.run("ALTER TABLE settings ADD COLUMN assets_list TEXT", () => { });
        });

        db.run(`INSERT OR IGNORE INTO settings (id, is_running) VALUES (1, 0)`, (err) => {
            if (err) console.error('[DB] Default insert error:', err.message);
        });
    });
}

function getSettings() {
    return new Promise((resolve, reject) => {
        db.get('SELECT * FROM settings WHERE id = 1', (err, row) => {
            if (err) return reject(err);
            if (row && row.token) {
                const result = decrypt(row.token);
                if (typeof result === 'object' && result.needsReEncrypt) {
                    row.token = result.value;
                    db.run('UPDATE settings SET token = ? WHERE id = 1', [result.reEncrypted]);
                } else {
                    row.token = result;
                }
            }
            resolve(row || {});
        });
    });
}

function updateSettings(data) {
    return new Promise((resolve, reject) => {
        const encryptedToken = data.token ? encrypt(data.token) : '';
        const sql = `
            UPDATE settings SET
            token = ?, state = ?, details = ?,
            large_image_id = ?, large_image_text = ?,
            small_image_id = ?, small_image_text = ?,
            btn1_label = ?, btn1_url = ?,
            btn2_label = ?, btn2_url = ?,
            timestamp_mode = ?, custom_timestamp = ?,
            application_id = ?, assets_list = ?
            WHERE id = 1
        `;
        const params = [
            encryptedToken, data.state, data.details,
            data.large_image_id, data.large_image_text,
            data.small_image_id, data.small_image_text,
            data.btn1_label, data.btn1_url,
            data.btn2_label, data.btn2_url,
            data.timestamp_mode, data.custom_timestamp,
            data.application_id, data.assets_list
        ];

        db.run(sql, params, function (err) {
            if (err) reject(err);
            else resolve(this.changes);
        });
    });
}

function setRunningState(isRunning) {
    db.run('UPDATE settings SET is_running = ? WHERE id = 1', [isRunning ? 1 : 0]);
}

module.exports = { db, getSettings, updateSettings, setRunningState };
