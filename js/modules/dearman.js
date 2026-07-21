/* Interpersonal Effectiveness: DEAR MAN, Validating Others (WS 12), Self-Validation (WS 13) */
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
              Interpersonal & Validation Worksheets
            </h2>
            <p class="card-subtitle">Complete DEAR MAN scripts, practice validating others, and build self-validation/self-respect.</p>
          </div>
        </div>

        <div class="nav-tabs" style="background: transparent; border-bottom: 1px solid var(--border-color); margin-bottom: 1.25rem;">
          <button class="tab-btn active" data-ietab="ie-dearman">🗣️ DEAR MAN Builder</button>
          <button class="tab-btn" data-ietab="ie-val-others">👥 Validating Others (Worksheet 12)</button>
          <button class="tab-btn" data-ietab="ie-self-val">🛡️ Self-Validation (Worksheet 13)</button>
        </div>

        <!-- DEAR MAN Script Builder -->
        <div class="ietab-content active" id="ie-dearman">
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
              <button type="submit" class="btn btn-primary">💾 Save Script</button>
            </div>
          </form>
        </div>

        <!-- Validating Others (Worksheet 12) -->
        <div class="ietab-content" id="ie-val-others" style="display: none;">
          <form id="val-others-form">
            <h4 style="color: var(--accent-blue); margin-bottom: 0.5rem; font-size: 0.95rem;">Check validation strategies practiced:</h4>
            <div class="grid-3" style="margin-bottom: 1rem; background: var(--bg-secondary); padding: 0.75rem; border-radius: var(--radius-md); border: 1px solid var(--border-color);">
              <label style="font-size: 0.8rem;"><input type="checkbox" class="val-check" value="Paid attention"> 1. Paid attention (L1)</label>
              <label style="font-size: 0.8rem;"><input type="checkbox" class="val-check" value="Reflected back"> 2. Reflected back thoughts/words (L2)</label>
              <label style="font-size: 0.8rem;"><input type="checkbox" class="val-check" value="Sensitive to unspoken"> 3. Was sensitive to unspoken feelings (L3)</label>
              <label style="font-size: 0.8rem;"><input type="checkbox" class="val-check" value="Expressed makes sense"> 4. Expressed how it makes sense (L4/L5)</label>
              <label style="font-size: 0.8rem;"><input type="checkbox" class="val-check" value="Acknowledged valid"> 5. Acknowledged and acted on valid points</label>
              <label style="font-size: 0.8rem;"><input type="checkbox" class="val-check" value="Acted as equal"> 6. Acted authentically as an equal (L6)</label>
            </div>

            <div class="form-group">
              <label class="form-label">Who did you validate?</label>
              <input type="text" class="form-control" id="val-who" placeholder="e.g. Partner, child, colleague..." required>
            </div>

            <div class="grid-2">
              <div class="form-group">
                <label class="form-label">1 Invalidating Statement and 2 Validating Statements made:</label>
                <textarea class="form-control" id="val-statements" placeholder="Invalidating: 'It's not that big a deal.'\nValidating 1: 'I can see you're exhausted.'\nValidating 2: 'Given the long day you had, anyone would feel angry.'"></textarea>
              </div>
              <div class="form-group">
                <label class="form-label">Describe the situation where you used validation:</label>
                <textarea class="form-control" id="val-situation" placeholder="What happened?"></textarea>
              </div>
            </div>

            <div class="grid-3">
              <div class="form-group">
                <label class="form-label">What did you say/do?</label>
                <textarea class="form-control" id="val-action" placeholder="Describe your validation action."></textarea>
              </div>
              <div class="form-group">
                <label class="form-label">What was the outcome?</label>
                <textarea class="form-control" id="val-outcome" placeholder="How did the other person react?"></textarea>
              </div>
              <div class="form-group">
                <label class="form-label">How did you feel afterward?</label>
                <textarea class="form-control" id="val-feelings" placeholder="Your own feelings."></textarea>
              </div>
            </div>

            <div style="display: flex; gap: 0.5rem; justify-content: flex-end;">
              <button type="button" class="btn btn-secondary" id="btn-copy-val">📋 Copy Worksheet</button>
              <button type="submit" class="btn btn-primary">💾 Save Worksheet 12</button>
            </div>
          </form>
        </div>

        <!-- Self-Validation & Self-Respect (Worksheet 13) -->
        <div class="ietab-content" id="ie-self-val" style="display: none;">
          <form id="self-val-form">
            <h4 style="color: var(--accent-purple); margin-bottom: 0.5rem; font-size: 0.95rem;">Check self-validation strategies used this week:</h4>
            <div class="grid-2" style="margin-bottom: 1rem; background: var(--bg-secondary); padding: 0.75rem; border-radius: var(--radius-md); border: 1px solid var(--border-color); font-size: 0.8rem;">
              <div>
                <label style="display:block; margin-bottom:0.25rem;"><input type="checkbox" class="sval-check" value="Checked facts"> Checked all the facts for validity</label>
                <label style="display:block; margin-bottom:0.25rem;"><input type="checkbox" class="sval-check" value="Checked with trusted person"> Checked it out with someone trusted</label>
                <label style="display:block; margin-bottom:0.25rem;"><input type="checkbox" class="sval-check" value="Acknowledged invalid responses"> Acknowledged invalid responses & did not validate</label>
                <label style="display:block; margin-bottom:0.25rem;"><input type="checkbox" class="sval-check" value="Worked to change invalid thinking"> Worked to change invalid thinking/actions</label>
                <label style="display:block; margin-bottom:0.25rem;"><input type="checkbox" class="sval-check" value="Dropped judgmental self-statements"> Dropped judgmental self-statements</label>
                <label style="display:block; margin-bottom:0.25rem;"><input type="checkbox" class="sval-check" value="Reminded self doing best"> Reminded self that I am doing my best</label>
              </div>
              <div>
                <label style="display:block; margin-bottom:0.25rem;"><input type="checkbox" class="sval-check" value="Was compassionate / self-soothed"> Was compassionate & self-soothed</label>
                <label style="display:block; margin-bottom:0.25rem;"><input type="checkbox" class="sval-check" value="Admitted hurts"> Admitted that it hurts to be invalidated</label>
                <label style="display:block; margin-bottom:0.25rem;"><input type="checkbox" class="sval-check" value="Acknowledge reactions make sense"> Acknowledged reactions make sense in context</label>
                <label style="display:block; margin-bottom:0.25rem;"><input type="checkbox" class="sval-check" value="Practiced radical acceptance"> Practiced radical acceptance of invalidator</label>
                <label style="display:block; margin-bottom:0.25rem;"><input type="checkbox" class="sval-check" value="Described experience to support"> Described experience in supportive environment</label>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">List 1 self-invalidating and 2 self-validating statements made:</label>
              <textarea class="form-control" id="sval-statements" placeholder="Self-invalidating: 'I should be stronger than this.'\nSelf-validating 1: 'It makes complete sense I am exhausted after an Ironman run and a full work day.'\nSelf-validating 2: 'My feelings are real, even if they are painful right now.'"></textarea>
            </div>

            <div class="grid-2">
              <div class="form-group">
                <label class="form-label">Describe a situation where you felt invalidated this week:</label>
                <textarea class="form-control" id="sval-situation" placeholder="What happened to trigger self-invalidation or feeling invalidated?"></textarea>
              </div>
              <div class="form-group">
                <label class="form-label">What was the outcome of practicing self-validation?</label>
                <textarea class="form-control" id="sval-outcome" placeholder="How did your emotional state or self-respect shift?"></textarea>
              </div>
            </div>

            <div style="display: flex; gap: 0.5rem; justify-content: flex-end;">
              <button type="button" class="btn btn-secondary" id="btn-copy-sval">📋 Copy Worksheet</button>
              <button type="submit" class="btn btn-primary">💾 Save Worksheet 13</button>
            </div>
          </form>
        </div>
      </div>
    `;

    this.attachEvents(container);
  },

  attachEvents(container) {
    const tabs = container.querySelectorAll('.tab-btn');
    const contents = container.querySelectorAll('.ietab-content');

    tabs.forEach(t => {
      t.addEventListener('click', () => {
        tabs.forEach(x => x.classList.remove('active'));
        contents.forEach(x => x.style.display = 'none');
        t.classList.add('active');
        const target = container.querySelector('#' + t.dataset.ietab);
        if (target) target.style.display = 'block';
      });
    });

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

    const valForm = container.querySelector('#val-others-form');
    valForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const data = this.getValFormData(container);
      await db.saveWorksheet({ type: 'validation_others_ws12', title: `Validation WS12: ${data.Person}`, data });
      alert('Validating Others Worksheet 12 saved!');
      valForm.reset();
    });

    container.querySelector('#btn-copy-val').addEventListener('click', () => {
      const data = this.getValFormData(container);
      Exports.copyForPortal('Validating Others Homework', new Date(), data);
    });

    const svalForm = container.querySelector('#self-val-form');
    svalForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const data = this.getSelfValFormData(container);
      await db.saveWorksheet({ type: 'self_validation_ws13', title: `Self-Validation WS13: ${new Date().toLocaleDateString()}`, data });
      alert('Self-Validation Worksheet 13 saved!');
      svalForm.reset();
    });

    container.querySelector('#btn-copy-sval').addEventListener('click', () => {
      const data = this.getSelfValFormData(container);
      Exports.copyForPortal('Self-Validation Homework', new Date(), data);
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
  },

  getValFormData(container) {
    const checks = Array.from(container.querySelectorAll('.val-check:checked')).map(c => c.value);
    return {
      'Person': container.querySelector('#val-who').value,
      'Strategies Used': checks.join(', ') || 'None selected',
      'Statements Made': container.querySelector('#val-statements').value,
      'Situation': container.querySelector('#val-situation').value,
      'Action Taken': container.querySelector('#val-action').value,
      'Outcome': container.querySelector('#val-outcome').value,
      'Feelings': container.querySelector('#val-feelings').value
    };
  },

  getSelfValFormData(container) {
    const checks = Array.from(container.querySelectorAll('.sval-check:checked')).map(c => c.value);
    return {
      'Strategies Used': checks.join(', ') || 'None selected',
      'Statements Made': container.querySelector('#sval-statements').value,
      'Situation': container.querySelector('#sval-situation').value,
      'Outcome': container.querySelector('#sval-outcome').value
    };
  }
};
