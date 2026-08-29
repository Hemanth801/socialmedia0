/**
 * main.js
 * UI interactions, navbar, scroll spy, case studies, reviews, WhatsApp/Fiverr modal triggers
 * Configured for Lokarapu Hemanth
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Navigation Scroll Spy & Sticky Header
  const navbar = document.querySelector('.navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const navToggle = document.getElementById('navToggle');
  const mobileMenu = document.getElementById('mobileMenu');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    updateActiveNav();
  });

  function updateActiveNav() {
    const scrollPos = window.scrollY + 100;
    document.querySelectorAll('section[id]').forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  // Mobile Menu Toggle
  if (navToggle && mobileMenu) {
    navToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
      const icon = navToggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-xmark');
      }
    });

    // Close mobile menu on click link
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        const icon = navToggle.querySelector('i');
        if (icon) {
          icon.classList.add('fa-bars');
          icon.classList.remove('fa-xmark');
        }
      });
    });
  }

  // 2. Animated Stats Counters
  const metricNumbers = document.querySelectorAll('.metric-number[data-target]');
  let hasCounted = false;

  function animateCounters() {
    metricNumbers.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      const suffix = counter.getAttribute('data-suffix') || '';
      const prefix = counter.getAttribute('data-prefix') || '';
      const duration = 1500;
      const stepTime = 20;
      const totalSteps = duration / stepTime;
      const increment = target / totalSteps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          counter.textContent = `${prefix}${target.toLocaleString('en-IN')}${suffix}`;
          clearInterval(timer);
        } else {
          counter.textContent = `${prefix}${Math.floor(current).toLocaleString('en-IN')}${suffix}`;
        }
      }, stepTime);
    });
  }

  const metricsSection = document.querySelector('.metrics-banner');
  if (metricsSection) {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !hasCounted) {
        hasCounted = true;
        animateCounters();
      }
    }, { threshold: 0.3 });
    observer.observe(metricsSection);
  }

  // 3. Render Case Studies Showcase
  const caseStudiesGrid = document.getElementById('caseStudiesGrid');
  if (caseStudiesGrid && PortfolioData.caseStudies) {
    let caseHtml = '';
    PortfolioData.caseStudies.forEach(cs => {
      caseHtml += `
        <div class="case-card">
          <div class="case-header-visual">
            <span class="case-category-pill">${cs.category}</span>
            <i class="${cs.icon}"></i>
          </div>
          <div class="case-body">
            <h3 class="case-title">${cs.title}</h3>
            <p class="case-desc">${cs.description}</p>
            
            <div class="case-metrics-row">
              ${cs.metrics.map(m => `
                <div class="case-metric-box">
                  <div class="c-val">${m.value}</div>
                  <div class="c-lbl">${m.label}</div>
                </div>
              `).join('')}
            </div>

            <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 1.5rem;">
              ${cs.tags.map(t => `<span style="font-size: 0.75rem; background: var(--bg-tertiary); padding: 0.2rem 0.6rem; border-radius: 4px; color: var(--text-secondary);">${t}</span>`).join('')}
            </div>

            <div style="display: flex; gap: 0.5rem;">
              <button class="btn btn-outline btn-sm open-inquiry-trigger" style="flex: 1;" data-preset="Hi Hemanth! I am interested in a project similar to: ${cs.title}">
                <i class="fa-solid fa-bolt"></i> Order Similar
              </button>
              <a href="https://wa.me/918247583544?text=${encodeURIComponent('Hi Hemanth! I saw your case study on ' + cs.title + ' and want to discuss a project.')}" target="_blank" class="btn btn-whatsapp btn-sm" title="Chat on WhatsApp">
                <i class="fa-brands fa-whatsapp"></i>
              </a>
            </div>
          </div>
        </div>
      `;
    });
    caseStudiesGrid.innerHTML = caseHtml;
  }

  // 4. Render & Filter Verified Client Reviews
  const reviewsGrid = document.getElementById('reviewsGrid');
  const reviewFilterBtns = document.querySelectorAll('.reviews-filter-bar .filter-btn');

  function renderReviews(filter = 'all') {
    if (!reviewsGrid || !PortfolioData.reviews) return;

    const filtered = filter === 'all'
      ? PortfolioData.reviews
      : PortfolioData.reviews.filter(r => r.category === filter);

    let html = '';
    filtered.forEach(rev => {
      const stars = Array(rev.rating).fill('<i class="fa-solid fa-star"></i>').join('');

      html += `
        <div class="review-card">
          <div class="review-top">
            <div class="review-stars">${stars}</div>
            <span class="fiverr-order-tag"><i class="fa-solid fa-circle-check"></i> ${rev.gigType}</span>
          </div>
          <p class="review-text">"${rev.text}"</p>
          <div class="review-author">
            <div class="author-avatar">${rev.avatar}</div>
            <div class="author-info">
              <h4>${rev.name}</h4>
              <p>${rev.role} • ${rev.country}</p>
            </div>
          </div>
        </div>
      `;
    });

    reviewsGrid.innerHTML = html;
  }

  reviewFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      reviewFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter || 'all';
      renderReviews(filter);
    });
  });

  renderReviews('all');

  // 5. FAQ Accordions
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      faqItems.forEach(i => {
        i.classList.remove('active');
        const a = i.querySelector('.faq-answer');
        if (a) a.style.maxHeight = null;
      });

      if (!isActive) {
        item.classList.add('active');
        answer.style.maxHeight = `${answer.scrollHeight + 30}px`;
      }
    });
  });

  // 6. Global Modal & Inquiry Handlers
  const inquiryModal = document.getElementById('inquiryModal');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const inquiryMessage = document.getElementById('inquiryMessage');
  const copyModalSpecsBtn = document.getElementById('copyModalSpecsBtn');
  const directFiverrBtn = document.getElementById('directFiverrBtn');
  const directWhatsAppModalBtn = document.getElementById('directWhatsAppModalBtn');

  window.openInquiryModal = function(presetText = '') {
    if (inquiryModal) {
      if (presetText && inquiryMessage) {
        inquiryMessage.value = presetText;
      }
      inquiryModal.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  };

  function closeModal() {
    if (inquiryModal) {
      inquiryModal.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
  if (inquiryModal) {
    inquiryModal.addEventListener('click', (e) => {
      if (e.target === inquiryModal) closeModal();
    });
  }

  // Delegated clicks for open-inquiry-trigger
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('.open-inquiry-trigger');
    if (trigger) {
      const preset = trigger.dataset.preset || '';
      window.openInquiryModal(preset);
    }
  });

  // Copy from modal
  if (copyModalSpecsBtn && inquiryMessage) {
    copyModalSpecsBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(inquiryMessage.value).then(() => {
        window.showToast('📋 Message copied to clipboard!', 'success');
      });
    });
  }

  // Direct Fiverr link redirect
  if (directFiverrBtn) {
    directFiverrBtn.addEventListener('click', () => {
      // Direct Fiverr Seller Profile Link (Can be customized by user)
      const fiverrUrl = 'https://www.fiverr.com/';
      window.open(fiverrUrl, '_blank');
      window.showToast('Redirecting to Fiverr...', 'info');
    });
  }

  // Direct WhatsApp Button from Modal
  if (directWhatsAppModalBtn && inquiryMessage) {
    directWhatsAppModalBtn.addEventListener('click', () => {
      const phone = '918247583544';
      const text = encodeURIComponent(inquiryMessage.value);
      window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
    });
  }

  // 7. Global Toast Notification Helper
  const toastContainer = document.getElementById('toastContainer');
  window.showToast = function(message, type = 'info') {
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.className = 'toast';

    let icon = 'fa-circle-info';
    if (type === 'success') icon = 'fa-circle-check';
    if (type === 'error') icon = 'fa-circle-exclamation';

    toast.innerHTML = `<i class="fa-solid ${icon}"></i> <span>${escapeHtml(message)}</span>`;
    toastContainer.appendChild(toast);

    setTimeout(() => toast.classList.add('show'), 20);

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 400);
    }, 3500);
  };

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
});
