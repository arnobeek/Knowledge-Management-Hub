/* ------------------------------------------------------------------
   Repository items. Replace this array with a fetch() call to the
   repository API once Phase 1/2 data is available. Every field maps
   to the standard metadata schema (title, agency, theme, year,
   geography, cooperation framework outcome, SDGs, knowledge type),
   so the rendering and filtering logic below does not need to change.
------------------------------------------------------------------- */
const DATA = [
  {title:"Youth employment skilling programme reaches 12,000 in Northern Uganda", type:"Achievement", agency:"UNDP", theme:"Youth Employment", year:2025, region:"Northern Uganda", outcome:"Outcome 1: Sustainable growth", sdg:["SDG 8","SDG 1"], kType:"Evidence"},
  {title:"Adolescent nutrition programme cuts stunting rate in Karamoja", type:"Achievement", agency:"UNICEF", theme:"Health", year:2025, region:"Karamoja", outcome:"Outcome 2: Human capital", sdg:["SDG 2","SDG 3"], kType:"Evidence"},
  {title:"Refugee settlement food assistance partnership renewed", type:"Partner", agency:"WFP", theme:"Food Security", year:2024, region:"West Nile", outcome:"Outcome 1: Sustainable growth", sdg:["SDG 2","SDG 17"], kType:"Resources"},
  {title:"Private sector coalition launched for digital skilling", type:"Partner", agency:"UNDP", theme:"Digital Innovation", year:2025, region:"Kampala", outcome:"Outcome 1: Sustainable growth", sdg:["SDG 9","SDG 8"], kType:"Insights"},
  {title:"RC op-ed on climate resilience published in Daily Monitor", type:"Media Report", agency:"RCO", theme:"Climate Resilience", year:2025, region:"National", outcome:"Outcome 3: Resilience", sdg:["SDG 13"], kType:"Insights"},
  {title:"Radio series on gender-based violence prevention airs in Acholi", type:"Media Report", agency:"UNFPA", theme:"Gender", year:2024, region:"Acholi", outcome:"Outcome 2: Human capital", sdg:["SDG 5"], kType:"Experience"},
  {title:"Outcome 3 annual review: climate and disaster resilience", type:"Cooperation Framework", agency:"UNDP", theme:"Climate Resilience", year:2025, region:"National", outcome:"Outcome 3: Resilience", sdg:["SDG 13","SDG 11"], kType:"Evidence"},
  {title:"Tourism value chain partnership with Uganda Tourism Board", type:"Partner", agency:"UNWTO", theme:"Tourism", year:2025, region:"Western Region", outcome:"Outcome 1: Sustainable growth", sdg:["SDG 8","SDG 12"], kType:"Insights"},
  {title:"Maternal health outreach reduces mortality in Busoga", type:"Achievement", agency:"UNFPA", theme:"Health", year:2024, region:"Busoga", outcome:"Outcome 2: Human capital", sdg:["SDG 3"], kType:"Evidence"},
  {title:"Joint communications campaign on teenage pregnancy", type:"Media Report", agency:"UNICEF", theme:"Gender", year:2025, region:"Eastern Region", outcome:"Outcome 2: Human capital", sdg:["SDG 5","SDG 3"], kType:"Experience"},
  {title:"Outcome 1 mid-term review: inclusive growth and decent work", type:"Cooperation Framework", agency:"ILO", theme:"Youth Employment", year:2025, region:"National", outcome:"Outcome 1: Sustainable growth", sdg:["SDG 8"], kType:"Evidence"},
  {title:"Digital innovation lab partnership with Makerere University", type:"Partner", agency:"UNDP", theme:"Digital Innovation", year:2024, region:"Kampala", outcome:"Outcome 1: Sustainable growth", sdg:["SDG 9","SDG 4"], kType:"Insights"},
  {title:"Northern Uganda skilling centres rollout", type:"Project", agency:"UNDP", theme:"Youth Employment", year:2025, region:"Northern Uganda", outcome:"Outcome 1: Sustainable growth", sdg:["SDG 8"], kType:"Resources"},
  {title:"Integrated early childhood development project, Karamoja", type:"Project", agency:"UNICEF", theme:"Health", year:2024, region:"Karamoja", outcome:"Outcome 2: Human capital", sdg:["SDG 3","SDG 4"], kType:"Resources"},
  {title:"Climate resilience investment map, national coverage", type:"Map/Chart", agency:"UNDP", theme:"Climate Resilience", year:2025, region:"National", outcome:"Outcome 3: Resilience", sdg:["SDG 13"], kType:"Evidence"},
  {title:"Refugee and host community distribution chart, West Nile", type:"Map/Chart", agency:"WFP", theme:"Food Security", year:2024, region:"West Nile", outcome:"Outcome 1: Sustainable growth", sdg:["SDG 2"], kType:"Evidence"},
];

let currentView = "all";
const sel = { theme: "", agency: "", region: "", sdg: "", year: "" };

function unique(arr) { return [...new Set(arr)].sort(); }

function populateSelect(id, values, label) {
  const el = document.getElementById(id);
  el.innerHTML = `<option value="">${label}: all</option>` +
    values.map(v => `<option value="${v}">${v}</option>`).join("");
  el.addEventListener("change", e => {
    sel[id.replace("f-", "")] = e.target.value;
    render();
  });
}

populateSelect("f-theme", unique(DATA.map(d => d.theme)), "Theme");
populateSelect("f-agency", unique(DATA.map(d => d.agency)), "Agency");
populateSelect("f-region", unique(DATA.map(d => d.region)), "Region");
populateSelect("f-sdg", unique(DATA.flatMap(d => d.sdg)), "SDG");
populateSelect("f-year", unique(DATA.map(d => d.year)).sort((a, b) => b - a), "Year");

document.querySelectorAll(".view-tab").forEach(btn => {
  btn.addEventListener("click", () => {
    currentView = btn.dataset.view;
    document.querySelectorAll(".view-tab").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    render();
  });
});

function render() {
  const filtered = DATA.filter(d => {
    if (currentView !== "all" && d.type !== currentView) return false;
    if (sel.theme && d.theme !== sel.theme) return false;
    if (sel.agency && d.agency !== sel.agency) return false;
    if (sel.region && d.region !== sel.region) return false;
    if (sel.sdg && !d.sdg.includes(sel.sdg)) return false;
    if (sel.year && String(d.year) !== String(sel.year)) return false;
    return true;
  });

  document.getElementById("stat-count").textContent = filtered.length;
  document.getElementById("stat-agencies").textContent = unique(filtered.map(d => d.agency)).length;
  document.getElementById("stat-regions").textContent = unique(filtered.map(d => d.region)).length;
  document.getElementById("stat-sdgs").textContent = unique(filtered.flatMap(d => d.sdg)).length;

  const results = document.getElementById("results");

  if (filtered.length === 0) {
    results.innerHTML = `<p class="empty-state">No items match these filters. Try clearing one.</p>`;
    return;
  }

  results.innerHTML = filtered.map(d => `
    <div class="result-card">
      <div class="row-top">
        <p class="title">${d.title}</p>
        <span class="badge badge-${d.kType}">${d.kType}</span>
      </div>
      <p class="meta">${d.agency} &middot; ${d.theme} &middot; ${d.region} &middot; ${d.year} &middot; ${d.sdg.join(", ")}</p>
      <p class="outcome">${d.outcome}</p>
    </div>
  `).join("");
}

render();