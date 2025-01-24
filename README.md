# Paylocity Jobs Scraper

# Project Name

This repo contains node scripts to web scrape paylocity job posting pages, a job imports aggregator and a simple web server with an api endpoint 

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)

## Features

List the key features of your project. For example:

- Scraper - Node script that pulls the jobs from a paylocity web page. The pages contain json that contain an array of jobs. Using puppeteer, javascript is excuted againt the page to extract the json and save it to a file in the imports folder
- Datastore - Node script that take each file in the imports folder and consolidates all the json jobs array into one file called datastore.json
- Webserver - Node script that runs an express.js server for an api that return the jobs data.

## Installation

Step-by-step instructions to install and set up your project locally:

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

The scrapper should be run first but not before setting the urls and file name at the bottom of the script

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


