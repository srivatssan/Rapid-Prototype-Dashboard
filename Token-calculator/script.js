// script.js
document.addEventListener("DOMContentLoaded", function () {
  // Define model details including conversion factor and separate cost per token for input and output.
  // Now, the prices represent the cost per 1000 tokens.
  const modelDetails = {
    claude32: {
      description: "Claude 3.2: 1 token per 4 characters.",
      conversionFactor: 4,
      inputPricePerToken: 0.005,  // Price per 1000 tokens
      outputPricePerToken: 0.015, // Price per 1000 tokens
    },
    claude35: {
      description: "Claude 3.5: 1 token per 3 characters.",
      conversionFactor: 3,
      inputPricePerToken: 0.005,  // Price per 1000 tokens
      outputPricePerToken: 0.015, // Price per 1000 tokens
    },
    amazonTitan: {
      description: "Amazon Titan: 1 token per 3 characters.",
      conversionFactor: 3,
      inputPricePerToken: 0.0005,  // Price per 1000 tokens
      outputPricePerToken: 0.0015, // Price per 1000 tokens
    },
  };

  // DOM Elements
  const modelSelect = document.getElementById("modelSelect");
  const inputChars = document.getElementById("inputChars");
  const outputChars = document.getElementById("outputChars");
  const inputTokenCostField = document.getElementById("inputTokenCost");
  const outputTokenCostField = document.getElementById("outputTokenCost");
  const tokenDescriptionDiv = document.getElementById("tokenDescription");
  const calculateBtn = document.getElementById("calculateBtn");
  const resultAlert = document.getElementById("resultAlert");
  const resultMessage = document.getElementById("resultMessage");

  // Function to update token description and cost input defaults based on model selection
  function updateTokenDescription() {
    const selectedModel = modelSelect.value;
    const details = modelDetails[selectedModel];

    // Update the description div
    tokenDescriptionDiv.innerHTML = `<div class="alert alert-info">
      ${details.description} <br/>
      <strong>Default Input Cost per 1000 Tokens:</strong> $${details.inputPricePerToken.toFixed(3)}<br/>
      <strong>Default Output Cost per 1000 Tokens:</strong> $${details.outputPricePerToken.toFixed(3)}
    </div>`;

    // Populate the cost input fields with default values
    inputTokenCostField.value = details.inputPricePerToken;
    outputTokenCostField.value = details.outputPricePerToken;
  }

  // Update description and cost fields on model change and on initial page load
  modelSelect.addEventListener("change", updateTokenDescription);
  updateTokenDescription();

  // Calculate token counts and costs when button is clicked
  calculateBtn.addEventListener("click", function () {
    const selectedModel = modelSelect.value;
    const details = modelDetails[selectedModel];

    // Retrieve the character counts; default to 0 if not provided
    const inputCount = parseInt(inputChars.value, 10) || 0;
    const outputCount = parseInt(outputChars.value, 10) || 0;

    // Calculate tokens (using ceiling to round up fractional tokens)
    const inputTokens = Math.ceil(inputCount / details.conversionFactor);
    const outputTokens = Math.ceil(outputCount / details.conversionFactor);

    // Retrieve cost per token values from the input fields (allowing user overrides)
    const inputCostPerToken = parseFloat(inputTokenCostField.value) || details.inputPricePerToken;
    const outputCostPerToken = parseFloat(outputTokenCostField.value) || details.outputPricePerToken;

    // Calculate costs based on the provided cost per 1000 tokens values
    const inputCost = (inputTokens / 1000) * inputCostPerToken;
    const outputCost = (outputTokens / 1000) * outputCostPerToken;
    const totalCost = inputCost + outputCost;

    // Display results in the green pop-up banner with detailed pricing information
    resultMessage.innerHTML = `
      <strong>Input Tokens:</strong> ${inputTokens}
        (<em>Cost: $${inputCost.toFixed(3)} @ $${inputCostPerToken.toFixed(3)} per 1000 tokens</em>)<br/>
      <strong>Output Tokens:</strong> ${outputTokens}
        (<em>Cost: $${outputCost.toFixed(3)} @ $${outputCostPerToken.toFixed(3)} per 1000 tokens</em>)<br/>
      <strong>Total Cost:</strong> $${totalCost.toFixed(3)}
    `;
    resultAlert.classList.remove("d-none");
  });
});
