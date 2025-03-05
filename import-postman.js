const { exec } = require('child_process');
const fs = require('fs');

const APIDOC_FILE_PATH = './postman.json';

// Read the apidoc.json file
const collectionJson = JSON.parse(fs.readFileSync(APIDOC_FILE_PATH, 'utf8'));

// Save the collection to a temporary file
const tempFilePath = './temp-collection.json';
fs.writeFileSync(tempFilePath, JSON.stringify(collectionJson));

// Import the collection using Newman
exec(`newman run ${tempFilePath}`, (error, stdout, stderr) => {
  if (error) {
    console.error('Error importing collection:', error.message);
    return;
  }
  console.log('Collection imported successfully:', stdout);
});