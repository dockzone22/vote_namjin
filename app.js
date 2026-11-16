'use strict';
const data = window.SITE_DATA || {};
const escapeHTML = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const setHTML = (id, html) => {
  const el = document.getElementById(id);
  if (el) el.innerHTML = html;
};
const safeUrl = value => {
  if (!value) return '';
  try {
    const url = new URL(value, location.href);
    return ['http:', 'https:', 'file:'].includes(url.protocol) ? url.href : '';
  } catch {
    return '';
  }
};

const isStatementPage = document.body.classList.contains('page-statement') || location.pathname.endsWith('statement.html');

// 1. 내비게이션 주 메뉴 렌더링
if (data.menu && document.getElementById('menu')) {
  const menuHtml = `<ul>${data.menu.map(item => {
    let href = '';
    let isCurrent = false;

    if (item.url) {
      href = item.url;
      if (isStatementPage && (item.url.includes('statement.html') || item.id === 'statement')) {
        isCurrent = true;
      }
    } else {
      href = isStatementPage ? `./index.html#${escapeHTML(item.id)}` : `#${escapeHTML(item.id)}`;
    }

    const activeClass = isCurrent ? ' class="active"' : '';
    const currentAttr = isCurrent ? ' aria-current="page"' : '';
    return `<li><a href="${escapeHTML(href)}"${activeClass}${currentAttr}>${escapeHTML(item.label)}</a></li>`;
  }).join('')}</ul>`;
  setHTML('menu', menuHtml);
}

// 2. 메인 페이지 전용 렌더링
if (!isStatementPage) {
  // (1) 대표 영상 슬롯 처리
  if (data.heroVideo && data.heroVideo.src) {
    const vUrl = safeUrl(data.heroVideo.src);
    if (vUrl) {
      const slot = document.getElementById('hero-video-slot');
      if (slot) {
        const video = document.createElement('video');
        video.src = vUrl;
        if (data.heroVideo.poster) video.poster = safeUrl(data.heroVideo.poster);
        video.playsInline = true;
        video.controls = true;
        video.muted = true;
        video.loop = true;
        video.className = 'hero-video-element';
        video.setAttribute('aria-label', data.heroVideo.title || '남진 총장 후보 대표 영상');
        
        const prefersReduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (!prefersReduced) {
          video.autoplay = true;
        }
        slot.replaceWith(video);
      }
    }
  }

  // (2) 왜 남진인가? 3개 분야
  if (Array.isArray(data.why) && document.getElementById('why-branches')) {
    setHTML('why-branches', data.why.map(item => `
      <article class="branch-card" id="why-${escapeHTML(item.id)}">
        <div class="branch-header">
          <h3>${escapeHTML(item.title)}</h3>
        </div>
        <div class="branch-body">
          <p>${escapeHTML(item.description)}</p>
        </div>
      </article>
    `).join(''));
  }

  // (3) 걸어온 길 (경력 목록)
  if (Array.isArray(data.journey) && document.getElementById('journey-list')) {
    setHTML('journey-list', data.journey.map(item => `
      <article class="journey-item">
        <div class="journey-period">${escapeHTML(item.period)}</div>
        <div class="journey-content">
          <h3 class="journey-title">${escapeHTML(item.title)}</h3>
          <p class="journey-desc">${escapeHTML(item.description)}</p>
        </div>
      </article>
    `).join(''));
  }

  // (4) 7대 대표공약 (정확히 7개)
  if (Array.isArray(data.pledges7) && document.getElementById('pledges-grid')) {
    setHTML('pledges-grid', data.pledges7.map(item => `
      <article class="pledge-card7">
        <span class="pledge-num">${escapeHTML(item.no)}</span>
        <h3 class="pledge-title">${escapeHTML(item.title)}</h3>
        <p class="pledge-summary">${escapeHTML(item.summary)}</p>
      </article>
    `).join(''));
  }

  // (5) 캠퍼스 환경개선 영상
  if (data.campusVideo) {
    if (data.campusVideo.intro && document.getElementById('campus-intro-text')) {
      document.getElementById('campus-intro-text').textContent = data.campusVideo.intro;
    }
    if (data.campusVideo.src) {
      const cvUrl = safeUrl(data.campusVideo.src);
      if (cvUrl) {
        const cslot = document.getElementById('campus-video-slot');
        if (cslot) {
          const cvideo = document.createElement('video');
          cvideo.src = cvUrl;
          if (data.campusVideo.poster) cvvideo.poster = safeUrl(data.campusVideo.poster);
          cvideo.playsInline = true;
          cvideo.controls = true;
          cvideo.className = 'campus-video-element';
          cvideo.setAttribute('aria-label', data.campusVideo.title || '캠퍼스 환경개선 영상');
          cslot.replaceWith(cvideo);
        }
      }
    }
  }

  // (6) 공약 카드뉴스 (자료 등록 시 전환)
  if (Array.isArray(data.cardNews) && data.cardNews.length > 0 && document.getElementById('cardnews-container')) {
    setHTML('cardnews-container', `
      <div class="cardnews-grid">
        ${data.cardNews.map(item => `
          <div class="cardnews-item">
            <img src="${safeUrl(item.src)}" alt="${escapeHTML(item.alt || '공약 카드뉴스')}" loading="lazy">
          </div>
        `).join('')}
      </div>
    `);
  }

  // (7) 파일 받기
  if (Array.isArray(data.downloads) && document.getElementById('download-list')) {
    setHTML('download-list', data.downloads.map(item => {
      const url = safeUrl(item.url);
      return `
        <article class="download-row">
          <span class="file-icon" aria-hidden="true">↓</span>
          <div class="file-info">
            <h3>${escapeHTML(item.title)}</h3>
            <p>${escapeHTML(item.format)} · ${escapeHTML(item.size)}</p>
          </div>
          ${url
            ? `<a href="${escapeHTML(url)}" download aria-label="${escapeHTML(item.title)} 다운로드">다운로드 ↓</a>`
            : '<button type="button" disabled>준비 중</button>'
          }
        </article>
      `;
    }).join(''));
  }

  // (8) 아카이브 (57건)
  if (Array.isArray(data.archive) && document.getElementById('archive-list')) {
    let isArchiveExpanded = false;
    const renderArchive = () => {
      setHTML('archive-list', data.archive.map((item, i) => {
        const isHidden = !isArchiveExpanded && i >= 3;
        const url = safeUrl(item.url);
        return `
          <article class="archive-card${isHidden ? ' hidden' : ''}">
            <div class="archive-card-top">
              <div class="archive-meta">
                <time class="archive-date">${escapeHTML(item.date)}</time>
                ${item.category ? `<span class="archive-category">${escapeHTML(item.category)}</span>` : ''}
              </div>
              <h3 class="archive-title">${escapeHTML(item.title)}</h3>
            </div>
            <div class="archive-divider" aria-hidden="true"></div>
            <div class="archive-body">
              <p class="archive-keywords">${escapeHTML(item.keywords)}</p>
              <p class="archive-media">${escapeHTML(item.media)}</p>
            </div>
            <div class="archive-footer">
              ${url ? `<a href="${escapeHTML(url)}" target="_blank" rel="noopener noreferrer" class="archive-link" aria-label="${escapeHTML(item.title)} 원문 보기 (새 창)">원문 보기 →</a>` : ''}
            </div>
          </article>
        `;
      }).join(''));
    };
    renderArchive();

    const toggleBtn = document.getElementById('archive-toggle-btn');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        isArchiveExpanded = !isArchiveExpanded;
        renderArchive();
        toggleBtn.setAttribute('aria-expanded', String(isArchiveExpanded));
        toggleBtn.innerHTML = isArchiveExpanded
          ? '아카이브 접기 <span class="arrow">↑</span>'
          : `모두 보기 (총 ${data.archive.length}건) <span class="arrow">↓</span>`;
        if (!isArchiveExpanded) {
          const target = document.getElementById('archive');
          if (target) target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }
  }
}

// 3. 드로어 메뉴 & 접근성 공통 처리
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
  if (!drawer || !openButton || !backdrop) return;
  opened = state && mobile.matches;
  drawer.classList.toggle('open', opened);
  backdrop.hidden = !opened;
  openButton.setAttribute('aria-expanded', String(opened));
  document.body.classList.toggle('menu-open', opened);
  if (main) main.inert = opened;
  if (mobileHeader) mobileHeader.inert = opened;
  if (topButton) topButton.inert = opened;
  
  if (opened) {
    drawer.setAttribute('role', 'dialog');
    drawer.setAttribute('aria-modal', 'true');
    drawer.inert = false;
    if (closeButton) closeButton.focus();
  } else {
    drawer.removeAttribute('role');
    drawer.removeAttribute('aria-modal');
    drawer.inert = mobile.matches;
    if (restore && mobile.matches) openButton.focus();
  }
}

if (openButton) openButton.addEventListener('click', () => setDrawer(true));
if (closeButton) closeButton.addEventListener('click', () => setDrawer(false));
if (backdrop) backdrop.addEventListener('click', () => setDrawer(false));

document.addEventListener('keydown', event => {
  if (!opened) return;
  if (event.key === 'Escape') {
    event.preventDefault();
    setDrawer(false);
  }
  if (event.key === 'Tab' && drawer) {
    const focusable = [...drawer.querySelectorAll('a, button')].filter(el => el.getClientRects().length);
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }
});

if (drawer) {
  drawer.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (opened) setDrawer(false);
    });
  });
}

mobile.addEventListener('change', () => {
  if (!drawer) return;
  const focused = drawer.contains(document.activeElement);
  setDrawer(false, false);
  if (mobile.matches && focused && openButton) openButton.focus();
});
setDrawer(false, false);

// 4. 스크롤 감지 (ScrollSpy) & 맨 위로 가기 버튼
if (!isStatementPage && drawer) {
  const links = [...drawer.querySelectorAll('nav a[href^="#"]')];
  const sectionIds = ['home', 'why', 'journey', 'pledges', 'campus', 'cardnews', 'downloads', 'archive'];
  const sections = sectionIds.map(id => document.getElementById(id)).filter(Boolean);
  let scheduled = false;

  function updateScroll() {
    scheduled = false;
    const threshold = mobile.matches ? 120 : 90;
    let active = sections[0]?.id || 'home';

    for (const section of sections) {
      if (section.getBoundingClientRect().top <= threshold) {
        active = section.id;
      }
    }

    if (innerHeight + scrollY >= document.documentElement.scrollHeight - 6) {
      active = 'archive';
    }

    for (const link of links) {
      const id = link.hash.slice(1);
      const selected = (id === active);
      link.classList.toggle('active', selected);
      if (selected) {
        link.setAttribute('aria-current', 'location');
      } else {
        link.removeAttribute('aria-current');
      }
    }

    if (topButton) {
      topButton.hidden = scrollY < 400;
    }
  }

  function scheduleUpdate() {
    if (!scheduled) {
      scheduled = true;
      requestAnimationFrame(updateScroll);
    }
  }

  addEventListener('scroll', scheduleUpdate, { passive: true });
  addEventListener('resize', scheduleUpdate);
  addEventListener('load', updateScroll);
  updateScroll();
} else if (topButton) {
  addEventListener('scroll', () => {
    topButton.hidden = scrollY < 400;
  }, { passive: true });
}
