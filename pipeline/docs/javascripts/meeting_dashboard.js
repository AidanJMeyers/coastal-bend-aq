/* ==========================================================================
   Coastal Bend AQ — Interactive Meeting Dashboard
   ==========================================================================
   Reads action-item state from a <script id="action-items" type="application/
   json"> block on the page, renders an interactive kanban with filters,
   persists local edits to localStorage, and offers an export-to-JSON that
   users paste back into the markdown to make changes permanent.
   ==========================================================================*/
(function () {
  'use strict';

  const STORAGE_KEY = 'cb-meeting-notes-v1';

  // ------------ Data loading ------------
  function loadInitial() {
    const node = document.getElementById('action-items');
    if (!node) return { items: [], meetings: [] };
    try {
      return JSON.parse(node.textContent);
    } catch (e) {
      console.error('cb-meeting-dashboard: failed to parse action-items JSON', e);
      return { items: [], meetings: [] };
    }
  }
  function loadState(initial) {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return { items: JSON.parse(JSON.stringify(initial.items)) };
      const parsed = JSON.parse(stored);
      // Merge: keep any new items from source; overlay stored state on matching ids
      const merged = initial.items.map(i => {
        const local = parsed.items ? parsed.items.find(x => x.id === i.id) : null;
        return local ? Object.assign({}, i, local) : Object.assign({}, i);
      });
      // Also include any locally-added items not yet in source
      if (parsed.items) {
        parsed.items.forEach(local => {
          if (!merged.find(m => m.id === local.id)) merged.push(local);
        });
      }
      return { items: merged };
    } catch (e) {
      console.warn('cb-meeting-dashboard: could not load stored state', e);
      return { items: JSON.parse(JSON.stringify(initial.items)) };
    }
  }
  function saveState(state) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
    catch (e) { console.warn('cb-meeting-dashboard: could not save state', e); }
  }

  // ------------ Helpers ------------
  const OWNERS = ['Aidan', 'Manasa', 'Jasmine', 'Team'];
  const STATUSES = [
    { key: 'open',        label: 'Open' },
    { key: 'in-progress', label: 'In Progress' },
    { key: 'done',        label: 'Done' },
  ];

  function ownerClass(owner) {
    const lower = (owner || 'team').toLowerCase();
    if (['aidan', 'manasa', 'jasmine'].includes(lower)) return lower;
    return 'team';
  }
  function todayISO() {
    const d = new Date();
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0')
                          + '-' + String(d.getDate()).padStart(2, '0');
  }
  function nowStamp() {
    const d = new Date();
    return d.toISOString().slice(0, 16).replace('T', ' ');
  }
  function daysUntil(dateStr) {
    if (!dateStr) return null;
    const now = new Date(); now.setHours(0, 0, 0, 0);
    const due = new Date(dateStr); due.setHours(0, 0, 0, 0);
    return Math.round((due - now) / 86400000);
  }
  function slugify(text) {
    return String(text || '').toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
      .slice(0, 40);
  }

  // ------------ UI state ------------
  const ui = {
    filterOwner: 'all',
    filterMeeting: 'all',
    filterSpecial: null, // 'overdue' | null
    searchText: '',
  };

  let initial, state;

  // ------------ Render ------------
  function render() {
    const items = state.items;
    const filtered = filterItems(items);
    renderProgress(items);
    renderKanban(filtered);
    renderMeetingChips(initial.meetings || []);
  }

  function filterItems(items) {
    return items.filter(it => {
      if (ui.filterOwner !== 'all' && ownerClass(it.owner) !== ui.filterOwner) return false;
      if (ui.filterMeeting !== 'all' && it.meeting !== ui.filterMeeting) return false;
      if (ui.filterSpecial === 'overdue') {
        const d = daysUntil(it.due);
        if (it.status === 'done') return false;
        if (d === null || d >= 0) return false;
      }
      if (ui.searchText) {
        const q = ui.searchText.toLowerCase();
        const hay = (it.text + ' ' + (it.owner || '') + ' ' + (it.meeting || '')).toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }

  function renderProgress(items) {
    const target = document.getElementById('cb-progress');
    if (!target) return;
    const groups = OWNERS.map(owner => {
      const mine = items.filter(i => ownerClass(i.owner) === owner.toLowerCase());
      const done = mine.filter(i => i.status === 'done').length;
      const pct = mine.length === 0 ? 0 : Math.round(100 * done / mine.length);
      return { owner, total: mine.length, done, pct };
    });
    const totalDone = items.filter(i => i.status === 'done').length;
    const totalPct = items.length === 0 ? 0 : Math.round(100 * totalDone / items.length);

    const html = `
      <div class="cb-progress__item">
        <div class="cb-progress__header">
          <span class="cb-progress__owner">
            <span class="cb-progress__dot" style="background:var(--md-primary-fg-color)"></span>
            Overall
          </span>
          <span>${totalDone} / ${items.length} · ${totalPct}%</span>
        </div>
        <div class="cb-progress__bar-track">
          <div class="cb-progress__bar-fill" style="width:${totalPct}%"></div>
        </div>
      </div>
      ${groups.map(g => `
        <div class="cb-progress__item">
          <div class="cb-progress__header">
            <span class="cb-progress__owner">
              <span class="cb-progress__dot" style="background:var(--cb-owner-${g.owner.toLowerCase()})"></span>
              ${g.owner}
            </span>
            <span>${g.done} / ${g.total} · ${g.pct}%</span>
          </div>
          <div class="cb-progress__bar-track">
            <div class="cb-progress__bar-fill"
                 style="width:${g.pct}%; background: var(--cb-owner-${g.owner.toLowerCase()})"></div>
          </div>
        </div>
      `).join('')}
    `;
    target.innerHTML = html;
  }

  function renderMeetingChips(meetings) {
    const wrap = document.getElementById('cb-meeting-chips');
    if (!wrap) return;
    const counts = state.items.reduce((acc, it) => {
      acc[it.meeting] = (acc[it.meeting] || 0) + 1; return acc;
    }, {});
    const chips = [{ id: 'all', label: 'All meetings', count: state.items.length }]
      .concat(meetings.map(m => ({
        id: m.date,
        label: m.date + ' · ' + m.title,
        count: counts[m.date] || 0,
      })));
    wrap.innerHTML = chips.map(c => `
      <button class="cb-chip ${ui.filterMeeting === c.id ? 'cb-chip--active' : ''}"
              data-meeting="${c.id}">
        ${c.label}
        <span class="cb-chip__count">${c.count}</span>
      </button>
    `).join('');
    wrap.querySelectorAll('[data-meeting]').forEach(el => {
      el.addEventListener('click', () => {
        ui.filterMeeting = el.getAttribute('data-meeting'); render();
      });
    });
  }

  function renderKanban(items) {
    const target = document.getElementById('cb-kanban');
    if (!target) return;

    target.innerHTML = STATUSES.map(status => {
      const cards = items.filter(i => (i.status || 'open') === status.key);
      return `
        <div class="cb-column cb-column--${status.key}">
          <div class="cb-column__header">
            <span class="cb-column__title">
              <span class="cb-column__title-dot"></span>
              ${status.label}
            </span>
            <span class="cb-column__count">${cards.length}</span>
          </div>
          ${cards.length === 0
            ? `<div class="cb-column__empty">Nothing here.</div>`
            : cards.map(cardHtml).join('')
          }
        </div>
      `;
    }).join('');

    // wire clicks
    target.querySelectorAll('[data-card-id]').forEach(el => {
      el.addEventListener('click', () => openModal(el.getAttribute('data-card-id')));
    });
  }

  function cardHtml(item) {
    const cls = ownerClass(item.owner);
    const d = daysUntil(item.due);
    const overdue = item.status !== 'done' && d !== null && d < 0;
    const soon = item.status !== 'done' && d !== null && d >= 0 && d <= 3;
    const dueBadgeCls = overdue ? 'cb-card__due-badge--overdue'
                      : soon ? 'cb-card__due-badge--soon' : '';
    const dueLabel = item.due
      ? (overdue ? Math.abs(d) + 'd overdue'
        : d === 0 ? 'due today'
        : d === 1 ? 'due tomorrow'
        : d > 0 ? 'due in ' + d + 'd'
        : item.due)
      : 'no due date';
    const notesCount = (item.notes || []).length;
    return `
      <div class="cb-card cb-card--${cls} ${overdue ? 'cb-card--overdue' : ''} ${item.status === 'done' ? 'cb-card--done' : ''}"
           data-card-id="${escapeAttr(item.id)}">
        <div class="cb-card__row-top">
          <span class="cb-badge cb-badge--${cls}">${escapeHtml(item.owner || 'Team')}</span>
          ${item.meeting ? `<span style="font-size:.7rem;opacity:.6;">${escapeHtml(item.meeting)}</span>` : ''}
        </div>
        <div class="cb-card__text">${escapeHtml(item.text)}</div>
        <div class="cb-card__meta">
          <span class="cb-card__due-badge ${dueBadgeCls}">${escapeHtml(dueLabel)}</span>
          ${notesCount > 0 ? `<span class="cb-card__note-count">💬 ${notesCount}</span>` : ''}
        </div>
      </div>
    `;
  }

  // ------------ Modal ------------
  function openModal(id) {
    const item = state.items.find(i => i.id === id);
    if (!item) return;
    const cls = ownerClass(item.owner);
    const notes = item.notes || [];

    const backdrop = document.createElement('div');
    backdrop.className = 'cb-modal-backdrop';
    backdrop.innerHTML = `
      <div class="cb-modal" role="dialog" aria-modal="true">
        <div class="cb-modal__header">
          <h3 class="cb-modal__title">Action item</h3>
          <button class="cb-modal__close" data-modal-close aria-label="Close">×</button>
        </div>
        <div class="cb-modal__body">
          <div class="cb-modal__section">
            <div class="cb-modal__label">Task</div>
            <div class="cb-modal__text">${escapeHtml(item.text)}</div>
          </div>
          <div class="cb-modal__section" style="display:flex; gap:1rem; flex-wrap:wrap;">
            <div style="flex:1;">
              <div class="cb-modal__label">Owner</div>
              <div><span class="cb-badge cb-badge--${cls}">${escapeHtml(item.owner || 'Team')}</span></div>
            </div>
            <div style="flex:1;">
              <div class="cb-modal__label">Meeting</div>
              <div class="cb-modal__text" style="padding:.3rem .6rem; background:transparent;">
                ${escapeHtml(item.meeting || '—')}
              </div>
            </div>
            <div style="flex:1;">
              <div class="cb-modal__label">Due</div>
              <div class="cb-modal__text" style="padding:.3rem .6rem; background:transparent;">
                ${escapeHtml(item.due || 'no due date')}
              </div>
            </div>
          </div>
          <div class="cb-modal__section">
            <div class="cb-modal__label">Status</div>
            <div class="cb-status-picker" data-status-picker>
              ${STATUSES.map(s => `
                <button class="cb-status-picker__btn ${item.status === s.key ? 'cb-status-picker__btn--active-' + s.key : ''}"
                        data-status="${s.key}">
                  ${s.label}
                </button>
              `).join('')}
            </div>
            ${item.completed_at ? `<div style="font-size:.75rem; opacity:.6; margin-top:.4rem;">
              Completed: ${escapeHtml(item.completed_at)}
            </div>` : ''}
          </div>
          <div class="cb-modal__section">
            <div class="cb-modal__label">Notes (${notes.length})</div>
            ${notes.length === 0
              ? `<div class="cb-notes-empty">No notes yet.</div>`
              : `<ul class="cb-notes-list">${notes.map(n => `
                    <li class="cb-note">
                      <div class="cb-note__meta">${escapeHtml(n.at)} — ${escapeHtml(n.by || 'anon')}</div>
                      <div class="cb-note__body">${escapeHtml(n.body)}</div>
                    </li>`).join('')}
                </ul>`}
            <div class="cb-add-note">
              <textarea class="cb-add-note__input" placeholder="Add a progress note..." data-note-input></textarea>
            </div>
            <div style="display:flex; gap:.5rem; justify-content:flex-end; margin-top:.5rem;">
              <input class="cb-add-note__input" style="min-height:auto; max-width:130px;"
                     placeholder="Your name" data-note-author>
              <button class="cb-btn" data-add-note>Add note</button>
            </div>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(backdrop);

    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) closeModal(backdrop);
    });
    backdrop.querySelector('[data-modal-close]').addEventListener('click', () => closeModal(backdrop));

    // status picker
    backdrop.querySelectorAll('[data-status]').forEach(btn => {
      btn.addEventListener('click', () => {
        const newStatus = btn.getAttribute('data-status');
        item.status = newStatus;
        if (newStatus === 'done' && !item.completed_at) item.completed_at = nowStamp();
        if (newStatus !== 'done') item.completed_at = null;
        saveState({ items: state.items });
        toast('Status → ' + STATUSES.find(s => s.key === newStatus).label);
        closeModal(backdrop);
        render();
      });
    });

    // add note
    backdrop.querySelector('[data-add-note]').addEventListener('click', () => {
      const noteEl = backdrop.querySelector('[data-note-input]');
      const authEl = backdrop.querySelector('[data-note-author]');
      const body = (noteEl.value || '').trim();
      const by = (authEl.value || 'anon').trim();
      if (!body) return;
      const nAuthorStore = 'cb-last-author';
      try { localStorage.setItem(nAuthorStore, by); } catch (e) {}
      item.notes = item.notes || [];
      item.notes.push({ at: nowStamp(), by: by, body: body });
      saveState({ items: state.items });
      toast('Note added');
      closeModal(backdrop);
      openModal(id); // reopen to show new note
      render();
    });

    // prefill author from last-used
    try {
      const last = localStorage.getItem('cb-last-author');
      if (last) backdrop.querySelector('[data-note-author]').value = last;
    } catch (e) {}
  }
  function closeModal(el) { if (el && el.parentNode) el.parentNode.removeChild(el); }

  // ------------ Export / Import ------------
  function exportJson() {
    const ta = document.getElementById('cb-export-textarea');
    if (!ta) return;
    ta.value = JSON.stringify(
      { meetings: initial.meetings || [], items: state.items },
      null, 2
    );
    ta.classList.remove('cb-hidden');
    ta.focus(); ta.select();
    toast('JSON copied — paste into meeting_notes/index.md');
  }
  function resetLocal() {
    if (!confirm('Discard your local edits and reload from the source markdown?')) return;
    localStorage.removeItem(STORAGE_KEY);
    state = { items: JSON.parse(JSON.stringify(initial.items)) };
    render();
    toast('Local changes discarded');
  }
  function addItemInline() {
    const text = prompt('New action item text:');
    if (!text) return;
    const owner = prompt('Owner (Aidan / Manasa / Jasmine / Team):', 'Team');
    const due = prompt('Due date (YYYY-MM-DD, or blank):', '');
    const meeting = prompt('Meeting date (YYYY-MM-DD, or blank):', todayISO());
    const id = slugify(owner + '-' + text) + '-' + Math.random().toString(36).slice(2, 6);
    state.items.push({
      id: id, text: text, owner: owner || 'Team',
      due: due || null, meeting: meeting || null,
      status: 'open', notes: [], completed_at: null,
    });
    saveState({ items: state.items });
    toast('Added new item');
    render();
  }

  // ------------ Toast ------------
  let toastEl = null;
  function toast(msg) {
    if (toastEl && toastEl.parentNode) toastEl.parentNode.removeChild(toastEl);
    toastEl = document.createElement('div');
    toastEl.className = 'cb-toast';
    toastEl.textContent = msg;
    document.body.appendChild(toastEl);
    setTimeout(() => { if (toastEl && toastEl.parentNode) toastEl.parentNode.removeChild(toastEl); }, 2600);
  }

  // ------------ Escapes ------------
  function escapeHtml(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#039;');
  }
  function escapeAttr(s) { return escapeHtml(s); }

  // ------------ Wiring ------------
  function attachOwnerFilters() {
    const wrap = document.getElementById('cb-owner-chips');
    if (!wrap) return;
    const counts = state.items.reduce((acc, it) => {
      const o = ownerClass(it.owner);
      acc[o] = (acc[o] || 0) + 1;
      return acc;
    }, {});
    const chips = [{ id: 'all', label: 'All owners' }]
      .concat(OWNERS.map(o => ({ id: o.toLowerCase(), label: o })));
    wrap.innerHTML = chips.map(c => `
      <button class="cb-chip ${ui.filterOwner === c.id ? 'cb-chip--active' : ''}"
              data-owner="${c.id}">
        ${c.label}
        <span class="cb-chip__count">${c.id === 'all' ? state.items.length : (counts[c.id] || 0)}</span>
      </button>
    `).join('');
    wrap.querySelectorAll('[data-owner]').forEach(el => {
      el.addEventListener('click', () => {
        ui.filterOwner = el.getAttribute('data-owner'); render(); attachOwnerFilters();
      });
    });
  }

  function attachSpecialFilter() {
    const overdueBtn = document.getElementById('cb-filter-overdue');
    if (!overdueBtn) return;
    const overdueCount = state.items.filter(it => {
      const d = daysUntil(it.due);
      return it.status !== 'done' && d !== null && d < 0;
    }).length;
    overdueBtn.innerHTML = `⚠ Overdue only <span class="cb-chip__count">${overdueCount}</span>`;
    overdueBtn.classList.toggle('cb-chip--active', ui.filterSpecial === 'overdue');
    overdueBtn.onclick = () => {
      ui.filterSpecial = ui.filterSpecial === 'overdue' ? null : 'overdue';
      render(); attachSpecialFilter();
    };
  }

  function init() {
    initial = loadInitial();
    state = loadState(initial);

    // Wire toolbar buttons
    const searchEl = document.getElementById('cb-search');
    if (searchEl) searchEl.addEventListener('input', (e) => {
      ui.searchText = e.target.value; render();
    });
    const exportBtn = document.getElementById('cb-btn-export');
    if (exportBtn) exportBtn.addEventListener('click', exportJson);
    const resetBtn = document.getElementById('cb-btn-reset');
    if (resetBtn) resetBtn.addEventListener('click', resetLocal);
    const addBtn = document.getElementById('cb-btn-add');
    if (addBtn) addBtn.addEventListener('click', addItemInline);

    attachOwnerFilters();
    attachSpecialFilter();
    render();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
