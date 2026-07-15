/* ------------------------------------------------------------------
   Repository items. Replace this array with a fetch() call to the
   repository API once Phase 1/2 data is available. Every field maps
   to the standard metadata schema (title, agency, theme, year,
   geography, cooperation framework outcome, SDGs, knowledge type),
   so the rendering and filtering logic below does not need to change.
------------------------------------------------------------------- */
const DATA = [
  {status:"Active", title:"Youth employment skilling programme reaches 12,000 in Northern Uganda", desc:"UNDP-led vocational skilling initiative for young people in Northern Uganda, delivered with regional training partners.", type:"Achievement", agency:"UNDP", theme:"Youth Employment", year:2025, region:"Northern Uganda", outcome:"Outcome 1: Sustainable growth", sdg:["SDG 8","SDG 1"], kType:"Evidence"},
  {status:"Active", title:"Adolescent nutrition programme cuts stunting rate in Karamoja", desc:"UNICEF nutrition intervention targeting adolescents and young mothers across Karamoja sub-region.", type:"Achievement", agency:"UNICEF", theme:"Health", year:2025, region:"Karamoja", outcome:"Outcome 2: Human capital", sdg:["SDG 2","SDG 3"], kType:"Evidence"},
  {status:"Active", title:"Refugee settlement food assistance partnership renewed", desc:"WFP food assistance partnership covering refugee and host community populations in West Nile.", type:"Partner", agency:"WFP", theme:"Food Security", year:2024, region:"West Nile", outcome:"Outcome 1: Sustainable growth", sdg:["SDG 2","SDG 17"], kType:"Resources"},
  {status:"Active", title:"Private sector coalition launched for digital skilling", desc:"UNDP-convened coalition of private sector partners supporting digital skills training in Kampala.", type:"Partner", agency:"UNDP", theme:"Digital Innovation", year:2025, region:"Kampala", outcome:"Outcome 1: Sustainable growth", sdg:["SDG 9","SDG 8"], kType:"Insights"},
  {status:"Published", title:"RC op-ed on climate resilience published in Daily Monitor", desc:"Resident Coordinator's Office op-ed on national climate resilience priorities.", type:"Media Report", agency:"RCO", theme:"Climate Resilience", year:2025, region:"National", outcome:"Outcome 3: Resilience", sdg:["SDG 13"], kType:"Insights"},
  {status:"Aired", title:"Radio series on gender-based violence prevention airs in Acholi", desc:"UNFPA-supported radio series addressing gender-based violence prevention in the Acholi sub-region.", type:"Media Report", agency:"UNFPA", theme:"Gender", year:2024, region:"Acholi", outcome:"Outcome 2: Human capital", sdg:["SDG 5"], kType:"Experience"},
  {status:"Published", title:"Outcome 3 annual review: climate and disaster resilience", desc:"Annual review of progress against Cooperation Framework Outcome 3 on climate and disaster resilience.", type:"Cooperation Framework", agency:"UNDP", theme:"Climate Resilience", year:2025, region:"National", outcome:"Outcome 3: Resilience", sdg:["SDG 13","SDG 11"], kType:"Evidence"},
  {status:"Active", title:"Tourism value chain partnership with Uganda Tourism Board", desc:"Joint UN agency partnership supporting tourism value chain development and digital innovation.", type:"Partner", agency:"UNWTO", theme:"Tourism", year:2025, region:"Western Region", outcome:"Outcome 1: Sustainable growth", sdg:["SDG 8","SDG 12"], kType:"Insights"},
  {status:"Active", title:"Maternal health outreach reduces mortality in Busoga", desc:"UNFPA maternal health outreach programme covering rural health facilities in Busoga sub-region.", type:"Achievement", agency:"UNFPA", theme:"Health", year:2024, region:"Busoga", outcome:"Outcome 2: Human capital", sdg:["SDG 3"], kType:"Evidence"},
  {status:"Published", title:"Joint communications campaign on teenage pregnancy", desc:"UNICEF-led joint communications campaign addressing teenage pregnancy in the Eastern Region.", type:"Media Report", agency:"UNICEF", theme:"Gender", year:2025, region:"Eastern Region", outcome:"Outcome 2: Human capital", sdg:["SDG 5","SDG 3"], kType:"Experience"},
  {status:"Published", title:"Outcome 1 mid-term review: inclusive growth and decent work", desc:"Mid-term review of progress against Cooperation Framework Outcome 1 on inclusive growth and decent work.", type:"Cooperation Framework", agency:"ILO", theme:"Youth Employment", year:2025, region:"National", outcome:"Outcome 1: Sustainable growth", sdg:["SDG 8"], kType:"Evidence"},
  {status:"Active", title:"Digital innovation lab partnership with Makerere University", desc:"UNDP partnership with Makerere University supporting a student-facing digital innovation lab.", type:"Partner", agency:"UNDP", theme:"Digital Innovation", year:2024, region:"Kampala", outcome:"Outcome 1: Sustainable growth", sdg:["SDG 9","SDG 4"], kType:"Insights"},
  {status:"Ongoing", title:"Northern Uganda skilling centres rollout", desc:"UNDP project establishing vocational skilling centres across districts in Northern Uganda.", type:"Project", agency:"UNDP", theme:"Youth Employment", year:2025, region:"Northern Uganda", outcome:"Outcome 1: Sustainable growth", sdg:["SDG 8"], kType:"Resources"},
  {status:"Ongoing", title:"Integrated early childhood development project, Karamoja", desc:"UNICEF project integrating health, nutrition and early learning services in Karamoja.", type:"Project", agency:"UNICEF", theme:"Health", year:2024, region:"Karamoja", outcome:"Outcome 2: Human capital", sdg:["SDG 3","SDG 4"], kType:"Resources"},
  {status:"Published", title:"Climate resilience investment map, national coverage", desc:"National map of climate resilience investments by district, produced for briefing use.", type:"Map/Chart", agency:"UNDP", theme:"Climate Resilience", year:2025, region:"National", outcome:"Outcome 3: Resilience", sdg:["SDG 13"], kType:"Evidence"},
  {status:"Published", title:"Refugee and host community distribution chart, West Nile", desc:"Chart set showing refugee and host community population distribution across West Nile.", type:"Map/Chart", agency:"WFP", theme:"Food Security", year:2024, region:"West Nile", outcome:"Outcome 1: Sustainable growth", sdg:["SDG 2"], kType:"Evidence"},
];

let currentView = "all";
const sel = { theme: "", agency: "", region: "", sdg: "", year: "", search: "" };

function unique(arr) { return [...new Set(arr)].sort(); }

function populateSelect(id, values, label) {
  const el = document.getElementById(id);
  el.innerHTML = `<option value="">${label}: all</option>` +
    values.map(v => `<option value="${v}">${v}</option>`).join("");
  el.addEventListener("change", e => {
    sel[id.replace("f-", "")] = e.target.value;
    render();
  });
  document.getElementById("f-search").addEventListener("input", e => {
  sel.search = e.target.value.trim().toLowerCase();
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
    if (sel.search && !(d.title.toLowerCase().includes(sel.search) || d.desc.toLowerCase().includes(sel.search))) return false;
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
      <span class="status">${d.status}</span>
      <p class="title">${d.title}</p>
      <p class="desc">${d.desc}</p>
      <div class="field-grid">
        <div class="field"><span class="field-label">Agency:</span><span class="field-value">${d.agency}</span></div>
        <div class="field"><span class="field-label">Year:</span><span class="field-value">${d.year}</span></div>
        <div class="field"><span class="field-label">Region:</span><span class="field-value">${d.region}</span></div>
        <div class="field"><span class="field-label">SDGs:</span><span class="field-value">${d.sdg.join(", ")}</span></div>
        <div class="field"><span class="field-label">Outcome:</span><span class="field-value">${d.outcome}</span></div>
      </div>
      <div class="tag-line">
        <span class="tag">${d.type.toUpperCase()} | ${d.theme.toUpperCase()}</span>
        <span class="badge badge-${d.kType}">${d.kType}</span>
      </div>
    </div>
  `).join("");
}

render();