/* The Dime Game Interactive Calculator (Linehan IE Worksheet 5) */
import { db } from '../db.js';
import { Exports } from '../exports.js';

export const DimeGameModule = {
  // Phrasings based on Linehan Handout 5 / Worksheet 5
  phrasings: {
    ASK: [
      { id: 'q1', text: '1. Capability: Can the person give you what you want? (Are they able to do it?)' },
      { id: 'q2', text: '2. Priorities: Is your goal more important than maintaining the relationship?' },
      { id: 'q3', text: '3. Rights: Do you have a legal or moral right to what you are asking for?' },
      { id: 'q4', text: '4. Authority: Are you in a position of authority over the person (so you can demand what you want)?' },
      { id: 'q5', text: '5. Relationship: Is this request consistent with the long-term quality of the relationship?' },
      { id: 'q6', text: '6. Goals: Will asking help you achieve long-term goals or solve a long-term problem?' },
      { id: 'q7', text: '7. Give & Take: Do you give more than you take in this relationship? (Or have you done a lot for them lately?)' },
      { id: 'q8', text: '8. Homework: Have you got the facts clear? Is your request appropriate?' },
      { id: 'q9', text: '9. Timing: Is this a good time to ask? (Is the person in a good mood / not distracted?)' },
      { id: 'q10', text: '10. Respect: Will asking maintain your self-respect and align with your values?' }
    ],
    SAY_NO: [
      { id: 'q1', text: '1. Capability: Are you able to give them what they want? (Can you actually do what they ask?)' },
      { id: 'q2', text: '2. Priorities: Is the relationship more important than saying NO? (Will saying no damage it?)' },
      { id: 'q3', text: '3. Rights: Does the person have a legal or moral right to demand this of you?' },
      { id: 'q4', text: '4. Authority: Does this person have authority over you? (Do you have to do what they say?)' },
      { id: 'q5', text: '5. Relationship: Is saying NO consistent with the long-term quality of the relationship?' },
      { id: 'q6', text: '6. Goals: Will saying NO be consistent with your long-term goals?' },
      { id: 'q7', text: '7. Give & Take: Do you owe this person anything? (Have they done a lot for you lately?)' },
      { id: 'q8', text: '8. Homework: Do you know what you are saying NO to? Are you clear on the facts?' },
      { id: 'q9', text: '9. Timing: Is this a good time to say NO? (Is it a calm moment to discuss it?)' },
      { id: 'q10', text: '10. Respect: Will saying NO maintain your self-respect and align with your values?' }
    ]
  },

  render(container) {
    container.innerHTML = `
      <div class="card" id="dime-game-container">
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
            <label class="form-label">Mode (Questions will flip automatically)</label>
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

        <div id="dime-questions-list" style="margin-bottom: 1.25rem;">
          <!-- Dynamically populated based on mode -->
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
    this.renderQuestions(container, 'ASK');
  },

  renderQuestions(container, mode) {
    const list = container.querySelector('#dime-questions-list');
    const questions = this.phrasings[mode];

    list.innerHTML = questions.map(q => `
      <div style="background: var(--bg-secondary); padding: 0.75rem; border-radius: var(--radius-md); border: 1px solid var(--border-color); margin-bottom: 0.5rem; display: flex; justify-content: space-between; align-items: center;">
        <span style="font-size: 0.85rem; font-weight: 500; padding-right: 0.5rem; line-height: 1.4;">${q.text}</span>
        <select class="form-control dime-select" data-qid="${q.id}" style="width: 100px; font-weight: bold;">
          <option value="1">YES (+10¢)</option>
          <option value="0">NO (0¢)</option>
        </select>
      </div>
    `).join('');

    // Rebind listeners on new selects
    const selects = list.querySelectorAll('.dime-select');
    selects.forEach(s => s.addEventListener('change', () => this.updateScore(container)));
    this.updateScore(container);
  },

  attachEvents(container) {
    const modeSelect = container.querySelector('#dime-mode');
    modeSelect.addEventListener('change', (e) => {
      this.renderQuestions(container, e.target.value);
    });

    container.querySelector('#btn-save-dime').addEventListener('click', async () => {
      const mode = container.querySelector('#dime-mode').value;
      const situation = container.querySelector('#dime-situation').value || 'Unspecified';
      const scoreText = container.querySelector('#dime-score').innerText;
      const rec = container.querySelector('#dime-recommendation').innerText;

      const data = {
        'Mode': mode === 'ASK' ? 'Asking for something' : 'Saying NO to a request',
        'Situation': situation,
        'Dime Score': scoreText,
        'Recommendation': rec
      };

      await db.saveWorksheet({ type: 'dime_game', title: `Dime Game: ${situation}`, data });
      alert('Dime Game calculation saved!');
    });

    container.querySelector('#btn-copy-dime').addEventListener('click', () => {
      const mode = container.querySelector('#dime-mode').value;
      const situation = container.querySelector('#dime-situation').value || 'Unspecified';
      const scoreText = container.querySelector('#dime-score').innerText;
      const rec = container.querySelector('#dime-recommendation').innerText;

      const data = {
        'Mode': mode === 'ASK' ? 'Asking for something' : 'Saying NO to a request',
        'Situation': situation,
        'Dime Score': scoreText,
        'Recommendation': rec
      };
      Exports.copyForPortal('Dime Game Calculator', new Date(), data);
    });
  },

  updateScore(container) {
    const selects = container.querySelectorAll('.dime-select');
    let score = 0;
    selects.forEach(s => score += parseInt(s.value));
    
    const mode = container.querySelector('#dime-mode').value;
    const scoreElem = container.querySelector('#dime-score');
    const recElem = container.querySelector('#dime-recommendation');

    const totalDollars = (score * 0.10).toFixed(2);
    scoreElem.innerText = `$${totalDollars} (${score} Dimes)`;

    let rec = '';
    if (mode === 'ASK') {
      if (score <= 1) rec = 'Don’t ask; don’t hint.';
      else if (score === 2) rec = 'Hint very gently; do not ask.';
      else if (score === 3) rec = 'Hint directly; do not ask.';
      else if (score === 4) rec = 'Ask tentatively; take no for an answer.';
      else if (score === 5) rec = 'Ask firmly, but be willing to negotiate.';
      else if (score === 6) rec = 'Ask firmly; stand firm, but negotiate.';
      else if (score === 7) rec = 'Ask strongly; do not take no for an answer.';
      else if (score === 8) rec = 'Ask strongly; insist; stand firm.';
      else if (score === 9) rec = 'Ask strongly; insist; negotiate only if necessary.';
      else rec = 'Ask strongly; insist; demand; do not take no.';
    } else {
      if (score <= 1) rec = 'Do what they want gracefully; don’t complain.';
      else if (score === 2) rec = 'Do it, but let them know you’d rather not.';
      else if (score === 3) rec = 'Say no reluctantly; negotiate.';
      else if (score === 4) rec = 'Say no firmly, but be willing to negotiate.';
      else if (score === 5) rec = 'Say no firmly; offer middle ground.';
      else if (score === 6) rec = 'Say no firmly; stand firm, but negotiate.';
      else if (score === 7) rec = 'Say no strongly; stand firm.';
      else if (score === 8) rec = 'Refuse explicitly; stand firm; do not negotiate.';
      else if (score === 9) rec = 'Refuse explicitly; do not negotiate; stand firm.';
      else rec = 'Refuse explicitly; stand firm; ignore requests.';
    }
    recElem.innerText = `Recommendation: ${rec}`;
  }
};
