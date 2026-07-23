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

  // State Management for Wizard
  state: {
    step: -1, // -1: Setup situation, 0-9: Question wizard, 10: Results & AI Coach
    mode: 'ASK',
    situation: '',
    answers: Array(10).fill(null),
    chatHistory: []
  },

  render(container) {
    container.innerHTML = `
      <div class="card" id="dime-game-container">
        <div id="dime-wizard-content"></div>
      </div>
    `;
    this.renderCurrentStep(container);
  },

  renderCurrentStep(container) {
    const content = container.querySelector('#dime-wizard-content');
    if (!content) return;

    if (this.state.step === -1) {
      // Step -1: Setup View
      content.innerHTML = `
        <div class="card-header" style="margin-bottom: 1.5rem;">
          <div>
            <h2 class="card-title">
              <span class="badge badge-blue">Interpersonal Effectiveness</span>
              The Dime Game Calculator (Worksheet 5)
            </h2>
            <p class="card-subtitle">Understand how strongly to ask for something or say no in a specific scenario.</p>
          </div>
        </div>

        <div style="display: flex; flex-direction: column; gap: 1.25rem;">
          <div class="form-group">
            <label class="form-label" style="font-weight: 700;">1. What is your goal in this situation?</label>
            <select class="form-control" id="dime-mode">
              <option value="ASK" ${this.state.mode === 'ASK' ? 'selected' : ''}>Asking for something (Requesting something you want)</option>
              <option value="SAY_NO" ${this.state.mode === 'SAY_NO' ? 'selected' : ''}>Saying NO (Declining someone else's request)</option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label" style="font-weight: 700;">2. Describe the situation briefly</label>
            <input type="text" class="form-control" id="dime-situation" placeholder="e.g., Asking my boss for a raise, saying no to working overtime..." value="${this.state.situation}">
          </div>

          <button type="button" class="btn btn-primary" id="btn-dime-start" style="width: 100%; margin-top: 0.5rem; justify-content: center;">
            🎯 Start Guided Calculator
          </button>
        </div>
      `;

      content.querySelector('#btn-dime-start').addEventListener('click', () => {
        this.state.situation = content.querySelector('#dime-situation').value.trim() || 'Unspecified Scenario';
        this.state.mode = content.querySelector('#dime-mode').value;
        this.state.answers = Array(10).fill(null);
        this.state.chatHistory = [];
        this.state.step = 0;
        this.renderCurrentStep(container);
      });

    } else if (this.state.step >= 0 && this.state.step <= 9) {
      // Steps 0-9: Question View
      const questions = this.phrasings[this.state.mode];
      const q = questions[this.state.step];
      const progressPercent = ((this.state.step) / 10) * 100;

      content.innerHTML = `
        <div class="card-header" style="margin-bottom: 1rem;">
          <div>
            <h2 class="card-title" style="font-size: 1.1rem; color: var(--accent-purple);">
              Dime Game: ${this.state.mode === 'ASK' ? 'Asking' : 'Saying No'}
            </h2>
            <p class="card-subtitle" style="font-weight: 600; color: var(--text-primary); margin-top: 0.2rem;">
              Scenario: ${this.state.situation}
            </p>
          </div>
        </div>

        <!-- Progress Bar -->
        <div style="margin-bottom: 1.5rem;">
          <div style="display: flex; justify-content: space-between; font-size: 0.75rem; color: var(--text-muted); margin-bottom: 0.3rem;">
            <span>Question ${this.state.step + 1} of 10</span>
            <span>${Math.round(progressPercent)}% completed</span>
          </div>
          <div style="width: 100%; height: 6px; background: var(--border-color); border-radius: var(--radius-full); overflow: hidden;">
            <div style="width: ${progressPercent}%; height: 100%; background: linear-gradient(90deg, var(--accent-purple), var(--accent-blue)); border-radius: var(--radius-full); transition: width 0.3s ease;"></div>
          </div>
        </div>

        <!-- Question Box -->
        <div style="background: var(--bg-secondary); border: 1.5px solid var(--border-color); padding: 1.5rem; border-radius: var(--radius-lg); text-align: center; margin-bottom: 1.5rem;">
          <p style="font-size: 1.1rem; font-weight: 600; line-height: 1.5; color: var(--text-primary); margin: 0;">
            ${q.text}
          </p>
        </div>

        <!-- Yes / No Buttons -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.5rem;">
          <button type="button" class="btn" id="btn-dime-yes" style="padding: 1.2rem; font-size: 1.1rem; font-weight: 700; border: 1.5px solid var(--accent-purple); color: var(--accent-purple); background: var(--accent-purple-light); border-radius: var(--radius-md); justify-content: center; cursor: pointer;">
            👍 YES (+10¢)
          </button>
          <button type="button" class="btn" id="btn-dime-no" style="padding: 1.2rem; font-size: 1.1rem; font-weight: 700; border: 1.5px solid var(--border-color); color: var(--text-secondary); background: transparent; border-radius: var(--radius-md); justify-content: center; cursor: pointer;">
            👎 NO (0¢)
          </button>
        </div>

        <!-- Bottom Controls -->
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <button type="button" class="btn btn-secondary" id="btn-dime-back" style="padding: 0.5rem 1rem;">
            ⬅️ Back
          </button>
          <span style="font-size: 0.75rem; color: var(--text-muted);">Results are calculated at completion</span>
        </div>
      `;

      content.querySelector('#btn-dime-yes').addEventListener('click', () => {
        this.state.answers[this.state.step] = 1;
        this.state.step++;
        this.renderCurrentStep(container);
      });

      content.querySelector('#btn-dime-no').addEventListener('click', () => {
        this.state.answers[this.state.step] = 0;
        this.state.step++;
        this.renderCurrentStep(container);
      });

      content.querySelector('#btn-dime-back').addEventListener('click', () => {
        if (this.state.step === 0) {
          this.state.step = -1;
        } else {
          this.state.step--;
        }
        this.renderCurrentStep(container);
      });

    } else if (this.state.step === 10) {
      // Step 10: Results View
      let score = 0;
      this.state.answers.forEach(a => score += (a || 0));
      const totalDollars = (score * 0.10).toFixed(2);
      const recText = this.getRecommendation(this.state.mode, score);

      content.innerHTML = `
        <div class="card-header" style="margin-bottom: 1.25rem;">
          <div>
            <h2 class="card-title">
              <span class="badge badge-blue">Dime Game Calculator</span>
              Your Intensity Recommendation
            </h2>
            <p class="card-subtitle"><strong>Scenario:</strong> ${this.state.situation} (${this.state.mode === 'ASK' ? 'Asking' : 'Saying No'})</p>
          </div>
        </div>

        <!-- Result Box -->
        <div style="background: linear-gradient(135deg, var(--accent-purple-light), var(--accent-blue-light)); border: 1.5px solid var(--accent-purple); padding: 1.5rem; border-radius: var(--radius-lg); text-align: center; margin-bottom: 1.25rem;">
          <h3 style="font-size: 0.95rem; color: var(--text-secondary); margin: 0; text-transform: uppercase; letter-spacing: 0.05em;">Dimes Collected</h3>
          <div style="font-size: 2.5rem; font-weight: 800; color: var(--accent-purple); margin: 0.4rem 0;">
            $${totalDollars} (${score} Dimes)
          </div>
          <div style="font-size: 1.05rem; font-weight: 700; color: var(--text-primary); line-height: 1.4;">
            ${recText}
          </div>
        </div>

        <!-- Answer Summary List (Collapsible) -->
        <details style="margin-bottom: 1.25rem; background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 0.5rem 0.75rem;">
          <summary style="font-size: 0.85rem; font-weight: 600; color: var(--text-secondary); cursor: pointer; user-select: none;">
            📋 View Question Responses Summary
          </summary>
          <div style="margin-top: 0.5rem; display: flex; flex-direction: column; gap: 0.35rem; font-size: 0.8rem; line-height: 1.3;">
            ${this.phrasings[this.state.mode].map((q, idx) => `
              <div style="display: flex; justify-content: space-between; border-bottom: 1px solid var(--border-color); padding-bottom: 0.2rem;">
                <span style="color: var(--text-muted); padding-right: 0.5rem;">${q.text.split(': ')[0]}</span>
                <strong style="color: ${this.state.answers[idx] === 1 ? 'var(--accent-purple)' : 'var(--text-muted)'};">
                  ${this.state.answers[idx] === 1 ? 'YES (+10¢)' : 'NO (0¢)'}
                </strong>
              </div>
            `).join('')}
          </div>
        </details>

        <!-- Actions -->
        <div style="display: flex; gap: 0.5rem; justify-content: space-between; margin-bottom: 1.5rem; border-bottom: 1px solid var(--border-color); padding-bottom: 1rem;">
          <button type="button" class="btn btn-secondary" id="btn-dime-restart" style="padding: 0.5rem 1rem;">🔄 Restart</button>
          <div style="display: flex; gap: 0.5rem;">
            <button type="button" class="btn btn-secondary" id="btn-copy-dime">📋 Copy</button>
            <button type="button" class="btn btn-primary" id="btn-save-dime">💾 Save Log</button>
          </div>
        </div>

        <!-- AI Coach Container -->
        <div style="background: rgba(192, 132, 252, 0.05); border: 1px solid var(--accent-purple); border-radius: var(--radius-lg); padding: 1.25rem; margin-top: 1rem;">
          <h3 style="font-size: 1rem; font-weight: 700; color: var(--accent-purple); margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.4rem;">
            🤖 Practice with DBT AI Coach
          </h3>
          <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1rem;">
            Review your answers, brainstorm how to talk to the other person, or roleplay the interaction.
          </p>

          <div id="dime-ai-chat-thread" style="display: flex; flex-direction: column; gap: 0.75rem; margin-bottom: 1rem; max-height: 250px; overflow-y: auto; padding-right: 0.25rem;"></div>

          <button type="button" class="btn btn-secondary" id="btn-dime-ai-coach" style="width: 100%;">
            💬 Get Help from AI Coach
          </button>

          <div id="dime-ai-chat-input-container" style="display: none; gap: 0.5rem; margin-top: 0.5rem;">
            <input type="text" id="dime-ai-chat-input" class="form-control" placeholder="Type your message to AI Coach..." style="flex: 1;">
            <button type="button" class="btn btn-primary" id="btn-dime-ai-send" style="padding: 0 1.25rem;">Send</button>
          </div>
        </div>
      `;

      content.querySelector('#btn-dime-restart').addEventListener('click', () => {
        this.state = {
          step: -1,
          mode: 'ASK',
          situation: '',
          answers: Array(10).fill(null),
          chatHistory: []
        };
        this.renderCurrentStep(container);
      });

      content.querySelector('#btn-save-dime').addEventListener('click', async () => {
        const data = this.getSaveData();
        await db.saveWorksheet({ type: 'dime_game', title: `Dime Game: ${this.state.situation}`, data });
        alert('Dime Game calculation saved!');
      });

      content.querySelector('#btn-copy-dime').addEventListener('click', () => {
        const data = this.getSaveData();
        Exports.copyForPortal('Dime Game Calculator', new Date(), data);
      });

      this.setupDimeAICoach(container, totalDollars, recText);
    }
  },

  setupDimeAICoach(container, totalDollars, recText) {
    const btnCoach = container.querySelector('#btn-dime-ai-coach');
    const thread = container.querySelector('#dime-ai-chat-thread');
    const inputContainer = container.querySelector('#dime-ai-chat-input-container');
    const inputField = container.querySelector('#dime-ai-chat-input');
    const btnSend = container.querySelector('#btn-dime-ai-send');

    if (!btnCoach || !thread || !inputContainer || !inputField || !btnSend) return;

    const parseMarkdown = (text) => {
      return text.replace(/^### (.*$)/gim, '<h3>$1</h3>')
                 .replace(/^## (.*$)/gim, '<h2>$1</h2>')
                 .replace(/^# (.*$)/gim, '<h1>$1</h1>')
                 .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
                 .replace(/\*(.*)\*/gim, '<em>$1</em>')
                 .replace(/^\* (.*$)/gim, '<ul><li>$1</li></ul>')
                 .replace(/<\/ul>\n<ul>/gim, '')
                 .replace(/\n/g, '<br>');
    };

    const appendMessage = (role, text) => {
      const msgDiv = document.createElement('div');
      msgDiv.style.padding = '0.75rem';
      msgDiv.style.borderRadius = 'var(--radius-md)';
      msgDiv.style.fontSize = '0.9rem';
      if (role === 'user') {
        msgDiv.style.background = 'var(--bg-secondary)';
        msgDiv.style.alignSelf = 'flex-end';
        msgDiv.style.border = '1px solid var(--border-color)';
        msgDiv.innerHTML = '<strong>You:</strong><br>' + text;
      } else {
        msgDiv.style.background = 'rgba(156, 39, 176, 0.1)';
        msgDiv.style.alignSelf = 'flex-start';
        msgDiv.style.border = '1px solid rgba(156, 39, 176, 0.2)';
        msgDiv.innerHTML = '<strong>🤖 AI Coach:</strong><br>' + parseMarkdown(text);
      }
      thread.appendChild(msgDiv);
      thread.scrollTop = thread.scrollHeight;
    };

    const callAI = async (userMessage) => {
      const aiEnabled = localStorage.getItem('ai_enabled') === 'true';
      const aiKey = localStorage.getItem('ai_gemini_key');
      
      if (!aiEnabled || !aiKey) {
        alert("Please enable the AI Coach and set your Google Gemini API Key in settings (🤖) to use this feature.");
        const settingsBtn = document.getElementById('btn-open-ai-settings');
        if (settingsBtn) settingsBtn.click();
        return;
      }

      const crisisKeywords = ['suicide', 'self-harm', 'kill myself', 'die'];
      const msgLower = userMessage.toLowerCase();
      if (crisisKeywords.some(kw => msgLower.includes(kw))) {
        appendMessage('assistant', "⚠️ **Safety Warning:** It sounds like you might be in crisis. Please call 988 or contact your therapist for Phone Coaching.");
        return;
      }

      btnCoach.disabled = true;
      btnSend.disabled = true;
      inputField.disabled = true;
      const loadingId = 'loading-dime-' + Date.now();
      const loadingDiv = document.createElement('div');
      loadingDiv.id = loadingId;
      loadingDiv.style.padding = '0.75rem';
      loadingDiv.innerHTML = '<em>🤖 AI Coach is typing...</em>';
      thread.appendChild(loadingDiv);
      thread.scrollTop = thread.scrollHeight;

      try {
        const formData = this.getSaveData();
        const historyArray = this.state.chatHistory;
        
        historyArray.push({ role: 'user', parts: [{ text: userMessage }] });

        const systemPrompt = "You are a warm, non-judgmental, logical DBT AI Coach. The user has completed the Dime Game Calculator (Worksheet 5) to decide how strongly to ask for something or say no in a specific scenario. Their scenario: \"" + this.state.situation + "\". Mode: " + (this.state.mode === 'ASK' ? 'Asking' : 'Saying No') + ". Result: " + totalDollars + " (" + recText + "). Answer their questions, validate their feelings, help them build a communication plan, and ensure clinical safety. Keep responses concise.";
        
        const payload = {
          systemInstruction: { parts: [{ text: systemPrompt }] },
          contents: [
            {
              role: 'user',
              parts: [{ text: "Here is my current worksheet data:\n" + JSON.stringify(formData, null, 2) }]
            },
            ...historyArray
          ]
        };

        const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${aiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        const data = await res.json();
        
        if (data.error) {
          throw new Error(data.error.message);
        }

        const aiResponse = data.candidates[0].content.parts[0].text;
        historyArray.push({ role: 'model', parts: [{ text: aiResponse }] });
        
        document.getElementById(loadingId).remove();
        appendMessage('assistant', aiResponse);
        
        inputContainer.style.display = 'flex';
        btnCoach.style.display = 'none';
        inputField.value = '';
        inputField.focus();

      } catch (err) {
        document.getElementById(loadingId).remove();
        appendMessage('assistant', "Error connecting to AI Coach: " + err.message);
      } finally {
        btnCoach.disabled = false;
        btnSend.disabled = false;
        inputField.disabled = false;
      }
    };

    btnCoach.addEventListener('click', () => {
      const msg = "Can you review my Dime Game answers and help me plan my request / response?";
      appendMessage('user', msg);
      callAI(msg);
    });

    btnSend.addEventListener('click', () => {
      const val = inputField.value.trim();
      if (!val) return;
      appendMessage('user', val);
      callAI(val);
    });
    
    inputField.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        btnSend.click();
      }
    });
  },

  getRecommendation(mode, score) {
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
    return `Recommendation: ${rec}`;
  },

  getSaveData() {
    let score = 0;
    this.state.answers.forEach(a => score += (a || 0));
    const totalDollars = (score * 0.10).toFixed(2);
    const rec = this.getRecommendation(this.state.mode, score);

    const data = {
      'Mode': this.state.mode === 'ASK' ? 'Asking for something' : 'Saying NO to a request',
      'Situation': this.state.situation,
      'Dime Score': `$${totalDollars} (${score} Dimes)`,
      'Recommendation': rec
    };

    // Add individual question responses to data log
    this.phrasings[this.state.mode].forEach((q, idx) => {
      const title = q.text.split(': ')[0];
      data[title] = this.state.answers[idx] === 1 ? 'YES (+10¢)' : 'NO (0¢)';
    });

    return data;
  }
};
