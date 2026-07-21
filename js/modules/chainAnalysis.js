/* Distress Tolerance Worksheets: Chain Analysis (WS 2), ACCEPTS (WS 5), Self-Soothe (WS 6), IMPROVE (WS 7) */
import { db } from '../db.js';
import { Exports } from '../exports.js';

export const ChainAnalysisModule = {
  render(container) {
    container.innerHTML = `
      <div class="card">
        <div class="card-header">
          <div>
            <h2 class="card-title">
              <span class="badge badge-rose">Distress Tolerance</span>
              Crisis Survival Worksheets
            </h2>
            <p class="card-subtitle">Analyze problem behaviors, track ACCEPTS, practice Self-Soothing, and apply IMPROVE the moment.</p>
          </div>
        </div>

        <div class="nav-tabs" style="background: transparent; border-bottom: 1px solid var(--border-color); margin-bottom: 1.25rem;">
          <button class="tab-btn active" data-dttab="dt-chain">🔗 Chain Analysis (WS 2)</button>
          <button class="tab-btn" data-dttab="dt-accepts-ws">🧩 Distracting with ACCEPTS (WS 5)</button>
          <button class="tab-btn" data-dttab="dt-soothe-ws">🌸 Self-Soothing (WS 6)</button>
          <button class="tab-btn" data-dttab="dt-improve-ws">☀️ IMPROVE the Moment (WS 7)</button>
        </div>

        <!-- 1. Behavioral Chain Analysis (WS 2) -->
        <div class="dttab-content active" id="dt-chain">
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
                <textarea class="form-control" id="ca-vulnerabilities" placeholder="Sleep deprivation, prior conflict, physical pain..."></textarea>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">4. Chain of Links (Thoughts, Feelings, Sensations, Behaviors leading up to the behavior)</label>
              <textarea class="form-control" id="ca-links" style="min-height: 120px;" placeholder="Link 1: Thought 'I can't take this'\nLink 2: Heart rate spiked\nLink 3: Urge to slam door..."></textarea>
            </div>

            <div class="grid-2">
              <div class="form-group">
                <label class="form-label">5. Short-Term & Long-Term Consequences</label>
                <textarea class="form-control" id="ca-consequences" placeholder="Short-term: Release of tension. Long-term: Relationship distress..."></textarea>
              </div>
              <div class="form-group">
                <label class="form-label">6. Skill Repair Points (Where could a DBT skill be inserted?)</label>
                <textarea class="form-control" id="ca-skill-repairs" placeholder="e.g. At Link 2: Use TIPP breathing. At Link 3: Use STOP..."></textarea>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">7. Harm Reduction & Prevention Plan</label>
              <textarea class="form-control" id="ca-prevention" placeholder="How to prevent the triggering event or vulnerability in the future..."></textarea>
            </div>

            <div style="display: flex; gap: 0.5rem; justify-content: flex-end;">
              <button type="button" class="btn btn-secondary" id="btn-copy-ca">📋 Copy Script</button>
              <button type="submit" class="btn btn-primary">💾 Save Chain Analysis</button>
            </div>
          </form>
        </div>

        <!-- 2. Distracting with ACCEPTS (WS 5) -->
        <div class="dttab-content" id="dt-accepts-ws" style="display: none;">
          <form id="accepts-ws5-form">
            <div class="grid-3">
              <div class="form-group">
                <label class="form-label">Distress Before (0-100)</label>
                <input type="number" min="0" max="100" class="form-control" id="acc-before" placeholder="e.g. 90" required>
              </div>
              <div class="form-group">
                <label class="form-label">Distress After (0-100)</label>
                <input type="number" min="0" max="100" class="form-control" id="acc-after" placeholder="e.g. 40">
              </div>
              <div class="form-group">
                <label class="form-label">Effectiveness Rating</label>
                <select class="form-control" id="acc-effect">
                  <option value="5">5 (Tolerated distress & resisted urges)</option>
                  <option value="4">4</option>
                  <option value="3">3 (Able to cope somewhat, helped a little)</option>
                  <option value="2">2</option>
                  <option value="1">1 (Couldn't stand situation even for 1m)</option>
                </select>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">Prompting Event for my Distress (Who, what, when, where? What triggered the crisis?)</label>
              <textarea class="form-control" id="acc-prompting" placeholder="Describe the prompting event..." required></textarea>
            </div>

            <div class="grid-2">
              <div class="form-group">
                <label class="form-label">Check ACCEPTS skills used:</label>
                <div style="background: var(--bg-secondary); padding: 0.75rem; border-radius: var(--radius-md); border: 1px solid var(--border-color); font-size: 0.85rem;">
                  <label style="display:block; margin-bottom:0.25rem;"><input type="checkbox" class="acc-check" value="Activities"> Activities (sports, hobbies, tasks)</label>
                  <label style="display:block; margin-bottom:0.25rem;"><input type="checkbox" class="acc-check" value="Contributions"> Contributions (helping others, service)</label>
                  <label style="display:block; margin-bottom:0.25rem;"><input type="checkbox" class="acc-check" value="Comparisons"> Comparisons (comparing to other times/situations)</label>
                  <label style="display:block; margin-bottom:0.25rem;"><input type="checkbox" class="acc-check" value="Emotions"> Emotions (doing things to elicit opposite feelings)</label>
                  <label style="display:block; margin-bottom:0.25rem;"><input type="checkbox" class="acc-check" value="Pushing away"> Pushing away (leaving situation, blocking thoughts)</label>
                  <label style="display:block; margin-bottom:0.25rem;"><input type="checkbox" class="acc-check" value="Thoughts"> Thoughts (counting, reading, solving puzzles)</label>
                  <label style="display:block; margin-bottom:0.25rem;"><input type="checkbox" class="acc-check" value="Sensations"> Sensations (hot/cold shower, loud music, ice)</label>
                </div>
              </div>
              <div class="form-group">
                <label class="form-label">Describe skills used and what you did:</label>
                <textarea class="form-control" id="acc-desc" style="height: 165px;" placeholder="e.g. 'Took a freezing cold shower (Sensations) and solved a Sudoku puzzle (Thoughts)...'"></textarea>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">Describe the outcome of using these skills:</label>
              <textarea class="form-control" id="acc-outcome" placeholder="How did this help you tolerate the distress and resist urges?"></textarea>
            </div>

            <div style="display: flex; gap: 0.5rem; justify-content: flex-end;">
              <button type="button" class="btn btn-secondary" id="btn-copy-acc">📋 Copy Worksheet</button>
              <button type="submit" class="btn btn-primary">💾 Save Worksheet 5</button>
            </div>
          </form>
        </div>

        <!-- 3. Self-Soothing (WS 6) -->
        <div class="dttab-content" id="dt-soothe-ws" style="display: none;">
          <form id="soothe-ws6-form">
            <div class="grid-3">
              <div class="form-group">
                <label class="form-label">Distress Before (0-100)</label>
                <input type="number" min="0" max="100" class="form-control" id="soothe-before" placeholder="e.g. 80" required>
              </div>
              <div class="form-group">
                <label class="form-label">Distress After (0-100)</label>
                <input type="number" min="0" max="100" class="form-control" id="soothe-after" placeholder="e.g. 45">
              </div>
              <div class="form-group">
                <label class="form-label">Effectiveness Rating</label>
                <select class="form-control" id="soothe-effect">
                  <option value="5">5 (Tolerated distress & resisted urges)</option>
                  <option value="4">4</option>
                  <option value="3">3 (Able to cope somewhat, helped a little)</option>
                  <option value="2">2</option>
                  <option value="1">1 (Couldn't stand situation even for 1m)</option>
                </select>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">Prompting Event for my Distress (Who, what, when, where? What triggered the crisis?)</label>
              <textarea class="form-control" id="soothe-prompting" placeholder="Describe the prompting event..." required></textarea>
            </div>

            <div class="grid-2">
              <div class="form-group">
                <label class="form-label">Check sensory self-soothing used:</label>
                <div style="background: var(--bg-secondary); padding: 0.75rem; border-radius: var(--radius-md); border: 1px solid var(--border-color); font-size: 0.85rem;">
                  <label style="display:block; margin-bottom:0.4rem;"><input type="checkbox" class="soothe-check" value="Vision"> Vision (stars, nature, art, beautiful lighting)</label>
                  <label style="display:block; margin-bottom:0.4rem;"><input type="checkbox" class="soothe-check" value="Hearing"> Hearing (soothing music, white noise, nature sounds)</label>
                  <label style="display:block; margin-bottom:0.4rem;"><input type="checkbox" class="soothe-check" value="Smell"> Smell (lavender oil, incense, scented candles, fresh coffee)</label>
                  <label style="display:block; margin-bottom:0.4rem;"><input type="checkbox" class="soothe-check" value="Taste"> Taste (savoring hot tea, dark chocolate, mindfully eating)</label>
                  <label style="display:block; margin-bottom:0.4rem;"><input type="checkbox" class="soothe-check" value="Touch"> Touch (comfortable blanket, warm bath, massage, petting animal)</label>
                </div>
              </div>
              <div class="form-group">
                <label class="form-label">Describe skills used and what you did:</label>
                <textarea class="form-control" id="soothe-desc" style="height: 165px;" placeholder="e.g. 'Wrapped in a weighted blanket (Touch), lit a lavender candle (Smell), and listened to lo-fi beats (Hearing)...'"></textarea>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">Describe the outcome of using these skills:</label>
              <textarea class="form-control" id="soothe-outcome" placeholder="How did this help you tolerate the distress and resist urges?"></textarea>
            </div>

            <div style="display: flex; gap: 0.5rem; justify-content: flex-end;">
              <button type="button" class="btn btn-secondary" id="btn-copy-soothe">📋 Copy Worksheet</button>
              <button type="submit" class="btn btn-primary">💾 Save Worksheet 6</button>
            </div>
          </form>
        </div>

        <!-- 4. IMPROVE the Moment (WS 7) -->
        <div class="dttab-content" id="dt-improve-ws" style="display: none;">
          <form id="improve-ws7-form">
            <div class="grid-3">
              <div class="form-group">
                <label class="form-label">Distress Before (0-100)</label>
                <input type="number" min="0" max="100" class="form-control" id="imp-before" placeholder="e.g. 95" required>
              </div>
              <div class="form-group">
                <label class="form-label">Distress After (0-100)</label>
                <input type="number" min="0" max="100" class="form-control" id="imp-after" placeholder="e.g. 50">
              </div>
              <div class="form-group">
                <label class="form-label">Effectiveness Rating</label>
                <select class="form-control" id="imp-effect">
                  <option value="5">5 (Tolerated distress & resisted urges)</option>
                  <option value="4">4</option>
                  <option value="3">3 (Able to cope somewhat, helped a little)</option>
                  <option value="2">2</option>
                  <option value="1">1 (Couldn't stand situation even for 1m)</option>
                </select>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">Prompting Event for my Distress (Who, what, when, where? What triggered the crisis?)</label>
              <textarea class="form-control" id="imp-prompting" placeholder="Describe the prompting event..." required></textarea>
            </div>

            <div class="grid-2">
              <div class="form-group">
                <label class="form-label">Check IMPROVE skills used:</label>
                <div style="background: var(--bg-secondary); padding: 0.75rem; border-radius: var(--radius-md); border: 1px solid var(--border-color); font-size: 0.85rem;">
                  <label style="display:block; margin-bottom:0.25rem;"><input type="checkbox" class="imp-check" value="Imagery"> Imagery (visualizing safe place, problems resolving)</label>
                  <label style="display:block; margin-bottom:0.25rem;"><input type="checkbox" class="imp-check" value="Meaning"> Meaning (finding purpose or value in pain/event)</label>
                  <label style="display:block; margin-bottom:0.25rem;"><input type="checkbox" class="imp-check" value="Prayer"> Prayer (opening mind to connection, higher force)</label>
                  <label style="display:block; margin-bottom:0.25rem;"><input type="checkbox" class="imp-check" value="Relaxation"> Relaxation (progressive muscle relaxation, deep breathing)</label>
                  <label style="display:block; margin-bottom:0.25rem;"><input type="checkbox" class="imp-check" value="One thing"> One thing (focusing completely on a single task)</label>
                  <label style="display:block; margin-bottom:0.25rem;"><input type="checkbox" class="imp-check" value="Vacation"> Vacation (brief mental escape, short break from responsibilities)</label>
                  <label style="display:block; margin-bottom:0.25rem;"><input type="checkbox" class="imp-check" value="Encouragement"> Encouragement (self-talk: 'I can do this', 'It will pass')</label>
                </div>
              </div>
              <div class="form-group">
                <label class="form-label">Describe skills used and what you did:</label>
                <textarea class="form-control" id="imp-desc" style="height: 165px;" placeholder="e.g. 'Reminded myself that pain is temporary (Encouragement) and did deep belly breathing (Relaxation)...'"></textarea>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">Describe the outcome of using these skills:</label>
              <textarea class="form-control" id="imp-outcome" placeholder="How did this help you tolerate the distress and resist urges?"></textarea>
            </div>

            <div style="display: flex; gap: 0.5rem; justify-content: flex-end;">
              <button type="button" class="btn btn-secondary" id="btn-copy-imp">📋 Copy Worksheet</button>
              <button type="submit" class="btn btn-primary">💾 Save Worksheet 7</button>
            </div>
          </form>
        </div>
      </div>

      <div class="card">
        <h3 class="card-title" style="margin-bottom: 1rem;">Saved Crisis Survival Logs</h3>
        <div id="dt-saved-list">
          <p style="color: var(--text-muted); font-size: 0.9rem;">No saved entries yet.</p>
        </div>
      </div>
    `;

    this.attachEvents(container);
    this.loadSavedEntries(container);
  },

  attachEvents(container) {
    const tabs = container.querySelectorAll('.tab-btn');
    const contents = container.querySelectorAll('.dttab-content');

    tabs.forEach(t => {
      t.addEventListener('click', () => {
        tabs.forEach(x => x.classList.remove('active'));
        contents.forEach(x => x.style.display = 'none');
        t.classList.add('active');
        const target = container.querySelector('#' + t.dataset.dttab);
        if (target) target.style.display = 'block';
      });
    });

    // 1. Chain Analysis Form
    const caForm = container.querySelector('#chain-analysis-form');
    caForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const fields = this.getCAFormData(container);
      await db.saveWorksheet({ type: 'chain_analysis', title: `Chain Analysis: ${fields['Problem Behavior']}`, data: fields });
      alert('Chain Analysis saved!');
      caForm.reset();
      this.loadSavedEntries(container);
    });

    container.querySelector('#btn-copy-ca').addEventListener('click', () => {
      const fields = this.getCAFormData(container);
      Exports.copyForPortal('Behavioral Chain Analysis', new Date(), fields);
    });

    // 2. ACCEPTS (WS 5)
    const accForm = container.querySelector('#accepts-ws5-form');
    accForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const fields = this.getAccFormData(container);
      await db.saveWorksheet({ type: 'accepts_ws5', title: `ACCEPTS WS5: ${fields.Prompting.substring(0, 30)}...`, data: fields });
      alert('ACCEPTS Worksheet 5 saved!');
      accForm.reset();
      this.loadSavedEntries(container);
    });

    container.querySelector('#btn-copy-acc').addEventListener('click', () => {
      const fields = this.getAccFormData(container);
      Exports.copyForPortal('Distracting with ACCEPTS (WS5)', new Date(), fields);
    });

    // 3. Self-Soothing (WS 6)
    const sootheForm = container.querySelector('#soothe-ws6-form');
    sootheForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const fields = this.getSootheFormData(container);
      await db.saveWorksheet({ type: 'soothe_ws6', title: `Self-Soothe WS6: ${fields.Prompting.substring(0, 30)}...`, data: fields });
      alert('Self-Soothing Worksheet 6 saved!');
      sootheForm.reset();
      this.loadSavedEntries(container);
    });

    container.querySelector('#btn-copy-soothe').addEventListener('click', () => {
      const fields = this.getSootheFormData(container);
      Exports.copyForPortal('Self-Soothing Homework (WS6)', new Date(), fields);
    });

    // 4. IMPROVE (WS 7)
    const impForm = container.querySelector('#improve-ws7-form');
    impForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const fields = this.getImpFormData(container);
      await db.saveWorksheet({ type: 'improve_ws7', title: `IMPROVE WS7: ${fields.Prompting.substring(0, 30)}...`, data: fields });
      alert('IMPROVE the Moment Worksheet 7 saved!');
      impForm.reset();
      this.loadSavedEntries(container);
    });

    container.querySelector('#btn-copy-imp').addEventListener('click', () => {
      const fields = this.getImpFormData(container);
      Exports.copyForPortal('IMPROVE the Moment Homework (WS7)', new Date(), fields);
    });
  },

  getCAFormData(container) {
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

  getAccFormData(container) {
    const checks = Array.from(container.querySelectorAll('.acc-check:checked')).map(c => c.value);
    return {
      'Prompting': container.querySelector('#acc-prompting').value,
      'Distress Before': container.querySelector('#acc-before').value + '/100',
      'Distress After': container.querySelector('#acc-after').value + '/100',
      'Skills Checked': checks.join(', ') || 'None selected',
      'Skills Described': container.querySelector('#acc-desc').value,
      'Outcome': container.querySelector('#acc-outcome').value,
      'Effectiveness': container.querySelector('#acc-effect').value + '/5'
    };
  },

  getSootheFormData(container) {
    const checks = Array.from(container.querySelectorAll('.soothe-check:checked')).map(c => c.value);
    return {
      'Prompting': container.querySelector('#soothe-prompting').value,
      'Distress Before': container.querySelector('#soothe-before').value + '/100',
      'Distress After': container.querySelector('#soothe-after').value + '/100',
      'Senses Checked': checks.join(', ') || 'None selected',
      'Skills Described': container.querySelector('#soothe-desc').value,
      'Outcome': container.querySelector('#soothe-outcome').value,
      'Effectiveness': container.querySelector('#soothe-effect').value + '/5'
    };
  },

  getImpFormData(container) {
    const checks = Array.from(container.querySelectorAll('.imp-check:checked')).map(c => c.value);
    return {
      'Prompting': container.querySelector('#imp-prompting').value,
      'Distress Before': container.querySelector('#imp-before').value + '/100',
      'Distress After': container.querySelector('#imp-after').value + '/100',
      'Skills Checked': checks.join(', ') || 'None selected',
      'Skills Described': container.querySelector('#imp-desc').value,
      'Outcome': container.querySelector('#imp-outcome').value,
      'Effectiveness': container.querySelector('#imp-effect').value + '/5'
    };
  },

  async loadSavedEntries(container) {
    const listContainer = container.querySelector('#dt-saved-list');
    const entries = await db.getWorksheets();
    
    // Filter to Distress Tolerance worksheets
    const dtTypes = ['chain_analysis', 'accepts_ws5', 'soothe_ws6', 'improve_ws7'];
    const dtEntries = entries.filter(x => dtTypes.includes(x.type));

    if (!dtEntries.length) {
      listContainer.innerHTML = `<p style="color: var(--text-muted); font-size: 0.85rem;">No saved worksheets yet.</p>`;
      return;
    }

    listContainer.innerHTML = dtEntries.map(item => `
      <div style="background: var(--bg-secondary); border: 1px solid var(--border-color); padding: 0.85rem; border-radius: var(--radius-md); margin-bottom: 0.75rem; display: flex; justify-content: space-between; align-items: center;">
        <div>
          <strong style="color: var(--accent-rose); display: block;">${item.title}</strong>
          <span style="font-size: 0.75rem; color: var(--text-muted);">${new Date(item.createdAt).toLocaleString()}</span>
        </div>
        <div style="display: flex; gap: 0.4rem;">
          <button class="btn btn-secondary" style="padding: 0.3rem 0.6rem; font-size: 0.75rem;" onclick="window.copySavedDT('${item.id}')">📋 Copy</button>
          <button class="btn btn-secondary" style="padding: 0.3rem 0.6rem; font-size: 0.75rem;" onclick="window.printSavedDT('${item.id}')">🖨️ Print</button>
          <button class="btn btn-danger" style="padding: 0.3rem 0.6rem; font-size: 0.75rem;" onclick="window.deleteDT('${item.id}')">🗑️</button>
        </div>
      </div>
    `).join('');

    window.copySavedDT = (id) => {
      const item = dtEntries.find(x => x.id === id);
      if (item) Exports.copyForPortal(item.title, item.createdAt, item.data);
    };

    window.printSavedDT = (id) => {
      const item = entries.find(x => x.id === id);
      if (item) Exports.printWorksheet(item.title, item.createdAt, item.data);
    };

    window.deleteDT = async (id) => {
      if (confirm('Delete this crisis survival entry?')) {
        await db.deleteWorksheet(id);
        this.loadSavedEntries(container);
      }
    };
  }
};
