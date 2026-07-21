/* Main Application Router & Controller (Reorganized with Search Directory & Worksheet Toggles) */
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
      { name: 'Linehan Model of Emotions (Worksheet 4)', target: 'emotion-regulation', tab: 'ws', value: 'model-emotions' },
      { name: 'Wise Mind Alignment', target: 'mindfulness', tab: 'ws', value: 'wise-mind' },
      { name: 'Mindfulness of Current Emotion', target: 'mindfulness', tab: 'ws', value: 'mindfulness-emotion' },
      { name: 'Problem Solving Wizard (Handout 12)', target: 'mindfulness', tab: 'ws', value: 'problem-solving' },
      { name: 'DEAR MAN Script Builder', target: 'interpersonal', tab: 'ws', value: 'dear-man' },
      { name: 'The Dime Game Calculator (Worksheet 5)', target: 'interpersonal', tab: 'ws', value: 'dime-game' },
      { name: 'Validating Others Homework (Worksheet 12)', target: 'interpersonal', tab: 'ws', value: 'val-others' },
      { name: 'Self-Validation & Self-Respect (Worksheet 13)', target: 'interpersonal', tab: 'ws', value: 'self-val' },
      { name: 'Values to Actions Pipeline (Worksheet 11)', target: 'emotion-regulation', tab: 'ws', value: 'values-to-actions' },
      { name: 'PLEASE Health Log (Physical Vulnerabilities)', target: 'emotion-regulation', tab: 'ws', value: 'please-log' },
      { name: 'Behavioral Chain Analysis (Worksheet 2)', target: 'distress-tolerance', tab: 'ws', value: '' },
      { name: 'Sleep Hygiene Protocol Reference (Handout 20B)', target: 'emotion-regulation', tab: 'ref', subTab: 'ref-sleep' },
      { name: 'Apologizing Effectively Guide (I\'M SORRY Handout X)', target: 'interpersonal', tab: 'ref', subTab: 'ref-sorry' },
      { name: 'Wise Mind ACCEPTS Distract Checklist (Handout 7)', target: 'distress-tolerance', tab: 'ref', subTab: 'dt-accepts' },
      { name: 'Self-Soothe 5 Senses Checklist (Handout 8)', target: 'distress-tolerance', tab: 'ref', subTab: 'dt-soothe' },
      { name: 'IMPROVE the Moment Checklist (Handout 9)', target: 'distress-tolerance', tab: 'ref', subTab: 'dt-improve' },
      { name: 'TIPP Paced Breathing & Temperature Reset', target: 'distress-tolerance', tab: 'ref', subTab: '' },
      { name: 'Diary Card Weekly Tracker', target: 'diary-card', tab: '' }
    ];
    this.init();
  }

  async init() {
    this.setupTheme();
    this.setupNavigation();
    this.setupBackupModal();
    this.setupDashboardShortcuts();
    this.setupWorksheetSelectors();
    this.setupSearchDirectory();
    this.renderAllViews();
    this.syncWorksheetVisibility();
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

    const subtabs = document.querySelectorAll('.view-section .nav-tabs .tab-btn');
    subtabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const parentSection = tab.closest('.view-section');
        const targetPanelId = 'panel-' + tab.dataset.subview;

        parentSection.querySelectorAll('.nav-tabs .tab-btn').forEach(t => t.classList.remove('active'));
        parentSection.querySelectorAll('.subview-panel').forEach(p => p.style.display = 'none');

        tab.classList.add('active');
        const targetPanel = document.getElementById(targetPanelId);
        if (targetPanel) targetPanel.style.display = 'block';
      });
    });
  }

  setupDashboardShortcuts() {
    const shortcuts = document.querySelectorAll('.btn-dashboard-shortcut');
    shortcuts.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetView = btn.dataset.target;
        const subType = btn.dataset.sub;

        this.switchView(targetView);

        if (subType) {
          const targetSection = document.getElementById(`view-${targetView}`);
          const tabBtn = targetSection.querySelector(`.nav-tabs .tab-btn[data-subview^="${targetView}-${subType}"]`);
          if (tabBtn) tabBtn.click();
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

  setupWorksheetSelectors() {
    const selectors = document.querySelectorAll('.ws-selector');
    selectors.forEach(sel => {
      sel.addEventListener('change', () => {
        this.syncWorksheetVisibility();
      });
    });
  }

  syncWorksheetVisibility() {
    // 1. Mindfulness Toggle
    const mfVal = document.querySelector('.ws-selector[data-target-container="mindfulness-worksheets-container"]').value;
    const mfAlign = document.getElementById('wise-mind-form')?.closest('.card') || document.getElementById('wise-mind-form');
    const mfMce = document.getElementById('mce-form')?.closest('.card') || document.getElementById('mce-form');
    const mfPs = document.getElementById('solve-form')?.closest('.card') || document.getElementById('solve-form');

    if (mfAlign) mfAlign.style.display = mfVal === 'wise-mind' ? 'block' : 'none';
    if (mfMce) mfMce.style.display = mfVal === 'mindfulness-emotion' ? 'block' : 'none';
    if (mfPs) mfPs.style.display = mfVal === 'problem-solving' ? 'block' : 'none';

    // 2. Interpersonal Toggle
    const ipVal = document.querySelector('.ws-selector[data-target-container="interpersonal-worksheets-container"]').value;
    const ipDm = document.getElementById('dearman-form')?.closest('.card') || document.getElementById('dearman-form');
    const ipValOth = document.getElementById('val-others-form')?.closest('.card') || document.getElementById('val-others-form');
    const ipSelfVal = document.getElementById('self-val-form')?.closest('.card') || document.getElementById('self-val-form');
    const ipDime = document.getElementById('dime-game-container');

    if (ipDm) ipDm.style.display = ipVal === 'dear-man' ? 'block' : 'none';
    if (ipDime) ipDime.style.display = ipVal === 'dime-game' ? 'block' : 'none';
    if (ipValOth) ipValOth.style.display = ipVal === 'val-others' ? 'block' : 'none';
    if (ipSelfVal) ipSelfVal.style.display = ipVal === 'self-val' ? 'block' : 'none';

    // 3. Emotion Regulation Toggle
    const erVal = document.querySelector('.ws-selector[data-target-container="emotion-regulation-worksheets-container"]').value;
    const erMoe = document.getElementById('model-of-emotions-form')?.closest('.card') || document.getElementById('model-of-emotions-form');
    const erAbcPos = document.getElementById('abc-a-form')?.closest('.card') || document.getElementById('abc-a-form');
    const erTabVal = document.querySelector('.tab-btn[data-subtab="tab-v2a"]');
    const erTabPlease = document.querySelector('.tab-btn[data-subtab="tab-please"]');

    if (erMoe) erMoe.style.display = erVal === 'model-emotions' ? 'block' : 'none';
    if (erAbcPos) {
      erAbcPos.closest('.card').style.display = (erVal === 'values-to-actions' || erVal === 'please-log') ? 'block' : 'none';
      if (erVal === 'values-to-actions' && erTabVal) erTabVal.click();
      if (erVal === 'please-log' && erTabPlease) erTabPlease.click();
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
          <div class="search-result-item" style="padding: 0.6rem 1rem; cursor: pointer; font-size: 0.85rem; border-bottom: 1px solid var(--border-color); color: var(--text-primary); transition: background var(--transition-fast);" data-target="${item.target}" data-tab="${item.tab}" data-value="${item.value || ''}" data-subtab="${item.subTab || ''}">
            <strong style="color: var(--accent-purple);">${item.name}</strong>
            <span style="font-size: 0.75rem; color: var(--text-muted); display: block;">Module: ${item.target.toUpperCase()}</span>
          </div>
        `).join('');
        results.style.display = 'block';

        // Add event listeners
        results.querySelectorAll('.search-result-item').forEach(el => {
          el.addEventListener('mouseover', () => el.style.backgroundColor = 'var(--bg-card-hover)');
          el.addEventListener('mouseout', () => el.style.backgroundColor = 'transparent');
          el.addEventListener('click', () => {
            const target = el.dataset.target;
            const tab = el.dataset.tab;
            const value = el.dataset.value;
            const subtab = el.dataset.subtab;

            this.switchView(target);
            input.value = '';
            results.style.display = 'none';

            if (tab) {
              const tabBtn = document.querySelector(`.nav-tabs .tab-btn[data-subview="${target}-${tab}"]`);
              if (tabBtn) tabBtn.click();

              if (tab === 'ws' && value) {
                const selector = document.querySelector(`.ws-selector[data-target-container="${target}-worksheets-container"]`);
                if (selector) {
                  selector.value = value;
                  selector.dispatchEvent(new Event('change'));
                }
              }

              if (tab === 'ref' && subtab) {
                const subtabBtn = document.querySelector(`.nav-tabs .tab-btn[data-reftab="${subtab}"], .nav-tabs .tab-btn[data-dt="${subtab}"]`);
                if (subtabBtn) subtabBtn.click();
              }
            }
          });
        });
      } else {
        results.innerHTML = `<div style="padding: 0.75rem 1rem; font-size: 0.8rem; color: var(--text-muted);">No matching worksheets found.</div>`;
        results.style.display = 'block';
      }
    });

    // Close results dropdown on outside click
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
