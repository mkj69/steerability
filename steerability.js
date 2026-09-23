const steerState = {
  papers: [],
  category: '',
  year: '',
  role: '',
  query: '',
};

const steerEls = {
  list: document.querySelector('#steer-paper-list'),
  count: document.querySelector('#steer-result-count'),
  total: document.querySelector('#paper-total'),
  search: document.querySelector('#steer-search'),
  category: document.querySelector('#steer-category'),
  year: document.querySelector('#steer-year'),
  role: document.querySelector('#steer-role'),
  clear: document.querySelector('#steer-clear'),
};

const steerCategoryLabels = {
  'steering-targets': 'Steering targets',
  'inference-time-steering': 'Inference-time steering',
  'representation-activation-steering': 'Representation / activation',
  'prompt-context-steering': 'Prompt / context',
  'training-time-steering': 'Training-time steering',
  'preference-reward-steering': 'Preference / reward',
  'model-editing-control': 'Model editing / control',
  'evaluation-benchmarks': 'Evaluation / benchmarks',
  'robustness-generalization': 'Robustness / generalization',
};

const steerRoleLabels = {
  core: 'Core',
  root: 'Root',
  bridge: 'Bridge',
  adjacent: 'Adjacent',
};

function renderSteerPapers() {
  const q = steerState.query.trim().toLowerCase();
  const filtered = steerState.papers
    .filter(paper => {
      const haystack = [
        paper.title,
        paper.authors,
        paper.venue,
        paper.target,
        paper.intervention,
        paper.timing,
        paper.finding,
        paper.experiments,
        paper.limitation,
        paper.future,
        ...(paper.categories || []),
      ].join(' ').toLowerCase();

      return (!q || haystack.includes(q))
        && (!steerState.category || paper.categories.includes(steerState.category))
        && (!steerState.year || String(paper.year) === steerState.year)
        && (!steerState.role || paper.role === steerState.role);
    })
    .sort((a, b) => b.year - a.year || a.title.localeCompare(b.title));

  steerEls.count.textContent = `${filtered.length} of ${steerState.papers.length} papers`;

  if (!filtered.length) {
    steerEls.list.innerHTML = '<div class="empty">No papers match those filters. Try a broader lens or clear the search.</div>';
    return;
  }

  steerEls.list.innerHTML = filtered.map((paper, index) => `
    <article class="steer-paper-card">
      <div class="steer-paper-head">
        <div class="paper-order">${String(index + 1).padStart(2, '0')}</div>
        <div>
          <div class="paper-kicker"><span class="paper-role ${paper.role}">${steerRoleLabels[paper.role] || paper.role}</span>${paper.year} · ${paper.venue}</div>
          <h3><a href="${paper.url}" target="_blank" rel="noreferrer">${paper.title} ↗</a></h3>
          <p class="authors">${paper.authors}</p>
        </div>
      </div>
      <div class="steer-paper-body">
        <div class="paper-control-spec">
          <div><b>TARGET</b><span>${paper.target}</span></div>
          <div><b>INTERVENTION</b><span>${paper.intervention}</span></div>
          <div><b>WHEN</b><span>${paper.timing}</span></div>
        </div>
        <p class="paper-finding"><span>DIRECT TAKEAWAY</span>${paper.finding}</p>
        <div class="tags">${paper.categories.map(category => `<span class="tag">${steerCategoryLabels[category] || category}</span>`).join('')}</div>
        <details class="paper-audit">
          <summary>Inspect the evidence record</summary>
          <div class="paper-audit-grid">
            <div><b>EXPERIMENTS</b><p>${paper.experiments}</p></div>
            <div><b>LIMITATION</b><p>${paper.limitation}</p></div>
            <div><b>FUTURE / OPEN</b><p>${paper.future}</p></div>
          </div>
        </details>
      </div>
    </article>
  `).join('');
}

function syncSteerFilters() {
  steerState.query = steerEls.search.value;
  steerState.category = steerEls.category.value;
  steerState.year = steerEls.year.value;
  steerState.role = steerEls.role.value;
  renderSteerPapers();
}

function setupGoalspaceLab() {
  const gainControl = document.querySelector('#gain-control');
  const leakControl = document.querySelector('#leak-control');
  const gainValue = document.querySelector('#gain-value');
  const leakValue = document.querySelector('#leak-value');
  const metricGain = document.querySelector('#metric-gain');
  const metricLeak = document.querySelector('#metric-leak');
  const metricError = document.querySelector('#metric-error');
  const actualVector = document.querySelector('#actual-vector');
  const errorVector = document.querySelector('#error-vector');
  const actualPoint = document.querySelector('#actual-point');
  const actualLabel = document.querySelector('#actual-label');

  const baseline = { x: 158, y: 244 };
  const target = { x: 400, y: 244 };
  const targetDistance = target.x - baseline.x;

  function updateGoalspace() {
    const gain = Number(gainControl.value) / 100;
    const coupling = Number(leakControl.value) / 100;
    const x = baseline.x + targetDistance * gain;
    const normalizedLeak = gain * coupling;
    const y = baseline.y - 116 * normalizedLeak;
    const normalizedError = Math.sqrt((1 - gain) ** 2 + normalizedLeak ** 2);

    gainValue.textContent = gain.toFixed(2);
    leakValue.textContent = coupling.toFixed(2);
    metricGain.textContent = `${gain.toFixed(2)}×`;
    metricLeak.textContent = Math.abs(normalizedLeak).toFixed(2);
    metricError.textContent = normalizedError.toFixed(2);

    actualVector.setAttribute('x2', x.toFixed(1));
    actualVector.setAttribute('y2', y.toFixed(1));
    errorVector.setAttribute('x2', x.toFixed(1));
    errorVector.setAttribute('y2', y.toFixed(1));
    actualPoint.setAttribute('cx', x.toFixed(1));
    actualPoint.setAttribute('cy', y.toFixed(1));
    actualLabel.setAttribute('x', Math.min(x + 10, 430).toFixed(1));
    actualLabel.setAttribute('y', (y - 8).toFixed(1));
  }

  [gainControl, leakControl].forEach(control => control.addEventListener('input', updateGoalspace));
  updateGoalspace();
}

async function initSteerability() {
  setupGoalspaceLab();

  const response = await fetch('data/steerability-papers.json');
  if (!response.ok) throw new Error(`Could not load paper database: ${response.status}`);
  steerState.papers = await response.json();
  steerEls.total.textContent = steerState.papers.length;

  Object.entries(steerCategoryLabels).forEach(([value, label]) => {
    steerEls.category.insertAdjacentHTML('beforeend', `<option value="${value}">${label}</option>`);
  });

  [...new Set(steerState.papers.map(paper => paper.year))]
    .sort((a, b) => b - a)
    .forEach(year => steerEls.year.insertAdjacentHTML('beforeend', `<option value="${year}">${year}</option>`));

  [steerEls.search, steerEls.category, steerEls.year, steerEls.role]
    .forEach(element => element.addEventListener('input', syncSteerFilters));

  steerEls.clear.addEventListener('click', () => {
    steerEls.search.value = '';
    steerEls.category.value = '';
    steerEls.year.value = '';
    steerEls.role.value = '';
    syncSteerFilters();
  });

  document.querySelectorAll('[data-steer-filter]').forEach(button => {
    button.addEventListener('click', () => {
      steerEls.category.value = button.dataset.steerFilter;
      steerState.category = button.dataset.steerFilter;
      renderSteerPapers();
      document.querySelector('#library').scrollIntoView({ behavior: 'smooth' });
    });
  });

  renderSteerPapers();
}

initSteerability().catch(error => {
  console.error(error);
  steerEls.count.textContent = 'Paper database unavailable';
  steerEls.list.innerHTML = '<div class="empty">Could not load the research database. Serve the docs directory over HTTP rather than opening the file directly.</div>';
});
