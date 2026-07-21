/* The Dime Game Interactive Calculator (Linehan IE Worksheet 5) */
import { db } from '../db.js';
import { Exports } from '../exports.js';

export const DimeGameModule = {
  questions: [
    { id: 'q1', text: '1. Capability: Is the person able to give you what you want (or are you able to do what they ask)?' },
    { id: 'q2', text: '2. Priorities: Is your goal more important than maintaining the relationship (or vice-versa)?' },
    { id: 'q3', text: '3. Rights: Do you have a legal or moral right to what you are asking (or do they have a right to ask)?' },
    { id: 'q4', text: '4. Authority: Are you in a position of authority over the person (or are they over you)?' },
    { id: 'q5', text: '5. Relationship: Is this request consistent with the long-term quality of the relationship?' },
    { id: 'q6', text: '6. Goals: Will giving in (or asking) help you achieve long-term goals?' },
    { id: 'q7', text: '7. Give & Take: Have you given a lot to this person recently (or have they given a lot to you)?' },
    { id: 'q8', text: '8. Homework/Facts: Do you have your facts clear and know what you are asking for?' },
    { id: 'q9', text: '9. Timing: Is this a good time to ask / say no?' },
    { id: 'q10', text: '10. Respect: Will asking / saying no maintain your self-respect?' }
  ],

  render(container) {
    const questionsHTML = this.questions.map(q => `
      <div style="background: var(--bg-secondary); padding: 0.75rem; border-radius: var(--radius-md); border: 1px solid var(--border-color); margin-bottom: 0.5rem; display: flex; justify-content: space-between; align-items: center;">
        <span style="font-size: 0.85rem; font-weight: 500; padding-right: 0.5rem;">${q.text}</span>
        <select class="form-control dime-select" data-qid="${q.id}" style="width: 90px; font-weight: bold;">
          <option value="1">YES (+1 Dime)</option>
          <option value="0">NO (0 Dimes)</option>
        </select>
      </div>
    `).join('');

    container.innerHTML = `
      <div class="card">
        <div class="card-header">
          <div>
            <h2 class="card-title">
              <span class="badge badge-blue">Interpersonal Effectiveness</span>
              The Dime Game Calculator (Worksheet 5)
            </h2>
            <p class="card-subtitle">Determine how strongly to ASK for something or how strongly to SAY NO (0¢ to $1.00 intensity rating).</p>
          </div>
        </div>

        <div class="grid-2" style="margin-bottom: 1rem;">
          <div class="form-group">
            <label class="form-label">Mode</label>
            <select class="form-control" id="dime-mode">
              <option value="ASK">Asking for something</option>
              <option value="SAY_NO">Saying NO to a request</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Situation Description</label>
            <input type="text" class="form-control" id="dime-situation" placeholder="e.g. Saying no to extra project at work, asking partner to take kid to practice...">
          </div>
        </div>

        <div style="margin-bottom: 1.25rem;">
          ${questionsHTML}
        </div>

        <!-- Result Box -->
        <div style="background: linear-gradient(135deg, var(--accent-purple-light), var(--accent-blue-light)); border: 1px solid var(--accent-purple); padding: 1.25rem; border-radius: var(--radius-lg); text-align: center; margin-bottom: 1rem;">
          <h3 style="font-size: 1rem; color: var(--text-secondary);">Total Dimes Collected</h3>
          <div id="dime-score" style="font-size: 2.2rem; font-weight: 800; color: var(--accent-purple);">$0.50 (5 Dimes)</div>
          <div id="dime-recommendation" style="font-size: 0.95rem; font-weight: 600; color: var(--text-primary); margin-top: 0.3rem;">
            Recommendation: Ask / Say No firmly, but be willing to negotiate.
          </div>
        </div>

        <div style="display: flex; gap: 0.5rem; justify-content: flex-end;">
          <button type="button" class="btn btn-secondary" id="btn-copy-dime">📋 Copy Result</button>
          <button type="button" class="btn btn-primary" id="btn-save-dime">💾 Save Dime Game Log</button>
        </div>
      </div>
    `;

    this.attachEvents(container);
  },

  attachEvents(container) {
    const selects = container.querySelectorAll('.dime-select');
    const updateScore = () => {
      let score = 0;
      selects.forEach(s => score += parseInt(s.value));
      
      const mode = container.querySelector('#dime-mode').value;
      const scoreElem = container.querySelector('#dime-score');
      const recElem = container.querySelector('#dime-recommendation');

      const totalDollars = (score * 0.10).toFixed(2);
      scoreElem.innerText = `$${totalDollars} (${score} Dimes)`;

      let rec = '';
      if (mode === 'ASK') {
        if (score <= 2) rec = 'Don’t ask; don’t hint.';
        else if (score <= 4) rec = 'Hint indirectly; do not ask directly.';
        else if (score <= 6) rec = 'Ask tentatively; take no for an answer.';
        else if (score <= 8) rec = 'Ask firmly; negotiate.';
        else rec = 'Ask strongly; insist; stand firm.';
      } else {
        if (score <= 2) rec = 'Do what they want gracefully; don’t complain.';
        else if (score <= 4) rec = 'Say no reluctantly; negotiate.';
        else if (score <= 6) rec = 'Say no firmly; offer middle ground.';
        else if (score <= 8) rec = 'Say no strongly; stand firm.';
        else rec = 'Refuse explicitly; stand firm; do not negotiate.';
      }
      recElem.innerText = `Recommendation: ${rec}`;
    };

    selects.forEach(s => s.addEventListener('change', updateScore));
    container.querySelector('#dime-mode').addEventListener('change', updateScore);
    updateScore();

    container.querySelector('#btn-save-dime').addEventListener('click', async () => {
      let score = 0;
      selects.forEach(s => score += parseInt(s.value));
      const mode = container.querySelector('#dime-mode').value;
      const situation = container.querySelector('#dime-situation').value || 'Unspecified';

      const data = {
        'Mode': mode,
        'Situation': situation,
        'Dime Score': `$${(score * 0.10).toFixed(2)} (${score}/10)`,
        'Recommendation': container.querySelector('#dime-recommendation').innerText
      };

      await db.saveWorksheet({ type: 'dime_game', title: `Dime Game (${mode}): ${situation}`, data });
      alert('Dime Game calculation saved!');
    });

    container.querySelector('#btn-copy-dime').addEventListener('click', () => {
      let score = 0;
      selects.forEach(s => score += parseInt(s.value));
      const mode = container.querySelector('#dime-mode').value;
      const situation = container.querySelector('#dime-situation').value || 'Unspecified';

      const data = {
        'Mode': mode,
        'Situation': situation,
        'Dime Score': `$${(score * 0.10).toFixed(2)} (${score}/10)`,
        'Recommendation': container.querySelector('#dime-recommendation').innerText
      };
      Exports.copyForPortal('Dime Game Calculator', new Date(), data);
    });
  }
};
