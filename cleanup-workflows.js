/**
 * Cleanup script for GitHub Actions workflows
 * 
 * This script helps clean up old workflow files after consolidating them
 * into a single consolidated.yml file.
 */

const fs = require('fs');
const path = require('path');

const workflowsDir = path.join('.github', 'workflows');
const filesToRemove = [
  'cd.yml',
  'ci.yml',
  'main.yml',
  'test-and-build.yml',
  // Add any other workflow files you want to remove
];

console.log('Starting workflow cleanup...');

// Check if consolidated.yml exists
if (!fs.existsSync(path.join(workflowsDir, 'consolidated.yml'))) {
  console.error('Error: consolidated.yml does not exist. Please create it first.');
  process.exit(1);
}

// Remove old workflow files
let removedCount = 0;
for (const file of filesToRemove) {
  const filePath = path.join(workflowsDir, file);
  
  if (fs.existsSync(filePath)) {
    try {
      fs.unlinkSync(filePath);
      console.log(`✅ Removed: ${file}`);
      removedCount++;
    } catch (err) {
      console.error(`❌ Error removing ${file}: ${err.message}`);
    }
  } else {
    console.log(`⚠️ File not found: ${file}`);
  }
}

console.log(`\nCleanup complete. Removed ${removedCount} workflow files.`);
console.log('\nNext steps:');
console.log('1. Commit and push these changes to your repository');
console.log('2. Go to GitHub Actions in your repository');
console.log('3. Disable any "Deploy to Railway" workflow that might be defined in the GitHub UI');
console.log('4. Verify that your new consolidated workflow runs correctly'); 