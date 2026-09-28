(function () {
  const grid = document.getElementById('lessonsGrid');
  const empty = document.getElementById('lessonsEmpty');
  const countEl = document.getElementById('lessonsCount');
  const filters = document.getElementById('lessonFilters');
  if (!grid) return;

  let allLessons = [];
  let activeFilter = 'all';

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function render(list) {
    const real = list.filter((l) => !l.placeholder);
    const show = list;

    if (countEl) {
      const n = real.length;
      countEl.textContent =
        activeFilter === 'all'
          ? n === 0
            ? 'No lessons yet'
            : n + ' lesson' + (n === 1 ? '' : 's')
          : n + ' in this module';
    }

    if (!show.length) {
      grid.innerHTML = '';
      if (empty) empty.hidden = false;
      return;
    }
    if (empty) empty.hidden = true;

    grid.innerHTML = show
      .map((l) => {
        const hasFile = l.file && !l.placeholder;
        const href = hasFile ? 'lessons/' + l.file.replace(/^\//, '') : null;
        const pages = l.pages ? l.pages + ' pages' : '';
        const meta = [l.moduleLabel || l.module, l.topic, pages].filter(Boolean).join(' · ');

        return (
          '<article class="lesson-card' +
          (l.placeholder ? ' lesson-card-placeholder' : '') +
          '" data-module="' +
          escapeHtml(l.module || '') +
          '">' +
          '<div class="lesson-card-icon lesson-card-icon-math" aria-hidden="true">∫</div>' +
          '<div class="lesson-card-body">' +
          '<p class="lesson-meta">' +
          escapeHtml(meta) +
          '</p>' +
          '<h3 class="lesson-title">' +
          escapeHtml(l.title || 'Untitled') +
          '</h3>' +
          (l.description
            ? '<p class="lesson-desc">' + escapeHtml(l.description) + '</p>'
            : '') +
          '</div>' +
          '<div class="lesson-card-actions">' +
          (hasFile
            ? '<a class="btn btn-primary btn-sm" href="' +
              escapeHtml(href) +
              '" target="_blank" rel="noopener">Open PDF</a>' +
              '<a class="btn btn-ghost btn-sm" href="' +
              escapeHtml(href) +
              '" download>Download</a>'
            : '<span class="lesson-soon">Coming soon</span>') +
          '</div></article>'
        );
      })
      .join('');
  }

  function applyFilter() {
    const list =
      activeFilter === 'all'
        ? allLessons
        : allLessons.filter((l) => l.module === activeFilter);
    render(list);
  }

  if (filters) {
    filters.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-filter]');
      if (!btn) return;
      filters.querySelectorAll('.pill').forEach((p) => p.classList.remove('active'));
      btn.classList.add('active');
      activeFilter = btn.getAttribute('data-filter') || 'all';
      applyFilter();
    });
  }

  fetch('lessons/manifest.json')
    .then((r) => {
      if (!r.ok) throw new Error('manifest missing');
      return r.json();
    })
    .then((data) => {
      allLessons = Array.isArray(data.lessons) ? data.lessons : [];
      applyFilter();
    })
    .catch(() => {
      allLessons = [];
      if (countEl) countEl.textContent = 'Could not load lessons';
      if (empty) {
        empty.hidden = false;
        empty.querySelector('p').textContent = 'Could not load the lessons list.';
      }
    });
})();
