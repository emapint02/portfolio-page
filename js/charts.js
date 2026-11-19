import * as d3 from 'https://cdn.jsdelivr.net/npm/d3@7/+esm';

// ==========================================================================
// 1. SKILL-DATEN FÜR DAS D3.JS DIAGRAMM
// ==========================================================================
const skillsData = [
    {
        name: 'Ansible',
        level: 70,
        category: 'IaC & Automation'
    },
    {
        name: 'Docker Container',
        level: 60,
        category: 'Cloud & Container'
    },
    {
        name: 'Linux',
        level: 50,
        category: 'Linux & Monitoring'
    },
    {
        name: 'Grafana & Prometheus',
        level: 50,
        category: 'Linux & Monitoring'
    },
    {
        name: 'Kubernetes',
        level: 30,
        category: 'Cloud & Container'
    },
    {
        name: 'Terraform',
        level: 20,
        category: 'IaC & Automation'
    },
    {
        name: 'Microsoft Azure',
        level: 20,
        category: 'Cloud & Container'
    }
];


// ==========================================================================
// 2. INITIALISIERUNG UND SVG-GRUNDGERÜST (EXPORT FÜR MAIN.JS)
// ==========================================================================

// Baut das responsive SVG-Canvas im Container #skills-chart auf
export function initSkillsChart() {
    const container = d3.select('#skills-chart');

    // Abbrechen, falls der Ziel-Container im HTML nicht existiert
    if (container.empty()) {
        return;
    }

    // Lade-Hinweis aus dem HTML entfernen
    container.html('');

    // Responsives SVG über viewBox erstellen (skaliert ohne Overflow auf Mobile)
    const svg = container
        .append('svg')
        .attr('viewBox', '0 0 ${width} ${height}')
        .attr('role', 'img')
        .attr('aria-label', 'Balkendiagramm meiner technischen Kompetenzen')
        .style('width', '100%')
        .style('height', 'auto');


    const width = 700;
    const height = 340;
    const margin = { top: 20, right: 50, bottom: 35, left: 165 };


    // Verfügbare Innenfläche für die eigentlichen Balken
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const chartGroup = svg
        .append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);

const xScale = d3.scaleLinear()
  .domain([0, 100])
  .range([0, innerWidth]);

const yScale = d3.scaleBand()
  .domain(skillsData.map((skill) => skill.name))
  .range([0, innerHeight])
  .padding(0.28);

const colorScale = d3.scaleOrdinal()
  .domain(['Cloud & Container', 'IaC & Automation', 'Linux & Monitoring'])
  .range(['var(--accent-purple)', 'var(--accent-orange)', 'var(--accent-yellow)']);

  chartGroup
  .selectAll('.skill-bar')     // 1. Wähle alle (noch nicht existierenden) Balken
  .data(skillsData)            // 2. Binde dein JS-Array daran
  .join('rect')                // 3. Erzeuge für jedes Objekt genau ein <rect>
  .attr('class', 'skill-bar')
  .attr('x', 0)
  .attr('y', (d) => yScale(d.name))
  .attr('width', (d) => xScale(d.level))
  .attr('height', yScale.bandwidth())
  .attr('rx', 6)
  .attr('fill', (d) => colorScale(d.category));
 
// Linke Y-Achse (Technologie-Namen)
const yAxis = d3.axisLeft(yScale).tickSize(0).tickPadding(10);
chartGroup
  .append('g')
  .attr('class', 'chart-axis')
  .call(yAxis);

// Untere X-Achse (0%, 20%, ..., 100%)
const xAxis = d3.axisBottom(xScale)
  .ticks(5)
  .tickFormat((d) => `${d}%`);

chartGroup
  .append('g')
  .attr('class', 'chart-axis')
  .attr('transform', `translate(0, ${innerHeight})`)
  .call(xAxis);  
}

