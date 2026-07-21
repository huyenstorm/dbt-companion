/* Main Application Router & Controller (Fully Clickable Tiles & 2-Column Sidebar Selectors) */
import { db } from './db.js';
import { ModelOfEmotionsModule } from './modules/modelOfEmotions.js';
import { ChainAnalysisModule } from './modules/chainAnalysis.js';
import { WiseMindModule } from './modules/wiseMind.js';
import { DearManModule } from './modules/dearman.js';
import { DimeGameModule } from './modules/dimeGame.js';
import { AbcPleaseModule } from './modules/abcPlease.js';
import { DistressToleranceModule } from './modules/distressTolerance.js';
import { DiaryCardModule } from './modules/diaryCard.js';
import { ReferencesModule } from './modules/references.js';

class App {
  constructor() {
    this.currentTheme = 'dark';
    this.searchIndex = [
      { name: 'Linehan Model of Emotions (Worksheet 4)', target: 'emotion-regulation', deckTarget: 'model-emotions' },
      { name: 'Check the Facts Worksheet (Worksheet 5)', target: 'emotion-regulation', deckTarget: 'check-facts-ws5' },
      { name: 'Wise Mind Alignment Wizard', target: 'mindfulness', deckTarget: 'wise-mind' },
      { name: 'Mindfulness of Current Emotion (Worksheet 15)', target: 'mindfulness', deckTarget: 'mindfulness-emotion' },
      { name: 'Problem Solving Wizard (Handout 12)', target: 'mindfulness', deckTarget: 'problem-solving' },
      { name: 'DEAR MAN Script Builder', target: 'interpersonal', deckTarget: 'dear-man' },
      { name: 'Clarifying Priorities in Interpersonal Situations (Worksheet 3)', target: 'interpersonal', deckTarget: 'priorities-ws3' },
      { name: 'The Dime Game Calculator (Worksheet 6)', target: 'interpersonal', deckTarget: 'dime-game' },
      { name: 'Validating Others Homework (Worksheet 12)', target: 'interpersonal', deckTarget: 'val-others' },
      { name: 'Self-Validation & Self-Respect (Worksheet 13)', target: 'interpersonal', deckTarget: 'self-val' },
      { name: 'Values to Actions Pipeline (Worksheet 11)', target: 'emotion-regulation', deckTarget: 'values-to-actions' },
      { name: 'Build Mastery & Cope Ahead (Worksheet 12)', target: 'emotion-regulation', deckTarget: 'mastery-ws12' },
      { name: 'PLEASE Skills Log (Worksheet 14)', target: 'emotion-regulation', deckTarget: 'please-ws14' },
      { name: 'Behavioral Chain Analysis (Worksheet 2)', target: 'distress-tolerance', deckTarget: 'chain-analysis' },
      { name: 'Distracting with ACCEPTS Log (Worksheet 5)', target: 'distress-tolerance', deckTarget: 'accepts-ws5' },
      { name: 'Self-Soothing Sensory Log (Worksheet 6)', target: 'distress-tolerance', deckTarget: 'soothe-ws6' },
      { name: 'IMPROVE the Moment Log (Worksheet 7)', target: 'distress-tolerance', deckTarget: 'improve-ws7' },
      { name: 'Sleep Hygiene Protocol Reference (Handout 20B)', target: 'emotion-regulation', deckTarget: 'ref-sleep' },
      { name: 'Apologizing Effectively Guide (I\'M SORRY Handout X)', target: 'interpersonal', deckTarget: 'ref-sorry' },
      { name: 'Wise Mind ACCEPTS Distract Checklist (Handout 7)', target: 'distress-tolerance', deckTarget: 'dt-accepts' },
      { name: 'Self-Soothe 5 Senses Checklist (Handout 8)', target: 'distress-tolerance', deckTarget: 'dt-soothe' },
      { name: 'IMPROVE the Moment Checklist (Handout 9)', target: 'distress-tolerance', deckTarget: 'dt-improve' },
      { name: 'TIPP Paced Breathing & Temperature Reset', target: 'distress-tolerance', deckTarget: 'tipp' },
      { name: 'Diary Card Weekly Tracker', target: 'diary-card', deckTarget: '' }
    ];
    this.init();
  }

  async init() {
    this.setupTheme();
    this.setupNavigation();
    this.setupBackupModal();
    this.setupClickableTiles();
    this.setupDeckNav();
    this.setupSearchDirectory();
    this.renderAllViews();
    this.syncDeckNavVisibility('mindfulness', 'wise-mind');
    this.syncDeckNavVisibility('interpersonal', 'dear-man');
    this.syncDeckNavVisibility('emotion-regulation', 'model-emotions');
    this.syncDeckNavVisibility('distress-tolerance', 'chain-analysis');
  }

  async setupTheme() {
    const savedTheme = await db.getSetting('theme', 'dark');
    this.currentTheme = savedTheme;
    document.documentElement.setAttribute('data-theme', savedTheme);

    const themeBtn = document.getElementById('btn-toggle-theme');
    if (themeBtn) {
      themeBtn.innerHTML = savedTheme === 'dark' ? '☀️' : '🌙';
      themeBtn.addEventListener('click', async () => {
        this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        themeBtn.innerHTML = this.currentTheme === 'dark' ? '☀️' : '🌙';
        await db.setSetting('theme', this.currentTheme);
      });
    }
  }

  setupNavigation() {
    document.getElementById('brand-home').addEventListener('click', () => {
      this.switchView('dashboard');
    });

    document.getElementById('btn-dashboard-nav').addEventListener('click', () => {
      this.switchView('dashboard');
    });

    const mobileBtns = document.querySelectorAll('.mobile-nav-btn');
    mobileBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const view = btn.dataset.view;
        this.switchView(view);
      });
    });

    const backBtns = document.querySelectorAll('.btn-back-dashboard');
    backBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        this.switchView('dashboard');
      });
    });
  }

  setupClickableTiles() {
    const tiles = document.querySelectorAll('.clickable-tile');
    tiles.forEach(tile => {
      tile.addEventListener('click', () => {
        const targetView = tile.dataset.dashboardTile;
        const targetDeckBtn = tile.dataset.sub;

        this.switchView(targetView);

        if (targetDeckBtn) {
          const deckBtn = document.querySelector(`#view-${targetView} .deck-btn[data-deck-target="${targetDeckBtn}"]`);
          if (deckBtn) deckBtn.click();
        }
      });
    });
  }

  switchView(viewName) {
    const sections = document.querySelectorAll('.view-section');
    const mobileBtns = document.querySelectorAll('.mobile-nav-btn');

    sections.forEach(s => s.classList.remove('active'));
    mobileBtns.forEach(b => b.classList.remove('active'));

    const activeSection = document.getElementById(`view-${viewName}`);
    if (activeSection) activeSection.classList.add('active');

    const activeMobileBtn = document.querySelector(`.mobile-nav-btn[data-view="${viewName}"]`);
    if (activeMobileBtn) activeMobileBtn.classList.add('active');

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  setupDeckNav() {
    const deckBtns = document.querySelectorAll('.deck-btn');
    deckBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const parentSection = btn.closest('.view-section');
        const viewName = parentSection.id.replace('view-', '');
        const targetKey = btn.dataset.deckTarget;

        parentSection.querySelectorAll('.deck-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        this.syncDeckNavVisibility(viewName, targetKey);
      });
    });
  }

  syncDeckNavVisibility(moduleName, targetKey) {
    const container = document.getElementById(`view-${moduleName}`);
    if (!container) return;

    const wsContainer = container.querySelector('[id$="-worksheets-container"]');
    const refContainer = container.querySelector('[id$="-references-container"]');
    const simpleRefPanel = container.querySelector('#panel-mindfulness-ref');

    // 1. Core Mindfulness
    if (moduleName === 'mindfulness') {
      if (wsContainer) wsContainer.style.display = targetKey === 'mindfulness-ref' ? 'none' : 'block';
      if (simpleRefPanel) simpleRefPanel.style.display = targetKey === 'mindfulness-ref' ? 'block' : 'none';

      const wmMap = {
        'wise-mind': 'wm-align',
        'wise-mind-practice-ws3': 'wm-ws3',
        'what-skills-ws4': 'wm-ws4',
        'how-skills-ws5': 'wm-ws5',
        'mindfulness-emotion': 'wm-mce',
        'problem-solving': 'wm-solve'
      };
      const tabAttrVal = wmMap[targetKey];
      if (tabAttrVal) {
        const tabBtn = container.querySelector(`.nav-tabs .tab-btn[data-wm="${tabAttrVal}"]`);
        if (tabBtn) tabBtn.click();
      }
    }

    // 2. Interpersonal Effectiveness
    if (moduleName === 'interpersonal') {
      const isRef = targetKey.startsWith('ref-');
      if (wsContainer) wsContainer.style.display = isRef ? 'none' : 'block';
      if (refContainer) refContainer.style.display = isRef ? 'block' : 'none';

      const mainCard = document.getElementById('dearman-form')?.closest('.card');
      const dimeWrapper = document.getElementById('dime-game-wrapper');

      if (targetKey === 'dime-game') {
        if (mainCard) mainCard.style.display = 'none';
        if (dimeWrapper) dimeWrapper.style.display = 'block';
      } else {
        if (mainCard) mainCard.style.display = 'block';
        if (dimeWrapper) dimeWrapper.style.display = 'none';

        const ieMap = {
          'dear-man': 'ie-dearman',
          'priorities-ws3': 'ie-priorities',
          'tracking-skills-ws5': 'ie-tracking',
          'mindfulness-others-ws9': 'ie-mindfulness',
          'dialectics-ws11': 'ie-dialectics',
          'val-others': 'ie-val-others',
          'self-val': 'ie-self-val'
        };
        const tabAttrVal = ieMap[targetKey];
        if (tabAttrVal) {
          const tabBtn = container.querySelector(`.nav-tabs .tab-btn[data-ietab="${tabAttrVal}"]`);
          if (tabBtn) tabBtn.click();
        }
      }

      if (isRef && refContainer) {
        const subTabBtn = refContainer.querySelector(`.nav-tabs .tab-btn[data-reftab="${targetKey}"]`);
        if (subTabBtn) subTabBtn.click();
      }
    }

    // 3. Emotion Regulation
    if (moduleName === 'emotion-regulation') {
      const isRef = targetKey.startsWith('ref-');
      if (wsContainer) wsContainer.style.display = isRef ? 'none' : 'block';
      if (refContainer) refContainer.style.display = isRef ? 'block' : 'none';

      const moeCard = document.getElementById('model-of-emotions-form')?.closest('.card');
      const abcWrapper = document.getElementById('abc-please-wrapper');
      const isMoe = ['model-emotions', 'check-facts-ws5', 'opposite-action-ws7'].includes(targetKey);

      if (isMoe) {
        if (moeCard) moeCard.style.display = 'block';
        if (abcWrapper) abcWrapper.style.display = 'none';

        const moeMap = {
          'model-emotions': 'moe-model',
          'check-facts-ws5': 'moe-checkfacts',
          'opposite-action-ws7': 'moe-opposite'
        };
        const tabAttrVal = moeMap[targetKey];
        if (tabAttrVal) {
          const tabBtn = container.querySelector(`.nav-tabs .tab-btn[data-moetab="${tabAttrVal}"]`);
          if (tabBtn) tabBtn.click();
        }
      } else {
        if (moeCard) moeCard.style.display = 'none';
        if (abcWrapper) abcWrapper.style.display = 'block';

        const abcMap = {
          'values-to-actions': 'tab-v2a',
          'vulnerability-reduction-ws9': 'tab-reduce-vuln',
          'pleasant-diary-ws10': 'tab-pleasant-events',
          'mastery-ws12': 'tab-mastery-cope',
          'please-ws14': 'tab-please-ws14'
        };
        const tabAttrVal = abcMap[targetKey];
        if (tabAttrVal) {
          const tabBtn = container.querySelector(`.nav-tabs .tab-btn[data-subtab="${tabAttrVal}"]`);
          if (tabBtn) tabBtn.click();
        }
      }

      if (isRef && refContainer) {
        const subTabBtn = refContainer.querySelector(`.nav-tabs .tab-btn[data-reftab="${targetKey}"]`);
        if (subTabBtn) subTabBtn.click();
      }
    }

    // 4. Distress Tolerance
    if (moduleName === 'distress-tolerance') {
      const isRef = ['tipp', 'dt-accepts', 'dt-soothe', 'dt-improve'].includes(targetKey);
      if (wsContainer) wsContainer.style.display = isRef ? 'none' : 'block';
      if (refContainer) refContainer.style.display = isRef ? 'block' : 'none';

      const dtMap = {
        'chain-analysis': 'dt-chain',
        'stop-skill-ws2': 'dt-stop',
        'pros-cons-ws3': 'dt-proscons',
        'tip-skills-ws4': 'dt-tip',
        'accepts-ws5': 'dt-accepts-ws',
        'soothe-ws6': 'dt-soothe-ws',
        'improve-ws7': 'dt-improve-ws',
        'radical-acceptance-ws9': 'dt-radical-acc',
        'turning-mind-ws10': 'dt-turning-mind',
        'half-smile-ws11': 'dt-half-smile',
        'mindfulness-thoughts-ws12': 'dt-mindful-thoughts'
      };
      const tabAttrVal = dtMap[targetKey];
      if (tabAttrVal) {
        const tabBtn = container.querySelector(`.nav-tabs .tab-btn[data-dttab="${tabAttrVal}"]`);
        if (tabBtn) tabBtn.click();
      }

      if (isRef && refContainer) {
        const subTabBtn = refContainer.querySelector(`.nav-tabs .tab-btn[data-reftab="${targetKey}"], .nav-tabs .tab-btn[data-dt="${targetKey}"]`);
        if (subTabBtn) subTabBtn.click();
      }
    }
  }

  setupSearchDirectory() {
    const input = document.getElementById('search-worksheets');
    const results = document.getElementById('search-results');

    input.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      if (!query) {
        results.style.display = 'none';
        return;
      }

      const matches = this.searchIndex.filter(item => item.name.toLowerCase().includes(query));

      if (matches.length > 0) {
        results.innerHTML = matches.map(item => `
          <div class="search-result-item" style="padding: 0.6rem 1rem; cursor: pointer; font-size: 0.85rem; border-bottom: 1px solid var(--border-color); color: var(--text-primary); transition: background var(--transition-fast);" data-target="${item.target}" data-deck-target="${item.deckTarget || ''}">
            <strong style="color: var(--accent-purple);">${item.name}</strong>
            <span style="font-size: 0.75rem; color: var(--text-muted); display: block;">Module: ${item.target.toUpperCase()}</span>
          </div>
        `).join('');
        results.style.display = 'block';

        results.querySelectorAll('.search-result-item').forEach(el => {
          el.addEventListener('mouseover', () => el.style.backgroundColor = 'var(--bg-card-hover)');
          el.addEventListener('mouseout', () => el.style.backgroundColor = 'transparent');
          el.addEventListener('click', () => {
            const target = el.dataset.target;
            const deckTarget = el.dataset.deckTarget;

            this.switchView(target);
            input.value = '';
            results.style.display = 'none';

            if (deckTarget) {
              const deckBtn = document.querySelector(`#view-${target} .deck-btn[data-deck-target="${deckTarget}"]`);
              if (deckBtn) deckBtn.click();
            }
          });
        });
      } else {
        results.innerHTML = `<div style="padding: 0.75rem 1rem; font-size: 0.8rem; color: var(--text-muted);">No matching worksheets found.</div>`;
        results.style.display = 'block';
      }
    });

    document.addEventListener('click', (e) => {
      if (!input.contains(e.target) && !results.contains(e.target)) {
        results.style.display = 'none';
      }
    });
  }

  setupBackupModal() {
    const modal = document.getElementById('backup-modal');
    const btnOpen = document.getElementById('btn-open-backup');
    const btnClose = document.getElementById('btn-close-backup');
    const btnExport = document.getElementById('btn-export-backup');
    const btnImport = document.getElementById('btn-import-backup');
    const fileInput = document.getElementById('import-file-input');

    if (btnOpen) btnOpen.addEventListener('click', () => modal.classList.add('active'));
    if (btnClose) btnClose.addEventListener('click', () => modal.classList.remove('active'));

    if (btnExport) {
      btnExport.addEventListener('click', async () => {
        const jsonStr = await db.exportJSONBackup();
        const blob = new Blob([jsonStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `DBT_Companion_Backup_${new Date().toISOString().substr(0, 10)}.json`;
        a.click();
        URL.revokeObjectURL(url);
      });
    }

    if (btnImport && fileInput) {
      btnImport.addEventListener('click', () => fileInput.click());
      fileInput.addEventListener('change', async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = async (event) => {
          const success = await db.importJSONBackup(event.target.result);
          if (success) {
            alert('Backup data successfully imported!');
            location.reload();
          } else {
            alert('Import failed. Invalid backup file format.');
          }
        };
        reader.readAsText(file);
      });
    }
  }

  renderAllViews() {
    // 1. Core Mindfulness
    WiseMindModule.render(document.getElementById('mindfulness-worksheets-container'));

    // 2. Interpersonal Effectiveness
    DearManModule.render(document.getElementById('interpersonal-worksheets-container'));
    
    const dimeGameCard = document.createElement('div');
    dimeGameCard.id = 'dime-game-wrapper';
    document.getElementById('interpersonal-worksheets-container').appendChild(dimeGameCard);
    DimeGameModule.render(dimeGameCard);

    // 2a. Interpersonal References (I'M SORRY)
    const ipRefContainer = document.getElementById('interpersonal-references-container');
    ReferencesModule.render(ipRefContainer);
    ipRefContainer.querySelectorAll('.nav-tabs .tab-btn[data-reftab^="ref-emotions"]').forEach(x => x.style.display = 'none');
    ipRefContainer.querySelectorAll('.nav-tabs .tab-btn[data-reftab^="ref-opposite-action"]').forEach(x => x.style.display = 'none');
    ipRefContainer.querySelectorAll('.nav-tabs .tab-btn[data-reftab^="ref-sleep"]').forEach(x => x.style.display = 'none');
    const sorryTab = ipRefContainer.querySelector('.nav-tabs .tab-btn[data-reftab="ref-sorry"]');
    if (sorryTab) sorryTab.click();

    // 3. Emotion Regulation Worksheets
    ModelOfEmotionsModule.render(document.getElementById('emotion-regulation-worksheets-container'));
    
    const abcPleaseCard = document.createElement('div');
    abcPleaseCard.id = 'abc-please-wrapper';
    document.getElementById('emotion-regulation-worksheets-container').appendChild(abcPleaseCard);
    AbcPleaseModule.render(abcPleaseCard);

    // 3a. Emotion Regulation References
    const erRefContainer = document.getElementById('emotion-regulation-references-container');
    ReferencesModule.render(erRefContainer);
    erRefContainer.querySelectorAll('.nav-tabs .tab-btn[data-reftab="ref-sorry"]').forEach(x => x.style.display = 'none');

    // 4. Distress Tolerance Worksheets
    ChainAnalysisModule.render(document.getElementById('distress-tolerance-worksheets-container'));

    // 4a. Distress Tolerance References
    DistressToleranceModule.render(document.getElementById('distress-tolerance-references-container'));

    // 5. Diary Card
    DiaryCardModule.render(document.getElementById('view-diary-card'));
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new App();
});
