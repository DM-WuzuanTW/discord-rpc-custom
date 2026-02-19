const LANG = {
    'zh-TW': {
        appTitle: 'RPC Manager',
        preview: '即時預覽',
        playing: '正在玩遊戲',
        startRpc: '啟動 RPC',
        stopRpc: '停止 RPC',
        statusRunning: 'RUNNING',
        statusStopped: 'STOPPED',
        statusStarting: 'STARTING...',
        statusError: 'ERROR',
        statusLoading: '讀取中...',

        sectionConnection: '連線設定',
        labelToken: 'User Token',
        placeholderToken: '輸入您的 Discord Token',
        helpToken: '請勿將 Token 洩漏給他人',
        labelAppId: 'Application ID',
        placeholderAppId: '您的 Discord 應用程式 ID',
        helpAppId: '在 Discord Developer Portal 取得',

        sectionContent: '顯示內容',
        labelDetails: 'Details (第一行)',
        placeholderDetails: '例如: 鑽石託管',
        labelState: 'State (第二行)',
        placeholderState: '例如: 高效能伺服器託管',
        labelTimestamp: '時間顯示模式',
        tsNone: '不顯示',
        tsElapsed: '經過時間',
        tsLocal: '當地時間',
        tsCustom: '自訂時間',
        labelCustomTime: '自訂時間',

        sectionAssets: '圖片資產',
        placeholderAssets: '點擊「自動讀取」或手動輸入 JSON 格式',
        btnFetch: '自動讀取',
        labelLargeImg: '大圖片',
        labelLargeText: '大圖片文字',
        labelSmallImg: '小圖片',
        labelSmallText: '小圖片文字',
        optionNone: '(無)',

        sectionButtons: '按鈕連結',
        labelBtn1Text: '按鈕 1 文字',
        labelBtn1Url: '按鈕 1 連結',
        labelBtn2Text: '按鈕 2 文字',
        labelBtn2Url: '按鈕 2 連結',

        btnSave: '儲存設定',
        labelLanguage: '語言',

        toastSaved: '設定已儲存',
        toastSaveFail: '儲存失敗',
        toastLoadFail: '無法載入設定',
        toastFetching: '正在讀取 Asset Keys...',
        toastFetchSuccess: (n) => `成功讀取 ${n} 個 Asset Keys`,
        toastFetchFail: '讀取失敗',
        toastRpcStarting: 'RPC 啟動中...',
        toastRpcStopped: 'RPC 已停止',
        toastStartFail: '啟動失敗',
        toastStopFail: '停止失敗',
    },

    'en': {
        appTitle: 'RPC Manager',
        preview: 'Live Preview',
        playing: 'Playing a game',
        startRpc: 'Start RPC',
        stopRpc: 'Stop RPC',
        statusRunning: 'RUNNING',
        statusStopped: 'STOPPED',
        statusStarting: 'STARTING...',
        statusError: 'ERROR',
        statusLoading: 'Loading...',

        sectionConnection: 'Connection',
        labelToken: 'User Token',
        placeholderToken: 'Enter your Discord Token',
        helpToken: 'Never share your Token with anyone',
        labelAppId: 'Application ID',
        placeholderAppId: 'Your Discord Application ID',
        helpAppId: 'Get it from Discord Developer Portal',

        sectionContent: 'Display Content',
        labelDetails: 'Details (Line 1)',
        placeholderDetails: 'e.g. Diamond Hosting',
        labelState: 'State (Line 2)',
        placeholderState: 'e.g. High-performance hosting',
        labelTimestamp: 'Timestamp Mode',
        tsNone: 'Hidden',
        tsElapsed: 'Elapsed Time',
        tsLocal: 'Local Time',
        tsCustom: 'Custom Time',
        labelCustomTime: 'Custom Time',

        sectionAssets: 'Image Assets',
        placeholderAssets: 'Click "Auto Fetch" or enter JSON manually',
        btnFetch: 'Auto Fetch',
        labelLargeImg: 'Large Image',
        labelLargeText: 'Large Image Text',
        labelSmallImg: 'Small Image',
        labelSmallText: 'Small Image Text',
        optionNone: '(None)',

        sectionButtons: 'Button Links',
        labelBtn1Text: 'Button 1 Text',
        labelBtn1Url: 'Button 1 URL',
        labelBtn2Text: 'Button 2 Text',
        labelBtn2Url: 'Button 2 URL',

        btnSave: 'Save Settings',
        labelLanguage: 'Language',

        toastSaved: 'Settings saved',
        toastSaveFail: 'Save failed',
        toastLoadFail: 'Failed to load settings',
        toastFetching: 'Fetching Asset Keys...',
        toastFetchSuccess: (n) => `Successfully fetched ${n} Asset Keys`,
        toastFetchFail: 'Fetch failed',
        toastRpcStarting: 'Starting RPC...',
        toastRpcStopped: 'RPC stopped',
        toastStartFail: 'Start failed',
        toastStopFail: 'Stop failed',
    },

    'ja': {
        appTitle: 'RPC マネージャー',
        preview: 'ライブプレビュー',
        playing: 'プレイ中',
        startRpc: 'RPC 開始',
        stopRpc: 'RPC 停止',
        statusRunning: '実行中',
        statusStopped: '停止',
        statusStarting: '起動中...',
        statusError: 'エラー',
        statusLoading: '読み込み中...',

        sectionConnection: '接続設定',
        labelToken: 'ユーザートークン',
        placeholderToken: 'Discord トークンを入力',
        helpToken: 'トークンは他人に漏らさないでください',
        labelAppId: 'アプリケーション ID',
        placeholderAppId: 'Discord アプリケーション ID',
        helpAppId: 'Discord Developer Portal から取得',

        sectionContent: '表示内容',
        labelDetails: '詳細 (1行目)',
        placeholderDetails: '例: ダイヤモンドホスティング',
        labelState: 'ステート (2行目)',
        placeholderState: '例: 高性能サーバーホスティング',
        labelTimestamp: 'タイムスタンプ',
        tsNone: '非表示',
        tsElapsed: '経過時間',
        tsLocal: '現地時間',
        tsCustom: 'カスタム',
        labelCustomTime: 'カスタム時間',

        sectionAssets: '画像アセット',
        placeholderAssets: '「自動取得」をクリックするか、JSONを手動入力',
        btnFetch: '自動取得',
        labelLargeImg: '大画像',
        labelLargeText: '大画像テキスト',
        labelSmallImg: '小画像',
        labelSmallText: '小画像テキスト',
        optionNone: '(なし)',

        sectionButtons: 'ボタンリンク',
        labelBtn1Text: 'ボタン1 テキスト',
        labelBtn1Url: 'ボタン1 URL',
        labelBtn2Text: 'ボタン2 テキスト',
        labelBtn2Url: 'ボタン2 URL',

        btnSave: '設定を保存',
        labelLanguage: '言語',

        toastSaved: '設定を保存しました',
        toastSaveFail: '保存に失敗しました',
        toastLoadFail: '設定の読み込みに失敗しました',
        toastFetching: 'アセットキーを取得中...',
        toastFetchSuccess: (n) => `${n} 個のアセットキーを取得しました`,
        toastFetchFail: '取得に失敗しました',
        toastRpcStarting: 'RPC を起動中...',
        toastRpcStopped: 'RPC を停止しました',
        toastStartFail: '起動に失敗しました',
        toastStopFail: '停止に失敗しました',
    }
};

let currentLang = 'zh-TW';

function detectLanguage() {
    const saved = localStorage.getItem('rpc_lang');
    if (saved && LANG[saved]) return saved;

    const nav = navigator.language || navigator.userLanguage || 'en';
    if (nav.startsWith('zh')) return 'zh-TW';
    if (nav.startsWith('ja')) return 'ja';
    return 'en';
}

function setLanguage(lang) {
    if (!LANG[lang]) lang = 'en';
    currentLang = lang;
    localStorage.setItem('rpc_lang', lang);
    applyLanguage();
}

function t(key) {
    return LANG[currentLang]?.[key] ?? LANG['en']?.[key] ?? key;
}

function applyLanguage() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        const val = t(key);
        if (typeof val === 'string') el.textContent = val;
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        const val = t(key);
        if (typeof val === 'string') el.placeholder = val;
    });

    document.querySelectorAll('[data-i18n-title]').forEach(el => {
        const key = el.getAttribute('data-i18n-title');
        const val = t(key);
        if (typeof val === 'string') el.title = val;
    });

    const langSelect = document.getElementById('language_select');
    if (langSelect) langSelect.value = currentLang;

    const tsSelect = document.getElementById('timestamp_mode');
    if (tsSelect) {
        const opts = tsSelect.options;
        for (let i = 0; i < opts.length; i++) {
            const map = { 'none': 'tsNone', 'elapsed': 'tsElapsed', 'local': 'tsLocal', 'custom': 'tsCustom' };
            const k = map[opts[i].value];
            if (k) opts[i].textContent = t(k);
        }
    }

    const noneOpts = document.querySelectorAll('option[value=""]');
    noneOpts.forEach(o => { o.textContent = t('optionNone'); });
}

function initI18n() {
    currentLang = detectLanguage();
    applyLanguage();
}
