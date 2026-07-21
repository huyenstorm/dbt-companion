/* Wise Mind Alignment & Mindfulness of Current Emotion Modules */
import { db } from '../db.js';
import { Exports } from '../exports.js';

export const WiseMindModule = {
  render(container) {
    container.innerHTML = `
      <div class="grid-2">
        <!-- Wise Mind Alignment Wizard -->
        <div class="card">
          <div class="card-header">
            <div>
              <h2 class="card-title">
                <span class="badge badge-teal">Core Mindfulness</span>
                Wise Mind Alignment
              </h2>
              <p class="card-subtitle">Separate Emotion Mind from Reasonable Mind to access intuitive Wise Mind guidance.</p>
            </div>
          </div>

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
        <div class="card">
          <div class="card-header">
            <div>
              <h2 class="card-title">
                <span class="badge badge-teal">Mindfulness</span>
                Mindfulness of Current Emotion
              </h2>
              <p class="card-subtitle">Observe your emotion as a wave without trying to suppress or act on it.</p>
            </div>
          </div>

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
      </div>
    `;

    this.attachEvents(container);
  },

  attachEvents(container) {
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
  }
};
