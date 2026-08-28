/* Distress Tolerance Worksheets */
import { db } from '../db.js';
import { Exports } from '../exports.js';

export const ChainAnalysisModule = {
  render(container) {
    container.innerHTML = `
      <div class="card">
        <div class="card-header">
          <div>
            <h2 class="card-title">
              <span class="badge badge-rose">Distress Tolerance</span>
              Crisis Survival Worksheets
            </h2>
            <p class="card-subtitle">Analyze problem behaviors, practice STOP, Pros & Cons, TIP, ACCEPTS, Self-Soothing, IMPROVE, Radical Acceptance, and more.</p>
          </div>
        </div>

        <div class="nav-tabs" style="display: none !important; background: transparent; border-bottom: 1px solid var(--border-color); margin-bottom: 1.25rem; flex-wrap: wrap; gap: 0.5rem;">
          <button class="tab-btn active" data-dttab="dt-chain">🔗 Chain Analysis (WS 2)</button>
          <button class="tab-btn" data-dttab="dt-stop">🛑 STOP Skill (WS 2)</button>
          <button class="tab-btn" data-dttab="dt-proscons">⚖️ Pros & Cons (WS 3)</button>
          <button class="tab-btn" data-dttab="dt-tip">🧊 TIP Skills (WS 4)</button>
          <button class="tab-btn" data-dttab="dt-accepts-ws">🧩 ACCEPTS (WS 5)</button>
          <button class="tab-btn" data-dttab="dt-soothe-ws">🌸 Self-Soothing (WS 6)</button>
          <button class="tab-btn" data-dttab="dt-improve-ws">☀️ IMPROVE (WS 7)</button>
          <button class="tab-btn" data-dttab="dt-radical-acc">🌱 Radical Acceptance (WS 9)</button>
          <button class="tab-btn" data-dttab="dt-turning-mind">🔄 Turning the Mind (WS 10)</button>
          <button class="tab-btn" data-dttab="dt-half-smile">🙂 Half-Smiling (WS 11)</button>
          <button class="tab-btn" data-dttab="dt-mindful-thoughts">💭 Mindful Thoughts (WS 12)</button>
        </div>

        <!-- 1. Behavioral Chain Analysis (WS 2) -->
        <div class="dttab-content active" id="dt-chain">
          <form id="chain-analysis-form">
            <div class="grid-2">
              <div class="form-group">
                <label class="form-label">1. Problem Behavior (Specific behavior to change)</label>
                <input type="text" class="form-control" id="ca-behavior" placeholder="e.g. Yelling at partner, shutting down/isolating, urge to quit..." required>
              </div>
              <div class="form-group">
                <label class="form-label">Intensity Level (0 to 100)</label>
                <input type="number" min="0" max="100" class="form-control" id="ca-intensity" placeholder="e.g. 85">
              </div>
            </div>

            <div class="grid-2">
              <div class="form-group">
                <label class="form-label">2. Prompting Event (Environmental catalyst)</label>
                <textarea class="form-control" id="ca-prompting-event" placeholder="What specific external event triggered the chain?"></textarea>
              </div>
              <div class="form-group">
                <label class="form-label">3. Vulnerability Factors</label>
                <textarea class="form-control" id="ca-vulnerabilities" placeholder="Sleep deprivation, prior conflict, physical pain..."></textarea>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">4. Chain of Links (Thoughts, Feelings, Sensations, Behaviors leading up to the behavior)</label>
              <textarea class="form-control" id="ca-links" style="min-height: 120px;" placeholder="Link 1: Thought 'I can't take this'nLink 2: Heart rate spikednLink 3: Urge to slam door..."></textarea>
            </div>

            <div class="grid-2">
              <div class="form-group">
                <label class="form-label">5. Short-Term & Long-Term Consequences</label>
                <textarea class="form-control" id="ca-consequences" placeholder="Short-term: Release of tension. Long-term: Relationship distress..."></textarea>
              </div>
              <div class="form-group">
                <label class="form-label">6. Skill Repair Points (Where could a DBT skill be inserted?)</label>
                <textarea class="form-control" id="ca-skill-repairs" placeholder="e.g. At Link 2: Use TIPP breathing. At Link 3: Use STOP..."></textarea>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">7. Harm Reduction & Prevention Plan</label>
              <textarea class="form-control" id="ca-prevention" placeholder="How to prevent the triggering event or vulnerability in the future..."></textarea>
            </div>

            <div style="display: flex; gap: 0.5rem; justify-content: flex-end;">
              <button type="button" class="btn btn-secondary" id="btn-copy-ca">📋 Copy Script</button>
              <button type="submit" class="btn btn-primary">💾 Save Chain Analysis</button>
            </div>
          </form>
        </div>

        <!-- 2. STOP Skill Practice (Worksheet 2) -->
        <div class="dttab-content" id="dt-stop" style="display: none;">
          <form id="stop-ws-form">
            <h4 style="margin-bottom: 1rem;">Situation 1</h4>
            <div class="grid-2">
              <div class="form-group">
                <label class="form-label">Distress Before (0-100)</label>
                <input type="number" min="0" max="100" class="form-control" id="stop-s1-before">
              </div>
              <div class="form-group">
                <label class="form-label">Distress After (0-100)</label>
                <input type="number" min="0" max="100" class="form-control" id="stop-s1-after">
              </div>
            </div>
            <div class="grid-2">
              <div class="form-group">
                <label class="form-label">Prompting Event</label>
                <textarea class="form-control" id="stop-s1-prompt" placeholder="What happened?"></textarea>
              </div>
              <div class="form-group">
                <label class="form-label">Behavior to Stop</label>
                <textarea class="form-control" id="stop-s1-behavior" placeholder="What do you want to stop doing?"></textarea>
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">STOP Steps Used:</label>
              <div style="background: var(--bg-secondary); padding: 0.75rem; border-radius: var(--radius-md); border: 1px solid var(--border-color); font-size: 0.85rem;">
                <label style="display:block; margin-bottom:0.25rem;"><input type="checkbox" class="stop-s1-check" value="Stop"> <b>S</b>top (Freeze, do not react)</label>
                <label style="display:block; margin-bottom:0.25rem;"><input type="checkbox" class="stop-s1-check" value="Take a step back"> <b>T</b>ake a step back (Breathe, step away from situation)</label>
                <label style="display:block; margin-bottom:0.25rem;"><input type="checkbox" class="stop-s1-check" value="Observe"> <b>O</b>bserve (Notice what is happening inside and outside you)</label>
                <label style="display:block; margin-bottom:0.25rem;"><input type="checkbox" class="stop-s1-check" value="Proceed mindfully"> <b>P</b>roceed mindfully (Act with awareness, ask Wise Mind)</label>
              </div>
            </div>
            <div class="grid-2">
              <div class="form-group">
                <label class="form-label">Describe Outcome</label>
                <textarea class="form-control" id="stop-s1-outcome"></textarea>
              </div>
              <div class="form-group">
                <label class="form-label">Effectiveness (1-5)</label>
                <select class="form-control" id="stop-s1-effect">
                  <option value="5">5 - Highly effective</option>
                  <option value="4">4 - Effective</option>
                  <option value="3">3 - Somewhat effective</option>
                  <option value="2">2 - A little effective</option>
                  <option value="1">1 - Not effective</option>
                </select>
              </div>
            </div>

            <hr style="margin: 1.5rem 0; border: 0; border-top: 1px solid var(--border-color);">

            <h4 style="margin-bottom: 1rem;">Situation 2</h4>
            <div class="grid-2">
              <div class="form-group">
                <label class="form-label">Distress Before (0-100)</label>
                <input type="number" min="0" max="100" class="form-control" id="stop-s2-before">
              </div>
              <div class="form-group">
                <label class="form-label">Distress After (0-100)</label>
                <input type="number" min="0" max="100" class="form-control" id="stop-s2-after">
              </div>
            </div>
            <div class="grid-2">
              <div class="form-group">
                <label class="form-label">Prompting Event</label>
                <textarea class="form-control" id="stop-s2-prompt"></textarea>
              </div>
              <div class="form-group">
                <label class="form-label">Behavior to Stop</label>
                <textarea class="form-control" id="stop-s2-behavior"></textarea>
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">STOP Steps Used:</label>
              <div style="background: var(--bg-secondary); padding: 0.75rem; border-radius: var(--radius-md); border: 1px solid var(--border-color); font-size: 0.85rem;">
                <label style="display:block; margin-bottom:0.25rem;"><input type="checkbox" class="stop-s2-check" value="Stop"> <b>S</b>top (Freeze, do not react)</label>
                <label style="display:block; margin-bottom:0.25rem;"><input type="checkbox" class="stop-s2-check" value="Take a step back"> <b>T</b>ake a step back (Breathe, step away from situation)</label>
                <label style="display:block; margin-bottom:0.25rem;"><input type="checkbox" class="stop-s2-check" value="Observe"> <b>O</b>bserve (Notice what is happening inside and outside you)</label>
                <label style="display:block; margin-bottom:0.25rem;"><input type="checkbox" class="stop-s2-check" value="Proceed mindfully"> <b>P</b>roceed mindfully (Act with awareness, ask Wise Mind)</label>
              </div>
            </div>
            <div class="grid-2">
              <div class="form-group">
                <label class="form-label">Describe Outcome</label>
                <textarea class="form-control" id="stop-s2-outcome"></textarea>
              </div>
              <div class="form-group">
                <label class="form-label">Effectiveness (1-5)</label>
                <select class="form-control" id="stop-s2-effect">
                  <option value="5">5 - Highly effective</option>
                  <option value="4">4 - Effective</option>
                  <option value="3">3 - Somewhat effective</option>
                  <option value="2">2 - A little effective</option>
                  <option value="1">1 - Not effective</option>
                </select>
              </div>
            </div>

            <div style="display: flex; gap: 0.5rem; justify-content: flex-end; margin-top: 1rem;">
              <button type="submit" class="btn btn-primary">💾 Save STOP Practice</button>
            </div>
          </form>
        </div>

        <!-- 3. Pros & Cons (Worksheet 3/3A) -->
        <div class="dttab-content" id="dt-proscons" style="display: none;">
          <form id="proscons-ws-form">
            <div class="form-group">
              <label class="form-label">Describe Problem Behavior / Urge</label>
              <textarea class="form-control" id="pc-behavior" placeholder="What is the urge or crisis behavior you are trying to resist?" required></textarea>
            </div>

            <div class="grid-2">
              <div class="card" style="padding: 1rem; border: 1px solid var(--border-color);">
                <h4 style="margin-bottom: 0.5rem;">Pros of Acting on Urges</h4>
                <input type="text" class="form-control pc-pro-act" placeholder="1."><br>
                <input type="text" class="form-control pc-pro-act" placeholder="2."><br>
                <input type="text" class="form-control pc-pro-act" placeholder="3."><br>
                <input type="text" class="form-control pc-pro-act" placeholder="4."><br>
                <input type="text" class="form-control pc-pro-act" placeholder="5.">
              </div>
              <div class="card" style="padding: 1rem; border: 1px solid var(--border-color);">
                <h4 style="margin-bottom: 0.5rem;">Cons of Acting on Urges</h4>
                <input type="text" class="form-control pc-con-act" placeholder="1."><br>
                <input type="text" class="form-control pc-con-act" placeholder="2."><br>
                <input type="text" class="form-control pc-con-act" placeholder="3."><br>
                <input type="text" class="form-control pc-con-act" placeholder="4."><br>
                <input type="text" class="form-control pc-con-act" placeholder="5.">
              </div>
              <div class="card" style="padding: 1rem; border: 1px solid var(--border-color);">
                <h4 style="margin-bottom: 0.5rem;">Pros of Resisting Urges</h4>
                <input type="text" class="form-control pc-pro-res" placeholder="1."><br>
                <input type="text" class="form-control pc-pro-res" placeholder="2."><br>
                <input type="text" class="form-control pc-pro-res" placeholder="3."><br>
                <input type="text" class="form-control pc-pro-res" placeholder="4."><br>
                <input type="text" class="form-control pc-pro-res" placeholder="5.">
              </div>
              <div class="card" style="padding: 1rem; border: 1px solid var(--border-color);">
                <h4 style="margin-bottom: 0.5rem;">Cons of Resisting Urges</h4>
                <input type="text" class="form-control pc-con-res" placeholder="1."><br>
                <input type="text" class="form-control pc-con-res" placeholder="2."><br>
                <input type="text" class="form-control pc-con-res" placeholder="3."><br>
                <input type="text" class="form-control pc-con-res" placeholder="4."><br>
                <input type="text" class="form-control pc-con-res" placeholder="5.">
              </div>
            </div>
            
            <div style="display: flex; gap: 0.5rem; justify-content: flex-end; margin-top: 1rem;">
              <button type="submit" class="btn btn-primary">💾 Save Pros & Cons</button>
            </div>
          </form>
        </div>

        <!-- 4. TIP Skills (Worksheet 4) -->
        <div class="dttab-content" id="dt-tip" style="display: none;">
          <form id="tip-ws-form">
            <div class="form-group">
              <label class="form-label">Situation</label>
              <textarea class="form-control" id="tip-situation" placeholder="Describe the situation where you used TIP skills..." required></textarea>
            </div>

            <!-- T: Temperature -->
            <div class="card" style="padding: 1rem; border: 1px solid var(--border-color); margin-bottom: 1rem;">
              <h4 style="margin-bottom: 0.5rem;">T - Tip the Temperature (Cold Water)</h4>
              <div class="grid-3">
                <div class="form-group">
                  <label class="form-label">Arousal Before (0-100)</label>
                  <input type="number" class="form-control" id="tip-t-ab">
                </div>
                <div class="form-group">
                  <label class="form-label">Arousal After (0-100)</label>
                  <input type="number" class="form-control" id="tip-t-aa">
                </div>
                <div class="form-group">
                  <label class="form-label">Distress Tol. Before (0-100)</label>
                  <input type="number" class="form-control" id="tip-t-dtb">
                </div>
                <div class="form-group">
                  <label class="form-label">Distress Tol. After (0-100)</label>
                  <input type="number" class="form-control" id="tip-t-dta">
                </div>
                <div class="form-group" style="grid-column: span 2;">
                  <label class="form-label">What was done</label>
                  <input type="text" class="form-control" id="tip-t-desc" placeholder="e.g. Ice pack on face for 30s">
                </div>
              </div>
            </div>

            <!-- I: Intense Exercise -->
            <div class="card" style="padding: 1rem; border: 1px solid var(--border-color); margin-bottom: 1rem;">
              <h4 style="margin-bottom: 0.5rem;">I - Intense Exercise</h4>
              <div class="grid-3">
                <div class="form-group">
                  <label class="form-label">Arousal Before (0-100)</label>
                  <input type="number" class="form-control" id="tip-i-ab">
                </div>
                <div class="form-group">
                  <label class="form-label">Arousal After (0-100)</label>
                  <input type="number" class="form-control" id="tip-i-aa">
                </div>
                <div class="form-group">
                  <label class="form-label">Distress Tol. Before (0-100)</label>
                  <input type="number" class="form-control" id="tip-i-dtb">
                </div>
                <div class="form-group">
                  <label class="form-label">Distress Tol. After (0-100)</label>
                  <input type="number" class="form-control" id="tip-i-dta">
                </div>
                <div class="form-group" style="grid-column: span 2;">
                  <label class="form-label">What was done</label>
                  <input type="text" class="form-control" id="tip-i-desc" placeholder="e.g. Sprinting in place for 5 mins">
                </div>
              </div>
            </div>

            <!-- P: Paced Breathing -->
            <div class="card" style="padding: 1rem; border: 1px solid var(--border-color); margin-bottom: 1rem;">
              <h4 style="margin-bottom: 0.5rem;">P - Paced Breathing</h4>
              <div class="grid-3">
                <div class="form-group">
                  <label class="form-label">Arousal Before (0-100)</label>
                  <input type="number" class="form-control" id="tip-p1-ab">
                </div>
                <div class="form-group">
                  <label class="form-label">Arousal After (0-100)</label>
                  <input type="number" class="form-control" id="tip-p1-aa">
                </div>
                <div class="form-group">
                  <label class="form-label">Distress Tol. Before (0-100)</label>
                  <input type="number" class="form-control" id="tip-p1-dtb">
                </div>
                <div class="form-group">
                  <label class="form-label">Distress Tol. After (0-100)</label>
                  <input type="number" class="form-control" id="tip-p1-dta">
                </div>
                <div class="form-group" style="grid-column: span 2;">
                  <label class="form-label">What was done</label>
                  <input type="text" class="form-control" id="tip-p1-desc" placeholder="e.g. Box breathing for 10 mins">
                </div>
              </div>
            </div>

            <!-- P: Paired Muscle Relaxation -->
            <div class="card" style="padding: 1rem; border: 1px solid var(--border-color); margin-bottom: 1rem;">
              <h4 style="margin-bottom: 0.5rem;">P - Paired Muscle Relaxation</h4>
              <div class="grid-3">
                <div class="form-group">
                  <label class="form-label">Arousal Before (0-100)</label>
                  <input type="number" class="form-control" id="tip-p2-ab">
                </div>
                <div class="form-group">
                  <label class="form-label">Arousal After (0-100)</label>
                  <input type="number" class="form-control" id="tip-p2-aa">
                </div>
                <div class="form-group">
                  <label class="form-label">Distress Tol. Before (0-100)</label>
                  <input type="number" class="form-control" id="tip-p2-dtb">
                </div>
                <div class="form-group">
                  <label class="form-label">Distress Tol. After (0-100)</label>
                  <input type="number" class="form-control" id="tip-p2-dta">
                </div>
                <div class="form-group" style="grid-column: span 2;">
                  <label class="form-label">What was done</label>
                  <input type="text" class="form-control" id="tip-p2-desc" placeholder="e.g. Progressive relaxation whole body">
                </div>
              </div>
            </div>
            
            <div style="display: flex; gap: 0.5rem; justify-content: flex-end; margin-top: 1rem;">
              <button type="submit" class="btn btn-primary">💾 Save TIP Skills</button>
            </div>
          </form>
        </div>

        <!-- 5. Distracting with ACCEPTS (WS 5) -->
        <div class="dttab-content" id="dt-accepts-ws" style="display: none;">
          <form id="accepts-ws5-form">
            <div class="grid-3">
              <div class="form-group">
                <label class="form-label">Distress Before (0-100)</label>
                <input type="number" min="0" max="100" class="form-control" id="acc-before" placeholder="e.g. 90" required>
              </div>
              <div class="form-group">
                <label class="form-label">Distress After (0-100)</label>
                <input type="number" min="0" max="100" class="form-control" id="acc-after" placeholder="e.g. 40">
              </div>
              <div class="form-group">
                <label class="form-label">Effectiveness Rating</label>
                <select class="form-control" id="acc-effect">
                  <option value="5">5 (Tolerated distress & resisted urges)</option>
                  <option value="4">4</option>
                  <option value="3">3 (Able to cope somewhat, helped a little)</option>
                  <option value="2">2</option>
                  <option value="1">1 (Couldn't stand situation even for 1m)</option>
                </select>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">Prompting Event for my Distress (Who, what, when, where? What triggered the crisis?)</label>
              <textarea class="form-control" id="acc-prompting" placeholder="Describe the prompting event..." required></textarea>
            </div>

            <div class="grid-2">
              <div class="form-group">
                <label class="form-label">Check ACCEPTS skills used:</label>
                <div style="background: var(--bg-secondary); padding: 0.75rem; border-radius: var(--radius-md); border: 1px solid var(--border-color); font-size: 0.85rem;">
                  <label style="display:block; margin-bottom:0.25rem;"><input type="checkbox" class="acc-check" value="Activities"> Activities (sports, hobbies, tasks)</label>
                  <label style="display:block; margin-bottom:0.25rem;"><input type="checkbox" class="acc-check" value="Contributions"> Contributions (helping others, service)</label>
                  <label style="display:block; margin-bottom:0.25rem;"><input type="checkbox" class="acc-check" value="Comparisons"> Comparisons (comparing to other times/situations)</label>
                  <label style="display:block; margin-bottom:0.25rem;"><input type="checkbox" class="acc-check" value="Emotions"> Emotions (doing things to elicit opposite feelings)</label>
                  <label style="display:block; margin-bottom:0.25rem;"><input type="checkbox" class="acc-check" value="Pushing away"> Pushing away (leaving situation, blocking thoughts)</label>
                  <label style="display:block; margin-bottom:0.25rem;"><input type="checkbox" class="acc-check" value="Thoughts"> Thoughts (counting, reading, solving puzzles)</label>
                  <label style="display:block; margin-bottom:0.25rem;"><input type="checkbox" class="acc-check" value="Sensations"> Sensations (hot/cold shower, loud music, ice)</label>
                </div>
              </div>
              <div class="form-group">
                <label class="form-label">Describe skills used and what you did:</label>
                <textarea class="form-control" id="acc-desc" style="height: 165px;" placeholder="e.g. 'Took a freezing cold shower (Sensations) and solved a Sudoku puzzle (Thoughts)...'"></textarea>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">Describe the outcome of using these skills:</label>
              <textarea class="form-control" id="acc-outcome" placeholder="How did this help you tolerate the distress and resist urges?"></textarea>
            </div>

            <div style="display: flex; gap: 0.5rem; justify-content: flex-end;">
              <button type="button" class="btn btn-secondary" id="btn-copy-acc">📋 Copy Worksheet</button>
              <button type="submit" class="btn btn-primary">💾 Save Worksheet 5</button>
            </div>
          </form>
        </div>

        <!-- 6. Self-Soothing (WS 6) -->
        <div class="dttab-content" id="dt-soothe-ws" style="display: none;">
          <form id="soothe-ws6-form">
            <div class="grid-3">
              <div class="form-group">
                <label class="form-label">Distress Before (0-100)</label>
                <input type="number" min="0" max="100" class="form-control" id="soothe-before" placeholder="e.g. 80" required>
              </div>
              <div class="form-group">
                <label class="form-label">Distress After (0-100)</label>
                <input type="number" min="0" max="100" class="form-control" id="soothe-after" placeholder="e.g. 45">
              </div>
              <div class="form-group">
                <label class="form-label">Effectiveness Rating</label>
                <select class="form-control" id="soothe-effect">
                  <option value="5">5 (Tolerated distress & resisted urges)</option>
                  <option value="4">4</option>
                  <option value="3">3 (Able to cope somewhat, helped a little)</option>
                  <option value="2">2</option>
                  <option value="1">1 (Couldn't stand situation even for 1m)</option>
                </select>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">Prompting Event for my Distress (Who, what, when, where? What triggered the crisis?)</label>
              <textarea class="form-control" id="soothe-prompting" placeholder="Describe the prompting event..." required></textarea>
            </div>

            <div class="grid-2">
              <div class="form-group">
                <label class="form-label">Check sensory self-soothing used:</label>
                <div style="background: var(--bg-secondary); padding: 0.75rem; border-radius: var(--radius-md); border: 1px solid var(--border-color); font-size: 0.85rem;">
                  <label style="display:block; margin-bottom:0.4rem;"><input type="checkbox" class="soothe-check" value="Vision"> Vision (stars, nature, art, beautiful lighting)</label>
                  <label style="display:block; margin-bottom:0.4rem;"><input type="checkbox" class="soothe-check" value="Hearing"> Hearing (soothing music, white noise, nature sounds)</label>
                  <label style="display:block; margin-bottom:0.4rem;"><input type="checkbox" class="soothe-check" value="Smell"> Smell (lavender oil, incense, scented candles, fresh coffee)</label>
                  <label style="display:block; margin-bottom:0.4rem;"><input type="checkbox" class="soothe-check" value="Taste"> Taste (savoring hot tea, dark chocolate, mindfully eating)</label>
                  <label style="display:block; margin-bottom:0.4rem;"><input type="checkbox" class="soothe-check" value="Touch"> Touch (comfortable blanket, warm bath, massage, petting animal)</label>
                </div>
              </div>
              <div class="form-group">
                <label class="form-label">Describe skills used and what you did:</label>
                <textarea class="form-control" id="soothe-desc" style="height: 165px;" placeholder="e.g. 'Wrapped in a weighted blanket (Touch), lit a lavender candle (Smell), and listened to lo-fi beats (Hearing)...'"></textarea>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">Describe the outcome of using these skills:</label>
              <textarea class="form-control" id="soothe-outcome" placeholder="How did this help you tolerate the distress and resist urges?"></textarea>
            </div>

            <div style="display: flex; gap: 0.5rem; justify-content: flex-end;">
              <button type="button" class="btn btn-secondary" id="btn-copy-soothe">📋 Copy Worksheet</button>
              <button type="submit" class="btn btn-primary">💾 Save Worksheet 6</button>
            </div>
          </form>
        </div>

        <!-- 7. IMPROVE the Moment (WS 7) -->
        <div class="dttab-content" id="dt-improve-ws" style="display: none;">
          <form id="improve-ws7-form">
            <div class="grid-3">
              <div class="form-group">
                <label class="form-label">Distress Before (0-100)</label>
                <input type="number" min="0" max="100" class="form-control" id="imp-before" placeholder="e.g. 95" required>
              </div>
              <div class="form-group">
                <label class="form-label">Distress After (0-100)</label>
                <input type="number" min="0" max="100" class="form-control" id="imp-after" placeholder="e.g. 50">
              </div>
              <div class="form-group">
                <label class="form-label">Effectiveness Rating</label>
                <select class="form-control" id="imp-effect">
                  <option value="5">5 (Tolerated distress & resisted urges)</option>
                  <option value="4">4</option>
                  <option value="3">3 (Able to cope somewhat, helped a little)</option>
                  <option value="2">2</option>
                  <option value="1">1 (Couldn't stand situation even for 1m)</option>
                </select>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">Prompting Event for my Distress (Who, what, when, where? What triggered the crisis?)</label>
              <textarea class="form-control" id="imp-prompting" placeholder="Describe the prompting event..." required></textarea>
            </div>

            <div class="grid-2">
              <div class="form-group">
                <label class="form-label">Check IMPROVE skills used:</label>
                <div style="background: var(--bg-secondary); padding: 0.75rem; border-radius: var(--radius-md); border: 1px solid var(--border-color); font-size: 0.85rem;">
                  <label style="display:block; margin-bottom:0.25rem;"><input type="checkbox" class="imp-check" value="Imagery"> Imagery (visualizing safe place, problems resolving)</label>
                  <label style="display:block; margin-bottom:0.25rem;"><input type="checkbox" class="imp-check" value="Meaning"> Meaning (finding purpose or value in pain/event)</label>
                  <label style="display:block; margin-bottom:0.25rem;"><input type="checkbox" class="imp-check" value="Prayer"> Prayer (opening mind to connection, higher force)</label>
                  <label style="display:block; margin-bottom:0.25rem;"><input type="checkbox" class="imp-check" value="Relaxation"> Relaxation (progressive muscle relaxation, deep breathing)</label>
                  <label style="display:block; margin-bottom:0.25rem;"><input type="checkbox" class="imp-check" value="One thing"> One thing (focusing completely on a single task)</label>
                  <label style="display:block; margin-bottom:0.25rem;"><input type="checkbox" class="imp-check" value="Vacation"> Vacation (brief mental escape, short break from responsibilities)</label>
                  <label style="display:block; margin-bottom:0.25rem;"><input type="checkbox" class="imp-check" value="Encouragement"> Encouragement (self-talk: 'I can do this', 'It will pass')</label>
                </div>
              </div>
              <div class="form-group">
                <label class="form-label">Describe skills used and what you did:</label>
                <textarea class="form-control" id="imp-desc" style="height: 165px;" placeholder="e.g. 'Reminded myself that pain is temporary (Encouragement) and did deep belly breathing (Relaxation)...'"></textarea>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">Describe the outcome of using these skills:</label>
              <textarea class="form-control" id="imp-outcome" placeholder="How did this help you tolerate the distress and resist urges?"></textarea>
            </div>

            <div style="display: flex; gap: 0.5rem; justify-content: flex-end;">
              <button type="button" class="btn btn-secondary" id="btn-copy-imp">📋 Copy Worksheet</button>
              <button type="submit" class="btn btn-primary">💾 Save Worksheet 7</button>
            </div>
          </form>
        </div>

        <!-- 8. Radical Acceptance (Worksheet 9) -->
        <div class="dttab-content" id="dt-radical-acc" style="display: none;">
          <form id="radical-acc-ws-form">
            <div class="grid-2">
              <div class="card" style="padding: 1rem; border: 1px solid var(--border-color);">
                <h4 style="margin-bottom: 0.5rem;">Two very important things in my life I need to accept</h4>
                <div style="margin-bottom: 0.5rem;">
                  <input type="text" class="form-control" id="ra-imp1" placeholder="1.">
                  <div style="display: flex; align-items: center; gap: 0.5rem; margin-top: 0.25rem;">
                    <label style="font-size: 0.8rem;">Acceptance (0-5):</label>
                    <input type="number" min="0" max="5" class="form-control" id="ra-imp1-rate" style="width: 60px; padding: 0.2rem;">
                  </div>
                </div>
                <div>
                  <input type="text" class="form-control" id="ra-imp2" placeholder="2.">
                  <div style="display: flex; align-items: center; gap: 0.5rem; margin-top: 0.25rem;">
                    <label style="font-size: 0.8rem;">Acceptance (0-5):</label>
                    <input type="number" min="0" max="5" class="form-control" id="ra-imp2-rate" style="width: 60px; padding: 0.2rem;">
                  </div>
                </div>
              </div>
              <div class="card" style="padding: 1rem; border: 1px solid var(--border-color);">
                <h4 style="margin-bottom: 0.5rem;">Two less important things in my life I need to accept</h4>
                <div style="margin-bottom: 0.5rem;">
                  <input type="text" class="form-control" id="ra-less1" placeholder="1.">
                  <div style="display: flex; align-items: center; gap: 0.5rem; margin-top: 0.25rem;">
                    <label style="font-size: 0.8rem;">Acceptance (0-5):</label>
                    <input type="number" min="0" max="5" class="form-control" id="ra-less1-rate" style="width: 60px; padding: 0.2rem;">
                  </div>
                </div>
                <div>
                  <input type="text" class="form-control" id="ra-less2" placeholder="2.">
                  <div style="display: flex; align-items: center; gap: 0.5rem; margin-top: 0.25rem;">
                    <label style="font-size: 0.8rem;">Acceptance (0-5):</label>
                    <input type="number" min="0" max="5" class="form-control" id="ra-less2-rate" style="width: 60px; padding: 0.2rem;">
                  </div>
                </div>
              </div>
            </div>

            <div class="form-group" style="margin-top: 1rem;">
              <label class="form-label">Radical Acceptance Practice</label>
              <div style="background: var(--bg-secondary); padding: 0.75rem; border-radius: var(--radius-md); border: 1px solid var(--border-color); font-size: 0.85rem; margin-bottom: 0.5rem;">
                <label style="display:block; margin-bottom:0.25rem;"><input type="checkbox" class="ra-check" value="Observe"> Observe that I am questioning or fighting reality.</label>
                <label style="display:block; margin-bottom:0.25rem;"><input type="checkbox" class="ra-check" value="Remind"> Remind myself that the unpleasant reality is just as it is.</label>
                <label style="display:block; margin-bottom:0.25rem;"><input type="checkbox" class="ra-check" value="Causes"> Consider the causes that make this reality.</label>
                <label style="display:block; margin-bottom:0.25rem;"><input type="checkbox" class="ra-check" value="Accept whole"> Practice accepting with the whole mind, body, and spirit.</label>
                <label style="display:block; margin-bottom:0.25rem;"><input type="checkbox" class="ra-check" value="List behaviors"> List behaviors I would do if I did accept facts.</label>
                <label style="display:block; margin-bottom:0.25rem;"><input type="checkbox" class="ra-check" value="Coping ahead"> Coping ahead with events that seem unacceptable.</label>
                <label style="display:block; margin-bottom:0.25rem;"><input type="checkbox" class="ra-check" value="Notice body"> Notice body sensations as I think about what I need to accept.</label>
                <label style="display:block; margin-bottom:0.25rem;"><input type="checkbox" class="ra-check" value="Allow pain"> Allow disappointment, sadness, or grief to arise within me.</label>
                <label style="display:block; margin-bottom:0.25rem;"><input type="checkbox" class="ra-check" value="Acknowledge"> Acknowledge that life can be worth living even when there is pain.</label>
                <label style="display:block; margin-bottom:0.25rem;"><input type="checkbox" class="ra-check" value="Pros and Cons"> Do pros and cons if I find myself resisting practicing.</label>
              </div>
              <textarea class="form-control" id="ra-details" placeholder="Details of how you practiced Radical Acceptance..."></textarea>
            </div>

            <div class="form-group" style="width: 200px;">
              <label class="form-label">Rate Acceptance After (0-5)</label>
              <input type="number" min="0" max="5" class="form-control" id="ra-rate-after">
            </div>

            <div style="display: flex; gap: 0.5rem; justify-content: flex-end;">
              <button type="submit" class="btn btn-primary">💾 Save Radical Acceptance</button>
            </div>
          </form>
        </div>

        <!-- 9. Turning the Mind / Willingness (Worksheet 10) -->
        <div class="dttab-content" id="dt-turning-mind" style="display: none;">
          <form id="turning-mind-ws-form">
            <h4 style="margin-bottom: 1rem;">Turning the Mind</h4>
            <div class="grid-2">
              <div class="form-group">
                <label class="form-label">Acceptance Before (0-5)</label>
                <input type="number" min="0" max="5" class="form-control" id="tm-acc-before">
              </div>
              <div class="form-group">
                <label class="form-label">Acceptance After (0-5)</label>
                <input type="number" min="0" max="5" class="form-control" id="tm-acc-after">
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">1. Observe not accepting</label>
              <textarea class="form-control" id="tm-observe" placeholder="What are you not accepting?"></textarea>
            </div>
            <div class="form-group">
              <label class="form-label">2. Make an inner commitment</label>
              <textarea class="form-control" id="tm-commit" placeholder="Commit to accept reality as it is..."></textarea>
            </div>
            <div class="form-group">
              <label class="form-label">3. Doing it again</label>
              <textarea class="form-control" id="tm-plan" placeholder="What is your plan for when you catch yourself not accepting?"></textarea>
            </div>

            <hr style="margin: 1.5rem 0; border: 0; border-top: 1px solid var(--border-color);">

            <h4 style="margin-bottom: 1rem;">Willingness</h4>
            <div class="form-group" style="width: 200px;">
              <label class="form-label">Willfulness Rating (0-5)</label>
              <input type="number" min="0" max="5" class="form-control" id="tm-will-rating">
            </div>
            <div class="grid-2">
              <div class="form-group">
                <label class="form-label">What is the effective behavior?</label>
                <textarea class="form-control" id="tm-eff-behavior"></textarea>
              </div>
              <div class="form-group">
                <label class="form-label">How did you notice willfulness?</label>
                <textarea class="form-control" id="tm-notice-will"></textarea>
              </div>
            </div>
            <div class="grid-2">
              <div class="form-group">
                <label class="form-label">How did you practice radical acceptance?</label>
                <textarea class="form-control" id="tm-practiced-acc"></textarea>
              </div>
              <div class="form-group">
                <label class="form-label">What were your willing actions?</label>
                <textarea class="form-control" id="tm-willing-actions"></textarea>
              </div>
            </div>

            <div style="display: flex; gap: 0.5rem; justify-content: flex-end;">
              <button type="submit" class="btn btn-primary">💾 Save Turning the Mind</button>
            </div>
          </form>
        </div>

        <!-- 10. Half-Smiling & Willing Hands (Worksheet 11) -->
        <div class="dttab-content" id="dt-half-smile" style="display: none;">
          <form id="half-smile-ws-form">
            <div class="form-group">
              <label class="form-label">Check off exercises practiced:</label>
              <div style="background: var(--bg-secondary); padding: 0.75rem; border-radius: var(--radius-md); border: 1px solid var(--border-color); font-size: 0.85rem;">
                <label style="display:block; margin-bottom:0.25rem;"><input type="checkbox" class="hs-check" value="Half-smile wake up"> Half-smile when you first wake up in the morning.</label>
                <label style="display:block; margin-bottom:0.25rem;"><input type="checkbox" class="hs-check" value="Free moments"> Half-smile during your free moments.</label>
                <label style="display:block; margin-bottom:0.25rem;"><input type="checkbox" class="hs-check" value="Listening to music"> Half-smile with willing hands while listening to music.</label>
                <label style="display:block; margin-bottom:0.25rem;"><input type="checkbox" class="hs-check" value="Irritated"> Half-smile with willing hands when you are irritated.</label>
                <label style="display:block; margin-bottom:0.25rem;"><input type="checkbox" class="hs-check" value="Lying down"> Half-smile in a lying down position.</label>
                <label style="display:block; margin-bottom:0.25rem;"><input type="checkbox" class="hs-check" value="Sitting"> Half-smile in a sitting position.</label>
                <label style="display:block; margin-bottom:0.25rem;"><input type="checkbox" class="hs-check" value="Walking"> Half-smile while walking.</label>
                <label style="display:block; margin-bottom:0.25rem;"><input type="checkbox" class="hs-check" value="Contemplating person"> Half-smile while contemplating a person you dislike.</label>
              </div>
            </div>

            <div class="card" style="padding: 1rem; border: 1px solid var(--border-color); margin-bottom: 1rem;">
              <h4 style="margin-bottom: 0.5rem;">Situation 1</h4>
              <textarea class="form-control" id="hs-s1-desc" placeholder="Describe the situation..."></textarea>
              <div style="display: flex; align-items: center; gap: 0.5rem; margin-top: 0.5rem;">
                <label style="font-size: 0.8rem;">Effectiveness (1-5):</label>
                <input type="number" min="1" max="5" class="form-control" id="hs-s1-effect" style="width: 80px; padding: 0.2rem;">
              </div>
            </div>

            <div class="card" style="padding: 1rem; border: 1px solid var(--border-color); margin-bottom: 1rem;">
              <h4 style="margin-bottom: 0.5rem;">Situation 2</h4>
              <textarea class="form-control" id="hs-s2-desc" placeholder="Describe the situation..."></textarea>
              <div style="display: flex; align-items: center; gap: 0.5rem; margin-top: 0.5rem;">
                <label style="font-size: 0.8rem;">Effectiveness (1-5):</label>
                <input type="number" min="1" max="5" class="form-control" id="hs-s2-effect" style="width: 80px; padding: 0.2rem;">
              </div>
            </div>

            <div class="card" style="padding: 1rem; border: 1px solid var(--border-color); margin-bottom: 1rem;">
              <h4 style="margin-bottom: 0.5rem;">Situation 3</h4>
              <textarea class="form-control" id="hs-s3-desc" placeholder="Describe the situation..."></textarea>
              <div style="display: flex; align-items: center; gap: 0.5rem; margin-top: 0.5rem;">
                <label style="font-size: 0.8rem;">Effectiveness (1-5):</label>
                <input type="number" min="1" max="5" class="form-control" id="hs-s3-effect" style="width: 80px; padding: 0.2rem;">
              </div>
            </div>

            <div style="display: flex; gap: 0.5rem; justify-content: flex-end;">
              <button type="submit" class="btn btn-primary">💾 Save Half-Smiling</button>
            </div>
          </form>
        </div>

        <!-- 11. Mindfulness of Thoughts (Worksheet 12/12A) -->
        <div class="dttab-content" id="dt-mindful-thoughts" style="display: none;">
          <form id="mindful-thoughts-ws-form">
            <div class="form-group">
              <label class="form-label">Check off defusion exercises practiced:</label>
              <div style="background: var(--bg-secondary); padding: 0.75rem; border-radius: var(--radius-md); border: 1px solid var(--border-color); font-size: 0.85rem;">
                <label style="display:block; margin-bottom:0.25rem;"><input type="checkbox" class="mt-check" value="Clouds"> Clouds in the sky</label>
                <label style="display:block; margin-bottom:0.25rem;"><input type="checkbox" class="mt-check" value="Leaves"> Leaves on a stream</label>
                <label style="display:block; margin-bottom:0.25rem;"><input type="checkbox" class="mt-check" value="Train"> Train cars</label>
                <label style="display:block; margin-bottom:0.25rem;"><input type="checkbox" class="mt-check" value="Screen"> Words on a screen</label>
                <label style="display:block; margin-bottom:0.25rem;"><input type="checkbox" class="mt-check" value="Singing"> Singing the thought</label>
                <label style="display:block; margin-bottom:0.25rem;"><input type="checkbox" class="mt-check" value="Silly voice"> Saying thought in a silly voice</label>
              </div>
            </div>
            
            <div class="grid-3">
              <div class="form-group">
                <label class="form-label">Thought 1 Details</label>
                <textarea class="form-control" id="mt-t1-desc" placeholder="Describe the thought..."></textarea>
                <div style="display: flex; align-items: center; gap: 0.5rem; margin-top: 0.5rem;">
                  <label style="font-size: 0.8rem;">Effectiveness (1-5):</label>
                  <input type="number" min="1" max="5" class="form-control" id="mt-t1-effect" style="width: 60px; padding: 0.2rem;">
                </div>
              </div>
              <div class="form-group">
                <label class="form-label">Thought 2 Details</label>
                <textarea class="form-control" id="mt-t2-desc" placeholder="Describe the thought..."></textarea>
                <div style="display: flex; align-items: center; gap: 0.5rem; margin-top: 0.5rem;">
                  <label style="font-size: 0.8rem;">Effectiveness (1-5):</label>
                  <input type="number" min="1" max="5" class="form-control" id="mt-t2-effect" style="width: 60px; padding: 0.2rem;">
                </div>
              </div>
              <div class="form-group">
                <label class="form-label">Thought 3 Details</label>
                <textarea class="form-control" id="mt-t3-desc" placeholder="Describe the thought..."></textarea>
                <div style="display: flex; align-items: center; gap: 0.5rem; margin-top: 0.5rem;">
                  <label style="font-size: 0.8rem;">Effectiveness (1-5):</label>
                  <input type="number" min="1" max="5" class="form-control" id="mt-t3-effect" style="width: 60px; padding: 0.2rem;">
                </div>
              </div>
            </div>

            <hr style="margin: 1.5rem 0; border: 0; border-top: 1px solid var(--border-color);">

            <h4 style="margin-bottom: 1rem;">12A Grid (Weekly Practice)</h4>
            <div style="overflow-x: auto;">
              <table style="width: 100%; text-align: left; border-collapse: collapse; font-size: 0.85rem;">
                <thead>
                  <tr style="border-bottom: 1px solid var(--border-color);">
                    <th style="padding: 0.5rem;">Mon</th>
                    <th style="padding: 0.5rem;">Tue</th>
                    <th style="padding: 0.5rem;">Wed</th>
                    <th style="padding: 0.5rem;">Thu</th>
                    <th style="padding: 0.5rem;">Fri</th>
                    <th style="padding: 0.5rem;">Sat</th>
                    <th style="padding: 0.5rem;">Sun</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style="padding: 0.2rem;"><input type="text" class="form-control" id="mt-mon"></td>
                    <td style="padding: 0.2rem;"><input type="text" class="form-control" id="mt-tue"></td>
                    <td style="padding: 0.2rem;"><input type="text" class="form-control" id="mt-wed"></td>
                    <td style="padding: 0.2rem;"><input type="text" class="form-control" id="mt-thu"></td>
                    <td style="padding: 0.2rem;"><input type="text" class="form-control" id="mt-fri"></td>
                    <td style="padding: 0.2rem;"><input type="text" class="form-control" id="mt-sat"></td>
                    <td style="padding: 0.2rem;"><input type="text" class="form-control" id="mt-sun"></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div style="display: flex; gap: 0.5rem; justify-content: flex-end; margin-top: 1rem;">
              <button type="submit" class="btn btn-primary">💾 Save Mindfulness of Thoughts</button>
            </div>
          </form>
        </div>

      </div>

      <div class="card">
        <h3 class="card-title" style="margin-bottom: 1rem;">Saved Crisis Survival Logs</h3>
        <div id="dt-saved-list">
          <p style="color: var(--text-muted); font-size: 0.9rem;">No saved entries yet.</p>
        </div>
      </div>
    `;

    this.attachEvents(container);
    this.loadSavedEntries(container);
  },

  attachEvents(container) {
    const tabs = container.querySelectorAll('.tab-btn');
    const contents = container.querySelectorAll('.dttab-content');

    tabs.forEach(t => {
      t.addEventListener('click', () => {
        tabs.forEach(x => x.classList.remove('active'));
        contents.forEach(x => x.style.display = 'none');
        t.classList.add('active');
        const target = container.querySelector('#' + t.dataset.dttab);
        if (target) target.style.display = 'block';
      });
    });

    // 1. Chain Analysis Form
    const caForm = container.querySelector('#chain-analysis-form');
    caForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const fields = this.getCAFormData(container);
      await db.saveWorksheet({ type: 'chain_analysis', title: `Chain Analysis: ${fields['Problem Behavior']}`, data: fields });
      alert('Chain Analysis saved!');
      caForm.reset();
      this.loadSavedEntries(container);
    });

    container.querySelector('#btn-copy-ca').addEventListener('click', () => {
      const fields = this.getCAFormData(container);
      Exports.copyForPortal('Behavioral Chain Analysis', new Date(), fields);
    });

    // Setup helper for simple forms
    const setupForm = (selector, type, titlePrefix, getFormDataFn) => {
      const form = container.querySelector(selector);
      if (form) {
        form.addEventListener('submit', async (e) => {
          e.preventDefault();
          const fields = getFormDataFn(container);
          await db.saveWorksheet({ type, title: `${titlePrefix} Worksheet`, data: fields });
          alert(`${titlePrefix} saved!`);
          form.reset();
          this.loadSavedEntries(container);
        });
      }
    };

    setupForm('#stop-ws-form', 'stop_ws2', 'STOP Skill', this.getStopFormData.bind(this));
    setupForm('#proscons-ws-form', 'pros_cons_ws3', 'Pros & Cons', this.getProsConsFormData.bind(this));
    setupForm('#tip-ws-form', 'tip_ws4', 'TIP Skills', this.getTIPFormData.bind(this));
    setupForm('#radical-acc-ws-form', 'radical_acc_ws9', 'Radical Acceptance', this.getRadicalAccFormData.bind(this));
    setupForm('#turning-mind-ws-form', 'turning_mind_ws10', 'Turning the Mind', this.getTurningMindFormData.bind(this));
    setupForm('#half-smile-ws-form', 'half_smile_ws11', 'Half-Smiling', this.getHalfSmileFormData.bind(this));
    setupForm('#mindful-thoughts-ws-form', 'mindful_thoughts_ws12', 'Mindfulness of Thoughts', this.getMindfulThoughtsFormData.bind(this));

    // 5. ACCEPTS (WS 5)
    const accForm = container.querySelector('#accepts-ws5-form');
    accForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const fields = this.getAccFormData(container);
      await db.saveWorksheet({ type: 'accepts_ws5', title: `ACCEPTS WS5: ${fields.Prompting.substring(0, 30)}...`, data: fields });
      alert('ACCEPTS Worksheet 5 saved!');
      accForm.reset();
      this.loadSavedEntries(container);
    });

    container.querySelector('#btn-copy-acc').addEventListener('click', () => {
      const fields = this.getAccFormData(container);
      Exports.copyForPortal('Distracting with ACCEPTS (WS5)', new Date(), fields);
    });

    // 6. Self-Soothing (WS 6)
    const sootheForm = container.querySelector('#soothe-ws6-form');
    sootheForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const fields = this.getSootheFormData(container);
      await db.saveWorksheet({ type: 'soothe_ws6', title: `Self-Soothe WS6: ${fields.Prompting.substring(0, 30)}...`, data: fields });
      alert('Self-Soothing Worksheet 6 saved!');
      sootheForm.reset();
      this.loadSavedEntries(container);
    });

    container.querySelector('#btn-copy-soothe').addEventListener('click', () => {
      const fields = this.getSootheFormData(container);
      Exports.copyForPortal('Self-Soothing Homework (WS6)', new Date(), fields);
    });

    // 7. IMPROVE (WS 7)
    const impForm = container.querySelector('#improve-ws7-form');
    impForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const fields = this.getImpFormData(container);
      await db.saveWorksheet({ type: 'improve_ws7', title: `IMPROVE WS7: ${fields.Prompting.substring(0, 30)}...`, data: fields });
      alert('IMPROVE the Moment Worksheet 7 saved!');
      impForm.reset();
      this.loadSavedEntries(container);
    });

    container.querySelector('#btn-copy-imp').addEventListener('click', () => {
      const fields = this.getImpFormData(container);
      Exports.copyForPortal('IMPROVE the Moment Homework (WS7)', new Date(), fields);
    });
  },

  getStopFormData(container) {
    return {
      'S1 Before': container.querySelector('#stop-s1-before').value,
      'S1 After': container.querySelector('#stop-s1-after').value,
      'S1 Prompt': container.querySelector('#stop-s1-prompt').value,
      'S1 Behavior': container.querySelector('#stop-s1-behavior').value,
      'S1 Checks': Array.from(container.querySelectorAll('.stop-s1-check:checked')).map(c => c.value).join(', '),
      'S1 Outcome': container.querySelector('#stop-s1-outcome').value,
      'S1 Effect': container.querySelector('#stop-s1-effect').value,
      'S2 Before': container.querySelector('#stop-s2-before').value,
      'S2 After': container.querySelector('#stop-s2-after').value,
      'S2 Prompt': container.querySelector('#stop-s2-prompt').value,
      'S2 Behavior': container.querySelector('#stop-s2-behavior').value,
      'S2 Checks': Array.from(container.querySelectorAll('.stop-s2-check:checked')).map(c => c.value).join(', '),
      'S2 Outcome': container.querySelector('#stop-s2-outcome').value,
      'S2 Effect': container.querySelector('#stop-s2-effect').value,
    };
  },

  getProsConsFormData(container) {
    const getVals = (selector) => Array.from(container.querySelectorAll(selector)).map(x => x.value).filter(x => x).join(', ');
    return {
      'Behavior': container.querySelector('#pc-behavior').value,
      'Pros Act': getVals('.pc-pro-act'),
      'Cons Act': getVals('.pc-con-act'),
      'Pros Res': getVals('.pc-pro-res'),
      'Cons Res': getVals('.pc-con-res')
    };
  },

  getTIPFormData(container) {
    return {
      'Situation': container.querySelector('#tip-situation').value,
      'T Arousal': container.querySelector('#tip-t-ab').value + '->' + container.querySelector('#tip-t-aa').value,
      'T Distress': container.querySelector('#tip-t-dtb').value + '->' + container.querySelector('#tip-t-dta').value,
      'T Desc': container.querySelector('#tip-t-desc').value,
      'I Arousal': container.querySelector('#tip-i-ab').value + '->' + container.querySelector('#tip-i-aa').value,
      'I Distress': container.querySelector('#tip-i-dtb').value + '->' + container.querySelector('#tip-i-dta').value,
      'I Desc': container.querySelector('#tip-i-desc').value,
      'P1 Arousal': container.querySelector('#tip-p1-ab').value + '->' + container.querySelector('#tip-p1-aa').value,
      'P1 Distress': container.querySelector('#tip-p1-dtb').value + '->' + container.querySelector('#tip-p1-dta').value,
      'P1 Desc': container.querySelector('#tip-p1-desc').value,
      'P2 Arousal': container.querySelector('#tip-p2-ab').value + '->' + container.querySelector('#tip-p2-aa').value,
      'P2 Distress': container.querySelector('#tip-p2-dtb').value + '->' + container.querySelector('#tip-p2-dta').value,
      'P2 Desc': container.querySelector('#tip-p2-desc').value,
    };
  },

  getRadicalAccFormData(container) {
    return {
      'Imp1': container.querySelector('#ra-imp1').value + ' (' + container.querySelector('#ra-imp1-rate').value + ')',
      'Imp2': container.querySelector('#ra-imp2').value + ' (' + container.querySelector('#ra-imp2-rate').value + ')',
      'Less1': container.querySelector('#ra-less1').value + ' (' + container.querySelector('#ra-less1-rate').value + ')',
      'Less2': container.querySelector('#ra-less2').value + ' (' + container.querySelector('#ra-less2-rate').value + ')',
      'Checks': Array.from(container.querySelectorAll('.ra-check:checked')).map(c => c.value).join(', '),
      'Details': container.querySelector('#ra-details').value,
      'Rate After': container.querySelector('#ra-rate-after').value
    };
  },

  getTurningMindFormData(container) {
    return {
      'Acc Before': container.querySelector('#tm-acc-before').value,
      'Acc After': container.querySelector('#tm-acc-after').value,
      'Observe': container.querySelector('#tm-observe').value,
      'Commit': container.querySelector('#tm-commit').value,
      'Plan': container.querySelector('#tm-plan').value,
      'Will Rating': container.querySelector('#tm-will-rating').value,
      'Eff Behavior': container.querySelector('#tm-eff-behavior').value,
      'Notice Will': container.querySelector('#tm-notice-will').value,
      'Practiced Acc': container.querySelector('#tm-practiced-acc').value,
      'Willing Actions': container.querySelector('#tm-willing-actions').value
    };
  },

  getHalfSmileFormData(container) {
    return {
      'Checks': Array.from(container.querySelectorAll('.hs-check:checked')).map(c => c.value).join(', '),
      'S1': container.querySelector('#hs-s1-desc').value + ' (' + container.querySelector('#hs-s1-effect').value + ')',
      'S2': container.querySelector('#hs-s2-desc').value + ' (' + container.querySelector('#hs-s2-effect').value + ')',
      'S3': container.querySelector('#hs-s3-desc').value + ' (' + container.querySelector('#hs-s3-effect').value + ')'
    };
  },

  getMindfulThoughtsFormData(container) {
    return {
      'Checks': Array.from(container.querySelectorAll('.mt-check:checked')).map(c => c.value).join(', '),
      'T1': container.querySelector('#mt-t1-desc').value + ' (' + container.querySelector('#mt-t1-effect').value + ')',
      'T2': container.querySelector('#mt-t2-desc').value + ' (' + container.querySelector('#mt-t2-effect').value + ')',
      'T3': container.querySelector('#mt-t3-desc').value + ' (' + container.querySelector('#mt-t3-effect').value + ')',
      'Mon': container.querySelector('#mt-mon').value,
      'Tue': container.querySelector('#mt-tue').value,
      'Wed': container.querySelector('#mt-wed').value,
      'Thu': container.querySelector('#mt-thu').value,
      'Fri': container.querySelector('#mt-fri').value,
      'Sat': container.querySelector('#mt-sat').value,
      'Sun': container.querySelector('#mt-sun').value,
    };
  },

  getCAFormData(container) {
    return {
      'Problem Behavior': container.querySelector('#ca-behavior').value,
      'Intensity Level': container.querySelector('#ca-intensity').value + '/100',
      'Prompting Event': container.querySelector('#ca-prompting-event').value,
      'Vulnerabilities': container.querySelector('#ca-vulnerabilities').value,
      'Chain of Links': container.querySelector('#ca-links').value,
      'Consequences': container.querySelector('#ca-consequences').value,
      'Skill Repair Points': container.querySelector('#ca-skill-repairs').value,
      'Prevention Plan': container.querySelector('#ca-prevention').value
    };
  },

  getAccFormData(container) {
    const checks = Array.from(container.querySelectorAll('.acc-check:checked')).map(c => c.value);
    return {
      'Prompting': container.querySelector('#acc-prompting').value,
      'Distress Before': container.querySelector('#acc-before').value + '/100',
      'Distress After': container.querySelector('#acc-after').value + '/100',
      'Skills Checked': checks.join(', ') || 'None selected',
      'Skills Described': container.querySelector('#acc-desc').value,
      'Outcome': container.querySelector('#acc-outcome').value,
      'Effectiveness': container.querySelector('#acc-effect').value + '/5'
    };
  },

  getSootheFormData(container) {
    const checks = Array.from(container.querySelectorAll('.soothe-check:checked')).map(c => c.value);
    return {
      'Prompting': container.querySelector('#soothe-prompting').value,
      'Distress Before': container.querySelector('#soothe-before').value + '/100',
      'Distress After': container.querySelector('#soothe-after').value + '/100',
      'Senses Checked': checks.join(', ') || 'None selected',
      'Skills Described': container.querySelector('#soothe-desc').value,
      'Outcome': container.querySelector('#soothe-outcome').value,
      'Effectiveness': container.querySelector('#soothe-effect').value + '/5'
    };
  },

  getImpFormData(container) {
    const checks = Array.from(container.querySelectorAll('.imp-check:checked')).map(c => c.value);
    return {
      'Prompting': container.querySelector('#imp-prompting').value,
      'Distress Before': container.querySelector('#imp-before').value + '/100',
      'Distress After': container.querySelector('#imp-after').value + '/100',
      'Skills Checked': checks.join(', ') || 'None selected',
      'Skills Described': container.querySelector('#imp-desc').value,
      'Outcome': container.querySelector('#imp-outcome').value,
      'Effectiveness': container.querySelector('#imp-effect').value + '/5'
    };
  },

  async loadSavedEntries(container) {
    const listContainer = container.querySelector('#dt-saved-list');
    if (!listContainer) return;
    const entries = await db.getWorksheets();
    
    // Filter to Distress Tolerance worksheets
    const dtTypes = ['chain_analysis', 'stop_ws2', 'pros_cons_ws3', 'tip_ws4', 'accepts_ws5', 'soothe_ws6', 'improve_ws7', 'radical_acc_ws9', 'turning_mind_ws10', 'half_smile_ws11', 'mindful_thoughts_ws12'];
    const dtEntries = entries.filter(x => dtTypes.includes(x.type));

    if (!dtEntries.length) {
      listContainer.innerHTML = `<p style="color: var(--text-muted); font-size: 0.85rem;">No saved worksheets yet.</p>`;
      return;
    }

    const typeLabels = {
      'chain_analysis': 'Chain Analysis (WS 2)',
      'stop_ws2': 'STOP Skill (WS 4)',
      'pros_cons_ws3': 'Pros & Cons (WS 3)',
      'tip_ws4': 'TIPP Skills (WS 4)',
      'accepts_ws5': 'ACCEPTS (WS 5)',
      'soothe_ws6': 'Self-Soothe (WS 6)',
      'improve_ws7': 'IMPROVE (WS 7)',
      'radical_acc_ws9': 'Radical Acceptance (WS 9)',
      'turning_mind_ws10': 'Turning the Mind (WS 10)',
      'half_smile_ws11': 'Half-Smiling (WS 11)',
      'mindful_thoughts_ws12': 'Mindful Thoughts (WS 12)'
    };

    listContainer.innerHTML = dtEntries.map(item => `
      <div style="background: var(--bg-secondary); border: 1px solid var(--border-color); padding: 0.85rem; border-radius: var(--radius-md); margin-bottom: 0.75rem; display: flex; justify-content: space-between; align-items: center; gap: 1rem; flex-wrap: wrap;">
        <div>
          <span class="badge badge-rose" style="font-size: 0.7rem; margin-bottom: 0.25rem; display: inline-block;">${typeLabels[item.type] || 'Worksheet'}</span>
          <strong style="color: var(--accent-rose); display: block; font-size: 0.9rem;">${item.title}</strong>
          <span style="font-size: 0.75rem; color: var(--text-muted);">${new Date(item.createdAt).toLocaleString()}</span>
        </div>
        <div style="display: flex; gap: 0.4rem;">
          <button class="btn btn-secondary" style="padding: 0.3rem 0.6rem; font-size: 0.75rem;" onclick="window.viewSavedDT('${item.id}')">👁️ View</button>
          <button class="btn btn-secondary" style="padding: 0.3rem 0.6rem; font-size: 0.75rem;" onclick="window.copySavedDT('${item.id}')">📋 Copy</button>
          <button class="btn btn-secondary" style="padding: 0.3rem 0.6rem; font-size: 0.75rem;" onclick="window.printSavedDT('${item.id}')">🖨️ Print</button>
          <button class="btn btn-danger" style="padding: 0.3rem 0.6rem; font-size: 0.75rem;" onclick="window.deleteDT('${item.id}')">🗑️</button>
        </div>
      </div>
    `).join('');

    window.viewSavedDT = (id) => {
      const item = dtEntries.find(x => x.id === id);
      if (item) this.showDetailModal(item);
    };

    window.copySavedDT = (id) => {
      const item = dtEntries.find(x => x.id === id);
      if (item) Exports.copyForPortal(item.title, item.createdAt, item.data);
    };

    window.printSavedDT = (id) => {
      const item = entries.find(x => x.id === id);
      if (item) Exports.printWorksheet(item.title, item.createdAt, item.data);
    };

    window.deleteDT = async (id) => {
      if (confirm('Delete this worksheet entry?')) {
        await db.deleteWorksheet(id);
        this.loadSavedEntries(container);
      }
    };
  },

  showDetailModal(item) {
    let modal = document.getElementById('dt-detail-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'dt-detail-modal';
      modal.className = 'modal-overlay';
      document.body.appendChild(modal);
    }

    let fieldsHTML = '';
    for (const [key, value] of Object.entries(item.data)) {
      fieldsHTML += `
        <div style="margin-bottom: 0.75rem; border-bottom: 1px solid var(--border-color); padding-bottom: 0.4rem;">
          <strong style="color: var(--accent-rose); font-size: 0.8rem; text-transform: uppercase; display: block;">${key}</strong>
          <div style="font-size: 0.85rem; color: var(--text-primary); white-space: pre-wrap; margin-top: 0.15rem;">${value || 'N/A'}</div>
        </div>
      `;
    }

    modal.innerHTML = `
      <div class="modal-card" style="max-width: 600px; max-height: 85vh; display: flex; flex-direction: column; padding: 1.5rem; position: relative;">
        <button type="button" class="modal-close-x" style="position: absolute; top: 0.75rem; right: 1rem; background: transparent; border: none; font-size: 1.5rem; color: var(--text-muted); cursor: pointer; line-height: 1; padding: 0; z-index: 10;">&times;</button>
        <h3 style="font-size: 1.15rem; margin-bottom: 0.25rem; color: var(--accent-rose); display: flex; align-items: center; gap: 0.4rem;">
          📋 Saved Worksheet Details
        </h3>
        <p style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 1rem; border-bottom: 1px solid var(--border-color); padding-bottom: 0.4rem;">
          <strong>Title:</strong> ${item.title}<br>
          <strong>Saved At:</strong> ${new Date(item.createdAt).toLocaleString()}
        </p>

        <div style="flex: 1; overflow-y: auto; padding-right: 0.25rem; margin-bottom: 1rem;">
          ${fieldsHTML}
        </div>

        <div style="display: flex; gap: 0.5rem; justify-content: flex-end; border-top: 1px solid var(--border-color); padding-top: 0.75rem;">
          <button class="btn btn-secondary" id="btn-close-dt-modal">Close</button>
          <button class="btn btn-secondary" id="btn-modal-dt-copy">📋 Copy</button>
          <button class="btn btn-secondary" id="btn-modal-dt-print">🖨️ Print</button>
          <button class="btn btn-primary" id="btn-modal-dt-load">✏️ Edit / Load</button>
        </div>
      </div>
    `;

    modal.classList.add('active');

    const closeBtn = modal.querySelector('#btn-close-dt-modal');
    const closeX = modal.querySelector('.modal-close-x');
    const closeModal = () => modal.classList.remove('active');
    closeBtn.addEventListener('click', closeModal);
    closeX.addEventListener('click', closeModal);

    modal.querySelector('#btn-modal-dt-copy').addEventListener('click', () => {
      Exports.copyForPortal(item.title, item.createdAt, item.data);
    });
    modal.querySelector('#btn-modal-dt-print').addEventListener('click', () => {
      Exports.printWorksheet(item.title, item.createdAt, item.data);
    });
    modal.querySelector('#btn-modal-dt-load').addEventListener('click', () => {
      this.loadEntryIntoForm(item);
      closeModal();
    });
  },

  loadEntryIntoForm(item) {
    const typeTabMap = {
      'chain_analysis': 'dt-chain',
      'stop_ws2': 'dt-stop',
      'pros_cons_ws3': 'dt-proscons',
      'tip_ws4': 'dt-tip',
      'accepts_ws5': 'dt-accepts-ws',
      'soothe_ws6': 'dt-soothe-ws',
      'improve_ws7': 'dt-improve-ws',
      'radical_acc_ws9': 'dt-radical-acc',
      'turning_mind_ws10': 'dt-turning-mind',
      'half_smile_ws11': 'dt-half-smile',
      'mindful_thoughts_ws12': 'dt-mindful-thoughts'
    };
    const tabKey = typeTabMap[item.type];
    if (tabKey) {
      const tabBtn = document.querySelector(`.nav-tabs .tab-btn[data-dttab="${tabKey}"]`);
      if (tabBtn) tabBtn.click();
    }

    if (item.type === 'chain_analysis') {
      document.getElementById('ca-behavior').value = item.data['Problem Behavior'] || '';
      document.getElementById('ca-intensity').value = (item.data['Intensity Level'] || '').replace('/100', '');
      document.getElementById('ca-prompting-event').value = item.data['Prompting Event'] || '';
      document.getElementById('ca-vulnerabilities').value = item.data['Vulnerabilities'] || '';
      document.getElementById('ca-links').value = item.data['Chain of Links'] || '';
      document.getElementById('ca-consequences').value = item.data['Consequences'] || '';
      document.getElementById('ca-skill-repairs').value = item.data['Skill Repair Points'] || '';
      document.getElementById('ca-prevention').value = item.data['Prevention Plan'] || '';
    } else if (item.type === 'stop_ws2') {
      document.getElementById('stop-s1-before').value = item.data['S1 Before'] || '';
      document.getElementById('stop-s1-after').value = item.data['S1 After'] || '';
      document.getElementById('stop-s1-prompt').value = item.data['S1 Prompt'] || '';
      document.getElementById('stop-s1-behavior').value = item.data['S1 Behavior'] || '';
      document.getElementById('stop-s1-outcome').value = item.data['S1 Outcome'] || '';
      document.getElementById('stop-s1-effect').value = item.data['S1 Effect'] || '';

      const s1Checks = (item.data['S1 Checks'] || '').split(', ');
      document.querySelectorAll('.stop-s1-check').forEach(chk => chk.checked = s1Checks.includes(chk.value));

      document.getElementById('stop-s2-before').value = item.data['S2 Before'] || '';
      document.getElementById('stop-s2-after').value = item.data['S2 After'] || '';
      document.getElementById('stop-s2-prompt').value = item.data['S2 Prompt'] || '';
      document.getElementById('stop-s2-behavior').value = item.data['S2 Behavior'] || '';
      document.getElementById('stop-s2-outcome').value = item.data['S2 Outcome'] || '';
      document.getElementById('stop-s2-effect').value = item.data['S2 Effect'] || '';

      const s2Checks = (item.data['S2 Checks'] || '').split(', ');
      document.querySelectorAll('.stop-s2-check').forEach(chk => chk.checked = s2Checks.includes(chk.value));
    } else if (item.type === 'pros_cons_ws3') {
      document.getElementById('pc-behavior').value = item.data['Behavior'] || '';
      
      const populateInputs = (selector, valuesStr) => {
        const vals = (valuesStr || '').split(', ');
        const inputs = document.querySelectorAll(selector);
        inputs.forEach((input, index) => {
          input.value = vals[index] || '';
        });
      };
      populateInputs('.pc-pro-act', item.data['Pros Act']);
      populateInputs('.pc-con-act', item.data['Cons Act']);
      populateInputs('.pc-pro-res', item.data['Pros Res']);
      populateInputs('.pc-con-res', item.data['Cons Res']);
    } else if (item.type === 'tip_ws4') {
      document.getElementById('tip-situation').value = item.data['Situation'] || '';
      
      const setArousalDistress = (abId, aaId, dtbId, dtaId, descId, arousalVal, distressVal, descVal) => {
        const aParts = (arousalVal || '').split('->');
        document.getElementById(abId).value = aParts[0] || '';
        document.getElementById(aaId).value = aParts[1] || '';

        const dParts = (distressVal || '').split('->');
        document.getElementById(dtbId).value = dParts[0] || '';
        document.getElementById(dtaId).value = dParts[1] || '';

        document.getElementById(descId).value = descVal || '';
      };

      setArousalDistress('tip-t-ab', 'tip-t-aa', 'tip-t-dtb', 'tip-t-dta', 'tip-t-desc', item.data['T Arousal'], item.data['T Distress'], item.data['T Desc']);
      setArousalDistress('tip-i-ab', 'tip-i-aa', 'tip-i-dtb', 'tip-i-dta', 'tip-i-desc', item.data['I Arousal'], item.data['I Distress'], item.data['I Desc']);
      setArousalDistress('tip-p1-ab', 'tip-p1-aa', 'tip-p1-dtb', 'tip-p1-dta', 'tip-p1-desc', item.data['P1 Arousal'], item.data['P1 Distress'], item.data['P1 Desc']);
      setArousalDistress('tip-p2-ab', 'tip-p2-aa', 'tip-p2-dtb', 'tip-p2-dta', 'tip-p2-desc', item.data['P2 Arousal'], item.data['P2 Distress'], item.data['P2 Desc']);
    } else if (item.type === 'accepts_ws5') {
      document.getElementById('acc-prompting').value = item.data['Prompting'] || '';
      document.getElementById('acc-before').value = (item.data['Distress Before'] || '').replace('/100', '');
      document.getElementById('acc-after').value = (item.data['Distress After'] || '').replace('/100', '');
      document.getElementById('acc-desc').value = item.data['Skills Described'] || '';
      document.getElementById('acc-outcome').value = item.data['Outcome'] || '';
      document.getElementById('acc-effect').value = (item.data['Effectiveness'] || '').replace('/5', '');

      const checks = (item.data['Skills Checked'] || '').split(', ');
      document.querySelectorAll('.acc-check').forEach(chk => chk.checked = checks.includes(chk.value));
    } else if (item.type === 'soothe_ws6') {
      document.getElementById('soothe-prompting').value = item.data['Prompting'] || '';
      document.getElementById('soothe-before').value = (item.data['Distress Before'] || '').replace('/100', '');
      document.getElementById('soothe-after').value = (item.data['Distress After'] || '').replace('/100', '');
      document.getElementById('soothe-desc').value = item.data['Skills Described'] || '';
      document.getElementById('soothe-outcome').value = item.data['Outcome'] || '';
      document.getElementById('soothe-effect').value = (item.data['Effectiveness'] || '').replace('/5', '');

      const checks = (item.data['Senses Checked'] || '').split(', ');
      document.querySelectorAll('.soothe-check').forEach(chk => chk.checked = checks.includes(chk.value));
    } else if (item.type === 'improve_ws7') {
      document.getElementById('imp-prompting').value = item.data['Prompting'] || '';
      document.getElementById('imp-before').value = (item.data['Distress Before'] || '').replace('/100', '');
      document.getElementById('imp-after').value = (item.data['Distress After'] || '').replace('/100', '');
      document.getElementById('imp-desc').value = item.data['Skills Described'] || '';
      document.getElementById('imp-outcome').value = item.data['Outcome'] || '';
      document.getElementById('imp-effect').value = (item.data['Effectiveness'] || '').replace('/5', '');

      const checks = (item.data['Skills Checked'] || '').split(', ');
      document.querySelectorAll('.imp-check').forEach(chk => chk.checked = checks.includes(chk.value));
    } else if (item.type === 'radical_acc_ws9') {
      const getValAndRate = (sourceStr) => {
        const match = (sourceStr || '').match(/^(.*?)\s*\((.*?)\)$/);
        return match ? [match[1], match[2]] : ['', ''];
      };

      const [imp1Val, imp1Rate] = getValAndRate(item.data['Imp1']);
      document.getElementById('ra-imp1').value = imp1Val;
      document.getElementById('ra-imp1-rate').value = imp1Rate;

      const [imp2Val, imp2Rate] = getValAndRate(item.data['Imp2']);
      document.getElementById('ra-imp2').value = imp2Val;
      document.getElementById('ra-imp2-rate').value = imp2Rate;

      const [less1Val, less1Rate] = getValAndRate(item.data['Less1']);
      document.getElementById('ra-less1').value = less1Val;
      document.getElementById('ra-less1-rate').value = less1Rate;

      const [less2Val, less2Rate] = getValAndRate(item.data['Less2']);
      document.getElementById('ra-less2').value = less2Val;
      document.getElementById('ra-less2-rate').value = less2Rate;

      document.getElementById('ra-details').value = item.data['Details'] || '';
      document.getElementById('ra-rate-after').value = item.data['Rate After'] || '';

      const checks = (item.data['Checks'] || '').split(', ');
      document.querySelectorAll('.ra-check').forEach(chk => chk.checked = checks.includes(chk.value));
    } else if (item.type === 'turning_mind_ws10') {
      document.getElementById('tm-acc-before').value = item.data['Acc Before'] || '';
      document.getElementById('tm-acc-after').value = item.data['Acc After'] || '';
      document.getElementById('tm-observe').value = item.data['Observe'] || '';
      document.getElementById('tm-commit').value = item.data['Commit'] || '';
      document.getElementById('tm-plan').value = item.data['Plan'] || '';
      document.getElementById('tm-will-rating').value = item.data['Will Rating'] || '';
      document.getElementById('tm-eff-behavior').value = item.data['Eff Behavior'] || '';
      document.getElementById('tm-notice-will').value = item.data['Notice Will'] || '';
      document.getElementById('tm-practiced-acc').value = item.data['Practiced Acc'] || '';
      document.getElementById('tm-willing-actions').value = item.data['Willing Actions'] || '';
    } else if (item.type === 'half_smile_ws11') {
      const parseDescAndEffect = (sourceStr) => {
        const match = (sourceStr || '').match(/^(.*?)\s*\((.*?)\)$/);
        return match ? [match[1], match[2]] : ['', ''];
      };

      const [s1Desc, s1Effect] = parseDescAndEffect(item.data['S1']);
      document.getElementById('hs-s1-desc').value = s1Desc;
      document.getElementById('hs-s1-effect').value = s1Effect;

      const [s2Desc, s2Effect] = parseDescAndEffect(item.data['S2']);
      document.getElementById('hs-s2-desc').value = s2Desc;
      document.getElementById('hs-s2-effect').value = s2Effect;

      const [s3Desc, s3Effect] = parseDescAndEffect(item.data['S3']);
      document.getElementById('hs-s3-desc').value = s3Desc;
      document.getElementById('hs-s3-effect').value = s3Effect;

      const checks = (item.data['Checks'] || '').split(', ');
      document.querySelectorAll('.hs-check').forEach(chk => chk.checked = checks.includes(chk.value));
    } else if (item.type === 'mindful_thoughts_ws12') {
      const parseDescAndEffect = (sourceStr) => {
        const match = (sourceStr || '').match(/^(.*?)\s*\((.*?)\)$/);
        return match ? [match[1], match[2]] : ['', ''];
      };

      const [t1Desc, t1Effect] = parseDescAndEffect(item.data['T1']);
      document.getElementById('mt-t1-desc').value = t1Desc;
      document.getElementById('mt-t1-effect').value = t1Effect;

      const [t2Desc, t2Effect] = parseDescAndEffect(item.data['T2']);
      document.getElementById('mt-t2-desc').value = t2Desc;
      document.getElementById('mt-t2-effect').value = t2Effect;

      const [t3Desc, t3Effect] = parseDescAndEffect(item.data['T3']);
      document.getElementById('mt-t3-desc').value = t3Desc;
      document.getElementById('mt-t3-effect').value = t3Effect;

      document.getElementById('mt-mon').value = item.data['Mon'] || '';
      document.getElementById('mt-tue').value = item.data['Tue'] || '';
      document.getElementById('mt-wed').value = item.data['Wed'] || '';
      document.getElementById('mt-thu').value = item.data['Thu'] || '';
      document.getElementById('mt-fri').value = item.data['Fri'] || '';
      document.getElementById('mt-sat').value = item.data['Sat'] || '';
      document.getElementById('mt-sun').value = item.data['Sun'] || '';

      const checks = (item.data['Checks'] || '').split(', ');
      document.querySelectorAll('.mt-check').forEach(chk => chk.checked = checks.includes(chk.value));
    }
  }
};
