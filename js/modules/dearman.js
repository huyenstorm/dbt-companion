/* Interpersonal Effectiveness: DEAR MAN, Validating Others (6 Levels), GIVE, FAST */
import { db } from '../db.js';
import { Exports } from '../exports.js';

export const DearManModule = {
  render(container) {
    container.innerHTML = `
      <div class="card">
        <div class="card-header">
          <div>
            <h2 class="card-title">
              <span class="badge badge-blue">Interpersonal Effectiveness</span>
              DEAR MAN Script Builder
            </h2>
            <p class="card-subtitle">Objective effectiveness script builder for asking for what you need or saying no effectively.</p>
          </div>
        </div>

        <form id="dearman-form">
          <div class="form-group">
            <label class="form-label">Objective / Request Goal</label>
            <input type="text" class="form-control" id="dm-goal" placeholder="e.g. Asking partner for 1 hour of quiet study/rest time without kids..." required>
          </div>

          <div class="grid-2">
            <div class="form-group">
              <label class="form-label">D - Describe (Clear non-judgmental facts)</label>
              <textarea class="form-control" id="dm-describe" placeholder="e.g. 'I've been training for 3 hours and managing the kids' dinner...'"></textarea>
            </div>
            <div class="form-group">
              <label class="form-label">E - Express (Express feelings/opinions clearly)</label>
              <textarea class="form-control" id="dm-express" placeholder="e.g. 'I'm feeling overwhelmed and physically depleted...'"></textarea>
            </div>
          </div>

          <div class="grid-2">
            <div class="form-group">
              <label class="form-label">A - Assert (Ask clearly or say NO directly)</label>
              <textarea class="form-control" id="dm-assert" placeholder="e.g. 'I need you to take over bedtime duty for the next hour.'"></textarea>
            </div>
            <div class="form-group">
              <label class="form-label">R - Reinforce (Reward/explain positive consequences)</label>
              <textarea class="form-control" id="dm-reinforce" placeholder="e.g. 'That will give me energy so I can be fully present for tomorrow's family trip.'"></textarea>
            </div>
          </div>

          <div class="grid-3">
            <div class="form-group">
              <label class="form-label">M - Mindful (Stay focused / broken record)</label>
              <textarea class="form-control" id="dm-mindful" placeholder="Stay on message; ignore distractions."></textarea>
            </div>
            <div class="form-group">
              <label class="form-label">A - Appear Confident (Body language & tone)</label>
              <textarea class="form-control" id="dm-appear" placeholder="Eye contact, steady voice, erect posture."></textarea>
            </div>
            <div class="form-group">
              <label class="form-label">N - Negotiate (Offer solutions / middle ground)</label>
              <textarea class="form-control" id="dm-negotiate" placeholder="e.g. 'I can take over morning duty tomorrow in return.'"></textarea>
            </div>
          </div>

          <div style="display: flex; gap: 0.5rem; justify-content: flex-end;">
            <button type="button" class="btn btn-secondary" id="btn-copy-dm">📋 Copy Script</button>
            <button type="button" class="btn btn-secondary" id="btn-print-dm">🖨️ Print 8.5x11</button>
            <button type="submit" class="btn btn-primary">💾 Save Script</button>
          </div>
        </form>
      </div>

      <!-- Validating Others Module -->
      <div class="card">
        <div class="card-header">
          <div>
            <h2 class="card-title">
              <span class="badge badge-blue">Interpersonal Effectiveness</span>
              Validating Others (6 Levels of Validation)
            </h2>
            <p class="card-subtitle">Practice validating family, kids, coworkers, or partner effectively.</p>
          </div>
        </div>

        <div class="grid-2">
          <div>
            <h4 style="color: var(--accent-blue); margin-bottom: 0.5rem;">The 6 Levels of Validation Reference:</h4>
            <ol style="padding-left: 1.2rem; font-size: 0.85rem; color: var(--text-secondary); line-height: 1.6;">
              <li><strong>Level 1: Being Present</strong> (Eye contact, listening attentively without phone).</li>
              <li><strong>Level 2: Accurate Reflection</strong> (Summarizing back what they said without judgment).</li>
              <li><strong>Level 3: Mind Reading / Unspoken</strong> (Guessing unspoken feelings: "Are you feeling hurt?").</li>
              <li><strong>Level 4: History / Trauma Context</strong> ("Given your past experience, it makes total sense you feel this way").</li>
              <li><strong>Level 5: Normalizing</strong> ("Anyone in this situation would feel angry/frustrated").</li>
              <li><strong>Level 6: Radical Genuineness</strong> (Treating them as an equal human with authentic vulnerability).</li>
            </ol>
          </div>

          <form id="val-form">
            <div class="form-group">
              <label class="form-label">Person & Situation</label>
              <input type="text" class="form-control" id="val-person" placeholder="e.g. Validating kid after meltdown or partner after tough work day..." required>
            </div>
            <div class="form-group">
              <label class="form-label">Selected Validation Statement (Levels 1-6)</label>
              <textarea class="form-control" id="val-statement" placeholder="e.g. 'I hear that you're exhausted (L2). Given how hard you worked today, anyone would feel overwhelmed (L5).'"></textarea>
            </div>
            <div style="display: flex; justify-content: flex-end;">
              <button type="submit" class="btn btn-primary">💾 Save Validation Practice</button>
            </div>
          </form>
        </div>
      </div>
    `;

    this.attachEvents(container);
  },

  attachEvents(container) {
    const dmForm = container.querySelector('#dearman-form');
    dmForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const data = this.getDMFormData(container);
      await db.saveWorksheet({ type: 'dear_man', title: `DEAR MAN: ${data['Goal']}`, data });
      alert('DEAR MAN script saved!');
      dmForm.reset();
    });

    container.querySelector('#btn-copy-dm').addEventListener('click', () => {
      const data = this.getDMFormData(container);
      Exports.copyForPortal('DEAR MAN Script', new Date(), data);
    });

    container.querySelector('#btn-print-dm').addEventListener('click', () => {
      const data = this.getDMFormData(container);
      Exports.printWorksheet('DEAR MAN Script', new Date(), data);
    });

    const valForm = container.querySelector('#val-form');
    valForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const data = {
        'Person & Situation': container.querySelector('#val-person').value,
        'Validation Practice': container.querySelector('#val-statement').value
      };
      await db.saveWorksheet({ type: 'validation_practice', title: `Validation: ${data['Person & Situation']}`, data });
      alert('Validation practice saved!');
      valForm.reset();
    });
  },

  getDMFormData(container) {
    return {
      'Goal': container.querySelector('#dm-goal').value,
      'Describe': container.querySelector('#dm-describe').value,
      'Express': container.querySelector('#dm-express').value,
      'Assert': container.querySelector('#dm-assert').value,
      'Reinforce': container.querySelector('#dm-reinforce').value,
      'Mindful': container.querySelector('#dm-mindful').value,
      'Appear Confident': container.querySelector('#dm-appear').value,
      'Negotiate': container.querySelector('#dm-negotiate').value
    };
  }
};
