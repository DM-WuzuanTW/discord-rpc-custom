const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const ALGORITHM = 'aes-256-cbc';
const SECRET_FILE = path.join(__dirname, '../secret.key');
let SECRET_KEY;

if (fs.existsSync(SECRET_FILE)) {
    SECRET_KEY = fs.readFileSync(SECRET_FILE);
    if (SECRET_KEY.length !== 32) {
        SECRET_KEY = crypto.randomBytes(32);
        fs.writeFileSync(SECRET_FILE, SECRET_KEY, { mode: 0o600 });
    }
} else {
    SECRET_KEY = crypto.randomBytes(32);
    fs.writeFileSync(SECRET_FILE, SECRET_KEY, { mode: 0o600 });
}

function encrypt(text) {
    if (!text) return text;
    try {
        const iv = crypto.randomBytes(16);
        const cipher = crypto.createCipheriv(ALGORITHM, SECRET_KEY, iv);
        let encrypted = cipher.update(text, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        const tag = crypto.createHmac('sha256', SECRET_KEY)
            .update(iv.toString('hex') + ':' + encrypted)
            .digest('hex');
        return iv.toString('hex') + ':' + encrypted + ':' + tag;
    } catch (err) {
        return text;
    }
}

function decrypt(text) {
    if (!text) return text;
    try {
        const parts = text.split(':');

        if (parts.length === 3) {
            const [ivHex, encrypted, tag] = parts;
            const expected = crypto.createHmac('sha256', SECRET_KEY)
                .update(ivHex + ':' + encrypted)
                .digest('hex');

            if (!crypto.timingSafeEqual(Buffer.from(tag, 'hex'), Buffer.from(expected, 'hex'))) {
                return text;
            }

            const iv = Buffer.from(ivHex, 'hex');
            const decipher = crypto.createDecipheriv(ALGORITHM, SECRET_KEY, iv);
            let decrypted = decipher.update(Buffer.from(encrypted, 'hex'));
            decrypted = Buffer.concat([decrypted, decipher.final()]);
            return decrypted.toString();
        }

        if (parts.length === 2) {
            const iv = Buffer.from(parts[0], 'hex');
            const decipher = crypto.createDecipheriv(ALGORITHM, SECRET_KEY, iv);
            let decrypted = decipher.update(Buffer.from(parts[1], 'hex'));
            decrypted = Buffer.concat([decrypted, decipher.final()]);
            const plaintext = decrypted.toString();

            const reEncrypted = encrypt(plaintext);
            return { value: plaintext, needsReEncrypt: true, reEncrypted };
        }

        return text;
    } catch (err) {
        return text;
    }
}

module.exports = { encrypt, decrypt };
