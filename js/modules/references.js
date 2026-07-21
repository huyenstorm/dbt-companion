/* Comprehensive References & Custom Handouts Module (Fully populated with Handouts 6, 8A, 11, 13, 20B, X) */

export const ReferencesModule = {
  render(container) {
    container.innerHTML = `
      <div class="card">
        <div class="card-header">
          <div>
            <h2 class="card-title">
              <span class="badge badge-purple">DBT Reference Library</span>
              Official Handouts & Emotion Reference Guides
            </h2>
            <p class="card-subtitle">Complete reference text and guidelines extracted directly from your skills group worksheets.</p>
          </div>
        </div>

        <div class="nav-tabs" style="background: transparent; border-bottom: 1px solid var(--border-color); margin-bottom: 1.25rem; flex-wrap: wrap; gap: 0.5rem;">
          <button class="tab-btn active" data-reftab="ref-emotions">📖 Ways to Describe & Fit Emotions</button>
          <button class="tab-btn" data-reftab="ref-opposite-action">⚡ Reviewing Opposite Action (Handout 13)</button>
          <button class="tab-btn" data-reftab="ref-sleep">🌙 Sleep Hygiene Protocol (20B)</button>
          <button class="tab-btn" data-reftab="ref-sorry">🤝 Apologizing Effectively (I'M SORRY)</button>
          <button class="tab-btn" data-reftab="ref-ie-overview">🎯 IE Goals & Factors (Handout 3)</button>
          <button class="tab-btn" data-reftab="ref-ie-dearman">🗣️ DEAR MAN (Handout 5)</button>
          <button class="tab-btn" data-reftab="ref-ie-give">🤝 GIVE & Validation (Handout 6 & 6A)</button>
          <button class="tab-btn" data-reftab="ref-ie-fast">🛡️ FAST (Handout 7)</button>
          <button class="tab-btn" data-reftab="ref-er-deciding">⚖️ Deciding Opposite Action (Handout 9)</button>
          <button class="tab-btn" data-reftab="ref-er-problemsolving">🧩 Problem Solving Sequence (Handout 12)</button>
        </div>

        <!-- Emotion Dictionary -->
        <div class="reftab-content active" id="ref-emotions">
          <div class="form-group" style="margin-bottom: 1rem;">
            <label class="form-label">Select Emotion to Review Detailed Handout Data:</label>
            <select class="form-control" id="ref-emotion-selector" style="font-weight: 600; border-color: var(--accent-purple);">
              <option value="fear">FEAR / ANXIETY</option>
              <option value="anger">ANGER / FRUSTRATION</option>
              <option value="sadness">SADNESS / GRIEF</option>
              <option value="shame">SHAME / HUMILIATION</option>
              <option value="guilt">GUILT / REMORSE</option>
              <option value="disgust">DISGUST / CONDEMNATION</option>
              <option value="envy">ENVY / DISCONTENT</option>
              <option value="jealousy">JEALOUSY / PROTECTIVENESS</option>
              <option value="love">LOVE / ATTACHMENT</option>
              <option value="happiness">HAPPINESS / JOY</option>
            </select>
          </div>

          <div id="ref-emotion-content">
            <!-- Dynamically populated based on selection -->
          </div>
        </div>

        <!-- Opposite Action Master Matrix (Handout 13) -->
        <div class="reftab-content" id="ref-opposite-action" style="display: none;">
          <div style="background: var(--bg-secondary); padding: 1.25rem; border-radius: var(--radius-lg); border: 1px solid var(--border-color); overflow-x: auto;">
            <h3 style="color: var(--accent-purple); font-size: 1.1rem; margin-bottom: 0.75rem;">Opposite Action Deciding Matrix (Handout 13)</h3>
            <table style="width: 100%; border-collapse: collapse; font-size: 0.8rem; color: var(--text-secondary); text-align: left;">
              <thead>
                <tr style="border-bottom: 2px solid var(--border-color); color: var(--text-primary);">
                  <th style="padding: 0.5rem; width: 15%;">Emotion</th>
                  <th style="padding: 0.5rem; width: 30%;">Justifying Events (Fits the Facts)</th>
                  <th style="padding: 0.5rem; width: 27%;">Act Opposite (Unjustified/Not Effective)</th>
                  <th style="padding: 0.5rem; width: 28%;">Act on Urge / Problem-Solve (Justified)</th>
                </tr>
              </thead>
              <tbody>
                <tr style="border-bottom: 1px solid var(--border-color);">
                  <td style="padding: 0.5rem; font-weight: bold; color: var(--accent-rose);">Fear</td>
                  <td style="padding: 0.5rem;">Threat to life, health, or well-being.</td>
                  <td style="padding: 0.5rem;">Do what you are afraid of doing over and over. Approach. Build mastery.</td>
                  <td style="padding: 0.5rem;">Freeze/run. Remove threat. Act to gain control/mastery.</td>
                </tr>
                <tr style="border-bottom: 1px solid var(--border-color);">
                  <td style="padding: 0.5rem; font-weight: bold; color: var(--accent-rose);">Anger</td>
                  <td style="padding: 0.5rem;">Important goal blocked; attacked, hurt, or insulted.</td>
                  <td style="padding: 0.5rem;">Gently avoid. Take a time out. Be kind (rather than mean). Imagine understanding.</td>
                  <td style="padding: 0.5rem;">Fight back if nothing to lose. Overcome obstacles. Walk out.</td>
                </tr>
                <tr style="border-bottom: 1px solid var(--border-color);">
                  <td style="padding: 0.5rem; font-weight: bold; color: var(--accent-rose);">Disgust</td>
                  <td style="padding: 0.5rem;">Contact with poison/contamination; touched by deeply disliked person.</td>
                  <td style="padding: 0.5rem;">Move close. Embrace. Be kind. Take in what feels repulsive.</td>
                  <td style="padding: 0.5rem;">Remove/clean. Influence others to stop contamination. Avoid/push away.</td>
                </tr>
                <tr style="border-bottom: 1px solid var(--border-color);">
                  <td style="padding: 0.5rem; font-weight: bold; color: var(--accent-rose);">Envy</td>
                  <td style="padding: 0.5rem;">Another person gets or has things you don't have that you want/need.</td>
                  <td style="padding: 0.5rem;">Inhibit destroying. Count your blessings. Stop exaggerating.</td>
                  <td style="padding: 0.5rem;">Improve yourself. Get others to be fair. Devalue what others have.</td>
                </tr>
                <tr style="border-bottom: 1px solid var(--border-color);">
                  <td style="padding: 0.5rem; font-weight: bold; color: var(--accent-rose);">Jealousy</td>
                  <td style="padding: 0.5rem;">Important relationship/object in danger of being damaged or lost.</td>
                  <td style="padding: 0.5rem;">Let go of trying to control. Share. Stop spying/snooping. No avoiding.</td>
                  <td style="padding: 0.5rem;">Protect what you have. Work at being more desirable. Leave relationship.</td>
                </tr>
                <tr style="border-bottom: 1px solid var(--border-color);">
                  <td style="padding: 0.5rem; font-weight: bold; color: var(--accent-rose);">Love</td>
                  <td style="padding: 0.5rem;">Loving enhances quality of life or increases goal attainment.</td>
                  <td style="padding: 0.5rem;">Avoid person/object. Distract from thoughts. Avoid contact. Stop expressing.</td>
                  <td style="padding: 0.5rem;">Be with person. Touch, hold, cuddle. Avoid separations.</td>
                </tr>
                <tr style="border-bottom: 1px solid var(--border-color);">
                  <td style="padding: 0.5rem; font-weight: bold; color: var(--accent-rose);">Sadness</td>
                  <td style="padding: 0.5rem;">Lost something or someone permanently; things not as expected.</td>
                  <td style="padding: 0.5rem;">Activate your behavior. Avoid avoiding. Build mastery. Increase pleasant events.</td>
                  <td style="padding: 0.5rem;">Grieve. Retrieve/replace. Plan how to rebuild life. Accumulate positives.</td>
                </tr>
                <tr style="border-bottom: 1px solid var(--border-color);">
                  <td style="padding: 0.5rem; font-weight: bold; color: var(--accent-rose);">Shame</td>
                  <td style="padding: 0.5rem;">Rejected if personal characteristics/behavior are made public.</td>
                  <td style="padding: 0.5rem;">Make public your characteristics/behavior (with non-rejecting people). Repeat without hiding.</td>
                  <td style="padding: 0.5rem;">Hide what will get you rejected. Appease. Change behavior. Avoid.</td>
                </tr>
                <tr style="border-bottom: 1px solid var(--border-color);">
                  <td style="padding: 0.5rem; font-weight: bold; color: var(--accent-rose);">Guilt</td>
                  <td style="padding: 0.5rem;">Own behavior violates personal moral code.</td>
                  <td style="padding: 0.5rem;">Do what makes you feel guilty over and over. Make public. Hide behavior.</td>
                  <td style="padding: 0.5rem;">Seek forgiveness. Repair harm. Accept consequences. Commit to avoiding mistake.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Sleep Hygiene Protocol -->
        <div class="reftab-content" id="ref-sleep" style="display: none;">
          <div style="background: var(--bg-secondary); padding: 1.5rem; border-radius: var(--radius-lg); border: 1px solid var(--border-color); line-height: 1.6;">
            <h3 style="color: var(--accent-teal); font-size: 1.25rem; margin-bottom: 0.5rem; border-bottom: 1px solid var(--border-color); padding-bottom: 0.5rem;">
              Sleep Hygiene Protocol (Handout 20B)
            </h3>
            <p style="font-style: italic; font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1rem;">
              When You Can't Sleep, What to Do Instead of Ruminating
            </p>

            <h4 style="color: var(--accent-purple); font-size: 0.95rem; margin: 1rem 0 0.5rem 0;">TO INCREASE THE LIKELIHOOD OF RESTFULNESS/SLEEP:</h4>
            <ul style="padding-left: 1.2rem; font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 1rem;">
              <li><strong>1. Develop and follow a consistent sleep schedule even on weekends.</strong> Go to bed and wake up at the same times each day, and avoid anything longer than a 10-minute nap during the day.</li>
              <li><strong>2. Do not use your bed in the daytime</strong> for things like watching TV, talking on the phone, or reading.</li>
              <li><strong>3. Avoid caffeine, nicotine, alcohol, heavy meals, and exercise late in the day</strong> before going to sleep.</li>
              <li><strong>4. When prepared to sleep, turn off the light, and keep the room quiet and the temperature comfortable and relatively cool.</strong> Try an electric blanket if you are cold; putting your feet outside of the blanket or turning on a fan directed toward your bed if you are hot; or wearing a sleeping mask, using earplugs, or turning on a "white noise" machine if needed.</li>
              <li><strong>5. Give yourself half an hour to at most an hour to fall asleep.</strong> If it doesn't work, evaluate whether you are calm, or anxious (even if only "background anxiety"), or ruminating.</li>
              <li><strong>6. DO NOT CATASTROPHIZE.</strong> Remind yourself that you need rest, and aim for reverie (i.e., dreaminess) and resting your brain. Sell yourself on the idea that staying awake is not a catastrophe. Do not decide to give up on sleeping for the night and get up for the "day."</li>
            </ul>

            <h4 style="color: var(--accent-blue); font-size: 0.95rem; margin: 1rem 0 0.5rem 0;">IF YOU ARE CALM BUT WIDE AWAKE:</h4>
            <ul style="padding-left: 1.2rem; font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 1rem;">
              <li><strong>7. Get out of bed; go to another room and read a book</strong> or do some other activity that will not wake you up further. As you begin to get tired and/or sleepy, go back to bed.</li>
              <li><strong>8. Try a light snack</strong> (e.g., an apple).</li>
            </ul>

            <h4 style="color: var(--accent-rose); font-size: 0.95rem; margin: 1rem 0 0.5rem 0;">IF YOU ARE ANXIOUS OR RUMINATING:</h4>
            <ul style="padding-left: 1.2rem; font-size: 0.85rem; color: var(--text-secondary);">
              <li><strong>9. Use the cold water TIP skill. Get right back in bed and do the paced breathing TIP skill.</strong></li>
              <li><strong>10. Try the 9–0 meditation practice.</strong> Breathe in deeply and breathe out slowly, saying in your mind the number 9. On the next breath out, say 8; then say 7; and so on until you breathe out saying 0. Then start over, but this time start with 8 (instead of 9) as you breathe out, followed by 7, and so on until you reach 0. Next start with 6 as you breathe out, and so on to 0. Then start with 5, then with 4, and so on until you have gone all the way down to starting with 1. (If you get lost, start over with the last number you remember.) Continue until you fall asleep.</li>
              <li><strong>11. Focus on the bodily sensation</strong> of the rumination (rumination is often escape from difficult emotional sensations).</li>
              <li><strong>12. Reassure yourself</strong> that worries in the middle of the night are just "middle-of-the-night-thinking," and that in the morning you will think and feel differently.</li>
              <li><strong>13. Read an emotionally engrossing novel</strong> for a few minutes until you feel somewhat tired. Then stop reading, close your eyes, and try to continue the novel in your head.</li>
              <li><strong>14. If rumination doesn't stop</strong>, follow these guidelines: "If it's solvable, solve it. If it's insolvable, go deep into the worry all the way to the 'catastrophe'—the very worst outcome you can imagine—and then imagine coping ahead with the catastrophe."</li>
            </ul>
            <p style="font-size: 0.8rem; color: var(--text-muted); margin-top: 1rem; border-top: 1px solid var(--border-color); padding-top: 0.5rem; font-style: italic;">
              If nothing else works, with eyes closed, listen to public radio (BBC, NPR, etc.) at low volume. Public radio is a good choice because there is little fluctuation in voice tone or volume.
            </p>
          </div>
        </div>

        <!-- Apologizing Effectively (I'M SORRY) -->
        <div class="reftab-content" id="ref-sorry" style="display: none;">
          <div style="background: var(--bg-secondary); padding: 1.5rem; border-radius: var(--radius-lg); border: 1px solid var(--border-color); line-height: 1.6;">
            <h3 style="color: var(--accent-purple); font-size: 1.25rem; margin-bottom: 0.5rem; border-bottom: 1px solid var(--border-color); padding-bottom: 0.5rem;">
              Guidelines for Apologizing Effectively (I'M SORRY)
            </h3>
            <p style="font-style: italic; font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1.25rem;">
              Interpersonal Effectiveness Handout X (Adams-Clark et al.)
            </p>

            <div style="margin-bottom: 1.25rem;">
              <strong style="display: block; color: var(--accent-purple); font-size: 1.1rem; margin-bottom: 0.5rem;">I - Identify if an apology is warranted</strong>
              <p style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 0.5rem;">
                Apologies may be warranted when:
              </p>
              <ul style="padding-left: 1.2rem; font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 0.5rem;">
                <li>1) You feel an emotion (guilt or shame) about your past behavior <em>that fits the facts</em>.</li>
                <li>2) Someone confronts you or discloses to you that your past behavior has hurt them.</li>
              </ul>
              <p style="font-size: 0.85rem; color: var(--text-secondary); font-style: italic;">
                Ask Wise Mind if apologizing in this instance is justified and effective, and reflect on your goals (objective, relationship, and self-respect). If an apology is NOT warranted, engage in opposite action and/or the FAST skill.
              </p>
            </div>

            <div style="margin-bottom: 1.25rem;">
              <strong style="display: block; color: var(--accent-purple); font-size: 1.1rem; margin-bottom: 0.5rem;">M - (Stay) Mindful</strong>
              <p style="font-size: 0.85rem; color: var(--text-secondary);">
                Stay Mindful throughout. Observe your thoughts and emotions. If you feel guilty or ashamed about your behavior, observe the urge to avoid painful emotions, shift blame, or—alternatively—take <em>all</em> the blame and over-apologize. If someone is confronting you, observe any defensiveness, judgment, anger, or willfulness. Observe the urge to downplay the seriousness of the offense, change the topic, or lie.
              </p>
            </div>

            <div style="margin-bottom: 1.25rem;">
              <strong style="display: block; color: var(--accent-purple); font-size: 1.1rem; margin-bottom: 0.5rem;">S - Say sorry</strong>
              <p style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 0.5rem;">
                Say sorry genuinely. Apologize with not just your words, but your tone, body language, and facial expression. Name what you are sorry for using your describe skill.
              </p>
              <p style="font-size: 0.85rem; font-family: var(--font-mono); color: var(--accent-teal); padding-left: 0.5rem; border-left: 2px solid var(--accent-teal);">
                "I am sorry that I yelled and said that 'you're a jerk.'"
              </p>
              <p style="font-size: 0.85rem; color: var(--text-secondary); margin-top: 0.5rem; font-style: italic;">
                Avoid the use of conditionals (e.g., "I'm sorry IF my words offended you").
              </p>
            </div>

            <div style="margin-bottom: 1.25rem;">
              <strong style="display: block; color: var(--accent-purple); font-size: 1.1rem; margin-bottom: 0.5rem;">O - Own your mistake</strong>
              <p style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 0.5rem;">
                Own your mistake and take accountability. Acknowledge that <em>you</em> did something hurtful, unfair, or unjust. Focus on the impact of your actions, rather than your intentions. Do not take responsibility for others or things outside of your control.
              </p>
              <p style="font-size: 0.85rem; font-family: var(--font-mono); color: var(--accent-teal); padding-left: 0.5rem; border-left: 2px solid var(--accent-teal);">
                "What I said was wrong and unfair."
              </p>
              <p style="font-size: 0.85rem; color: var(--text-secondary); margin-top: 0.5rem; font-style: italic;">
                Avoid passive voice (e.g., "Unkind words were said").
              </p>
            </div>

            <div style="margin-bottom: 1.25rem;">
              <strong style="display: block; color: var(--accent-purple); font-size: 1.1rem; margin-bottom: 0.5rem;">R - Recognize their feelings</strong>
              <p style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 0.5rem;">
                Recognize their feelings and their suffering. Empathize with their perspective and express concern about their feelings. Use validation skills. However, do not let your emotions overwhelm theirs.
              </p>
              <p style="font-size: 0.85rem; font-family: var(--font-mono); color: var(--accent-teal); padding-left: 0.5rem; border-left: 2px solid var(--accent-teal);">
                "I can see that what I did really upset you, and I care about your feelings."<br>
                "I understand why you thought that what I did was unfair."
              </p>
            </div>

            <div style="margin-bottom: 1.25rem;">
              <strong style="display: block; color: var(--accent-purple); font-size: 1.1rem; margin-bottom: 0.5rem;">R - Repair</strong>
              <p style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 0.5rem;">
                Repair by offering reparations or restitution, if appropriate. Offer concrete ideas of how you can make amends for the specific offense. Ask them for their suggestions.
              </p>
              <p style="font-size: 0.85rem; font-family: var(--font-mono); color: var(--accent-teal); padding-left: 0.5rem; border-left: 2px solid var(--accent-teal);">
                "I know it cost you a lot of time and money when I scratched your car, so I will take it to the auto repair shop for you and pay for the damages."<br>
                "What can I do to make this up to you?"
              </p>
            </div>

            <div style="margin-bottom: 1.25rem;">
              <strong style="display: block; color: var(--accent-purple); font-size: 1.1rem; margin-bottom: 0.5rem;">Y - (Say) whY it won't happen again</strong>
              <p style="font-size: 0.85rem; color: var(--text-secondary);">
                Say whY this behavior will not occur again. Identify the causes of this behavior. Discuss how you will commit time, effort, and resources to avoid making the same mistake in the future. Follow through with promised behavior. If the pattern of behavior is recurrent, it may be helpful to state that you will continue to think about what you did and/or take the initiative to bring up the topic again.
              </p>
            </div>
          </div>
        </div>

        <!-- IE Overview -->
        <div class="reftab-content" id="ref-ie-overview" style="display: none;">
          <div style="background: var(--bg-secondary); padding: 1.5rem; border-radius: var(--radius-lg); border: 1px solid var(--border-color); line-height: 1.6;">
            <h3 style="color: var(--accent-purple); font-size: 1.25rem; margin-bottom: 0.5rem; border-bottom: 1px solid var(--border-color); padding-bottom: 0.5rem;">
              Goals of Interpersonal Effectiveness (Handout 3)
            </h3>
            
            <div style="margin-bottom: 1.25rem; margin-top: 1rem;">
              <strong style="display: block; color: var(--accent-teal); font-size: 1.1rem; margin-bottom: 0.5rem;">1. Objectives Effectiveness (DEAR MAN)</strong>
              <p style="font-size: 0.85rem; color: var(--text-secondary);">
                Getting what you want from another person. Obtaining your legitimate rights. Getting another person to do something you want them to do. Saying no to an unwanted or unreasonable request. Resolving an interpersonal conflict. Getting your opinion or point of view taken seriously.
              </p>
            </div>
            
            <div style="margin-bottom: 1.25rem;">
              <strong style="display: block; color: var(--accent-teal); font-size: 1.1rem; margin-bottom: 0.5rem;">2. Relationship Effectiveness (GIVE)</strong>
              <p style="font-size: 0.85rem; color: var(--text-secondary);">
                Getting or keeping a good relationship. Acting in such a way that the other person keeps liking and respecting you. Balancing immediate goals with the good of the long-term relationship. Maintaining relationships that matter to you.
              </p>
            </div>
            
            <div style="margin-bottom: 1.25rem;">
              <strong style="display: block; color: var(--accent-teal); font-size: 1.1rem; margin-bottom: 0.5rem;">3. Self-Respect Effectiveness (FAST)</strong>
              <p style="font-size: 0.85rem; color: var(--text-secondary);">
                Keeping or improving self-respect. Respecting your own values and beliefs. Acting in a way that makes you feel moral. Acting in a way that makes you feel capable and effective.
              </p>
            </div>
            
            <div style="margin-bottom: 1.25rem;">
              <strong style="display: block; color: var(--accent-purple); font-size: 1.1rem; margin-bottom: 0.5rem;">Factors to Consider in Deciding How Firm to Be</strong>
              <ul style="padding-left: 1.2rem; font-size: 0.85rem; color: var(--text-secondary);">
                <li><strong>Capability:</strong> Is the person able to give you what you want? Do you have what the person wants?</li>
                <li><strong>Priorities:</strong> Are your goals more important than the relationship or self-respect?</li>
                <li><strong>Self-Respect:</strong> Does asking/saying no align with your values?</li>
                <li><strong>Rights:</strong> Is the person required by law or moral code to give you what you want?</li>
                <li><strong>Authority:</strong> Are you responsible for directing the person, or are they responsible for directing you?</li>
                <li><strong>Relationship:</strong> Is the request appropriate to the current relationship?</li>
                <li><strong>Goals:</strong> Is what you want important enough?</li>
                <li><strong>Give and Take:</strong> Have you given enough? Has the other person?</li>
                <li><strong>Homework:</strong> Do you have all the facts? Are you clear about what you want?</li>
                <li><strong>Timing:</strong> Is this a good time to ask?</li>
              </ul>
            </div>
          </div>
        </div>

        <!-- DEAR MAN -->
        <div class="reftab-content" id="ref-ie-dearman" style="display: none;">
          <div style="background: var(--bg-secondary); padding: 1.5rem; border-radius: var(--radius-lg); border: 1px solid var(--border-color); line-height: 1.6;">
            <h3 style="color: var(--accent-purple); font-size: 1.25rem; margin-bottom: 0.5rem; border-bottom: 1px solid var(--border-color); padding-bottom: 0.5rem;">
              Guidelines for Objectives Effectiveness: Getting What You Want (DEAR MAN) (Handout 5)
            </h3>
            
            <div style="margin-bottom: 1.25rem; margin-top: 1rem;">
              <strong style="display: block; color: var(--accent-teal); font-size: 1.1rem; margin-bottom: 0.5rem;">D - Describe</strong>
              <p style="font-size: 0.85rem; color: var(--text-secondary);">
                Describe the current situation (if necessary). Stick to the facts. Tell the person exactly what you are reacting to.
              </p>
              <p style="font-size: 0.85rem; font-family: var(--font-mono); color: var(--accent-teal); padding-left: 0.5rem; border-left: 2px solid var(--accent-teal);">
                "You told me you would be home by dinner but you didn't get here until 11."
              </p>
            </div>
            
            <div style="margin-bottom: 1.25rem;">
              <strong style="display: block; color: var(--accent-teal); font-size: 1.1rem; margin-bottom: 0.5rem;">E - Express</strong>
              <p style="font-size: 0.85rem; color: var(--text-secondary);">
                Express your feelings and opinions about the situation. Don't assume that the other person knows how you feel.
              </p>
              <p style="font-size: 0.85rem; font-family: var(--font-mono); color: var(--accent-teal); padding-left: 0.5rem; border-left: 2px solid var(--accent-teal);">
                "When you come home so late, I start worrying about you."
              </p>
            </div>
            
            <div style="margin-bottom: 1.25rem;">
              <strong style="display: block; color: var(--accent-teal); font-size: 1.1rem; margin-bottom: 0.5rem;">A - Assert</strong>
              <p style="font-size: 0.85rem; color: var(--text-secondary);">
                Assert yourself by asking for what you want or saying no clearly. Do not assume that others will figure out what you want. Remember that others cannot read your mind.
              </p>
              <p style="font-size: 0.85rem; font-family: var(--font-mono); color: var(--accent-teal); padding-left: 0.5rem; border-left: 2px solid var(--accent-teal);">
                "I would really like it if you would call me when you are going to be late."
              </p>
            </div>
            
            <div style="margin-bottom: 1.25rem;">
              <strong style="display: block; color: var(--accent-teal); font-size: 1.1rem; margin-bottom: 0.5rem;">R - Reinforce</strong>
              <p style="font-size: 0.85rem; color: var(--text-secondary);">
                Reinforce (reward) the person ahead of time by explaining positive effects of getting what you want or need. If necessary, also clarify the negative consequences of not getting what you want or need.
              </p>
              <p style="font-size: 0.85rem; font-family: var(--font-mono); color: var(--accent-teal); padding-left: 0.5rem; border-left: 2px solid var(--accent-teal);">
                "I would be so relieved, and a lot easier to live with, if you do that."
              </p>
            </div>
            
            <div style="margin-bottom: 1.25rem;">
              <strong style="display: block; color: var(--accent-teal); font-size: 1.1rem; margin-bottom: 0.5rem;">M - (Stay) Mindful</strong>
              <p style="font-size: 0.85rem; color: var(--text-secondary);">
                Keep your focus on your goals. Maintain your position. Don't be distracted.<br>
                <strong>"Broken record":</strong> Keep asking, saying no, or expressing your opinion over and over and over. Just keep replaying the same thing again and again.<br>
                <strong>Ignore attacks:</strong> If the other person attacks, threatens, or tries to change the subject, ignore the threats, comments, or attempts to divert you. Do not respond to attacks. Ignore distractions. Just keep making your point.
              </p>
            </div>
            
            <div style="margin-bottom: 1.25rem;">
              <strong style="display: block; color: var(--accent-teal); font-size: 1.1rem; margin-bottom: 0.5rem;">A - Appear Confident</strong>
              <p style="font-size: 0.85rem; color: var(--text-secondary);">
                Appear effective and competent. Use a confident voice tone and physical manner; make good eye contact. No stammering, whispering, staring at the floor, retreating. No saying "I'm not sure," etc.
              </p>
            </div>
            
            <div style="margin-bottom: 1.25rem;">
              <strong style="display: block; color: var(--accent-teal); font-size: 1.1rem; margin-bottom: 0.5rem;">N - Negotiate</strong>
              <p style="font-size: 0.85rem; color: var(--text-secondary);">
                Be willing to give to get. Offer and ask for other solutions to the problem. Reduce your request. Say no, but offer to do something else or to solve the problem another way. Focus on what will work.<br>
                <strong>Turn the tables:</strong> Turn the problem over to the other person. Ask for other solutions. ("What do you think we should do?")
              </p>
            </div>
          </div>
        </div>

        <!-- GIVE -->
        <div class="reftab-content" id="ref-ie-give" style="display: none;">
          <div style="background: var(--bg-secondary); padding: 1.5rem; border-radius: var(--radius-lg); border: 1px solid var(--border-color); line-height: 1.6;">
            <h3 style="color: var(--accent-purple); font-size: 1.25rem; margin-bottom: 0.5rem; border-bottom: 1px solid var(--border-color); padding-bottom: 0.5rem;">
              Guidelines for Relationship Effectiveness: Keeping the Relationship (GIVE) (Handout 6 & 6A)
            </h3>
            
            <div style="margin-bottom: 1.25rem; margin-top: 1rem;">
              <strong style="display: block; color: var(--accent-teal); font-size: 1.1rem; margin-bottom: 0.5rem;">G - (Be) Gentle</strong>
              <p style="font-size: 0.85rem; color: var(--text-secondary);">
                Be nice and respectful. No attacks, no threats, no judging, no sneering. Accept occasional no's to your requests.
              </p>
            </div>
            
            <div style="margin-bottom: 1.25rem;">
              <strong style="display: block; color: var(--accent-teal); font-size: 1.1rem; margin-bottom: 0.5rem;">I - (Act) Interested</strong>
              <p style="font-size: 0.85rem; color: var(--text-secondary);">
                Listen and appear interested in the other person. Listen to the other person's point of view. Face the person; maintain eye contact; lean toward the person rather than away. Don't interrupt or talk over the person.
              </p>
            </div>
            
            <div style="margin-bottom: 1.25rem;">
              <strong style="display: block; color: var(--accent-teal); font-size: 1.1rem; margin-bottom: 0.5rem;">V - Validate</strong>
              <p style="font-size: 0.85rem; color: var(--text-secondary);">
                With words and actions, show that you understand the other person's feelings and thoughts about the situation. See the world from the other person's point of view, and then say or act on what you see.
              </p>
              
              <h4 style="color: var(--accent-purple); font-size: 1rem; margin: 1rem 0 0.5rem 0;">Levels of Validation (Handout 6A)</h4>
              <ul style="padding-left: 1.2rem; font-size: 0.85rem; color: var(--text-secondary);">
                <li><strong>Level 1: Pay Attention</strong> Look interested, listen, and observe. No multitasking.</li>
                <li><strong>Level 2: Reflect Back</strong> Say back what you heard the other person say or do, without adding anything or judging.</li>
                <li><strong>Level 3: "Read Minds"</strong> Be sensitive to what is not being said by the other person. Pay attention to facial expressions, body language, what is happening, and what you know about the person already.</li>
                <li><strong>Level 4: Understand</strong> Show how the other person's feelings, thoughts, or actions make sense, given their past experiences.</li>
                <li><strong>Level 5: Acknowledge the Valid</strong> Show how the other person's feelings, thoughts, or actions make sense, given their current reality and facts.</li>
                <li><strong>Level 6: Show Equality</strong> Treat the other person as an equal, not as fragile or incompetent. Be genuine.</li>
              </ul>
            </div>
            
            <div style="margin-bottom: 1.25rem;">
              <strong style="display: block; color: var(--accent-teal); font-size: 1.1rem; margin-bottom: 0.5rem;">E - (Use an) Easy Manner</strong>
              <p style="font-size: 0.85rem; color: var(--text-secondary);">
                Use a little humor. Smile. Ease the person along. Be lighthearted. Sweet-talk. Use a "soft sell" over a "hard sell." Be "political."
              </p>
            </div>
          </div>
        </div>

        <!-- FAST -->
        <div class="reftab-content" id="ref-ie-fast" style="display: none;">
          <div style="background: var(--bg-secondary); padding: 1.5rem; border-radius: var(--radius-lg); border: 1px solid var(--border-color); line-height: 1.6;">
            <h3 style="color: var(--accent-purple); font-size: 1.25rem; margin-bottom: 0.5rem; border-bottom: 1px solid var(--border-color); padding-bottom: 0.5rem;">
              Guidelines for Self-Respect Effectiveness: Keeping Respect for Yourself (FAST) (Handout 7)
            </h3>
            
            <div style="margin-bottom: 1.25rem; margin-top: 1rem;">
              <strong style="display: block; color: var(--accent-teal); font-size: 1.1rem; margin-bottom: 0.5rem;">F - (Be) Fair</strong>
              <p style="font-size: 0.85rem; color: var(--text-secondary);">
                Be fair to yourself and to the other person. Remember to validate your own feelings and wishes, as well as the other person's.
              </p>
            </div>
            
            <div style="margin-bottom: 1.25rem;">
              <strong style="display: block; color: var(--accent-teal); font-size: 1.1rem; margin-bottom: 0.5rem;">A - (No) Apologies</strong>
              <p style="font-size: 0.85rem; color: var(--text-secondary);">
                Don't over-apologize. No apologizing for being alive or for making a request at all. No apologies for having an opinion, for disagreeing. No looking ashamed, with eyes and head down or slumping. No invalidating the valid.
              </p>
            </div>
            
            <div style="margin-bottom: 1.25rem;">
              <strong style="display: block; color: var(--accent-teal); font-size: 1.1rem; margin-bottom: 0.5rem;">S - Stick to Values</strong>
              <p style="font-size: 0.85rem; color: var(--text-secondary);">
                Stick to your own values. Don't sell out your values or integrity for reasons that aren't very important. Be clear on what you believe is the moral or valued way of thinking and acting, and "stick to your guns."
              </p>
            </div>
            
            <div style="margin-bottom: 1.25rem;">
              <strong style="display: block; color: var(--accent-teal); font-size: 1.1rem; margin-bottom: 0.5rem;">T - (Be) Truthful</strong>
              <p style="font-size: 0.85rem; color: var(--text-secondary);">
                Don't lie. Don't act helpless when you are not. Don't exaggerate or make up excuses.
              </p>
            </div>
          </div>
        </div>

        <!-- Deciding Opposite Action vs Problem Solving -->
        <div class="reftab-content" id="ref-er-deciding" style="display: none;">
          <div style="background: var(--bg-secondary); padding: 1.5rem; border-radius: var(--radius-lg); border: 1px solid var(--border-color); line-height: 1.6;">
            <h3 style="color: var(--accent-purple); font-size: 1.25rem; margin-bottom: 0.5rem; border-bottom: 1px solid var(--border-color); padding-bottom: 0.5rem;">
              Figuring Out Opposite Action from Problem Solving (Handout 9)
            </h3>
            
            <p style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 1.25rem;">
              Use this flowchart logic to determine whether to act on your urge, problem-solve the situation, or use Opposite Action.
            </p>

            <ol style="padding-left: 1.2rem; font-size: 0.9rem; color: var(--text-secondary);">
              <li style="margin-bottom: 1rem;">
                <strong style="color: var(--text-primary);">Does the emotion fit the facts?</strong><br>
                Check the facts. Is the emotion justified by the actual situation you are in?
                <ul style="margin-top: 0.5rem; list-style-type: disc;">
                  <li><strong>NO:</strong> Do OPPOSITE ACTION.</li>
                  <li><strong>YES:</strong> Proceed to step 2.</li>
                </ul>
              </li>
              <li style="margin-bottom: 1rem;">
                <strong style="color: var(--text-primary);">Is acting on the emotion effective?</strong><br>
                Will acting on your emotional urge help you achieve your goals in the situation?
                <ul style="margin-top: 0.5rem; list-style-type: disc;">
                  <li><strong>NO:</strong> Do NOT act on the emotional urge. Do OPPOSITE ACTION.</li>
                  <li><strong>YES:</strong> Proceed to step 3.</li>
                </ul>
              </li>
              <li style="margin-bottom: 1rem;">
                <strong style="color: var(--text-primary);">Mindful of current emotions</strong><br>
                Be mindful of your current emotions. Don't push them away, but don't hold on to them either.
              </li>
              <li style="margin-bottom: 1rem;">
                <strong style="color: var(--text-primary);">Act on urge / Problem-solve</strong><br>
                Act on your emotional urge, and/or PROBLEM-SOLVE the situation that is causing the emotion.
              </li>
            </ol>
          </div>
        </div>

        <!-- Problem Solving -->
        <div class="reftab-content" id="ref-er-problemsolving" style="display: none;">
          <div style="background: var(--bg-secondary); padding: 1.5rem; border-radius: var(--radius-lg); border: 1px solid var(--border-color); line-height: 1.6;">
            <h3 style="color: var(--accent-purple); font-size: 1.25rem; margin-bottom: 0.5rem; border-bottom: 1px solid var(--border-color); padding-bottom: 0.5rem;">
              Problem Solving (Handout 12)
            </h3>
            
            <p style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 1.25rem;">
              When the emotion is justified by the facts, and acting on the emotion is effective, or when the situation itself is the problem.
            </p>

            <div style="margin-bottom: 1rem;">
              <strong style="display: block; color: var(--accent-teal); font-size: 1rem;">1. Figure out and describe the problem situation.</strong>
              <p style="font-size: 0.85rem; color: var(--text-secondary);">Specify the situation. What is happening? Who is involved? When? Where?</p>
            </div>
            
            <div style="margin-bottom: 1rem;">
              <strong style="display: block; color: var(--accent-teal); font-size: 1rem;">2. Check the facts (all the facts) to be sure you have the right problem situation.</strong>
              <p style="font-size: 0.85rem; color: var(--text-secondary);">If your facts are wrong, go back and describe the problem again.</p>
            </div>
            
            <div style="margin-bottom: 1rem;">
              <strong style="display: block; color: var(--accent-teal); font-size: 1rem;">3. Identify your goal in solving the problem.</strong>
              <p style="font-size: 0.85rem; color: var(--text-secondary);">Identify what needs to happen or change for you to feel OK. Keep it simple.</p>
            </div>
            
            <div style="margin-bottom: 1rem;">
              <strong style="display: block; color: var(--accent-teal); font-size: 1rem;">4. Brainstorm lots of solutions.</strong>
              <p style="font-size: 0.85rem; color: var(--text-secondary);">Think of as many solutions as you can. Ask for suggestions from people you trust. Do not be critical of any ideas at first.</p>
            </div>
            
            <div style="margin-bottom: 1rem;">
              <strong style="display: block; color: var(--accent-teal); font-size: 1rem;">5. Choose a solution that fits the goal and is likely to work.</strong>
              <p style="font-size: 0.85rem; color: var(--text-secondary);">If you are unsure, choose two solutions that look good. Do a pros and cons list for each to compare them. Choose the best one.</p>
            </div>
            
            <div style="margin-bottom: 1rem;">
              <strong style="display: block; color: var(--accent-teal); font-size: 1rem;">6. Put the solution into action.</strong>
              <p style="font-size: 0.85rem; color: var(--text-secondary);">Act! Try out the solution. Take the first step, and then the second ...</p>
            </div>
            
            <div style="margin-bottom: 1rem;">
              <strong style="display: block; color: var(--accent-teal); font-size: 1rem;">7. Evaluate the results of using the solution.</strong>
              <p style="font-size: 0.85rem; color: var(--text-secondary);">It worked? YAY! It didn't work? Go back to Step 5 and choose a new solution to try.</p>
            </div>
          </div>
        </div>
      </div>
    `;

    this.attachEvents(container);
    this.renderSelectedEmotion(container, 'fear');
  },

  emotionDatabase: {
    fear: {
      title: "FEAR (Anxiety, Dread, Panic, Uneasiness, Worry)",
      facts: [
        "There is a threat to your life or that of someone you care about.",
        "There is a threat to your health or that of someone you care about.",
        "There is a threat to your well-being or that of someone you care about."
      ],
      urge: "Avoid / Flee",
      oppositeAction: "Approach / do what is prompting the emotion",
      oppositeActionList: [
        "1. Do what you are afraid of doing... OVER AND OVER.",
        "2. APPROACH events, places, tasks, activities, and people you are afraid of.",
        "3. Do things to give yourself a sense of CONTROL and MASTERY over your fears.",
        "4. Keep your EYES AND EARS OPEN and focused on the feared event. Look around slowly; explore.",
        "5. Take in the information from the situation (i.e., notice that you are safe).",
        "6. Change POSTURE and keep a CONFIDENT VOICE TONE. Keep your head and eyes up, and your shoulders back but relaxed. Adopt an assertive body posture (e.g., knees apart, hands on hips, heels a bit out).",
        "7. Change your BODY CHEMISTRY. For example, do paced breathing by breathing in deeply and breathing out slowly."
      ],
      prompts: [
        "Having your life, your health, or your well-being threatened.",
        "Being in the same situation (or a similar one) where you have been threatened or gotten hurt in the past, or where painful things have happened.",
        "Flashbacks.",
        "Being in situations where you have seen others threatened or be hurt.",
        "Silence / Being in a new or unfamiliar situation.",
        "Being alone (e.g. walking alone, being home alone).",
        "Being in the dark / being in crowds.",
        "Leaving your home.",
        "Having to perform in front of others."
      ],
      interpretations: [
        "Believing that: You might die, or you are going to die.",
        "Believing that: You might be hurt or harmed.",
        "Believing that: You might lose something valuable.",
        "Believing that: Someone might reject, criticize, or dislike you.",
        "Believing that: You will embarrass yourself.",
        "Believing that: Failure is possible; expecting to fail.",
        "Believing that: You will not get help you want or need.",
        "Believing that: You might lose someone important.",
        "Believing that: You are helpless or losing a sense of control.",
        "Believing that: You are incompetent or losing mastery."
      ],
      biological: [
        "Breathlessness.",
        "Fast heartbeat.",
        "Choking sensation, lump in throat.",
        "Muscles tensing, cramping.",
        "Clenching teeth.",
        "Urge to scream or call out.",
        "Feeling nauseated.",
        "Getting cold; feeling clammy.",
        "Feeling your hairs standing on end.",
        "Feeling of 'butterflies' in stomach.",
        "Wanting to run away or avoid things."
      ],
      expressions: [
        "Fleeing, running away.",
        "Running or walking hurriedly.",
        "Hiding from or avoiding what you fear.",
        "Engaging in nervous, fearful talk.",
        "Pleading or crying for help.",
        "Talking less or becoming speechless.",
        "Screaming or yelling.",
        "Darting eyes or quickly looking around.",
        "Frozen stare."
      ],
      aftereffects: [
        "Narrowing of attention.",
        "Being hypervigilant to threat.",
        "Losing your ability to focus or becoming disoriented and dazed.",
        "Losing control.",
        "Imagining the possibility of more loss or failure.",
        "Isolating yourself.",
        "Ruminating about other threatening times."
      ]
    },
    anger: {
      title: "ANGER (Frustration, Rage, Irritation, Bitterness, Hostility)",
      facts: [
        "An important goal is blocked or a desired activity is interrupted or prevented.",
        "You or someone you care about is attacked or hurt by others.",
        "You or someone you care about is insulted or threatened by others.",
        "The integrity or status of your social group is offended or threatened."
      ],
      urge: "Attack / Confront",
      oppositeAction: "Gently avoid / be a little nice",
      oppositeActionList: [
        "1. GENTLY AVOID the person you are angry with (rather than attacking).",
        "2. TAKE A TIME OUT, and breathe in and out deeply and slowly.",
        "3. BE KIND (rather than mean or insulting).",
        "4. IMAGINE UNDERSTANDING and empathy for the other person. Try to see the situation from the other person's point of view. Imagine really good reasons for what has happened.",
        "5. CHANGE YOUR POSTURE. Unclench hands, with palms up and fingers relaxed (WILLING HANDS). Relax chest and stomach muscles. Unclench teeth. Relax facial muscles. Half-smile.",
        "6. CHANGE YOUR BODY CHEMISTRY. For example, do paced breathing by breathing in deeply and breathing out slowly. Or, run or engage in another physically energetic, nonviolent activity."
      ],
      prompts: [
        "Having an important goal blocked.",
        "You or someone you care about being attacked or threatened by others.",
        "Losing power, status, or respect.",
        "Not having things turn out as expected.",
        "Physical or emotional pain."
      ],
      interpretations: [
        "Believing that you have been treated unfairly.",
        "Blaming someone or something.",
        "Believing that important goals are being blocked or stopped.",
        "Believing that things 'should' be different than they are.",
        "Rigidly thinking, 'I'm right.'",
        "Judging that the situation is illegitimate or wrong.",
        "Ruminating about the event that set off the anger."
      ],
      biological: [
        "Muscles tightening.",
        "Teeth clamping together.",
        "Hands clenching.",
        "Feeling your face flush or get hot.",
        "Feeling like you are going to explode.",
        "Being unable to stop tears.",
        "Wanting to hit someone, bang the wall, throw something, blow up.",
        "Wanting to hurt someone."
      ],
      expressions: [
        "Physically or verbally attacking.",
        "Making aggressive or threatening gestures.",
        "Pounding, throwing things, breaking things.",
        "Walking heavily, stomping, slamming doors.",
        "Walking out.",
        "Using a loud, quarrelsome, or sarcastic voice.",
        "Using obscenities or swearing.",
        "Criticizing or complaining.",
        "Clenching your hands or fists.",
        "Frowning, not smiling, mean expression."
      ],
      aftereffects: [
        "Narrowing of attention.",
        "Attending only to the situation that's making you angry.",
        "Ruminating about the situation making you angry or about situations in the past.",
        "Imagining future situations that will make you angry.",
        "Depersonalization, dissociative experiences, numbness."
      ]
    },
    sadness: {
      title: "SADNESS (Grief, Misery, Alienation, Disappointment, Gloom)",
      facts: [
        "You have lost something or someone permanently.",
        "Things are not the way you wanted or expected and hoped them to be."
      ],
      urge: "Withdraw / Isolate",
      oppositeAction: "Get active / do not isolate",
      oppositeActionList: [
        "1. Get ACTIVE; approach.",
        "2. AVOID AVOIDING.",
        "3. BUILD MASTERY: Do things that make you feel competent and self-confident.",
        "4. Increase PLEASANT EVENTS.",
        "5. Pay attention to the PRESENT MOMENT! Be mindful of your environment—each detail as it unfolds. Experience new or positive activities you are engaging in.",
        "6. CHANGE YOUR POSTURE (adopt a 'bright' body posture, with head up, eyes open, and shoulders back). Keep an upbeat voice tone.",
        "7. CHANGE YOUR BODY CHEMISTRY. For example, increase physical movement (run, jog, walk, or do other active exercise)."
      ],
      prompts: [
        "Losing something or someone irretrievably.",
        "The death of someone you love.",
        "Things not being what you expected or wanted.",
        "Being separated from someone you care for.",
        "Getting what you don't want.",
        "Not getting what you believe you need in life.",
        "Being rejected, disapproved of, or excluded.",
        "Discovering that you are powerless or helpless."
      ],
      interpretations: [
        "Believing that a separation from someone will last for a long time or will never end.",
        "Believing that you will not get what you want or need in your life.",
        "Seeing things as or believing that you are worthless or not valuable.",
        "Seeing things or your life as hopeless.",
        "Believing that you are alone or like an outsider.",
        "Thinking about everything you have not gotten."
      ],
      biological: [
        "Feeling tired, run down, or low in energy.",
        "Feeling lethargic, listless; wanting to stay in bed all day.",
        "Feeling as if nothing is pleasurable any more.",
        "Pain or hollowness in your chest or gut.",
        "Feeling empty.",
        "Feeling as if you can't stop crying, or if you ever start crying you will never be able to stop."
      ],
      expressions: [
        "Avoiding things.",
        "Acting helpless; staying in bed; being inactive.",
        "Moping, brooding, or acting moody.",
        "Making slow, shuffling movements.",
        "Withdrawing from social contact.",
        "Avoiding activities that used to bring pleasure.",
        "Giving up and no longer trying to improve."
      ],
      aftereffects: [
        "Not being able to remember happy things.",
        "Feeling irritable, touchy, or grouchy.",
        "Yearning and searching for the thing lost.",
        "Having a negative outlook.",
        "Blaming or criticizing yourself."
      ]
    },
    shame: {
      title: "SHAME (Humiliation, Self-conscious, Embarrassment)",
      facts: [
        "You will be rejected by a person or group you care about if characteristics of yourself or of your behavior are made public."
      ],
      urge: "Hide / Avoid",
      oppositeAction: "Disclose what you are hiding / stand tall",
      oppositeActionList: [
        "When shame is NOT JUSTIFIED:",
        "1. MAKE PUBLIC your personal characteristics or behavior (with people who won't reject you).",
        "2. REPEAT the behavior that sets off shame over and over (without hiding the behavior from those who won't reject you).",
        "3. NO APOLOGIZING or trying to make up for a perceived transgression.",
        "4. TAKE IN all the information from the situation.",
        "5. CHANGE YOUR BODY POSTURE. Look innocent and proud. Lift your head; 'puff up' your chest; maintain eye contact. Keep your voice tone steady and clear.",
        "When shame IS JUSTIFIED (your behavior violates moral values):",
        "1. MAKE PUBLIC your behavior (with people who won't reject you).",
        "2. APOLOGIZE for your behavior.",
        "3. REPAIR the transgressions, or work to prevent or repair similar harm for others.",
        "4. COMMIT to avoiding that mistake in the future.",
        "5. ACCEPT the consequences gracefully.",
        "6. FORGIVE yourself. Acknowledge the causes of your behavior.",
        "7. LET IT GO."
      ],
      prompts: [
        "Being rejected by people you care about.",
        "Having others find out that you have done something wrong.",
        "Doing (or feeling or thinking) something that people you admire believe is wrong or immoral.",
        "Comparing some aspect of yourself or your behavior to a standard and feeling as if you do not live up to that standard."
      ],
      interpretations: [
        "Believing that others will reject you (or have rejected you).",
        "Judging yourself to be inferior, not 'good enough,' not as good as others; self-invalidation.",
        "Comparing yourself to others and thinking that you are a 'loser.'"
      ],
      biological: [
        "Pain in the pit of the stomach.",
        "Sense of dread.",
        "Wanting to shrink down and/or disappear.",
        "Wanting to hide or cover your face and body."
      ],
      expressions: [
        "Hiding behavior or a characteristic from other people.",
        "Avoiding the person you have harmed.",
        "Avoiding persons who have criticized you.",
        "Avoiding yourself—distracting, ignoring.",
        "Withdrawing; covering the face.",
        "Bowing your head, groveling."
      ],
      aftereffects: [
        "Avoiding thinking about your transgression; shutting down; blocking all emotions.",
        "Engaging in distracting, impulsive behaviors to divert your mind or attention.",
        "High amount of 'self-focus'; preoccupation with yourself."
      ]
    },
    guilt: {
      title: "GUILT (Remorse, Apologetic, Regret)",
      facts: [
        "Your own behavior violates your own values or moral code."
      ],
      urge: "Apologize / Repair",
      oppositeAction: "Don't apologize if not justified; engage in values repeatedly",
      oppositeActionList: [
        "When guilt is NOT JUSTIFIED:",
        "1. MAKE PUBLIC your personal characteristics or behavior (with people who won't reject you).",
        "2. REPEAT the behavior that sets off guilt over and over (without hiding the behavior from those who won't reject you).",
        "3. NO APOLOGIZING or trying to make up for a perceived transgression.",
        "4. TAKE IN all the information from the situation.",
        "5. CHANGE YOUR BODY POSTURE. Look innocent and proud. Lift your head; 'puff up' your chest; maintain eye contact. Keep your voice tone steady and clear.",
        "When guilt IS JUSTIFIED (your behavior violates moral values):",
        "1. SEEK forgiveness.",
        "2. REPAIR the harm; make things better (or, if not possible, work to prevent or repair similar harm for others).",
        "3. ACCEPT the consequences gracefully.",
        "4. COMMIT to avoiding behaviors that violate your moral values in the future."
      ],
      prompts: [
        "Doing or thinking something you believe is wrong.",
        "Doing or thinking something that violates your personal values.",
        "Not doing something you said that you would do.",
        "Committing a transgression against another person or something you value."
      ],
      interpretations: [
        "Thinking that your actions are to blame for something.",
        "Thinking that you behaved badly.",
        "Thinking, 'If only I had done something differently...'"
      ],
      biological: [
        "Hot, red face.",
        "Jitteriness, nervousness.",
        "Suffocating feeling."
      ],
      expressions: [
        "Trying to repair the harm, make amends for the wrongdoing, fix the damage, change the outcome.",
        "Asking for forgiveness, apologizing, confessing.",
        "Giving gifts/making sacrifices to try to make up for the transgression."
      ],
      aftereffects: [
        "Making resolutions to change.",
        "Making changes in behavior.",
        "Joining self-help programs."
      ]
    },
    disgust: {
      title: "DISGUST (Repugnance, Abhorrence, Hate, Loathing, Scorn)",
      facts: [
        "Something you are in contact with could poison or contaminate you.",
        "Somebody whom you deeply dislike is touching you or someone you care about.",
        "You are around a person or group whose behavior or thinking could seriously damage or harmfully influence you or the group you are part of."
      ],
      urge: "Avoid / Clean",
      oppositeAction: "Approach / make contact with cue",
      oppositeActionList: [
        "1. MOVE CLOSE. Eat, drink, stand near, or embrace what you found disgusting.",
        "2. BE KIND to those you feel contempt for; step into the other person's shoes.",
        "3. IMAGINE UNDERSTANDING and empathy for the person you feel disgust or contempt for. Try to see the situation from the other person's point of view. Imagine really good reasons for how the other person is behaving or looking.",
        "4. TAKE IN what feels repulsive. Be sensual (inhaling, looking at, touching, listening, tasting).",
        "5. CHANGE YOUR POSTURE. Unclench hands with palms up and fingers relaxed (willing hands). Relax chest and stomach muscles. Unclench teeth. Relax facial muscles. Half-smile.",
        "6. CHANGE YOUR BODY CHEMISTRY. For example, do paced breathing by breathing in deeply and breathing out slowly."
      ],
      prompts: [
        "Seeing/smelling human or animal waste products.",
        "Having a person or an animal that is dirty, slimy, or unclean come close to you.",
        "Tasting something or being forced to swallow something you really don't want.",
        "Seeing or being near a dead body.",
        "Touching items worn or owned by a stranger, dead person, or disliked person."
      ],
      interpretations: [
        "Believing that: You are swallowing something toxic.",
        "Believing that: Your skin or your mind is being contaminated.",
        "Believing that: Your own body or body parts are ugly."
      ],
      biological: [
        "Feelings of nausea; sick feeling.",
        "Urge to vomit, vomiting, gagging, choking.",
        "Having a lump in your throat.",
        "Aversion to drinking or eating.",
        "Intense urge to destroy or get rid of something."
      ],
      expressions: [
        "Vomiting, spitting out.",
        "Closing your eyes, looking away.",
        "Washing, scrubbing, taking a bath.",
        "Changing your clothes; cleaning spaces.",
        "Avoiding eating or drinking."
      ],
      aftereffects: [
        "Narrowing of attention.",
        "Ruminating about the situation that's making you feel disgusted.",
        "Becoming hypersensitive to dirt."
      ]
    },
    envy: {
      title: "ENVY (Discontent, Longing, Wishful)",
      facts: [
        "Another person or group gets or has things you don't have that you want or need."
      ],
      urge: "One-up / Put down others",
      oppositeAction: "Count your blessings",
      oppositeActionList: [
        "1. INHIBIT DESTROYING what the other person has.",
        "2. COUNT YOUR BLESSINGS. Make a list of the things you are thankful for.",
        "3. COUNT ALL your blessings. Avoid discounting some blessings. Avoid exaggerating your deprivations.",
        "4. STOP EXAGGERATING others' net worth or value; check the facts.",
        "5. CHANGE YOUR POSTURE. Unclench hands with palms up and fingers relaxed (WILLING HANDS). Relax chest and stomach muscles. Unclench teeth. Relax facial muscles. Half-smile.",
        "6. CHANGE YOUR BODY CHEMISTRY. For example, do paced breathing by breathing in deeply and breathing out slowly."
      ],
      prompts: [
        "Someone has something you really want or need but don't or can't have.",
        "You are not part of the 'in' crowd.",
        "Someone appears to have everything.",
        "You are alone while others are having fun.",
        "Someone else gets credit for what you've done."
      ],
      interpretations: [
        "Thinking you deserve what others have.",
        "Thinking others have more than you.",
        "Thinking about how unfair it is that you have such a bad lot in life compared to others."
      ],
      biological: [
        "Muscles tightening.",
        "Teeth clamping together, mouth tightening.",
        "Feeling your face flush or get hot.",
        "Feeling rigidity in your body.",
        "Pain in the pit of the stomach."
      ],
      expressions: [
        "Doing everything you can to get what the other person has.",
        "Working a lot harder than you were to get what you want.",
        "Trying to improve yourself and your situation.",
        "Taking away or ruining what the other person has."
      ],
      aftereffects: [
        "Narrowing of attention.",
        "Attending only to what others have that you don't.",
        "Ruminating when others have had more than you."
      ]
    },
    jealousy: {
      title: "JEALOUSY (Clinging, Mistrustful, Suspicious)",
      facts: [
        "A very important and desired relationship or object in your life is in danger of being damaged or lost.",
        "Someone is threatening to take a valued relationship or object away from you."
      ],
      urge: "Control / Protect",
      oppositeAction: "Wish the best to others / release grip",
      oppositeActionList: [
        "1. LET GO of trying to control others' actions.",
        "2. SHARE the things and people you have in your life.",
        "3. STOP SPYING or snooping. Suppress probing questions ('Where were you? Who were you with?'). Fire your 'private detective.'",
        "4. NO AVOIDING. Listen to all the details. Focus on sensations. Keep your eyes open; look around. Take in all the information about the situation.",
        "5. CHANGE YOUR POSTURE. Unclench hands with palms up and fingers relaxed (WILLING HANDS). Relax chest and stomach muscles. Unclench teeth. Relax facial muscles. Half-smile.",
        "6. CHANGE YOUR BODY CHEMISTRY. For example, do paced breathing by breathing in deeply and breathing out slowly."
      ],
      prompts: [
        "An important relationship is threatened or in danger of being lost.",
        "A potential competitor pays attention to someone you love.",
        "Someone is threatening to take away important things in your life.",
        "Goes out with the person you like.",
        "Ignores you while talking to a friend of yours."
      ],
      interpretations: [
        "Believing that: Your partner does not care for you any more.",
        "Believing that: You are nothing to your partner.",
        "Believing that: Your partner is going to leave you."
      ],
      biological: [
        "Breathlessness.",
        "Fast heartbeat.",
        "Choking sensation, lump in throat.",
        "Muscles tensing.",
        "Teeth clenching."
      ],
      expressions: [
        "Violent behavior or threats of violence toward the person threatening to take something away.",
        "Attempting to control the freedom of the person you are afraid of losing.",
        "Verbal accusations of disloyalty or unfaithfulness."
      ],
      aftereffects: [
        "Narrowing of attention.",
        "Seeing the worst in others.",
        "Being mistrustful across the board."
      ]
    },
    love: {
      title: "LOVE (Adoration, Compassion, Charmed, Liking)",
      facts: [
        "Loving a person, animal, or object enhances quality of life for you or for those you care about.",
        "Loving a person, animal, or object increases your chances of attaining your own personal goals."
      ],
      urge: "Increase contact",
      oppositeAction: "Decrease / stop communication (if love is not justified)",
      oppositeActionList: [
        "1. AVOID the person, animal, or object you love.",
        "2. DISTRACT yourself from thoughts of the person, animal, or object.",
        "3. REMIND yourself of why love is not justified (rehearse the 'cons' of loving) when loving thoughts do arise.",
        "4. AVOID CONTACT with everything that reminds you of a person you love: pictures, letters/messages/e-mails, belongings, mementos, places you were together, places you planned to or wanted to go together, places where you know the person has been or will be. No following, waiting for, or looking for the person.",
        "5. STOP EXPRESSING LOVE for the person, even to friends. Be unfriendly toward the person (e.g., 'unfriend' the person on Facebook, Twitter, etc.).",
        "6. ADJUST YOUR POSTURE AND EXPRESSIONS if you are around the person you love. No leaning toward him or her. No getting close enough to touch. No sighing/gazing at the person."
      ],
      prompts: [
        "A person: Offers or gives you something you want, need, or desire.",
        "Does things you want or need.",
        "Does things you particularly value or admire.",
        "Feeling physically attracted to someone.",
        "Being with someone you have fun with."
      ],
      interpretations: [
        "Believing that a person loves, needs, or appreciates you.",
        "Thinking that a person is physically attractive.",
        "Judging a person's personality as wonderful, pleasing, or attractive."
      ],
      biological: [
        "When you are with or thinking about someone: Feeling excited and full of energy.",
        "Fast heartbeat.",
        "Feeling self-confident.",
        "Feeling happy, joyful, or exuberant."
      ],
      expressions: [
        "Saying 'I love you.'",
        "Expressing positive feelings to a person.",
        "Eye contact, mutual gaze.",
        "Touching, petting, hugging, holding, cuddling."
      ],
      aftereffects: [
        "Only seeing a person's positive side.",
        "Feeling forgetful or distracted; daydreaming.",
        "Feeling openness and trust."
      ]
    },
    happiness: {
      title: "HAPPINESS (Joy, Bliss, Contentment, Delight, Zest)",
      facts: [
        "Interpreting joyful events just as they are, without adding or subtracting."
      ],
      urge: "Keep doing what is associated with happiness",
      oppositeAction: "Feel peace (no opposite action needed, embrace it!)",
      oppositeActionList: [
        "No opposite action needed. Embrace and enjoy your positive emotions!"
      ],
      prompts: [
        "Receiving a wonderful surprise.",
        "Reality exceeding your expectations.",
        "Getting what you want.",
        "Getting something you have worked hard for or worried about.",
        "Things turning out better than you thought they would."
      ],
      interpretations: [
        "Interpreting joyful events just as they are, without adding or subtracting."
      ],
      biological: [
        "Feeling excited.",
        "Feeling physically energetic, active.",
        "Feeling like giggling or laughing.",
        "Feeling your face flush.",
        "Feeling calm all the way through."
      ],
      expressions: [
        "Smiling.",
        "Having a bright, glowing face.",
        "Being bouncy or bubbly.",
        "Communicating your good feelings.",
        "Sharing the feeling."
      ],
      aftereffects: [
        "Being courteous or friendly to others.",
        "Doing nice things for other people.",
        "Having a positive outlook; seeing the bright side."
      ]
    }
  },

  renderSelectedEmotion(container, emotionKey) {
    const data = this.emotionDatabase[emotionKey];
    const detailsContainer = container.querySelector('#ref-emotion-content');
    if (!data || !detailsContainer) return;

    detailsContainer.innerHTML = `
      <div style="background: var(--bg-secondary); padding: 1.25rem; border-radius: var(--radius-lg); border: 1px solid var(--border-color); animation: fadeIn 0.2s ease-in-out;">
        <h3 style="color: var(--accent-purple); font-size: 1.15rem; margin-bottom: 0.5rem; border-bottom: 1px solid var(--border-color); padding-bottom: 0.5rem;">
          ${data.title}
        </h3>

        <!-- Core Urge & Opposite Action -->
        <div class="grid-2" style="margin-bottom: 1rem;">
          <div style="background: var(--bg-primary); padding: 0.75rem; border-radius: var(--radius-md); border: 1px solid var(--border-color);">
            <strong style="color: var(--accent-rose); font-size: 0.8rem; text-transform: uppercase; display: block; margin-bottom: 0.2rem;">Natural Action Urge</strong>
            <span style="font-size: 0.95rem; font-weight: 600;">${data.urge}</span>
          </div>
          <div style="background: var(--bg-primary); padding: 0.75rem; border-radius: var(--radius-md); border: 1px solid var(--accent-teal);">
            <strong style="color: var(--accent-teal); font-size: 0.8rem; text-transform: uppercase; display: block; margin-bottom: 0.2rem;">DBT Opposite Action</strong>
            <span style="font-size: 0.95rem; font-weight: 600;">${data.oppositeAction}</span>
          </div>
        </div>

        <!-- Handout 11 Action Steps list -->
        <div style="background: var(--accent-purple-light); padding: 1rem; border-radius: var(--radius-md); border: 1px solid var(--accent-purple); margin-bottom: 1rem;">
          <strong style="color: var(--accent-purple); font-size: 0.85rem; text-transform: uppercase; display: block; margin-bottom: 0.4rem;">How to Act Opposite All-the-Way (Handout 11)</strong>
          <ul style="padding-left: 1.2rem; font-size: 0.85rem; color: var(--text-primary); line-height: 1.6; list-style-type: none;">
            ${data.oppositeActionList.map(item => `<li style="margin-bottom: 0.3rem;">${item}</li>`).join('')}
          </ul>
        </div>

        <!-- Facts List -->
        <div style="margin-bottom: 1rem;">
          <strong style="color: var(--text-primary); font-size: 0.85rem; text-transform: uppercase; display: block; margin-bottom: 0.3rem;">When does this fit the facts? (Handout 8A)</strong>
          <ul style="padding-left: 1.2rem; font-size: 0.85rem; color: var(--text-secondary); line-height: 1.5;">
            ${data.facts.map(f => `<li>${f}</li>`).join('')}
          </ul>
        </div>

        <div class="grid-2">
          <!-- Prompting Events -->
          <div style="margin-bottom: 1rem;">
            <strong style="color: var(--text-primary); font-size: 0.85rem; text-transform: uppercase; display: block; margin-bottom: 0.3rem;">Common Prompting Events</strong>
            <ul style="padding-left: 1.2rem; font-size: 0.8rem; color: var(--text-secondary); line-height: 1.5;">
              ${data.prompts.map(p => `<li>${p}</li>`).join('')}
            </ul>
          </div>

          <!-- Interpretations -->
          <div style="margin-bottom: 1rem;">
            <strong style="color: var(--text-primary); font-size: 0.85rem; text-transform: uppercase; display: block; margin-bottom: 0.3rem;">Interpretations & Beliefs</strong>
            <ul style="padding-left: 1.2rem; font-size: 0.8rem; color: var(--text-secondary); line-height: 1.5;">
              ${data.interpretations.map(i => `<li>${i}</li>`).join('')}
            </ul>
          </div>
        </div>

        <div class="grid-2">
          <!-- Biological Changes -->
          <div style="margin-bottom: 1rem;">
            <strong style="color: var(--text-primary); font-size: 0.85rem; text-transform: uppercase; display: block; margin-bottom: 0.3rem;">Biological / Bodily Changes</strong>
            <ul style="padding-left: 1.2rem; font-size: 0.8rem; color: var(--text-secondary); line-height: 1.5;">
              ${data.biological.map(b => `<li>${b}</li>`).join('')}
            </ul>
          </div>

          <!-- Expressions -->
          <div style="margin-bottom: 1rem;">
            <strong style="color: var(--text-primary); font-size: 0.85rem; text-transform: uppercase; display: block; margin-bottom: 0.3rem;">Common Expressions & Actions</strong>
            <ul style="padding-left: 1.2rem; font-size: 0.8rem; color: var(--text-secondary); line-height: 1.5;">
              ${data.expressions.map(e => `<li>${e}</li>`).join('')}
            </ul>
          </div>
        </div>

        <!-- Aftereffects -->
        <div>
          <strong style="color: var(--text-primary); font-size: 0.85rem; text-transform: uppercase; display: block; margin-bottom: 0.3rem;">Common Aftereffects</strong>
          <ul style="padding-left: 1.2rem; font-size: 0.8rem; color: var(--text-secondary); line-height: 1.5;">
            ${data.aftereffects.map(a => `<li>${a}</li>`).join('')}
          </ul>
        </div>
      </div>
    `;
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

    const selector = container.querySelector('#ref-emotion-selector');
    selector.addEventListener('change', (e) => {
      this.renderSelectedEmotion(container, e.target.value);
    });
  }
};
