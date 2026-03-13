// ⟪ WindowManager Constants ⟫

const WM_BASE_Z_INDEX = 0o200;
const WM_WINDOW_RANDOM_RANGE = 0o30;
const WM_WINDOW_RANDOM_STEP = 0o10;
const WM_WINDOW_BASE_X = 0o200;
const WM_WINDOW_BASE_Y_CREATE = 0o40;
const WM_WINDOW_BASE_Y_LOAD = 0o40;
const WM_RESIZE_BASE = 0o10;
const WM_TASKBAR_LARGE_THRESHOLD = 0o100;
const WM_TASKBAR_REPOSITION_DELAY = 0o4;

// ⟪ System Constants ⟫

const SYS_SWIPE_THRESHOLD = 0o200;
const SYS_PANEL_ANIMATION_DURATION = 0o300;
const SYS_TASKBAR_SIZE = 0o100;
const SYS_MARGIN = 0o20;
const SYS_DOCK_MARGIN = 0o10;
const SYS_BRIGHTNESS_MAX = 0o200;
const SYS_BRIGHTNESS_BUFFER = 0o300;

// ⟪ DesktopIconManager Constants ⟫

const DIM_DEFAULT_ROWS = 0o10;
const DIM_DEFAULT_COLS = 0o20;
const DIM_MARGIN_COMPENSATION = 0o20;
const DIM_INTERACTIVE_TAGS = [ "INPUT", "BUTTON", "LABEL" ];

// ⟪ Clock Constants ⟫

const CLK_UPDATE_INTERVAL = 0o2000;
const CLK_REFRESH_INTERVAL = 0o100;

// ⟪ App Configuration ⟫

const APPS_DATA = [
    { path: "ſɟᴜ ſɭɹ/ſןwʞ ꞁȷ̀ᴜ ſɟɔ j͐ʃɹʞ.html", emoji: "🌐" },
    { path: "ſɟᴜ ſɭɹ/ſɟᴜ ſᶘᴜ j͐ʃɹ.html", emoji: "📝" },
    { path: "ſɟᴜ ſɭɹ/ſɭw ſᶘɜ.html", emoji: "⚙️" },
    { path: "ſɟᴜ ſɭɹ/ſןɔ ſɭʞꞇ.html", emoji: "💻" },
    { path: "../../ſɟᴜƽ ꞁȷ̀ᴜ }ʃꞇ/j͐ʃᴜ ſ͔ɭᴜ.html", emoji: "🔤" },
    { path: "../../ſɟᴜƽ ꞁȷ̀ᴜ }ʃꞇ/j͑ʃ'ᴜ ɭʃᴜ ֭ſɭᴜȝ ſ͔ɭᴜ ᶅſɔ ſɭɹʞ/j͑ʃ'ᴜ ɭʃᴜ ֭ſɭᴜȝ ſ͔ɭᴜ ᶅſɔ ſɭɹʞ.html", emoji: "🌍" },
    { path: "../../ſɟᴜƽ ꞁȷ̀ᴜ }ʃꞇ/ſɟᴜ ſɭɹ ſȷɔ/ſɟᴜ ſɭɹ ſȷɔ.html", emoji: "🎨" },
    { path: "../../ſɟᴜƽ ꞁȷ̀ᴜ }ʃꞇ/ſɟᴜ ʃᴜ j͐ʃɹ ı],ᴜ/ſɟᴜ ʃᴜ j͐ʃɹ ı],ᴜ.html", emoji: "🧮" },
    { path: "../../ſɟᴜƽ ꞁȷ̀ᴜ }ʃꞇ/֭ſɭᴜ ı],ɔ ſɭɹ ſןɹ.html", emoji: "🧩" },
    { path: "../ſɟᴜƽ ꞁȷ̀ᴜ ſɭɹʞ/ſɟᴜƽ ꞁȷ̀ᴜ ſɭɹʞ.html", emoji: "🖌️" },
    { path: "../../ſ͔ɭᴜ ᶅſɔ/ſȷſɭ ꞁȷ̀ɹ ſɭˬꞇᴜ.html", emoji: "📖" }
];

// ⟪ Quick Settings Toggle Config ⟫

const QS_TOGGLES = [
    { id: "wifi", icon: "📶", label: "Wi-Fi", string: "qs_wifi", default: true },
    { id: "bluetooth", icon: "ᛒ", label: "Bluetooth", string: "qs_bluetooth", default: true },
    { id: "airplane", icon: "✈️", label: "Airplane", string: "qs_airplane", default: false },
    { id: "dnd", icon: "🔕", label: "DND", string: "qs_dnd", default: false }
];

// ⟪ Notification Defaults ⟫

const NOTIFICATION_DEFAULTS = [
    { icon: "✉️", title: "notif_messages", desc: "notif_messages_desc" },
    { icon: "📅", title: "notif_calendar", desc: "notif_calendar_desc" }
];

// ⟪ Animation Constants ⟫

const ANIM_DURATION_SHORT = 0o144;      // 100ms
const ANIM_DURATION_DEFAULT = 0o300;    // 200ms
const ANIM_DURATION_LONG = 0o454;       // 300ms
const ANIM_DURATION_SLOW = 0o614;       // 400ms
const NEXT_FRAME_DELAY = 0;

// ⟪ Animation Fractions ( 1/8 based ) ⟫

const ANIM_FRACTIONS = {
    oneEighth: 1/8,      // 0.125
    twoEighths: 2/8,     // 0.25
    threeEighths: 3/8,   // 0.375
    fourEighths: 4/8,    // 0.5
    fiveEighths: 5/8,    // 0.625
    sixEighths: 6/8,     // 0.75
    sevenEighths: 7/8,   // 0.875
    full: 8/8            // 1
};

// ⟪ Quick Settings Defaults ⟫

const QS_DEFAULTS = {
    wifi: true,
    bluetooth: true,
    airplane: false,
    dnd: false,
    brightness: 0o60,
    volume: 0o40
};

// ⟪ CSS Variable Names ⟫

const CSS_VARS = {
    taskbarSize: "--taskbar-inline-size",
    panelInset: "--panel-inset",
    brightness: "--os-brightness"
};

// ⟪ Storage Keys ⟫

const STORAGE_KEYS = {
    settings: "os-settings",
    qsState: "os-qs-state",
    dismissedNotifs: "os-dismissed-notifs",
    theme: "os-theme",
    language: "os-language"
};

// ⟪ Event Names ⟫

const EVENT_NAMES = {
    settingsChange: "os-settings-change",
    themeChange: "os-theme-change",
    languageChange: "os-language-change",
    panelOpen: "os-panel-open",
    panelClose: "os-panel-close"
};

// ⟪ Animation Settings ⟫

const ANIM_SETTINGS = {
    panelSlide: {
        duration: ANIM_DURATION_DEFAULT,
        easing: "cubic-bezier(0.4, 0, 0.2, 1)"
    },
    panelFade: {
        duration: ANIM_DURATION_SHORT,
        easing: "cubic-bezier(0, 0, 0.2, 1)"
    },
    windowOpen: {
        duration: ANIM_DURATION_LONG,
        easing: "cubic-bezier(0.34, 1.56, 0.64, 1)",
        offsetY: "-20px",
        scale: ANIM_FRACTIONS.sevenEighths
    },
    windowClose: {
        duration: ANIM_DURATION_SHORT,
        easing: "cubic-bezier(0.4, 0, 1, 1)",
        offsetY: "10px",
        scale: ANIM_FRACTIONS.sevenEighths
    },
    windowMinimize: {
        duration: ANIM_DURATION_SHORT,
        easing: "cubic-bezier(0.4, 0, 1, 1)",
        scale: ANIM_FRACTIONS.oneEighth
    },
    ripple: {
        duration: ANIM_DURATION_DEFAULT,
        color: "rgba(255, 255, 255, 0.24)"
    }
};
