# Portfolio-Webseite – Emanuele Pintarelli

Dieses Repository enthält meine persönliche Portfolio-Webseite für das Modul **Web Engineering** (FS2026) an der **Berner Fachhochschule (BFH)**.

Die Seite dient als digitale Visitenkarte, stellt meinen Hintergrund als **Cloud Engineer** und Wirtschaftsinformatik-Student vor und zeigt meine bisherigen Projekte aus dem Studium und der Praxis.

## Rahmendaten

* **Autor:** Emanuele Pintarelli (`emanuele.pintarelli@students.bfh.ch`)
* **Hochschule:** Berner Fachhochschule (BFH) – Wirtschaftsinformatik
* **Dozent:** Syrian Hadad
* **Repository:** https://github.com/emapint02/portfolio-page
* **Live-Seite (GitHub Pages):** https://emapint02.github.io/portfolio-page/
* **Abgabetermin:** 18. Dezember 2026

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
| **3. JavaScript & Formular** | Interaktionen, Menü-Toggle und Formularvalidierung | 🟢 Abgeschlossen |
| **4. GitHub API & Caching** | Dynamisches Laden der Projekte, Filter, Pagination & `localStorage` | 🟡 In Bearbeitung |
| **5. D3.js Diagramm & Feinschliff** | Einbindung des Skill-Diagramms und abschliessender Test | 🟡 In Bearbeitung |
