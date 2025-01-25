const fs = require("fs");
const path = require("path");

exports.handler = async (event, context) => {
  try {
    // Load datastore.json from the static files
    //const filePath = path.resolve(__dirname, "../../dist/datastore.json");

    const baseDir = process.env.BASE_DIR || __dirname;
    const filePath = path.resolve(__dirname, "data/datastore.json");

    const data = fs.readFileSync(filePath, "utf-8");
    return {
      statusCode: 200,
      body: data,
      headers: {
        "Content-Type": "application/json",
      },
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to load data" }),
    };
  }
};
