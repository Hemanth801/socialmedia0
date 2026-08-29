/**
 * comparison.js
 * Interactive Before & After Split-Screen Comparison Slider
 */

document.addEventListener('DOMContentLoaded', () => {
  const comparisonWrapper = document.getElementById('comparisonWrapper');
  const afterPane = document.getElementById('afterPane');
  const sliderHandle = document.getElementById('sliderHandle');
  const scenarioBtns = document.querySelectorAll('.scenario-btn');
  const beforeContent = document.getElementById('beforeContent');
  const afterContent = document.getElementById('afterContent');

  if (!comparisonWrapper || !afterPane || !sliderHandle) return;

  let isDragging = false;

  // Initialize scenario rendering
  let currentScenarioKey = 'bank_statement';

  function renderScenario(key) {
    const data = PortfolioData.comparisonScenarios[key];
    if (!data) return;

    // Render Before Pane (Raw PDF / Messy text view)
    let beforeHtml = `
      <div class="raw-pdf-view">
        <div class="raw-header">
          <span><i class="fa-solid fa-file-lines" style="color: #f87171; margin-right: 6px;"></i> ${data.before.meta}</span>
          <span style="color: #ef4444; font-size: 0.75rem; font-weight: 700;">UNSTRUCTURED RAW DATA</span>
        </div>
    `;

    data.before.lines.forEach((line, idx) => {
      const isErr = idx % 2 === 1;
      beforeHtml += `<div class="raw-text-line ${isErr ? 'error-highlight' : ''}">${escapeHtml(line)}</div>`;
    });

    beforeHtml += `</div>`;
    if (beforeContent) beforeContent.innerHTML = beforeHtml;

    // Render After Pane (Pristine Formatted Excel Grid)
    let afterHtml = `
      <div class="clean-excel-view">
        <table class="clean-excel-table">
          <thead>
            <tr>
              ${data.after.headers.map(h => `<th>${h}</th>`).join('')}
            </tr>
          </thead>
          <tbody>
    `;

    data.after.rows.forEach(row => {
      afterHtml += `<tr>`;
      row.forEach((cell, i) => {
        const isNum = cell.startsWith('$') || cell.startsWith('+') || cell.startsWith('-') || !isNaN(cell);
        afterHtml += `<td class="${isNum ? 'num-col' : ''}">${escapeHtml(cell)}</td>`;
      });
      afterHtml += `</tr>`;
    });

    if (data.after.total) {
      afterHtml += `
        <tr class="total-row">
          ${data.after.total.map((t, idx) => `<td class="${idx >= 3 ? 'num-col' : ''}"><strong>${escapeHtml(t)}</strong></td>`).join('')}
        </tr>
      `;
    }

    afterHtml += `
          </tbody>
        </table>
      </div>
    `;
    if (afterContent) afterContent.innerHTML = afterHtml;
  }

  // Handle Scenario Switching
  scenarioBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      scenarioBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const scenario = btn.dataset.scenario;
      if (scenario) {
        currentScenarioKey = scenario;
        renderScenario(scenario);
      }
    });
  });

  // Slider Drag Events
  function updateSliderPosition(clientX) {
    const rect = comparisonWrapper.getBoundingClientRect();
    let offsetX = clientX - rect.left;

    // Constrain to bounds (10% to 90%)
    const minX = rect.width * 0.08;
    const maxX = rect.width * 0.92;

    if (offsetX < minX) offsetX = minX;
    if (offsetX > maxX) offsetX = maxX;

    const percentage = (offsetX / rect.width) * 100;

    afterPane.style.width = `${percentage}%`;
    sliderHandle.style.left = `${percentage}%`;
  }

  // Mouse Events
  sliderHandle.addEventListener('mousedown', (e) => {
    isDragging = true;
    e.preventDefault();
  });

  window.addEventListener('mouseup', () => {
    isDragging = false;
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    updateSliderPosition(e.clientX);
  });

  // Touch Events for Mobile / Tablet
  sliderHandle.addEventListener('touchstart', (e) => {
    isDragging = true;
  }, { passive: true });

  window.addEventListener('touchend', () => {
    isDragging = false;
  });

  window.addEventListener('touchmove', (e) => {
    if (!isDragging || !e.touches[0]) return;
    updateSliderPosition(e.touches[0].clientX);
  }, { passive: true });

  // Wrapper Click to Move Handle
  comparisonWrapper.addEventListener('click', (e) => {
    // Avoid triggering if clicked on inner interactive buttons
    if (e.target.closest('.scenario-btn')) return;
    updateSliderPosition(e.clientX);
  });

  // Helper escape
  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // Initial render
  renderScenario(currentScenarioKey);
});
