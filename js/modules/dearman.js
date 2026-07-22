/* Interpersonal Effectiveness: DEAR MAN (WS 4), Validating Others (WS 12), Self-Validation (WS 13), Clarifying Priorities (WS 3) */
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
            <p class="card-subtitle">Clarify your priorities, build scripts, and practice validation.</p>
          </div>
        </div>

        <div class="nav-tabs" style="display: none !important; background: transparent; border-bottom: 1px solid var(--border-color); margin-bottom: 1.25rem;">
          <button class="tab-btn active" data-ietab="ie-dearman">🗣️ DEAR MAN & GIVE FAST Builder (WS 4)</button>
          <button class="tab-btn" data-ietab="ie-priorities">🎯 Clarifying Priorities (Worksheet 3)</button>
          <button class="tab-btn" data-ietab="ie-tracking">📝 Tracking Skills Use (WS 5)</button>
          <button class="tab-btn" data-ietab="ie-mindfulness">👁️ Mindfulness of Others (WS 9)</button>
          <button class="tab-btn" data-ietab="ie-dialectics">⚖️ Practicing Dialectics (WS 11)</button>
          <button class="tab-btn" data-ietab="ie-val-others">👥 Validating Others (Worksheet 12)</button>
          <button class="tab-btn" data-ietab="ie-self-val">🛡️ Self-Validation (Worksheet 13)</button>
        </div>

        <!-- DEAR MAN Script Builder (Worksheet 4) -->
        <div class="ietab-content active" id="ie-dearman">
          <form id="dearman-form">
            <div class="grid-3">
              <div class="form-group">
                <label class="form-label">Objectives in Situation (Results I want)</label>
                <input type="text" class="form-control" id="dm-goal" placeholder="e.g. Asking for 1 hour of quiet rest time..." required>
              </div>
              <div class="form-group">
                <label class="form-label">Relationship Issue (How I want them to feel about me)</label>
                <input type="text" class="form-control" id="dm-rel-issue" placeholder="e.g. Keep connection secure and avoid conflict...">
              </div>
              <div class="form-group">
                <label class="form-label">Self-Respect Issue (How I want to feel about myself)</label>
                <input type="text" class="form-control" id="dm-self-issue" placeholder="e.g. Feel assertive and protect my boundaries...">
              </div>
            </div>

            <h4 style="color: var(--accent-blue); margin-bottom: 0.5rem; font-size: 0.9rem; border-bottom: 1px solid var(--border-color); padding-bottom: 0.25rem;">SCRIPT IDEAS FOR DEAR MAN, GIVE FAST</h4>

            <div class="grid-2">
              <div class="form-group">
                <label class="form-label">1. Describe situation (Clear non-judgmental facts)</label>
                <textarea class="form-control" id="dm-describe" placeholder="e.g. 'I've been training for 3 hours and managing the kids' dinner...'"></textarea>
              </div>
              <div class="form-group">
                <label class="form-label">2. Express feelings/opinions (Express clearly)</label>
                <textarea class="form-control" id="dm-express" placeholder="e.g. 'I'm feeling overwhelmed and physically depleted...'"></textarea>
              </div>
            </div>

            <div class="grid-2">
              <div class="form-group">
                <label class="form-label">3. Assert request / say NO directly (Broken record focus)</label>
                <textarea class="form-control" id="dm-assert" placeholder="e.g. 'I need you to take over bedtime duty for the next hour.'"></textarea>
              </div>
              <div class="form-group">
                <label class="form-label">4. Reinforcing comments (Explain positive consequences)</label>
                <textarea class="form-control" id="dm-reinforce" placeholder="e.g. 'That will give me energy so I can be fully present for tomorrow...'"></textarea>
              </div>
            </div>

            <div class="grid-3">
              <div class="form-group">
                <label class="form-label">5. Mindful & Appearing Confident comments</label>
                <textarea class="form-control" id="dm-mindful" placeholder="Stay on message; maintain posture & eye contact."></textarea>
              </div>
              <div class="form-group">
                <label class="form-label">6. Negotiating comments (Middle ground / solutions)</label>
                <textarea class="form-control" id="dm-negotiate" placeholder="e.g. 'I can take over morning duty tomorrow in return.'"></textarea>
              </div>
              <div class="form-group">
                <label class="form-label">7. Validating comments (GIVE: validate their perspective)</label>
                <textarea class="form-control" id="dm-validate" placeholder="e.g. 'I know you had a busy day at work too...'"></textarea>
              </div>
            </div>

            <div class="grid-2">
              <div class="form-group">
                <label class="form-label">8. Easy manner comments (GIVE: easygoing & light tone)</label>
                <textarea class="form-control" id="dm-easymanner" placeholder="e.g. 'Let's team up on this, it'll make dinner go smoother...'"></textarea>
              </div>
              <div class="form-group">
                <label class="form-label">Things to AVOID doing and saying (Write to keep mindful of traps)</label>
                <textarea class="form-control" id="dm-avoid" placeholder="e.g. Avoid apologizing for asking, avoid yelling, avoid slamming doors..."></textarea>
              </div>
            </div>

            <div style="display: flex; gap: 0.5rem; justify-content: flex-end;">
              <button type="button" class="btn btn-secondary" id="btn-copy-dm">📋 Copy Script</button>
              <button type="submit" class="btn btn-primary">💾 Save Script WS 4</button>
            </div>
          </form>
        </div>

        <!-- Clarifying Priorities (Worksheet 3) -->
        <div class="ietab-content" id="ie-priorities" style="display: none;">
          <form id="priorities-ws3-form">
            <div class="form-group">
              <label class="form-label">Prompting Event for my problem (Who did what to whom? What led up to what?)</label>
              <textarea class="form-control" id="prio-prompting" placeholder="Describe the situation..." required></textarea>
            </div>

            <div class="form-group">
              <h4 style="color: var(--accent-blue); margin-bottom: 0.5rem; font-size: 0.95rem;">My Wants & Desires in this Situation:</h4>
              <div class="grid-3">
                <div class="form-group">
                  <label class="form-label">Objectives: What specific results do I want?</label>
                  <textarea class="form-control" id="prio-objectives" placeholder="What do I want this person to do, stop, or accept?"></textarea>
                </div>
                <div class="form-group">
                  <label class="form-label">Relationship: How do I want the other person to feel/think about me?</label>
                  <textarea class="form-control" id="prio-relationship" placeholder="Because of how I handle the interaction..."></textarea>
                </div>
                <div class="form-group">
                  <label class="form-label">Self-Respect: How do I want to feel/think about myself?</label>
                  <textarea class="form-control" id="prio-selfrespect" placeholder="Because of how I handle the interaction..."></textarea>
                </div>
              </div>
            </div>

            <div class="form-group">
              <h4 style="color: var(--accent-purple); margin-bottom: 0.5rem; font-size: 0.95rem;">Rate Priorities (1 = most important, 2 = second, 3 = least):</h4>
              <div class="grid-3">
                <div class="form-group">
                  <label class="form-label">Objectives Priority</label>
                  <select class="form-control" id="prio-rate-obj">
                    <option value="1">1 (Highest)</option>
                    <option value="2">2 (Medium)</option>
                    <option value="3">3 (Lowest)</option>
                  </select>
                </div>
                <div class="form-group">
                  <label class="form-label">Relationship Priority</label>
                  <select class="form-control" id="prio-rate-rel">
                    <option value="2">2 (Medium)</option>
                    <option value="1">1 (Highest)</option>
                    <option value="3">3 (Lowest)</option>
                  </select>
                </div>
                <div class="form-group">
                  <label class="form-label">Self-Respect Priority</label>
                  <select class="form-control" id="prio-rate-self">
                    <option value="3">3 (Lowest)</option>
                    <option value="1">1 (Highest)</option>
                    <option value="2">2 (Medium)</option>
                  </select>
                </div>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">Imbalances and conflicts in priorities that make it hard to be effective:</label>
              <textarea class="form-control" id="prio-conflicts" placeholder="e.g. 'I want to ask for what I want, but I am too worried about what they will think of me...'"></textarea>
            </div>

            <div style="display: flex; gap: 0.5rem; justify-content: flex-end;">
              <button type="button" class="btn btn-secondary" id="btn-copy-prio">📋 Copy Worksheet</button>
              <button type="submit" class="btn btn-primary">💾 Save Worksheet 3</button>
            </div>
          </form>
        </div>

        <!-- Tracking Skills Use (Worksheet 5) -->
        <div class="ietab-content" id="ie-tracking" style="display: none;">
          <form id="tracking-ws5-form">
            <div class="form-group">
              <label class="form-label">Prompting Event</label>
              <textarea class="form-control" id="track-prompting" placeholder="Describe the situation..." required></textarea>
            </div>
            <div class="grid-3">
              <div class="form-group">
                <label class="form-label">Objectives</label>
                <textarea class="form-control" id="track-obj"></textarea>
              </div>
              <div class="form-group">
                <label class="form-label">Relationship Issue</label>
                <textarea class="form-control" id="track-rel"></textarea>
              </div>
              <div class="form-group">
                <label class="form-label">Self-Respect Issue</label>
                <textarea class="form-control" id="track-self"></textarea>
              </div>
            </div>
            <div class="grid-3">
              <div class="form-group">
                <label class="form-label">Rate Priorities (1-3)</label>
                <input type="text" class="form-control" id="track-priorities" placeholder="e.g. Obj: 1, Rel: 2, Self: 3">
              </div>
              <div class="form-group">
                <label class="form-label">Imbalances/Conflicts</label>
                <input type="text" class="form-control" id="track-imbalances">
              </div>
              <div class="form-group">
                <label class="form-label">Effectiveness Rating</label>
                <input type="number" class="form-control" id="track-effectiveness" min="1" max="5" placeholder="1 (low) - 5 (high)">
              </div>
            </div>
            
            <h4 style="color: var(--accent-blue); margin-bottom: 0.5rem; font-size: 0.95rem;">Skills Used:</h4>
            <div class="grid-3" style="margin-bottom: 1rem; background: var(--bg-secondary); padding: 0.75rem; border-radius: var(--radius-md); border: 1px solid var(--border-color);">
              <div>
                <strong>DEAR MAN</strong>
                <label style="display:block; font-size: 0.8rem;"><input type="checkbox" class="track-check" value="Describe"> Describe</label>
                <label style="display:block; font-size: 0.8rem;"><input type="checkbox" class="track-check" value="Express"> Express</label>
                <label style="display:block; font-size: 0.8rem;"><input type="checkbox" class="track-check" value="Assert"> Assert</label>
                <label style="display:block; font-size: 0.8rem;"><input type="checkbox" class="track-check" value="Reinforce"> Reinforce</label>
                <label style="display:block; font-size: 0.8rem;"><input type="checkbox" class="track-check" value="Mindful"> Mindful</label>
                <label style="display:block; font-size: 0.8rem;"><input type="checkbox" class="track-check" value="Broken record"> Broken record</label>
                <label style="display:block; font-size: 0.8rem;"><input type="checkbox" class="track-check" value="Ignored attacks"> Ignored attacks</label>
                <label style="display:block; font-size: 0.8rem;"><input type="checkbox" class="track-check" value="Appeared confident"> Appeared confident</label>
                <label style="display:block; font-size: 0.8rem;"><input type="checkbox" class="track-check" value="Negotiated"> Negotiated</label>
              </div>
              <div>
                <strong>GIVE</strong>
                <label style="display:block; font-size: 0.8rem;"><input type="checkbox" class="track-check" value="Gentle"> Gentle</label>
                <label style="display:block; font-size: 0.8rem;"><input type="checkbox" class="track-check" value="No threats"> No threats</label>
                <label style="display:block; font-size: 0.8rem;"><input type="checkbox" class="track-check" value="No attacks"> No attacks</label>
                <label style="display:block; font-size: 0.8rem;"><input type="checkbox" class="track-check" value="No judgments"> No judgments</label>
                <label style="display:block; font-size: 0.8rem;"><input type="checkbox" class="track-check" value="Interested"> Interested</label>
                <label style="display:block; font-size: 0.8rem;"><input type="checkbox" class="track-check" value="Validated"> Validated</label>
                <label style="display:block; font-size: 0.8rem;"><input type="checkbox" class="track-check" value="Easy manner"> Easy manner</label>
              </div>
              <div>
                <strong>FAST</strong>
                <label style="display:block; font-size: 0.8rem;"><input type="checkbox" class="track-check" value="Fair"> Fair</label>
                <label style="display:block; font-size: 0.8rem;"><input type="checkbox" class="track-check" value="No apologies"> No apologies</label>
                <label style="display:block; font-size: 0.8rem;"><input type="checkbox" class="track-check" value="Stuck to values"> Stuck to values</label>
                <label style="display:block; font-size: 0.8rem;"><input type="checkbox" class="track-check" value="Truthful"> Truthful</label>
              </div>
            </div>

            <div style="display: flex; gap: 0.5rem; justify-content: flex-end;">
              <button type="button" class="btn btn-secondary" id="btn-copy-track">📋 Copy Worksheet</button>
              <button type="submit" class="btn btn-primary">💾 Save Worksheet 5</button>
            </div>
          </form>
        </div>

        <!-- Mindfulness of Others (Worksheet 9) -->
        <div class="ietab-content" id="ie-mindfulness" style="display: none;">
          <form id="mindfulness-ws9-form">
            <h4 style="color: var(--accent-blue); margin-bottom: 0.5rem; font-size: 0.95rem;">Practices Used:</h4>
            <div class="grid-3" style="margin-bottom: 1rem; background: var(--bg-secondary); padding: 0.75rem; border-radius: var(--radius-md); border: 1px solid var(--border-color);">
              <label style="font-size: 0.8rem;"><input type="checkbox" class="mind-check" value="Observe"> Observe</label>
              <label style="font-size: 0.8rem;"><input type="checkbox" class="mind-check" value="Describe"> Describe</label>
              <label style="font-size: 0.8rem;"><input type="checkbox" class="mind-check" value="Participate"> Participate</label>
            </div>
            
            <div class="form-group">
              <label class="form-label">Who was the person?</label>
              <input type="text" class="form-control" id="mind-who" required>
            </div>
            <div class="form-group">
              <label class="form-label">Describe situation</label>
              <textarea class="form-control" id="mind-situation"></textarea>
            </div>
            <div class="form-group">
              <label class="form-label">How did you practice mindfulness?</label>
              <textarea class="form-control" id="mind-how"></textarea>
            </div>
            <div class="grid-3">
              <div class="form-group">
                <label class="form-label">What was the outcome?</label>
                <textarea class="form-control" id="mind-outcome"></textarea>
              </div>
              <div class="form-group">
                <label class="form-label">How did you feel?</label>
                <textarea class="form-control" id="mind-feel"></textarea>
              </div>
              <div class="form-group">
                <label class="form-label">Did being mindful make a difference?</label>
                <textarea class="form-control" id="mind-diff"></textarea>
              </div>
            </div>

            <div style="display: flex; gap: 0.5rem; justify-content: flex-end;">
              <button type="button" class="btn btn-secondary" id="btn-copy-mind">📋 Copy Worksheet</button>
              <button type="submit" class="btn btn-primary">💾 Save Worksheet 9</button>
            </div>
          </form>
        </div>

        <!-- Practicing Dialectics (Worksheet 11) -->
        <div class="ietab-content" id="ie-dialectics" style="display: none;">
          <form id="dialectics-ws11-form">
            <h4 style="color: var(--accent-purple); margin-bottom: 0.5rem; font-size: 0.95rem;">Situation 1:</h4>
            <div class="form-group">
              <label class="form-label">What happened?</label>
              <textarea class="form-control" id="dial-sit1" required></textarea>
            </div>
            <div class="grid-2" style="margin-bottom: 1rem; background: var(--bg-secondary); padding: 0.75rem; border-radius: var(--radius-md); border: 1px solid var(--border-color);">
              <label style="font-size: 0.8rem;"><input type="checkbox" class="dial-check1" value="Looked at both sides"> Looked at both sides</label>
              <label style="font-size: 0.8rem;"><input type="checkbox" class="dial-check1" value="Stayed aware"> Stayed aware</label>
              <label style="font-size: 0.8rem;"><input type="checkbox" class="dial-check1" value="Embraced change"> Embraced change</label>
              <label style="font-size: 0.8rem;"><input type="checkbox" class="dial-check1" value="Remembered influence"> Remembered influence</label>
            </div>
            <div class="form-group">
              <label class="form-label">Describe skills used:</label>
              <textarea class="form-control" id="dial-skills1"></textarea>
            </div>
            <div class="grid-2" style="margin-bottom: 1rem; background: var(--bg-secondary); padding: 0.75rem; border-radius: var(--radius-md); border: 1px solid var(--border-color);">
              <strong>Outcomes:</strong>
              <label style="font-size: 0.8rem;"><input type="checkbox" class="dial-out1" value="Reduced suffering"> Reduced suffering</label>
              <label style="font-size: 0.8rem;"><input type="checkbox" class="dial-out1" value="Increased connection"> Increased connection</label>
            </div>

            <h4 style="color: var(--accent-purple); margin-bottom: 0.5rem; font-size: 0.95rem;">Situation 2:</h4>
            <div class="form-group">
              <label class="form-label">What happened?</label>
              <textarea class="form-control" id="dial-sit2"></textarea>
            </div>
            <div class="grid-2" style="margin-bottom: 1rem; background: var(--bg-secondary); padding: 0.75rem; border-radius: var(--radius-md); border: 1px solid var(--border-color);">
              <label style="font-size: 0.8rem;"><input type="checkbox" class="dial-check2" value="Looked at both sides"> Looked at both sides</label>
              <label style="font-size: 0.8rem;"><input type="checkbox" class="dial-check2" value="Stayed aware"> Stayed aware</label>
              <label style="font-size: 0.8rem;"><input type="checkbox" class="dial-check2" value="Embraced change"> Embraced change</label>
              <label style="font-size: 0.8rem;"><input type="checkbox" class="dial-check2" value="Remembered influence"> Remembered influence</label>
            </div>
            <div class="form-group">
              <label class="form-label">Describe skills used:</label>
              <textarea class="form-control" id="dial-skills2"></textarea>
            </div>
            <div class="grid-2" style="margin-bottom: 1rem; background: var(--bg-secondary); padding: 0.75rem; border-radius: var(--radius-md); border: 1px solid var(--border-color);">
              <strong>Outcomes:</strong>
              <label style="font-size: 0.8rem;"><input type="checkbox" class="dial-out2" value="Reduced suffering"> Reduced suffering</label>
              <label style="font-size: 0.8rem;"><input type="checkbox" class="dial-out2" value="Increased connection"> Increased connection</label>
            </div>

            <div style="display: flex; gap: 0.5rem; justify-content: flex-end;">
              <button type="button" class="btn btn-secondary" id="btn-copy-dial">📋 Copy Worksheet</button>
              <button type="submit" class="btn btn-primary">💾 Save Worksheet 11</button>
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

            <div class="grid-2">
              <div class="form-group">
                <label class="form-label">Describe a Nonjudgmental situation:</label>
                <textarea class="form-control" id="val-nonjudgmental" placeholder="Describe a time you were nonjudgmental."></textarea>
              </div>
              <div class="form-group">
                <label class="form-label">What would you do differently?</label>
                <textarea class="form-control" id="val-differently" placeholder="Next time, I would..."></textarea>
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

            <div class="form-group">
              <label class="form-label">Felt invalidated in the past week:</label>
              <textarea class="form-control" id="sval-pastweek" placeholder="Describe a situation from this past week..."></textarea>
            </div>
            <div class="grid-2">
              <div class="form-group">
                <label class="form-label">Grieved traumatic invalidation:</label>
                <textarea class="form-control" id="sval-grieve" placeholder="How have you grieved..."></textarea>
              </div>
              <div class="form-group">
                <label class="form-label">Radical acceptance of invalidator:</label>
                <textarea class="form-control" id="sval-radical" placeholder="Practicing radical acceptance..."></textarea>
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
      await db.saveWorksheet({ type: 'dear_man', title: `DEAR MAN Script: ${data['Objectives']}`, data });
      alert('DEAR MAN / GIVE FAST script saved!');
      dmForm.reset();
    });

    container.querySelector('#btn-copy-dm').addEventListener('click', () => {
      const data = this.getDMFormData(container);
      Exports.copyForPortal('DEAR MAN Script', new Date(), data);
    });

    // Clarifying Priorities (WS 3)
    const prioForm = container.querySelector('#priorities-ws3-form');
    prioForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const data = this.getPrioFormData(container);
      await db.saveWorksheet({ type: 'priorities_ws3', title: `Priorities WS3: ${new Date().toLocaleDateString()}`, data });
      alert('Clarifying Priorities Worksheet 3 saved!');
      prioForm.reset();
    });

    container.querySelector('#btn-copy-prio').addEventListener('click', () => {
      const data = this.getPrioFormData(container);
      Exports.copyForPortal('Clarifying Priorities Homework', new Date(), data);
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

    // Tracking Skills (WS 5)
    const trackForm = container.querySelector('#tracking-ws5-form');
    if(trackForm) {
      trackForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const data = this.getTrackFormData(container);
        await db.saveWorksheet({ type: 'tracking_ws5', title: `Tracking WS5: ${new Date().toLocaleDateString()}`, data });
        alert('Tracking Skills Use Worksheet 5 saved!');
        trackForm.reset();
      });

      container.querySelector('#btn-copy-track').addEventListener('click', () => {
        const data = this.getTrackFormData(container);
        Exports.copyForPortal('Tracking Skills Use Homework', new Date(), data);
      });
    }

    // Mindfulness of Others (WS 9)
    const mindForm = container.querySelector('#mindfulness-ws9-form');
    if(mindForm) {
      mindForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const data = this.getMindFormData(container);
        await db.saveWorksheet({ type: 'mindfulness_ws9', title: `Mindfulness WS9: ${data['Person']}`, data });
        alert('Mindfulness of Others Worksheet 9 saved!');
        mindForm.reset();
      });

      container.querySelector('#btn-copy-mind').addEventListener('click', () => {
        const data = this.getMindFormData(container);
        Exports.copyForPortal('Mindfulness of Others Homework', new Date(), data);
      });
    }

    // Practicing Dialectics (WS 11)
    const dialForm = container.querySelector('#dialectics-ws11-form');
    if(dialForm) {
      dialForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const data = this.getDialFormData(container);
        await db.saveWorksheet({ type: 'dialectics_ws11', title: `Dialectics WS11: ${new Date().toLocaleDateString()}`, data });
        alert('Practicing Dialectics Worksheet 11 saved!');
        dialForm.reset();
      });

      container.querySelector('#btn-copy-dial').addEventListener('click', () => {
        const data = this.getDialFormData(container);
        Exports.copyForPortal('Practicing Dialectics Homework', new Date(), data);
      });
    }
  },

  getDMFormData(container) {
    return {
      'Objectives': container.querySelector('#dm-goal').value,
      'Relationship Issue': container.querySelector('#dm-rel-issue').value,
      'Self-Respect Issue': container.querySelector('#dm-self-issue').value,
      'Describe': container.querySelector('#dm-describe').value,
      'Express': container.querySelector('#dm-express').value,
      'Assert': container.querySelector('#dm-assert').value,
      'Reinforce': container.querySelector('#dm-reinforce').value,
      'Mindful & Appear Confident': container.querySelector('#dm-mindful').value,
      'Negotiate': container.querySelector('#dm-negotiate').value,
      'Validate (GIVE)': container.querySelector('#dm-validate').value,
      'Easy Manner (GIVE)': container.querySelector('#dm-easymanner').value,
      'Avoid Actions/Sayings': container.querySelector('#dm-avoid').value
    };
  },

  getPrioFormData(container) {
    return {
      'Prompting Event': container.querySelector('#prio-prompting').value,
      'Objectives Desires': container.querySelector('#prio-objectives').value,
      'Relationship Desires': container.querySelector('#prio-relationship').value,
      'Self-Respect Desires': container.querySelector('#prio-selfrespect').value,
      'Objectives Priority': container.querySelector('#prio-rate-obj').value,
      'Relationship Priority': container.querySelector('#prio-rate-rel').value,
      'Self-Respect Priority': container.querySelector('#prio-rate-self').value,
      'Priority Conflicts': container.querySelector('#prio-conflicts').value
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
      'Feelings': container.querySelector('#val-feelings').value,
      'Nonjudgmental Situation': container.querySelector('#val-nonjudgmental').value,
      'Do Differently': container.querySelector('#val-differently').value
    };
  },

  getSelfValFormData(container) {
    const checks = Array.from(container.querySelectorAll('.sval-check:checked')).map(c => c.value);
    return {
      'Strategies Used': checks.join(', ') || 'None selected',
      'Statements Made': container.querySelector('#sval-statements').value,
      'Situation': container.querySelector('#sval-situation').value,
      'Outcome': container.querySelector('#sval-outcome').value,
      'Felt Invalidated Past Week': container.querySelector('#sval-pastweek').value,
      'Grieved Traumatic Invalidation': container.querySelector('#sval-grieve').value,
      'Radical Acceptance': container.querySelector('#sval-radical').value
    };
  },

  getTrackFormData(container) {
    const checks = Array.from(container.querySelectorAll('.track-check:checked')).map(c => c.value);
    return {
      'Prompting Event': container.querySelector('#track-prompting').value,
      'Objectives': container.querySelector('#track-obj').value,
      'Relationship Issue': container.querySelector('#track-rel').value,
      'Self-Respect Issue': container.querySelector('#track-self').value,
      'Priorities': container.querySelector('#track-priorities').value,
      'Imbalances': container.querySelector('#track-imbalances').value,
      'Effectiveness': container.querySelector('#track-effectiveness').value,
      'Skills Used': checks.join(', ') || 'None selected'
    };
  },

  getMindFormData(container) {
    const checks = Array.from(container.querySelectorAll('.mind-check:checked')).map(c => c.value);
    return {
      'Practices Used': checks.join(', ') || 'None selected',
      'Person': container.querySelector('#mind-who').value,
      'Situation': container.querySelector('#mind-situation').value,
      'How Practiced': container.querySelector('#mind-how').value,
      'Outcome': container.querySelector('#mind-outcome').value,
      'Feelings': container.querySelector('#mind-feel').value,
      'Difference Made': container.querySelector('#mind-diff').value
    };
  },

  getDialFormData(container) {
    const check1 = Array.from(container.querySelectorAll('.dial-check1:checked')).map(c => c.value);
    const out1 = Array.from(container.querySelectorAll('.dial-out1:checked')).map(c => c.value);
    const check2 = Array.from(container.querySelectorAll('.dial-check2:checked')).map(c => c.value);
    const out2 = Array.from(container.querySelectorAll('.dial-out2:checked')).map(c => c.value);
    return {
      'Situation 1': container.querySelector('#dial-sit1').value,
      'Sit1 Practices': check1.join(', ') || 'None',
      'Sit1 Skills': container.querySelector('#dial-skills1').value,
      'Sit1 Outcomes': out1.join(', ') || 'None',
      'Situation 2': container.querySelector('#dial-sit2').value,
      'Sit2 Practices': check2.join(', ') || 'None',
      'Sit2 Skills': container.querySelector('#dial-skills2').value,
      'Sit2 Outcomes': out2.join(', ') || 'None'
    };
  }
};
