// Configurations & Constants
const SEARCH_ENGINES = {
  google: {
    name: 'Google',
    url: 'https://www.google.com/search?q=',
    icon: 'https://www.google.com/s2/favicons?sz=64&domain=google.com'
  },
  bing: {
    name: 'Bing',
    url: 'https://www.bing.com/search?q=',
    icon: 'https://www.google.com/s2/favicons?sz=64&domain=bing.com'
  },
  duckduckgo: {
    name: 'DuckDuckGo',
    url: 'https://duckduckgo.com/?q=',
    icon: 'https://www.google.com/s2/favicons?sz=64&domain=duckduckgo.com'
  },
  yahoo: {
    name: 'Yahoo',
    url: 'https://search.yahoo.com/search?p=',
    icon: 'https://www.google.com/s2/favicons?sz=64&domain=yahoo.com'
  },
  youtube: {
    name: 'YouTube',
    url: 'https://www.youtube.com/results?search_query=',
    icon: 'https://www.google.com/s2/favicons?sz=64&domain=youtube.com'
  },
  brave: {
    name: 'Brave',
    url: 'https://search.brave.com/search?q=',
    icon: 'https://www.google.com/s2/favicons?sz=64&domain=brave.com'
  }
};

const DEFAULT_SHORTCUTS = [
  { id: 'sc-1', name: 'Google', url: 'https://www.google.com', icon: '' },
  { id: 'sc-2', name: 'Gmail', url: 'https://mail.google.com', icon: 'https://play-lh.googleusercontent.com/c6KD_8-GvnGRJA4lRQ4y5YnUa3-LOeYAS7ubw1jWyB9bmr6Kj6zzRvh2A5WBB-Vd3e6zhElmhDv07fCJx2Fc=w480-h960-rw' },
  { id: 'sc-3', name: 'YouTube', url: 'https://www.youtube.com', icon: '' },
  { id: 'sc-4', name: 'Outlook', url: 'https://outlook.live.com', icon: '' },
  { id: 'sc-8', name: 'Yahoo Mail', url: 'https://mail.yahoo.com', icon: 'https://play-lh.googleusercontent.com/qWWpxNSBSTXvDgbnAMpBQEI8QmWXuE8lEhFSxoeBCEoKedY2g2K8-3b0mgxC5M0Xos_BYNfzZJefdlc9q1eZbw=w480-h960-rw' },
  { id: 'sc-5', name: 'Amazon', url: 'https://www.amazon.in', icon: '' },
  { id: 'sc-6', name: 'Flipkart', url: 'https://www.flipkart.com', icon: '' },
  { id: 'sc-7', name: 'Fast', url: 'https://fast.com', icon: '' }
];

const DEFAULT_AIS = [
  { id: 'ai-1', name: 'Gemini', url: 'https://gemini.google.com', color: '#8b5cf6' },
  { id: 'ai-2', name: 'ChatGPT', url: 'https://chatgpt.com', color: '#10b981' },
  { id: 'ai-3', name: 'Duck.ai', url: 'https://duckduckgo.com/chat', color: '#f97316' }
];

const DEFAULT_SETTINGS = {
  defaultEngine: 'google',
  clock12h: true,
  showSeconds: false,
  showGreeting: true,
  background: 'gradient-mesh',
  customBgUrl: '',
  themeMode: 'auto',
  clockOpacity: 45,
  lightBgType: 'light-mesh',
  lightCustomBgUrl: '',
  darkBgType: 'gradient-mesh',
  darkCustomBgUrl: '',
  lightClockOpacity: 100,
  darkClockOpacity: 100,
  backdropOpacity: 45,
  lightBackdropOpacity: 85,
  darkBackdropOpacity: 45
};

// State Variables
let state = {
  shortcuts: [],
  ais: [],
  settings: {},
  wallpaperHistory: []
};

// UI Cache
const elements = {
  bgOverlay: document.getElementById('bg-overlay'),
  clock: document.getElementById('clock-container'),
  date: document.getElementById('date-container'),
  greeting: document.getElementById('greeting-container'),

  // Search
  searchForm: document.getElementById('search-form'),
  searchInput: document.getElementById('search-input'),
  searchClearBtn: document.getElementById('search-clear-btn'),
  searchEngineBtn: document.getElementById('search-engine-btn'),
  currentEngineIcon: document.getElementById('current-engine-icon'),
  currentEngineName: document.getElementById('current-engine-name'),
  searchEngineDropdown: document.getElementById('search-engine-dropdown'),

  // AI Launch
  aiLaunchContainer: document.getElementById('ai-launch-container'),

  // Shortcuts
  shortcutsGrid: document.getElementById('shortcuts-grid'),

  // Settings Drawer
  settingsDrawer: document.getElementById('settings-drawer'),
  settingsToggleBtn: document.getElementById('settings-toggle-btn'),
  settingsCloseBtn: document.getElementById('settings-close-btn'),

  // Setting Fields
  selectEngine: document.getElementById('setting-default-engine'),
  themeModeSelect: document.getElementById('setting-theme-mode'),
  clockOpacitySlider: document.getElementById('setting-clock-opacity'),
  clockOpacityValue: document.getElementById('clock-opacity-value'),
  backdropOpacitySlider: document.getElementById('setting-backdrop-opacity'),
  backdropOpacityValue: document.getElementById('backdrop-opacity-value'),
  chk12h: document.getElementById('setting-clock-12h'),
  chkSeconds: document.getElementById('setting-show-seconds'),
  chkGreeting: document.getElementById('setting-show-greeting'),
  bgPresetButtons: document.querySelectorAll('.bg-preset-btn'),
  customBgWrapper: document.getElementById('custom-bg-input-wrapper'),
  customBgUrlInput: document.getElementById('setting-custom-bg-url'),
  applyCustomBgBtn: document.getElementById('apply-custom-bg-btn'),
  wallpaperHistoryWrapper: document.getElementById('wallpaper-history-wrapper'),
  wallpaperHistoryList: document.getElementById('wallpaper-history-list'),

  // AI Config fields in settings drawer
  settingsShortcutsList: document.getElementById('settings-shortcuts-list'),
  settingsAiList: document.getElementById('settings-ai-list'),
  newAiNameInput: document.getElementById('new-ai-name'),
  newAiUrlInput: document.getElementById('new-ai-url'),
  newAiColorInput: document.getElementById('new-ai-color'),
  newAiAddBtn: document.getElementById('new-ai-add-btn'),

  // Data Tools
  exportBtn: document.getElementById('export-data-btn'),
  importBtnTrigger: document.getElementById('import-data-btn-trigger'),
  importFileInput: document.getElementById('import-data-file'),
  resetBtn: document.getElementById('reset-data-btn'),

  // Modal Dialog
  shortcutDialog: document.getElementById('shortcut-dialog'),
  shortcutForm: document.getElementById('shortcut-form'),
  dialogTitle: document.getElementById('dialog-title'),
  shortcutNameInput: document.getElementById('shortcut-name-input'),
  shortcutUrlInput: document.getElementById('shortcut-url-input'),
  shortcutIconInput: document.getElementById('shortcut-custom-icon-input'),
  dialogCancelBtn: document.getElementById('dialog-cancel-btn'),
  dialogSubmitBtn: document.getElementById('dialog-submit-btn')
};

// Editing Shortcut tracker
let activeEditShortcutId = null;

// Initialize Application
function init() {
  loadData();
  applySettings();
  startClock();
  setupSearch();
  renderShortcuts();
  renderAIs();
  renderSettingsShortcuts();
  renderSettingsAIs();
  setupEventListeners();
}

// Load configurations from localStorage
function loadData() {
  const localShortcuts = localStorage.getItem('homepage_shortcuts');
  const localAIs = localStorage.getItem('homepage_ais');
  const localSettings = localStorage.getItem('homepage_settings');
  const localHistory = localStorage.getItem('homepage_wallpaper_history');

  state.shortcuts = localShortcuts ? JSON.parse(localShortcuts) : [...DEFAULT_SHORTCUTS];
  state.ais = localAIs ? JSON.parse(localAIs) : [...DEFAULT_AIS];
  state.settings = localSettings ? JSON.parse(localSettings) : { ...DEFAULT_SETTINGS };
  state.wallpaperHistory = localHistory ? JSON.parse(localHistory) : [];

  // Set default settings if keys are missing from previous saves
  state.settings = { ...DEFAULT_SETTINGS, ...state.settings };

  // Since we changed the behavior, let's swap previous defaults for users transitioning:
  if (state.settings.lightClockOpacity === 85 && state.settings.lightBackdropOpacity === 0) {
    state.settings.lightClockOpacity = 100;
    state.settings.lightBackdropOpacity = 85;
  }
  if (state.settings.darkClockOpacity === 45 && state.settings.darkBackdropOpacity === 0) {
    state.settings.darkClockOpacity = 100;
    state.settings.darkBackdropOpacity = 45;
  }

  // Migrations for light/dark clock opacity
  if (state.settings.lightClockOpacity === undefined) {
    state.settings.lightClockOpacity = 100;
  }
  if (state.settings.darkClockOpacity === undefined) {
    state.settings.darkClockOpacity = 100;
  }

  // Migrations for light/dark backdrop opacity
  if (state.settings.lightBackdropOpacity === undefined) {
    state.settings.lightBackdropOpacity = 85;
  }
  if (state.settings.darkBackdropOpacity === undefined) {
    state.settings.darkBackdropOpacity = 45;
  }

  // Migrations for light/dark setup variables
  if (!state.settings.lightBgType) {
    const lightPresets = ['light-mesh', 'light-peach', 'light-mint'];
    if (lightPresets.includes(state.settings.background)) {
      state.settings.lightBgType = state.settings.background;
      state.settings.lightCustomBgUrl = '';
    } else if (state.settings.background === 'custom' && state.settings.themeMode === 'light') {
      state.settings.lightBgType = 'custom';
      state.settings.lightCustomBgUrl = state.settings.customBgUrl;
    } else {
      state.settings.lightBgType = 'light-mesh';
      state.settings.lightCustomBgUrl = '';
    }
  }

  if (!state.settings.darkBgType) {
    const darkPresets = ['gradient-mesh', 'gradient-aurora', 'gradient-sunset', 'gradient-nebula', 'solid-dark'];
    if (darkPresets.includes(state.settings.background)) {
      state.settings.darkBgType = state.settings.background;
      state.settings.darkCustomBgUrl = '';
    } else if (state.settings.background === 'custom' && state.settings.themeMode === 'dark') {
      state.settings.darkBgType = 'custom';
      state.settings.darkCustomBgUrl = state.settings.customBgUrl;
    } else {
      state.settings.darkBgType = 'gradient-mesh';
      state.settings.darkCustomBgUrl = '';
    }
  }
}

// Save configuration to localStorage
function saveData() {
  localStorage.setItem('homepage_shortcuts', JSON.stringify(state.shortcuts));
  localStorage.setItem('homepage_ais', JSON.stringify(state.ais));
  localStorage.setItem('homepage_settings', JSON.stringify(state.settings));
  localStorage.setItem('homepage_wallpaper_history', JSON.stringify(state.wallpaperHistory));
}

// Apply visual configurations from state
function applySettings() {
  // Determine if active theme is Light or Dark
  let isLight = false;
  if (state.settings.themeMode === 'light') {
    isLight = true;
  } else if (state.settings.themeMode === 'auto') {
    isLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
  }

  // Get background config corresponding to active mode
  const activeBg = isLight ? (state.settings.lightBgType || 'light-mesh') : (state.settings.darkBgType || 'gradient-mesh');
  const activeUrl = isLight ? (state.settings.lightCustomBgUrl || '') : (state.settings.darkCustomBgUrl || '');

  // Synchronize state.settings for compatibility
  state.settings.background = activeBg;
  state.settings.customBgUrl = activeUrl;

  // 1. Background Settings
  applyBackground(state.settings.background, state.settings.customBgUrl);

  // Update preset button active states in settings menu
  elements.bgPresetButtons.forEach(btn => {
    if (btn.dataset.bg === state.settings.background) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  if (state.settings.background === 'custom') {
    elements.customBgWrapper.classList.remove('hidden');
    elements.customBgUrlInput.value = state.settings.customBgUrl || '';
  } else {
    elements.customBgWrapper.classList.add('hidden');
  }

  // 2. Select default engine inputs in Settings panel
  elements.selectEngine.value = state.settings.defaultEngine;
  updateSearchEngineDisplay(state.settings.defaultEngine);

  // 3. Clock elements
  elements.chk12h.checked = state.settings.clock12h;
  elements.chkSeconds.checked = state.settings.showSeconds;
  elements.chkGreeting.checked = state.settings.showGreeting;

  if (state.settings.showGreeting) {
    elements.greeting.classList.remove('hidden');
  } else {
    elements.greeting.classList.add('hidden');
  }

  // 4. Apply Interface Theme
  if (isLight) {
    document.body.classList.add('light-theme');
  } else {
    document.body.classList.remove('light-theme');
  }

  if (elements.themeModeSelect) {
    elements.themeModeSelect.value = state.settings.themeMode || 'auto';
  }

  // 5. Apply Clock Glass and Backdrop Opacity
  const opacity = isLight 
    ? (state.settings.lightClockOpacity !== undefined ? state.settings.lightClockOpacity : 85)
    : (state.settings.darkClockOpacity !== undefined ? state.settings.darkClockOpacity : 45);

  state.settings.clockOpacity = opacity; // Keep synchronized for compatibility
  document.documentElement.style.setProperty('--clock-opacity', opacity / 100);
  if (elements.clockOpacitySlider) {
    elements.clockOpacitySlider.value = opacity;
  }
  if (elements.clockOpacityValue) {
    elements.clockOpacityValue.textContent = opacity + '%';
  }

  const bgOpacity = isLight 
    ? (state.settings.lightBackdropOpacity !== undefined ? state.settings.lightBackdropOpacity : 0)
    : (state.settings.darkBackdropOpacity !== undefined ? state.settings.darkBackdropOpacity : 0);

  state.settings.backdropOpacity = bgOpacity; // Keep synchronized for compatibility
  document.documentElement.style.setProperty('--backdrop-opacity', bgOpacity / 100);
  updateClockBackdrop(bgOpacity);
  if (elements.backdropOpacitySlider) {
    elements.backdropOpacitySlider.value = bgOpacity;
  }
  if (elements.backdropOpacityValue) {
    elements.backdropOpacityValue.textContent = bgOpacity + '%';
  }

  updateClockDisplay();
  renderWallpaperHistory();
}

// Toggle backdrop-filter on/off to ensure 0% is truly invisible
function updateClockBackdrop(val) {
  const widget = document.querySelector('.clock-widget');
  if (!widget) return;
  if (val === 0) {
    widget.style.backdropFilter = 'none';
    widget.style.webkitBackdropFilter = 'none';
  } else {
    widget.style.backdropFilter = '';
    widget.style.webkitBackdropFilter = '';
  }
}

// Background handler
function applyBackground(type, customUrl) {
  // Clear classes
  elements.bgOverlay.className = 'bg-overlay';
  elements.bgOverlay.style.backgroundImage = '';

  if (type === 'custom' && customUrl) {
    const resolved = resolveWallpaperUrl(customUrl);
    elements.bgOverlay.style.backgroundImage = `url('${resolved}')`;
  } else {
    // Is preset gradient/solid
    elements.bgOverlay.classList.add(type);
  }
}

// Clock updates
function startClock() {
  updateClockDisplay();
  setInterval(updateClockDisplay, 1000);
}

function updateClockDisplay() {
  const now = new Date();

  // Time Formats
  let hours = now.getHours();
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  let ampm = '';

  if (state.settings.clock12h) {
    ampm = hours >= 12 ? ' PM' : ' AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // 0 hours -> 12
  }

  const hoursStr = String(hours).padStart(2, '0');
  const timeString = `${hoursStr}:${minutes}${state.settings.showSeconds ? `:${seconds}` : ''}${ampm}`;
  elements.clock.textContent = timeString;

  // Date Format: "Wednesday, June 17, 2026"
  const dateOptions = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
  elements.date.textContent = now.toLocaleDateString('en-US', dateOptions);

  // Greeting Message
  if (state.settings.showGreeting) {
    const hr = now.getHours();
    let greetingText = 'Hello';
    if (hr >= 5 && hr < 12) {
      greetingText = 'Good morning';
    } else if (hr >= 12 && hr < 17) {
      greetingText = 'Good afternoon';
    } else if (hr >= 17 && hr < 22) {
      greetingText = 'Good evening';
    } else {
      greetingText = 'Good night';
    }
    elements.greeting.textContent = greetingText;
  }
}

// Search Logic
let activeSearchEngine = 'google';

function setupSearch() {
  activeSearchEngine = state.settings.defaultEngine;
  updateSearchEngineDisplay(activeSearchEngine);

  // Populates Search Engine Selector lists
  elements.searchEngineDropdown.innerHTML = '';
  Object.keys(SEARCH_ENGINES).forEach(key => {
    const engine = SEARCH_ENGINES[key];
    const li = document.createElement('li');
    li.className = 'search-engine-dropdown-item';
    li.dataset.engine = key;
    li.innerHTML = `
      <img src="${engine.icon}" alt="${engine.name}" class="engine-icon-img">
      <span>${engine.name}</span>
    `;
    elements.searchEngineDropdown.appendChild(li);
  });
}

function updateSearchEngineDisplay(engineKey) {
  const engine = SEARCH_ENGINES[engineKey];
  if (!engine) return;

  elements.currentEngineIcon.src = engine.icon;
  elements.currentEngineIcon.alt = engine.name;
  elements.currentEngineName.textContent = engine.name;

  // Highlight active option in settings and dropdown
  elements.searchEngineDropdown.querySelectorAll('.search-engine-dropdown-item').forEach(item => {
    if (item.dataset.engine === engineKey) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });
}

// AI Assistants Renderers
function renderAIs() {
  if (!elements.aiLaunchContainer) return;
  elements.aiLaunchContainer.innerHTML = '';

  state.ais.forEach(ai => {
    const btn = document.createElement('a');
    btn.href = ai.url;
    btn.className = 'ai-launch-btn';
    btn.target = '_self';
    btn.rel = 'noopener';
    btn.style.setProperty('--ai-color', ai.color);
    btn.style.setProperty('--ai-glow-color', hexToRgba(ai.color, 0.35));
    btn.style.setProperty('--ai-bg-hover', hexToRgba(ai.color, 0.12));
    btn.innerHTML = `<span>${ai.name}</span>`;
    elements.aiLaunchContainer.appendChild(btn);
  });
}

function renderSettingsAIs() {
  if (!elements.settingsAiList) return;
  elements.settingsAiList.innerHTML = '';

  state.ais.forEach((ai, index) => {
    const li = document.createElement('li');
    li.className = 'settings-list-item';
    li.style.borderLeft = `3px solid ${ai.color}`;
    li.innerHTML = `
      <div class="list-item-info">
        <span class="list-item-name" style="color: ${ai.color}">${ai.name}</span>
        <span class="list-item-url">${ai.url}</span>
      </div>
      <div class="list-item-actions">
        <button type="button" class="list-action-btn move-up-btn" aria-label="Move Up">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="18 15 12 9 6 15"></polyline>
          </svg>
        </button>
        <button type="button" class="list-action-btn move-down-btn" aria-label="Move Down">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>
        <button type="button" class="list-action-btn del-btn" aria-label="Delete">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
          </svg>
        </button>
      </div>
    `;

    li.querySelector('.move-up-btn').addEventListener('click', () => {
      moveAI(index, -1);
    });
    li.querySelector('.move-down-btn').addEventListener('click', () => {
      moveAI(index, 1);
    });
    li.querySelector('.del-btn').addEventListener('click', () => {
      deleteAI(ai.id);
    });

    elements.settingsAiList.appendChild(li);
  });
}

function deleteAI(id) {
  state.ais = state.ais.filter(ai => ai.id !== id);
  saveData();
  renderAIs();
  renderSettingsAIs();
}

function moveAI(index, direction) {
  const newIndex = index + direction;
  if (newIndex < 0 || newIndex >= state.ais.length) return;
  const temp = state.ais[index];
  state.ais[index] = state.ais[newIndex];
  state.ais[newIndex] = temp;
  saveData();
  renderAIs();
  renderSettingsAIs();
}

// Convert Hex to RGBA for styled brand button glows
function hexToRgba(hex, alpha = 0.35) {
  hex = hex.replace('#', '');
  if (hex.length === 3) {
    hex = hex.split('').map(char => char + char).join('');
  }
  const r = parseInt(hex.substring(0, 2), 16) || 0;
  const g = parseInt(hex.substring(2, 4), 16) || 0;
  const b = parseInt(hex.substring(4, 6), 16) || 0;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// Shortcut Grid Rendering
function renderShortcuts() {
  elements.shortcutsGrid.innerHTML = '';

  state.shortcuts.forEach(shortcut => {
    const card = document.createElement('div');
    card.className = 'shortcut-card';
    card.dataset.id = shortcut.id;
    card.title = shortcut.name;

    // Domain Parsing for default Google Icon Fetcher
    let domain = '';
    try {
      domain = new URL(shortcut.url).hostname;
    } catch (e) {
      domain = shortcut.url.replace(/^(https?:\/\/)?(www\.)?/, '').split('/')[0];
    }

    const iconUrl = shortcut.icon || `https://www.google.com/s2/favicons?sz=128&domain=${domain}`;

    // Gradient Preset choices for Fallback Monogram
    const charCode = shortcut.name.charCodeAt(0) || 0;
    const gradientPresets = [
      'linear-gradient(135deg, #7c3aed 0%, #1e1b4b 100%)',
      'linear-gradient(135deg, #0284c7 0%, #0c4a6e 100%)',
      'linear-gradient(135deg, #059669 0%, #064e3b 100%)',
      'linear-gradient(135deg, #ea580c 0%, #7c2d12 100%)',
      'linear-gradient(135deg, #db2777 0%, #500724 100%)'
    ];
    const monogramBg = gradientPresets[charCode % gradientPresets.length];

    card.innerHTML = `
      <button class="shortcut-action-menu-btn" aria-label="Edit shortcut">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <circle cx="12" cy="12" r="2"></circle>
          <circle cx="12" cy="5" r="2"></circle>
          <circle cx="12" cy="19" r="2"></circle>
        </svg>
      </button>
      <div class="shortcut-icon-container${shortcut.icon ? ' has-custom-icon' : ''}">
        <img class="shortcut-icon-img" src="${iconUrl}" alt="" loading="lazy">
        <div class="shortcut-fallback-monogram hidden" style="background: ${monogramBg}">
          ${shortcut.name.charAt(0)}
        </div>
      </div>
      <span class="shortcut-title">${shortcut.name}</span>
    `;

    // Click handler for card (navigate to URL)
    let longPressTriggered = false;
    card.addEventListener('click', (e) => {
      // Ignore click if clicking the action options button
      if (e.target.closest('.shortcut-action-menu-btn')) return;
      // Ignore click if long-press just triggered
      if (longPressTriggered) { longPressTriggered = false; return; }
      // Navigate
      window.location.href = shortcut.url;
    });

    // Handle Image Loading errors to fall back to monogram
    const img = card.querySelector('.shortcut-icon-img');
    const monogram = card.querySelector('.shortcut-fallback-monogram');
    img.addEventListener('error', () => {
      img.classList.add('hidden');
      monogram.classList.remove('hidden');
    });

    // Attach Edit button handler (desktop hover 3-dot)
    const actionBtn = card.querySelector('.shortcut-action-menu-btn');
    actionBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      openShortcutDialog(shortcut.id);
    });

    // Long-press / hold to edit (mobile touch)
    let longPressTimer = null;
    card.addEventListener('touchstart', (e) => {
      longPressTriggered = false;
      longPressTimer = setTimeout(() => {
        longPressTriggered = true;
        // Vibrate if supported for haptic feedback
        if (navigator.vibrate) navigator.vibrate(30);
        openShortcutDialog(shortcut.id);
      }, 500);
    }, { passive: true });
    card.addEventListener('touchend', () => { clearTimeout(longPressTimer); });
    card.addEventListener('touchmove', () => { clearTimeout(longPressTimer); });

    elements.shortcutsGrid.appendChild(card);
  });

  // Append Special "Add Shortcut" Button
  const addCard = document.createElement('button');
  addCard.className = 'shortcut-card add-card';
  addCard.type = 'button';
  addCard.ariaLabel = 'Add shortcut';
  addCard.innerHTML = `
    <div class="shortcut-icon-container">
      <svg class="plus-icon" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <line x1="12" y1="5" x2="12" y2="19"></line>
        <line x1="5" y1="12" x2="19" y2="12"></line>
      </svg>
    </div>
    <span class="shortcut-title">Add</span>
  `;

  addCard.addEventListener('click', () => openShortcutDialog());
  elements.shortcutsGrid.appendChild(addCard);
}

// Dialog Handlers
function openShortcutDialog(id = null) {
  activeEditShortcutId = id;
  elements.shortcutForm.reset();

  if (id) {
    // Edit Mode
    elements.dialogTitle.textContent = 'Edit Shortcut';
    elements.dialogSubmitBtn.textContent = 'Save';

    const shortcut = state.shortcuts.find(s => s.id === id);
    if (shortcut) {
      elements.shortcutNameInput.value = shortcut.name;
      elements.shortcutUrlInput.value = shortcut.url;
      elements.shortcutIconInput.value = shortcut.icon || '';

      // Inject Delete Button if not already added
      let delBtn = document.getElementById('dialog-delete-btn');
      if (!delBtn) {
        delBtn = document.createElement('button');
        delBtn.type = 'button';
        delBtn.id = 'dialog-delete-btn';
        delBtn.className = 'dialog-btn danger-btn';
        delBtn.style.marginRight = 'auto';
        delBtn.textContent = 'Delete';
        delBtn.addEventListener('click', () => {
          deleteShortcut(activeEditShortcutId);
          elements.shortcutDialog.close();
        });
        elements.shortcutDialog.querySelector('.dialog-actions').prepend(delBtn);
      }
    }
  } else {
    // Add Mode
    elements.dialogTitle.textContent = 'Add Shortcut';
    elements.dialogSubmitBtn.textContent = 'Add';

    const delBtn = document.getElementById('dialog-delete-btn');
    if (delBtn) delBtn.remove();
  }

  elements.shortcutDialog.showModal();
}

function handleShortcutSubmit(e) {
  e.preventDefault();

  const name = elements.shortcutNameInput.value.trim();
  let url = elements.shortcutUrlInput.value.trim();
  const icon = elements.shortcutIconInput.value.trim();

  // Auto-prefix/suffix autocomplete logic
  let protocol = 'https://';
  let rest = url;
  if (/^https?:\/\//i.test(url)) {
    const match = url.match(/^(https?:\/\/)(.*)/i);
    protocol = match[1];
    rest = match[2];
  }

  let domainAndPath = rest;
  let domainPart = domainAndPath.split('/')[0];
  if (!domainPart.includes('.')) {
    let parts = domainAndPath.split('/');
    parts[0] = parts[0] + '.com';
    domainAndPath = parts.join('/');
  }

  url = protocol + domainAndPath;

  if (activeEditShortcutId) {
    // Edit existing
    state.shortcuts = state.shortcuts.map(s => {
      if (s.id === activeEditShortcutId) {
        return { ...s, name, url, icon };
      }
      return s;
    });
  } else {
    // Create new
    const newShortcut = {
      id: 'sc-' + Date.now(),
      name,
      url,
      icon
    };
    state.shortcuts.push(newShortcut);
  }

  saveData();
  renderShortcuts();
  renderSettingsShortcuts();
  elements.shortcutDialog.close();
}

function deleteShortcut(id) {
  state.shortcuts = state.shortcuts.filter(s => s.id !== id);
  saveData();
  renderShortcuts();
  renderSettingsShortcuts();
}

function renderSettingsShortcuts() {
  if (!elements.settingsShortcutsList) return;
  elements.settingsShortcutsList.innerHTML = '';

  state.shortcuts.forEach((shortcut, index) => {
    const li = document.createElement('li');
    li.className = 'settings-list-item';
    li.innerHTML = `
      <div class="list-item-info">
        <span class="list-item-name">${shortcut.name}</span>
        <span class="list-item-url">${shortcut.url}</span>
      </div>
      <div class="list-item-actions">
        <button type="button" class="list-action-btn move-up-btn" aria-label="Move Up">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="18 15 12 9 6 15"></polyline>
          </svg>
        </button>
        <button type="button" class="list-action-btn move-down-btn" aria-label="Move Down">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>
        <button type="button" class="list-action-btn del-btn" aria-label="Delete">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
          </svg>
        </button>
      </div>
    `;

    li.querySelector('.move-up-btn').addEventListener('click', () => {
      moveShortcut(index, -1);
    });
    li.querySelector('.move-down-btn').addEventListener('click', () => {
      moveShortcut(index, 1);
    });
    li.querySelector('.del-btn').addEventListener('click', () => {
      deleteShortcut(shortcut.id);
    });

    elements.settingsShortcutsList.appendChild(li);
  });
}

function moveShortcut(index, direction) {
  const newIndex = index + direction;
  if (newIndex < 0 || newIndex >= state.shortcuts.length) return;
  const temp = state.shortcuts[index];
  state.shortcuts[index] = state.shortcuts[newIndex];
  state.shortcuts[newIndex] = temp;
  saveData();
  renderShortcuts();
  renderSettingsShortcuts();
}

function resolveWallpaperUrl(url) {
  if (!url) return '';
  // Convert Google Drive view link to direct link
  const drivePattern1 = /drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/;
  const drivePattern2 = /drive\.google\.com\/open\?id=([a-zA-Z0-9_-]+)/;
  
  let match = url.match(drivePattern1) || url.match(drivePattern2);
  if (match && match[1]) {
    const fileId = match[1];
    return `https://docs.google.com/uc?export=view&id=${fileId}`;
  }
  return url;
}

function addWallpaperToHistory(url) {
  if (!url) return;
  const resolved = resolveWallpaperUrl(url);
  // Remove duplicates
  state.wallpaperHistory = state.wallpaperHistory.filter(item => item !== resolved);
  // Add to start
  state.wallpaperHistory.unshift(resolved);
  // Limit to 3 items
  if (state.wallpaperHistory.length > 3) {
    state.wallpaperHistory.pop();
  }
  localStorage.setItem('homepage_wallpaper_history', JSON.stringify(state.wallpaperHistory));
  renderWallpaperHistory();
}

function renderWallpaperHistory() {
  if (!elements.wallpaperHistoryList) return;
  elements.wallpaperHistoryList.innerHTML = '';
  
  if (state.wallpaperHistory.length === 0) {
    elements.wallpaperHistoryWrapper.classList.add('hidden');
    return;
  }
  
  elements.wallpaperHistoryWrapper.classList.remove('hidden');
  
  state.wallpaperHistory.forEach(url => {
    const item = document.createElement('div');
    item.className = 'wallpaper-history-item';
    if (state.settings.background === 'custom' && state.settings.customBgUrl === url) {
      item.classList.add('active');
    }
    item.style.backgroundImage = `url('${url}')`;
    item.title = 'Apply this wallpaper';
    item.addEventListener('click', () => {
      let isLight = false;
      if (state.settings.themeMode === 'light') {
        isLight = true;
      } else if (state.settings.themeMode === 'auto') {
        isLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
      }

      if (isLight) {
        state.settings.lightBgType = 'custom';
        state.settings.lightCustomBgUrl = url;
      } else {
        state.settings.darkBgType = 'custom';
        state.settings.darkCustomBgUrl = url;
      }

      saveData();
      applySettings();
      renderWallpaperHistory();
    });
    elements.wallpaperHistoryList.appendChild(item);
  });
}

// Resolve and save custom wallpaper configuration for active mode
function saveCustomWallpaper(url) {
  if (!url) return;
  const resolved = resolveWallpaperUrl(url);

  let isLight = false;
  if (state.settings.themeMode === 'light') {
    isLight = true;
  } else if (state.settings.themeMode === 'auto') {
    isLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
  }

  if (isLight) {
    state.settings.lightBgType = 'custom';
    state.settings.lightCustomBgUrl = resolved;
  } else {
    state.settings.darkBgType = 'custom';
    state.settings.darkCustomBgUrl = resolved;
  }

  addWallpaperToHistory(resolved);
  saveData();
  applySettings();
}

// Event Listeners
function setupEventListeners() {
  // Settings Drawer toggling
  elements.settingsToggleBtn.addEventListener('click', () => {
    elements.settingsDrawer.classList.add('open');
    elements.settingsDrawer.setAttribute('aria-hidden', 'false');
  });

  elements.settingsCloseBtn.addEventListener('click', () => {
    elements.settingsDrawer.classList.remove('open');
    elements.settingsDrawer.setAttribute('aria-hidden', 'true');
  });

  // Google Apps Popover toggling
  const appsToggleBtn = document.getElementById('apps-toggle-btn');
  const appsPopover = document.getElementById('apps-popover');
  if (appsToggleBtn && appsPopover) {
    appsToggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      appsPopover.classList.toggle('open');
    });

    document.addEventListener('click', (e) => {
      if (appsPopover.classList.contains('open') &&
        !appsPopover.contains(e.target) &&
        !appsToggleBtn.contains(e.target)) {
        appsPopover.classList.remove('open');
      }
    });
  }

  // Theme Mode Select
  if (elements.themeModeSelect) {
    elements.themeModeSelect.addEventListener('change', (e) => {
      state.settings.themeMode = e.target.value;
      saveData();
      applySettings();
    });
  }

  // Listen for system theme changes
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', () => {
      if (state.settings.themeMode === 'auto') {
        applySettings();
      }
    });
  }

  // Clock Opacity slider input/change
  if (elements.clockOpacitySlider) {
    elements.clockOpacitySlider.addEventListener('input', (e) => {
      const val = parseInt(e.target.value, 10);
      
      let isLight = false;
      if (state.settings.themeMode === 'light') {
        isLight = true;
      } else if (state.settings.themeMode === 'auto') {
        isLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
      }
      
      if (isLight) {
        state.settings.lightClockOpacity = val;
      } else {
        state.settings.darkClockOpacity = val;
      }
      state.settings.clockOpacity = val; // Keep synchronized for compatibility
      
      document.documentElement.style.setProperty('--clock-opacity', val / 100);
      if (elements.clockOpacityValue) {
        elements.clockOpacityValue.textContent = val + '%';
      }
    });
    elements.clockOpacitySlider.addEventListener('change', () => {
      saveData();
    });
  }

  // Backdrop Opacity slider input/change
  if (elements.backdropOpacitySlider) {
    elements.backdropOpacitySlider.addEventListener('input', (e) => {
      const val = parseInt(e.target.value, 10);
      
      let isLight = false;
      if (state.settings.themeMode === 'light') {
        isLight = true;
      } else if (state.settings.themeMode === 'auto') {
        isLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
      }
      
      if (isLight) {
        state.settings.lightBackdropOpacity = val;
      } else {
        state.settings.darkBackdropOpacity = val;
      }
      state.settings.backdropOpacity = val; // Keep synchronized for compatibility
      
      document.documentElement.style.setProperty('--backdrop-opacity', val / 100);
      updateClockBackdrop(val);
      if (elements.backdropOpacityValue) {
        elements.backdropOpacityValue.textContent = val + '%';
      }
    });
    elements.backdropOpacitySlider.addEventListener('change', () => {
      saveData();
    });
  }

  // Settings Field changes
  elements.selectEngine.addEventListener('change', (e) => {
    state.settings.defaultEngine = e.target.value;
    activeSearchEngine = e.target.value;
    updateSearchEngineDisplay(activeSearchEngine);
    saveData();
  });

  elements.chk12h.addEventListener('change', (e) => {
    state.settings.clock12h = e.target.checked;
    updateClockDisplay();
    saveData();
  });

  elements.chkSeconds.addEventListener('change', (e) => {
    state.settings.showSeconds = e.target.checked;
    updateClockDisplay();
    saveData();
  });

  elements.chkGreeting.addEventListener('change', (e) => {
    state.settings.showGreeting = e.target.checked;
    if (state.settings.showGreeting) {
      elements.greeting.classList.remove('hidden');
    } else {
      elements.greeting.classList.add('hidden');
    }
    updateClockDisplay();
    saveData();
  });

  // Background presets click
  elements.bgPresetButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const bgType = btn.dataset.bg;

      const lightPresets = ['light-mesh', 'light-peach', 'light-mint'];
      const darkPresets = ['gradient-mesh', 'gradient-aurora', 'gradient-sunset', 'gradient-nebula', 'solid-dark'];

      if (lightPresets.includes(bgType)) {
        state.settings.lightBgType = bgType;
        state.settings.themeMode = 'light';
      } else if (darkPresets.includes(bgType)) {
        state.settings.darkBgType = bgType;
        state.settings.themeMode = 'dark';
      } else if (bgType === 'custom') {
        // Apply custom wallpaper for active theme mode
        let isLight = false;
        if (state.settings.themeMode === 'light') {
          isLight = true;
        } else if (state.settings.themeMode === 'auto') {
          isLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
        }

        if (isLight) {
          state.settings.lightBgType = 'custom';
        } else {
          state.settings.darkBgType = 'custom';
        }
      }

      saveData();
      applySettings();

      if (bgType === 'custom') {
        elements.customBgUrlInput.focus();
      }
    });
  });

  elements.applyCustomBgBtn.addEventListener('click', () => {
    const url = elements.customBgUrlInput.value.trim();
    saveCustomWallpaper(url);
  });

  elements.customBgUrlInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      const url = elements.customBgUrlInput.value.trim();
      saveCustomWallpaper(url);
    }
  });

  // Search Engine dropdown selection inside Search Bar
  elements.searchEngineBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isShown = elements.searchEngineDropdown.classList.toggle('show');
    elements.searchEngineBtn.classList.toggle('active', isShown);
  });

  document.addEventListener('click', () => {
    elements.searchEngineDropdown.classList.remove('show');
    elements.searchEngineBtn.classList.remove('active');
  });

  elements.searchEngineDropdown.addEventListener('click', (e) => {
    const item = e.target.closest('.search-engine-dropdown-item');
    if (item) {
      const engineKey = item.dataset.engine;
      activeSearchEngine = engineKey;
      updateSearchEngineDisplay(engineKey);
      elements.searchInput.focus();
    }
  });

  // Search Submit
  elements.searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const query = elements.searchInput.value.trim();
    if (query) {
      const engine = SEARCH_ENGINES[activeSearchEngine] || SEARCH_ENGINES.google;
      window.location.href = engine.url + encodeURIComponent(query);
    }
  });

  // Search Input clear and styling
  elements.searchInput.addEventListener('input', () => {
    if (elements.searchInput.value.length > 0) {
      elements.searchClearBtn.classList.add('show');
    } else {
      elements.searchClearBtn.classList.remove('show');
    }
  });

  elements.searchClearBtn.addEventListener('click', () => {
    elements.searchInput.value = '';
    elements.searchClearBtn.classList.remove('show');
    elements.searchInput.focus();
  });

  // Add Dynamic AI Handler
  if (elements.newAiAddBtn) {
    elements.newAiAddBtn.addEventListener('click', () => {
      const name = elements.newAiNameInput.value.trim();
      let url = elements.newAiUrlInput.value.trim();
      const color = elements.newAiColorInput.value;

      if (!name || !url) return;

      if (!/^https?:\/\//i.test(url)) {
        url = 'https://' + url;
      }

      const newAI = {
        id: 'ai-' + Date.now(),
        name,
        url,
        color
      };

      state.ais.push(newAI);
      saveData();
      renderAIs();
      renderSettingsAIs();

      elements.newAiNameInput.value = '';
      elements.newAiUrlInput.value = '';
    });
  }

  // Keyboard Shortcuts
  document.addEventListener('keydown', (e) => {
    // Focus search bar if pressing '/' key (and not inside an input/textarea)
    if (e.key === '/' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
      e.preventDefault();
      elements.searchInput.focus();
    }
    // Escape closes settings or active modal dialogs
    if (e.key === 'Escape') {
      elements.settingsDrawer.classList.remove('open');
      elements.settingsDrawer.setAttribute('aria-hidden', 'true');
    }
  });

  // Shortcut Dialog Form Actions
  elements.shortcutForm.addEventListener('submit', handleShortcutSubmit);
  elements.dialogCancelBtn.addEventListener('click', () => elements.shortcutDialog.close());

  // Data Actions: Export JSON configurations
  elements.exportBtn.addEventListener('click', () => {
    const backupData = {
      shortcuts: state.shortcuts,
      ais: state.ais,
      settings: state.settings,
      version: '1.1',
      exportedAt: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `browser_homepage_backup_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  });

  // Data Actions: Import JSON configurations
  elements.importBtnTrigger.addEventListener('click', () => {
    elements.importFileInput.click();
  });

  elements.importFileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (evt) {
      try {
        const imported = JSON.parse(evt.target.result);

        // Validation check
        if (imported && Array.isArray(imported.shortcuts) && imported.settings) {
          state.shortcuts = imported.shortcuts;
          state.ais = Array.isArray(imported.ais) ? imported.ais : [...DEFAULT_AIS];
          state.settings = { ...DEFAULT_SETTINGS, ...imported.settings };
          saveData();
          applySettings();
          renderShortcuts();
          renderAIs();
          renderSettingsAIs();
          alert('Backup configurations imported successfully!');
        } else {
          alert('Invalid backup file structure.');
        }
      } catch (err) {
        alert('Error parsing backup JSON file.');
      }
    };
    reader.readAsText(file);
    elements.importFileInput.value = ''; // Reset file input
  });

  // Data Actions: Reset Config
  elements.resetBtn.addEventListener('click', () => {
    if (confirm('Are you sure you want to reset all shortcuts and configurations? This action is permanent.')) {
      localStorage.removeItem('homepage_shortcuts');
      localStorage.removeItem('homepage_ais');
      localStorage.removeItem('homepage_settings');
      location.reload();
    }
  });
}

// Start the App
document.addEventListener('DOMContentLoaded', init);
