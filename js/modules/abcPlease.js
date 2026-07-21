/* ABC PLEASE Worksheets & Values to Actions (Worksheet 11) */
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
              ABC PLEASE & Value Worksheets
            </h2>
            <p class="card-subtitle">Accumulate positives, build mastery, cope ahead, and bridge values to daily action steps.</p>
          </div>
        </div>

        <div class="nav-tabs" style="background: transparent; border-bottom: 1px solid var(--border-color); margin-bottom: 1.25rem;">
          <button class="tab-btn active" data-subtab="tab-a">A - Accumulate Positives</button>
          <button class="tab-btn" data-subtab="tab-v2a">Values to Actions (WS 11)</button>
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

        <!-- Values to Actions Worksheet 11 -->
        <div class="subtab-content" id="tab-v2a" style="display: none;">
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
                <input type="text" class="form-control" id="v2a-step1" placeholder="Action Step 1 (e.g. Put running shoes by door)">
                <input type="text" class="form-control" id="v2a-step2" placeholder="Action Step 2 (e.g. Set alarm for 6:00 AM)">
                <input type="text" class="form-control" id="v2a-step3" placeholder="Action Step 3 (e.g. Put on gear immediately)">
                <input type="text" class="form-control" id="v2a-step4" placeholder="Action Step 4 (e.g. Walk out door)">
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

    const v2aForm = container.querySelector('#v2a-form');
    v2aForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const data = this.getV2AFormData(container);
      await db.saveWorksheet({ type: 'values_to_actions_ws11', title: `Value WS11: ${data.Value}`, data });
      alert('Values to Actions Worksheet 11 saved!');
      v2aForm.reset();
    });

    container.querySelector('#btn-copy-v2a').addEventListener('click', () => {
      const data = this.getV2AFormData(container);
      Exports.copyForPortal('Values to Action Homework', new Date(), data);
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
  }
};
