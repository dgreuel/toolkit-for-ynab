const axios = require('axios');
const fs = require('fs');
const path = require('path');
const yargs = require('yargs').argv;
const unzip = require('unzip');
const zlib = require('zlib');
const https = require('https');


const API_PREFIX = 'https://api.crowdin.com/api/project/toolkit-for-ynab';
const API_KEY = yargs.key;
const DOWNLOAD_FILE_PATH = path.join(__dirname, 'all.zip');
const EXTRACT_PATH = path.join(__dirname, '/extract');
const apiParams = {
  json: true,
  key: API_KEY
};

if (!API_KEY) {
  console.log('API_KEY is required. (node localization.js --key <KEY>)');
  process.exit();
}

function getProgressedLocalizations() {
  return axios({
    url: `${API_PREFIX}/status`,
    params: apiParams
  }).then(({ data }) => {
    return data.filter(({ translated_progress: progress }) => progress !== 0);
  }).catch((error) => {
    console.error('Error fetching status', error);
  });
}

function downloadLocalizations() {
  return axios({
    url: `${API_PREFIX}/export`,
    params: apiParams
  }).then(() => {
    return axios({
      url: `${API_PREFIX}/download/all.zip`,
      params: apiParams,
      responseType: 'stream'
    }).then((resp) => {
      resp.data.pipe(fs.createWriteStream(DOWNLOAD_FILE_PATH));
    }).catch((error) => {
      console.error('Error fetching download', error);
    });
  }).catch((error) => {
    console.error('Error initializing export', error);
  });
}

function extractLocalizations(progressed) {
  // zlib.gunzipSync(fs.readFileSync(DOWNLOAD_FILE_PATH));
}

getProgressedLocalizations()
  .then((progressed) => {
    return downloadLocalizations().then(() => {
      extractLocalizations(progressed);
    });
  });
