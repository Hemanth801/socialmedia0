/**
 * data-cleaner-demo.js
 * Live interactive data cleaning simulator & real-time grid engine
 */

document.addEventListener('DOMContentLoaded', () => {
  const sampleSelect = document.getElementById('cleanerSampleSelect');
  const runCleanBtn = document.getElementById('runCleanBtn');
  const resetCleanBtn = document.getElementById('resetCleanBtn');
  const exportCsvBtn = document.getElementById('exportCsvBtn');
  const gridContainer = document.getElementById('cleanerGrid');
  const statRowsCleaned = document.getElementById('statRowsCleaned');
  const statErrorsFixed = document.getElementById('statErrorsFixed');
  const statTimeSaved = document.getElementById('statTimeSaved');

  // Rule checkboxes
  const ruleDedup = document.getElementById('ruleDedup');
  const ruleProperCase = document.getElementById('ruleProperCase');
  const ruleStandardDates = document.getElementById('ruleStandardDates');
  const ruleFormatCurrency = document.getElementById('ruleFormatCurrency');

  if (!gridContainer || !sampleSelect) return;

  let currentDatasetKey = 'ecommerce';
  let activeData = null;
  let isCleaned = false;

  // Load sample data
  function loadDataset(key) {
    const raw = PortfolioData.cleanerSamples[key];
    if (!raw) return;

    // Deep clone to allow mutations
    activeData = {
      name: raw.name,
      headers: [...raw.headers],
      rows: raw.rows.map(r => [...r])
    };
    isCleaned = false;
    renderGrid(activeData, []);
    updateStats(0, 0, 0);
  }

  // Render HTML Table Grid
  function renderGrid(dataset, modifiedCellCoords = []) {
    let html = `
      <table class="interactive-data-table">
        <thead>
          <tr>
            <th style="width: 45px; text-align: center; color: #64748b;">#</th>
            ${dataset.headers.map(h => `<th>${escapeHtml(h)}</th>`).join('')}
          </tr>
        </thead>
        <tbody>
    `;

    dataset.rows.forEach((row, rowIndex) => {
      html += `<tr>`;
      html += `<td style="text-align: center; color: #64748b; font-size: 0.75rem; background: rgba(30, 41, 59, 0.4);">${rowIndex + 1}</td>`;

      row.forEach((cell, colIndex) => {
        const isModified = modifiedCellCoords.some(c => c.row === rowIndex && c.col === colIndex);
        const isDuplicateRow = cell === 'DUPLICATE' || cell === 'Uncleaned';
        const cellClass = isModified ? 'cell-cleaned' : (isDuplicateRow ? 'cell-error' : '');

        html += `<td class="${cellClass}">${escapeHtml(cell)}</td>`;
      });

      html += `</tr>`;
    });

    html += `
        </tbody>
      </table>
    `;

    gridContainer.innerHTML = html;
  }

  // Execute Real-Time Cleaning Rules
  function executeCleaning() {
    if (!activeData) return;

    const raw = PortfolioData.cleanerSamples[currentDatasetKey];
    // Start from fresh raw copy
    let workingRows = raw.rows.map(r => [...r]);
    const modifiedCells = [];
    let errorsFixedCount = 0;

    // 1. Deduplication
    if (ruleDedup && ruleDedup.checked) {
      const seenIds = new Set();
      const dedupedRows = [];

      workingRows.forEach((row) => {
        const primaryKey = row[0].trim().toUpperCase();
        if (!seenIds.has(primaryKey)) {
          seenIds.add(primaryKey);
          dedupedRows.push(row);
        } else {
          errorsFixedCount += 1;
        }
      });
      workingRows = dedupedRows;
    }

    // 2. Clean Cells (Proper Case, Dates, Currency, Phone)
    workingRows.forEach((row, rIdx) => {
      row.forEach((cell, cIdx) => {
        const originalVal = cell;
        let newVal = cell.trim();

        // Proper Case Rule
        if (ruleProperCase && ruleProperCase.checked) {
          // If name-like or text
          if (cIdx === 1 || (currentDatasetKey === 'crm_leads' && cIdx === 4)) {
            newVal = toProperCase(newVal);
          }
        }

        // Date Standardization Rule (YYYY-MM-DD)
        if (ruleStandardDates && ruleStandardDates.checked) {
          if (cIdx === 2 && (currentDatasetKey === 'ecommerce' || currentDatasetKey === 'financial')) {
            newVal = standardizeDate(newVal);
          }
        }

        // Currency Parsing Rule ($XX.XX)
        if (ruleFormatCurrency && ruleFormatCurrency.checked) {
          if ((currentDatasetKey === 'ecommerce' && cIdx === 3) ||
              (currentDatasetKey === 'financial' && cIdx === 3) ||
              (currentDatasetKey === 'crm_leads' && cIdx === 3)) {
            newVal = standardizeCurrency(newVal);
          }
        }

        // Phone Formatting (E.164 Clean)
        if (currentDatasetKey === 'ecommerce' && cIdx === 4) {
          newVal = cleanPhoneNumber(newVal);
        }

        // Status column normalization
        if (cIdx === row.length - 1) {
          if (cell === 'Original' || cell === 'UNVERIFIED' || cell === 'Raw') {
            newVal = 'Verified Clean ✓';
          }
        }

        if (newVal !== originalVal) {
          row[cIdx] = newVal;
          modifiedCells.push({ row: rIdx, col: cIdx });
          errorsFixedCount += 1;
        }
      });
    });

    activeData.rows = workingRows;
    isCleaned = true;

    renderGrid(activeData, modifiedCells);
    updateStats(workingRows.length, errorsFixedCount, Math.round(errorsFixedCount * 1.5));

    if (window.showToast) {
      window.showToast(`Auto-Clean Complete! Fixed ${errorsFixedCount} formatting issues & duplicates.`, 'success');
    }
  }

  // Helpers
  function toProperCase(str) {
    return str
      .toLowerCase()
      .split(/\s+/)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
      .trim();
  }

  function standardizeDate(str) {
    // Normalizes 10/04/2025, 2025.11.02, 09-15-2025, Jan 16, 2025 -> YYYY-MM-DD
    try {
      const clean = str.replace(/[./]/g, '-').trim();
      const parsed = new Date(clean);
      if (!isNaN(parsed.getTime())) {
        return parsed.toISOString().split('T')[0];
      }
    } catch (e) {
      // fallback
    }
    return str;
  }

  function standardizeCurrency(str) {
    const isNegative = str.includes('-');
    const numeric = str.replace(/[^0-9.]/g, '');
    const num = parseFloat(numeric);
    if (!isNaN(num)) {
      const formatted = '$' + num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      return isNegative ? `-${formatted}` : formatted;
    }
    return str;
  }

  function cleanPhoneNumber(str) {
    const digits = str.replace(/\D/g, '');
    if (digits.length === 10) {
      return `+1 (${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
    } else if (digits.length === 11 && digits.startsWith('1')) {
      return `+1 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`;
    }
    return str.trim();
  }

  function updateStats(rows, errors, minutesSaved) {
    if (statRowsCleaned) statRowsCleaned.textContent = rows || '0';
    if (statErrorsFixed) statErrorsFixed.textContent = errors || '0';
    if (statTimeSaved) statTimeSaved.textContent = `${minutesSaved || '0'} mins`;
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // CSV Export Mock
  function exportCSV() {
    if (!activeData) return;

    let csvContent = 'data:text/csv;charset=utf-8,';
    csvContent += activeData.headers.join(',') + '\r\n';

    activeData.rows.forEach(row => {
      const sanitized = row.map(val => `"${val.replace(/"/g, '""')}"`);
      csvContent += sanitized.join(',') + '\r\n';
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `cleaned_data_${currentDatasetKey}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    if (window.showToast) {
      window.showToast('CSV downloaded successfully! Ready for Excel & databases.', 'success');
    }
  }

  // Event Listeners
  sampleSelect.addEventListener('change', (e) => {
    currentDatasetKey = e.target.value;
    loadDataset(currentDatasetKey);
  });

  runCleanBtn.addEventListener('click', executeCleaning);

  resetCleanBtn.addEventListener('click', () => {
    loadDataset(currentDatasetKey);
    if (window.showToast) {
      window.showToast('Reset back to messy raw data format.', 'info');
    }
  });

  exportCsvBtn.addEventListener('click', exportCSV);

  // Initial load
  loadDataset(currentDatasetKey);
});
