// Base data for dimensions. All dimensions are initially selected.
// "Performance & Accuracy" (d1), "Scalability & Flexibility" (d2) and "Out-of-the-Box Functionality" (d4)
// are marked as mandatory trade-off fields so their name and baseline weight are read-only.
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
// Their weights are read-only.
const tradeOffPairs = [
  { id: 'tp1', dimA: 'd5', dimB: 'd6', labelA: 'Autonomy & Control', labelB: 'Time-to-Market', slider: 0.5 },
  { id: 'tp2', dimA: 'd8', dimB: 'd16', labelA: 'Vendor Reputation & Stability', labelB: 'Innovation & Roadmap', slider: 0.5 },
  { id: 'tp3', dimA: 'd14', dimB: 'd1', labelA: 'Model Explainability', labelB: 'Performance & Accuracy', slider: 0.5 },
  { id: 'tp4', dimA: 'd2', dimB: 'd7', labelA: 'Scalability & Flexibility', labelB: 'Cost & TCO', slider: 0.5 },
  { id: 'tp5', dimA: 'd10', dimB: 'd4', labelA: 'Customization & Configurability', labelB: 'Out-of-the-Box Functionality', slider: 0.5 }
];

// Global variable to store additional columns configuration.
// Each object: { label: string, multipliers: { [dimensionId]: number } }
let additionalColumns = [];

// Initially, distribute weights equally among all selected dimensions.
function initializeWeights() {
  const selectedDimensions = dimensions.filter(dim => dim.selected);
  const equalWeight = selectedDimensions.length > 0 ? 100 / selectedDimensions.length : 0;
  dimensions.forEach(dim => {
    dim.baselineWeight = dim.selected ? equalWeight : 0;
  });
}

// Render the dimensions table.
function renderDimensions() {
  const tbody = document.querySelector('#dimensionsTable tbody');
  tbody.innerHTML = '';

  dimensions.forEach(dim => {
    const row = document.createElement('tr');

    // Checkbox cell (disabled for trade-off dimensions).
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

    // Dimension name cell: editable text box (read-only for trade-off metrics).
    const nameCell = document.createElement('td');
    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.value = dim.name;
    nameInput.classList.add('form-control');
    if (dim.tradeOffPair) {
      nameInput.readOnly = true;
    }
    nameInput.addEventListener('change', () => {
      dim.name = nameInput.value;
      renderDimensions();
    });
    nameCell.appendChild(nameInput);
    row.appendChild(nameCell);

    // Baseline weight cell: editable for non trade-off; read-only for trade-off.
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

// Render trade-off pair sliders.
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

// Re-distribute (normalize) baseline weights to sum to 100%.
function reNormalizeWeights() {
  const selectedDimensions = dimensions.filter(dim => dim.selected);
  const total = selectedDimensions.reduce((sum, dim) => sum + dim.baselineWeight, 0);
  if (total === 0) {
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

// Update final weights based on baseline weights and trade-off adjustments.
function updateFinalWeights() {
  dimensions.forEach(dim => {
    dim.finalWeight = dim.baselineWeight;
  });

  tradeOffPairs.forEach(pair => {
    const dimA = dimensions.find(dim => dim.id === pair.dimA);
    const dimB = dimensions.find(dim => dim.id === pair.dimB);
    if (dimA && dimB) {
      const combined = dimA.baselineWeight + dimB.baselineWeight;
      dimA.finalWeight = combined * pair.slider;
      dimB.finalWeight = combined * (1 - pair.slider);
    }
  });

  renderFinalSummary();
}

// Render additional columns configuration (dropdown to select number and editable headers).
function renderAdditionalColumnsConfig() {
  const container = document.getElementById('additionalColumnsConfig');
  container.innerHTML = '';

  const label = document.createElement('label');
  label.textContent = 'Select number of additional columns: ';
  container.appendChild(label);

  const select = document.createElement('select');
  select.classList.add('form-control');
  select.style.width = '150px';

  // Options 0 to 5.
  for (let i = 0; i <= 5; i++) {
    const option = document.createElement('option');
    option.value = i;
    option.textContent = i;
    select.appendChild(option);
  }

  select.addEventListener('change', () => {
    const count = parseInt(select.value);
    additionalColumns = [];
    for (let i = 0; i < count; i++) {
      additionalColumns.push({
        label: 'Column ' + (i + 1),
        multipliers: {} // key: dimension id, value: number
      });
    }
    updateFinalWeights();
  });

  container.appendChild(select);
}

// Render the final summary table with additional columns.
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
  headerRow.appendChild(metricHeader);

  const weightHeader = document.createElement('th');
  weightHeader.textContent = 'Final Weight (%)';
  headerRow.appendChild(weightHeader);

  additionalColumns.forEach((col, index) => {
    const extraHeader = document.createElement('th');
    const headerInput = document.createElement('input');
    headerInput.type = 'text';
    headerInput.value = col.label;
    headerInput.classList.add('form-control');
    headerInput.addEventListener('change', () => {
      additionalColumns[index].label = headerInput.value;
    });
    extraHeader.appendChild(headerInput);
    headerRow.appendChild(extraHeader);
  });

  thead.appendChild(headerRow);
  table.appendChild(thead);

  // Table body.
  const tbody = document.createElement('tbody');
  let totalFinalWeight = 0;
  dimensions.forEach(dim => {
    if (dim.selected) {
      totalFinalWeight += dim.finalWeight;
      const row = document.createElement('tr');
      // Metric name cell.
      const nameCell = document.createElement('td');
      nameCell.textContent = dim.name;
      row.appendChild(nameCell);
      // Final weight cell.
      const weightCell = document.createElement('td');
      weightCell.textContent = dim.finalWeight.toFixed(2);
      row.appendChild(weightCell);

      // For each additional column, add an input for a multiplier and a computed product.
      additionalColumns.forEach((col, index) => {
        const extraCell = document.createElement('td');
        // Create numeric input for multiplier.
        const multiplierInput = document.createElement('input');
        multiplierInput.type = 'number';
        multiplierInput.value = (col.multipliers && col.multipliers[dim.id] !== undefined) ? col.multipliers[dim.id] : 0;
        multiplierInput.classList.add('form-control');
        multiplierInput.addEventListener('change', () => {
          const value = parseFloat(multiplierInput.value) || 0;
          if (!additionalColumns[index].multipliers) {
            additionalColumns[index].multipliers = {};
          }
          additionalColumns[index].multipliers[dim.id] = value;
          computedSpan.textContent = (value * dim.finalWeight).toFixed(2);
          updateFinalSummaryTotal();
        });
        extraCell.appendChild(multiplierInput);
        // Span to show computed product.
        const computedSpan = document.createElement('span');
        computedSpan.classList.add('ml-2');
        const currentMultiplier = (col.multipliers && col.multipliers[dim.id] !== undefined) ? col.multipliers[dim.id] : 0;
        computedSpan.textContent = (currentMultiplier * dim.finalWeight).toFixed(2);
        extraCell.appendChild(computedSpan);

        row.appendChild(extraCell);
      });

      tbody.appendChild(row);
    }
  });

  // Total row.
  const totalRow = document.createElement('tr');
  const totalLabelCell = document.createElement('td');
  totalLabelCell.textContent = 'Total';
  totalRow.appendChild(totalLabelCell);

  const totalWeightCell = document.createElement('td');
  totalWeightCell.textContent = totalFinalWeight.toFixed(2);
  totalRow.appendChild(totalWeightCell);

  additionalColumns.forEach((col, index) => {
    let colSum = 0;
    dimensions.forEach(dim => {
      if (dim.selected) {
        const multiplier = (col.multipliers && col.multipliers[dim.id] !== undefined) ? col.multipliers[dim.id] : 0;
        colSum += multiplier * dim.finalWeight;
      }
    });
    const sumCell = document.createElement('td');
    sumCell.textContent = colSum.toFixed(2);
    totalRow.appendChild(sumCell);
  });

  tbody.appendChild(totalRow);
  table.appendChild(tbody);
  container.appendChild(table);
}

// Helper: Update the total row for additional columns (called on multiplier change).
function updateFinalSummaryTotal() {
  // Simply re-render the final summary.
  renderFinalSummary();
}

// Initialize UI.
initializeWeights();
renderDimensions();
renderTradeOffPairs();
updateFinalWeights();
renderAdditionalColumnsConfig();

// Attach event listener to the Normalize button.
document.getElementById('normalizeBtn').addEventListener('click', reNormalizeWeights);
