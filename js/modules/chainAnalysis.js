/* Behavioral Chain Analysis Interactive Worksheet (Worksheet 2) */
import { db } from '../db.js';
import { Exports } from '../exports.js';

export const ChainAnalysisModule = {
  render(container) {
    container.innerHTML = `
      <div class="card">
        <div class="card-header">
          <div>
            <h2 class="card-title">
              <span class="badge badge-rose">Behavioral Tech</span>
              Chain Analysis Worksheet (Worksheet 2)
            </h2>
            <p class="card-subtitle">Detailed step-by-step breakdown of a specific problem behavior, vulnerability factors, links, and skill intervention points.</p>
          </div>
        </div>

        <form id="chain-analysis-form">
          <div class="grid-2">
            <div class="form-group">
              <label class="form-label">1. Problem Behavior (Specific behavior to change)</label>
              <input type="text" class="form-control" id="ca-behavior" placeholder="e.g. Yelling at partner, shutting down/isolating, urge to quit..." required>
            </div>
            <div class="form-group">
              <label class="form-label">Intensity Level (0 to 100)</label>
              <input type="number" min="0" max="100" class="form-control" id="ca-intensity" placeholder="e.g. 85">
            </div>
          </div>

          <div class="grid-2">
            <div class="form-group">
              <label class="form-label">2. Prompting Event (Environmental catalyst)</label>
              <textarea class="form-control" id="ca-prompting-event" placeholder="What specific external event triggered the chain?"></textarea>
            </div>
            <div class="form-group">
              <label class="form-label">3. Vulnerability Factors</label>
              <textarea class="form-control" id="ca-vulnerabilities" placeholder="Sleep deprivation, Ironman workout exhaustion, physical pain, prior conflict..."></textarea>
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">4. Chain of Links (Thoughts, Feelings, Sensations, Behaviors leading up to the behavior)</label>
            <textarea class="form-control" id="ca-links" style="min-height: 120px;" placeholder="Link 1: Thought 'I can't take this'\nLink 2: Heart rate spiked\nLink 3: Urge to slam door\nLink 4: Action taken..."></textarea>
          </div>

          <div class="grid-2">
            <div class="form-group">
              <label class="form-label">5. Short-Term & Long-Term Consequences</label>
              <textarea class="form-control" id="ca-consequences" placeholder="Short-term: Immediate release of tension.\nLong-term: Relationship distress, guilt, exhaustion..."></textarea>
            </div>
            <div class="form-group">
              <label class="form-label">6. Skill Repair Points (Where could a DBT skill be inserted?)</label>
              <textarea class="form-control" id="ca-skill-repairs" placeholder="e.g. At Link 2: Use TIPP cold water.\nAt Link 3: Use STOP skill.\nPrevention: PLEASE skill for sleep..."></textarea>
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">7. Harm Reduction & Prevention Plan</label>
            <textarea class="form-control" id="ca-prevention" placeholder="How to prevent the triggering event or vulnerability in the future..."></textarea>
          </div>

          <div style="display: flex; gap: 0.75rem; justify-content: flex-end; margin-top: 1rem;">
            <button type="button" class="btn btn-secondary" id="btn-copy-ca">📋 Copy for Portal</button>
            <button type="button" class="btn btn-secondary" id="btn-print-ca">🖨️ Print 8.5x11</button>
            <button type="submit" class="btn btn-primary">💾 Save Chain Analysis</button>
          </div>
        </form>
      </div>

      <div class="card">
        <h3 class="card-title" style="margin-bottom: 1rem;">Saved Chain Analyses</h3>
        <div id="ca-saved-list">
          <p style="color: var(--text-muted); font-size: 0.9rem;">No saved chain analyses yet.</p>
        </div>
      </div>
    `;

    this.attachEvents(container);
    this.loadSavedEntries(container);
  },

  attachEvents(container) {
    const form = container.querySelector('#chain-analysis-form');
    
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const fields = this.getFormData(container);
      
      await db.saveWorksheet({
        type: 'chain_analysis',
        title: `Chain Analysis: ${fields['Problem Behavior']}`,
        data: fields
      });

      alert('Chain Analysis saved!');
      form.reset();
      this.loadSavedEntries(container);
    });

    container.querySelector('#btn-copy-ca').addEventListener('click', () => {
      const fields = this.getFormData(container);
      Exports.copyForPortal('Behavioral Chain Analysis', new Date(), fields);
    });

    container.querySelector('#btn-print-ca').addEventListener('click', () => {
      const fields = this.getFormData(container);
      Exports.printWorksheet('Behavioral Chain Analysis (Worksheet 2)', new Date(), fields);
    });
  },

  getFormData(container) {
    return {
      'Problem Behavior': container.querySelector('#ca-behavior').value,
      'Intensity Level': container.querySelector('#ca-intensity').value + '/100',
      'Prompting Event': container.querySelector('#ca-prompting-event').value,
      'Vulnerabilities': container.querySelector('#ca-vulnerabilities').value,
      'Chain of Links': container.querySelector('#ca-links').value,
      'Consequences': container.querySelector('#ca-consequences').value,
      'Skill Repair Points': container.querySelector('#ca-skill-repairs').value,
      'Prevention Plan': container.querySelector('#ca-prevention').value
    };
  },

  async loadSavedEntries(container) {
    const listContainer = container.querySelector('#ca-saved-list');
    const entries = await db.getWorksheetsByType('chain_analysis');

    if (!entries.length) {
      listContainer.innerHTML = `<p style="color: var(--text-muted); font-size: 0.85rem;">No saved worksheets yet.</p>`;
      return;
    }

    listContainer.innerHTML = entries.map(item => `
      <div style="background: var(--bg-secondary); border: 1px solid var(--border-color); padding: 0.85rem; border-radius: var(--radius-md); margin-bottom: 0.75rem; display: flex; justify-content: space-between; align-items: center;">
        <div>
          <strong style="color: var(--accent-rose); display: block;">${item.title}</strong>
          <span style="font-size: 0.75rem; color: var(--text-muted);">${new Date(item.createdAt).toLocaleString()}</span>
        </div>
        <div style="display: flex; gap: 0.4rem;">
          <button class="btn btn-secondary" style="padding: 0.3rem 0.6rem; font-size: 0.75rem;" onclick="window.copySavedCA('${item.id}')">📋 Copy</button>
          <button class="btn btn-secondary" style="padding: 0.3rem 0.6rem; font-size: 0.75rem;" onclick="window.printSavedCA('${item.id}')">🖨️ Print</button>
          <button class="btn btn-danger" style="padding: 0.3rem 0.6rem; font-size: 0.75rem;" onclick="window.deleteCA('${item.id}')">🗑️</button>
        </div>
      </div>
    `).join('');

    window.copySavedCA = (id) => {
      const item = entries.find(x => x.id === id);
      if (item) Exports.copyForPortal(item.title, item.createdAt, item.data);
    };

    window.printSavedCA = (id) => {
      const item = entries.find(x => x.id === id);
      if (item) Exports.printWorksheet(item.title, item.createdAt, item.data);
    };

    window.deleteCA = async (id) => {
      if (confirm('Delete this chain analysis entry?')) {
        await db.deleteWorksheet(id);
        this.loadSavedEntries(container);
      }
    };
  }
};
