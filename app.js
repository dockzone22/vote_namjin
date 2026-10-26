'use strict';
const data = window.SITE_DATA;
const escapeHTML = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const number = i => String(i + 1).padStart(2, '0');
const setHTML = (id, html) => { document.getElementById(id).innerHTML = html; };
const safeUrl = value => {
  if (!value) return '';
  try { const url = new URL(value, location.href); return ['http:', 'https:', 'file:'].includes(url.protocol) ? url.href : ''; } catch { return ''; }
};
setHTML('menu', `<ul>${data.menu.map(item => `<li><a href="#${escapeHTML(item.id)}">${escapeHTML(item.label)}</a>${item.children ? `<ul>${item.children.map(child => `<li><a href="#${escapeHTML(child.id)}">${escapeHTML(child.label)}</a></li>`).join('')}</ul>` : ''}</li>`).join('')}</ul>`);
setHTML('priority-list', data.priorities.map((item, i) => `<article class="priority"><span class="large-number">${number(i)}</span><h3>${escapeHTML(item.title)}</h3><p>${escapeHTML(item.description)}</p></article>`).join(''));
setHTML('pledge-list', data.pledges.map((group, i) => `<section class="audience" id="${escapeHTML(group.id)}" aria-labelledby="${escapeHTML(group.id)}-title"><div class="audience-heading"><span>${number(i)}</span><h3 id="${escapeHTML(group.id)}-title">${escapeHTML(group.label)}${group.id === 'faculty' ? '를' : '을'} 위한 공약</h3></div><div class="pledge-grid">${group.items.map((item, j) => `<article class="pledge-card"><span>${number(j)}</span><h4>${escapeHTML(item.title)}</h4><p>${escapeHTML(item.description)}</p></article>`).join('')}</div></section>`).join(''));
setHTML('roadmap-list', data.roadmap.map(item => `<article class="milestone"><span>${escapeHTML(item.year)}</span><h3>${escapeHTML(item.title)}</h3><p>${escapeHTML(item.description)}</p></article>`).join(''));
setHTML('achievement-list', data.achievements.map((item, i) => `<article class="achievement-row"><span>${number(i)}</span><div><h3>${escapeHTML(item.title)}</h3><p>${escapeHTML(item.description)}</p></div><time>${escapeHTML(item.period)}</time></article>`).join(''));
setHTML('download-list', data.downloads.map(item => { const url = safeUrl(item.url); return `<article class="download-row"><span class="file-icon" aria-hidden="true">↓</span><div class="file-info"><h3>${escapeHTML(item.title)}</h3><p>${escapeHTML(item.format)} · ${escapeHTML(item.size)}</p></div>${url ? `<a href="${escapeHTML(url)}" download aria-label="${escapeHTML(item.title)} 다운로드">다운로드 ↓</a>` : '<button type="button" disabled>준비 중</button>'}</article>`; }).join(''));
if (data.interview.embedUrl) {
  const url = safeUrl(data.interview.embedUrl);
  if (url && new URL(url).protocol === 'https:') {
    const slot = document.getElementById('video-slot');
    const frame = document.createElement('iframe'); frame.src = url; frame.title = data.interview.title; frame.loading = 'lazy'; frame.allowFullscreen = true;
    slot.replaceWith(frame); document.querySelector('.video-copy .status').remove(); document.querySelector('.video-copy .muted').remove();
  }
}
const drawer = document.getElementById('navigation');
const openButton = document.getElementById('menu-open');
const closeButton = document.getElementById('menu-close');
const backdrop = document.getElementById('backdrop');
const main = document.querySelector('main');
const mobileHeader = document.querySelector('.mobile-header');
const topButton = document.getElementById('back-top');
const mobile = matchMedia('(max-width: 1024px)');
let opened = false;
function setDrawer(state, restore = true) {
  opened = state && mobile.matches;
  drawer.classList.toggle('open', opened); backdrop.hidden = !opened;
  openButton.setAttribute('aria-expanded', String(opened));
  document.body.classList.toggle('menu-open', opened);
  main.inert = opened; mobileHeader.inert = opened;
  topButton.inert = opened;
  if (opened) {
    drawer.setAttribute('role', 'dialog'); drawer.setAttribute('aria-modal', 'true'); drawer.inert = false; closeButton.focus();
  } else {
    drawer.removeAttribute('role'); drawer.removeAttribute('aria-modal'); drawer.inert = mobile.matches;
    if (restore && mobile.matches) openButton.focus();
  }
}
openButton.addEventListener('click', () => setDrawer(true));
closeButton.addEventListener('click', () => setDrawer(false));
backdrop.addEventListener('click', () => setDrawer(false));
document.addEventListener('keydown', event => {
  if (!opened) return;
  if (event.key === 'Escape') { event.preventDefault(); setDrawer(false); }
  if (event.key === 'Tab') {
    const focusable = [...drawer.querySelectorAll('a,button')].filter(el => el.getClientRects().length);
    const first = focusable[0], last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  }
});
drawer.querySelectorAll('a').forEach(link => link.addEventListener('click', () => { if (opened) setDrawer(false); }));
mobile.addEventListener('change', () => { const focused = drawer.contains(document.activeElement); setDrawer(false, false); if (mobile.matches && focused) openButton.focus(); });
setDrawer(false, false);
const links = [...drawer.querySelectorAll('a[href^="#"]')];
const sections = ['home', ...data.menu.flatMap(item => [item.id, ...(item.children || []).map(child => child.id)])].map(id => document.getElementById(id)).filter(Boolean);
let scheduled = false;
function updateScroll() {
  scheduled = false;
  const threshold = mobile.matches ? 120 : 85;
  let active = sections[0].id;
  for (const section of sections) if (section.getBoundingClientRect().top <= threshold) active = section.id;
  if (innerHeight + scrollY >= document.documentElement.scrollHeight - 4) active = 'downloads';
  for (const link of links) {
    const id = link.hash.slice(1), selected = id === active;
    link.classList.toggle('active', selected);
    link.classList.toggle('parent-active', id === 'pledges' && data.pledges.some(group => group.id === active));
    if (selected) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current');
  }
  topButton.hidden = scrollY < 400;
}
function scheduleUpdate() { if (!scheduled) { scheduled = true; requestAnimationFrame(updateScroll); } }
addEventListener('scroll', scheduleUpdate, { passive: true });
addEventListener('resize', scheduleUpdate);
addEventListener('load', updateScroll);
updateScroll();
