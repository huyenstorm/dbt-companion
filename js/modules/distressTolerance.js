/* Emergency Distress Tolerance Deck & Visual TIPP Breathing Pacer */

export const DistressToleranceModule = {
  render(container) {
    container.innerHTML = `
      <div class="card" style="border: 2px solid var(--accent-rose);">
        <div class="card-header">
          <div>
            <h2 class="card-title" style="color: var(--accent-rose);">
              🚨 Emergency TIPP & Distress Reset
            </h2>
            <p class="card-subtitle">Use when emotional distress is 7+ out of 10 to instantly down-regulate the nervous system.</p>
          </div>
        </div>

        <div class="grid-2" style="margin-bottom: 1rem;">
          <!-- TIPP Checklist -->
          <div style="background: var(--bg-secondary); padding: 1rem; border-radius: var(--radius-md); border: 1px solid var(--border-color);">
            <h3 style="font-size: 1rem; color: var(--accent-rose); margin-bottom: 0.5rem;">T.I.P.P. Skills</h3>
            <ul style="padding-left: 1rem; font-size: 0.85rem; line-height: 1.6; color: var(--text-secondary);">
              <li><strong>T - Temperature:</strong> Splash cold ice water on face or hold ice cube (triggers mammalian dive reflex).</li>
              <li><strong>I - Intense Exercise:</strong> 60-90 seconds of high intensity jumping jacks, sprinting, or wall-sit (burns off fight-or-flight adrenaline).</li>
              <li><strong>P - Paced Breathing:</strong> 4 sec inhale, 7 sec hold, 8 sec slow exhale.</li>
              <li><strong>P - Paired Muscle Relaxation:</strong> Tense muscle groups for 5s, release completely while breathing out.</li>
            </ul>
          </div>

          <!-- Animated Paced Breathing Timer -->
          <div style="background: var(--bg-secondary); padding: 1rem; border-radius: var(--radius-md); border: 1px solid var(--border-color); text-align: center; display: flex; flex-direction: column; align-items: center; justify-content: center;">
            <h3 style="font-size: 1rem; color: var(--accent-teal); margin-bottom: 0.5rem;">Visual Breath Pacer (4-7-8)</h3>
            <div id="breath-circle" style="width: 110px; height: 110px; border-radius: 50%; background: linear-gradient(135deg, var(--accent-teal), var(--accent-blue)); display: flex; align-items: center; justify-content: center; color: #fff; font-weight: 700; font-size: 1.1rem; box-shadow: 0 0 20px rgba(20, 184, 166, 0.4); transition: transform 4s ease-in-out; margin: 0.5rem 0;">
              Ready
            </div>
            <div id="breath-instruction" style="font-size: 0.9rem; font-weight: 600; color: var(--text-primary); margin-bottom: 0.5rem;">Click Start for Paced Breathing</div>
            <button class="btn btn-success" id="btn-toggle-breath">▶ Start Paced Breath</button>
          </div>
        </div>
      </div>

      <div class="grid-2">
        <!-- STOP Skill -->
        <div class="card">
          <h3 class="card-title" style="color: var(--accent-amber); margin-bottom: 0.5rem;">🛑 STOP Skill Circuit Breaker</h3>
          <ul style="padding-left: 1.2rem; font-size: 0.85rem; color: var(--text-secondary); line-height: 1.6;">
            <li><strong>S - Stop!</strong> Freeze! Do not react, speak, or send that text.</li>
            <li><strong>T - Take a step back.</strong> Unclench jaw, drop shoulders, take a deep breath.</li>
            <li><strong>O - Observe.</strong> What are the facts? What are my body sensations?</li>
            <li><strong>P - Proceed Mindfully.</strong> Ask Wise Mind: What will make this situation better, not worse?</li>
          </ul>
        </div>

        <!-- Self-Soothe 5 Senses -->
        <div class="card">
          <h3 class="card-title" style="color: var(--accent-teal); margin-bottom: 0.5rem;">🌿 Self-Soothe (5 Senses)</h3>
          <div style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.6;">
            <p>👁️ <strong>Vision:</strong> Look at triathlon medals, outdoor scenery, nature photo.</p>
            <p>🎧 <strong>Hearing:</strong> Soothing music, calm ocean waves audio.</p>
            <p>👃 <strong>Smell:</strong> Lavender essential oil, coffee beans.</p>
            <p>☕ <strong>Taste:</strong> Warm tea, dark chocolate slowly melting.</p>
            <p>🤲 <strong>Touch:</strong> Weighted blanket, warm shower, soft hoodie.</p>
          </div>
        </div>
      </div>
    `;

    this.attachEvents(container);
  },

  attachEvents(container) {
    let breathingInterval = null;
    let isBreathing = false;
    const circle = container.querySelector('#breath-circle');
    const instruction = container.querySelector('#breath-instruction');
    const btn = container.querySelector('#btn-toggle-breath');

    btn.addEventListener('click', () => {
      if (isBreathing) {
        clearInterval(breathingInterval);
        isBreathing = false;
        btn.innerText = '▶ Start Paced Breath';
        instruction.innerText = 'Click Start for Paced Breathing';
        circle.style.transform = 'scale(1)';
        circle.innerText = 'Ready';
      } else {
        isBreathing = true;
        btn.innerText = '⏹️ Stop Breathing';
        this.runBreathCycle(circle, instruction);
        breathingInterval = setInterval(() => {
          this.runBreathCycle(circle, instruction);
        }, 19000); // 4 + 7 + 8 = 19 sec total cycle
      }
    });
  },

  runBreathCycle(circle, instruction) {
    // Inhale 4s
    instruction.innerText = '🌬️ Inhale deeply through nose... (4s)';
    circle.style.transition = 'transform 4s ease-in-out';
    circle.style.transform = 'scale(1.4)';
    circle.innerText = 'Inhale';

    // Hold 7s
    setTimeout(() => {
      instruction.innerText = '⏸️ Hold breath gently... (7s)';
      circle.style.transition = 'none';
      circle.innerText = 'Hold';
    }, 4000);

    // Exhale 8s
    setTimeout(() => {
      instruction.innerText = '💨 Slow exhale through mouth... (8s)';
      circle.style.transition = 'transform 8s ease-in-out';
      circle.style.transform = 'scale(1)';
      circle.innerText = 'Exhale';
    }, 11000);
  }
};
