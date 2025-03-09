// Base data for dimensions. All dimensions are initially selected.
// "Performance & Accuracy" (d1), "Scalability & Flexibility" (d2) and "Out-of-the-Box Functionality" (d4) are marked as mandatory trade-off fields.
const dimensions = [
  { id: 'd1', name: 'Performance & Accuracy', selected: true, baselineWeight: 0, finalWeight: 0, tradeOffPair: 'tp3' },
  { id: 'd2', name: 'Scalability & Flexibility', selected: true, baselineWeight: 0, finalWeight: 0, tradeOffPair: 'tp4' },
  { id: 'd3', name: 'Security & Data Privacy', selected: true, baselineWeight: 0, finalWeight: 0 },
  { id: 'd4', name: 'Out-of-the-Box Functionality', selected: true, baselineWeight: 0, finalWeight: 0, tradeOffPair: 'tp5' },
  { id: 'd5', name: 'Autonomy & Control', selected: true, baselineWeight: 0, finalWeight: 0, tradeOffPair: 'tp1' },
  { id: 'd6', name: 'Time-to-Market', selected: true, baselineWeight: 0, finalWeight: 0, tradeOffPair: 'tp1' },
  { id: 'd7', name: 'Cost & TCO', selected: true, baselineWeight: 0, finalWeight: 0, tradeOffPair: 'tp4' },
  { id: 'd8', name: 'Vendor Reputation & Stability', selected: true, baselineWeight: 0, finalWeight: 0, tradeOffPair: 'tp2' },
  { id: 'd9', name: 'Customer Support & SLAs', selected: true, baselineWeight: 0, finalWeight: 0 },
  { id: 'd10', name: 'Customization & Configurability', selected: true, baselineWeight: 0, finalWeight: 0, tradeOffPair: 'tp5' },
  { id: 'd11', name: 'Deployment Options', selected: true, baselineWeight: 0, finalWeight: 0 },
  { id: 'd12', name: 'Compliance & Regulatory Alignment', selected: true, baselineWeight: 0, finalWeight: 0 },
  { id: 'd13', name: 'Data Governance & Management', selected: true, baselineWeight: 0, finalWeight: 0 },
  { id: 'd14', name: 'Model Explainability & Transparency', selected: true, baselineWeight: 0, finalWeight: 0, tradeOffPair: 'tp3' },
  { id: 'd15', name: 'Ethical Considerations & Bias Mitigation', selected: true, baselineWeight: 0, finalWeight: 0 },
  { id: 'd16', name: 'Innovation & Technology Roadmap', selected: true, baselineWeight: 0, finalWeight: 0, tradeOffPair: 'tp2' },
  { id: 'd17', name: 'Ecosystem & Community Support', selected: true, baselineWeight: 0, finalWeight: 0 },
  { id: 'd18', name: 'Intellectual Property & Licensing Terms', selected: true, baselineWeight: 0, finalWeight: 0 },
  { id: 'd19', name: 'Operational Reliability & Uptime', selected: true, baselineWeight: 0, finalWeight: 0 },
  { id: 'd20', name: 'Training, Enablement & Documentation', selected: true, baselineWeight: 0, finalWeight: 0 },
  { id: 'd21', name: 'Risk Management & Regulatory Risks', selected: true, baselineWeight: 0, finalWeight: 0 }
];

// Trade-off pairs (each pair compares two opposing dimensions)
// These dimensions are mandatory and their weights are read-only.
const tradeOffPairs = [
  { id: 'tp1', dimA: 'd5', dimB: 'd6', labelA: 'Autonomy & Control', labelB: 'Time-to-Market', slider: 0.5 },
  { id: 'tp2', dimA: 'd8', dimB: 'd16', labelA: 'Vendor Reputation & Stability', labelB: 'Innovation & Roadmap', slider: 0.5 },
  { id: 'tp3', dimA: 'd14', dimB: 'd1', labelA: 'Model Explainability', labelB: 'Performance & Accuracy', slider: 0.5 },
  { id: 'tp4', dimA: 'd2', dimB: 'd7', labelA: 'Scalability & Flexibility', labelB: 'Cost & TCO', slider: 0.5 },
  { id: 'tp5', dimA: 'd10', dimB: 'd4', labelA: 'Customization & Configurability', labelB: 'Out-of-the-Box Functionality', slider: 0.5 }
];

// Initially, distribute weights equally among all selected dimensions.
function initializeWeights() {
  const selectedDimensions = dimensions.filter(dim => dim.selected);
  const equalWeight = selectedDimensions.length > 0 ? 100 / selectedDimensions.length : 0;
  dimensions.forEach(dim => {
    if (dim.selected) {
      dim.baselineWeight = equalWeight;
    } else {
      dim.baselineWeight = 0;
    }
  });
}

// Render the dimensions table.
function renderDimensions() {
  const tbody = document.querySelector('#dimensionsTable tbody');
  tbody.innerHTML = '';

  dimensions.forEach(dim => {
    const row = document.createElement('tr');

    // Checkbox cell (disabled if dimension is part of a trade-off pair).
    const selectCell = document.createElement('td');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = dim.selected;
    if (dim.tradeOffPair) {
      checkbox.disabled = true;
    }
    checkbox.addEventListener('change', () => {
      dim.selected = checkbox.checked;
      renderDimensions();
      updateFinalWeights();
    });
    selectCell.appendChild(checkbox);
    row.appendChild(selectCell);

    // Dimension name cell: editable text box.
    const nameCell = document.createElement('td');
    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.value = dim.name;
    nameInput.classList.add('form-control');
    // Disable editing if the dimension is marked as trade-off.
    if (dim.tradeOffPair) {
      nameInput.readOnly = true;
    }
    nameInput.addEventListener('change', () => {
      dim.name = nameInput.value;
      renderDimensions();
    });
    nameCell.appendChild(nameInput);
    row.appendChild(nameCell);

    // Baseline weight cell: editable for non trade-off dimensions; read-only for trade-off ones.
    const baselineCell = document.createElement('td');
    const baselineInput = document.createElement('input');
    baselineInput.type = 'number';
    baselineInput.value = dim.baselineWeight.toFixed(2);
    baselineInput.classList.add('form-control');
    if (dim.tradeOffPair) {
      baselineInput.readOnly = true;
    } else {
      baselineInput.addEventListener('change', () => {
        dim.baselineWeight = parseFloat(baselineInput.value) || 0;
        updateFinalWeights();
      });
    }
    baselineCell.appendChild(baselineInput);
    row.appendChild(baselineCell);

    // Final weight display cell.
    const finalCell = document.createElement('td');
    finalCell.textContent = dim.finalWeight.toFixed(2);
    row.appendChild(finalCell);

    tbody.appendChild(row);
  });
}

// Render trade-off pair sliders (always present since these metrics are mandatory).
function renderTradeOffPairs() {
  const container = document.getElementById('tradeOffPairs');
  container.innerHTML = '';
  tradeOffPairs.forEach(pair => {
    const div = document.createElement('div');
    div.classList.add('mb-3');

    const label = document.createElement('label');
    label.textContent = pair.labelA + " vs. " + pair.labelB;
    div.appendChild(label);

    const sliderContainer = document.createElement('div');
    sliderContainer.classList.add('d-flex', 'align-items-center');

    const valueSpan = document.createElement('span');
    valueSpan.classList.add('mr-2', 'slider-value');
    valueSpan.textContent = pair.slider;
    sliderContainer.appendChild(valueSpan);

    const slider = document.createElement('input');
    slider.type = 'range';
    slider.min = 0;
    slider.max = 1;
    slider.step = 0.01;
    slider.value = pair.slider;
    slider.classList.add('form-control-range');
    slider.style.flex = "1";
    slider.addEventListener('input', () => {
      pair.slider = parseFloat(slider.value);
      valueSpan.textContent = pair.slider;
      updateFinalWeights();
      renderDimensions();
    });
    sliderContainer.appendChild(slider);
    div.appendChild(sliderContainer);

    container.appendChild(div);
  });
}

// Re-distribute (normalize) the baseline weights so they sum to 100% based on current inputs.
function reNormalizeWeights() {
  const selectedDimensions = dimensions.filter(dim => dim.selected);
  const total = selectedDimensions.reduce((sum, dim) => sum + dim.baselineWeight, 0);
  if (total === 0) {
    // If total is 0, distribute equally.
    const equalWeight = selectedDimensions.length > 0 ? 100 / selectedDimensions.length : 0;
    selectedDimensions.forEach(dim => {
      dim.baselineWeight = equalWeight;
    });
  } else {
    selectedDimensions.forEach(dim => {
      dim.baselineWeight = (dim.baselineWeight / total) * 100;
    });
  }
  renderDimensions();
  updateFinalWeights();
}

// Update final weights based on baseline weights and trade-off slider adjustments.
function updateFinalWeights() {
  // Start with final weight equal to baseline weight.
  dimensions.forEach(dim => {
    dim.finalWeight = dim.baselineWeight;
  });

  // Adjust final weights for each trade-off pair.
  tradeOffPairs.forEach(pair => {
    const dimA = dimensions.find(dim => dim.id === pair.dimA);
    const dimB = dimensions.find(dim => dim.id === pair.dimB);
    if (dimA && dimB) {
      const combined = dimA.baselineWeight + dimB.baselineWeight;
      // Slider value: 0 gives full weight to dimB; 1 gives full weight to dimA.
      dimA.finalWeight = combined * pair.slider;
      dimB.finalWeight = combined * (1 - pair.slider);
    }
  });

  renderFinalSummary();
}

// Render the final summary as a table.
function renderFinalSummary() {
  const container = document.getElementById('finalSummary');
  container.innerHTML = '';

  const table = document.createElement('table');
  table.classList.add('table', 'table-bordered');

  // Table header.
  const thead = document.createElement('thead');
  const headerRow = document.createElement('tr');
  const metricHeader = document.createElement('th');
  metricHeader.textContent = 'Metric';
  const weightHeader = document.createElement('th');
  weightHeader.textContent = 'Final Weight (%)';
  headerRow.appendChild(metricHeader);
  headerRow.appendChild(weightHeader);
  thead.appendChild(headerRow);
  table.appendChild(thead);

  // Table body.
  const tbody = document.createElement('tbody');
  let total = 0;
  dimensions.forEach(dim => {
    if (dim.selected) {
      const row = document.createElement('tr');
      const nameCell = document.createElement('td');
      nameCell.textContent = dim.name;
      const weightCell = document.createElement('td');
      weightCell.textContent = dim.finalWeight.toFixed(2);
      total += dim.finalWeight;
      row.appendChild(nameCell);
      row.appendChild(weightCell);
      tbody.appendChild(row);
    }
  });

  // Total row.
  const totalRow = document.createElement('tr');
  const totalLabelCell = document.createElement('td');
  totalLabelCell.textContent = 'Total';
  const totalValueCell = document.createElement('td');
  totalValueCell.textContent = total.toFixed(2);
  totalRow.appendChild(totalLabelCell);
  totalRow.appendChild(totalValueCell);
  tbody.appendChild(totalRow);

  table.appendChild(tbody);
  container.appendChild(table);
}

// Initialize the UI.
initializeWeights();
renderDimensions();
renderTradeOffPairs();
updateFinalWeights();

// Attach event listener to the Normalize button.
document.getElementById('normalizeBtn').addEventListener('click', reNormalizeWeights);
