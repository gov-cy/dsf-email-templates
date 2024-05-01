# Changelog
 
All notable changes to this project will be documented in this file.
 
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [v2.0.2] - 2024-05-01

### Changed 
- `dsf-email-templater` use `fs/promises` to load and save files
- `mailtrap-njk` use `fs/promises` to load files

### Removed
- Removed use of `fs/promises`, `saveFile()` and `renderFromFile()` from `DSFEmailRenderer`

## [v2.0.1] - 2024-04-30

### Fixed
- Fixed bug defining string `params` as json for `DSFEmailRenderer.renderFromJson`. For example now `params` are defined as `params:{title:'title part'}` instead of `"params:{title:'title part'}"` 

## [v2.0.0] - 2024-04-23

Restructure of the `govcyBase.njk`. Success now is part of the body and removed salutation from header.

### Added
- `lang` parameter in all components with text content
- `bodySuccess.njk` which renders success panel inside the body

### Changed
- body vertical spacing

### Removed
- Unnecessary templates
- `success` block from `govcyBase.njk` and templates
- `success.njk`. It is replaced by `bodySuccess.njk` which is rendered in the body block 
- Salutation from header. If needed can now be a paragraph inside the body

## [v1.0.9] - 2024-04-23

### Changed
- Added npm shield in readme.md 

## [v1.0.7] - 2024-04-22

### Added
- publish to NPM in workflow 

### Changed
- Changed mailtrap workflow to built the email html before it send's it

## [v1.0.6] - 2024-04-21

### Added
- mailtrap workflow 

## [v1.0.4] - 2024-04-20

### Added
- tag and version workflow
- unit test workflow 

## [v1.0.4] - 2024-04-20

### Added
- tag and version workflow
- unit test workflow 

## [v1.0.3] - 2024-04-20

### Changed
- Updated `bodyList` to have better margin in Outlook

## [v1.0.2] - 2024-04-14

### Added
- `DSFEmailRenderer.renderFromJson` 
- `DSFEmailRenderer.renderFromString` 
- `DSFEmailRenderer.renderFromFile` 
- `DSFEmailRenderer.saveFile` 
- Added unit tests for generated HTML `test\moca\unit.test.js`
- Added mailtrap tests that generates and sends email from njk file `test\mailtrap-njk.js`

### Changed
- Updates to load njk directory when package is linked to another project
- Changed the way `DSFEmailRenderer`. Now everything revolves around the `renderFromString` function
- Changed `bodyHeading.njk`, `bodyList.njk`, `bodyHeading.njk` to include reusable code from paragraph

### Fixed
- Fixed `bodyList` to be a paragraph of it's own

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