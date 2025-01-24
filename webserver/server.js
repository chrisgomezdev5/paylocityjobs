// Import required modules
const express = require('express');
const fs = require('fs');
const path = require('path');

// Create an instance of Express
const app = express();

// Define the port to run the server
const PORT = process.env.PORT || 3000;

// Define the path to the JSON file
const DATASTORE_PATH = path.join(__dirname, 'datastore.json');

// API endpoint to get JSON data
app.get('/api/data', (req, res) => {
    fs.readFile(DATASTORE_PATH, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading the JSON file:', err);
            return res.status(500).json({ error: 'Failed to read data' });
        }

        try {
            const jsonData = JSON.parse(data);
            res.json(jsonData);
        } catch (parseError) {
            console.error('Error parsing the JSON file:', parseError);
            res.status(500).json({ error: 'Invalid JSON format' });
        }
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});