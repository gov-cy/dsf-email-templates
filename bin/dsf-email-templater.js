#!/usr/bin/env node

import { DSFEmailRenderer } from '../src/index.mjs';

const args = process.argv.slice(2);

if (args.length !== 2) {
  console.error('Usage: dsf-email-templater <input.njk> <output.html>');
  process.exit(1);
}

const [inputPath, outputPath] = args;

const renderer = new DSFEmailRenderer();

(async () => {
  try {
    await renderer.renderInFile(inputPath, outputPath);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();