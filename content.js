function sanitizeFilename(name) {
    return name.replace(/[^a-zA-Z0-9_-]/g, "_"); // Replace special characters with underscores
}

function downloadCSV(csvContent, tableName, tableIndex) {
    let now = new Date();
    
    // Generate timestamp in YYYYMMDD_HHMMSS format
    let year = now.getFullYear();
    let month = String(now.getMonth() + 1).padStart(2, '0');
    let day = String(now.getDate()).padStart(2, '0');
    let hours = String(now.getHours()).padStart(2, '0');
    let minutes = String(now.getMinutes()).padStart(2, '0');
    let seconds = String(now.getSeconds()).padStart(2, '0');

    let timestamp = `${year}${month}${day}_${hours}${minutes}${seconds}`;

    // Create a sanitized filename with table name (if exists) and table index
    let filename = tableName 
        ? `${sanitizeFilename(tableName)}_${timestamp}.csv` 
        : `table_${tableIndex}_${timestamp}.csv`;

    let blob = new Blob([csvContent], { type: "text/csv" });
    let a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

function tableToCSV() {
    let tables = document.querySelectorAll("table");

    if (tables.length === 0) {
        return;
    }

    tables.forEach((table, index) => {
        // Get table name from the caption or default to "table_N"
        let tableName = table.querySelector("caption") ? table.querySelector("caption").innerText.trim() : null;

        let rows = Array.from(table.querySelectorAll("tr"));
        let csvContent = rows.map(row => {
            let cols = Array.from(row.querySelectorAll("td, th"));
            return cols.map(col => `"${col.innerText}"`).join(",");
        }).join("\n");

        downloadCSV(csvContent, tableName, index + 1);
    });
}

// Create a button for downloading the selected rows as CSV
let downloadButton = document.createElement("button");
downloadButton.innerText = "Download Table";
downloadButton.style.position = "fixed";
downloadButton.style.bottom = "10px"; // Move to bottom
downloadButton.style.left = "10px"; // Keep it at the left
downloadButton.style.padding = "10px 20px";
downloadButton.style.fontSize = "16px";
downloadButton.style.backgroundColor = "#4CAF50";
downloadButton.style.color = "white";
downloadButton.style.border = "none";
downloadButton.style.cursor = "pointer";
downloadButton.style.zIndex = "1000"; // Make sure it's on top of other elements
downloadButton.style.borderRadius = "8px"; // Optional: Rounded corners
downloadButton.style.boxShadow = "2px 2px 10px rgba(0,0,0,0.2)"; // Optional: Shadow effect

// Append the button to the body
document.body.appendChild(downloadButton);


// Trigger the table export when the button is clicked
downloadButton.addEventListener("click", function() {
    tableToCSV();
});
