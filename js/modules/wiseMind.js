/* Wise Mind, Mindfulness of Current Emotion (WS 15), and Problem Solving (Handout 12) */
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

        <div class="nav-tabs" style="display: none !important; background: transparent; border-bottom: 1px solid var(--border-color); margin-bottom: 1.25rem;">
          <button class="tab-btn active" data-wm="wm-align">✨ Wise Mind Alignment</button>
          <button class="tab-btn" data-wm="wm-ws3">🧠 Wise Mind Practice (WS 3)</button>
          <button class="tab-btn" data-wm="wm-ws4">👁️ What Skills (WS 4)</button>
          <button class="tab-btn" data-wm="wm-ws5">⚖️ How Skills (WS 5)</button>
          <button class="tab-btn" data-wm="wm-mce">🌊 Mindfulness of Emotion (WS 15)</button>
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

        <!-- Wise Mind Practice (Worksheet 3) -->
        <div class="wm-content" id="wm-ws3" style="display: none;">
          <form id="ws3-form">
            <div class="form-group">
              <label class="form-label" style="color: var(--accent-teal);">Check off Wise Mind practice exercises used:</label>
              <div class="grid-2" style="background: var(--bg-secondary); padding: 0.75rem; border-radius: var(--radius-md); border: 1px solid var(--border-color); font-size: 0.8rem; gap: 0.5rem 1rem;">
                <div>
                  <label style="display:block; margin-bottom:0.25rem;"><input type="checkbox" class="ws3-check" value="Attended to my breath"> Attended to my breath coming in and out</label>
                  <label style="display:block; margin-bottom:0.25rem;"><input type="checkbox" class="ws3-check" value="Imagined stone flake"> Imagined a stone flake falling to the bottom of a lake</label>
                  <label style="display:block; margin-bottom:0.25rem;"><input type="checkbox" class="ws3-check" value="Walked down spiral stairs"> Walked down the spiral stairs</label>
                  <label style="display:block; margin-bottom:0.25rem;"><input type="checkbox" class="ws3-check" value="Dropped into pauses"> Dropped into the pauses between inhaling and exhaling</label>
                </div>
                <div>
                  <label style="display:block; margin-bottom:0.25rem;"><input type="checkbox" class="ws3-check" value="Breathed Wise in Out"> Breathed "Wise" in, "Mind" out</label>
                  <label style="display:block; margin-bottom:0.25rem;"><input type="checkbox" class="ws3-check" value="Asked Wise Mind a question"> Asked Wise Mind a question</label>
                  <label style="display:block; margin-bottom:0.25rem;"><input type="checkbox" class="ws3-check" value="Asked Is this Wise Mind"> Asked myself, Is this Wise Mind?</label>
                  <label style="display:block; margin-bottom:0.25rem;"><input type="checkbox" class="ws3-check" value="Other"> Other</label>
                </div>
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">Describe situation and how you practiced (up to 2 situations):</label>
              <textarea class="form-control" id="ws3-situations" placeholder="Situation 1: ... \nSituation 2: ..."></textarea>
            </div>
            <div class="form-group">
              <label class="form-label">Effectiveness Rating (1-5):</label>
              <input type="number" min="1" max="5" class="form-control" id="ws3-rating" placeholder="1 = not effective, 5 = very effective">
            </div>
            <div class="form-group">
              <label class="form-label">List Wise things to do/say:</label>
              <textarea class="form-control" id="ws3-wise-things" placeholder="Based on my Wise Mind, I should..."></textarea>
            </div>
            <div style="display: flex; gap: 0.5rem; justify-content: flex-end;">
              <button type="button" class="btn btn-secondary" id="btn-copy-ws3">📋 Copy</button>
              <button type="submit" class="btn btn-primary">💾 Save Worksheet 3</button>
            </div>
          </form>
        </div>

        <!-- What Skills (Worksheet 4) -->
        <div class="wm-content" id="wm-ws4" style="display: none;">
          <form id="ws4-form">
            <div class="form-group">
              <label class="form-label" style="color: var(--accent-teal);">Check off WHAT skills used:</label>
              <div style="background: var(--bg-secondary); padding: 0.75rem; border-radius: var(--radius-md); border: 1px solid var(--border-color); font-size: 0.8rem;">
                  <label style="display:inline-block; margin-right:1rem;"><input type="checkbox" class="ws4-check" value="Observe"> Observe</label>
                  <label style="display:inline-block; margin-right:1rem;"><input type="checkbox" class="ws4-check" value="Describe"> Describe</label>
                  <label style="display:inline-block; margin-right:1rem;"><input type="checkbox" class="ws4-check" value="Participate"> Participate</label>
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">Describe situation and how you practiced (up to 2):</label>
              <textarea class="form-control" id="ws4-situations" placeholder="Situation 1: ... \nSituation 2: ..."></textarea>
            </div>
            <div class="form-group">
              <label class="form-label">Check if practice improved (check all that apply):</label>
              <div class="grid-2" style="background: var(--bg-secondary); padding: 0.75rem; border-radius: var(--radius-md); border: 1px solid var(--border-color); font-size: 0.8rem; gap: 0.5rem 1rem;">
                  <div><label style="display:block;"><input type="checkbox" class="ws4-effect-check" value="Reduced suffering"> Reduced suffering</label></div>
                  <div><label style="display:block;"><input type="checkbox" class="ws4-effect-check" value="Decreased reactivity"> Decreased reactivity</label></div>
                  <div><label style="display:block;"><input type="checkbox" class="ws4-effect-check" value="Increased connection"> Increased connection</label></div>
                  <div><label style="display:block;"><input type="checkbox" class="ws4-effect-check" value="Increased joy"> Increased joy</label></div>
                  <div><label style="display:block;"><input type="checkbox" class="ws4-effect-check" value="Helped make wise decision"> Helped make wise decision</label></div>
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">Describe how it helped:</label>
              <textarea class="form-control" id="ws4-help" placeholder="It helped by..."></textarea>
            </div>
            <div class="form-group">
              <label class="form-label">List Wise things to do/say:</label>
              <textarea class="form-control" id="ws4-wise-things" placeholder="Next steps in Wise Mind..."></textarea>
            </div>
            <div style="display: flex; gap: 0.5rem; justify-content: flex-end;">
              <button type="button" class="btn btn-secondary" id="btn-copy-ws4">📋 Copy</button>
              <button type="submit" class="btn btn-primary">💾 Save Worksheet 4</button>
            </div>
          </form>
        </div>

        <!-- How Skills (Worksheet 5) -->
        <div class="wm-content" id="wm-ws5" style="display: none;">
          <form id="ws5-form">
            <div class="form-group">
              <label class="form-label" style="color: var(--accent-teal);">Check off HOW skills used:</label>
              <div style="background: var(--bg-secondary); padding: 0.75rem; border-radius: var(--radius-md); border: 1px solid var(--border-color); font-size: 0.8rem;">
                  <label style="display:inline-block; margin-right:1rem;"><input type="checkbox" class="ws5-check" value="Nonjudgmentalness"> Nonjudgmentalness</label>
                  <label style="display:inline-block; margin-right:1rem;"><input type="checkbox" class="ws5-check" value="One-Mindfulness"> One-Mindfulness</label>
                  <label style="display:inline-block; margin-right:1rem;"><input type="checkbox" class="ws5-check" value="Effectiveness"> Effectiveness</label>
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">Describe situation and how you practiced (up to 2):</label>
              <textarea class="form-control" id="ws5-situations" placeholder="Situation 1: ... \nSituation 2: ..."></textarea>
            </div>
            <div class="form-group">
              <label class="form-label">Check if practice improved (check all that apply):</label>
              <div class="grid-2" style="background: var(--bg-secondary); padding: 0.75rem; border-radius: var(--radius-md); border: 1px solid var(--border-color); font-size: 0.8rem; gap: 0.5rem 1rem;">
                  <div><label style="display:block;"><input type="checkbox" class="ws5-effect-check" value="Reduced suffering"> Reduced suffering</label></div>
                  <div><label style="display:block;"><input type="checkbox" class="ws5-effect-check" value="Decreased reactivity"> Decreased reactivity</label></div>
                  <div><label style="display:block;"><input type="checkbox" class="ws5-effect-check" value="Increased connection"> Increased connection</label></div>
                  <div><label style="display:block;"><input type="checkbox" class="ws5-effect-check" value="Increased joy"> Increased joy</label></div>
                  <div><label style="display:block;"><input type="checkbox" class="ws5-effect-check" value="Helped make wise decision"> Helped make wise decision</label></div>
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">Describe how it helped:</label>
              <textarea class="form-control" id="ws5-help" placeholder="It helped by..."></textarea>
            </div>
            <div class="form-group">
              <label class="form-label">List Wise things to do/say:</label>
              <textarea class="form-control" id="ws5-wise-things" placeholder="Next steps in Wise Mind..."></textarea>
            </div>
            <div style="display: flex; gap: 0.5rem; justify-content: flex-end;">
              <button type="button" class="btn btn-secondary" id="btn-copy-ws5">📋 Copy</button>
              <button type="submit" class="btn btn-primary">💾 Save Worksheet 5</button>
            </div>
          </form>
        </div>

        <!-- Mindfulness of Current Emotion (Worksheet 15) -->
        <div class="wm-content" id="wm-mce" style="display: none;">
          <form id="mce-form">
            <div class="grid-3">
              <div class="form-group">
                <label class="form-label">Emotion Name</label>
                <input type="text" class="form-control" id="mce-emotion" placeholder="e.g. Panic, Sadness, Anger..." required>
              </div>
              <div class="form-group">
                <label class="form-label">Intensity Before (0-100)</label>
                <input type="number" min="0" max="100" class="form-control" id="mce-before" placeholder="e.g. 95" required>
              </div>
              <div class="form-group">
                <label class="form-label">Intensity After (0-100)</label>
                <input type="number" min="0" max="100" class="form-control" id="mce-after" placeholder="e.g. 50">
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">Describe prompting situation:</label>
              <textarea class="form-control" id="mce-situation" placeholder="Fill out Steps 1 and 2 of Worksheet 5 (Check the Facts) if necessary..."></textarea>
            </div>

            <div class="form-group">
              <label class="form-label" style="color: var(--accent-teal);">Check off any of the following mindfulness actions you practiced:</label>
              <div class="grid-2" style="background: var(--bg-secondary); padding: 0.75rem; border-radius: var(--radius-md); border: 1px solid var(--border-color); font-size: 0.8rem; gap: 0.5rem 1rem;">
                <div>
                  <label style="display:block; margin-bottom:0.25rem;"><input type="checkbox" class="mce-check" value="Stepped back and noticed"> Stepped back and just noticed the emotion</label>
                  <label style="display:block; margin-bottom:0.25rem;"><input type="checkbox" class="mce-check" value="Experienced waves"> Experienced the emotion as waves on a beach</label>
                  <label style="display:block; margin-bottom:0.25rem;"><input type="checkbox" class="mce-check" value="Let go of judgments"> Let go of judgments about my emotion</label>
                  <label style="display:block; margin-bottom:0.25rem;"><input type="checkbox" class="mce-check" value="Noticed body location"> Noticed where in my body I felt sensations</label>
                  <label style="display:block; margin-bottom:0.25rem;"><input type="checkbox" class="mce-check" value="Paid attention to physical"> Paid attention to physical sensations</label>
                  <label style="display:block; margin-bottom:0.25rem;"><input type="checkbox" class="mce-check" value="Observed duration"> Observed how long it took to go away</label>
                  <label style="display:block; margin-bottom:0.25rem;"><input type="checkbox" class="mce-check" value="Reminded critical fails"> Reminded myself critical thoughts fail</label>
                </div>
                <div>
                  <label style="display:block; margin-bottom:0.25rem;"><input type="checkbox" class="mce-check" value="Willingness unwelcome"> Practiced willingness to feel unwelcome emotions</label>
                  <label style="display:block; margin-bottom:0.25rem;"><input type="checkbox" class="mce-check" value="Imagined clouds"> Imagined my emotions as clouds in the sky</label>
                  <label style="display:block; margin-bottom:0.25rem;"><input type="checkbox" class="mce-check" value="Noticed action urge"> Just noticed the action urge with my emotion</label>
                  <label style="display:block; margin-bottom:0.25rem;"><input type="checkbox" class="mce-check" value="Avoided acting"> Got myself to avoid acting on urge</label>
                  <label style="display:block; margin-bottom:0.25rem;"><input type="checkbox" class="mce-check" value="Reminded felt different"> Reminded myself of times I felt different</label>
                  <label style="display:block; margin-bottom:0.25rem;"><input type="checkbox" class="mce-check" value="Radically accepted"> Practiced radically accepting my emotion</label>
                  <label style="display:block; margin-bottom:0.25rem;"><input type="checkbox" class="mce-check" value="Tried to love emotion"> Tried to love my emotions</label>
                </div>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">Comments and descriptions of experiences:</label>
              <textarea class="form-control" id="mce-comments" placeholder="Describe how the waves crested, bodily shifts, or insights..."></textarea>
            </div>

            <div style="display: flex; gap: 0.5rem; justify-content: flex-end;">
              <button type="button" class="btn btn-secondary" id="btn-copy-mce">📋 Copy</button>
              <button type="submit" class="btn btn-primary">💾 Save Worksheet 15</button>
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

    const ws3Form = container.querySelector('#ws3-form');
    ws3Form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const data = this.getWS3FormData(container);
      await db.saveWorksheet({ type: 'wise_mind_practice_ws3', title: `Wise Mind Practice (WS 3)`, data });
      alert('Wise Mind Practice Worksheet 3 saved!');
      ws3Form.reset();
    });

    const ws4Form = container.querySelector('#ws4-form');
    ws4Form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const data = this.getWS4FormData(container);
      await db.saveWorksheet({ type: 'what_skills_ws4', title: `WHAT Skills (WS 4)`, data });
      alert('WHAT Skills Worksheet 4 saved!');
      ws4Form.reset();
    });

    const ws5Form = container.querySelector('#ws5-form');
    ws5Form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const data = this.getWS5FormData(container);
      await db.saveWorksheet({ type: 'how_skills_ws5', title: `HOW Skills (WS 5)`, data });
      alert('HOW Skills Worksheet 5 saved!');
      ws5Form.reset();
    });

    const mceForm = container.querySelector('#mce-form');
    mceForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const data = this.getMCEFormData(container);
      await db.saveWorksheet({ type: 'mindfulness_emotion_ws15', title: `Mindfulness of Emotion WS15: ${data['Target Emotion']}`, data });
      alert('Mindfulness of Emotion Worksheet 15 saved!');
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

    container.querySelector('#btn-copy-ws3').addEventListener('click', () => {
      const data = this.getWS3FormData(container);
      Exports.copyForPortal('Wise Mind Practice (WS 3)', new Date(), data);
    });

    container.querySelector('#btn-copy-ws4').addEventListener('click', () => {
      const data = this.getWS4FormData(container);
      Exports.copyForPortal('WHAT Skills (WS 4)', new Date(), data);
    });

    container.querySelector('#btn-copy-ws5').addEventListener('click', () => {
      const data = this.getWS5FormData(container);
      Exports.copyForPortal('HOW Skills (WS 5)', new Date(), data);
    });

    container.querySelector('#btn-copy-mce').addEventListener('click', () => {
      const data = this.getMCEFormData(container);
      Exports.copyForPortal('Mindfulness of Current Emotion (WS15)', new Date(), data);
    });

    container.querySelector('#btn-copy-ps').addEventListener('click', () => {
      const data = this.getPSFormData(container);
      Exports.copyForPortal('Problem Solving Homework', new Date(), data);
    });
  },

  getWS3FormData(container) {
    const checks = Array.from(container.querySelectorAll('.ws3-check:checked')).map(c => c.value);
    return {
      'Practices Used': checks.join(', ') || 'None selected',
      'Situations and Practice': container.querySelector('#ws3-situations').value,
      'Effectiveness Rating': container.querySelector('#ws3-rating').value,
      'Wise Things to Do/Say': container.querySelector('#ws3-wise-things').value
    };
  },

  getWS4FormData(container) {
    const checks = Array.from(container.querySelectorAll('.ws4-check:checked')).map(c => c.value);
    const effects = Array.from(container.querySelectorAll('.ws4-effect-check:checked')).map(c => c.value);
    return {
      'WHAT Skills Used': checks.join(', ') || 'None selected',
      'Situations and Practice': container.querySelector('#ws4-situations').value,
      'Effects': effects.join(', ') || 'None selected',
      'How it Helped': container.querySelector('#ws4-help').value,
      'Wise Things to Do/Say': container.querySelector('#ws4-wise-things').value
    };
  },

  getWS5FormData(container) {
    const checks = Array.from(container.querySelectorAll('.ws5-check:checked')).map(c => c.value);
    const effects = Array.from(container.querySelectorAll('.ws5-effect-check:checked')).map(c => c.value);
    return {
      'HOW Skills Used': checks.join(', ') || 'None selected',
      'Situations and Practice': container.querySelector('#ws5-situations').value,
      'Effects': effects.join(', ') || 'None selected',
      'How it Helped': container.querySelector('#ws5-help').value,
      'Wise Things to Do/Say': container.querySelector('#ws5-wise-things').value
    };
  },

  getMCEFormData(container) {
    const checks = Array.from(container.querySelectorAll('.mce-check:checked')).map(c => c.value);
    return {
      'Target Emotion': container.querySelector('#mce-emotion').value,
      'Intensity Before': container.querySelector('#mce-before').value + '/100',
      'Intensity After': container.querySelector('#mce-after').value + '/100',
      'Situation': container.querySelector('#mce-situation').value,
      'Mindfulness Steps Practiced': checks.join(', ') || 'None selected',
      'Description / Comments': container.querySelector('#mce-comments').value
    };
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
