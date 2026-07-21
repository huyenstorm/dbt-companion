/* ABC PLEASE Worksheets: Values to Actions (WS 11), Build Mastery & Cope Ahead (WS 12), PLEASE Skills Log (WS 14) */
import { db } from '../db.js';
import { Exports } from '../exports.js';

export const AbcPleaseModule = {
  render(container) {
    container.innerHTML = `
      <div class="card">
        <div class="card-header">
          <div>
            <h2 class="card-title">
              <span class="badge badge-purple">Emotion Regulation</span>
              Vulnerability & Action Worksheets
            </h2>
            <p class="card-subtitle">Values to Actions (WS 11), Build Mastery & Cope Ahead (WS 12), and Practicing PLEASE Skills (WS 14).</p>
          </div>
        </div>

        <div class="nav-tabs" style="background: transparent; border-bottom: 1px solid var(--border-color); margin-bottom: 1.25rem;">
          <button class="tab-btn active" data-subtab="tab-v2a">🎯 Values to Actions (WS 11)</button>
          <button class="tab-btn" data-subtab="tab-mastery-cope">🏆 Mastery & Cope Ahead (WS 12)</button>
          <button class="tab-btn" data-subtab="tab-please-ws14">🏥 PLEASE Skills Log (WS 14)</button>
        </div>

        <!-- 1. Values to Actions (Worksheet 11) -->
        <div class="subtab-content active" id="tab-v2a">
          <form id="v2a-form">
            <div class="grid-2" style="background: var(--bg-secondary); padding: 0.75rem; border-radius: var(--radius-md); border: 1px solid var(--border-color); margin-bottom: 1rem;">
              <div>
                <label class="form-label">Step 1: Rate Avoidance (0 = none, 100 = completely avoided)</label>
                <div class="grid-2">
                  <input type="number" min="0" max="100" class="form-control" id="v2a-avoid-past" placeholder="In the past (e.g. 80)">
                  <input type="number" min="0" max="100" class="form-control" id="v2a-avoid-now" placeholder="Now (e.g. 30)">
                </div>
              </div>
              <div>
                <label class="form-label">Check reasons for avoiding:</label>
                <div style="font-size: 0.8rem; display: flex; flex-direction: column; gap: 0.2rem;">
                  <label><input type="checkbox" class="avoid-reason" value="Hopelessness"> Hopelessness</label>
                  <label><input type="checkbox" class="avoid-reason" value="Willfulness"> Willfulness</label>
                  <label><input type="checkbox" class="avoid-reason" value="Too hard"> Too hard</label>
                </div>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">Cope-Ahead Plan to avoid avoiding:</label>
              <input type="text" class="form-control" id="v2a-avoid-plan" placeholder="What is your plan for getting yourself to avoid avoiding?">
            </div>

            <div class="grid-2">
              <div class="form-group">
                <label class="form-label">Step 2 & 3: Important Life Value to Work on Now</label>
                <input type="text" class="form-control" id="v2a-value" placeholder="e.g. Health/Endurance or Family connection..." required>
              </div>
              <div class="form-group">
                <label class="form-label">Value Importance & Priority (1 to 5)</label>
                <div class="grid-2">
                  <input type="number" min="1" max="5" class="form-control" id="v2a-importance" placeholder="Importance (1-5)">
                  <input type="number" min="1" max="5" class="form-control" id="v2a-priority" placeholder="Priority (1-5)">
                </div>
              </div>
            </div>

            <div class="grid-2">
              <div class="form-group">
                <label class="form-label">Step 4: Goals Related to This Value</label>
                <textarea class="form-control" id="v2a-goals" placeholder="Goal 1: Complete long run on Saturday.\nGoal 2: Eat meals with kids without devices..."></textarea>
              </div>
              <div class="form-group">
                <label class="form-label">Step 5: Choose ONE Goal to Work on Now</label>
                <input type="text" class="form-control" id="v2a-goal-active" placeholder="Goal to work on:">
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">Step 6: Small Action Steps (Subgoals broken down to bypass ADHD freeze)</label>
              <div class="grid-2" style="gap: 0.5rem;">
                <input type="text" class="form-control" id="v2a-step1" placeholder="Action Step 1">
                <input type="text" class="form-control" id="v2a-step2" placeholder="Action Step 2">
                <input type="text" class="form-control" id="v2a-step3" placeholder="Action Step 3">
                <input type="text" class="form-control" id="v2a-step4" placeholder="Action Step 4">
              </div>
            </div>

            <div class="grid-2">
              <div class="form-group">
                <label class="form-label">Step 7: Action Step Taken (Describe what you did)</label>
                <textarea class="form-control" id="v2a-taken" placeholder="I completed Action Step 1 and 2..."></textarea>
              </div>
              <div class="form-group">
                <label class="form-label">What happened next? (Results/Consequences)</label>
                <textarea class="form-control" id="v2a-outcome" placeholder="I ended up going on the run and felt my anxiety level drop."></textarea>
              </div>
            </div>

            <div style="display: flex; gap: 0.5rem; justify-content: flex-end;">
              <button type="button" class="btn btn-secondary" id="btn-copy-v2a">📋 Copy Worksheet</button>
              <button type="submit" class="btn btn-primary">💾 Save Worksheet 11</button>
            </div>
          </form>
        </div>

        <!-- 2. Build Mastery & Cope Ahead (Worksheet 12) -->
        <div class="subtab-content" id="tab-mastery-cope" style="display: none;">
          <form id="mastery-ws12-form">
            <h3 style="font-size: 1rem; color: var(--accent-purple); margin-bottom: 0.5rem;">Build Mastery Weekly Tracker:</h3>
            <p style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 0.75rem;">Plan and write down activities actually performed for building mastery:</p>
            
            <div style="overflow-x: auto; margin-bottom: 1.5rem;">
              <table style="width: 100%; border-collapse: collapse; font-size: 0.8rem; min-width: 500px;">
                <thead>
                  <tr style="border-bottom: 2px solid var(--border-color); text-align: left;">
                    <th style="padding: 0.5rem;">Day</th>
                    <th style="padding: 0.5rem; width: 45%;">Activities Planned for Mastery</th>
                    <th style="padding: 0.5rem; width: 45%;">Activities Actually Done for Mastery</th>
                  </tr>
                </thead>
                <tbody>
                  ${['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => `
                    <tr style="border-bottom: 1px solid var(--border-color);">
                      <td style="padding: 0.5rem; font-weight: 700; color: var(--text-secondary);">${day}</td>
                      <td style="padding: 0.35rem;"><input type="text" class="form-control mas-plan" data-day="${day}" style="padding: 0.4rem; font-size: 0.8rem;" placeholder="Planned..."></td>
                      <td style="padding: 0.35rem;"><input type="text" class="form-control mas-done" data-day="${day}" style="padding: 0.4rem; font-size: 0.8rem;" placeholder="Completed..."></td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>

            <h3 style="font-size: 1rem; color: var(--accent-purple); margin-top: 1.25rem; margin-bottom: 0.5rem;">Cope Ahead Plan (Describe two future problem situations):</h3>
            
            <div class="grid-2">
              <!-- Situation 1 -->
              <div style="background: var(--bg-secondary); padding: 0.85rem; border-radius: var(--radius-md); border: 1px solid var(--border-color);">
                <h4 style="font-size: 0.85rem; color: var(--accent-blue); margin-bottom: 0.5rem;">Problem Situation 1</h4>
                <div class="form-group">
                  <label class="form-label">Describe future situation:</label>
                  <textarea class="form-control" id="cope-sit1" style="min-height: 60px;" placeholder="e.g. Next week's sprint review presentation..."></textarea>
                </div>
                <div class="form-group">
                  <label class="form-label">How I imagined coping effectively:</label>
                  <textarea class="form-control" id="cope-desc1" style="min-height: 80px;" placeholder="Describe coping actions & mental rehearsal steps..."></textarea>
                </div>
                <label style="font-size: 0.8rem; display: flex; align-items: center; gap: 0.4rem;">
                  <input type="checkbox" id="cope-help1"> Was this coping rehearsal helpful?
                </label>
              </div>

              <!-- Situation 2 -->
              <div style="background: var(--bg-secondary); padding: 0.85rem; border-radius: var(--radius-md); border: 1px solid var(--border-color);">
                <h4 style="font-size: 0.85rem; color: var(--accent-blue); margin-bottom: 0.5rem;">Problem Situation 2</h4>
                <div class="form-group">
                  <label class="form-label">Describe future situation:</label>
                  <textarea class="form-control" id="cope-sit2" style="min-height: 60px;" placeholder="e.g. Tough conversation with family members..."></textarea>
                </div>
                <div class="form-group">
                  <label class="form-label">How I imagined coping effectively:</label>
                  <textarea class="form-control" id="cope-desc2" style="min-height: 80px;" placeholder="Describe coping actions & mental rehearsal steps..."></textarea>
                </div>
                <label style="font-size: 0.8rem; display: flex; align-items: center; gap: 0.4rem;">
                  <input type="checkbox" id="cope-help2"> Was this coping rehearsal helpful?
                </label>
              </div>
            </div>

            <div style="display: flex; gap: 0.5rem; justify-content: flex-end; margin-top: 1.25rem;">
              <button type="button" class="btn btn-secondary" id="btn-copy-mas">📋 Copy Worksheet</button>
              <button type="submit" class="btn btn-primary">💾 Save Worksheet 12</button>
            </div>
          </form>
        </div>

        <!-- 3. PLEASE Skills Log (Worksheet 14) -->
        <div class="subtab-content" id="tab-please-ws14" style="display: none;">
          <form id="please-ws14-form">
            <h3 style="font-size: 1rem; color: var(--accent-purple); margin-bottom: 0.5rem;">Weekly PLEASE Skills Logger:</h3>
            <p style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 0.75rem;">Describe what you did to practice each PLEASE skill. Check "H" if helpful:</p>

            <div style="overflow-x: auto;">
              <table style="width: 100%; border-collapse: collapse; font-size: 0.75rem; min-width: 750px;">
                <thead>
                  <tr style="border-bottom: 2px solid var(--border-color); text-align: left; background: var(--bg-secondary);">
                    <th style="padding: 0.4rem; width: 60px;">Day</th>
                    <th style="padding: 0.4rem; min-width: 120px;">PL - Treat Physical Illness</th>
                    <th style="padding: 0.4rem; min-width: 120px;">E - Eating Balanced</th>
                    <th style="padding: 0.4rem; min-width: 120px;">A - Substance Limits</th>
                    <th style="padding: 0.4rem; min-width: 100px;">S - Sleep (Hours)</th>
                    <th style="padding: 0.4rem; min-width: 120px;">E - Exercise/Workout</th>
                  </tr>
                </thead>
                <tbody>
                  ${['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => `
                    <tr style="border-bottom: 1px solid var(--border-color);">
                      <td style="padding: 0.4rem; font-weight: 700; color: var(--text-secondary);">${day}</td>
                      <td style="padding: 0.25rem;">
                        <input type="text" class="form-control pl-ill" data-day="${day}" style="padding: 0.35rem; font-size: 0.75rem; margin-bottom: 0.25rem;" placeholder="Physical illness...">
                        <label style="font-size:0.7rem;"><input type="checkbox" class="pl-ill-h" data-day="${day}"> Helpful?</label>
                      </td>
                      <td style="padding: 0.25rem;">
                        <input type="text" class="form-control pl-eat" data-day="${day}" style="padding: 0.35rem; font-size: 0.75rem; margin-bottom: 0.25rem;" placeholder="Eating habits...">
                        <label style="font-size:0.7rem;"><input type="checkbox" class="pl-eat-h" data-day="${day}"> Helpful?</label>
                      </td>
                      <td style="padding: 0.25rem;">
                        <input type="text" class="form-control pl-sub" data-day="${day}" style="padding: 0.35rem; font-size: 0.75rem; margin-bottom: 0.25rem;" placeholder="Substances/caffeine...">
                        <label style="font-size:0.7rem;"><input type="checkbox" class="pl-sub-h" data-day="${day}"> Helpful?</label>
                      </td>
                      <td style="padding: 0.25rem;">
                        <input type="text" class="form-control pl-slp" data-day="${day}" style="padding: 0.35rem; font-size: 0.75rem; margin-bottom: 0.25rem;" placeholder="e.g. 7.5 hrs sleep">
                        <label style="font-size:0.7rem;"><input type="checkbox" class="pl-slp-h" data-day="${day}"> Helpful?</label>
                      </td>
                      <td style="padding: 0.25rem;">
                        <input type="text" class="form-control pl-exe" data-day="${day}" style="padding: 0.35rem; font-size: 0.75rem; margin-bottom: 0.25rem;" placeholder="Triathlon training...">
                        <label style="font-size:0.7rem;"><input type="checkbox" class="pl-exe-h" data-day="${day}"> Helpful?</label>
                      </td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>

            <div style="display: flex; gap: 0.5rem; justify-content: flex-end; margin-top: 1.25rem;">
              <button type="button" class="btn btn-secondary" id="btn-copy-pl">📋 Copy Log</button>
              <button type="submit" class="btn btn-primary">💾 Save PLEASE Log WS 14</button>
            </div>
          </form>
        </div>
      </div>

      <div class="card">
        <h3 class="card-title" style="margin-bottom: 1rem;">Saved Regulate & PLEASE Logs</h3>
        <div id="abc-saved-list">
          <p style="color: var(--text-muted); font-size: 0.9rem;">No saved entries yet.</p>
        </div>
      </div>
    `;

    this.attachEvents(container);
    this.loadSavedEntries(container);
  },

  attachEvents(container) {
    const tabs = container.querySelectorAll('.tab-btn');
    const contents = container.querySelectorAll('.subtab-content');

    tabs.forEach(t => {
      t.addEventListener('click', () => {
        tabs.forEach(x => x.classList.remove('active'));
        contents.forEach(x => x.style.display = 'none');
        t.classList.add('active');
        const target = container.querySelector('#' + t.dataset.subtab);
        if (target) target.style.display = 'block';
      });
    });

    // 1. Values to Actions Form
    const v2aForm = container.querySelector('#v2a-form');
    v2aForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const data = this.getV2AFormData(container);
      await db.saveWorksheet({ type: 'values_to_actions_ws11', title: `Value WS11: ${data.Value}`, data });
      alert('Values to Actions Worksheet 11 saved!');
      v2aForm.reset();
      this.loadSavedEntries(container);
    });

    container.querySelector('#btn-copy-v2a').addEventListener('click', () => {
      const data = this.getV2AFormData(container);
      Exports.copyForPortal('Values to Action Homework', new Date(), data);
    });

    // 2. Build Mastery & Cope Ahead (WS 12)
    const masteryForm = container.querySelector('#mastery-ws12-form');
    masteryForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const data = this.getMasteryFormData(container);
      await db.saveWorksheet({ type: 'mastery_ws12', title: `Mastery & Cope WS12: ${new Date().toLocaleDateString()}`, data });
      alert('Build Mastery & Cope Ahead Worksheet 12 saved!');
      masteryForm.reset();
      this.loadSavedEntries(container);
    });

    container.querySelector('#btn-copy-mas').addEventListener('click', () => {
      const data = this.getMasteryFormData(container);
      Exports.copyForPortal('Build Mastery & Cope Ahead (WS12)', new Date(), data);
    });

    // 3. PLEASE WS 14 Form
    const pleaseForm = container.querySelector('#please-ws14-form');
    pleaseForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const data = this.getPLEASE14FormData(container);
      await db.saveWorksheet({ type: 'please_ws14', title: `PLEASE Log WS14: ${new Date().toLocaleDateString()}`, data });
      alert('PLEASE Skills Log Worksheet 14 saved!');
      pleaseForm.reset();
      this.loadSavedEntries(container);
    });

    container.querySelector('#btn-copy-pl').addEventListener('click', () => {
      const data = this.getPLEASE14FormData(container);
      Exports.copyForPortal('PLEASE Skills Homework (WS14)', new Date(), data);
    });
  },

  getV2AFormData(container) {
    const reasons = Array.from(container.querySelectorAll('.avoid-reason:checked')).map(c => c.value);
    return {
      'Avoidance Rating': `Past: ${container.querySelector('#v2a-avoid-past').value || 0}/100 | Now: ${container.querySelector('#v2a-avoid-now').value || 0}/100`,
      'Avoidance Reasons': reasons.join(', ') || 'None checked',
      'Cope Ahead Avoidance Plan': container.querySelector('#v2a-avoid-plan').value,
      'Value': container.querySelector('#v2a-value').value,
      'Importance/Priority': `Importance: ${container.querySelector('#v2a-importance').value || 0}/5 | Priority: ${container.querySelector('#v2a-priority').value || 0}/5`,
      'Goals list': container.querySelector('#v2a-goals').value,
      'Active Goal': container.querySelector('#v2a-goal-active').value,
      'Action Steps': `Step 1: ${container.querySelector('#v2a-step1').value}\nStep 2: ${container.querySelector('#v2a-step2').value}\nStep 3: ${container.querySelector('#v2a-step3').value}\nStep 4: ${container.querySelector('#v2a-step4').value}`,
      'Step Taken': container.querySelector('#v2a-taken').value,
      'Result/Outcome': container.querySelector('#v2a-outcome').value
    };
  },

  getMasteryFormData(container) {
    const dayPlans = {};
    const dayDones = {};
    ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].forEach(day => {
      dayPlans[day] = container.querySelector(`.mas-plan[data-day="${day}"]`).value;
      dayDones[day] = container.querySelector(`.mas-done[data-day="${day}"]`).value;
    });

    return {
      'Weekly Mastery Plan': Object.keys(dayPlans).map(d => `${d} Plan: ${dayPlans[d]} | Done: ${dayDones[d]}`).join('\n'),
      'Situation 1': container.querySelector('#cope-sit1').value,
      'Coping Rehearsal 1': container.querySelector('#cope-desc1').value,
      'Rehearsal 1 Helpful': container.querySelector('#cope-help1').checked ? 'YES' : 'NO',
      'Situation 2': container.querySelector('#cope-sit2').value,
      'Coping Rehearsal 2': container.querySelector('#cope-desc2').value,
      'Rehearsal 2 Helpful': container.querySelector('#cope-help2').checked ? 'YES' : 'NO'
    };
  },

  getPLEASE14FormData(container) {
    const log = {};
    ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].forEach(day => {
      log[day] = {
        'Illness': container.querySelector(`.pl-ill[data-day="${day}"]`).value,
        'Illness_Helpful': container.querySelector(`.pl-ill-h[data-day="${day}"]`).checked ? 'YES' : 'NO',
        'Eating': container.querySelector(`.pl-eat[data-day="${day}"]`).value,
        'Eating_Helpful': container.querySelector(`.pl-eat-h[data-day="${day}"]`).checked ? 'YES' : 'NO',
        'Substances': container.querySelector(`.pl-sub[data-day="${day}"]`).value,
        'Substances_Helpful': container.querySelector(`.pl-sub-h[data-day="${day}"]`).checked ? 'YES' : 'NO',
        'Sleep': container.querySelector(`.pl-slp[data-day="${day}"]`).value,
        'Sleep_Helpful': container.querySelector(`.pl-slp-h[data-day="${day}"]`).checked ? 'YES' : 'NO',
        'Exercise': container.querySelector(`.pl-exe[data-day="${day}"]`).value,
        'Exercise_Helpful': container.querySelector(`.pl-exe-h[data-day="${day}"]`).checked ? 'YES' : 'NO'
      };
    });

    const lines = [];
    Object.keys(log).forEach(day => {
      const item = log[day];
      lines.push(`${day}: PL: ${item.Illness} (H: ${item.Illness_Helpful}) | E: ${item.Eating} (H: ${item.Eating_Helpful}) | A: ${item.Substances} (H: ${item.Substances_Helpful}) | S: ${item.Sleep} (H: ${item.Sleep_Helpful}) | Ex: ${item.Exercise} (H: ${item.Exercise_Helpful})`);
    });

    return {
      'Weekly PLEASE Log': lines.join('\n')
    };
  },

  async loadSavedEntries(container) {
    const listContainer = container.querySelector('#abc-saved-list');
    const entries = await db.getWorksheets();
    
    // Filter to Emotion Regulation vulnerability worksheets
    const erTypes = ['values_to_actions_ws11', 'mastery_ws12', 'please_ws14'];
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
          <button class="btn btn-secondary" style="padding: 0.3rem 0.6rem; font-size: 0.75rem;" onclick="window.copySavedABC('${item.id}')">📋 Copy</button>
          <button class="btn btn-secondary" style="padding: 0.3rem 0.6rem; font-size: 0.75rem;" onclick="window.printSavedABC('${item.id}')">🖨️ Print</button>
          <button class="btn btn-danger" style="padding: 0.3rem 0.6rem; font-size: 0.75rem;" onclick="window.deleteABC('${item.id}')">🗑️</button>
        </div>
      </div>
    `).join('');

    window.copySavedABC = (id) => {
      const item = erEntries.find(x => x.id === id);
      if (item) Exports.copyForPortal(item.title, item.createdAt, item.data);
    };

    window.printSavedABC = (id) => {
      const item = entries.find(x => x.id === id);
      if (item) Exports.printWorksheet(item.title, item.createdAt, item.data);
    };

    window.deleteABC = async (id) => {
      if (confirm('Delete this worksheet entry?')) {
        await db.deleteWorksheet(id);
        this.loadSavedEntries(container);
      }
    };
  }
};
