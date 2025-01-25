// Import the Puppeteer library
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// Function to fetch and save webpage's JSON data
const getWebPageContentAndSave = async (url, filename) => {
  try {
    // Launch a new browser instance
    const browser = await puppeteer.launch({
      args: ['--no-sandbox'],
      timeout: 10000,
    });

    // Open a new page in the browser
    const page = await browser.newPage();

    // Navigate to the specified URL
    await page.goto(url, {
      waitUntil: 'networkidle2', // Wait for the network to be idle
    });

    // Extract and parse the JSON from pageData
    const pageDataJSON = await page.evaluate(() => {
      try {
        return window.pageData;
      } catch (error) {
        console.error('Failed to parse pageData:', error);
        return null;
      }
    });

    // Close the browser
    await browser.close();

    if (pageDataJSON) {
      // Ensure the imports directory exists
      const importsDir = path.resolve(__dirname, 'imports');
      if (!fs.existsSync(importsDir)) {
        fs.mkdirSync(importsDir);
      }

      // Save the JSON data to a file
      const filePath = path.resolve(importsDir, filename);
      fs.writeFileSync(filePath, JSON.stringify(pageDataJSON), 'utf8');

      console.log(`JSON data saved to: ${filePath}`);
    } else {
      console.error('No JSON data found in window.pageData');
    }
  } catch (error) {
    console.error('Error fetching or saving page content:', error);
    throw error;
  }
};

// Example usage
(async () => {
  try {
    // Read URLs and filenames from a JSON file
    const inputFilePath = path.resolve(__dirname, 'input.json');
    const inputData = JSON.parse(fs.readFileSync(inputFilePath, 'utf8'));

    // Loop through each entry and process
    for (const { url, filename } of inputData) {
      await getWebPageContentAndSave(url, filename);
    }
  } catch (error) {
    console.error('Failed to fetch or save webpage content:', error);
  }
})();