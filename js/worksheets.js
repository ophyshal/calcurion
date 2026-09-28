(function () {
  const grid = document.getElementById('worksheetsGrid');
  const empty = document.getElementById('worksheetsEmpty');
  const countEl = document.getElementById('worksheetsCount');
  const filters = document.getElementById('worksheetFilters');
  if (!grid) return;

  let allWorksheets = [];
  let activeFilter = 'all';

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function render(list) {
    const real = list.filter((w) => !w.placeholder);
    const show = list;

    if (countEl) {
      const n = real.length;
      countEl.textContent =
        activeFilter === 'all'
          ? n === 0
            ? 'No worksheets yet'
            : n + ' worksheet' + (n === 1 ? '' : 's')
          : n + ' in this module';
    }

    if (!show.length) {
      grid.innerHTML = '';
      if (empty) empty.hidden = false;
      return;
    }
    if (empty) empty.hidden = true;

    grid.innerHTML = show
      .map((w) => {
        const hasFile = w.file && !w.placeholder;
        const href = hasFile ? 'worksheets/' + w.file.replace(/^\//, '') : null;
        const pages = w.pages ? w.pages + ' pages' : '';
        const meta = [w.moduleLabel || w.module, w.topic, pages].filter(Boolean).join(' · ');

        return (
          '<article class="lesson-card' +
          (w.placeholder ? ' lesson-card-placeholder' : '') +
          '" data-module="' +
          escapeHtml(w.module || '') +
          '">' +
          '<div class="lesson-card-icon lesson-card-icon-math" aria-hidden="true">Π</div>' +
          '<div class="lesson-card-body">' +
          '<p class="lesson-meta">' +
          escapeHtml(meta) +
          '</p>' +
          '<h3 class="lesson-title">' +
          escapeHtml(w.title || 'Untitled') +
          '</h3>' +
          (w.description
            ? '<p class="lesson-desc">' + escapeHtml(w.description) + '</p>'
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
        ? allWorksheets
        : allWorksheets.filter((w) => w.module === activeFilter);
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

  fetch('worksheets/manifest.json')
    .then((r) => {
      if (!r.ok) throw new Error('manifest missing');
      return r.json();
    })
    .then((data) => {
      allWorksheets = Array.isArray(data.worksheets) ? data.worksheets : [];
      applyFilter();
    })
    .catch(() => {
      allWorksheets = [];
      if (countEl) countEl.textContent = 'Could not load worksheets';
      if (empty) {
        empty.hidden = false;
        empty.querySelector('p').textContent = 'Could not load the worksheets list.';
      }
    });
})();
