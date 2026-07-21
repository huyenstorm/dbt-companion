/* ABC PLEASE Worksheets & Vulnerability Tracker */
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
              ABC PLEASE Worksheets
            </h2>
            <p class="card-subtitle">Accumulate positive experiences, build mastery, cope ahead, and reduce physical vulnerability.</p>
          </div>
        </div>

        <div class="nav-tabs" style="background: transparent; border-bottom: 1px solid var(--border-color); margin-bottom: 1.25rem;">
          <button class="tab-btn active" data-subtab="tab-a">A - Accumulate Positives</button>
          <button class="tab-btn" data-subtab="tab-b">B - Build Mastery</button>
          <button class="tab-btn" data-subtab="tab-c">C - Cope Ahead</button>
          <button class="tab-btn" data-subtab="tab-please">PLEASE Log</button>
        </div>

        <!-- Tab A -->
        <div class="subtab-content active" id="tab-a">
          <form id="abc-a-form">
            <div class="form-group">
              <label class="form-label">Short-Term Positive Experience Completed Today</label>
              <input type="text" class="form-control" id="abc-a-short" placeholder="e.g. 20-min quiet coffee, listening to podcast during triathlon recovery..." required>
            </div>
            <div class="form-group">
              <label class="form-label">Long-Term Value / Goal Alignment</label>
              <textarea class="form-control" id="abc-a-long" placeholder="How does this connect to your core life values (family, health, athletic endurance, career)?"></textarea>
            </div>
            <button type="submit" class="btn btn-primary">💾 Save Accumulate Positives</button>
          </form>
        </div>

        <!-- Tab B -->
        <div class="subtab-content" id="tab-b" style="display: none;">
          <form id="abc-b-form">
            <div class="form-group">
              <label class="form-label">Mastery Activity (Something difficult but doable)</label>
              <input type="text" class="form-control" id="abc-b-activity" placeholder="e.g. Completed tough triathlon brick workout, finished complex software doc..." required>
            </div>
            <div class="form-group">
              <label class="form-label">Sense of Accomplishment (1 to 10)</label>
              <input type="number" min="1" max="10" class="form-control" id="abc-b-score" placeholder="e.g. 8">
            </div>
            <button type="submit" class="btn btn-primary">💾 Save Mastery Entry</button>
          </form>
        </div>

        <!-- Tab C -->
        <div class="subtab-content" id="tab-c" style="display: none;">
          <form id="abc-c-form">
            <div class="form-group">
              <label class="form-label">High-Stress Future Event / Trigger</label>
              <input type="text" class="form-control" id="abc-c-event" placeholder="e.g. High-stakes work presentation, intense family gathering..." required>
            </div>
            <div class="form-group">
              <label class="form-label">Coping Ahead Plan (Mental rehearsal of DBT skills)</label>
              <textarea class="form-control" id="abc-c-plan" placeholder="Step 1: Notice early body signs. Step 2: Use Paced Breathing. Step 3: Use DEAR MAN script..."></textarea>
            </div>
            <button type="submit" class="btn btn-primary">💾 Save Cope Ahead Plan</button>
          </form>
        </div>

        <!-- PLEASE Log -->
        <div class="subtab-content" id="tab-please" style="display: none;">
          <form id="abc-please-form">
            <div class="grid-2">
              <div class="form-group">
                <label class="form-label">PL - Physical Illness / Pain Care</label>
                <input type="text" class="form-control" id="pl-illness" placeholder="Taking meds, physical therapy for training...">
              </div>
              <div class="form-group">
                <label class="form-label">E - Eating (Balanced nutrition & hydration)</label>
                <input type="text" class="form-control" id="pl-eating" placeholder="Fueling properly for workouts & day...">
              </div>
            </div>
            <div class="grid-3">
              <div class="form-group">
                <label class="form-label">A - Avoid Mood-Altering Substances</label>
                <input type="text" class="form-control" id="pl-avoid" placeholder="Alcohol, excessive caffeine limit...">
              </div>
              <div class="form-group">
                <label class="form-label">S - Sleep (Hours & quality)</label>
                <input type="text" class="form-control" id="pl-sleep" placeholder="e.g. 7.5 hrs solid sleep...">
              </div>
              <div class="form-group">
                <label class="form-label">E - Exercise (Ironman training / movement)</label>
                <input type="text" class="form-control" id="pl-exercise" placeholder="e.g. 1hr swim/bike session...">
              </div>
            </div>
            <button type="submit" class="btn btn-primary">💾 Save PLEASE Health Log</button>
          </form>
        </div>
      </div>
    `;

    this.attachEvents(container);
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

    container.querySelector('#abc-a-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      const data = {
        'Positive Experience': container.querySelector('#abc-a-short').value,
        'Value Alignment': container.querySelector('#abc-a-long').value
      };
      await db.saveWorksheet({ type: 'abc_positives', title: `Accumulate Positives: ${data['Positive Experience']}`, data });
      alert('Positive experience saved!');
    });

    container.querySelector('#abc-please-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      const data = {
        'Physical Illness': container.querySelector('#pl-illness').value,
        'Eating': container.querySelector('#pl-eating').value,
        'Avoid Substances': container.querySelector('#pl-avoid').value,
        'Sleep': container.querySelector('#pl-sleep').value,
        'Exercise': container.querySelector('#pl-exercise').value
      };
      await db.saveWorksheet({ type: 'please_log', title: `PLEASE Log: ${new Date().toLocaleDateString()}`, data });
      alert('PLEASE Health Log saved!');
    });
  }
};
