/**
 * Golden Stays – Tiruvannamalai
 * Interactive script: navbar, modal with photo slider, scroll effects
 */

(function () {
  'use strict';

  /* --------------------------------------------------
     Utility
  -------------------------------------------------- */
  const $ = (selector, ctx = document) => ctx.querySelector(selector);
  const $$ = (selector, ctx = document) => [...ctx.querySelectorAll(selector)];
  const on = (el, event, fn, opts) => el && el.addEventListener(event, fn, opts);

  /* --------------------------------------------------
     Copyright Year
  -------------------------------------------------- */
  const yearEl = $('#copy-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* --------------------------------------------------
     Navbar: scroll state + active-link tracking
  -------------------------------------------------- */
  const nav = $('#nav');

  function updateNav() {
    if (window.scrollY > 60) {
      nav.classList.add('is-scrolled');
    } else {
      nav.classList.remove('is-scrolled');
    }

    const sections = $$('section[id]');
    let current = '';
    sections.forEach(sec => {
      const top = sec.getBoundingClientRect().top;
      if (top <= 120) current = sec.id;
    });
    $$('.nav__link').forEach(link => {
      link.classList.toggle('is-active', link.getAttribute('href') === '#' + current);
    });
  }

  on(window, 'scroll', updateNav, { passive: true });
  updateNav();

  /* --------------------------------------------------
     Mobile Drawer
  -------------------------------------------------- */
  const ham     = $('#navHam');
  const close   = $('#navClose');
  const drawer  = $('#navDrawer');
  const overlay = $('#navOverlay');

  function openDrawer() {
    drawer.classList.add('is-open');
    overlay.classList.add('is-open');
    ham.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    drawer.classList.remove('is-open');
    overlay.classList.remove('is-open');
    ham.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  on(ham,     'click', openDrawer);
  on(close,   'click', closeDrawer);
  on(overlay, 'click', closeDrawer);

  $$('.nav__drawer-link').forEach(link => on(link, 'click', closeDrawer));

  on(document, 'keydown', e => {
    if (e.key === 'Escape') {
      closeDrawer();
      closeModal();
    }
    if (modalBackdrop && modalBackdrop.classList.contains('is-open')) {
      if (e.key === 'ArrowLeft')  sliderPrev();
      if (e.key === 'ArrowRight') sliderNext();
    }
  });

  /* --------------------------------------------------
     Property Data (All folder images included)
  -------------------------------------------------- */
  const PROPERTIES = {
    residency: {
      name:     'Golden Residency',
      eyebrow:  'Property 01 · Golden Stays',
      distance: 'Less than 1 km from Sri Arunachaleswarar Temple',
      rating:   '4.2 / 5',
      phone:    '+91 63855 34699',
      phoneRaw: '+916385534699',
      waNum:    '916385534699',
      address:  '150, Chengam Road, Thamarai Nagar, Tiruvannamalai, Tamil Nadu 606603',
      mapsUrl:  'https://maps.google.com/?q=150+Chengam+Road+Thamarai+Nagar+Tiruvannamalai',
      desc:     "Golden Residency is ideally positioned on Chengam Road, offering serene and comfortable stays for devotees, pilgrims, and families. With A/C and non-A/C room options, 24-hour hot water, and dedicated service, it is a reliable home base for exploring Tiruvannamalai's spiritual landmarks.",
      photos: [
        { src: 'golden_residency/golden_residency.jpeg', caption: 'Exterior View',      pos: 'center 68%' },
        { src: 'golden_residency/AC room1.jpg',          caption: 'AC Room 1',          pos: 'center 65%' },
        { src: 'golden_residency/AC room2.jpg',          caption: 'AC Room 2',          pos: 'center 65%' },
        { src: 'golden_residency/room1.png',             caption: 'Standard Room 1',    pos: 'center 70%' },
        { src: 'golden_residency/room2.png',             caption: 'Standard Room 2',    pos: 'center 50%' },
      ],
      amenities: [
        'A/C &amp; Non-A/C Room Options',
        '24-Hour Hot &amp; Cold Water',
        'Less than 1 km to Arunachaleswarar Temple',
        'Parking Facility Available',
        'Daily Housekeeping',
        'Walking Access to Chengam Road &amp; Ramana Ashram',
        'Quiet &amp; Pilgrim-Friendly Atmosphere',
      ],
      tariffs: [
        { room: 'Standard Double Room (Non-A/C)', occ: '1 Guest',    rate: '&#8377; 800' },
        { room: 'Standard Double Room (Non-A/C)', occ: '2 Guests',   rate: '&#8377; 1,000' },
        { room: 'Deluxe Double Room (Non-A/C)',   occ: '2 Guests',   rate: '&#8377; 1,100' },
        { room: 'Executive A/C Room',             occ: '1&#8211;2 Guests', rate: '&#8377; 1,400 &#8211; &#8377; 1,800' },
        { room: 'Extra Person',                   occ: '1 Guest',    rate: '&#8377; 200' },
      ],
    },
    lodge: {
      name:     'Golden Lodge',
      eyebrow:  'Property 02 · Golden Stays',
      distance: 'Just 500 metres from Sri Arunachaleswarar Temple',
      rating:   '4.4 / 5',
      phone:    '+91 4175 251 011',
      phoneRaw: '+914175251011',
      waNum:    '914175251011',
      address:  '51/104, Krishnan St, Tiruvennanallur, Tiruvannamalai, Tamil Nadu 606601',
      mapsUrl:  'https://maps.google.com/?q=51/104+Krishnan+Street+Tiruvennanallur+Tiruvannamalai',
      desc:     'Golden Lodge is our closest property to the sacred Rajagopuram of Arunachaleswarar Temple — just a 5-minute walk away. Ideal for pilgrims attending early morning darshans, the lodge offers transparent tariffs, clean double and A/C rooms, and warm, consistent hospitality.',
      photos: [
        { src: 'golden_lodge/golden_lodge.jpeg', caption: 'Building Entrance', pos: 'center 20%' },
        { src: 'golden_lodge/room1.png',         caption: 'Double Room',       pos: 'center 50%' },
        { src: 'golden_lodge/room2.png',         caption: 'Deluxe Room',       pos: 'center 50%' },
        { src: 'golden_lodge/reception.jpg',     caption: 'Reception Desk',    pos: 'center 35%' },
        { src: 'golden_lodge/corridor.jpg',     caption: 'Corridor View 1',   pos: 'center 40%' },
        { src: 'golden_lodge/corridor1.jpg',    caption: 'Corridor View 2',   pos: 'center 30%' },
      ],
      amenities: [
        'Double Rooms &amp; Double A/C Rooms Available',
        '500 m Walk to Arunachaleswarar Temple',
        '24-Hour Reception &amp; Pilgrim Assistance',
        'Continuous Hot Water Supply',
        'Clean Corridors &amp; Secure Premises',
        'Easy Access to Temple Bazaar &amp; Annadhanam Halls',
        'Transparent Standard Tariffs',
      ],
      tariffs: [
        { room: 'Double Room &#8211; Single Occupancy (Non-A/C)',  occ: '1 Guest',  rate: '&#8377; 700' },
        { room: 'Double Room &#8211; Double Occupancy (Non-A/C)',  occ: '2 Guests', rate: '&#8377; 1,000' },
        { room: 'Single Deluxe (Non-A/C)',                        occ: '1 Guest',  rate: '&#8377; 850' },
        { room: 'Double Deluxe (Non-A/C)',                        occ: '2 Guests', rate: '&#8377; 1,050' },
        { room: 'Double A/C &#8211; Single Occupancy',            occ: '1 Guest',  rate: '&#8377; 1,200' },
        { room: 'Double A/C &#8211; Double Occupancy',            occ: '2 Guests', rate: '&#8377; 1,500' },
        { room: 'Extra Person',                                   occ: '1 Guest',  rate: '&#8377; 200' },
      ],
    },
  };

  /* --------------------------------------------------
     Card Photo Slider State & Handlers
  -------------------------------------------------- */
  const cardPhotoIndex = {
    residency: 0,
    lodge: 0,
  };

  function moveCardPhoto(propKey, dir) {
    const photos = PROPERTIES[propKey]?.photos;
    if (!photos || !photos.length) return;
    const newIdx = (cardPhotoIndex[propKey] + dir + photos.length) % photos.length;
    setCardPhoto(propKey, newIdx);
  }

  function setCardPhoto(propKey, idx) {
    const photos = PROPERTIES[propKey]?.photos;
    if (!photos || !photos.length) return;
    cardPhotoIndex[propKey] = (idx + photos.length) % photos.length;
    const curIdx = cardPhotoIndex[propKey];
    const photo = photos[curIdx];

    const imgId = propKey === 'residency' ? 'res-main-img' : 'lodge-main-img';
    const img = document.getElementById(imgId);
    const caption = document.getElementById(`${propKey}-caption`);
    const counter = document.getElementById(`${propKey}-counter`);
    const dotsContainer = document.getElementById(`${propKey}-dots`);

    if (img) {
      img.style.opacity = '0.35';
      img.style.transform = 'scale(1.02)';
      setTimeout(() => {
        img.src = photo.src;
        img.alt = `${PROPERTIES[propKey].name} - ${photo.caption}`;
        img.style.objectPosition = photo.pos || 'center center';
        img.style.opacity = '1';
        img.style.transform = 'scale(1)';
      }, 150);
    }

    if (caption) caption.textContent = photo.caption;
    if (counter) counter.textContent = `${curIdx + 1} / ${photos.length}`;

    if (dotsContainer) {
      const dots = dotsContainer.querySelectorAll('.card-slider__dot');
      dots.forEach((dot, i) => {
        dot.classList.toggle('is-active', i === curIdx);
        dot.setAttribute('aria-current', i === curIdx ? 'true' : 'false');
      });
    }
  }

  window.moveCardPhoto = moveCardPhoto;
  window.setCardPhoto = setCardPhoto;

  // Touch swiping on card media
  ['residency', 'lodge'].forEach(key => {
    const media = document.getElementById(`card-media-${key}`);
    if (!media) return;
    let touchX = 0;
    on(media, 'touchstart', e => { touchX = e.touches[0].clientX; }, { passive: true });
    on(media, 'touchend', e => {
      const diff = touchX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 35) {
        diff > 0 ? moveCardPhoto(key, 1) : moveCardPhoto(key, -1);
      }
    }, { passive: true });
  });

  /* --------------------------------------------------
     Modal Photo Slider State & Handlers
  -------------------------------------------------- */
  let sliderPhotos = [];
  let sliderIndex  = 0;
  let touchStartX  = 0;

  function sliderGoto(idx) {
    if (!sliderPhotos.length) return;
    sliderIndex = (idx + sliderPhotos.length) % sliderPhotos.length;
    const current = sliderPhotos[sliderIndex];

    const img = $('#slider-img');
    if (img) {
      img.style.opacity   = '0';
      img.style.transform = 'scale(1.04)';
      setTimeout(() => {
        img.src                  = current.src;
        img.alt                  = current.caption;
        img.style.objectPosition = current.pos || 'center center';
        img.style.opacity        = '1';
        img.style.transform      = 'scale(1)';
      }, 180);
    }

    const cap = $('#slider-caption');
    if (cap) cap.textContent = current.caption;

    const counter = $('#slider-counter');
    if (counter) counter.textContent = `${sliderIndex + 1} / ${sliderPhotos.length}`;

    $$('.slider__dot').forEach((dot, i) => {
      dot.classList.toggle('is-active', i === sliderIndex);
      dot.setAttribute('aria-current', i === sliderIndex ? 'true' : 'false');
    });
  }

  function sliderNext() { sliderGoto(sliderIndex + 1); }
  function sliderPrev() { sliderGoto(sliderIndex - 1); }

  /* --------------------------------------------------
     Modal Builder
  -------------------------------------------------- */
  const modalBackdrop = $('#modal');
  const modalBox      = $('#modal-box');
  const modalContent  = $('#modal-content');
  const modalClose    = $('#modal-close');

  function buildModal(key) {
    const d = PROPERTIES[key];
    sliderPhotos = d.photos;
    sliderIndex  = 0;

    const dots = d.photos.map((p, i) => `
      <button class="slider__dot${i === 0 ? ' is-active' : ''}"
              aria-label="Go to photo ${i + 1}: ${p.caption}"
              aria-current="${i === 0 ? 'true' : 'false'}"
              data-idx="${i}"></button>
    `).join('');

    const amenities = d.amenities.map(a => `
      <li style="display:flex;align-items:flex-start;gap:0.55rem;font-size:0.9rem;color:var(--text-cream);padding:0.3rem 0;">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--gold-mid)" stroke-width="2.5" style="flex-shrink:0;margin-top:2px;" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
        ${a}
      </li>
    `).join('');

    const rows = d.tariffs.map(t => `
      <tr>
        <td><strong>${t.room}</strong></td>
        <td>${t.occ}</td>
        <td class="tariff__price">${t.rate}</td>
      </tr>
    `).join('');

    const waMsg = encodeURIComponent(`Vanakkam Golden Stays! I would like to inquire about room availability at ${d.name} in Tiruvannamalai.`);

    return `
      <div class="modal__slider" id="modal-slider">
        <div class="slider__track">
          <img id="slider-img"
               src="${d.photos[0].src}"
               alt="${d.photos[0].caption}"
               style="object-position:${d.photos[0].pos || 'center center'};"
               class="slider__img" />
          <div class="slider__overlay">
            <span id="slider-caption" class="slider__caption">${d.photos[0].caption}</span>
            <span id="slider-counter" class="slider__counter">1 / ${d.photos.length}</span>
          </div>
        </div>
        <button class="slider__arrow slider__arrow--prev" id="slider-prev" aria-label="Previous photo">&#8249;</button>
        <button class="slider__arrow slider__arrow--next" id="slider-next" aria-label="Next photo">&#8250;</button>
        <div class="slider__dots" role="group" aria-label="Photo navigation">${dots}</div>
      </div>

      <div class="modal__head">
        <div style="font-family:var(--font-display);font-size:0.72rem;letter-spacing:0.2em;text-transform:uppercase;color:var(--gold-mid);margin-bottom:0.6rem;">${d.eyebrow}</div>
        <h2 id="modal-title" style="font-family:var(--font-serif);font-size:2rem;color:var(--text-ivory);margin-bottom:0.4rem;">${d.name}</h2>
        <p style="font-size:0.92rem;color:var(--gold-light);display:flex;align-items:center;gap:0.4rem;flex-wrap:wrap;">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
          ${d.distance} &nbsp;&middot;&nbsp; &#9733; ${d.rating} Google
        </p>
      </div>

      <div class="modal__body">
        <p style="font-size:1rem;color:var(--text-cream);line-height:1.75;margin-bottom:1.5rem;">${d.desc}</p>

        <h3 style="font-family:var(--font-body);font-size:0.82rem;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;color:var(--gold-mid);margin-bottom:0.8rem;">Amenities &amp; Features</h3>
        <ul style="margin-bottom:1.8rem;padding:0;list-style:none;">${amenities}</ul>

        <h3 style="font-family:var(--font-body);font-size:0.82rem;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;color:var(--gold-mid);margin-bottom:0.6rem;">Room Tariffs</h3>
        <div style="overflow-x:auto;">
          <table class="tariff">
            <thead><tr><th>Room Type</th><th>Occupancy</th><th>Rate / Night</th></tr></thead>
            <tbody>${rows}</tbody>
          </table>
        </div>
        <p style="font-size:0.8rem;color:var(--text-dimmed);margin-top:0.5rem;margin-bottom:1.4rem;">* Tariffs subject to availability. Festive-season pricing (Karthigai Deepam, Pournami) may vary.</p>

        <div style="margin-bottom:2rem;">
          <a href="${d.mapsUrl}" target="_blank" rel="noopener noreferrer"
             style="display:inline-flex;align-items:center;gap:0.4rem;font-size:0.88rem;color:var(--gold-light);text-decoration:underline;text-underline-offset:3px;">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            ${d.address} &#8212; Get Directions
          </a>
        </div>

        <div style="display:flex;gap:0.85rem;flex-wrap:wrap;justify-content:flex-end;padding-top:1rem;border-top:1px solid rgba(255,255,255,0.08);">
          <a href="tel:${d.phoneRaw}" class="btn btn--gold">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            Call ${d.name}
          </a>
          <a href="https://wa.me/${d.waNum}?text=${waMsg}" target="_blank" rel="noopener noreferrer" class="btn btn--green">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/></svg>
            WhatsApp Inquiry
          </a>
        </div>
      </div>
    `;
  }

  function bindSliderEvents() {
    on($('#slider-prev'), 'click', sliderPrev);
    on($('#slider-next'), 'click', sliderNext);

    $$('.slider__dot').forEach(dot => {
      on(dot, 'click', () => sliderGoto(parseInt(dot.dataset.idx, 10)));
    });

    const track = $('.slider__track');
    on(track, 'touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
    on(track, 'touchend',   e => {
      const diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 40) diff > 0 ? sliderNext() : sliderPrev();
    }, { passive: true });
  }

  function openModal(key) {
    modalContent.innerHTML = buildModal(key);
    modalBackdrop.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    if (modalBox) modalBox.scrollTop = 0;
    bindSliderEvents();
    modalClose.focus();
  }

  function closeModal() {
    modalBackdrop.classList.remove('is-open');
    document.body.style.overflow = '';
    sliderPhotos = [];
    sliderIndex  = 0;
  }

  window.openModal = openModal;

  on(modalClose,    'click', closeModal);
  on(modalBackdrop, 'click', e => { if (e.target === modalBackdrop) closeModal(); });

})();

