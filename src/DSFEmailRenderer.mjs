import nunjucks from 'nunjucks';
import fs from 'fs/promises';

/**
 * Used to render emails based on govcy components
 */
export default class DSFEmailRenderer {
  /**
   * The class constructor. Configures nunjucks 
   * 
   * @param {sting} templateDirectory The path of the njk macros
   */
    constructor(templateDirectory = 'src/njk') {
        this.templateDirectory = templateDirectory;
        nunjucks.configure(templateDirectory);
      }
    /**
     * Renders the email html in file, based on an input template  
     * 
     * @param {string} templatePath The path of the template to used as input
     * @param {string} outputPath The path of the output html file
     */
      async renderInFile(templatePath, outputPath) {
        try {
          // Load template
          const templateContent = await fs.readFile(templatePath, 'utf8');
          
          // Render template
          const renderedContent = nunjucks.renderString(templateContent, {});
          
          console.log(renderedContent); 
          // Write rendered content to output file
          await fs.writeFile(outputPath, renderedContent);
          console.log(`File rendered and saved to ${outputPath}`);
        } catch (error) {
          throw new Error(`Error rendering template: ${error.message}`);
        }
      }
}