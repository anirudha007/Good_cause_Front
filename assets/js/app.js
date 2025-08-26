/* =========
   Small UX helpers (no jQuery needed)
   ========= */

// Sticky navbar shadow on scroll
(function() {
  const nav = document.querySelector('.navbar.sticky-top');
  if (!nav) return;
  const onScroll = () => {
    if (window.scrollY > 8) nav.classList.add('is-scrolled');
    else nav.classList.remove('is-scrolled');
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
})();

// Smooth-scroll for in-page anchors (for older browsers that ignore CSS smooth)
(function() {
  const samePageLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
  samePageLinks.forEach(a => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // collapse navbar after click on mobile
        const collapseEl = document.querySelector('.navbar .navbar-collapse.show');
        if (collapseEl) new bootstrap.Collapse(collapseEl).hide();
      }
    });
  });
})();

// Intersection-based reveal animations
(function() {
  const els = document.querySelectorAll('.reveal, [data-reveal]');
  if (!('IntersectionObserver' in window) || els.length === 0) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  els.forEach(el => io.observe(el));
})();

// Basic contact form handler (demo only)
(function() {
  const form = document.querySelector('#contact form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // minimal validation
    const required = form.querySelectorAll('[required]');
    let ok = true;
    required.forEach(inp => {
      if (!inp.value.trim()) {
        ok = false;
        inp.classList.add('is-invalid');
        inp.addEventListener('input', () => inp.classList.remove('is-invalid'), { once: true });
      }
    });
    if (!ok) return;

    // pretend to send
    toast('Thanks! We’ll contact you soon.');
    form.reset();
  });

  // Simple toast using Bootstrap
  function toast(message) {
    let wrap = document.getElementById('toasts');
    if (!wrap) {
      wrap = document.createElement('div');
      wrap.id = 'toasts';
      wrap.style.position = 'fixed';
      wrap.style.right = '1rem';
      wrap.style.bottom = '1rem';
      wrap.style.zIndex = '1080';
      document.body.appendChild(wrap);
    }
    const el = document.createElement('div');
    el.className = 'toast align-items-center text-bg-dark border-0';
    el.role = 'alert';
    el.ariaLive = 'assertive';
    el.ariaAtomic = 'true';
    el.innerHTML = `
      <div class="d-flex">
        <div class="toast-body">${message}</div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>`;
    wrap.appendChild(el);
    const t = new bootstrap.Toast(el, { delay: 2600 });
    t.show();
    el.addEventListener('hidden.bs.toast', () => el.remove());
  }
})();
