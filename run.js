const fs = require('fs');
const path = require('path');

// Define the root directory where you want to start the search.
const rootDirectory = __dirname; // Use the current script's directory.

// Initialize the result string.
let result = '';

// Define a function to recursively list files.
function listFiles(dir) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const relativePath = path.relative(rootDirectory, filePath).replace(/\\/g, '/');

    if (fs.statSync(filePath).isDirectory()) {
      // If it's a directory, recursively list its files.
      listFiles(filePath);
    } else {
      // If it's a file, check its extension and add it to the result string if it's not one of the ignored extensions.
      const fileExtension = filePath.substring(filePath.indexOf(".")).toLowerCase();

      if (!ignoredExtensions.includes(fileExtension)) {
        result += `resource.AddFile("${relativePath}")\n`;
      }
    }
  }
}

// Start listing files from the root directory.

// Define the list of extensions to be ignored.
const ignoredExtensions = [
  '.vtf',
  '.vvd',
  '.ani',
  '.dx80.vtx',
  '.dx90.vtx',
  '.sw.vtx',
  '.phy',
  '.jpg',
  '.ani',
];

// Start listing files from the root directory.
listFiles(rootDirectory);

// Output the result string.
console.log(result);
fs.writeFileSync("data.txt",result);