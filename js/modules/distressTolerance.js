/* Emergency Distress Tolerance Deck, Breath Pacer, and Interactive Checklists (Handouts 7, 8, 9) */

export const DistressToleranceModule = {
  render(container) {
    container.innerHTML = `
      <!-- TIPP Emergency Pacer Section -->
      <div class="card" style="border: 2px solid var(--accent-rose);">
        <div class="card-header">
          <div>
            <h2 class="card-title" style="color: var(--accent-rose);">
              🚨 Emergency TIPP & Paced Breath Pacer
            </h2>
            <p class="card-subtitle">Use cold temperature, intense physical exercise, or paced breathing to immediately calm the nervous system.</p>
          </div>
        </div>

        <div class="grid-2">
          <!-- TIPP Guide -->
          <div style="background: var(--bg-secondary); padding: 1rem; border-radius: var(--radius-md); border: 1px solid var(--border-color); font-size: 0.85rem;">
            <strong style="color: var(--accent-rose); display: block; margin-bottom: 0.4rem;">T.I.P.P. Quick Steps:</strong>
            <p style="margin-bottom: 0.3rem;">💧 <strong>Temperature:</strong> Put ice cold water or ice pack on eyes/cheeks for 30s.</p>
            <p style="margin-bottom: 0.3rem;">🏃 <strong>Intense Exercise:</strong> 90s of jumping jacks or sprints (ideal for triathlon training energy!).</p>
            <p style="margin-bottom: 0.3rem;">💨 <strong>Paced Breathing:</strong> Breathe deep, making exhales longer than inhales.</p>
            <p style="margin-bottom: 0.3rem;">💪 <strong>Paired Muscle Relaxation:</strong> Tense muscle groups during inhale, release completely on exhale.</p>
          </div>

          <!-- Animated Pacer -->
          <div style="background: var(--bg-secondary); padding: 1rem; border-radius: var(--radius-md); border: 1px solid var(--border-color); text-align: center; display: flex; flex-direction: column; align-items: center; justify-content: center;">
            <div id="breath-circle" style="width: 100px; height: 100px; border-radius: 50%; background: linear-gradient(135deg, var(--accent-teal), var(--accent-blue)); display: flex; align-items: center; justify-content: center; color: #fff; font-weight: 700; font-size: 1.1rem; box-shadow: 0 0 20px rgba(20, 184, 166, 0.4); transition: transform 4s ease-in-out; margin-bottom: 0.5rem;">
              Ready
            </div>
            <div id="breath-instruction" style="font-size: 0.85rem; font-weight: 600; color: var(--text-primary); margin-bottom: 0.4rem;">Click Start for 4-7-8 Breathing</div>
            <button class="btn btn-success" id="btn-toggle-breath" style="padding: 0.4rem 0.8rem; font-size: 0.8rem;">▶ Start Paced Breath</button>
          </div>
        </div>
      </div>

      <!-- Interactive Handouts 7, 8, 9 Checklists -->
      <div class="card">
        <div class="card-header">
          <div>
            <h2 class="card-title">
              <span class="badge badge-purple">Distress Tolerance Handouts</span>
              ACCEPTS, Self-Soothe & IMPROVE Checklists
            </h2>
            <p class="card-subtitle">Select a skill deck and check off items in the moment to ground yourself and tolerate distress.</p>
          </div>
        </div>

        <div class="nav-tabs" style="background: transparent; border-bottom: 1px solid var(--border-color); margin-bottom: 1.25rem;">
          <button class="tab-btn active" data-dt="dt-accepts">🛡️ ACCEPTS (Handout 7)</button>
          <button class="tab-btn" data-dt="dt-soothe">🌿 Self-Soothe (Handout 8)</button>
          <button class="tab-btn" data-dt="dt-improve">✨ IMPROVE (Handout 9)</button>
          <button class="tab-btn" data-dt="ref-dt-stop">🛑 STOP (Handout 4)</button>
          <button class="tab-btn" data-dt="ref-dt-radical">👐 Radical Acceptance (Handout 9)</button>
        </div>

        <!-- ACCEPTS (Handout 7) -->
        <div class="dt-content active" id="dt-accepts">
          <p style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 1rem; font-style: italic;">
            Wise Mind ACCEPTS - Check off activities to distract your mind from distress:
          </p>
          <div class="grid-2" style="font-size: 0.8rem; line-height: 1.6;">
            <div>
              <strong style="color: var(--accent-purple); display: block; margin-top: 0.5rem;">A - Activities</strong>
              <label style="display:block;"><input type="checkbox"> Focus attention on a task needed to get done</label>
              <label style="display:block;"><input type="checkbox"> Clean a room in your house</label>
              <label style="display:block;"><input type="checkbox"> Play computer games / Go walking / Exercise</label>
              <label style="display:block;"><input type="checkbox"> Surf the Internet / Write e-mails</label>
              <label style="display:block;"><input type="checkbox"> Spend time with your children</label>
              <label style="display:block;"><input type="checkbox"> Do crossword puzzles or Sudoku</label>

              <strong style="color: var(--accent-purple); display: block; margin-top: 0.5rem;">C - Contributing</strong>
              <label style="display:block;"><input type="checkbox"> Help a friend or family member</label>
              <label style="display:block;"><input type="checkbox"> Surprise someone with something nice (card, favor)</label>
              <label style="display:block;"><input type="checkbox"> Call or send an instant message encouraging someone</label>

              <strong style="color: var(--accent-purple); display: block; margin-top: 0.5rem;">C - Comparisons</strong>
              <label style="display:block;"><input type="checkbox"> Compare how you are feeling now to when you felt different</label>
              <label style="display:block;"><input type="checkbox"> Think about people coping the same as you or less well</label>
            </div>
            <div>
              <strong style="color: var(--accent-purple); display: block; margin-top: 0.5rem;">E - Emotions</strong>
              <label style="display:block;"><input type="checkbox"> Read emotional books or stories</label>
              <label style="display:block;"><input type="checkbox"> Watch emotional TV shows or movies</label>
              <label style="display:block;"><input type="checkbox"> Listen to emotional music (that creates different emotions)</label>

              <strong style="color: var(--accent-purple); display: block; margin-top: 0.5rem;">P - Pushing away</strong>
              <label style="display:block;"><input type="checkbox"> Push the situation away by leaving it for a while</label>
              <label style="display:block;"><input type="checkbox"> Build an imaginary wall between yourself and situation</label>
              <label style="display:block;"><input type="checkbox"> Put the pain on a shelf. Box it up and put it away</label>

              <strong style="color: var(--accent-purple); display: block; margin-top: 0.5rem;">T - Thoughts</strong>
              <label style="display:block;"><input type="checkbox"> Count to 10; count colors in a painting or out window</label>
              <label style="display:block;"><input type="checkbox"> Work puzzles / Watch TV or read</label>

              <strong style="color: var(--accent-purple); display: block; margin-top: 0.5rem;">S - Sensations</strong>
              <label style="display:block;"><input type="checkbox"> Squeeze a rubber ball very hard</label>
              <label style="display:block;"><input type="checkbox"> Hold ice in your hand or mouth</label>
              <label style="display:block;"><input type="checkbox"> Take a hot or cold shower</label>
            </div>
          </div>
        </div>

        <!-- Self-Soothe (Handout 8) -->
        <div class="dt-content" id="dt-soothe" style="display: none;">
          <p style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 1rem; font-style: italic;">
            Soothe each of your Five Senses to bring calm:
          </p>
          <div class="grid-2" style="font-size: 0.8rem; line-height: 1.6;">
            <div>
              <strong style="color: var(--accent-teal); display: block; margin-top: 0.5rem;">👁️ Vision</strong>
              <label style="display:block;"><input type="checkbox"> Look at the stars at night / Look at nature around you</label>
              <label style="display:block;"><input type="checkbox"> Make one space in a room pleasing to look at</label>
              <label style="display:block;"><input type="checkbox"> Light a candle and watch the flame</label>
              <label style="display:block;"><input type="checkbox"> Go to a museum or watch a sunrise/sunset</label>

              <strong style="color: var(--accent-teal); display: block; margin-top: 0.5rem;">🎧 Hearing</strong>
              <label style="display:block;"><input type="checkbox"> Listen to soothing or invigorating music</label>
              <label style="display:block;"><input type="checkbox"> Pay attention to sounds of nature (waves, birds, rain)</label>
              <label style="display:block;"><input type="checkbox"> Hum a soothing tune or play an instrument</label>

              <strong style="color: var(--accent-teal); display: block; margin-top: 0.5rem;">👃 Smell</strong>
              <label style="display:block;"><input type="checkbox"> Use favorite soap, shampoo, lotion, or perfume</label>
              <label style="display:block;"><input type="checkbox"> Burn incense or light a scented candle</label>
              <label style="display:block;"><input type="checkbox"> Smell flowers or walk in a wooded area</label>
            </div>
            <div>
              <strong style="color: var(--accent-teal); display: block; margin-top: 0.5rem;">☕ Taste</strong>
              <label style="display:block;"><input type="checkbox"> Eat some of your favorite foods mindfully</label>
              <label style="display:block;"><input type="checkbox"> Drink favorite soothing warm drink (herbal tea, hot cocoa)</label>
              <label style="display:block;"><input type="checkbox"> Suck on a piece of peppermint candy or chew gum</label>
              <label style="display:block;"><input type="checkbox"> Really taste the food you eat. Eat one thing mindfully</label>

              <strong style="color: var(--accent-teal); display: block; margin-top: 0.5rem;">🤲 Touch</strong>
              <label style="display:block;"><input type="checkbox"> Take a long hot bath or shower</label>
              <label style="display:block;"><input type="checkbox"> Pet your dog or cat / Have a massage</label>
              <label style="display:block;"><input type="checkbox"> Put a cold compress on your forehead</label>
              <label style="display:block;"><input type="checkbox"> Put clean sheets on the bed / Wrap up in a blanket</label>
              <label style="display:block;"><input type="checkbox"> Put on a blouse or shirt that has a pleasant feel</label>
            </div>
          </div>
        </div>

        <!-- IMPROVE (Handout 9) -->
        <div class="dt-content" id="dt-improve" style="display: none;">
          <p style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 1rem; font-style: italic;">
            IMPROVE the Moment - Check off actions to replace immediate suffering with positive focus:
          </p>
          <div class="grid-2" style="font-size: 0.8rem; line-height: 1.6;">
            <div>
              <strong style="color: var(--accent-blue); display: block; margin-top: 0.5rem;">I - Imagery</strong>
              <label style="display:block;"><input type="checkbox"> Imagine very relaxing scenes</label>
              <label style="display:block;"><input type="checkbox"> Imagine a secret room within yourself where you are safe</label>
              <label style="display:block;"><input type="checkbox"> Imagine hurtful emotions draining out of you like water</label>

              <strong style="color: var(--accent-blue); display: block; margin-top: 0.5rem;">M - Meaning</strong>
              <label style="display:block;"><input type="checkbox"> Find purpose or meaning in a painful situation</label>
              <label style="display:block;"><input type="checkbox"> Focus on whatever positive aspects you can find</label>

              <strong style="color: var(--accent-blue); display: block; margin-top: 0.5rem;">P - Prayer</strong>
              <label style="display:block;"><input type="checkbox"> Open your heart to a supreme being, God, or your Wise Mind</label>
              <label style="display:block;"><input type="checkbox"> Ask for strength to bear the pain / Turn things over</label>

              <strong style="color: var(--accent-blue); display: block; margin-top: 0.5rem;">R - Relaxing actions</strong>
              <label style="display:block;"><input type="checkbox"> Take a hot bath or sit in a hot tub</label>
              <label style="display:block;"><input type="checkbox"> Drink hot milk / Massage neck and scalp</label>
              <label style="display:block;"><input type="checkbox"> Practice yoga or other stretching / Breathe deeply</label>
            </div>
            <div>
              <strong style="color: var(--accent-blue); display: block; margin-top: 0.5rem;">O - One thing in the moment</strong>
              <label style="display:block;"><input type="checkbox"> Focus your entire attention on just what you are doing</label>
              <label style="display:block;"><input type="checkbox"> Keep yourself in the present / Focus on physical sensations</label>

              <strong style="color: var(--accent-blue); display: block; margin-top: 0.5rem;">V - Vacation</strong>
              <label style="display:block;"><input type="checkbox"> Give yourself a brief vacation (get in bed, pull covers up)</label>
              <label style="display:block;"><input type="checkbox"> Go to the beach or woods for the day / Get a magazine</label>
              <label style="display:block;"><input type="checkbox"> Turn off your phone for a day / Take a 1-hour breather</label>

              <strong style="color: var(--accent-blue); display: block; margin-top: 0.5rem;">E - Encouragement</strong>
              <label style="display:block;"><input type="checkbox"> Cheerlead yourself: 'You go, girl! You can stand it!'</label>
              <label style="display:block;"><input type="checkbox"> 'I will make it out of this.' / 'I am doing the best I can.'</label>
              <label style="display:block;"><input type="checkbox"> 'This too shall pass.' / 'It won't last forever.'</label>
            </div>
          </div>
        </div>

        <!-- STOP Skill (Handout 4) -->
        <div class="dt-content" id="ref-dt-stop" style="display: none;">
          <p style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 1rem; font-style: italic;">
            STOP Skill - Keep from making a bad situation worse:
          </p>
          <div class="grid-2" style="font-size: 0.8rem; line-height: 1.6;">
            <div>
              <strong style="color: var(--accent-rose); display: block; margin-top: 0.5rem;">S - Stop</strong>
              <p>Do not just react. Stop! Freeze! Do not move a muscle. Your emotions may try to make you act without thinking. Stay in control!</p>

              <strong style="color: var(--accent-rose); display: block; margin-top: 0.5rem;">T - Take a step back</strong>
              <p>Take a step back from the situation. Take a break. Let go. Take a deep breath. Do not let your feelings make you act impulsively.</p>
            </div>
            <div>
              <strong style="color: var(--accent-rose); display: block; margin-top: 0.5rem;">O - Observe</strong>
              <p>Notice what is going on inside and outside you. What is the situation? What are your thoughts and feelings? What are others saying or doing?</p>

              <strong style="color: var(--accent-rose); display: block; margin-top: 0.5rem;">P - Proceed mindfully</strong>
              <p>Act with awareness. In deciding what to do, consider your thoughts and feelings, the situation, and other people's thoughts and feelings. Think about your goals.</p>
            </div>
          </div>
        </div>

        <!-- Radical Acceptance (Handout 9) -->
        <div class="dt-content" id="ref-dt-radical" style="display: none;">
          <p style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 1rem; font-style: italic;">
            Radical Acceptance - Let go of fighting reality:
          </p>
          <div class="grid-2" style="font-size: 0.8rem; line-height: 1.6;">
            <div>
              <strong style="color: var(--accent-purple); display: block; margin-top: 0.5rem;">Understand the basics</strong>
              <p>Figure out what you need to accept. Reality is what it is, and it cannot be changed right now.</p>
              <label style="display:block;"><input type="checkbox"> Rate acceptance 0-5</label>
              <label style="display:block;"><input type="checkbox"> Refine list</label>
            </div>
            <div>
              <strong style="color: var(--accent-purple); display: block; margin-top: 0.5rem;">Check off exercises:</strong>
              <label style="display:block;"><input type="checkbox"> Observe questioning</label>
              <label style="display:block;"><input type="checkbox"> Remind reality is what it is</label>
              <label style="display:block;"><input type="checkbox"> Allow disappointment</label>
              <label style="display:block;"><input type="checkbox"> Pros/Cons of accepting vs. rejecting</label>
              <label style="display:block;"><input type="checkbox"> Change posture</label>
              <label style="display:block;"><input type="checkbox"> Willing hands</label>
              <label style="display:block;"><input type="checkbox"> Half-smile</label>
            </div>
          </div>
        </div>
      </div>
    `;

    this.attachEvents(container);
  },

  attachEvents(container) {
    // Tab switching for checklists
    const tabs = container.querySelectorAll('.tab-btn');
    const contents = container.querySelectorAll('.dt-content');

    tabs.forEach(t => {
      t.addEventListener('click', () => {
        tabs.forEach(x => x.classList.remove('active'));
        contents.forEach(x => x.style.display = 'none');
        t.classList.add('active');
        const target = container.querySelector('#' + t.dataset.dt);
        if (target) target.style.display = 'block';
      });
    });

    // Paced breathing pacer toggle
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
        instruction.innerText = 'Click Start for 4-7-8 Breathing';
        circle.style.transform = 'scale(1)';
        circle.innerText = 'Ready';
      } else {
        isBreathing = true;
        btn.innerText = '⏹️ Stop Breathing';
        this.runBreathCycle(circle, instruction);
        breathingInterval = setInterval(() => {
          this.runBreathCycle(circle, instruction);
        }, 19000);
      }
    });
  },

  runBreathCycle(circle, instruction) {
    instruction.innerText = '🌬️ Inhale deeply through nose... (4s)';
    circle.style.transition = 'transform 4s ease-in-out';
    circle.style.transform = 'scale(1.4)';
    circle.innerText = 'Inhale';

    setTimeout(() => {
      instruction.innerText = '⏸️ Hold breath gently... (7s)';
      circle.style.transition = 'none';
      circle.innerText = 'Hold';
    }, 4000);

    setTimeout(() => {
      instruction.innerText = '💨 Slow exhale through mouth... (8s)';
      circle.style.transition = 'transform 8s ease-in-out';
      circle.style.transform = 'scale(1)';
      circle.innerText = 'Exhale';
    }, 11000);
  }
};
