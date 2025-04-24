import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

// Configuration
const PROJECT_DIR = process.argv[2] || '.'; // Use provided path or current directory
const EXTENSIONS = ['.js', '.jsx', '.ts', '.tsx'];
const IGNORE_DIRS = ['node_modules', '.next', 'out', 'build', 'dist', '.git'];

// Patterns to look for
const ERROR_PATTERNS = [
  {
    pattern: /value\s*=\s*\{\s*\w+(?!\s*\})/g,
    description: "Unclosed curly brace after 'value={...'"
  },
  {
    pattern: /value\s*=\s*\w+(?!\s*[\s>}])/g,
    description: "Missing quotes or braces around value attribute"
  },
  {
    pattern: /<[^>]*\svalue\s*(?![=])[^>]*>/g,
    description: "value attribute without equals sign"
  },
  {
    pattern: /<[^>]*\svalue\s*=\s*(?!["'{])[^>]*>/g,
    description: "value attribute without quotes or braces"
  },
  {
    pattern: /<[^>]*\svalue\s*=\s*["']\s*\{\s*\w+\s*\}\s*["'][^>]*>/g,
    description: "Double-quoted value attribute (value=\"{state}\")"
  },
  {
    pattern: /<[^\/][^>]*(?<!\/)>(?!\s*<\/)/g,
    description: "Potentially unclosed JSX tag"
  }
];

// Function to check if a file contains JSX syntax errors
async function checkFileForErrors(filePath) {
  try {
    const content = await fs.readFile(filePath, 'utf8');
    const errors = [];

    ERROR_PATTERNS.forEach(({ pattern, description }) => {
      const matches = content.match(pattern);
      if (matches) {
        matches.forEach(match => {
          // Find line number
          const lines = content.substring(0, content.indexOf(match)).split('\n');
          const lineNumber = lines.length;
          
          errors.push({
            match: match.trim(),
            description,
            lineNumber
          });
        });
      }
    });

    return errors.length > 0 ? { filePath, errors } : null;
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error.message);
    return null;
  }
}

// Function to recursively scan directories
async function scanDirectory(dir) {
  const results = [];
  
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      
      if (entry.isDirectory()) {
        if (!IGNORE_DIRS.includes(entry.name)) {
          const subResults = await scanDirectory(fullPath);
          results.push(...subResults);
        }
      } else if (entry.isFile() && EXTENSIONS.includes(path.extname(entry.name))) {
        const fileErrors = await checkFileForErrors(fullPath);
        if (fileErrors) {
          results.push(fileErrors);
        }
      }
    }
  } catch (error) {
    console.error(`Error scanning directory ${dir}:`, error.message);
  }
  
  return results;
}

// Main function
async function findJSXErrors() {
  console.log(`Scanning for JSX syntax errors in ${PROJECT_DIR}...`);
  console.log('Focusing on "value" attribute issues and unclosed tags\n');
  
  const startTime = Date.now();
  const results = await scanDirectory(PROJECT_DIR);
  const endTime = Date.now();
  
  if (results.length === 0) {
    console.log('No potential JSX syntax errors found.');
    console.log('The error might be in a file type not scanned or in a more complex pattern.');
  } else {
    console.log(`Found ${results.length} files with potential JSX syntax errors:\n`);
    
    results.forEach(({ filePath, errors }) => {
      console.log(`\x1b[1m${filePath}\x1b[0m`);
      errors.forEach(({ match, description, lineNumber }) => {
        console.log(`  Line ${lineNumber}: ${description}`);
        console.log(`  \x1b[33m${match}\x1b[0m\n`);
      });
    });
    
    console.log('These are potential issues. Review each file carefully.');
  }
  
  console.log(`\nScan completed in ${(endTime - startTime) / 1000} seconds.`);
}

findJSXErrors();
