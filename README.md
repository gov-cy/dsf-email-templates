# DSF-email-templates

Use this project to produce html email templates to be used by DSF. Ideally these emails should be responsive and have a similar appearance in different email clients and devices.

The project uses https://mjml.io/ to generate it's templates

Compatibility with clients: https://mjml.io/faq#use-mjml

## Install

You need to have [Node.js](https://nodejs.org/en/) installed.

### 1. Download the tool

### 2. Install modules

Navigate to your local copies folder though the command line and Run the following command `npm install`

## Project structure

- Source files (in mjml format) are stored under `src` folder 
- Build file (the actual HTML files ) are stored under `build` folder
- Scripts for tesing are under the `test` folder

## After the installation

If your are using Visual Studio Code, you can use the MJML plugin to view the changes visually. 

To save the HTML result to a file of your choice use:

```
node_modules\.bin\mjml src\submission-success-2.mjml -o build\submission-success-2.html 
```

You can also watch a file to automatically update the output file (index.html) on any changes:

```
node_modules\.bin\mjml --watch src\submission-success-2.mjml -o build\submission-success-2.html 
```

Note for non-Windows users: you may need to replace regular slashes ( `\` ) with backslashes ( `/` ) in all the paths of the above commands.
