/* Linehan Model of Emotions (WS 4/4a), Check the Facts (WS 5), & Opposite Action (WS 7) */
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
            <p class="card-subtitle">Deconstruct an emotional event, verify whether your reactions align with objective facts, and practice Opposite Action.</p>
          </div>
        </div>

        <div class="nav-tabs" style="background: transparent; border-bottom: 1px solid var(--border-color); margin-bottom: 1.25rem; flex-wrap: wrap; gap: 5px; display: flex;">
          <button class="tab-btn active" data-moetab="moe-model">🧠 Model of Emotions (WS 4/4a)</button>
          <button class="tab-btn" data-moetab="moe-checkfacts">🔍 Check the Facts (WS 5)</button>
          <button class="tab-btn" data-moetab="moe-opposite">🔄 Opposite Action (WS 7)</button>
        </div>

        <!-- 1. Model of Emotions (Worksheet 4/4a) -->
        <div class="moetab-content active" id="moe-model">
          <form id="model-of-emotions-form">
            <div class="grid-2">
              <div class="form-group">
                <label class="form-label">1. Primary Emotion Name</label>
                <select class="form-control" id="moe-emotion" required>
                  <option value="">-- Select emotion --</option>
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
              <div class="form-group">
                <label class="form-label">Intensity Level (0 to 100)</label>
                <input type="number" min="0" max="100" class="form-control" id="moe-intensity" placeholder="e.g. 85">
              </div>
            </div>

            <div class="grid-2">
              <div class="form-group">
                <label class="form-label">2. Vulnerability Factors (What happened before that made me vulnerable?)</label>
                <textarea class="form-control" id="moe-vulnerabilities" placeholder="e.g. Physical exhaustion, training fatigue, poor sleep, hungry..."></textarea>
              </div>

              <div class="form-group">
                <label class="form-label">3. Prompting Event (What set off the emotion? Just the facts!)</label>
                <textarea class="form-control" id="moe-prompting-event" placeholder="e.g. Kid spilled juice, received critical email, unexpected schedule change..."></textarea>
              </div>
            </div>

            <div class="grid-2">
              <div class="form-group">
                <label class="form-label">4. Interpretations & Beliefs (Thoughts, assumptions, appraisals)</label>
                <textarea class="form-control" id="moe-interpretations" placeholder="e.g. 'I can't handle this', 'They don't respect my time...'"></textarea>
              </div>

              <div class="form-group">
                <label class="form-label">5. Face and Body Changes (Biological changes & physical sensations)</label>
                <textarea class="form-control" id="moe-sensations" placeholder="e.g. Heart racing, tight chest, stomach drop, heat in face..."></textarea>
              </div>
            </div>

            <div class="grid-2">
              <div class="form-group">
                <label class="form-label">6. Action Urges (What did you WANT to do? What did you WANT to say?)</label>
                <textarea class="form-control" id="moe-action-urge" placeholder="e.g. Yell, isolate, run away, freeze..."></textarea>
              </div>

              <div class="form-group">
                <label class="form-label">7. Face and Body Language (facial expressions, posture, gestures)</label>
                <textarea class="form-control" id="moe-facelanguage" placeholder="e.g. Frowned, clenched fists, slumped shoulders..."></textarea>
              </div>
            </div>

            <div class="grid-2">
              <div class="form-group">
                <label class="form-label">8. What I SAID in the situation (be specific)</label>
                <textarea class="form-control" id="moe-said" placeholder="e.g. 'I need some space right now.' or yelled..."></textarea>
              </div>

              <div class="form-group">
                <label class="form-label">9. What I DID in the situation (be specific)</label>
                <textarea class="form-control" id="moe-did" placeholder="e.g. Walked out of room, used TIPP paced breathing, slammed door..."></textarea>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">10. What AFTEREFFECTS did the emotion have on me? (State of mind, memory, body, etc.)</label>
              <textarea class="form-control" id="moe-after-effects" placeholder="e.g. Guilt after reaction, physical fatigue, felt relieved after using STOP..."></textarea>
            </div>

            <div style="display: flex; gap: 0.75rem; justify-content: flex-end; margin-top: 1rem;">
              <button type="button" class="btn btn-secondary" id="btn-copy-moe">📋 Copy Worksheet</button>
              <button type="submit" class="btn btn-primary">💾 Save Worksheet 4/4a</button>
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

        <!-- 3. Opposite Action (Worksheet 7) -->
        <div class="moetab-content" id="moe-opposite" style="display: none;">
          <form id="opposite-action-form">
            <div class="grid-3">
              <div class="form-group">
                <label class="form-label">Emotion Name</label>
                <input type="text" class="form-control" id="oa-emotion" placeholder="e.g. Fear, Anger, Guilt..." required>
              </div>
              <div class="form-group">
                <label class="form-label">Intensity Before (0-100)</label>
                <input type="number" min="0" max="100" class="form-control" id="oa-before" placeholder="e.g. 90" required>
              </div>
              <div class="form-group">
                <label class="form-label">Intensity After (0-100)</label>
                <input type="number" min="0" max="100" class="form-control" id="oa-after" placeholder="e.g. 40">
              </div>
            </div>
            
            <div class="form-group">
              <label class="form-label">Prompting Event (What set off the emotion?)</label>
              <textarea class="form-control" id="oa-prompting" placeholder="Describe the event..." required></textarea>
            </div>
            
            <div class="grid-2">
              <div class="form-group">
                <label class="form-label">Is Emotion Justified?</label>
                <select class="form-control" id="oa-justified">
                  <option value="">-- Select --</option>
                  <option value="Yes">Yes, fits facts & effective</option>
                  <option value="No">No, doesn't fit or not effective</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">Choice (Act on urge or opposite?)</label>
                <select class="form-control" id="oa-choice">
                  <option value="">-- Select --</option>
                  <option value="Opposite">Do Opposite Action</option>
                  <option value="Urge">Act on Action Urge</option>
                </select>
              </div>
            </div>
            
            <div class="grid-2">
              <div class="form-group">
                <label class="form-label">Facts that JUSTIFY the emotion:</label>
                <textarea class="form-control" id="oa-facts-justify" placeholder="List facts..."></textarea>
              </div>
              <div class="form-group">
                <label class="form-label">Facts that DO NOT JUSTIFY the emotion:</label>
                <textarea class="form-control" id="oa-facts-not-justify" placeholder="List facts..."></textarea>
              </div>
            </div>

            <div class="grid-2">
              <div class="form-group">
                <label class="form-label">Action Urges (What you want to do/say)</label>
                <textarea class="form-control" id="oa-urges" placeholder="Describe your urges..."></textarea>
              </div>
              <div class="form-group">
                <label class="form-label">Opposite Action (What/how to act opposite)</label>
                <textarea class="form-control" id="oa-opposite" placeholder="Describe what you will do opposite..."></textarea>
              </div>
            </div>

            <div class="grid-2">
              <div class="form-group">
                <label class="form-label">What Did You Do?</label>
                <textarea class="form-control" id="oa-did" placeholder="What action did you take?"></textarea>
              </div>
              <div class="form-group">
                <label class="form-label">How Did You Do It?</label>
                <textarea class="form-control" id="oa-how" placeholder="Describe how you did it..."></textarea>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">Aftereffect (How did you feel afterwards?)</label>
              <textarea class="form-control" id="oa-aftereffect" placeholder="Describe aftereffects on your emotions..."></textarea>
            </div>

            <div style="display: flex; gap: 0.75rem; justify-content: flex-end; margin-top: 1rem;">
              <button type="button" class="btn btn-secondary" id="btn-copy-oa">📋 Copy Worksheet</button>
              <button type="submit" class="btn btn-primary">💾 Save Worksheet 7</button>
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

    // Model of Emotions (WS 4/4a)
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

    // Opposite Action (WS 7)
    const oaForm = container.querySelector('#opposite-action-form');
    oaForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const fields = this.getOAFormData(container);
      await db.saveWorksheet({ type: 'opposite_action_ws7', title: `Opposite Action: ${fields['Emotion Name']}`, data: fields });
      alert('Opposite Action saved!');
      oaForm.reset();
      this.loadSavedEntries(container);
    });

    container.querySelector('#btn-copy-oa').addEventListener('click', () => {
      const fields = this.getOAFormData(container);
      Exports.copyForPortal('Opposite Action (WS7)', new Date(), fields);
    });
  },

  getMOEFormData(container) {
    return {
      'Primary Emotion': container.querySelector('#moe-emotion').value,
      'Intensity Level': container.querySelector('#moe-intensity').value + '/100',
      'Vulnerabilities': container.querySelector('#moe-vulnerabilities').value,
      'Prompting Event': container.querySelector('#moe-prompting-event').value,
      'Interpretations': container.querySelector('#moe-interpretations').value,
      'Physical Sensations': container.querySelector('#moe-sensations').value,
      'Action Urge': container.querySelector('#moe-action-urge').value,
      'Face and Body Language': container.querySelector('#moe-facelanguage').value,
      'What I SAID': container.querySelector('#moe-said').value,
      'What I DID': container.querySelector('#moe-did').value,
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
  
  getOAFormData(container) {
    return {
      'Emotion Name': container.querySelector('#oa-emotion').value,
      'Intensity Before': container.querySelector('#oa-before').value + '/100',
      'Intensity After': container.querySelector('#oa-after').value + '/100',
      'Prompting Event': container.querySelector('#oa-prompting').value,
      'Is Justified': container.querySelector('#oa-justified').value,
      'Choice': container.querySelector('#oa-choice').value,
      'Facts Justifying': container.querySelector('#oa-facts-justify').value,
      'Facts Not Justifying': container.querySelector('#oa-facts-not-justify').value,
      'Action Urges': container.querySelector('#oa-urges').value,
      'Opposite Action': container.querySelector('#oa-opposite').value,
      'What Did You Do': container.querySelector('#oa-did').value,
      'How Did You Do It': container.querySelector('#oa-how').value,
      'Aftereffect': container.querySelector('#oa-aftereffect').value
    };
  },

  async loadSavedEntries(container) {
    const listContainer = container.querySelector('#moe-saved-list');
    const entries = await db.getWorksheets();
    
    // Filter to Emotion worksheets
    const erTypes = ['model_of_emotions', 'check_facts_ws5', 'opposite_action_ws7'];
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
