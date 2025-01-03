chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "SCRAPE_PRODUCT_DETAILS") {
        const productDetails = {
            productId: window.location.pathname.split("/")[4] || '',
            brandName: document.querySelector('.pdp-title')?.textContent.trim() || '',
            productName: document.querySelector('.pdp-name')?.textContent.trim() || '',
            currentPrice: document.querySelector('.pdp-price')?.textContent.trim() || '',
            mrp: '₹' + (document.querySelector('.pdp-mrp')?.textContent.trim().replace(/[^\d]/g, '') || ''),
            discount: document.querySelector('.pdp-discount')?.textContent.trim() || '',
            imageUrl: document.querySelector('.image-grid-image')?.style.backgroundImage.replace(/url\(["'](.*?)["']\)/, '$1') || '',
        };

        console.log("Scraped Product Details:", productDetails);

        // Send product details to background script
        chrome.runtime.sendMessage(
            { type: "SAVE_PRODUCT_DETAILS", productDetails },
            (response) => {
                sendResponse(response); // Forward the response back to popup.js
            }
        );

        return true; // Indicates asynchronous response
    }
});
