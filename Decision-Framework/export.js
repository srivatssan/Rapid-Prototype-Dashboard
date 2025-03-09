// Function to export the final summary table as a CSV file (which Excel can open)
function exportTableToCSV(filename) {
  var csv = [];
  // Select all rows from the final summary table
  var rows = document.querySelectorAll("#finalSummary table tr");
  for (var i = 0; i < rows.length; i++) {
    var row = [], cols = rows[i].querySelectorAll("td, th");
    for (var j = 0; j < cols.length; j++) {
      // Escape quotes and wrap text in quotes
      row.push('"' + cols[j].innerText.replace(/"/g, '""') + '"');
    }
    csv.push(row.join(","));
  }

  // Create a Blob from the CSV data
  var csvFile = new Blob([csv.join("\n")], { type: "text/csv" });

  // Create a temporary link to trigger download
  var downloadLink = document.createElement("a");
  downloadLink.download = filename;
  downloadLink.href = window.URL.createObjectURL(csvFile);
  downloadLink.style.display = "none";
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
}

// Attach click event to the Export button
document.getElementById("exportBtn").addEventListener("click", function() {
  exportTableToCSV("final_weights.csv");
});
