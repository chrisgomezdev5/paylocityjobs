# Paylocity Jobs Scraper

This repo contains node scripts to web scrape paylocity job posting pages, a job imports aggregator and a simple web server with an api endpoint 

Deployment to Netlify now supported through serverless functions and GitHub Actions

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)

## Features

List the key features of your project. For example:

- Scraper - Node script that pulls the jobs from a paylocity web page. The pages contain json that contain an array of jobs. Using puppeteer, javascript is excuted againt the page to extract the json and save it to a file in the imports folder
- Datastore - Node script that take each file in the imports folder and consolidates all the json jobs array into one file called datastore.json
- Webserver - Node script that runs an express.js server for an api that return the jobs data.
-netlify\functions\server - Serverless function that returns the datastore json for deployement to Netlify

## Netilfy & GitHub Actions
Solution now supports Netfily serverless functions and GitHub Action Workflows

- netlify\functions\server.js returns the json data contained in dist\datasource.json
- netlify.toml - Netlify configuration
- main.yml - GitHub Actions workflow to build the datasource.json file and deploy it and  the serverless function to Netlify

## Installation

Step-by-step instructions to install and set up your project locally (Go to Serverless Installation for Netlify and GitHub):

1. Clone the repository:
   ```bash
   [git clone https://github.com/your-username/your-repository.git](https://github.com/chrisgomezdev5/paylocityjobs.git)
   ```
2. Navigate to the project directory:
   ```bash
   cd scraper
   ```
3. Install dependencies (if applicable):
   ```bash
   npm install
   ```
4. Navigate to the project directory:
   ```bash
   cd webserver
   ```
5. Install dependencies (if applicable):
   ```bash
   npm install
   ```

## Usage

The scrapper should be run first but not before creating a file called input.json with a list of urls and filename in json form. An example file, sampleinput.json, is included.

```bash
node scraper.js
```

Then the datastore script is run to consolidate all of the imports 

```bash
node datastore.js
```

Finally the webserver script is started to run the server hosting the api.

```bash
node server.js
```

The jobs from the api can then be used by a front-end search engine.

## Serverless Installation
1. Create new project in Netlify from the connected GitHub repo

2. Add an environment variable called NETLIFY_URL and set to https://YOURPROJECTNAME.netlify.app/datastore.json

3. Add the following environment variables to the GitHub repo:
   1. NETLIFY_AUTH_TOKEN 
   2. NETLIFY_SITE_ID

The GitHub Actions workflow will build and deploy to Netlify and the serverless function will return the data through:

https://YOURPROJECTNAME.netlify.app/.netlify/functions/server

There is also a 4 hour cron job that runs the GitHub workflow every four hours.

