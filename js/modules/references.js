/* Comprehensive References & Custom Handouts Module */

export const ReferencesModule = {
  render(container) {
    container.innerHTML = `
      <div class="card">
        <div class="card-header">
          <div>
            <h2 class="card-title">
              <span class="badge badge-purple">DBT Reference Library</span>
              Emotions Dictionary & Custom Program Handouts
            </h2>
            <p class="card-subtitle">Comprehensive reference guide for Marsha Linehan's primary emotions, Sleep Hygiene protocol, and the I'M SORRY skill.</p>
          </div>
        </div>

        <div class="nav-tabs" style="background: transparent; border-bottom: 1px solid var(--border-color); margin-bottom: 1.25rem;">
          <button class="tab-btn active" data-reftab="ref-emotions">📖 Emotion Reference Dictionary</button>
          <button class="tab-btn" data-reftab="ref-sleep">🌙 Sleep Hygiene Protocol</button>
          <button class="tab-btn" data-reftab="ref-sorry">🤝 The "I'M SORRY" Skill</button>
        </div>

        <!-- Emotion Dictionary -->
        <div class="reftab-content active" id="ref-emotions">
          <div class="grid-2">
            <div style="background: var(--bg-secondary); padding: 1rem; border-radius: var(--radius-md); border: 1px solid var(--border-color);">
              <h3 style="color: var(--accent-purple); font-size: 1rem; margin-bottom: 0.5rem;">⚡ FEAR / ANXIETY</h3>
              <p style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 0.4rem;"><strong>Function:</strong> Protects from danger/threat.</p>
              <p style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 0.4rem;"><strong>Prompt Events:</strong> Threat to life/health, unknown situation, loss of control.</p>
              <p style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 0.4rem;"><strong>Body Reaction:</strong> Fast heart rate, shortness of breath, tight chest, cold sweat.</p>
              <p style="font-size: 0.85rem; color: var(--text-secondary);"><strong>Action Urges:</strong> Run away, avoid, freeze, hide.</p>
            </div>

            <div style="background: var(--bg-secondary); padding: 1rem; border-radius: var(--radius-md); border: 1px solid var(--border-color);">
              <h3 style="color: var(--accent-rose); font-size: 1rem; margin-bottom: 0.5rem;">🔥 ANGER / FRUSTRATION</h3>
              <p style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 0.4rem;"><strong>Function:</strong> Protects boundaries, overcomes obstacles.</p>
              <p style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 0.4rem;"><strong>Prompt Events:</strong> Boundary violation, goal blocked, unfair treatment.</p>
              <p style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 0.4rem;"><strong>Body Reaction:</strong> Body heat, clenched jaw/fists, tight stomach.</p>
              <p style="font-size: 0.85rem; color: var(--text-secondary);"><strong>Action Urges:</strong> Attack, yell, slam doors, criticize.</p>
            </div>

            <div style="background: var(--bg-secondary); padding: 1rem; border-radius: var(--radius-md); border: 1px solid var(--border-color);">
              <h3 style="color: var(--accent-blue); font-size: 1rem; margin-bottom: 0.5rem;">🌧️ SADNESS / GRIEF</h3>
              <p style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 0.4rem;"><strong>Function:</strong> Signals need for support, communicates loss.</p>
              <p style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 0.4rem;"><strong>Prompt Events:</strong> Loss of loved one, goal failure, rejection.</p>
              <p style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 0.4rem;"><strong>Body Reaction:</strong> Heavy chest, low energy, tears, lethargy.</p>
              <p style="font-size: 0.85rem; color: var(--text-secondary);"><strong>Action Urges:</strong> Withdraw, cry, isolate, lie down.</p>
            </div>

            <div style="background: var(--bg-secondary); padding: 1rem; border-radius: var(--radius-md); border: 1px solid var(--border-color);">
              <h3 style="color: var(--accent-amber); font-size: 1rem; margin-bottom: 0.5rem;">😳 SHAME / GUILT</h3>
              <p style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 0.4rem;"><strong>Function:</strong> Maintains social connection & moral values.</p>
              <p style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 0.4rem;"><strong>Prompt Events:</strong> Public failure, violating own values or group rules.</p>
              <p style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 0.4rem;"><strong>Body Reaction:</strong> Blushing, wanting to shrink, stomach knot.</p>
              <p style="font-size: 0.85rem; color: var(--text-secondary);"><strong>Action Urges:</strong> Hide face, apologize repeatedly, isolate.</p>
            </div>
          </div>
        </div>

        <!-- Sleep Hygiene Protocol -->
        <div class="reftab-content" id="ref-sleep" style="display: none;">
          <div style="background: var(--bg-secondary); padding: 1.25rem; border-radius: var(--radius-md); border: 1px solid var(--border-color);">
            <h3 style="color: var(--accent-teal); font-size: 1.1rem; margin-bottom: 0.75rem;">🌙 Program Sleep Hygiene Protocol</h3>
            <ul style="padding-left: 1.2rem; font-size: 0.9rem; color: var(--text-secondary); line-height: 1.7;">
              <li><strong>Fixed Sleep & Wake Times:</strong> Go to bed and wake up at the exact same times daily (critical for ADHD & Ironman recovery).</li>
              <li><strong>Bed Is For Sleep Only:</strong> No working, worrying, or arguing in bed. If awake for >20 mins, get up and sit in dim light until sleepy.</li>
              <li><strong>60-Min Wind-Down Buffer:</strong> Turn off work emails, phone screens, and high-intensity input 1 hour before bed.</li>
              <li><strong>Sensory Environment:</strong> Keep bedroom cool (65–68°F), pitch dark, and use white noise/earplugs.</li>
              <li><strong>Caffeine & Training Cutoffs:</strong> No caffeine after 12:00 PM. Complete high-intensity workouts at least 3 hours before bed.</li>
            </ul>
          </div>
        </div>

        <!-- I'M SORRY Skill -->
        <div class="reftab-content" id="ref-sorry" style="display: none;">
          <div style="background: var(--bg-secondary); padding: 1.25rem; border-radius: var(--radius-md); border: 1px solid var(--border-color);">
            <h3 style="color: var(--accent-purple); font-size: 1.1rem; margin-bottom: 0.75rem;">🤝 The "I'M SORRY" Skill Framework</h3>
            <p style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 1rem;">Effective, non-defensive apology framework when you have crossed a boundary or reacted out of emotion:</p>
            <ol style="padding-left: 1.2rem; font-size: 0.9rem; color: var(--text-secondary); line-height: 1.8;">
              <li><strong>I - Identify Impact:</strong> Acknowledge the exact impact your behavior had on the other person without making excuses.</li>
              <li><strong>M - Make No Excuses:</strong> Avoid saying "I'm sorry, BUT..." Own the action fully.</li>
              <li><strong>S - State Genuine Regret:</strong> Express authentic remorse for the distress caused.</li>
              <li><strong>O - Offer Repair:</strong> Ask or suggest how to make things right.</li>
              <li><strong>R - Recommit to Boundaries:</strong> State what steps you are taking to prevent a repeat.</li>
              <li><strong>Y - Yield & Listen:</strong> Give the other person space to respond without becoming defensive.</li>
            </ol>
          </div>
        </div>
      </div>
    `;

    this.attachEvents(container);
  },

  attachEvents(container) {
    const tabs = container.querySelectorAll('.tab-btn');
    const contents = container.querySelectorAll('.reftab-content');

    tabs.forEach(t => {
      t.addEventListener('click', () => {
        tabs.forEach(x => x.classList.remove('active'));
        contents.forEach(x => x.style.display = 'none');
        t.classList.add('active');
        const target = container.querySelector('#' + t.dataset.reftab);
        if (target) target.style.display = 'block';
      });
    });
  }
};
