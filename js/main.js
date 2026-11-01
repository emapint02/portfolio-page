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
// 2. MOBILES MENÜ EIN- UND AUSBLENDEN
// ==========================================================================
const menuToggleBtn = document.getElementById('menu-toggle');
const mainNav = document.getElementById('main-nav');

menuToggleBtn.addEventListener('click', function () {
  mainNav.classList.toggle('is-open');
});

// Menü auf dem Handy automatisch schliessen, sobald ein Link geklickt wird
const navLinks = document.querySelectorAll('.nav-list a');
navLinks.forEach(function (link) {
  link.addEventListener('click', function () {
    mainNav.classList.remove('is-open');
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