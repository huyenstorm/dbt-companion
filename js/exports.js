/* Therapist Export & Data Sharing Utilities */

export const Exports = {
  // Option 1: Print 8.5x11 Worksheet
  printWorksheet(title, date, fields) {
    const printArea = document.createElement('div');
    printArea.id = 'print-container';
    
    let fieldsHTML = '';
    let chatHTML = '';
    for (const [key, value] of Object.entries(fields)) {
      if (key === 'chat_history') {
        if (value && Array.isArray(value) && value.length > 0) {
          chatHTML = `
            <div class="print-field" style="margin-top: 1.5rem; border-top: 1px dashed #ccc; padding-top: 1rem; page-break-inside: avoid;">
              <div class="print-field-label" style="font-weight: 700; color: #111; margin-bottom: 0.5rem;">💬 DBT AI Coach Chat Transcript</div>
              <div style="font-size: 0.85rem; line-height: 1.45; color: #333;">
                ${value.map(msg => `<strong>${msg.role === 'user' ? 'Client' : 'DBT AI Coach'}:</strong> ${msg.content.replace(/\n/g, '<br>')}`).join('<br><br>')}
              </div>
            </div>
          `;
        }
        continue;
      }
      fieldsHTML += `
        <div class="print-field">
          <div class="print-field-label">${key}</div>
          <div class="print-field-value">${value || 'N/A'}</div>
        </div>
      `;
    }

    printArea.innerHTML = `
      <div class="print-header">
        <h1>DBT Skills Homework - ${title}</h1>
        <p>Date Completed: ${new Date(date).toLocaleDateString()} | Client Copy</p>
      </div>
      <div class="print-content">
        ${fieldsHTML}
        ${chatHTML}
      </div>
    `;

    document.body.appendChild(printArea);
    window.print();
    document.body.removeChild(printArea);
  },

  // Option 2: Copy Formatted Markdown for Patient Portals (MyChart / TherapyPortal)
  copyForPortal(title, date, fields) {
    let text = `=== DBT SKILLS HOMEWORK: ${title.toUpperCase()} ===\n`;
    text += `Date: ${new Date(date).toLocaleDateString()}\n`;
    text += `--------------------------------------------------\n\n`;

    let chatText = '';
    for (const [key, value] of Object.entries(fields)) {
      if (key === 'chat_history') {
        if (value && Array.isArray(value) && value.length > 0) {
          chatText = `--------------------------------------------------\n`;
          chatText += `💬 DBT AI COACH CHAT TRANSCRIPT:\n\n`;
          chatText += value.map(msg => `${msg.role === 'user' ? 'Client' : 'DBT AI Coach'}: ${msg.content}`).join('\n\n') + '\n\n';
        }
        continue;
      }
      text += `▶ ${key.toUpperCase()}:\n${value || 'N/A'}\n\n`;
    }
    
    if (chatText) text += chatText;

    text += `==================================================\n`;
    text += `Generated via DBT Companion App (Client-Side Privacy Protected)\n`;

    navigator.clipboard.writeText(text).then(() => {
      alert('Copied formatted worksheet to clipboard! You can now paste this directly into your patient portal message or email to your therapist.');
    }).catch(err => {
      console.error('Clipboard copy error:', err);
      alert('Could not copy automatically. Please select text manually.');
    });
  },

  // Option 3: Generate Local QR Code Canvas for Peer / Therapist Screen Scanning
  renderQRCode(elementId, textData) {
    const container = document.getElementById(elementId);
    if (!container) return;

    // Simple canvas-based QR visualization fallback
    container.innerHTML = `
      <div style="text-align: center; padding: 1rem; background: var(--bg-card); border-radius: var(--radius-md);">
        <p style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 0.5rem;">
          📱 Have your therapist scan or view screen:
        </p>
        <textarea readonly style="width: 100%; height: 120px; font-family: var(--font-mono); font-size: 0.8rem; background: var(--bg-input); color: var(--text-primary); border: 1px solid var(--border-color); border-radius: var(--radius-sm); padding: 0.5rem;">${textData}</textarea>
      </div>
    `;
  }
};
