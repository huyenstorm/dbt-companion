/* Daily & Weekly DBT Diary Card Matrix */
import { db } from '../db.js';
import { Exports } from '../exports.js';

export const DiaryCardModule = {
  // Local active trackers lists
  state: {
    editMode: false,
    emotions: ['Anger', 'Annoyance/Irritation', 'Sadness', 'Anxiety', 'Joy', 'Pride'],
    behaviors: ['Urge to Isolate / Shutdown', 'Urge to Self-Harm', 'Urge to Binge/Purge', 'Physical Training Fatigue'],
    skills: ['Wise Mind', 'Mindfulness of Emotion', 'TIPP Skill', 'STOP Skill', 'Check the Facts', 'Opposite Action', 'DEAR MAN', 'Validation', 'PLEASE Protocol'],
    habits: ['Negative Self-Talk', 'Drink 8 Cups Water', 'Stretch/Exercise']
  },

  loadSettings() {
    const emKey = 'dc_emotions_list';
    const behKey = 'dc_behaviors_list';
    const skKey = 'dc_skills_list';
    const habKey = 'dc_habits_list';

    if (localStorage.getItem(emKey)) this.state.emotions = JSON.parse(localStorage.getItem(emKey));
    else localStorage.setItem(emKey, JSON.stringify(this.state.emotions));

    if (localStorage.getItem(behKey)) this.state.behaviors = JSON.parse(localStorage.getItem(behKey));
    else localStorage.setItem(behKey, JSON.stringify(this.state.behaviors));

    if (localStorage.getItem(skKey)) this.state.skills = JSON.parse(localStorage.getItem(skKey));
    else localStorage.setItem(skKey, JSON.stringify(this.state.skills));

    if (localStorage.getItem(habKey)) this.state.habits = JSON.parse(localStorage.getItem(habKey));
    else localStorage.setItem(habKey, JSON.stringify(this.state.habits));
  },

  saveSettings() {
    localStorage.setItem('dc_emotions_list', JSON.stringify(this.state.emotions));
    localStorage.setItem('dc_behaviors_list', JSON.stringify(this.state.behaviors));
    localStorage.setItem('dc_skills_list', JSON.stringify(this.state.skills));
    localStorage.setItem('dc_habits_list', JSON.stringify(this.state.habits));
  },

  render(container) {
    this.loadSettings();

    let html = `
      <div class="card" id="diary-card-container">
        <div class="card-header" style="margin-bottom: 1.25rem;">
          <div style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
            <div>
              <h2 class="card-title">
                <span class="badge badge-purple">Daily & Weekly</span>
                DBT Diary Card
              </h2>
              <p class="card-subtitle">Track daily emotion intensity, target behavior urges, skills used, and habit counters.</p>
            </div>
            <div style="display: flex; gap: 0.5rem; align-items: center;">
              <button type="button" class="btn btn-secondary btn-back-dashboard" style="padding: 0.4rem 0.8rem; font-size: 0.8rem;">
                ⬅️ Back to Dashboard
              </button>
              <button type="button" class="btn btn-secondary" id="btn-dc-toggle-edit" style="padding: 0.4rem 0.8rem; font-size: 0.8rem;">
                ${this.state.editMode ? '💾 Done Editing' : '⚙️ Edit Layout'}
              </button>
            </div>
          </div>
        </div>
    `;

    if (this.state.editMode) {
      // --- Layout Configuration View ---
      html += `
        <div style="background: rgba(192, 132, 252, 0.05); border: 1.5px solid var(--accent-purple); padding: 1.25rem; border-radius: var(--radius-lg); margin-bottom: 1rem;">
          <h3 style="font-size: 1rem; font-weight: 700; color: var(--accent-purple); margin-bottom: 0.3rem;">Layout Customization Mode</h3>
          <p style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 1.25rem;">Add new trackers or click the red '×' to remove any existing items. Changes will apply to future entries only.</p>
          
          <div class="grid-2" style="gap: 1.25rem; margin-bottom: 1rem;">
            <!-- Emotions Config -->
            <div style="background: var(--bg-card); padding: 0.85rem; border-radius: var(--radius-md); border: 1px solid var(--border-color);">
              <h4 style="font-size: 0.85rem; color: var(--accent-purple); margin-bottom: 0.5rem; font-weight: 700;">Individual Emotions</h4>
              <div style="display: flex; flex-wrap: wrap; gap: 0.35rem; margin-bottom: 0.75rem;">
                ${this.state.emotions.map(e => `
                  <span style="background: var(--bg-secondary); border: 1px solid var(--border-color); padding: 0.2rem 0.4rem; border-radius: var(--radius-sm); font-size: 0.75rem; display: flex; align-items: center; gap: 0.3rem; color: var(--text-secondary);">
                    ${e} <span class="btn-remove-tracker" data-type="emotions" data-val="${e}" style="cursor: pointer; color: var(--accent-rose); font-weight: bold;">&times;</span>
                  </span>
                `).join('') || '<span style="font-size: 0.75rem; color: var(--text-muted);">None configured</span>'}
              </div>
              <div style="display: flex; gap: 0.4rem;">
                <input type="text" id="add-emo-input" class="form-control" placeholder="Add emotion..." style="padding: 0.3rem 0.5rem; font-size: 0.8rem; height: auto;">
                <button type="button" class="btn btn-primary" id="btn-add-emo" style="padding: 0.3rem 0.6rem; font-size: 0.8rem; height: auto;">+</button>
              </div>
            </div>

            <!-- Behaviors Config -->
            <div style="background: var(--bg-card); padding: 0.85rem; border-radius: var(--radius-md); border: 1px solid var(--border-color);">
              <h4 style="font-size: 0.85rem; color: var(--accent-rose); margin-bottom: 0.5rem; font-weight: 700;">Target Behaviors</h4>
              <div style="display: flex; flex-wrap: wrap; gap: 0.35rem; margin-bottom: 0.75rem;">
                ${this.state.behaviors.map(b => `
                  <span style="background: var(--bg-secondary); border: 1px solid var(--border-color); padding: 0.2rem 0.4rem; border-radius: var(--radius-sm); font-size: 0.75rem; display: flex; align-items: center; gap: 0.3rem; color: var(--text-secondary);">
                    ${b} <span class="btn-remove-tracker" data-type="behaviors" data-val="${b}" style="cursor: pointer; color: var(--accent-rose); font-weight: bold;">&times;</span>
                  </span>
                `).join('') || '<span style="font-size: 0.75rem; color: var(--text-muted);">None configured</span>'}
              </div>
              <div style="display: flex; gap: 0.4rem;">
                <input type="text" id="add-beh-input" class="form-control" placeholder="Add behavior..." style="padding: 0.3rem 0.5rem; font-size: 0.8rem; height: auto;">
                <button type="button" class="btn btn-primary" id="btn-add-beh" style="padding: 0.3rem 0.6rem; font-size: 0.8rem; height: auto;">+</button>
              </div>
            </div>
          </div>

          <div class="grid-2" style="gap: 1.25rem;">
            <!-- Skills Config -->
            <div style="background: var(--bg-card); padding: 0.85rem; border-radius: var(--radius-md); border: 1px solid var(--border-color);">
              <h4 style="font-size: 0.85rem; color: var(--accent-teal); margin-bottom: 0.5rem; font-weight: 700;">DBT Skills Used</h4>
              <div style="display: flex; flex-wrap: wrap; gap: 0.35rem; margin-bottom: 0.75rem;">
                ${this.state.skills.map(s => `
                  <span style="background: var(--bg-secondary); border: 1px solid var(--border-color); padding: 0.2rem 0.4rem; border-radius: var(--radius-sm); font-size: 0.75rem; display: flex; align-items: center; gap: 0.3rem; color: var(--text-secondary);">
                    ${s} <span class="btn-remove-tracker" data-type="skills" data-val="${s}" style="cursor: pointer; color: var(--accent-rose); font-weight: bold;">&times;</span>
                  </span>
                `).join('') || '<span style="font-size: 0.75rem; color: var(--text-muted);">None configured</span>'}
              </div>
              <div style="display: flex; gap: 0.4rem;">
                <input type="text" id="add-sk-input" class="form-control" placeholder="Add skill..." style="padding: 0.3rem 0.5rem; font-size: 0.8rem; height: auto;">
                <button type="button" class="btn btn-primary" id="btn-add-sk" style="padding: 0.3rem 0.6rem; font-size: 0.8rem; height: auto;">+</button>
              </div>
            </div>

            <!-- Habits Config -->
            <div style="background: var(--bg-card); padding: 0.85rem; border-radius: var(--radius-md); border: 1px solid var(--border-color);">
              <h4 style="font-size: 0.85rem; color: var(--accent-blue); margin-bottom: 0.5rem; font-weight: 700;">Habits & Counters</h4>
              <div style="display: flex; flex-wrap: wrap; gap: 0.35rem; margin-bottom: 0.75rem;">
                ${this.state.habits.map(h => `
                  <span style="background: var(--bg-secondary); border: 1px solid var(--border-color); padding: 0.2rem 0.4rem; border-radius: var(--radius-sm); font-size: 0.75rem; display: flex; align-items: center; gap: 0.3rem; color: var(--text-secondary);">
                    ${h} <span class="btn-remove-tracker" data-type="habits" data-val="${h}" style="cursor: pointer; color: var(--accent-rose); font-weight: bold;">&times;</span>
                  </span>
                `).join('') || '<span style="font-size: 0.75rem; color: var(--text-muted);">None configured</span>'}
              </div>
              <div style="display: flex; gap: 0.4rem;">
                <input type="text" id="add-hab-input" class="form-control" placeholder="Add habit..." style="padding: 0.3rem 0.5rem; font-size: 0.8rem; height: auto;">
                <button type="button" class="btn btn-primary" id="btn-add-hab" style="padding: 0.3rem 0.6rem; font-size: 0.8rem; height: auto;">+</button>
              </div>
            </div>
          </div>
        </div>
      `;
    } else {
      // --- Standard Form Entry View ---
      html += `
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

          <!-- Section 1: Individual Emotion Ratings -->
          <h4 style="color: var(--accent-purple); margin: 1.25rem 0 0.5rem 0; font-size: 0.9rem; border-bottom: 1px solid var(--border-color); padding-bottom: 0.25rem;">
            Individual Emotion Ratings (0 to 5)
          </h4>
          <div class="grid-3" style="gap: 0.75rem; margin-bottom: 1rem;">
            ${this.state.emotions.map(emo => `
              <div class="form-group" style="margin-bottom: 0;">
                <label class="form-label" style="font-size: 0.8rem; text-overflow: ellipsis; white-space: nowrap; overflow: hidden;" title="${emo}">${emo}</label>
                <input type="number" min="0" max="5" class="form-control dc-emotion-rating-input" data-emo="${emo}" value="0">
              </div>
            `).join('') || '<p style="font-size: 0.8rem; color: var(--text-muted); grid-column: span 3;">No emotions configured. Click Edit Layout above.</p>'}
          </div>

          <!-- Section 2: Target Behaviors & Urges -->
          <h4 style="color: var(--accent-rose); margin: 1.25rem 0 0.5rem 0; font-size: 0.9rem; border-bottom: 1px solid var(--border-color); padding-bottom: 0.25rem;">
            Target Behaviors & Urges (Rating 0 to 5)
          </h4>
          <div class="grid-3" style="gap: 0.75rem; margin-bottom: 1rem;">
            ${this.state.behaviors.map(beh => `
              <div class="form-group" style="margin-bottom: 0;">
                <label class="form-label" style="font-size: 0.8rem; text-overflow: ellipsis; white-space: nowrap; overflow: hidden;" title="${beh}">${beh}</label>
                <input type="number" min="0" max="5" class="form-control dc-behavior-rating-input" data-beh="${beh}" value="0">
              </div>
            `).join('') || '<p style="font-size: 0.8rem; color: var(--text-muted); grid-column: span 3;">No target behaviors configured. Click Edit Layout.</p>'}
          </div>

          <!-- Section 3: DBT Skills Used checkbox grid -->
          <h4 style="color: var(--accent-teal); margin: 1.25rem 0 0.5rem 0; font-size: 0.9rem; border-bottom: 1px solid var(--border-color); padding-bottom: 0.25rem;">
            DBT Skills Used Today (Check all that apply)
          </h4>
          <div class="grid-3" style="margin-bottom: 1.25rem; background: var(--bg-secondary); padding: 0.75rem 1rem; border-radius: var(--radius-md); border: 1px solid var(--border-color); gap: 0.5rem 1rem;">
            ${this.state.skills.map(skill => `
              <label style="font-size: 0.85rem; text-overflow: ellipsis; white-space: nowrap; overflow: hidden; display: flex; align-items: center; gap: 0.4rem;" title="${skill}">
                <input type="checkbox" class="dc-skill" value="${skill}"> ${skill}
              </label>
            `).join('') || '<p style="font-size: 0.8rem; color: var(--text-muted); grid-column: span 3; margin: 0;">No skills configured. Click Edit Layout.</p>'}
          </div>

          <!-- Section 4: Habit Builders & Breakers Counters -->
          <h4 style="color: var(--accent-blue); margin: 1.25rem 0 0.5rem 0; font-size: 0.9rem; border-bottom: 1px solid var(--border-color); padding-bottom: 0.25rem;">
            Habit Builders & Breakers Counters
          </h4>
          <div class="grid-3" style="gap: 0.75rem; margin-bottom: 1.25rem;">
            ${this.state.habits.map(hab => `
              <div style="background: var(--bg-secondary); border: 1px solid var(--border-color); padding: 0.6rem 0.8rem; border-radius: var(--radius-md); display: flex; align-items: center; justify-content: space-between; min-width: 0;">
                <span style="font-weight: 500; font-size: 0.8rem; text-overflow: ellipsis; white-space: nowrap; overflow: hidden; padding-right: 0.4rem;" title="${hab}">${hab}</span>
                <div style="display: flex; align-items: center; gap: 0.4rem; flex-shrink: 0;">
                  <button type="button" class="btn btn-secondary btn-counter-dn" data-habit="${hab}" style="padding: 0.15rem 0.4rem; min-height: unset; height: auto; font-size: 0.8rem; font-weight: bold;">-</button>
                  <span class="habit-count-display" data-habit="${hab}" style="font-weight: 700; min-width: 1.2rem; text-align: center; font-size: 0.85rem; color: var(--accent-blue);">0</span>
                  <button type="button" class="btn btn-secondary btn-counter-up" data-habit="${hab}" style="padding: 0.15rem 0.4rem; min-height: unset; height: auto; font-size: 0.8rem; font-weight: bold;">+</button>
                </div>
              </div>
            `).join('') || '<p style="font-size: 0.8rem; color: var(--text-muted); grid-column: span 3;">No habits configured. Click Edit Layout.</p>'}
          </div>

          <div class="form-group">
            <label class="form-label">Notes / Major Events Today</label>
            <textarea class="form-control" id="dc-notes" placeholder="Brief notes for therapy group..."></textarea>
          </div>

          <div style="display: flex; gap: 0.5rem; justify-content: flex-end;">
            <button type="button" class="btn btn-secondary btn-back-dashboard" style="margin-right: auto;">⬅️ Back to Dashboard</button>
            <button type="button" class="btn btn-secondary" id="btn-copy-dc">📋 Copy for Therapist</button>
            <button type="submit" class="btn btn-primary">💾 Save Diary Entry</button>
          </div>
        </form>
      `;
    }

    html += `
      </div>

      <div class="card">
        <h3 class="card-title">Saved Diary Cards</h3>
        <div id="dc-saved-list" style="margin-top: 0.75rem;">
          <p style="color: var(--text-muted); font-size: 0.85rem;">No saved diary entries yet.</p>
        </div>
      </div>
    `;

    container.innerHTML = html;
    this.attachEvents(container);
    this.loadSavedEntries(container);
  },

  attachEvents(container) {
    container.querySelectorAll('.btn-back-dashboard').forEach(btn => {
      btn.addEventListener('click', () => {
        const navBtn = document.getElementById('btn-dashboard-nav');
        if (navBtn) navBtn.click();
      });
    });

    const toggleEditBtn = container.querySelector('#btn-dc-toggle-edit');
    toggleEditBtn.addEventListener('click', () => {
      this.state.editMode = !this.state.editMode;
      this.render(container);
    });

    if (this.state.editMode) {
      // Bind Edit Mode Actions
      const bindAddTracker = (btnId, inputId, sectionKey) => {
        const btn = container.querySelector(btnId);
        const input = container.querySelector(inputId);
        if (!btn || !input) return;

        btn.addEventListener('click', () => {
          const val = input.value.trim();
          if (!val) return;
          if (this.state[sectionKey].includes(val)) {
            alert('Item already exists.');
            return;
          }
          this.state[sectionKey].push(val);
          this.saveSettings();
          this.render(container);
        });
      };

      bindAddTracker('#btn-add-emo', '#add-emo-input', 'emotions');
      bindAddTracker('#btn-add-beh', '#add-beh-input', 'behaviors');
      bindAddTracker('#btn-add-sk', '#add-sk-input', 'skills');
      bindAddTracker('#btn-add-hab', '#add-hab-input', 'habits');

      container.querySelectorAll('.btn-remove-tracker').forEach(el => {
        el.addEventListener('click', () => {
          const type = el.dataset.type;
          const val = el.dataset.val;
          this.state[type] = this.state[type].filter(x => x !== val);
          this.saveSettings();
          this.render(container);
        });
      });

    } else {
      // Bind Normal Mode Actions
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
        form.reset();
        this.render(container);
      });

      container.querySelector('#btn-copy-dc').addEventListener('click', () => {
        const fields = this.getFormData(container);
        Exports.copyForPortal('Daily DBT Diary Card', new Date(), fields);
      });

      // Bind Counter buttons
      container.querySelectorAll('.btn-counter-up').forEach(el => {
        el.addEventListener('click', () => {
          const hab = el.dataset.habit;
          const disp = container.querySelector(`.habit-count-display[data-habit="${hab}"]`);
          if (disp) {
            let val = parseInt(disp.innerText) || 0;
            disp.innerText = val + 1;
          }
        });
      });

      container.querySelectorAll('.btn-counter-dn').forEach(el => {
        el.addEventListener('click', () => {
          const hab = el.dataset.habit;
          const disp = container.querySelector(`.habit-count-display[data-habit="${hab}"]`);
          if (disp) {
            let val = parseInt(disp.innerText) || 0;
            if (val > 0) disp.innerText = val - 1;
          }
        });
      });
    }
  },

  getFormData(container) {
    const data = {
      'Date': container.querySelector('#dc-date').value,
      'Overall Emotion Rating': container.querySelector('#dc-emotion-rating').value + '/5',
      'Notes': container.querySelector('#dc-notes').value
    };

    // Dynamic Emotions
    this.state.emotions.forEach(emo => {
      const el = container.querySelector(`.dc-emotion-rating-input[data-emo="${emo}"]`);
      data[`Emotion: ${emo}`] = (el ? el.value : '0') + '/5';
    });

    // Dynamic Behaviors
    this.state.behaviors.forEach(beh => {
      const el = container.querySelector(`.dc-behavior-rating-input[data-beh="${beh}"]`);
      data[`Behavior Urge: ${beh}`] = (el ? el.value : '0') + '/5';
    });

    // Dynamic Skills checkboxes
    const checkedSkills = Array.from(container.querySelectorAll('.dc-skill:checked')).map(c => c.value);
    data['Skills Used'] = checkedSkills.join(', ') || 'None recorded';

    // Dynamic Habits
    this.state.habits.forEach(hab => {
      const countEl = container.querySelector(`.habit-count-display[data-habit="${hab}"]`);
      data[`Habit Counter: ${hab}`] = countEl ? countEl.innerText : '0';
    });

    return data;
  },

  async loadSavedEntries(container) {
    const listContainer = container.querySelector('#dc-saved-list');
    const entries = await db.getWorksheetsByType('diary_card');

    if (!entries.length) {
      listContainer.innerHTML = `<p style="color: var(--text-muted); font-size: 0.85rem;">No saved diary cards yet.</p>`;
      return;
    }

    listContainer.innerHTML = entries.map(item => `
      <div style="background: var(--bg-secondary); border: 1px solid var(--border-color); padding: 0.75rem 1.0rem; border-radius: var(--radius-md); margin-bottom: 0.5rem; display: flex; justify-content: space-between; align-items: center; font-size: 0.85rem;">
        <div>
          <strong style="color: var(--accent-teal);">${item.title}</strong>
          <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.15rem;">
            Emotion Rating: ${item.data['Overall Emotion Rating']} | Skills: ${item.data['Skills Used'] ? item.data['Skills Used'].substring(0, 45) + (item.data['Skills Used'].length > 45 ? '...' : '') : 'None'}
          </div>
        </div>
        <div style="display: flex; gap: 0.4rem;">
          <button class="btn btn-secondary" style="padding: 0.25rem 0.5rem; font-size: 0.75rem;" onclick="window.viewSavedDC('${item.id}')">👁️ View</button>
          <button class="btn btn-secondary" style="padding: 0.25rem 0.5rem; font-size: 0.75rem;" onclick="window.copySavedDC('${item.id}')">📋 Copy</button>
          <button class="btn btn-danger" style="padding: 0.25rem 0.5rem; font-size: 0.75rem;" onclick="window.deleteSavedDC('${item.id}')">🗑️</button>
        </div>
      </div>
    `).join('');

    window.viewSavedDC = (id) => {
      const item = entries.find(x => x.id === id);
      if (item) this.showDetailModal(item);
    };

    window.copySavedDC = (id) => {
      const item = entries.find(x => x.id === id);
      if (item) Exports.copyForPortal(item.title, item.createdAt, item.data);
    };

    window.deleteSavedDC = async (id) => {
      if (confirm('Delete this diary card entry?')) {
        await db.deleteWorksheet(id);
        this.loadSavedEntries(container);
      }
    };
  },

  showDetailModal(item) {
    let modal = document.getElementById('dc-detail-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'dc-detail-modal';
      modal.className = 'modal-overlay';
      document.body.appendChild(modal);
    }

    // Filter dynamic keys
    const emotions = Object.keys(item.data).filter(k => k.startsWith('Emotion: '));
    const behaviors = Object.keys(item.data).filter(k => k.startsWith('Behavior Urge: '));
    const habits = Object.keys(item.data).filter(k => k.startsWith('Habit Counter: '));

    modal.innerHTML = `
      <div class="modal-card" style="max-width: 500px; width: 100%;">
        <div class="modal-header">
          <h3 class="modal-title">Saved Diary Card Details</h3>
          <button class="modal-close" id="btn-close-dc-modal">&times;</button>
        </div>
        <div class="modal-body" style="display: flex; flex-direction: column; gap: 1rem; max-height: 65vh; overflow-y: auto; padding-right: 0.25rem;">
          <div style="display: flex; justify-content: space-between; border-bottom: 1.5px solid var(--border-color); padding-bottom: 0.5rem;">
            <strong>Date:</strong>
            <span style="font-weight: bold; color: var(--accent-purple);">${item.data['Date']}</span>
          </div>
          
          <div style="display: flex; justify-content: space-between; font-weight: 600; padding: 0.2rem 0;">
            <span>Overall Emotion Rating:</span>
            <span style="color: var(--accent-purple);">${item.data['Overall Emotion Rating']}</span>
          </div>

          <h4 style="font-size: 0.9rem; color: var(--accent-purple); border-bottom: 1px solid var(--border-color); padding-bottom: 0.2rem; margin-top: 0.5rem; font-weight: bold;">Emotions (0-5)</h4>
          <div style="display: flex; flex-direction: column; gap: 0.35rem;">
            ${emotions.map(k => `
              <div style="display: flex; justify-content: space-between; font-size: 0.85rem;">
                <span style="color: var(--text-secondary);">${k.replace('Emotion: ', '')}</span>
                <strong>${item.data[k]}</strong>
              </div>
            `).join('') || '<span style="font-size: 0.8rem; color: var(--text-muted);">None logged</span>'}
          </div>

          <h4 style="font-size: 0.9rem; color: var(--accent-rose); border-bottom: 1px solid var(--border-color); padding-bottom: 0.2rem; margin-top: 0.5rem; font-weight: bold;">Target Behaviors (0-5)</h4>
          <div style="display: flex; flex-direction: column; gap: 0.35rem;">
            ${behaviors.map(k => `
              <div style="display: flex; justify-content: space-between; font-size: 0.85rem;">
                <span style="color: var(--text-secondary);">${k.replace('Behavior Urge: ', '')}</span>
                <strong>${item.data[k]}</strong>
              </div>
            `).join('') || '<span style="font-size: 0.8rem; color: var(--text-muted);">None logged</span>'}
          </div>

          <h4 style="font-size: 0.9rem; color: var(--accent-teal); border-bottom: 1px solid var(--border-color); padding-bottom: 0.2rem; margin-top: 0.5rem; font-weight: bold;">DBT Skills Used</h4>
          <p style="font-size: 0.85rem; margin: 0; line-height: 1.4; color: var(--text-secondary);">
            ${item.data['Skills Used'] || 'None recorded'}
          </p>

          <h4 style="font-size: 0.9rem; color: var(--accent-blue); border-bottom: 1px solid var(--border-color); padding-bottom: 0.2rem; margin-top: 0.5rem; font-weight: bold;">Habits & Counters</h4>
          <div style="display: flex; flex-direction: column; gap: 0.35rem;">
            ${habits.map(k => `
              <div style="display: flex; justify-content: space-between; font-size: 0.85rem;">
                <span style="color: var(--text-secondary);">${k.replace('Habit Counter: ', '')}</span>
                <strong style="color: var(--accent-blue);">${item.data[k]}</strong>
              </div>
            `).join('') || '<span style="font-size: 0.8rem; color: var(--text-muted);">None logged</span>'}
          </div>

          <h4 style="font-size: 0.9rem; color: var(--text-muted); border-bottom: 1px solid var(--border-color); padding-bottom: 0.2rem; margin-top: 0.5rem; font-weight: bold;">Notes</h4>
          <p style="font-size: 0.85rem; margin: 0; line-height: 1.4; color: var(--text-secondary); font-style: italic;">
            ${item.data['Notes'] || 'No notes written.'}
          </p>
        </div>
        <div class="modal-footer" style="display: flex; gap: 0.5rem; justify-content: flex-end; margin-top: 1rem; border-top: 1px solid var(--border-color); padding-top: 0.75rem;">
          <button class="btn btn-secondary" id="btn-print-dc-modal">🖨️ Print</button>
          <button class="btn btn-primary" id="btn-copy-dc-modal">📋 Copy Data</button>
        </div>
      </div>
    `;

    modal.classList.add('active');

    // Attach local modal actions
    modal.querySelector('#btn-close-dc-modal').addEventListener('click', () => modal.classList.remove('active'));
    modal.querySelector('#btn-print-dc-modal').addEventListener('click', () => {
      Exports.printWorksheet(item.title, item.createdAt, item.data);
    });
    modal.querySelector('#btn-copy-dc-modal').addEventListener('click', () => {
      Exports.copyForPortal(item.title, item.createdAt, item.data);
      alert('Data copied for therapist!');
    });
  }
};
