/* Main Application Router & Controller (Reorganized for 4 Core DBT Modules) */
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
    this.init();
  }

  async init() {
    this.setupTheme();
    this.setupNavigation();
    this.setupBackupModal();
    this.setupDashboardShortcuts();
    this.renderAllViews();
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
    // Header brand home nav
    document.getElementById('brand-home').addEventListener('click', () => {
      this.switchView('dashboard');
    });

    document.getElementById('btn-dashboard-nav').addEventListener('click', () => {
      this.switchView('dashboard');
    });

    // Mobile navigation bar
    const mobileBtns = document.querySelectorAll('.mobile-nav-btn');
    mobileBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const view = btn.dataset.view;
        this.switchView(view);
      });
    });

    // Sub-view panel switching (Worksheets vs References tabs)
    const subtabs = document.querySelectorAll('.view-section .nav-tabs .tab-btn');
    subtabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const parentSection = tab.closest('.view-section');
        const targetPanelId = 'panel-' + tab.dataset.subview;

        // Deactivate siblings
        parentSection.querySelectorAll('.nav-tabs .tab-btn').forEach(t => t.classList.remove('active'));
        parentSection.querySelectorAll('.subview-panel').forEach(p => p.style.display = 'none');

        // Activate selected
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
        const subType = btn.dataset.sub; // 'ws' or 'ref'

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

    // Deactivate all sections & mobile nav highlights
    sections.forEach(s => s.classList.remove('active'));
    mobileBtns.forEach(b => b.classList.remove('active'));

    // Activate selected
    const activeSection = document.getElementById(`view-${viewName}`);
    if (activeSection) activeSection.classList.add('active');

    const activeMobileBtn = document.querySelector(`.mobile-nav-btn[data-view="${viewName}"]`);
    if (activeMobileBtn) activeMobileBtn.classList.add('active');

    window.scrollTo({ top: 0, behavior: 'smooth' });
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
    // 1. Core Mindfulness (Wise Mind Alignment, Mindfulness of Emotion, Problem Solving)
    WiseMindModule.render(document.getElementById('mindfulness-worksheets-container'));

    // 2. Interpersonal Effectiveness (DEAR MAN, Validation WS 12/13, Dime Game)
    DearManModule.render(document.getElementById('interpersonal-worksheets-container'));
    
    const dimeGameCard = document.createElement('div');
    document.getElementById('interpersonal-worksheets-container').appendChild(dimeGameCard);
    DimeGameModule.render(dimeGameCard);

    // 2a. Interpersonal References (I'M SORRY)
    const ipRefContainer = document.getElementById('interpersonal-references-container');
    ReferencesModule.render(ipRefContainer);
    // Hide ER-specific tabs in the IP view
    ipRefContainer.querySelectorAll('.nav-tabs .tab-btn[data-reftab^="ref-emotions"]').forEach(x => x.style.display = 'none');
    ipRefContainer.querySelectorAll('.nav-tabs .tab-btn[data-reftab^="ref-opposite-action"]').forEach(x => x.style.display = 'none');
    ipRefContainer.querySelectorAll('.nav-tabs .tab-btn[data-reftab^="ref-sleep"]').forEach(x => x.style.display = 'none');
    const sorryTab = ipRefContainer.querySelector('.nav-tabs .tab-btn[data-reftab="ref-sorry"]');
    if (sorryTab) sorryTab.click();

    // 3. Emotion Regulation Worksheets (Model of Emotions, ABC PLEASE, WS 11)
    ModelOfEmotionsModule.render(document.getElementById('emotion-regulation-worksheets-container'));
    
    const abcPleaseCard = document.createElement('div');
    document.getElementById('emotion-regulation-worksheets-container').appendChild(abcPleaseCard);
    AbcPleaseModule.render(abcPleaseCard);

    // 3a. Emotion Regulation References (Emotion Dictionary, Sleep Hygiene)
    const erRefContainer = document.getElementById('emotion-regulation-references-container');
    ReferencesModule.render(erRefContainer);
    erRefContainer.querySelectorAll('.nav-tabs .tab-btn[data-reftab="ref-sorry"]').forEach(x => x.style.display = 'none');

    // 4. Distress Tolerance Worksheets (Chain Analysis)
    ChainAnalysisModule.render(document.getElementById('distress-tolerance-worksheets-container'));

    // 4a. Distress Tolerance References (TIPP, STOP, ACCEPTS, Self-Soothe, IMPROVE)
    DistressToleranceModule.render(document.getElementById('distress-tolerance-references-container'));

    // 5. Diary Card (Global View)
    DiaryCardModule.render(document.getElementById('view-diary-card'));
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new App();
});
