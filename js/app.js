/* Main Application Router & Controller */
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
    const tabs = document.querySelectorAll('.nav-tabs .tab-btn, .mobile-nav-btn');
    const sections = document.querySelectorAll('.view-section');

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const targetView = tab.dataset.view;
        if (!targetView) return;

        tabs.forEach(t => t.classList.remove('active'));
        sections.forEach(s => s.classList.remove('active'));

        document.querySelectorAll(`[data-view="${targetView}"]`).forEach(t => t.classList.add('active'));
        const activeSection = document.getElementById(`view-${targetView}`);
        if (activeSection) activeSection.classList.add('active');

        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
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
    ModelOfEmotionsModule.render(document.getElementById('view-model-of-emotions'));
    ChainAnalysisModule.render(document.getElementById('view-chain-analysis'));
    WiseMindModule.render(document.getElementById('view-wise-mind'));
    DearManModule.render(document.getElementById('view-dear-man'));
    DimeGameModule.render(document.getElementById('view-dime-game'));
    AbcPleaseModule.render(document.getElementById('view-abc-please'));
    DistressToleranceModule.render(document.getElementById('view-emergency-distress'));
    DiaryCardModule.render(document.getElementById('view-diary-card'));
    ReferencesModule.render(document.getElementById('view-references'));
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new App();
});
