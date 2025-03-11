/* script.js */

// Enable Bootstrap popovers
document.addEventListener("DOMContentLoaded", function () {
    let popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    let popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl);
    });
});

// Navigation Buttons
document.getElementById("submitBtn")?.addEventListener("click", function() {
    window.location.href = "review.html";
});

document.getElementById("prevBtn")?.addEventListener("click", function() {
    window.history.back();
});

document.getElementById("generateCodeBtn")?.addEventListener("click", function() {
    window.location.href = "generated_code.html";
});

// Handle cancel button
document.getElementById("cancelBtn")?.addEventListener("click", function() {
    window.location.href = "index.html";
});

// Change label text when selecting API
document.getElementById("api")?.addEventListener("change", function() {
    document.getElementById("domFileLabel").textContent = "API Specification File:";
});

// Change label back when selecting UI
document.getElementById("ui")?.addEventListener("change", function() {
    document.getElementById("domFileLabel").textContent = "DOM File:";
});

// Placeholder actions for Run & Save
document.getElementById("runTestBtn")?.addEventListener("click", function() {
    alert("Running the test...");
});

document.getElementById("saveTestSuiteBtn")?.addEventListener("click", function() {
    alert("Test case saved to test suite!");
});

/* script.js */

// Placeholder actions for buttons
document.getElementById("suggestPromptBtn")?.addEventListener("click", function() {
    alert("Suggesting a better prompt...");
});

document.getElementById("editBtn")?.addEventListener("click", function() {
    alert("Editing the test script...");
});

document.getElementById("acceptScriptBtn")?.addEventListener("click", function() {
    alert("Test script accepted!");
});
