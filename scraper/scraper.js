// Import the Puppeteer library
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// Function to fetch and save webpage's JSON data
const getWebPageContentAndSave = async (url, filename) => {
  try {
    // Launch a new browser instance
    const browser = await puppeteer.launch();

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
  const url1 = 'https://recruiting.paylocity.com/recruiting/jobs/All/58719e28-3ea1-47ab-b11e-1fcd3cff5b03/U-S-Tsubaki-Power-Transmission-LLC?location=All%20Locations&department=All%20Departments'; // Replace with your desired URL
  const filename1 = 'pageData1.json'; // Replace with your desired filename
  
  const url2 = 'https://recruiting.paylocity.com/recruiting/jobs/All/a5f3629e-f97d-44ee-beff-2fd934df9426/US-Tsubaki-Automotive-LLC'; // Replace with your desired URL
  const filename2 = 'pageData2.json'; // Replace with your desired filename
  try {
    await getWebPageContentAndSave(url1, filename1);
    await getWebPageContentAndSave(url2, filename2);
  } catch (error) {
    console.error('Failed to fetch or save webpage content:', error);
  }
})();