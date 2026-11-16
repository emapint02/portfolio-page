// ==========================================================================
// 1. KONFIGURATION UND DOM-ELEMENTE
// ==========================================================================
const GITHUB_USERNAME = 'emapint02';
const CACHE_KEY = 'portfolio-github-cache';
const CACHE_TIME_MS = 60 * 60 * 1000; // 1 Stunde in Millisekunden (3'600'000 ms)

// DOM-Elemente aus der index.html auswählen
const profileBarElement = document.getElementById('github-profile-bar');
const githubGridElement = document.getElementById('github-grid');


// ==========================================================================
// 2. ZWISCHENSPEICHERUNG IM BROWSER (LOCALSTORAGE CACHING)
// ==========================================================================

// Speichert die abgerufenen GitHub-Daten zusammen mit einem Zeitstempel im localStorage
function saveCachedData(userData, reposData) {
  const cacheObject = {
    timestamp: Date.now(),
    user: userData,
    repos: reposData
  };

  localStorage.setItem(CACHE_KEY, JSON.stringify(cacheObject));
}

// Prüft, ob gültige und nicht abgelaufene Daten im localStorage vorhanden sind
function getCachedData() {
  if (localStorage.getItem(CACHE_KEY) === null) {
    return null;
  } else {
    const cacheObject = JSON.parse(localStorage.getItem(CACHE_KEY));

    // Prüfen, ob der Cache jünger als 1 Stunde (CACHE_TIME_MS) ist
    if (Date.now() - cacheObject.timestamp < CACHE_TIME_MS) {
      return cacheObject;
    } else {
      return null;
    }
  }
}


// ==========================================================================
// 3. DATENABRUFE ÜBER DIE GITHUB REST API
// ==========================================================================

// Ruft das Benutzerprofil und die öffentlichen Repositories asynchron von GitHub ab
async function fetchGitHubData() {
  const userUrl = 'https://api.github.com/users/' + GITHUB_USERNAME;
  const reposUrl = 'https://api.github.com/users/' + GITHUB_USERNAME + '/repos?sort=updated';

  // 1. Profildaten abrufen und in JSON umwandeln
  const userResponse = await fetch(userUrl);
  const userData = await userResponse.json();

  // 2. Repository-Liste abrufen und in JSON umwandeln
  const reposResponse = await fetch(reposUrl);
  const reposData = await reposResponse.json();

  return {
    user: userData,
    repos: reposData
  };
}


// ==========================================================================
// 4. DARSTELLUNG DER PROFIL-LEISTE UND REPOSITORY-KARTEN (DOM)
// ==========================================================================

// Befüllt die obere Statistik-Leiste mit den wichtigsten GitHub-Profildaten
function renderProfileBar(user) {
  profileBarElement.innerHTML =
    '<p><strong>GitHub-Profil:</strong> ' + user.login +
    ' | <strong>Öffentliche Repos:</strong> ' + user.public_repos +
    ' | <strong>Follower:</strong> ' + user.followers + '</p>' +
    '<a href="' + user.html_url + '" target="_blank" rel="noopener" class="filter-btn">Profil auf GitHub öffnen</a>';
}

// Erstellt für jedes öffentliche Repository eine eigene Projekt-Karte im Grid
function renderRepoCards(repos) {
  githubGridElement.innerHTML = '';

  repos.forEach(function (repo) {
    const card = document.createElement('article');
    card.className = 'project-card';

    // Fallback-Text setzen, falls auf GitHub keine Beschreibung hinterlegt ist
    let descriptionText = 'Keine Beschreibung vorhanden.';
    if (repo.description !== null) {
      descriptionText = repo.description;
    }

    card.innerHTML =
      '<div>' +
        '<h3>' + repo.name + '</h3>' +
        '<p>' + descriptionText + '</p>' +
      '</div>' +
      '<div class="project-meta">' +
        '<span class="badge">Sterne: ' + repo.stargazers_count + '</span>' +
        '<a href="' + repo.html_url + '" target="_blank" rel="noopener" class="badge">Zum Repository</a>' +
      '</div>';

    githubGridElement.appendChild(card);
  });
}


// ==========================================================================
// 5. HAUPTSTEUERUNG UND FEHLERBEHANDLUNG (EXPORT FÜR MAIN.JS)
// ==========================================================================

// Lädt die GitHub-Daten bevorzugt aus dem Cache oder ruft sie neu über die API ab
export async function initGitHub() {
  const cached = getCachedData();

  if (cached !== null) {
    // Daten sind im localStorage-Cache vorhanden und noch gültig
    renderProfileBar(cached.user);
    renderRepoCards(cached.repos);
  } else {
    // Kein gültiger Cache vorhanden -> Live von der GitHub REST API abrufen
    try {
      const data = await fetchGitHubData();
      saveCachedData(data.user, data.repos);
      renderProfileBar(data.user);
      renderRepoCards(data.repos);
    } catch (error) {
      console.log('Fehler beim Abrufen der Daten:', error);
      profileBarElement.innerHTML = '<p class="error-message">GitHub-Daten konnten nicht geladen werden.</p>';
      githubGridElement.innerHTML = '';
    }
  }
}