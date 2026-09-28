// Theme toggle
const themeToggle = document.getElementById('themeToggle');
const root = document.documentElement;

const saved = localStorage.getItem('calcurion-theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const initial = saved || (prefersDark ? 'dark' : 'light');
root.setAttribute('data-theme', initial);

themeToggle?.addEventListener('click', () => {
  const current = root.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', next);
  localStorage.setItem('calcurion-theme', next);
});

// Module pills
document.querySelectorAll('.pill-tabs').forEach(group => {
  const pills = group.querySelectorAll('.pill');
  const section = group.closest('.section');

  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const module = pill.dataset.module;
      section.querySelectorAll('.module-panel').forEach(panel => {
        panel.classList.remove('active');
      });
      const target = section.querySelector(`#panel-${module}`);
      if (target) target.classList.add('active');
    });
  });
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const id = anchor.getAttribute('href');
    if (id === '#') return;
    const el = document.querySelector(id);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Jump links that switch module tabs (e.g. Pure 2)
document.querySelectorAll('[data-jump]').forEach(link => {
  link.addEventListener('click', () => {
    const mod = link.getAttribute('data-jump');
    const section = document.getElementById('maths') || document.getElementById('further');
    if (!section || !mod) return;
    const pill = section.querySelector(`.pill[data-module="${mod}"]`);
    if (pill) pill.click();
  });
});

// Site visit counter (once per browser session)
(function () {
  const el = document.getElementById('visitCount');
  if (!el) return;

  const KEY = 'calcurion-visit-counted';
  const namespace = 'calcurion.site';
  const key = 'visits';
  const already = sessionStorage.getItem(KEY);

  function format(n) {
    return Number(n).toLocaleString('en-GB') + ' visits';
  }

  function show(n) {
    el.textContent = format(n);
  }

  if (already) {
    // Same session — only fetch the current total
    fetch('https://api.countapi.xyz/get/' + namespace + '/' + key)
      .then((r) => r.json())
      .then((data) => {
        if (data && typeof data.value === 'number') show(data.value);
      })
      .catch(() => {});
    return;
  }

  fetch('https://api.countapi.xyz/hit/' + namespace + '/' + key)
    .then((r) => r.json())
    .then((data) => {
      if (data && typeof data.value === 'number') {
        show(data.value);
        sessionStorage.setItem(KEY, '1');
      }
    })
    .catch(() => {
      el.textContent = '';
    });
})();
