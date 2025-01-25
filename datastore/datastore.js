const fs = require('fs');
const path = require('path');

const importsFolder = path.join(__dirname, '../scraper/imports');
//const outputFilePath = path.join(__dirname, '../dist/datastore.json');
const outputFilePath = path.join(__dirname, '../netlify/functions/datastore.json');

(async () => {
  try {
    // Check if imports folder exists
    if (!fs.existsSync(importsFolder)) {
      console.error(`Folder "${importsFolder}" does not exist.`);
      return;
    }

    const files = fs.readdirSync(importsFolder);
    let combinedJobs = [];

    // Loop through all .json files in the imports folder
    for (const file of files) {
      if (file.endsWith('.json')) {
        const filePath = path.join(importsFolder, file);
        try {
          const fileContent = fs.readFileSync(filePath, 'utf-8');
          const jsonData = JSON.parse(fileContent);

          if (Array.isArray(jsonData.Jobs)) {
            combinedJobs = combinedJobs.concat(jsonData.Jobs);
          } else {
            console.warn(`File ${file} does not contain a valid "Jobs" array.`);
          }
        } catch (error) {
          console.error(`Error reading or parsing file ${file}:`, error.message);
        }
      }
    }

    // Save the combined Jobs array to datastore.json
    fs.writeFileSync(outputFilePath, JSON.stringify(combinedJobs, null, 2), 'utf-8');
    console.log(`Combined Jobs array written to "${outputFilePath}" successfully.`);

  } catch (error) {
    console.error('An error occurred:', error.message);
  }
})();