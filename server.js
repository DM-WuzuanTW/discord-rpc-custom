const express = require('express');
const path = require('path');

require('./config/database');
const rpcController = require('./controllers/rpcController');
const apiRoutes = require('./routes/apiRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.disable('x-powered-by');

app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('Referrer-Policy', 'no-referrer');
    next();
});

app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api', apiRoutes);

app.listen(PORT, async () => {
    console.log(`[Server] Running at http://localhost:${PORT}`);

    try {
        const { getSettings } = require('./config/database');
        const config = await getSettings();
        if (config?.is_running) {
            console.log('[Server] Auto-starting RPC from previous session');
            await rpcController.start();
        }
    } catch (err) {
        console.error('[Server] Auto-start failed:', err.message);
    }
});

process.on('SIGINT', () => {
    rpcController.stop();
    process.exit();
});
