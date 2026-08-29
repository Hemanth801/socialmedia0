/**
 * calculator.js
 * Interactive Fiverr / Freelance Order Cost & Turnaround Calculator in Indian Rupees (₹)
 * Configured for Lokarapu Hemanth
 */

document.addEventListener('DOMContentLoaded', () => {
  const pageSlider = document.getElementById('pageSlider');
  const pageDisplay = document.getElementById('pageDisplay');
  const docOptions = document.querySelectorAll('.doc-option-card');
  const addonItems = document.querySelectorAll('.addon-item');

  // Summary display fields
  const summaryPages = document.getElementById('summaryPages');
  const summaryDocType = document.getElementById('summaryDocType');
  const summaryAddons = document.getElementById('summaryAddons');
  const totalCostDisplay = document.getElementById('totalCostDisplay');
  const totalTurnaroundDisplay = document.getElementById('totalTurnaroundDisplay');
  const copySpecsBtn = document.getElementById('copySpecsBtn');
  const openWhatsAppBtn = document.getElementById('openWhatsAppBtn');

  if (!pageSlider || !totalCostDisplay) return;

  // Calculation State in INR (₹)
  let pages = parseInt(pageSlider.value, 10) || 15;
  let docType = 'digital'; // 'digital', 'scanned', 'complex'
  let docTypeName = 'Clean Digital PDF / Standard Table';
  let docRatePerPage = 35; // INR per page
  let minBasePrice = 350;

  const addonsState = {
    vba: { name: 'VBA / Macro Automation Script', price: 500, selected: false },
    power_query: { name: 'Power Query Reusable Pipeline', price: 750, selected: false },
    dashboard: { name: 'Interactive KPI Dashboard & Charts', price: 900, selected: false },
    express: { name: '⚡ 2-Hour Express Delivery', price: 450, selected: false }
  };

  // Format currency helper (₹)
  function formatINR(val) {
    return '₹' + Math.round(val).toLocaleString('en-IN');
  }

  // Recalculate Totals
  function calculateQuote() {
    // 1. Base conversion cost
    let basePrice = Math.max(minBasePrice, pages * docRatePerPage);

    // 2. Add-ons sum
    let addonsTotal = 0;
    let selectedAddonNames = [];
    Object.keys(addonsState).forEach(key => {
      if (addonsState[key].selected) {
        addonsTotal += addonsState[key].price;
        selectedAddonNames.push(addonsState[key].name);
      }
    });

    let finalPrice = Math.round(basePrice + addonsTotal);

    // 3. Turnaround estimation
    let turnaround = '12 - 24 Hours';
    if (addonsState.express.selected) {
      turnaround = '⚡ 2 - 4 Hours (Express)';
    } else if (pages <= 10 && !addonsState.vba.selected && !addonsState.dashboard.selected) {
      turnaround = '4 - 8 Hours';
    } else if (pages > 50 || addonsState.dashboard.selected) {
      turnaround = '24 - 48 Hours';
    }

    // Update UI elements
    if (pageDisplay) pageDisplay.textContent = `${pages} Pages / Sheets`;
    if (summaryPages) summaryPages.textContent = `${pages} Pages`;
    if (summaryDocType) summaryDocType.textContent = docTypeName;
    if (summaryAddons) {
      summaryAddons.textContent = selectedAddonNames.length > 0 ? selectedAddonNames.join(', ') : 'None';
    }
    if (totalCostDisplay) totalCostDisplay.textContent = formatINR(finalPrice);
    if (totalTurnaroundDisplay) totalTurnaroundDisplay.textContent = `Estimated Delivery: ${turnaround}`;

    // Return specs object for copying
    return {
      pages,
      docTypeName,
      selectedAddons: selectedAddonNames,
      finalPrice,
      turnaround
    };
  }

  // Slider change
  pageSlider.addEventListener('input', (e) => {
    pages = parseInt(e.target.value, 10);
    calculateQuote();
  });

  // Document Type Selection
  docOptions.forEach(opt => {
    opt.addEventListener('click', () => {
      docOptions.forEach(o => o.classList.remove('selected'));
      opt.classList.add('selected');

      const type = opt.dataset.type;
      docType = type;

      if (type === 'digital') {
        docTypeName = 'Clean Digital PDF / Standard Table';
        docRatePerPage = 35;
        minBasePrice = 350;
      } else if (type === 'scanned') {
        docTypeName = 'Scanned OCR / Bank Statements';
        docRatePerPage = 60;
        minBasePrice = 600;
      } else if (type === 'complex') {
        docTypeName = 'Multi-Table / Low-Res / Complex';
        docRatePerPage = 90;
        minBasePrice = 900;
      }

      calculateQuote();
    });
  });

  // Add-ons toggling
  addonItems.forEach(item => {
    item.addEventListener('click', () => {
      const addonKey = item.dataset.addon;
      const checkbox = item.querySelector('input[type="checkbox"]');

      if (addonsState[addonKey]) {
        addonsState[addonKey].selected = !addonsState[addonKey].selected;
        if (checkbox) checkbox.checked = addonsState[addonKey].selected;

        if (addonsState[addonKey].selected) {
          item.classList.add('selected');
        } else {
          item.classList.remove('selected');
        }

        calculateQuote();
      }
    });
  });

  // Generate Structured Order Specs Message
  function generateOrderMessage(specs) {
    return `Hi Hemanth! I saw your portfolio and would like to discuss a project:

📋 Project Requirements:
- Document Type: ${specs.docTypeName}
- Volume: ${specs.pages} Pages / Records
- Optional Add-ons: ${specs.selectedAddons.length ? specs.selectedAddons.join(' + ') : 'Standard Formatting'}
- Target Delivery: ${specs.turnaround}
- Estimated Budget: ~${formatINR(specs.finalPrice)}

I have sample files ready to share. Please let me know how we can proceed!`;
  }

  // Copy Specs & Open Modal
  if (copySpecsBtn) {
    copySpecsBtn.addEventListener('click', () => {
      const specs = calculateQuote();
      const message = generateOrderMessage(specs);

      // Populate into inquiry modal
      const modalTextarea = document.getElementById('inquiryMessage');
      if (modalTextarea) {
        modalTextarea.value = message;
      }

      // Copy to clipboard
      navigator.clipboard.writeText(message).then(() => {
        if (window.showToast) {
          window.showToast('📋 Order details copied! Opening inquiry window...', 'success');
        }
      }).catch(() => {});

      // Open Modal
      if (window.openInquiryModal) {
        window.openInquiryModal();
      }
    });
  }

  // Direct WhatsApp Button from Calculator
  if (openWhatsAppBtn) {
    openWhatsAppBtn.addEventListener('click', () => {
      const specs = calculateQuote();
      const message = generateOrderMessage(specs);
      const phone = '918247583544';
      const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
      window.open(url, '_blank');
    });
  }

  // Initial calculation
  calculateQuote();
});
