/* ===================================================
   LUXOR TRAVEL — JavaScript
   Súbor: assets/js/script.js
   Všetky interaktívne prvky stránky
   =================================================== */

// ===================================================
// 1. DARK MODE TOGGLE
// Prepínanie medzi tmavým a svetlým režimom
// Uloží nastavenie do localStorage
// ===================================================
const darkToggle = document.getElementById('dark-toggle');

if (darkToggle) {
  // Skontrolujeme uložené nastavenie pri načítaní stránky
  const savedMode = localStorage.getItem('colorMode');
  if (savedMode === 'light') {
    document.body.classList.add('dark-off');
    darkToggle.innerHTML = '<i class="bi bi-moon-stars-fill"></i>';
  }

  darkToggle.addEventListener('click', function () {
    document.body.classList.toggle('dark-off');

    if (document.body.classList.contains('dark-off')) {
      // Svetlý režim je aktívny
      darkToggle.innerHTML = '<i class="bi bi-moon-stars-fill"></i>';
      localStorage.setItem('colorMode', 'light');
    } else {
      // Tmavý režim je aktívny
      darkToggle.innerHTML = '<i class="bi bi-sun-fill"></i>';
      localStorage.setItem('colorMode', 'dark');
    }
  });
}

// ===================================================
// 2. TOAST NOTIFIKÁCIA po odoslaní formulára
// Zobrazí sa Bootstrap Toast po kliknutí na Odoslať
// Formulár sa pred tým zvaliduje
// ===================================================
const contactForm = document.getElementById('contact-form');
const toastEl = document.getElementById('confirmToast');

if (contactForm && toastEl) {
  const toast = new bootstrap.Toast(toastEl, { delay: 4000 });

  contactForm.addEventListener('submit', function (e) {
    e.preventDefault(); // Zabráni odoslaniu (stránka je statická)

    if (contactForm.checkValidity()) {
      // Formulár je platný — zobraz toast a vymaž polia
      toast.show();
      contactForm.reset();
    } else {
      // Označ neplatné polia
      contactForm.reportValidity();
    }
  });
}

// ===================================================
// 3. POČÍTADLO ZNAKOV V TEXTAREA
// Zobrazuje koľko znakov zostáva pri písaní správy
// Zmení farbu pri blízkosti limitu
// ===================================================
const sprava = document.getElementById('sprava');
const counter = document.getElementById('char-counter');

if (sprava && counter) {
  const maxChars = 500;

  sprava.addEventListener('input', function () {
    const remaining = maxChars - sprava.value.length;
    counter.textContent = 'Zostáva: ' + remaining + ' znakov';

    // Červená farba keď zostáva menej ako 50 znakov
    if (remaining < 50) {
      counter.style.color = '#e53935';
    } else {
      counter.style.color = '';
    }
  });
}

// ===================================================
// 4. PODMIENENÝ FORMULÁR — Typ záujazdu
// Ak si vyberú "Individuálny zájazdz", zobrazí sa
// ďalšie pole s počtom osôb
// ===================================================
const typZajazdu = document.getElementById('typ-zajazdu');
const individualnaSkupina = document.getElementById('individualna-skupina');

if (typZajazdu && individualnaSkupina) {
  typZajazdu.addEventListener('change', function () {
    if (this.value === 'individualny') {
      individualnaSkupina.style.display = 'block';
      individualnaSkupina.style.animation = 'fadeInUp 0.4s ease forwards';
    } else {
      individualnaSkupina.style.display = 'none';
    }
  });
}

// ===================================================
// 5. NAVBAR — aktívny odkaz podľa aktuálnej stránky
// Zvýrazní odkaz v navigácii podľa URL
// ===================================================
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(function (link) {
  const href = link.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    link.classList.add('active');
  }
});

// ===================================================
// 6. PLYNULÝ SCROLL na sekcie (pre index.html)
// Animovaný scroll keď klikneme na odkaz s #
// ===================================================
document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ===================================================
// 7. MODAL — naplnenie obsahu podľa kliku na kartu
// Každé tlačidlo Detail otvorí modal s informáciami
// o konkrétnej destinácii
// ===================================================
const destModal = document.getElementById('destModal');

if (destModal) {
  destModal.addEventListener('show.bs.modal', function (e) {
    const button = e.relatedTarget;
    if (!button) return;

    // Čítame dáta z tlačidla
    const dest = button.getAttribute('data-dest') || '';
    const cena = button.getAttribute('data-cena') || '';
    const popis = button.getAttribute('data-popis') || '';
    const img = button.getAttribute('data-img') || '';

    // Naplníme modal
    const modalTitle = destModal.querySelector('.modal-title');
    const modalImg = destModal.querySelector('#modal-img');
    const modalCena = destModal.querySelector('#modal-cena');
    const modalPopis = destModal.querySelector('#modal-popis');

    if (modalTitle) modalTitle.textContent = dest;
    if (modalImg && img) { modalImg.src = img; modalImg.alt = dest; }
    if (modalCena) modalCena.textContent = cena;
    if (modalPopis) modalPopis.textContent = popis;
  });
}
