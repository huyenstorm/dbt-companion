/* Linehan Model of Emotions (WS 4/4a) & Check the Facts (WS 5) */
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
              Deconstructing & Checking Emotions
            </h2>
            <p class="card-subtitle">Deconstruct an emotional event or verify whether your reactions align with objective facts.</p>
          </div>
        </div>

        <div class="nav-tabs" style="background: transparent; border-bottom: 1px solid var(--border-color); margin-bottom: 1.25rem;">
          <button class="tab-btn active" data-moetab="moe-model">🧠 Model of Emotions (WS 4)</button>
          <button class="tab-btn" data-moetab="moe-checkfacts">🔍 Check the Facts (WS 5)</button>
        </div>

        <!-- 1. Model of Emotions (Worksheet 4) -->
        <div class="moetab-content active" id="moe-model">
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
                <textarea class="form-control" id="moe-vulnerabilities" placeholder="e.g. Physical exhaustion, training fatigue, poor sleep, hungry..."></textarea>
              </div>

              <div class="form-group">
                <label class="form-label">3. Prompting Event (What triggered it?)</label>
                <textarea class="form-control" id="moe-prompting-event" placeholder="e.g. Kid spilled juice, received critical email, unexpected schedule change..."></textarea>
              </div>
            </div>

            <div class="grid-2">
              <div class="form-group">
                <label class="form-label">4. Interpretations & Beliefs (Thoughts)</label>
                <textarea class="form-control" id="moe-interpretations" placeholder="e.g. 'I can't handle this', 'They don't respect my time...'"></textarea>
              </div>

              <div class="form-group">
                <label class="form-label">5. Biological / Physical Sensations</label>
                <textarea class="form-control" id="moe-sensations" placeholder="e.g. Heart racing, tight chest, stomach drop, heat in face..."></textarea>
              </div>
            </div>

            <div class="grid-2">
              <div class="form-group">
                <label class="form-label">6. Action Urge (What did you WANT to do?)</label>
                <textarea class="form-control" id="moe-action-urge" placeholder="e.g. Yell, isolate, run away, freeze..."></textarea>
              </div>

              <div class="form-group">
                <label class="form-label">7. Expression & Behavior (What did you ACTUALLY do?)</label>
                <textarea class="form-control" id="moe-expression" placeholder="e.g. Walked out of room, used TIPP paced breathing, yelled..."></textarea>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">8. After-effects & Secondary Emotions</label>
              <textarea class="form-control" id="moe-after-effects" placeholder="e.g. Guilt after reaction, physical fatigue, felt relieved after using STOP..."></textarea>
            </div>

            <div style="display: flex; gap: 0.75rem; justify-content: flex-end; margin-top: 1rem;">
              <button type="button" class="btn btn-secondary" id="btn-copy-moe">📋 Copy Worksheet</button>
              <button type="submit" class="btn btn-primary">💾 Save Worksheet 4</button>
            </div>
          </form>
        </div>

        <!-- 2. Check the Facts (Worksheet 5) -->
        <div class="moetab-content" id="moe-checkfacts" style="display: none;">
          <form id="check-facts-ws5-form">
            <div class="grid-3">
              <div class="form-group">
                <label class="form-label">Emotion Name</label>
                <input type="text" class="form-control" id="cf-emotion" placeholder="e.g. Fear, Anger, Guilt..." required>
              </div>
              <div class="form-group">
                <label class="form-label">Intensity Before (0-100)</label>
                <input type="number" min="0" max="100" class="form-control" id="cf-before" placeholder="e.g. 90" required>
              </div>
              <div class="form-group">
                <label class="form-label">Intensity After (0-100)</label>
                <input type="number" min="0" max="100" class="form-control" id="cf-after" placeholder="e.g. 40">
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">Step 2: Prompting Event (Describe what happened. Who did what to whom? What led up to what?)</label>
              <textarea class="form-control" id="cf-prompting" placeholder="Facts only..." required></textarea>
            </div>

            <div class="form-group" style="background: var(--bg-secondary); padding: 0.75rem; border-radius: var(--radius-md); border: 1px solid var(--border-color);">
              <label class="form-label" style="color: var(--accent-purple);">Check the Facts! (Look for judgments and extremes. Rewrite prompting event to be objective):</label>
              <textarea class="form-control" id="cf-prompting-rewrite" placeholder="Rewrite facts without judgments..."></textarea>
            </div>

            <div class="grid-2" style="margin-top: 1rem;">
              <div class="form-group">
                <label class="form-label">Step 3: Interpretations, Thoughts & Beliefs</label>
                <textarea class="form-control" id="cf-interpret" placeholder="What am I assuming? What own interpretations am I adding?"></textarea>
              </div>
              <div class="form-group" style="background: var(--bg-secondary); padding: 0.75rem; border-radius: var(--radius-md); border: 1px solid var(--border-color);">
                <label class="form-label" style="color: var(--accent-purple);">Check the Facts! (List other possible interpretations. Rewrite likely interpretation):</label>
                <textarea class="form-control" id="cf-interpret-rewrite" placeholder="Alternative explanations..."></textarea>
              </div>
            </div>

            <div class="grid-2" style="margin-top: 1rem;">
              <div class="form-group">
                <label class="form-label">Step 4: Threat (Am I assuming a threat? What worries me?)</label>
                <textarea class="form-control" id="cf-threat" placeholder="What bad outcomes am I expecting?"></textarea>
              </div>
              <div class="form-group" style="background: var(--bg-secondary); padding: 0.75rem; border-radius: var(--radius-md); border: 1px solid var(--border-color);">
                <label class="form-label" style="color: var(--accent-purple);">Check the Facts! (List other possible outcomes. Rewrite realistic expectations):</label>
                <textarea class="form-control" id="cf-threat-rewrite" placeholder="Alternative non-catastrophic outcomes..."></textarea>
              </div>
            </div>

            <div class="grid-2" style="margin-top: 1rem;">
              <div class="form-group">
                <label class="form-label">Step 5: Catastrophe (Describe the worst outcome you can reasonably expect)</label>
                <textarea class="form-control" id="cf-catastrophe" placeholder="What is the realistic worst case?"></textarea>
              </div>
              <div class="form-group">
                <label class="form-label">Describe ways to cope if the worst does happen</label>
                <textarea class="form-control" id="cf-cope" placeholder="Coping plan..."></textarea>
              </div>
            </div>

            <div class="grid-2" style="margin-top: 1rem;">
              <div class="form-group">
                <label class="form-label">Step 6: Does emotion (intensity/duration) FIT THE FACTS?</label>
                <select class="form-control" id="cf-fit">
                  <option value="0">0 (Not at all)</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3 (Fits somewhat)</option>
                  <option value="4">4</option>
                  <option value="5">5 (Fits completely / I am certain)</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">Describe what you did to check the facts:</label>
                <textarea class="form-control" id="cf-check-action" placeholder="How did you test your assumptions?"></textarea>
              </div>
            </div>

            <div style="display: flex; gap: 0.75rem; justify-content: flex-end; margin-top: 1rem;">
              <button type="button" class="btn btn-secondary" id="btn-copy-cf">📋 Copy Worksheet</button>
              <button type="submit" class="btn btn-primary">💾 Save Worksheet 5</button>
            </div>
          </form>
        </div>
      </div>

      <div class="card">
        <h3 class="card-title" style="margin-bottom: 1rem;">Saved Emotion Analysis Logs</h3>
        <div id="moe-saved-list">
          <p style="color: var(--text-muted); font-size: 0.9rem;">No saved entries yet.</p>
        </div>
      </div>
    `;

    this.attachEvents(container);
    this.loadSavedEntries(container);
  },

  attachEvents(container) {
    const tabs = container.querySelectorAll('.tab-btn');
    const contents = container.querySelectorAll('.moetab-content');

    tabs.forEach(t => {
      t.addEventListener('click', () => {
        tabs.forEach(x => x.classList.remove('active'));
        contents.forEach(x => x.style.display = 'none');
        t.classList.add('active');
        const target = container.querySelector('#' + t.dataset.moetab);
        if (target) target.style.display = 'block';
      });
    });

    // Model of Emotions (WS 4)
    const moeForm = container.querySelector('#model-of-emotions-form');
    moeForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const fields = this.getMOEFormData(container);
      await db.saveWorksheet({ type: 'model_of_emotions', title: `Model of Emotions: ${fields['Primary Emotion']}`, data: fields });
      alert('Model of Emotions saved!');
      moeForm.reset();
      this.loadSavedEntries(container);
    });

    container.querySelector('#btn-copy-moe').addEventListener('click', () => {
      const fields = this.getMOEFormData(container);
      Exports.copyForPortal('Model of Emotions', new Date(), fields);
    });

    // Check the Facts (WS 5)
    const cfForm = container.querySelector('#check-facts-ws5-form');
    cfForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const fields = this.getCFFormData(container);
      await db.saveWorksheet({ type: 'check_facts_ws5', title: `Check the Facts: ${fields['Emotion Name']}`, data: fields });
      alert('Check the Facts saved!');
      cfForm.reset();
      this.loadSavedEntries(container);
    });

    container.querySelector('#btn-copy-cf').addEventListener('click', () => {
      const fields = this.getCFFormData(container);
      Exports.copyForPortal('Check the Facts (WS5)', new Date(), fields);
    });
  },

  getMOEFormData(container) {
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

  getCFFormData(container) {
    return {
      'Emotion Name': container.querySelector('#cf-emotion').value,
      'Intensity Before': container.querySelector('#cf-before').value + '/100',
      'Intensity After': container.querySelector('#cf-after').value + '/100',
      'Prompting Event': container.querySelector('#cf-prompting').value,
      'Prompting Event Rewrite': container.querySelector('#cf-prompting-rewrite').value,
      'Interpretations': container.querySelector('#cf-interpret').value,
      'Interpretations Rewrite': container.querySelector('#cf-interpret-rewrite').value,
      'Threat': container.querySelector('#cf-threat').value,
      'Threat Rewrite': container.querySelector('#cf-threat-rewrite').value,
      'Catastrophe': container.querySelector('#cf-catastrophe').value,
      'Coping Plan': container.querySelector('#cf-cope').value,
      'Does Emotion Fit Facts': container.querySelector('#cf-fit').value + '/5',
      'Did to Check Facts': container.querySelector('#cf-check-action').value
    };
  },

  async loadSavedEntries(container) {
    const listContainer = container.querySelector('#moe-saved-list');
    const entries = await db.getWorksheets();
    
    // Filter to Emotion worksheets
    const erTypes = ['model_of_emotions', 'check_facts_ws5'];
    const erEntries = entries.filter(x => erTypes.includes(x.type));

    if (!erEntries.length) {
      listContainer.innerHTML = `<p style="color: var(--text-muted); font-size: 0.85rem;">No saved worksheets yet.</p>`;
      return;
    }

    listContainer.innerHTML = erEntries.map(item => `
      <div style="background: var(--bg-secondary); border: 1px solid var(--border-color); padding: 0.85rem; border-radius: var(--radius-md); margin-bottom: 0.75rem; display: flex; justify-content: space-between; align-items: center;">
        <div>
          <strong style="color: var(--accent-purple); display: block;">${item.title}</strong>
          <span style="font-size: 0.75rem; color: var(--text-muted);">${new Date(item.createdAt).toLocaleString()}</span>
        </div>
        <div style="display: flex; gap: 0.4rem;">
          <button class="btn btn-secondary" style="padding: 0.3rem 0.6rem; font-size: 0.75rem;" onclick="window.copySavedER('${item.id}')">📋 Copy</button>
          <button class="btn btn-secondary" style="padding: 0.3rem 0.6rem; font-size: 0.75rem;" onclick="window.printSavedER('${item.id}')">🖨️ Print</button>
          <button class="btn btn-danger" style="padding: 0.3rem 0.6rem; font-size: 0.75rem;" onclick="window.deleteER('${item.id}')">🗑️</button>
        </div>
      </div>
    `).join('');

    window.copySavedER = (id) => {
      const item = erEntries.find(x => x.id === id);
      if (item) Exports.copyForPortal(item.title, item.createdAt, item.data);
    };

    window.printSavedER = (id) => {
      const item = entries.find(x => x.id === id);
      if (item) Exports.printWorksheet(item.title, item.createdAt, item.data);
    };

    window.deleteER = async (id) => {
      if (confirm('Delete this worksheet entry?')) {
        await db.deleteWorksheet(id);
        this.loadSavedEntries(container);
      }
    };
  }
};
