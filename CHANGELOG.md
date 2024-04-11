# Changelog
 
All notable changes to this project will be documented in this file.
 
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [v1.0.1] - 2024-04-11

Complete restructure to prepare to be used as an NPM Package

### Added
- `CHANGELOG.md` 
- Module classes `src\DSFEmailRender.mjs` and `src\index.mjs` 
- Command line use with `bin\dsf-email-templater.js` and `bin\dsf-email-templater.cmd` 

### Changed
- Complete restructure to work with a DSFEmailRender class and prepare to be used as an NPM Package
- Updated `package.json` to work as type module and prepare to be used as NPM Package
- Updated `README.md`
- Updated `mailtrap.js` to work as ES Module

### Removed
- `dist` folder and all files not used with the new structure.

## [v1.0.0] - 2024-04-10
### Changed
- Total redesign. Removed mjml, added nunjucks templates to built emails the DSF way