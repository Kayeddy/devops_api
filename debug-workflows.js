const fs = require('fs');
const path = require('path');

// Function to recursively find all YAML files
function findYamlFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      findYamlFiles(filePath, fileList);
    } else if (file.endsWith('.yml') || file.endsWith('.yaml')) {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

// Function to check if a file contains a string
function fileContainsString(filePath, searchString) {
  const content = fs.readFileSync(filePath, 'utf8');
  return content.includes(searchString);
}

// Find all YAML files
const yamlFiles = findYamlFiles('.');
console.log('All YAML files in the repository:');
yamlFiles.forEach(file => console.log(file));

// Check which files contain "railway up --detach"
console.log('\nFiles containing "railway up --detach":');
yamlFiles.forEach(file => {
  if (fileContainsString(file, 'railway up --detach')) {
    console.log(file);
    
    // Print the line containing the string
    const content = fs.readFileSync(file, 'utf8');
    const lines = content.split('\n');
    lines.forEach((line, index) => {
      if (line.includes('railway up --detach')) {
        console.log(`  Line ${index + 1}: ${line.trim()}`);
      }
    });
  }
}); 