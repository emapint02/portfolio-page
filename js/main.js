// ==========================================================================
// 1. DARK / LIGHT MODE UMSCHALTER
// ==========================================================================
const themeToggleBtn = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;

// Prüfen, ob der Nutzer bei einem früheren Besuch schon ein Design gewählt hat
const savedTheme = localStorage.getItem('portfolio-theme');
if (savedTheme) {
  htmlElement.setAttribute('data-theme', savedTheme);
  themeToggleBtn.textContent = savedTheme === 'light' ? '☀️' : '🌙';
}

// Klick-Event für den Design-Wechsel
themeToggleBtn.addEventListener('click', function () {
  const currentTheme = htmlElement.getAttribute('data-theme');
  const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';

  htmlElement.setAttribute('data-theme', nextTheme);
  themeToggleBtn.textContent = nextTheme === 'light' ? '☀️' : '🌙';

  // Auswahl im Browser-Speicher merken
  localStorage.setItem('portfolio-theme', nextTheme);
});


// ==========================================================================
// 2. NAVIGATION UND WECHSEL ZWISCHEN UNTERANSICHTEN (SUBPAGES)
// ==========================================================================
const menuToggleBtn = document.getElementById('menu-toggle');
const mainNav = document.getElementById('main-nav');
const allSections = document.querySelectorAll('.view-section');
const navLinks = document.querySelectorAll('.nav-link');

menuToggleBtn.addEventListener('click', function () {
  mainNav.classList.toggle('is-open');
});

// Funktion: Zeigt nur die gewählte Unteransicht an und blendet alle anderen aus
function showSection(targetId) {
  allSections.forEach(function (section) {
    if (section.id === targetId) {
      section.classList.remove('hidden');
    } else {
      section.classList.add('hidden');
    }
  });

  // Aktiven Menüpunkt oben in der Navigation markieren
  navLinks.forEach(function (link) {
    if (link.getAttribute('data-target') === targetId) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // Mobiles Menü schliessen und nach oben scrollen
  mainNav.classList.remove('is-open');
  window.scrollTo(0, 0);
}

// Klick-Events für alle Elemente mit data-target (Menü-Links, Kacheln, Zurück-Buttons)
const viewTriggers = document.querySelectorAll('[data-target]');
viewTriggers.forEach(function (trigger) {
  trigger.addEventListener('click', function (event) {
    event.preventDefault();
    const targetId = trigger.getAttribute('data-target');
    showSection(targetId);
  });
});


// ==========================================================================
// 3. KONTAKTFORMULAR VALIDIERUNG
// ==========================================================================
const contactForm = document.getElementById('contact-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const subjectInput = document.getElementById('subject');
const messageInput = document.getElementById('message');
const formStatus = document.getElementById('form-status');

// Hilfsfunktion: Zeigt einen Fehler unter einem Eingabefeld an oder löscht ihn
function setFieldError(inputElement, errorSpanId, errorMessage) {
  const errorSpan = document.getElementById(errorSpanId);
  inputElement.setCustomValidity(errorMessage);

  if (errorMessage !== '') {
    inputElement.classList.add('input-error');
    errorSpan.textContent = errorMessage;
  } else {
    inputElement.classList.remove('input-error');
    errorSpan.textContent = '';
  }
}

contactForm.addEventListener('submit', function (event) {
  // Verhindert das Standard-Neuladen der Webseite beim Absenden
  event.preventDefault();
  formStatus.textContent = '';
  let isFormValid = true;

  // 1. Name prüfen (mindestens 2 Zeichen)
  if (nameInput.value.trim().length < 2) {
    setFieldError(nameInput, 'name-error', 'Bitte gib deinen Namen ein (mindestens 2 Zeichen).');
    isFormValid = false;
  } else {
    setFieldError(nameInput, 'name-error', '');
  }

  // 2. E-Mail prüfen (darf nicht leer sein und muss ein @ enthalten)
  const emailValue = emailInput.value.trim();
  if (emailValue === '' || !emailValue.includes('@') || !emailValue.includes('.')) {
    setFieldError(emailInput, 'email-error', 'Bitte gib eine gültige E-Mail-Adresse ein.');
    isFormValid = false;
  } else {
    setFieldError(emailInput, 'email-error', '');
  }

  // 3. Betreff-Auswahl prüfen
  if (subjectInput.value === '') {
    setFieldError(subjectInput, 'subject-error', 'Bitte wähle einen Betreff aus der Liste.');
    isFormValid = false;
  } else {
    setFieldError(subjectInput, 'subject-error', '');
  }

  // 4. Nachricht prüfen (mindestens 10 Zeichen)
  if (messageInput.value.trim().length < 10) {
    setFieldError(messageInput, 'message-error', 'Bitte schreibe eine Nachricht mit mindestens 10 Zeichen.');
    isFormValid = false;
  } else {
    setFieldError(messageInput, 'message-error', '');
  }

  // Wenn alle 4 Felder gültig sind: Erfolgsmeldung anzeigen und Formular leeren
  if (isFormValid) {
    formStatus.textContent = 'Vielen Dank für deine Nachricht :)';
    contactForm.reset();
  }
});


// ==========================================================================
// 4. AUSBILDUNGEN, MODULE UND ARBEITEN (PRO STUFE MIT EIGENER PAGINATION)
// ==========================================================================

// --- Module und Projekte an der BFH (Bachelor) ---
const bfhModules = [
  {
    title: 'Web Engineering',
    semester: 'Modul',
    description: 'Aufbau moderner Webapplikationen mit HTML5, CSS3 (Flexbox, Grid), Vanilla JavaScript sowie Web-Architekturen und REST APIs.',
    project: 'Einzelarbeit: Entwicklung dieser responsiven Portfolio-Webseite mit GitHub REST API, localStorage-Caching und D3.js Visualisierung.',
    badges: ['HTML5', 'CSS3', 'JavaScript', 'REST API', 'D3.js']
  },
  {
    title: 'Platzhalter Modul 2',
    semester: 'Modul',
    description: 'Beschreibung',
    project: 'Beschreibung',
    badges: ['Tag 1', 'Tag 2']
  },
  {
    title: 'Platzhalter Modul 3',
    semester: 'Modul',
    description: 'Beschreibung',
    project: 'Beschreibung',
    badges: ['Tag 1', 'Tag 2']
  }
];

// --- Module und Arbeiten an der HFTM (Höhere Fachschule) ---
const hftmModules = [
  {
    title: 'IDP as a Service',
    semester: 'HF-Diplomarbeit',
    description: 'Beschreibung',
    project: 'Beschreibung',
    badges: ['Diplomarbeit', 'IDP', 'weitere...']
  },
  {
    title: 'Platzhalter Modul 2',
    semester: 'HF-Modul',
    description: 'Beschreibung',
    project: 'Beschreibung',
    badges: ['Tag 1', 'Tag 2']
  },
  {
    title: 'Platzhalter Modul 3',
    semester: 'HF-Modul',
    description: 'Beschreibung',
    project: 'Beschreibung',
    badges: ['Tag 1', 'Tag 2']
  }
];

// --- Module und Arbeiten in der Berufslehre (Informatiker EFZ) ---
const efzModules = [
  {
    title: 'Individuelle Praktische Arbeit – Systemtechnik',
    semester: 'Abschlussarbeit (IPA)',
    description: 'Beschreibung',
    project: 'Beschreibung',
    badges: ['IPA Abschlussarbeit', 'Systemtechnik', 'Virtualisierung', 'Proof of Concept', 'weitere']
  },
  {
    title: 'Platzhalter Modul 2',
    semester: 'Berufslehre',
    description: 'Beschreibung',
    project: 'Beschreibung',
    badges: ['Tag 1', 'Tag 2']
  },
  {
    title: 'Platzhalter Modul 3',
    semester: 'Berufslehre',
    description: 'Beschreibung',
    project: 'Beschreibung',
    badges: ['Tag 1', 'Tag 2']
  }
];

// Wiederverwendbare Funktion: Baut für eine Bildungsstufe die Karten und eigene Pagination auf
function setupStagePagination(gridId, paginationId, modulesArray) {
  const gridElement = document.getElementById(gridId);
  const paginationElement = document.getElementById(paginationId);
  const itemsPerPage = 2; // Zeigt pro Stufe jeweils 2 Modul-Karten nebeneinander
  let currentPage = 1;

  function renderStage() {
    const totalPages = Math.ceil(modulesArray.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = modulesArray.slice(startIndex, endIndex);

    // 1. Modul-Karten für die aktuelle Seite zeichnen (Titel oben, Untertitel darunter)
    gridElement.innerHTML = '';

    currentItems.forEach(function (item) {
      const card = document.createElement('article');
      card.className = 'project-card';

      let badgesHtml = '';
      item.badges.forEach(function (badgeText) {
        badgesHtml += '<span class="badge">' + badgeText + '</span>';
      });

      card.innerHTML =
        '<div>' +
          '<h4>' + item.title + '</h4>' +
          '<p class="station-sub">' + item.semester + '</p>' +
          '<p>' + item.description + '</p>' +
          '<div class="module-project">' +
            '<strong>Projekt / Erfahrung:</strong>' +
            item.project +
          '</div>' +
        '</div>' +
        '<div class="project-meta">' +
          badgesHtml +
        '</div>';

      gridElement.appendChild(card);
    });

    // 2. Eigene Pagination-Buttons unter dieser Stufe zeichnen (ohne eckige Klammern)
    paginationElement.innerHTML = '';

    if (totalPages > 1) {
      const prevBtn = document.createElement('button');
      prevBtn.type = 'button';
      prevBtn.className = 'filter-btn';
      prevBtn.textContent = 'Zurück';
      prevBtn.disabled = currentPage === 1;
      prevBtn.addEventListener('click', function () {
        if (currentPage > 1) {
          currentPage--;
          renderStage();
        }
      });

      const pageInfo = document.createElement('span');
      pageInfo.textContent = 'Seite ' + currentPage + ' von ' + totalPages;

      const nextBtn = document.createElement('button');
      nextBtn.type = 'button';
      nextBtn.className = 'filter-btn';
      nextBtn.textContent = 'Weiter';
      nextBtn.disabled = currentPage === totalPages;
      nextBtn.addEventListener('click', function () {
        if (currentPage < totalPages) {
          currentPage++;
          renderStage();
        }
      });

      paginationElement.appendChild(prevBtn);
      paginationElement.appendChild(pageInfo);
      paginationElement.appendChild(nextBtn);
    }
  }

  // Erste Seite beim Start direkt anzeigen
  renderStage();
}

// Alle 3 Ausbildungs-Stufen initialisieren
setupStagePagination('bfh-grid', 'bfh-pagination', bfhModules);
setupStagePagination('hftm-grid', 'hftm-pagination', hftmModules);
setupStagePagination('efz-grid', 'efz-pagination', efzModules);