const express = require('express');
const router = express.Router();
const settingsController = require('../controllers/settingsController');
const rpcController = require('../controllers/rpcController');
const proxyController = require('../controllers/proxyController');

router.get('/status', settingsController.getStatus);
router.get('/settings', settingsController.getSettings);
router.post('/settings', settingsController.updateSettings);
router.post('/start', settingsController.startRPC);
router.post('/stop', settingsController.stopRPC);
router.get('/assets', (req, res) => rpcController.getAssets(req, res));
router.get('/proxy', proxyController.proxyImage);

module.exports = router;
