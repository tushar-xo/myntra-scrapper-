const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser'); // body-parser for scrapping

const app = express();

const cors = require('cors'); 
app.use(cors());

// Middleware to parse JSON bodies - read the json data !
app.use(bodyParser.json()); 

// MySQL connection setup
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', 
    password: 'password',  
    database: 'myntra', 
});

// Endpoint to save product details
app.post('/api/saveProductDetails', (req, res) => {
    const productDetails = req.body;
    console.log("Received Product Details:", productDetails);

    const query = `INSERT INTO products (product_id, brand_name, product_name, current_price, mrp, discount, image_url) 
                   VALUES (?, ?, ?, ?, ?, ?, ?)`;

    // Ensure that current_price is numeric - remove the Rupee sign using regex
    const currentPrice = parseFloat(
        typeof productDetails.currentPrice === 'string'
        ? productDetails.currentPrice.replace(/[^\d.-]/g, '') 
        : productDetails.currentPrice
    ) || 0;

    // Ensure that mrp is numeric - remove the Rupee sign using regex
    const mrp = parseFloat(
        typeof productDetails.mrp === 'string'
            ? productDetails.mrp.replace(/[^\d.-]/g, '')
            : productDetails.mrp
    ) || 0;

    const values = [
        productDetails.productId,
        productDetails.brandName,
        productDetails.productName,
        currentPrice,
        mrp,
        productDetails.discount,
        productDetails.imageUrl,
    ];

    db.execute(query, values, (err, result) => {
        if (err) {
            console.error("Error saving product details:", err);
            return res.status(500).send('Failed to save product details');
        }
        console.log("Product details saved successfully:", result);
        res.status(200).json({ success: true }); // saved to DB succesfully
    });
});


// Start the server
app.listen(5002, () => {
  console.log('Server running on port 5002');
});
