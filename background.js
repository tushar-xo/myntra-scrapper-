chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "SAVE_PRODUCT_DETAILS") {
        const productDetails = message.productDetails;

        fetch("http://localhost:5002/api/saveProductDetails", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(productDetails),
        })
        .then((response) => response.json())
        .then((data) => {
            console.log("API Response:", data);
            sendResponse({ success: data.success, message: data.message });
        })
        .catch((error) => {
            console.error("Error saving product details:", error);
            sendResponse({ success: false, error: error.message });
        });

        return true;
    }
});
