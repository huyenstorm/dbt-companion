/* Wise Mind, Mindfulness of Current Emotion, and Problem Solving (Handout 12) */
import { db } from '../db.js';
import { Exports } from '../exports.js';

export const WiseMindModule = {
  render(container) {
    container.innerHTML = `
      <div class="card">
        <div class="card-header">
          <div>
            <h2 class="card-title">
              <span class="badge badge-teal">Core Mindfulness & ER</span>
              Wise Mind & Problem Solving Wizards
            </h2>
            <p class="card-subtitle">Tune in to Wise Mind, practice mindfulness of emotion, or run the 7-step problem-solving protocol.</p>
          </div>
        </div>

        <div class="nav-tabs" style="background: transparent; border-bottom: 1px solid var(--border-color); margin-bottom: 1.25rem;">
          <button class="tab-btn active" data-wm="wm-align">✨ Wise Mind Alignment</button>
          <button class="tab-btn" data-wm="wm-mce">🌊 Mindfulness of Emotion</button>
          <button class="tab-btn" data-wm="wm-solve">🛠️ Problem Solving (Handout 12)</button>
        </div>

        <!-- Wise Mind Alignment -->
        <div class="wm-content active" id="wm-align">
          <form id="wise-mind-form">
            <div class="form-group">
              <label class="form-label">Current Situation / Decision</label>
              <input type="text" class="form-control" id="wm-situation" placeholder="e.g. Deciding whether to confront a coworker or adjust schedule..." required>
            </div>

            <div class="form-group">
              <label class="form-label">🔥 Emotion Mind (What are your emotions telling you to do?)</label>
              <textarea class="form-control" id="wm-emotion-mind" placeholder="Urges, fears, anger, immediate impulse..."></textarea>
            </div>

            <div class="form-group">
              <label class="form-label">🧊 Reasonable Mind (What do cold facts & logic say?)</label>
              <textarea class="form-control" id="wm-reasonable-mind" placeholder="Facts, rules, practical details, logistics..."></textarea>
            </div>

            <div class="form-group">
              <label class="form-label">✨ Wise Mind Synthesis (Inner quiet & intuitive balance)</label>
              <textarea class="form-control" id="wm-wise-mind" placeholder="When taking a deep breath and honoring both emotion and logic, what is the middle path?"></textarea>
            </div>

            <div style="display: flex; gap: 0.5rem; justify-content: flex-end;">
              <button type="button" class="btn btn-secondary" id="btn-copy-wm">📋 Copy</button>
              <button type="submit" class="btn btn-primary">💾 Save Wise Mind Log</button>
            </div>
          </form>
        </div>

        <!-- Mindfulness of Current Emotion -->
        <div class="wm-content" id="wm-mce" style="display: none;">
          <form id="mce-form">
            <div class="form-group">
              <label class="form-label">Target Emotion</label>
              <input type="text" class="form-control" id="mce-emotion" placeholder="e.g. Panic, Sadness, Overwhelm..." required>
            </div>

            <div class="form-group">
              <label class="form-label">1. Body Sensations (Where do you feel it physically?)</label>
              <textarea class="form-control" id="mce-sensations" placeholder="Tight throat, stomach knot, tingling in arms..."></textarea>
            </div>

            <div class="form-group">
              <label class="form-label">2. Observing the Wave (Riding the peak without fighting)</label>
              <textarea class="form-control" id="mce-wave" placeholder="I am noticing the emotion rising... it is reaching a peak... I am allowing it to crest and pass without pushing it down."></textarea>
            </div>

            <div class="form-group">
              <label class="form-label">3. Self-Validation (Remembering: 'I am not my emotion')</label>
              <textarea class="form-control" id="mce-validation" placeholder="'It makes sense I feel this way given my fatigue/history. This feeling is temporary.'"></textarea>
            </div>

            <div style="display: flex; gap: 0.5rem; justify-content: flex-end;">
              <button type="button" class="btn btn-secondary" id="btn-copy-mce">📋 Copy</button>
              <button type="submit" class="btn btn-primary">💾 Save Session</button>
            </div>
          </form>
        </div>

        <!-- Problem Solving (Handout 12) -->
        <div class="wm-content" id="wm-solve" style="display: none;">
          <form id="solve-form">
            <div class="form-group">
              <label class="form-label">Step 1: Figure out and Describe the problem situation</label>
              <textarea class="form-control" id="ps-situation" placeholder="State the problem situation in non-judgmental, factual terms." required></textarea>
            </div>

            <div class="form-group" style="background: var(--bg-secondary); padding: 0.75rem; border-radius: var(--radius-md); border: 1px solid var(--border-color); margin-bottom: 1rem;">
              <label class="form-label" style="color: var(--accent-purple);">Step 2: Check the Facts</label>
              <label style="font-size: 0.8rem; display: block; margin-bottom: 0.25rem;">
                <input type="checkbox" id="ps-check-facts" required> Check the facts! Do my interpretations fit the facts, or are they unhelpful assumptions?
              </label>
              <span style="font-size: 0.75rem; color: var(--text-muted); font-style: italic;">Note: If facts are not correct, go back and rewrite Step 1. If facts are correct, continue.</span>
            </div>

            <div class="grid-2">
              <div class="form-group">
                <label class="form-label">Step 3: Identify your Goal in solving the problem</label>
                <input type="text" class="form-control" id="ps-goal" placeholder="Simple, realistic, and achievable goal...">
              </div>
              <div class="form-group">
                <label class="form-label">Step 4: Brainstorm lots of solutions</label>
                <textarea class="form-control" id="ps-solutions" placeholder="Brainstorm list (no evaluation yet)..."></textarea>
              </div>
            </div>

            <div class="grid-2">
              <div class="form-group">
                <label class="form-label">Step 5: Choose a solution (List PROS and CONS)</label>
                <textarea class="form-control" id="ps-pro-con" placeholder="Solution choice: \nPros: \nCons: "></textarea>
              </div>
              <div class="form-group">
                <label class="form-label">Step 6 & 7: Put into Action & Evaluate Results</label>
                <textarea class="form-control" id="ps-evaluate" placeholder="Step 6 Action Taken:\nStep 7 Evaluation (Did it work? YEA/NO):"></textarea>
              </div>
            </div>

            <div style="display: flex; gap: 0.5rem; justify-content: flex-end;">
              <button type="button" class="btn btn-secondary" id="btn-copy-ps">📋 Copy Worksheet</button>
              <button type="submit" class="btn btn-primary">💾 Save Problem Solving Log</button>
            </div>
          </form>
        </div>
      </div>
    `;

    this.attachEvents(container);
  },

  attachEvents(container) {
    const tabs = container.querySelectorAll('.tab-btn');
    const contents = container.querySelectorAll('.wm-content');

    tabs.forEach(t => {
      t.addEventListener('click', () => {
        tabs.forEach(x => x.classList.remove('active'));
        contents.forEach(x => x.style.display = 'none');
        t.classList.add('active');
        const target = container.querySelector('#' + t.dataset.wm);
        if (target) target.style.display = 'block';
      });
    });

    const wmForm = container.querySelector('#wise-mind-form');
    wmForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const data = {
        'Situation': container.querySelector('#wm-situation').value,
        'Emotion Mind': container.querySelector('#wm-emotion-mind').value,
        'Reasonable Mind': container.querySelector('#wm-reasonable-mind').value,
        'Wise Mind Synthesis': container.querySelector('#wm-wise-mind').value
      };
      await db.saveWorksheet({ type: 'wise_mind', title: `Wise Mind: ${data.Situation}`, data });
      alert('Wise Mind entry saved!');
      wmForm.reset();
    });

    const mceForm = container.querySelector('#mce-form');
    mceForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const data = {
        'Target Emotion': container.querySelector('#mce-emotion').value,
        'Body Sensations': container.querySelector('#mce-sensations').value,
        'Wave Observation': container.querySelector('#mce-wave').value,
        'Self Validation': container.querySelector('#mce-validation').value
      };
      await db.saveWorksheet({ type: 'mindfulness_emotion', title: `Mindfulness of Emotion: ${data['Target Emotion']}`, data });
      alert('Mindfulness of Emotion entry saved!');
      mceForm.reset();
    });

    const psForm = container.querySelector('#solve-form');
    psForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const data = this.getPSFormData(container);
      await db.saveWorksheet({ type: 'problem_solving_handout12', title: `Problem Solving: ${data.Goal}`, data });
      alert('Problem Solving entry saved!');
      psForm.reset();
    });

    container.querySelector('#btn-copy-wm').addEventListener('click', () => {
      const data = {
        'Situation': container.querySelector('#wm-situation').value,
        'Emotion Mind': container.querySelector('#wm-emotion-mind').value,
        'Reasonable Mind': container.querySelector('#wm-reasonable-mind').value,
        'Wise Mind Synthesis': container.querySelector('#wm-wise-mind').value
      };
      Exports.copyForPortal('Wise Mind Alignment', new Date(), data);
    });

    container.querySelector('#btn-copy-mce').addEventListener('click', () => {
      const data = {
        'Target Emotion': container.querySelector('#mce-emotion').value,
        'Body Sensations': container.querySelector('#mce-sensations').value,
        'Wave Observation': container.querySelector('#mce-wave').value,
        'Self Validation': container.querySelector('#mce-validation').value
      };
      Exports.copyForPortal('Mindfulness of Current Emotion', new Date(), data);
    });

    container.querySelector('#btn-copy-ps').addEventListener('click', () => {
      const data = this.getPSFormData(container);
      Exports.copyForPortal('Problem Solving Homework', new Date(), data);
    });
  },

  getPSFormData(container) {
    return {
      'Situation': container.querySelector('#ps-situation').value,
      'Checked Facts': container.querySelector('#ps-check-facts').checked ? 'YES' : 'NO',
      'Goal': container.querySelector('#ps-goal').value,
      'Brainstormed Solutions': container.querySelector('#ps-solutions').value,
      'PROS & CONS of Selection': container.querySelector('#ps-pro-con').value,
      'Action & Evaluation': container.querySelector('#ps-evaluate').value
    };
  }
};
