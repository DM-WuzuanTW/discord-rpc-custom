const API_URL = '/api';
let cachedAssets = [];
let currentAppId = '';

function showToast(message, type = 'info', duration = 3500) {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;

    const icons = {
        success: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M9 12l2 2 4-4" stroke="#23a559" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/><circle cx="12" cy="12" r="9" stroke="#23a559" stroke-width="2"/></svg>',
        error: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="#da373c" stroke-width="2"/><path d="M15 9l-6 6M9 9l6 6" stroke="#da373c" stroke-width="2" stroke-linecap="round"/></svg>',
        info: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="#5865F2" stroke-width="2"/><path d="M12 8v4M12 16h.01" stroke="#5865F2" stroke-width="2" stroke-linecap="round"/></svg>'
    };

    toast.innerHTML = `${icons[type] || icons.info}<span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('toast-out');
        setTimeout(() => toast.remove(), 250);
    }, duration);
}

async function loadSettings() {
    try {
        const res = await fetch(`${API_URL}/settings`);
        const data = await res.json();

        setVal('token', data.token);
        setVal('details', data.details);
        setVal('state', data.state);
        setVal('application_id', data.application_id);
        currentAppId = data.application_id || '';

        const raw = data.assets_list || '';
        let arr = [];
        if (raw.trim().startsWith('[')) {
            try { arr = JSON.parse(raw); } catch (e) { arr = []; }
        } else if (raw.trim()) {
            arr = raw.split('\n').map(k => k.trim()).filter(Boolean).map(name => ({ name, id: name }));
        }

        cachedAssets = arr;
        setVal('assets_list', raw);
        updateAssetDropdowns(arr);

        setVal('large_image_id', data.large_image_id);
        setVal('small_image_id', data.small_image_id);
        setVal('large_image_text', data.large_image_text);
        setVal('small_image_text', data.small_image_text);
        setVal('btn1_label', data.btn1_label);
        setVal('btn1_url', data.btn1_url);
        setVal('btn2_label', data.btn2_label);
        setVal('btn2_url', data.btn2_url);

        document.getElementById('timestamp_mode').value = data.timestamp_mode || 'elapsed';
        setVal('custom_timestamp', data.custom_timestamp);
        toggleCustomTime();
        updatePreview();
    } catch (err) {
        showToast(t('toastLoadFail'), 'error');
    }
}

function updateAssetDropdowns(arr) {
    const largeSel = document.getElementById('large_image_id');
    const smallSel = document.getElementById('small_image_id');
    const currL = largeSel.value;
    const currS = smallSel.value;

    largeSel.innerHTML = `<option value="">${t('optionNone')}</option>`;
    smallSel.innerHTML = `<option value="">${t('optionNone')}</option>`;

    arr.forEach(asset => {
        const name = typeof asset === 'string' ? asset : asset.name;
        const id = typeof asset === 'string' ? asset : asset.id;

        const o1 = document.createElement('option');
        o1.value = id;
        o1.textContent = name;
        largeSel.appendChild(o1);

        const o2 = document.createElement('option');
        o2.value = id;
        o2.textContent = name;
        smallSel.appendChild(o2);
    });

    if (currL) largeSel.value = currL;
    if (currS) smallSel.value = currS;
}

function toggleCustomTime() {
    const mode = document.getElementById('timestamp_mode').value;
    document.getElementById('customTimeGroup').style.display = mode === 'custom' ? 'block' : 'none';
    updatePreview('timestamp');
}

function setVal(id, val) {
    const el = document.getElementById(id);
    if (el) el.value = val || '';
}

function getVal(id) {
    const el = document.getElementById(id);
    return el ? el.value : '';
}

function toggleTokenVisibility() {
    const input = document.getElementById('token');
    const icon = document.getElementById('eyeIcon');
    if (input.type === 'password') {
        input.type = 'text';
        icon.innerHTML = '<path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="1" y1="1" x2="23" y2="23" stroke="currentColor" stroke-width="2"/>';
    } else {
        input.type = 'password';
        icon.innerHTML = '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2"/>';
    }
}

async function updateStatus() {
    try {
        const res = await fetch(`${API_URL}/status`);
        const data = await res.json();
        const dot = document.getElementById('statusDot');
        const txt = document.getElementById('statusText');

        dot.className = 'status-dot';

        if (data.status === 'running') {
            dot.classList.add('running');
            txt.textContent = t('statusRunning');
        } else if (data.status === 'starting') {
            dot.classList.add('starting');
            txt.textContent = t('statusStarting');
        } else if (data.status === 'error') {
            dot.classList.add('error');
            txt.textContent = t('statusError');
        } else {
            txt.textContent = t('statusStopped');
        }
    } catch (e) { }
}

function buildPayload() {
    return {
        token: getVal('token'),
        details: getVal('details'),
        state: getVal('state'),
        large_image_id: getVal('large_image_id'),
        large_image_text: getVal('large_image_text'),
        small_image_id: getVal('small_image_id'),
        small_image_text: getVal('small_image_text'),
        btn1_label: getVal('btn1_label'),
        btn1_url: getVal('btn1_url'),
        btn2_label: getVal('btn2_label'),
        btn2_url: getVal('btn2_url'),
        timestamp_mode: getVal('timestamp_mode'),
        custom_timestamp: getVal('custom_timestamp'),
        application_id: getVal('application_id'),
        assets_list: getVal('assets_list')
    };
}

async function saveSettings() {
    try {
        const res = await fetch(`${API_URL}/settings`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(buildPayload())
        });
        if (res.ok) {
            showToast(t('toastSaved'), 'success');
            updateStatus();
        } else {
            showToast(t('toastSaveFail'), 'error');
        }
    } catch (err) {
        showToast(err.message, 'error');
    }
}

async function fetchAssets() {
    showToast(t('toastFetching'), 'info');
    try {
        await saveSettings();
        const res = await fetch(`${API_URL}/assets`);
        const data = await res.json();
        if (data.error) throw new Error(data.error);

        if (data.assets) {
            cachedAssets = data.assets;
            const json = JSON.stringify(data.assets);
            setVal('assets_list', json);
            updateAssetDropdowns(data.assets);

            const fn = t('toastFetchSuccess');
            showToast(typeof fn === 'function' ? fn(data.assets.length) : `${data.assets.length} assets`, 'success');

            await fetch(`${API_URL}/settings`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...buildPayload(), assets_list: json })
            });
        }
    } catch (err) {
        showToast(`${t('toastFetchFail')}: ${err.message}`, 'error', 5000);
    }
}

async function startRPC() {
    try {
        await fetch(`${API_URL}/start`, { method: 'POST' });
        showToast(t('toastRpcStarting'), 'info');
        setTimeout(updateStatus, 1500);
    } catch (e) {
        showToast(`${t('toastStartFail')}: ${e.message}`, 'error');
    }
}

async function stopRPC() {
    try {
        await fetch(`${API_URL}/stop`, { method: 'POST' });
        showToast(t('toastRpcStopped'), 'info');
        setTimeout(updateStatus, 1000);
    } catch (e) {
        showToast(`${t('toastStopFail')}: ${e.message}`, 'error');
    }
}

function updatePreview(changed) {
    if (!changed) {
        updateDetailsText();
        updateStateText();
        updateLargeImagePreview();
        updateSmallImagePreview();
        updateButtonsPreview();
        updateTimestampPreview();
        return;
    }
    const map = {
        'details': updateDetailsText,
        'state': updateStateText,
        'large_image_id': updateLargeImagePreview,
        'small_image_id': updateSmallImagePreview,
        'btn1_label': updateButtonsPreview,
        'btn2_label': updateButtonsPreview,
        'timestamp': updateTimestampPreview,
        'timestamp_mode': updateTimestampPreview,
        'custom_timestamp': updateTimestampPreview,
    };
    if (changed === 'application_id') {
        currentAppId = getVal('application_id');
        updateLargeImagePreview();
        updateSmallImagePreview();
    } else if (map[changed]) {
        map[changed]();
    }
}

function updateTimestampPreview() {
    const mode = document.getElementById('timestamp_mode').value;
    const el = document.getElementById('prevTime');
    const txt = document.getElementById('prevTimeText');

    if (mode === 'none') {
        el.style.display = 'none';
    } else if (mode === 'elapsed') {
        el.style.display = 'flex';
        txt.textContent = '00:00 elapsed';
    } else if (mode === 'local') {
        el.style.display = 'flex';
        const now = new Date(), mid = new Date();
        mid.setHours(0, 0, 0, 0);
        const d = now - mid;
        txt.textContent = `${String(Math.floor(d / 3600000)).padStart(2, '0')}:${String(Math.floor((d % 3600000) / 60000)).padStart(2, '0')} elapsed`;
    } else if (mode === 'custom') {
        el.style.display = 'flex';
        const ct = getVal('custom_timestamp');
        txt.textContent = ct
            ? new Date(ct).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' elapsed'
            : '12:00 elapsed';
    }
}

function updateDetailsText() {
    const d = getVal('details') || 'Unknown Game';
    document.getElementById('prevTitle').textContent = d;
    document.getElementById('prevDetails').textContent = d;
}

function updateStateText() {
    document.getElementById('prevState').textContent = getVal('state');
}

function getAssetCdnUrl(id) {
    const appId = currentAppId || getVal('application_id') || '1337440954086490112';
    if (!id) return null;
    if (id.startsWith('http://') || id.startsWith('https://'))
        return `${API_URL}/proxy?url=${encodeURIComponent(id)}`;
    if (/^[0-9]{17,19}$/.test(id))
        return `https://cdn.discordapp.com/app-assets/${appId}/${id}.png?size=128`;
    return null;
}

function updateLargeImagePreview() {
    const id = getVal('large_image_id');
    const img = document.getElementById('prevLargeImg');
    const ph = document.getElementById('largePlaceholder');
    img.onload = null;
    img.onerror = null;
    img.classList.remove('loaded');

    if (!id) {
        img.src = '';
        ph.classList.remove('hidden');
        return;
    }

    const url = getAssetCdnUrl(id);
    if (url) {
        img.onload = function () { this.classList.add('loaded'); ph.classList.add('hidden'); };
        img.onerror = function () { this.classList.remove('loaded'); ph.classList.remove('hidden'); };
        img.src = url;
    } else {
        ph.classList.remove('hidden');
    }
}

function updateSmallImagePreview() {
    const id = getVal('small_image_id');
    const img = document.getElementById('prevSmallImg');
    img.onload = null;
    img.onerror = null;

    if (!id) { img.style.display = 'none'; return; }

    const url = getAssetCdnUrl(id);
    if (url) {
        img.onload = function () { this.style.display = 'block'; };
        img.onerror = function () { this.style.display = 'none'; };
        img.src = url;
        img.style.display = 'block';
    } else {
        img.style.display = 'none';
    }
}

function updateButtonsPreview() {
    const c = document.getElementById('prevButtons');
    c.innerHTML = '';
    [getVal('btn1_label'), getVal('btn2_label')].filter(Boolean).forEach(label => {
        const btn = document.createElement('div');
        btn.className = 'activity-btn';
        btn.textContent = label;
        c.appendChild(btn);
    });
}

window.addEventListener('DOMContentLoaded', () => {
    initI18n();
    loadSettings();
    updateStatus();
    setInterval(updateStatus, 3000);

    ['details', 'state', 'large_image_id', 'large_image_text',
        'small_image_id', 'small_image_text', 'btn1_label', 'btn1_url',
        'btn2_label', 'btn2_url', 'custom_timestamp', 'application_id'
    ].forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener('input', () => updatePreview(id));
            el.addEventListener('change', () => updatePreview(id));
        }
    });

    document.getElementById('timestamp_mode').addEventListener('change', () => updatePreview('timestamp_mode'));

    document.getElementById('assets_list').addEventListener('input', function () {
        const v = this.value.trim();
        let p = [];
        if (v.startsWith('[')) { try { p = JSON.parse(v); } catch (e) { } }
        else { p = v.split('\n').map(k => k.trim()).filter(Boolean).map(n => ({ name: n, id: n })); }
        cachedAssets = p;
        updateAssetDropdowns(p);
    });
});
