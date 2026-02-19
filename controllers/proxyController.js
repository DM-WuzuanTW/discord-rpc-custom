const https = require('https');
const http = require('http');
const { URL } = require('url');

const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/gif', 'image/webp', 'image/svg+xml'];

exports.proxyImage = (req, res) => {
    const imageUrl = req.query.url;
    if (!imageUrl) return res.status(400).send('Missing URL parameter');

    try {
        const parsedUrl = new URL(imageUrl);
        if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
            return res.status(400).send('Invalid protocol');
        }

        const protocol = parsedUrl.protocol === 'https:' ? https : http;

        const request = protocol.get(imageUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0',
                'Referer': parsedUrl.origin
            },
            timeout: 10000
        }, (response) => {
            if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
                return exports.proxyImage({ query: { url: response.headers.location } }, res);
            }

            if (response.statusCode !== 200) {
                return res.status(response.statusCode).send('Failed to fetch image');
            }

            const contentType = response.headers['content-type'];
            if (contentType && !ALLOWED_TYPES.some(t => contentType.includes(t))) {
                return res.status(403).send('Not an image');
            }

            if (contentType) res.setHeader('Content-Type', contentType);
            res.setHeader('Cache-Control', 'public, max-age=3600');
            response.pipe(res);
        });

        request.on('error', () => {
            res.status(500).send('Error fetching image');
        });

        request.on('timeout', () => {
            request.destroy();
            res.status(504).send('Timeout');
        });
    } catch (err) {
        res.status(400).send('Invalid URL');
    }
};
