/* Linehan Model of Emotions Interactive Worksheet (Worksheet 4/4a) */
import { db } from '../db.js';
import { Exports } from '../exports.js';

export const ModelOfEmotionsModule = {
  render(container) {
    container.innerHTML = `
      <div class="card">
        <div class="card-header">
          <div>
            <h2 class="card-title">
              <span class="badge badge-purple">Emotion Regulation</span>
              Linehan Model of Emotions Worksheet
            </h2>
            <p class="card-subtitle">Deconstruct an emotional event to identify vulnerabilities, prompts, urge, and after-effects.</p>
          </div>
        </div>

        <form id="model-of-emotions-form">
          <div class="form-group">
            <label class="form-label">1. Primary Emotion Name</label>
            <select class="form-control" id="moe-emotion" required>
              <option value="">-- Select or type emotion --</option>
              <option value="Fear / Anxiety">Fear / Anxiety</option>
              <option value="Anger / Frustration">Anger / Frustration</option>
              <option value="Sadness / Grief">Sadness / Grief</option>
              <option value="Shame / Humiliation">Shame / Humiliation</option>
              <option value="Guilt">Guilt</option>
              <option value="Disgust">Disgust</option>
              <option value="Jealousy / Envy">Jealousy / Envy</option>
              <option value="Joy / Excitement">Joy / Excitement</option>
              <option value="Love / Attachment">Love / Attachment</option>
            </select>
          </div>

          <div class="grid-2">
            <div class="form-group">
              <label class="form-label">2. Vulnerability Factors (Before the event)</label>
              <textarea class="form-control" id="moe-vulnerabilities" placeholder="e.g. Physical exhaustion from training, sensory overload from kids, poor sleep, hungry, work deadlines..."></textarea>
            </div>

            <div class="form-group">
              <label class="form-label">3. Prompting Event (What triggered it?)</label>
              <textarea class="form-control" id="moe-prompting-event" placeholder="e.g. Kid spilled juice, received critical email, unexpected schedule disruption..."></textarea>
            </div>
          </div>

          <div class="grid-2">
            <div class="form-group">
              <label class="form-label">4. Interpretations & Beliefs (Thoughts)</label>
              <textarea class="form-control" id="moe-interpretations" placeholder="e.g. 'I can't handle this', 'They don't respect my time', 'I failed...'"></textarea>
            </div>

            <div class="form-group">
              <label class="form-label">5. Biological / Physical Sensations</label>
              <textarea class="form-control" id="moe-sensations" placeholder="e.g. Heart racing, tight chest, stomach drop, heat in face, muscle tension..."></textarea>
            </div>
          </div>

          <div class="grid-2">
            <div class="form-group">
              <label class="form-label">6. Action Urge (What did you WANT to do?)</label>
              <textarea class="form-control" id="moe-action-urge" placeholder="e.g. Yell, isolate, run away, freeze, hide in bedroom..."></textarea>
            </div>

            <div class="form-group">
              <label class="form-label">7. Expression & Behavior (What did you ACTUALLY do?)</label>
              <textarea class="form-control" id="moe-expression" placeholder="e.g. Took 3 deep breaths, walked out of room, used TIPP skill, OR yelled..."></textarea>
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">8. After-effects & Secondary Emotions</label>
            <textarea class="form-control" id="moe-after-effects" placeholder="e.g. Guilt after reaction, physical fatigue, felt relieved after using STOP skill..."></textarea>
          </div>

          <div style="display: flex; gap: 0.75rem; justify-content: flex-end; margin-top: 1rem;">
            <button type="button" class="btn btn-secondary" id="btn-copy-moe">📋 Copy for Portal</button>
            <button type="button" class="btn btn-secondary" id="btn-print-moe">🖨️ Print 8.5x11</button>
            <button type="submit" class="btn btn-primary">💾 Save Worksheet</button>
          </div>
        </form>
      </div>

      <div class="card">
        <h3 class="card-title" style="margin-bottom: 1rem;">Saved Model of Emotions Homework</h3>
        <div id="moe-saved-list">
          <p style="color: var(--text-muted); font-size: 0.9rem;">No saved entries yet.</p>
        </div>
      </div>
    `;

    this.attachEvents(container);
    this.loadSavedEntries(container);
  },

  attachEvents(container) {
    const form = container.querySelector('#model-of-emotions-form');
    
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const fields = this.getFormData(container);
      
      await db.saveWorksheet({
        type: 'model_of_emotions',
        title: `Model of Emotions: ${fields['Primary Emotion']}`,
        data: fields
      });

      alert('Worksheet saved locally!');
      form.reset();
      this.loadSavedEntries(container);
    });

    container.querySelector('#btn-copy-moe').addEventListener('click', () => {
      const fields = this.getFormData(container);
      Exports.copyForPortal('Model of Emotions', new Date(), fields);
    });

    container.querySelector('#btn-print-moe').addEventListener('click', () => {
      const fields = this.getFormData(container);
      Exports.printWorksheet('Model of Emotions (Worksheet 4)', new Date(), fields);
    });
  },

  getFormData(container) {
    return {
      'Primary Emotion': container.querySelector('#moe-emotion').value,
      'Vulnerabilities': container.querySelector('#moe-vulnerabilities').value,
      'Prompting Event': container.querySelector('#moe-prompting-event').value,
      'Interpretations': container.querySelector('#moe-interpretations').value,
      'Physical Sensations': container.querySelector('#moe-sensations').value,
      'Action Urge': container.querySelector('#moe-action-urge').value,
      'Actual Expression/Behavior': container.querySelector('#moe-expression').value,
      'After-effects': container.querySelector('#moe-after-effects').value
    };
  },

  async loadSavedEntries(container) {
    const listContainer = container.querySelector('#moe-saved-list');
    const entries = await db.getWorksheetsByType('model_of_emotions');

    if (!entries.length) {
      listContainer.innerHTML = `<p style="color: var(--text-muted); font-size: 0.85rem;">No saved worksheets yet.</p>`;
      return;
    }

    listContainer.innerHTML = entries.map(item => `
      <div style="background: var(--bg-secondary); border: 1px solid var(--border-color); padding: 0.85rem; border-radius: var(--radius-md); margin-bottom: 0.75rem; display: flex; justify-content: space-between; align-items: center;">
        <div>
          <strong style="color: var(--accent-purple); display: block;">${item.title}</strong>
          <span style="font-size: 0.75rem; color: var(--text-muted);">${new Date(item.createdAt).toLocaleString()}</span>
        </div>
        <div style="display: flex; gap: 0.4rem;">
          <button class="btn btn-secondary" style="padding: 0.3rem 0.6rem; font-size: 0.75rem;" onclick="window.copySavedMOE('${item.id}')">📋 Copy</button>
          <button class="btn btn-secondary" style="padding: 0.3rem 0.6rem; font-size: 0.75rem;" onclick="window.printSavedMOE('${item.id}')">🖨️ Print</button>
          <button class="btn btn-danger" style="padding: 0.3rem 0.6rem; font-size: 0.75rem;" onclick="window.deleteMOE('${item.id}')">🗑️</button>
        </div>
      </div>
    `).join('');

    window.copySavedMOE = (id) => {
      const item = entries.find(x => x.id === id);
      if (item) Exports.copyForPortal(item.title, item.createdAt, item.data);
    };

    window.printSavedMOE = (id) => {
      const item = entries.find(x => x.id === id);
      if (item) Exports.printWorksheet(item.title, item.createdAt, item.data);
    };

    window.deleteMOE = async (id) => {
      if (confirm('Delete this worksheet entry?')) {
        await db.deleteWorksheet(id);
        this.loadSavedEntries(container);
      }
    };
  }
};
