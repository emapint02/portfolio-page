# Portfolio-Webseite – Emanuele Pintarelli

Dieses Repository enthält meine persönliche Portfolio-Webseite für das Modul **Web Engineering** (FS2026) an der **Berner Fachhochschule (BFH)**.

Die Seite dient als digitale Visitenkarte, stellt meinen Hintergrund als **Cloud Engineer** und Wirtschaftsinformatik-Student vor und zeigt meine bisherigen Projekte aus dem Studium und der Praxis.

## Rahmendaten

* **Autor:** Emanuele Pintarelli (`emanuele.pintarelli@students.bfh.ch`)
* **Hochschule:** Berner Fachhochschule (BFH) – Wirtschaftsinformatik
* **Dozent:** Syrian Hadad
* **Technischer Support:** Kevin Adrian Bieri
* **Repository:** https://github.com/emapint02/portfolio-page
* **Live-Seite (GitHub Pages):** https://emapint02.github.io/portfolio-page/
* **Abgabetermin:** 18. Dezember 2026

---

## Umsetzung der Bewertungskriterien

Die Webseite wird schrittweise entlang der Vorlesungsthemen mit reinem **HTML5, CSS3 und JavaScript** umgesetzt:

1. **Erreichbarkeit (K.-o.-Kriterium):** Bereitstellung über GitHub Pages (`main`-Branch) mit relativen Pfaden für alle Dateien.
2. **Responsivität (15 Punkte):** Anpassung an Desktop, Tablet und Mobile (< 768px) mithilfe von CSS Grid, Flexbox und Media Queries (`@media`).
3. **Codequalität & Komplexität (20 Punkte):**
   * Saubere Trennung von Struktur (`index.html`), Design (`css/style.css`) und Logik (`js/`).
   * **API & Datenverarbeitung:** Abruf meiner öffentlichen Repositories über die GitHub REST API, kombiniert mit lokalen Projektinfos, inklusive Zwischenspeicherung im `localStorage` (Caching), Filterung und Seitennavigation (Pagination).
   * **Third-Party-Integration:** Darstellung meiner technischen Skills und Repository-Sprachen als interaktives Diagramm mit **D3.js**.
   * **Formularvalidierung:** Kontaktformular mit HTML5-Validierungsattributen und JavaScript-Prüfung (`setCustomValidity`).
4. **Commit-Historie (10 Punkte):** Regelmässige Commits über das gesamte Semester passend zum Projektfortschritt.
5. **Gestaltung & Funktionalität (15 Punkte):** Dunkles Farbschema (angelehnt an das Dracula-Theme) mit optionalem hellem Modus, klare Überschriften-Struktur und einfache Navigation.

---

## Ordnerstruktur

~~~text
portfolio-page/
├── index.html          # Semantisches HTML5-Grundgerüst
├── README.md           # Projektdokumentation
├── .gitignore          # Ausschluss von System- und Editor-Dateien
│
├── css/
│   └── style.css       # Zentrales Stylesheet (Farbvariablen, Grid, Flexbox, Media Queries)
│
├── js/
│   ├── main.js         # Hauptskript (Navigation, Theme-Umschalter, Filter & Formular)
│   ├── api.js          # Abruf der GitHub-Projekte & Zwischenspeicherung (localStorage)
│   └── charts.js       # D3.js Diagramm für die Skill-Übersicht
│
└── assets/
    └── images/         # Bilder für Profil und Projekte
~~~

---

## Lokale Ausführung

Für die lokale Vorschau wird wie in der Vorlesung empfohlen `http-serve` oder die VS Code Erweiterung *Live Server* genutzt:

~~~bash
npm i -g http-serve
http-serve
~~~

---

## Aktueller Projektstatus

| Schritt | Beschreibung | Status |
| :--- | :--- | :--- |
| **1. Setup & HTML-Gerüst** | `.gitignore`, `README.md` und semantische `index.html` | 🟢 Abgeschlossen |
| **2. CSS & Responsive Design** | Grunddesign, Flexbox-Navigation, CSS Grid Layout & Media Queries | 🟢 Abgeschlossen |
| **3. JavaScript & Formular** | Interaktionen, Menü-Toggle und Formularvalidierung | 🟡 In Bearbeitung |
| **4. GitHub API & Caching** | Dynamisches Laden der Projekte, Filter, Pagination & `localStorage` | ⚪ Ausstehend |
| **5. D3.js Diagramm & Feinschliff** | Einbindung des Skill-Diagramms und abschliessender Test | ⚪ Ausstehend |