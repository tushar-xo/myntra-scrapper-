document.getElementById("scrapeProduct").addEventListener("click", () => {
    const status = document.getElementById("status");
    const spinner = document.getElementById("spinner");

    status.style.display = "none"; // Hide status initially
    spinner.style.display = "block"; // Show spinner

    // Send message to content script to scrape product details
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { type: "SCRAPE_PRODUCT_DETAILS" }, (response) => {
            spinner.style.display = "none"; // Hide spinner

            if (response && response.success) { // response 1 
                status.textContent = "Yes, Scraped!";
                status.className = "success";
            } else if (response && !response.success) { // response - 1 but duplicate
                status.textContent = "Duplicate Entry!";
                status.className = "error";
            } else {
                status.textContent = "Failed to scrape product details."; // no response
                status.className = "error";
            }
            status.style.display = "block"; // Show the status message
        });
    });
});
