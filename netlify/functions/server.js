const fs = require("fs");
const path = require("path");

exports.handler = async (event, context) => {
  try {
    // Load datastore.json from the static files
    //const filePath = path.resolve(__dirname, "../../dist/datastore.json");

    //const baseDir = process.env.BASE_DIR || __dirname;
    //const filePath = path.resolve(baseDir, "dist/datastore.json");

    //const data = fs.readFileSync(filePath, "utf-8");





    function getConcatenatedNames(directory) {
        let concatenatedNames = "";
      
        function traverseDir(dir) {
          // Read all files and folders in the directory
          const items = fs.readdirSync(dir);
      
          items.forEach((item) => {
            const fullPath = path.join(dir, item);
      
            // Add the item name to the concatenated string
            concatenatedNames += item;
      
            // If it's a directory, recurse into it
            if (fs.statSync(fullPath).isDirectory()) {
              traverseDir(fullPath);
            }
          });
        }
      
        traverseDir(directory);
        return concatenatedNames;
      }
      
      // Example usage
      const concatenatedNames = getConcatenatedNames(__dirname);



    return {
      statusCode: 200,
      body: concatenatedNames,
      headers: {
        //"Content-Type": "application/json",
        "Content-Type": "text/html; charset=utf-8",
      },
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to load data" }),
    };
  }
};
