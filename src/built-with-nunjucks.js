const nunjucks = require('nunjucks');
const fs = require('fs');

// async..await is not allowed in global scope, must use a wrapper
async function main() {
  try {
    const myArgs = process.argv.slice(2);
    
    if (myArgs.length < 2) {
      console.log('ERROR: Argument not specified. Specify the path input njk file and the output.');
      process.exit(1);
    }

    // Configure Nunjucks to load templates from the src/components directory
    const env = nunjucks.configure('src/njk');
    // Load your component templates
    const theTemplate = await fs.readFileSync(myArgs[0], 'utf8');
    // Render the components with data
    const renderedFile = await nunjucks.renderString(theTemplate, {});
    console.log(renderedFile); 
    await fs.writeFileSync(myArgs[1], renderedFile);
  } catch (error) {
   console.error(error);
  }
}  
main().catch(console.error);

