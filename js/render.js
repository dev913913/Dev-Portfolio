function el(tag, opts = {}) {
  const e = document.createElement(tag);
  if (opts.text) e.textContent = opts.text;
  if (opts.html) e.innerHTML = opts.html;
  if (opts.class) e.className = opts.class;
  if (opts.attrs) Object.entries(opts.attrs).forEach(([k, v]) => e.setAttribute(k, v));
  return e;
}

function safeHide(imgEl) {
  imgEl.addEventListener('error', () => { imgEl.style.display = 'none'; });
}

async function render() {
  const data = await loadContent();
  if (!data) return;

  document.title = data.site?.title || 'Portfolio';

  // Profile
  const p = data.profile || {};
  document.getElementById('profile-name').textContent = p.name || '';
  document.getElementById('profile-tagline').textContent = p.tagline || '';
  document.getElementById('profile-bio').textContent = p.bio || '';
  const photo = document.getElementById('profile-photo');
  if (p.photo) { photo.src = p.photo; safeHide(photo); }

  const socialsWrap = document.getElementById('profile-socials');
  (p.socials || []).forEach(s => {
    if (!s.url) return;
    const a = el('a', { text: s.label, attrs: { href: s.url, target: '_blank', rel: 'noopener' } });
    socialsWrap.appendChild(a);
  });

  // Teaching
  const t = data.teaching || {};
  document.getElementById('teach-heading').textContent = t.heading || 'Teaches';
  document.getElementById('teach-note').textContent = t.note || '';

  const subjWrap = document.getElementById('teach-subjects');
  (t.subjects || []).forEach(s => subjWrap.appendChild(el('span', { text: s })));

  const teachContentWrap = document.getElementById('teach-content');
  (t.content || []).forEach(item => {
    const card = el('div', { class: 'card', attrs: { 'data-type': item.type || '' } });
    card.appendChild(el('h3', { text: item.title }));
    card.appendChild(el('p', { text: item.description }));
    if (item.link) {
      card.appendChild(el('a', { text: 'Visit →', class: 'card-link', attrs: { href: item.link, target: '_blank', rel: 'noopener' } }));
    }
    teachContentWrap.appendChild(card);
  });

  const adminWrap = document.getElementById('teach-admin');
  (t.administrative || []).forEach(line => adminWrap.appendChild(el('li', { text: line })));

  // Building
  const b = data.building || {};
  document.getElementById('build-heading').textContent = b.heading || 'Builds';
  document.getElementById('build-note').textContent = b.note || '';

  const projWrap = document.getElementById('build-projects');
  (b.projects || []).forEach(proj => {
    const card = el('div', { class: 'project-card' });
    const bar = el('div', { class: 'term-bar' });
    bar.appendChild(el('span')); bar.appendChild(el('span')); bar.appendChild(el('span'));
    card.appendChild(bar);

    if (proj.image) {
      const img = el('img', { attrs: { src: proj.image, alt: proj.name || '' } });
      safeHide(img);
      card.appendChild(img);
    }

    const body = el('div', { class: 'term-body' });
    body.appendChild(el('h3', { text: proj.name }));
    body.appendChild(el('p', { text: proj.description }));

    if (proj.tech && proj.tech.length) {
      const tags = el('div', { class: 'tech-tags' });
      proj.tech.forEach(tag => tags.appendChild(el('span', { text: tag })));
      body.appendChild(tags);
    }

    if (proj.link) {
      body.appendChild(el('a', { text: 'View live →', class: 'card-link', attrs: { href: proj.link, target: '_blank', rel: 'noopener' } }));
    }

    card.appendChild(body);
    projWrap.appendChild(card);
  });

  const skillsWrap = document.getElementById('build-skills');
  Object.entries(b.skills || {}).forEach(([group, items]) => {
    const g = el('div', { class: 'skill-group' });
    g.appendChild(el('h4', { text: group }));
    g.appendChild(el('p', { text: items.join(' · ') }));
    skillsWrap.appendChild(g);
  });

  // Certificates
  const c = data.certificates || {};
  document.getElementById('certs-heading').textContent = c.heading || 'Credentials';
  document.getElementById('certs-note').textContent = c.note || '';

  const certGrid = document.getElementById('certs-grid');
  (c.items || []).forEach(cert => {
    const card = el('div', { class: 'cert-card' });
    if (cert.image) {
      const img = el('img', { attrs: { src: cert.image, alt: cert.title || '' } });
      safeHide(img);
      card.appendChild(img);
    }
    const info = el('div', { class: 'cert-info' });
    info.appendChild(el('h4', { text: cert.title }));
    info.appendChild(el('p', { text: [cert.issuer, cert.date].filter(Boolean).join(' — ') }));
    card.appendChild(info);
    certGrid.appendChild(card);
  });

  // Writing
  const w = data.writing || {};
  document.getElementById('writing-heading').textContent = w.heading || 'Writing';
  document.getElementById('writing-note').textContent = w.note || '';

  const writingWrap = document.getElementById('writing-items');
  (w.items || []).forEach(item => {
    const card = el('div', { class: 'card', attrs: { 'data-type': 'writing' } });
    card.appendChild(el('h3', { text: item.title }));
    card.appendChild(el('p', { text: item.description }));
    if (item.link) {
      card.appendChild(el('a', { text: 'Read →', class: 'card-link', attrs: { href: item.link, target: '_blank', rel: 'noopener' } }));
    }
    writingWrap.appendChild(card);
  });
}

document.addEventListener('DOMContentLoaded', render);
