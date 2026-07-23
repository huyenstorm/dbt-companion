/* Main Application Router & Controller (Fully Clickable Tiles & 2-Column Sidebar Selectors) */
import { db } from './db.js';
import { ModelOfEmotionsModule } from './modules/modelOfEmotions.js';
import { ChainAnalysisModule } from './modules/chainAnalysis.js';
import { WiseMindModule } from './modules/wiseMind.js';
import { DearManModule } from './modules/dearman.js';
import { DimeGameModule } from './modules/dimeGame.js';
import { AbcPleaseModule } from './modules/abcPlease.js';
import { DistressToleranceModule } from './modules/distressTolerance.js';
import { DiaryCardModule } from './modules/diaryCard.js';
import { ReferencesModule } from './modules/references.js';

class App {
  constructor() {
    this.currentTheme = 'dark';
    this.searchIndex = [
      { name: 'Linehan Model of Emotions (Worksheet 4)', target: 'emotion-regulation', deckTarget: 'model-emotions' },
      { name: 'Check the Facts Worksheet (Worksheet 5)', target: 'emotion-regulation', deckTarget: 'check-facts-ws5' },
      { name: 'Wise Mind Alignment Wizard', target: 'mindfulness', deckTarget: 'wise-mind' },
      { name: 'Mindfulness of Current Emotion (Worksheet 15)', target: 'mindfulness', deckTarget: 'mindfulness-emotion' },
      { name: 'Problem Solving Wizard (Handout 12)', target: 'mindfulness', deckTarget: 'problem-solving' },
      { name: 'DEAR MAN Script Builder', target: 'interpersonal', deckTarget: 'dear-man' },
      { name: 'Clarifying Priorities in Interpersonal Situations (Worksheet 3)', target: 'interpersonal', deckTarget: 'priorities-ws3' },
      { name: 'The Dime Game Calculator (Worksheet 6)', target: 'interpersonal', deckTarget: 'dime-game' },
      { name: 'Validating Others Homework (Worksheet 12)', target: 'interpersonal', deckTarget: 'val-others' },
      { name: 'Self-Validation & Self-Respect (Worksheet 13)', target: 'interpersonal', deckTarget: 'self-val' },
      { name: 'Values to Actions Pipeline (Worksheet 11)', target: 'emotion-regulation', deckTarget: 'values-to-actions' },
      { name: 'Build Mastery & Cope Ahead (Worksheet 12)', target: 'emotion-regulation', deckTarget: 'mastery-ws12' },
      { name: 'PLEASE Skills Log (Worksheet 14)', target: 'emotion-regulation', deckTarget: 'please-ws14' },
      { name: 'Behavioral Chain Analysis (Worksheet 2)', target: 'distress-tolerance', deckTarget: 'chain-analysis' },
      { name: 'Distracting with ACCEPTS Log (Worksheet 5)', target: 'distress-tolerance', deckTarget: 'accepts-ws5' },
      { name: 'Self-Soothing Sensory Log (Worksheet 6)', target: 'distress-tolerance', deckTarget: 'soothe-ws6' },
      { name: 'IMPROVE the Moment Log (Worksheet 7)', target: 'distress-tolerance', deckTarget: 'improve-ws7' },
      { name: 'Sleep Hygiene Protocol Reference (Handout 20B)', target: 'emotion-regulation', deckTarget: 'ref-sleep' },
      { name: 'Apologizing Effectively Guide (I\'M SORRY Handout X)', target: 'interpersonal', deckTarget: 'ref-sorry' },
      { name: 'Wise Mind ACCEPTS Distract Checklist (Handout 7)', target: 'distress-tolerance', deckTarget: 'dt-accepts' },
      { name: 'Self-Soothe 5 Senses Checklist (Handout 8)', target: 'distress-tolerance', deckTarget: 'dt-soothe' },
      { name: 'IMPROVE the Moment Checklist (Handout 9)', target: 'distress-tolerance', deckTarget: 'dt-improve' },
      { name: 'TIPP Paced Breathing & Temperature Reset', target: 'distress-tolerance', deckTarget: 'tipp' },
      { name: 'Diary Card Weekly Tracker', target: 'diary-card', deckTarget: '' },
      { name: 'IE Skills Overview Reference (Handout 3)', target: 'interpersonal', deckTarget: 'ref-ie-overview' },
      { name: 'Objectives: DEAR MAN Reference (Handout 5)', target: 'interpersonal', deckTarget: 'ref-ie-dearman' },
      { name: 'Relationship: GIVE Reference (Handout 6/6A)', target: 'interpersonal', deckTarget: 'ref-ie-give' },
      { name: 'Self-Respect: FAST Reference (Handout 7)', target: 'interpersonal', deckTarget: 'ref-ie-fast' },
      { name: 'Opposite Action vs. Problem Solving Reference (Handout 9)', target: 'emotion-regulation', deckTarget: 'ref-er-deciding' },
      { name: 'Problem Solving Sequence Reference (Handout 12)', target: 'emotion-regulation', deckTarget: 'ref-er-problemsolving' },
      { name: 'STOP Skill Guide Reference (Handout 4)', target: 'distress-tolerance', deckTarget: 'ref-dt-stop' },
      { name: 'Radical Acceptance Guide Reference (Handout 9)', target: 'distress-tolerance', deckTarget: 'ref-dt-radical' }
    ];
    this.init();
  }

  async init() {
    this.setupTheme();
    this.setupNavigation();
    this.setupBackupModal();
    this.setupClickableTiles();
    this.setupDeckNav();
    this.setupSearchDirectory();
    this.setupSkillFinder();
    this.setupSafetyPlan();
    this.setupModalDismissalHandlers();
    this.setupAISettings();
    this.renderAllViews();
    this.syncDeckNavVisibility('mindfulness', 'wise-mind');
    this.syncDeckNavVisibility('interpersonal', 'dear-man');
    this.syncDeckNavVisibility('emotion-regulation', 'model-emotions');
    this.syncDeckNavVisibility('distress-tolerance', 'chain-analysis');

    const hash = window.location.hash;
    let initialView = 'dashboard';
    let initialDeck = '';

    if (hash) {
      const hashStr = hash.replace('#', '');
      const validViews = ['dashboard', 'mindfulness', 'interpersonal', 'emotion-regulation', 'distress-tolerance', 'diary-card'];
      
      for (const view of validViews) {
        if (hashStr === view || hashStr.startsWith(view + '-')) {
          initialView = view;
          if (hashStr.length > view.length) {
            initialDeck = hashStr.substring(view.length + 1);
          }
          break;
        }
      }
    }

    history.replaceState({ view: initialView, deck: initialDeck }, '', hash || '#dashboard');
    this.switchView(initialView, true);
    
    if (initialDeck) {
      const deckBtn = document.querySelector(`#view-${initialView} .deck-btn[data-deck-target="${initialDeck}"]`);
      if (deckBtn) {
        const parentSection = deckBtn.closest('.view-section');
        parentSection.querySelectorAll('.deck-btn').forEach(b => b.classList.remove('active'));
        deckBtn.classList.add('active');
        this.syncDeckNavVisibility(initialView, initialDeck);
      }
    }

    window.addEventListener('popstate', (e) => {
      if (e.state) {
        this.switchView(e.state.view, true);
        if (e.state.deck) {
          const deckBtn = document.querySelector(`#view-${e.state.view} .deck-btn[data-deck-target="${e.state.deck}"]`);
          if (deckBtn) {
            const parentSection = deckBtn.closest('.view-section');
            parentSection.querySelectorAll('.deck-btn').forEach(b => b.classList.remove('active'));
            deckBtn.classList.add('active');
            this.syncDeckNavVisibility(e.state.view, e.state.deck);
          }
        }
      }
    });
  }

  async setupTheme() {
    const savedTheme = await db.getSetting('theme', 'dark');
    this.currentTheme = savedTheme;
    document.documentElement.setAttribute('data-theme', savedTheme);

    const themeBtn = document.getElementById('btn-toggle-theme');
    if (themeBtn) {
      themeBtn.innerHTML = savedTheme === 'dark' ? '☀️' : '🌙';
      themeBtn.addEventListener('click', async () => {
        this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        themeBtn.innerHTML = this.currentTheme === 'dark' ? '☀️' : '🌙';
        await db.setSetting('theme', this.currentTheme);
      });
    }
  }

  setupNavigation() {
    document.getElementById('brand-home').addEventListener('click', () => {
      this.switchView('dashboard');
    });

    document.getElementById('btn-dashboard-nav').addEventListener('click', () => {
      this.switchView('dashboard');
    });

    const mobileBtns = document.querySelectorAll('.mobile-nav-btn');
    mobileBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const view = btn.dataset.view;
        this.switchView(view);
      });
    });

    const backBtns = document.querySelectorAll('.btn-back-dashboard');
    backBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        this.switchView('dashboard');
      });
    });
  }

  setupClickableTiles() {
    const tiles = document.querySelectorAll('.clickable-tile');
    tiles.forEach(tile => {
      tile.addEventListener('click', () => {
        const targetView = tile.dataset.dashboardTile;
        const targetDeckBtn = tile.dataset.sub;

        if (targetDeckBtn) {
          this.switchView(targetView, true);
          const deckBtn = document.querySelector(`#view-${targetView} .deck-btn[data-deck-target="${targetDeckBtn}"]`);
          if (deckBtn) deckBtn.click();
        } else {
          this.switchView(targetView);
        }
      });
    });
  }

  switchView(viewName, isPopState = false) {
    const sections = document.querySelectorAll('.view-section');
    const mobileBtns = document.querySelectorAll('.mobile-nav-btn');

    sections.forEach(s => s.classList.remove('active'));
    mobileBtns.forEach(b => b.classList.remove('active'));

    const activeSection = document.getElementById(`view-${viewName}`);
    if (activeSection) activeSection.classList.add('active');

    const activeMobileBtn = document.querySelector(`.mobile-nav-btn[data-view="${viewName}"]`);
    if (activeMobileBtn) activeMobileBtn.classList.add('active');

    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (!isPopState) {
      const activeDeckBtn = document.querySelector(`#view-${viewName} .deck-btn.active`);
      const deckName = activeDeckBtn ? activeDeckBtn.dataset.deckTarget : '';
      history.pushState({ view: viewName, deck: deckName }, '', `#${viewName}${deckName ? '-' + deckName : ''}`);
    }
  }

  setupDeckNav() {
    const deckBtns = document.querySelectorAll('.deck-btn');
    deckBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const parentSection = btn.closest('.view-section');
        const viewName = parentSection.id.replace('view-', '');
        const targetKey = btn.dataset.deckTarget;

        parentSection.querySelectorAll('.deck-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        this.syncDeckNavVisibility(viewName, targetKey);
        
        history.pushState({ view: viewName, deck: targetKey }, '', `#${viewName}-${targetKey}`);
      });
    });
  }

  syncDeckNavVisibility(moduleName, targetKey) {
    const container = document.getElementById(`view-${moduleName}`);
    if (!container) return;

    const wsContainer = container.querySelector('[id$="-worksheets-container"]');
    const refContainer = container.querySelector('[id$="-references-container"]');
    const simpleRefPanel = container.querySelector('#panel-mindfulness-ref');

    // 1. Core Mindfulness
    if (moduleName === 'mindfulness') {
      if (wsContainer) wsContainer.style.display = targetKey === 'mindfulness-ref' ? 'none' : 'block';
      if (simpleRefPanel) simpleRefPanel.style.display = targetKey === 'mindfulness-ref' ? 'block' : 'none';

      const wmMap = {
        'wise-mind': 'wm-align',
        'wise-mind-practice-ws3': 'wm-ws3',
        'what-skills-ws4': 'wm-ws4',
        'how-skills-ws5': 'wm-ws5',
        'mindfulness-emotion': 'wm-mce',
        'problem-solving': 'wm-solve'
      };
      const tabAttrVal = wmMap[targetKey];
      if (tabAttrVal) {
        const tabBtn = container.querySelector(`.nav-tabs .tab-btn[data-wm="${tabAttrVal}"]`);
        if (tabBtn) tabBtn.click();
      }
    }

    // 2. Interpersonal Effectiveness
    if (moduleName === 'interpersonal') {
      const isRef = targetKey.startsWith('ref-');
      if (wsContainer) wsContainer.style.display = isRef ? 'none' : 'block';
      if (refContainer) refContainer.style.display = isRef ? 'block' : 'none';

      const mainCard = document.getElementById('dearman-form')?.closest('.card');
      const dimeWrapper = document.getElementById('dime-game-wrapper');

      if (targetKey === 'dime-game') {
        if (mainCard) mainCard.style.display = 'none';
        if (dimeWrapper) dimeWrapper.style.display = 'block';
      } else {
        if (mainCard) mainCard.style.display = 'block';
        if (dimeWrapper) dimeWrapper.style.display = 'none';

        const ieMap = {
          'dear-man': 'ie-dearman',
          'priorities-ws3': 'ie-priorities',
          'tracking-skills-ws5': 'ie-tracking',
          'mindfulness-others-ws9': 'ie-mindfulness',
          'dialectics-ws11': 'ie-dialectics',
          'val-others': 'ie-val-others',
          'self-val': 'ie-self-val'
        };
        const tabAttrVal = ieMap[targetKey];
        if (tabAttrVal) {
          const tabBtn = container.querySelector(`.nav-tabs .tab-btn[data-ietab="${tabAttrVal}"]`);
          if (tabBtn) tabBtn.click();
        }
      }

      if (isRef && refContainer) {
        const subTabBtn = refContainer.querySelector(`.nav-tabs .tab-btn[data-reftab="${targetKey}"]`);
        if (subTabBtn) subTabBtn.click();
      }
    }

    // 3. Emotion Regulation
    if (moduleName === 'emotion-regulation') {
      const isRef = targetKey.startsWith('ref-');
      if (wsContainer) wsContainer.style.display = isRef ? 'none' : 'block';
      if (refContainer) refContainer.style.display = isRef ? 'block' : 'none';

      const moeCard = document.getElementById('model-of-emotions-form')?.closest('.card');
      const abcWrapper = document.getElementById('abc-please-wrapper');
      const isMoe = ['model-emotions', 'check-facts-ws5', 'opposite-action-ws7'].includes(targetKey);

      if (isMoe) {
        if (moeCard) moeCard.style.display = 'block';
        if (abcWrapper) abcWrapper.style.display = 'none';

        const moeMap = {
          'model-emotions': 'moe-model',
          'check-facts-ws5': 'moe-checkfacts',
          'opposite-action-ws7': 'moe-opposite'
        };
        const tabAttrVal = moeMap[targetKey];
        if (tabAttrVal) {
          const tabBtn = container.querySelector(`.nav-tabs .tab-btn[data-moetab="${tabAttrVal}"]`);
          if (tabBtn) tabBtn.click();
        }
      } else {
        if (moeCard) moeCard.style.display = 'none';
        if (abcWrapper) abcWrapper.style.display = 'block';

        const abcMap = {
          'values-to-actions': 'tab-v2a',
          'vulnerability-reduction-ws9': 'tab-reduce-vuln',
          'pleasant-diary-ws10': 'tab-pleasant-events',
          'mastery-ws12': 'tab-mastery-cope',
          'please-ws14': 'tab-please-ws14'
        };
        const tabAttrVal = abcMap[targetKey];
        if (tabAttrVal) {
          const tabBtn = container.querySelector(`.nav-tabs .tab-btn[data-subtab="${tabAttrVal}"]`);
          if (tabBtn) tabBtn.click();
        }
      }

      if (isRef && refContainer) {
        const subTabBtn = refContainer.querySelector(`.nav-tabs .tab-btn[data-reftab="${targetKey}"]`);
        if (subTabBtn) subTabBtn.click();
      }
    }

    // 4. Distress Tolerance
    if (moduleName === 'distress-tolerance') {
      const isRef = ['tipp', 'dt-accepts', 'dt-soothe', 'dt-improve'].includes(targetKey);
      if (wsContainer) wsContainer.style.display = isRef ? 'none' : 'block';
      if (refContainer) refContainer.style.display = isRef ? 'block' : 'none';

      const dtMap = {
        'chain-analysis': 'dt-chain',
        'stop-skill-ws2': 'dt-stop',
        'pros-cons-ws3': 'dt-proscons',
        'tip-skills-ws4': 'dt-tip',
        'accepts-ws5': 'dt-accepts-ws',
        'soothe-ws6': 'dt-soothe-ws',
        'improve-ws7': 'dt-improve-ws',
        'radical-acceptance-ws9': 'dt-radical-acc',
        'turning-mind-ws10': 'dt-turning-mind',
        'half-smile-ws11': 'dt-half-smile',
        'mindfulness-thoughts-ws12': 'dt-mindful-thoughts'
      };
      const tabAttrVal = dtMap[targetKey];
      if (tabAttrVal) {
        const tabBtn = container.querySelector(`.nav-tabs .tab-btn[data-dttab="${tabAttrVal}"]`);
        if (tabBtn) tabBtn.click();
      }

      if (isRef && refContainer) {
        const subTabBtn = refContainer.querySelector(`.nav-tabs .tab-btn[data-reftab="${targetKey}"], .nav-tabs .tab-btn[data-dt="${targetKey}"]`);
        if (subTabBtn) subTabBtn.click();
      }
    }
  }

  setupSkillFinder() {
    const step1 = document.getElementById('sf-step-1');
    const step2 = document.getElementById('sf-step-2');
    const step3 = document.getElementById('sf-step-3');
    
    const distressBtns = document.querySelectorAll('.sf-distress-btn');
    const goalOptions = document.getElementById('sf-goal-options');
    const btnBack = document.getElementById('btn-sf-back');
    const btnReset = document.getElementById('btn-sf-reset');
    const btnGo = document.getElementById('btn-sf-go');
    
    const recommendTitle = document.getElementById('sf-recommend-title');
    const recommendDesc = document.getElementById('sf-recommend-desc');
    
    let selectedDistress = '';
    let selectedRecommendation = null;

    const goalsByDistress = {
      extreme: [
        { label: '💧 Reduce physical heat/arousal immediately (cold face splash)', view: 'distress-tolerance', deck: 'tipp', title: 'TIPP: Temperature Reset', desc: 'Splash your face with ice-cold water while holding your breath to activate the mammalian dive reflex.' },
        { label: '🏃 Release intense pent-up physical panic/energy', view: 'distress-tolerance', deck: 'tipp', title: 'TIPP: Intense Exercise', desc: 'Engage in brief, high-intensity exercise (e.g., jumping jacks, sprints) to burn off the panic.' },
        { label: '💨 Slow down racing thoughts and heart rate', view: 'distress-tolerance', deck: 'tipp', title: 'TIPP: Paced Breathing', desc: 'Breathe deeply from the stomach. Inhale for 4 seconds, exhale for 8 seconds, to trigger parasympathetic relaxation.' },
        { label: '💪 Calm physical muscle shaking or tension', view: 'distress-tolerance', deck: 'tipp', title: 'TIPP: Paired Muscle Relaxation', desc: 'Tense a muscle group for 5-7 seconds, then release it while saying the word "Relax".' }
      ],
      high: [
        { label: '🛑 Stop myself from acting impulsively on dangerous urges', view: 'distress-tolerance', deck: 'ref-dt-stop', title: 'STOP Skill Guide', desc: 'Stop, Take a step back, Observe, and Proceed mindfully to prevent crisis behavior.' },
        { label: '🧩 Distract my mind fully from current suffering', view: 'distress-tolerance', deck: 'dt-accepts', title: 'Wise Mind ACCEPTS', desc: 'Use Activities, Contributing, Comparisons, Emotions, Pushing away, Thoughts, and Sensations.' },
        { label: '🌸 Ground my body using physical senses', view: 'distress-tolerance', deck: 'dt-soothe', title: 'Self-Soothing 5 Senses', desc: 'Calm the nervous system by paying attention to sight, sound, smell, taste, and touch.' },
        { label: '☀️ Change my cognitive focus to improve my mood', view: 'distress-tolerance', deck: 'dt-improve', title: 'IMPROVE the Moment', desc: 'Use Imagery, Meaning, Prayer, Relaxation, One thing in the moment, Vacation, and Encouragement.' },
        { label: '⚖️ Assess the cost/benefit of acting on my urge', view: 'distress-tolerance', deck: 'pros-cons-ws3', title: 'Pros & Cons Worksheet', desc: 'List the pros and cons of acting on urges versus resisting urges to align with Wise Mind.' }
      ],
      moderate: [
        { label: '🔍 Check if my emotional intensity fits the actual situation', view: 'emotion-regulation', deck: 'check-facts-ws5', title: 'Check the Facts (Worksheet 5)', desc: 'Inspect if your emotion is justified by the objective details, or if interpretations are distorting it.' },
        { label: '🔄 Change an unjustified or ineffective feeling', view: 'emotion-regulation', deck: 'opposite-action-ws7', title: 'Opposite Action (Worksheet 7)', desc: 'Act 180-degrees opposite to your emotional urge to alter the brain chemistry of that emotion.' },
        { label: '🛠️ Solve a problem that has factual justification', view: 'mindfulness', deck: 'problem-solving', title: 'Problem Solving Sequence (Handout 12)', desc: 'Factual situations require logical action steps: brainstorm solutions, weigh pros/cons, and execute.' },
        { label: '🗣️ Express my needs or boundaries clearly to someone', view: 'interpersonal', deck: 'dear-man', title: 'DEAR MAN Builder (Worksheet 4)', desc: 'Describe, Express, Assert, and Reinforce to state your wishes clearly while appearing confident.' }
      ],
      low: [
        { label: '👥 Keep my relationship positive during a request', view: 'interpersonal', deck: 'ref-ie-give', title: 'Relationship: GIVE (Handout 6)', desc: 'Use a Gentle approach, act Interested, Validate the other person, and maintain an Easy manner.' },
        { label: '🛡️ Protect my self-respect and stick to my values', view: 'interpersonal', deck: 'ref-ie-fast', title: 'Self-Respect: FAST (Handout 7)', desc: 'Be Fair, No apologies, Stick to values, and be Truthful during interpersonal requests.' },
        { label: '✨ Practice grounding / quiet my active mind', view: 'mindfulness', deck: 'wise-mind', title: 'Wise Mind Alignment Wizard', desc: 'Enter the center of awareness, align logic and emotion, and identify your wise path forward.' },
        { label: '💭 Observe thoughts without getting swept away by them', view: 'distress-tolerance', deck: 'mindfulness-thoughts-ws12', title: 'Mindfulness of Thoughts (Worksheet 12)', desc: 'Practice cognitive defusion and watch thoughts arise and pass like leaves floating down a stream.' }
      ]
    };

    distressBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        selectedDistress = btn.dataset.distress;
        
        // Render goals
        goalOptions.innerHTML = '';
        const goals = goalsByDistress[selectedDistress];
        goals.forEach(g => {
          const optBtn = document.createElement('button');
          optBtn.type = 'button';
          optBtn.className = 'btn btn-secondary sf-goal-btn';
          optBtn.style.textAlign = 'left';
          optBtn.style.padding = '0.6rem 0.8rem';
          optBtn.style.fontSize = '0.8rem';
          optBtn.textContent = g.label;
          optBtn.addEventListener('click', () => {
            selectedRecommendation = { view: g.view, deck: g.deck };
            recommendTitle.textContent = g.title;
            recommendDesc.textContent = g.desc;
            
            // Show step 3
            step2.style.display = 'none';
            step3.style.display = 'block';
          });
          goalOptions.appendChild(optBtn);
        });

        // Toggle steps
        step1.style.display = 'none';
        step2.style.display = 'block';
      });
    });

    btnBack.addEventListener('click', () => {
      step2.style.display = 'none';
      step1.style.display = 'block';
    });

    btnReset.addEventListener('click', () => {
      step3.style.display = 'none';
      step1.style.display = 'block';
      selectedDistress = '';
      selectedRecommendation = null;
    });

    btnGo.addEventListener('click', () => {
      if (selectedRecommendation) {
        this.switchView(selectedRecommendation.view);
        this.syncDeckNavVisibility(selectedRecommendation.view, selectedRecommendation.deck);
        
        // Reset wizard state for next time they come back
        step3.style.display = 'none';
        step1.style.display = 'block';
        selectedDistress = '';
        selectedRecommendation = null;
      }
    });

    const phoneCoachingCta = document.getElementById('btn-phone-coaching-cta');
    if (phoneCoachingCta) {
      phoneCoachingCta.addEventListener('click', () => {
        const btnOpenSafety = document.getElementById('btn-open-safety');
        if (btnOpenSafety) btnOpenSafety.click();
      });
    }
  }

  setupSafetyPlan() {
    const modal = document.getElementById('safety-plan-modal');
    const btnOpen = document.getElementById('btn-open-safety');
    const btnClose = document.getElementById('btn-close-safety');
    const btnPrint = document.getElementById('btn-print-safety');
    const form = document.getElementById('safety-plan-form');
    
    const viewTab = document.getElementById('btn-safety-view-tab');
    const editTab = document.getElementById('btn-safety-edit-tab');
    const viewPane = document.getElementById('safety-plan-view-pane');

    const switchTab = (tabName) => {
      if (tabName === 'view') {
        if (viewTab) viewTab.classList.add('active');
        if (editTab) editTab.classList.remove('active');
        if (viewPane) viewPane.style.display = 'block';
        if (form) form.style.display = 'none';
        this.renderSafetyPlanView();
      } else {
        if (viewTab) viewTab.classList.remove('active');
        if (editTab) editTab.classList.add('active');
        if (viewPane) viewPane.style.display = 'none';
        if (form) form.style.display = 'block';
      }
    };

    if (viewTab) viewTab.addEventListener('click', () => switchTab('view'));
    if (editTab) editTab.addEventListener('click', () => switchTab('edit'));

    if (btnOpen && modal) {
      btnOpen.addEventListener('click', async () => {
        const plan = await db.getSetting('safety_plan', {});
        if (form) {
          const textareas = form.querySelectorAll('textarea');
          textareas.forEach(ta => {
            ta.value = plan[ta.name] || '';
          });
        }
        modal.classList.add('active');
        switchTab('view');
      });
    }

    if (btnClose && modal) {
      btnClose.addEventListener('click', () => {
        modal.classList.remove('active');
      });
    }

    if (form) {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const data = {};
        const textareas = form.querySelectorAll('textarea');
        textareas.forEach(ta => {
          data[ta.name] = ta.value;
        });

        await db.setSetting('safety_plan', data);
        alert('Crisis Safety Plan successfully saved!');
        switchTab('view');
      });
    }

    if (btnPrint && form) {
      btnPrint.addEventListener('click', () => {
        const data = {};
        const textareas = form.querySelectorAll('textarea');
        textareas.forEach(ta => {
          data[ta.name] = ta.value || '(Not specified)';
        });

        const printWindow = window.open('', '_blank');
        const docHtml = '<html><head><title>My DBT Crisis Safety Plan</title><style>body {font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;line-height: 1.6;color: #333;padding: 2rem;max-width: 800px;margin: 0 auto;}h1 {color: #e11d48;border-bottom: 2px solid #e11d48;padding-bottom: 0.5rem;margin-bottom: 1.5rem;font-size: 1.8rem;}.section {margin-bottom: 1.5rem;background: #f9fafb;border: 1px solid #e5e7eb;padding: 1.25rem;border-radius: 6px;}.section h3 {margin-top: 0;color: #111827;font-size: 1.05rem;border-bottom: 1px dashed #d1d5db;padding-bottom: 0.25rem;}p {margin: 0.5rem 0 0 0;white-space: pre-wrap;font-size: 0.9rem;color: #374151;}@media print {body { padding: 0; }.section { page-break-inside: avoid; }}</style></head><body><h1>🛡️ My DBT Crisis Safety Plan</h1><p style="font-style: italic; color: #6b7280; margin-bottom: 2rem;">Keep this plan accessible. These are the steps to follow when distress levels are high.</p><div class="section"><h3>1. Warning Signs</h3><p>' + data.warning_signs + '</p></div><div class="section"><h3>2. Internal Coping Strategies</h3><p>' + data.coping_strategies + '</p></div><div class="section"><h3>3. Social Settings & People for Distraction</h3><p>' + data.distraction_settings + '</p></div><div class="section"><h3>4. Family Members or Friends to Ask for Help</h3><p>' + data.trusted_contacts + '</p></div><div class="section"><h3>5. Professionals & Crisis Hotlines</h3><p>' + data.professionals + '</p></div><div class="section"><h3>6. Making the Environment Safe</h3><p>' + data.safe_environment + '</p></div><script>window.onload = function() {window.print();};</script></body></html>';
        printWindow.document.write(docHtml);
        printWindow.document.close();
      });
    }
  }

  async renderSafetyPlanView() {
    const viewPane = document.getElementById('safety-plan-view-pane');
    if (!viewPane) return;
    
    const plan = await db.getSetting('safety_plan', {});
    
    const fields = [
      { key: 'warning_signs', label: '1. Warning Signs' },
      { key: 'coping_strategies', label: '2. Internal Coping Strategies' },
      { key: 'distraction_settings', label: '3. Social Settings & People for Distraction' },
      { key: 'trusted_contacts', label: '4. Family Members or Friends to Ask for Help', isContact: true },
      { key: 'professionals', label: '5. Professionals & Crisis Hotlines', isContact: true },
      { key: 'safe_environment', label: '6. Making the Environment Safe' }
    ];

    let html = '';
    const phoneRegex = /\b(?:\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b/g;

    fields.forEach(f => {
      html += '<div class="safety-view-section" style="margin-bottom: 1.5rem; background: var(--bg-surface); padding: 1rem; border-radius: 8px; border: 1px solid var(--border-color);">';
      html += '<h3 style="margin-top: 0; margin-bottom: 0.5rem; font-size: 1.1rem; color: var(--accent-purple); border-bottom: 1px solid var(--border-color); padding-bottom: 0.5rem;">' + f.label + '</h3>';
      
      let val = plan[f.key] || '(Not specified)';
      
      if (f.isContact && val !== '(Not specified)') {
        const lines = val.split('\n');
        const processedLines = lines.map(line => {
          return line.replace(phoneRegex, (match) => {
            const num = match.replace(/[-.\s()]/g, '');
            return match + ' ' + 
              '<a href="tel:' + num + '" class="btn btn-sm btn-secondary" style="display:inline-flex; align-items:center; gap:4px; padding: 2px 8px; font-size: 0.8rem; margin-left: 8px;">📞 Call</a>' +
              '<a href="sms:' + num + '" class="btn btn-sm btn-secondary" style="display:inline-flex; align-items:center; gap:4px; padding: 2px 8px; font-size: 0.8rem; margin-left: 4px;">💬 Text</a>';
          });
        });
        val = processedLines.join('\n');
      }
      
      html += '<div style="white-space: pre-wrap; font-size: 0.95rem; color: var(--text-primary);">' + val + '</div>';
      html += '</div>';
    });
    
    viewPane.innerHTML = html;
  }

  setupAISettings() {
    const modal = document.getElementById('ai-settings-modal');
    const btnOpen = document.getElementById('btn-open-ai-settings');
    const btnClose = document.getElementById('btn-close-ai-settings');
    const toggle = document.getElementById('ai-enable-toggle');
    const form = document.getElementById('ai-settings-form');

    if (btnOpen && modal) {
      btnOpen.addEventListener('click', async () => {
        const enabled = await db.getSetting('ai_enabled', false);
        const key = await db.getSetting('ai_gemini_key', '');
        
        if (toggle) toggle.checked = enabled;
        const keyInput = document.getElementById('ai_gemini_key');
        if (keyInput) keyInput.value = key;
        
        modal.classList.add('active');
      });
    }

    if (btnClose && modal) {
      btnClose.addEventListener('click', () => {
        modal.classList.remove('active');
      });
    }

    if (form) {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const enabled = toggle ? toggle.checked : false;
        const keyInput = document.getElementById('ai_gemini_key');
        const key = keyInput ? keyInput.value.trim() : '';

        await db.setSetting('ai_enabled', enabled);
        await db.setSetting('ai_gemini_key', key);
        
        alert('AI Settings successfully saved!');
        modal.classList.remove('active');
      });
    }
  }

  setupSearchDirectory() {
    const input = document.getElementById('search-worksheets');
    const results = document.getElementById('search-results');

    input.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      if (!query) {
        results.style.display = 'none';
        return;
      }

      const matches = this.searchIndex.filter(item => item.name.toLowerCase().includes(query));

      if (matches.length > 0) {
        results.innerHTML = matches.map(item => `
          <div class="search-result-item" style="padding: 0.6rem 1rem; cursor: pointer; font-size: 0.85rem; border-bottom: 1px solid var(--border-color); color: var(--text-primary); transition: background var(--transition-fast);" data-target="${item.target}" data-deck-target="${item.deckTarget || ''}">
            <strong style="color: var(--accent-purple);">${item.name}</strong>
            <span style="font-size: 0.75rem; color: var(--text-muted); display: block;">Module: ${item.target.toUpperCase()}</span>
          </div>
        `).join('');
        results.style.display = 'block';

        results.querySelectorAll('.search-result-item').forEach(el => {
          el.addEventListener('mouseover', () => el.style.backgroundColor = 'var(--bg-card-hover)');
          el.addEventListener('mouseout', () => el.style.backgroundColor = 'transparent');
          el.addEventListener('click', () => {
            const target = el.dataset.target;
            const deckTarget = el.dataset.deckTarget;

            if (deckTarget) {
              this.switchView(target, true);
            } else {
              this.switchView(target);
            }
            input.value = '';
            results.style.display = 'none';

            if (deckTarget) {
              const deckBtn = document.querySelector(`#view-${target} .deck-btn[data-deck-target="${deckTarget}"]`);
              if (deckBtn) deckBtn.click();
            }
          });
        });
      } else {
        results.innerHTML = `<div style="padding: 0.75rem 1rem; font-size: 0.8rem; color: var(--text-muted);">No matching worksheets found.</div>`;
        results.style.display = 'block';
      }
    });

    document.addEventListener('click', (e) => {
      if (!input.contains(e.target) && !results.contains(e.target)) {
        results.style.display = 'none';
      }
    });
  }

  setupBackupModal() {
    const modal = document.getElementById('backup-modal');
    const btnOpen = document.getElementById('btn-open-backup');
    const btnClose = document.getElementById('btn-close-backup');
    const btnExport = document.getElementById('btn-export-backup');
    const btnImport = document.getElementById('btn-import-backup');
    const fileInput = document.getElementById('import-file-input');

    if (btnOpen) btnOpen.addEventListener('click', () => modal.classList.add('active'));
    if (btnClose) btnClose.addEventListener('click', () => modal.classList.remove('active'));

    if (btnExport) {
      btnExport.addEventListener('click', async () => {
        const jsonStr = await db.exportJSONBackup();
        const blob = new Blob([jsonStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `DBT_Companion_Backup_${new Date().toISOString().substr(0, 10)}.json`;
        a.click();
        URL.revokeObjectURL(url);
      });
    }

    if (btnImport && fileInput) {
      btnImport.addEventListener('click', () => fileInput.click());
      fileInput.addEventListener('change', async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = async (event) => {
          const success = await db.importJSONBackup(event.target.result);
          if (success) {
            alert('Backup data successfully imported!');
            location.reload();
          } else {
            alert('Import failed. Invalid backup file format.');
          }
        };
        reader.readAsText(file);
      });
    }
  }

  setupModalDismissalHandlers() {
    // Close modal on overlay background click
    const overlays = document.querySelectorAll('.modal-overlay');
    overlays.forEach(overlay => {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
          overlay.classList.remove('active');
        }
      });
    });

    // Close modal on close X click
    const closeXBtns = document.querySelectorAll('.modal-close-x');
    closeXBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const overlay = btn.closest('.modal-overlay');
        if (overlay) overlay.classList.remove('active');
      });
    });
  }

  renderAllViews() {
    // 1. Core Mindfulness
    WiseMindModule.render(document.getElementById('mindfulness-worksheets-container'));

    // 2. Interpersonal Effectiveness
    DearManModule.render(document.getElementById('interpersonal-worksheets-container'));
    
    const dimeGameCard = document.createElement('div');
    dimeGameCard.id = 'dime-game-wrapper';
    document.getElementById('interpersonal-worksheets-container').appendChild(dimeGameCard);
    DimeGameModule.render(dimeGameCard);

    // 2a. Interpersonal References
    const ipRefContainer = document.getElementById('interpersonal-references-container');
    ReferencesModule.render(ipRefContainer);
    ipRefContainer.querySelectorAll('.nav-tabs .tab-btn').forEach(btn => {
      const tab = btn.dataset.reftab;
      const isIe = tab.startsWith('ref-ie-') || tab === 'ref-sorry';
      btn.style.display = isIe ? 'inline-block' : 'none';
    });
    const defaultTab = ipRefContainer.querySelector('.nav-tabs .tab-btn[data-reftab="ref-ie-overview"]');
    if (defaultTab) defaultTab.click();

    // 3. Emotion Regulation Worksheets
    ModelOfEmotionsModule.render(document.getElementById('emotion-regulation-worksheets-container'));
    
    const abcPleaseCard = document.createElement('div');
    abcPleaseCard.id = 'abc-please-wrapper';
    document.getElementById('emotion-regulation-worksheets-container').appendChild(abcPleaseCard);
    AbcPleaseModule.render(abcPleaseCard);

    // 3a. Emotion Regulation References
    const erRefContainer = document.getElementById('emotion-regulation-references-container');
    ReferencesModule.render(erRefContainer);
    erRefContainer.querySelectorAll('.nav-tabs .tab-btn').forEach(btn => {
      const tab = btn.dataset.reftab;
      const isEr = tab.startsWith('ref-er-') || tab === 'ref-emotions' || tab === 'ref-opposite-action' || tab === 'ref-sleep';
      btn.style.display = isEr ? 'inline-block' : 'none';
    });
    const defaultErTab = erRefContainer.querySelector('.nav-tabs .tab-btn[data-reftab="ref-emotions"]');
    if (defaultErTab) defaultErTab.click();

    // 4. Distress Tolerance Worksheets
    ChainAnalysisModule.render(document.getElementById('distress-tolerance-worksheets-container'));

    // 4a. Distress Tolerance References
    DistressToleranceModule.render(document.getElementById('distress-tolerance-references-container'));

    // 5. Diary Card
    DiaryCardModule.render(document.getElementById('view-diary-card'));
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new App();
});
