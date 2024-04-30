import nunjucks from 'nunjucks';
import fs from 'fs/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

/**
 * Used to render emails based on govcy components
 */
export default class DSFEmailRenderer {
  /**
   * The class constructor. Configures nunjucks 
   * 
   * @param {sting} templateDirectory The path of the njk macros
   */
    constructor() {
        
        const __dirname = dirname(fileURLToPath(import.meta.url));
        // console.log(__dirname)

        // Construct the absolute path to the template directory
        const templateDirectory = join(__dirname, 'njk');
        nunjucks.configure(templateDirectory);
      }
    /**
     * Renders the email html in file, based on an input html string
     * 
     * @param {string} inputHTML The input
     * @param {string} outputPath The path of the output html file
     */
      async saveFile(inputHTML, outputPath) {
        try { 
          // Write rendered content to output file
          await fs.writeFile(outputPath, inputHTML);
          console.log(`File rendered and saved to ${outputPath}`);
        } catch (error) {
          throw new Error(`Error rendering template: ${error.message}`);
        }
      }
    /**
     * Returns the rendered email html as string, based on the nunjucks templates
     * 
     * @param {string} input The input
     * @returns {string} Rendered email html as string
     */
      renderFromString(input) {
          // Render template
          const renderedContent = nunjucks.renderString(input, {});
          //console.log(renderedContent);
          // Return the rendered template
          return renderedContent;
      }

      /**
       * Renders the email html, based on an input template 
       * 
       * @param {string} templatePath The path of the template to used as input
       * @returns {string} Rendered email html as string
       */
      async renderFromFile(templatePath) {
        // Load template
        const templateContent = await fs.readFile(templatePath, 'utf8');
        // Render template
        const renderedContent = this.renderFromString(templateContent);
        return renderedContent; 
      }

      /**
       * Returns the rendered email html as string, based on the input json object
       * 
       * @param {object} jsonInput The input object
       * @returns {string} Rendered email html as string
       */
      renderFromJson(jsonInput) {
        //build the template from the jsonInput
        let jsonTemplate = `{% extends "govcyBase.njk" %}
        {% from "govcyEmailElement.njk" import govcyEmailElement %}
        {% block lang %}${jsonInput.lang}{% endblock %}
        {% block subject %}${jsonInput.subject}{% endblock %}
        `
        //if there is a pre-header
        if (jsonInput.hasOwnProperty('pre')){
          jsonTemplate += `{% block pre -%}{{ govcyEmailElement ('preHeader',{preText:'${jsonInput.pre}'
        }) }}{%- endblock %}`
        }
        //if there is a header
        if (jsonInput.hasOwnProperty('header')){
          jsonTemplate += `
            {% block header -%}
              {{ govcyEmailElement ('header',{serviceName:'${jsonInput.header.serviceName}'
                ${jsonInput.header.hasOwnProperty("lang")? `,lang:'${jsonInput.header.lang}'`:``}
              }) }}
            {%- endblock %}`
        }
        //if there is a footer
        if (jsonInput.hasOwnProperty('footer')){
          jsonTemplate += `
            {% block footer -%}
              {{ govcyEmailElement ('footer',{footerText:'${jsonInput.footer.footerText}'
              ${jsonInput.footer.hasOwnProperty("lang")? `,lang:'${jsonInput.footer.lang}'`:``} }) }}
            {%- endblock %}`
        }
        //if there is a body 
        if (jsonInput.hasOwnProperty('body')){
          jsonTemplate += `{% block body -%}
            {% call govcyEmailElement('body') -%}`
          // for each element in the body
          jsonInput.body.forEach(bodyElement => {
            //add body email element in template
            jsonTemplate += `
            {% call govcyEmailElement('${bodyElement.component}',${JSON.stringify(bodyElement.params)}) -%}
              ${bodyElement.body}
            {%- endcall %}
            `
          });
          jsonTemplate += `{%- endcall%}
          {% endblock -%}`
        }

        // Render template
        const renderedContent = this.renderFromString(jsonTemplate); 
        return renderedContent;
      }
}