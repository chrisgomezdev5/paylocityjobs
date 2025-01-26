//const fs = require("fs");
//const path = require("path");
const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  try {
    const baseUrl = process.env.NETLIFY_URL || 'http://localhost:8888/dist/datastore.json';
    const response = await fetch(baseUrl);
    const jsonData = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(jsonData),
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error' }),
    };
  }
};
