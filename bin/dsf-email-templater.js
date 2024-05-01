#!/usr/bin/env node

import { DSFEmailRenderer } from '../src/index.mjs';
import fs from 'fs/promises';

const args = process.argv.slice(2);

if (args.length !== 2) {
  console.error('Usage: dsf-email-templater <input.njk> <output.html>');
  process.exit(1);
}

const [inputPath, outputPath] = args;

const renderer = new DSFEmailRenderer();

(async () => {
  try {
    // Load template
    const templateContent = await fs.readFile(inputPath, 'utf8');
    // Render template
    const inputTemplate = renderer.renderFromString(templateContent);
    try { 
      // Write rendered content to output file
      await fs.writeFile(outputPath, inputTemplate);
      console.log(`File rendered and saved to ${outputPath}`);
    } catch (error) {
      throw new Error(`Error rendering template: ${error.message}`);
    }
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();