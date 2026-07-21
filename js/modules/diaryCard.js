/* Daily & Weekly DBT Diary Card Matrix */
import { db } from '../db.js';
import { Exports } from '../exports.js';

export const DiaryCardModule = {
  render(container) {
    container.innerHTML = `
      <div class="card">
        <div class="card-header">
          <div>
            <h2 class="card-title">
              <span class="badge badge-purple">Daily & Weekly</span>
              DBT Diary Card
            </h2>
            <p class="card-subtitle">Track daily emotion intensity, target behavior urges, physical fatigue, and DBT skills used.</p>
          </div>
        </div>

        <form id="diary-card-form">
          <div class="grid-2">
            <div class="form-group">
              <label class="form-label">Date</label>
              <input type="date" class="form-control" id="dc-date" value="${new Date().toISOString().substr(0, 10)}" required>
            </div>
            <div class="form-group">
              <label class="form-label">Overall Emotion Rating (0 to 5)</label>
              <input type="number" min="0" max="5" class="form-control" id="dc-emotion-rating" placeholder="0 = Calm, 5 = Extreme Dysregulation" required>
            </div>
          </div>

          <h4 style="color: var(--accent-purple); margin: 0.75rem 0 0.5rem 0; font-size: 0.9rem;">Target Behaviors & Urges (Rating 0 to 5)</h4>
          <div class="grid-3">
            <div class="form-group">
              <label class="form-label">Urge to Isolate / Shutdown</label>
              <input type="number" min="0" max="5" class="form-control" id="dc-urge-isolate" value="0">
            </div>
            <div class="form-group">
              <label class="form-label">Anxiety / Hyperarousal (PTSD)</label>
              <input type="number" min="0" max="5" class="form-control" id="dc-anxiety" value="0">
            </div>
            <div class="form-group">
              <label class="form-label">Physical Training Fatigue / Overwork</label>
              <input type="number" min="0" max="5" class="form-control" id="dc-fatigue" value="0">
            </div>
          </div>

          <h4 style="color: var(--accent-teal); margin: 0.75rem 0 0.5rem 0; font-size: 0.9rem;">DBT Skills Used Today (Check all that apply)</h4>
          <div class="grid-3" style="margin-bottom: 1rem; background: var(--bg-secondary); padding: 0.75rem; border-radius: var(--radius-md); border: 1px solid var(--border-color);">
            <label style="font-size: 0.85rem;"><input type="checkbox" class="dc-skill" value="Wise Mind"> Wise Mind</label>
            <label style="font-size: 0.85rem;"><input type="checkbox" class="dc-skill" value="Mindfulness of Emotion"> Mindfulness of Emotion</label>
            <label style="font-size: 0.85rem;"><input type="checkbox" class="dc-skill" value="TIPP Skill"> TIPP Cold/Breathing</label>
            <label style="font-size: 0.85rem;"><input type="checkbox" class="dc-skill" value="STOP Skill"> STOP Skill</label>
            <label style="font-size: 0.85rem;"><input type="checkbox" class="dc-skill" value="Check the Facts"> Check the Facts</label>
            <label style="font-size: 0.85rem;"><input type="checkbox" class="dc-skill" value="Opposite Action"> Opposite Action</label>
            <label style="font-size: 0.85rem;"><input type="checkbox" class="dc-skill" value="DEAR MAN"> DEAR MAN Script</label>
            <label style="font-size: 0.85rem;"><input type="checkbox" class="dc-skill" value="Validation"> Validating Others</label>
            <label style="font-size: 0.85rem;"><input type="checkbox" class="dc-skill" value="PLEASE Protocol"> PLEASE Health Log</label>
          </div>

          <div class="form-group">
            <label class="form-label">Notes / Major Events Today</label>
            <textarea class="form-control" id="dc-notes" placeholder="Brief notes for therapy group..."></textarea>
          </div>

          <div style="display: flex; gap: 0.5rem; justify-content: flex-end;">
            <button type="button" class="btn btn-secondary" id="btn-copy-dc">📋 Copy for Therapist</button>
            <button type="submit" class="btn btn-primary">💾 Save Diary Entry</button>
          </div>
        </form>
      </div>

      <div class="card">
        <h3 class="card-title">Saved Diary Cards</h3>
        <div id="dc-saved-list" style="margin-top: 0.75rem;">
          <p style="color: var(--text-muted); font-size: 0.85rem;">No saved diary entries yet.</p>
        </div>
      </div>
    `;

    this.attachEvents(container);
    this.loadSavedEntries(container);
  },

  attachEvents(container) {
    const form = container.querySelector('#diary-card-form');
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const fields = this.getFormData(container);
      await db.saveWorksheet({
        type: 'diary_card',
        title: `Diary Card: ${fields['Date']}`,
        data: fields
      });
      alert('Diary Card entry saved!');
      this.loadSavedEntries(container);
    });

    container.querySelector('#btn-copy-dc').addEventListener('click', () => {
      const fields = this.getFormData(container);
      Exports.copyForPortal('Daily DBT Diary Card', new Date(), fields);
    });
  },

  getFormData(container) {
    const skills = Array.from(container.querySelectorAll('.dc-skill:checked')).map(c => c.value);
    return {
      'Date': container.querySelector('#dc-date').value,
      'Overall Emotion Rating': container.querySelector('#dc-emotion-rating').value + '/5',
      'Urge to Isolate': container.querySelector('#dc-urge-isolate').value + '/5',
      'Anxiety (PTSD)': container.querySelector('#dc-anxiety').value + '/5',
      'Training Fatigue': container.querySelector('#dc-fatigue').value + '/5',
      'Skills Used': skills.join(', ') || 'None recorded',
      'Notes': container.querySelector('#dc-notes').value
    };
  },

  async loadSavedEntries(container) {
    const listContainer = container.querySelector('#dc-saved-list');
    const entries = await db.getWorksheetsByType('diary_card');

    if (!entries.length) {
      listContainer.innerHTML = `<p style="color: var(--text-muted); font-size: 0.85rem;">No saved diary cards yet.</p>`;
      return;
    }

    listContainer.innerHTML = entries.map(item => `
      <div style="background: var(--bg-secondary); border: 1px solid var(--border-color); padding: 0.75rem; border-radius: var(--radius-md); margin-bottom: 0.5rem; display: flex; justify-content: space-between; align-items: center;">
        <div>
          <strong style="color: var(--accent-teal);">${item.title}</strong>
          <div style="font-size: 0.75rem; color: var(--text-secondary);">Emotion: ${item.data['Overall Emotion Rating']} | Skills: ${item.data['Skills Used']}</div>
        </div>
        <button class="btn btn-secondary" style="padding: 0.25rem 0.5rem; font-size: 0.75rem;" onclick="window.copySavedDC('${item.id}')">📋 Copy</button>
      </div>
    `).join('');

    window.copySavedDC = (id) => {
      const item = entries.find(x => x.id === id);
      if (item) Exports.copyForPortal(item.title, item.createdAt, item.data);
    };
  }
};
