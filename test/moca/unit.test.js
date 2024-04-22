import { expect } from 'chai';
import { DSFEmailRenderer } from '../../src/index.mjs';


const renderer = new DSFEmailRenderer();

describe('1. Testing `DSFEmailRenderer.renderFromString`, use of `govcyBase.njk` and `macros`', () => {
    const inputString = `
        {% extends "govcyBase.njk" %}
        {% from "govcyEmailElement.njk" import govcyEmailElement %}
        {% set lang='el'%}
        {% block lang %}{{lang}}{% endblock %}
        {% block subject %}Service email{% endblock %}
        {% block pre -%}{{ govcyEmailElement ('preHeader',{preText:'The pre header text'}) }}{%- endblock %}
        {% block header -%}{{ govcyEmailElement ('header',{serviceName:'Service name', name:'First and Last name',lang:lang}) }}{%- endblock %}
        {% block success -%}{{ govcyEmailElement ('success',{title:'title part', body:'body part'}) }}{%- endblock %}
        {% block body -%}
            {% call govcyEmailElement('body') -%}
                {% call govcyEmailElement('bodyParagraph') -%}Paragraph{%- endcall %}
                {% call govcyEmailElement('bodyHeading',{headinLevel:1}) -%}Heading 1{%- endcall %}
                {% call govcyEmailElement('bodyHeading',{headinLevel:2}) -%}Heading 2{%- endcall %}
                {% call govcyEmailElement('bodyHeading',{headinLevel:3}) -%}Heading 3{%- endcall %}
                {% call govcyEmailElement('bodyHeading',{headinLevel:4}) -%}Heading 4{%- endcall %}
            {% endcall %}
        {% endblock %}
        {% block footer -%}
            {{ govcyEmailElement ('footer',{footerText:'Όνομα υπηρεσίας'}) }}
        {%- endblock %}
        `;
    let renderedHTML = renderer.renderFromString(inputString);
    //perform render checks
    renderChecks(renderedHTML, '1.');
});

describe('2. Testing `DSFEmailRenderer.renderFromJson`', () => {
    let inputJson={
        lang: "el",
        subject: "Service email",
        pre: "The pre header text",
        header: {serviceName:'Service name', name:'First and Last name'},
        success: {
            title:'title part',
            body:'body part'
        },
        body: [
            {"component": "bodyParagraph", body:"Paragraph"},
            {"component": "bodyHeading",params: '{"headinLevel":1}',body:"Heading 1"},
            {"component": "bodyHeading",params: '{"headinLevel":2}',body:"Heading 2"},
            {"component": "bodyHeading",params: '{"headinLevel":3}',body:"Heading 3"},
            {"component": "bodyHeading",params: '{"headinLevel":4}',body:"Heading 4"},
        ],
        footer: {
            footerText: "Name of service"
        }
    }
    let renderedHTML = renderer.renderFromJson(inputJson);
    //perform render checks
    renderChecks(renderedHTML, '2.');
});

/**
 * Perform tests on rendered HTML
 * 
 * @param {string} renderedHTML The rendered HTML 
 * @param {string} checksNum The prefix of the checksNum 
 */
function renderChecks(renderedHTML, checksNum){
    it(checksNum+'1 `renderFromString` should render html doctype', async () => {
        expect(renderedHTML).to.include('<!doctype html>');
    });
    it(checksNum+'2 `renderFromString` should render html tag', async () => {
        expect(renderedHTML).to.include(`<html lang="el" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">`);
        expect(renderedHTML).to.include(`</html>`);
    });
    it(checksNum+'3 `renderFromString` should render head section', async () => {
        expect(renderedHTML).to.include(`<head>`);
        expect(renderedHTML).to.include(`<title>Service email</title>`);
        expect(renderedHTML).to.include(`<!--[if !mso]><!-->`);
        expect(renderedHTML).to.include(`<meta http-equiv="X-UA-Compatible" content="IE=edge">`);
        expect(renderedHTML).to.include(`<!--<![endif]-->`);
        expect(renderedHTML).to.include(`<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">`);
        expect(renderedHTML).to.include(`<meta name="viewport" content="width=device-width, initial-scale=1">`);
        expect(renderedHTML).to.include(`</head>`);
    });
    it(checksNum+'4 `renderFromString` should render `<title>SUBJECT</title>`', async () => {
        expect(renderedHTML).to.include(`<title>Service email</title>`);
    });
    it(checksNum+'5 `renderFromString` should render the body with the right table things and closing html', async () => {
        expect(renderedHTML).to.include(`<body>`);
        // Define the regular expression to match the expected segment
        const expectedRegex = /<body>([\s\S]*?)<table border="0" cellpadding="0" cellspacing="0" width="100%">\s*<tr>\s*<td align="center">\s*<!--\[if mso\]>\s* <table align="center" border="0" cellspacing="0" cellpadding="0" width="600">\s*<tr>\s*<td align="center" valign="top" width="600">\s*<!\[endif\]-->([\s\S]*?)<!--\[if mso\]>\s*<\/td>\s*<\/tr>\s*<\/table>\s*<!\[endif\]-->\s*<\/td>\s*<\/tr>\s*<\/table>\s*<\/body>\s*<\/html>/;
        // Check if the rendered HTML matches the regular expression pattern
        expect(renderedHTML).to.match(expectedRegex);
        expect(renderedHTML).to.include(`</body>`);
    });
    it(checksNum+'6 `pre` block and `preHeader` macro render as expected', async () => {
        // Define the regular expression to match the expected segment
        const expectedRegex = /<body>([\s\S]*?)<!-- PRE HEADER TEXT -->\s*<div style="display:none;font-size:1px;color:#ffffff;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;">The pre header text<\/div>/;
        // Check if the rendered HTML matches the regular expression pattern
        expect(renderedHTML).to.match(expectedRegex);
    });
    it(checksNum+'7 `header` block and `header` macro render as expected', async () => {
        // check for structure 
        let expectedRegex = /<body>([\s\S]*?)<!-- HEADER -->\s*<table([\s\S]*?)>\s*<tr([\s\S]*?)>\s*<td([\s\S]*?)>\s*<img([\s\S]*?)>\s*<\/td([\s\S]*?)>\s*<\/tr([\s\S]*?)>\s*<tr([\s\S]*?)>\s*<td([\s\S]*?)>\s*<div([\s\S]*?)>([\s\S]*?)<\/div>\s*<\/td([\s\S]*?)>\s*<\/tr([\s\S]*?)>\s*<tr([\s\S]*?)>\s*<td([\s\S]*?)>\s*<div([\s\S]*?)>([\s\S]*?)<\/div>\s*<\/td([\s\S]*?)>\s*<\/tr([\s\S]*?)>([\s\S]*?)<\/table>/;
        expect(renderedHTML).to.match(expectedRegex);
        // table style 
        expectedRegex = /<body>([\s\S]*?)<!-- HEADER -->\s*<table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;" >/;
        expect(renderedHTML).to.match(expectedRegex);
        // 1st td 
        expectedRegex = /<body>([\s\S]*?)<td align="left" valign="top" style="padding: 12px 16px 0px;background:#31576f;background-color:#31576f;">/;
        expect(renderedHTML).to.match(expectedRegex);
        // 2st td 
        expectedRegex = /<body>([\s\S]*?)<td align="left" valign="top" style="padding:0px 16px 12px;border-bottom: 4px solid #ffad2d;background:#31576f;background-color:#31576f;">/;
        expect(renderedHTML).to.match(expectedRegex);
        // service name div 
        expectedRegex = /<body>([\s\S]*?)<div style="font-family:Arial;font-size:18px;line-height:1.5;text-align:left; color:#ffffff;" >/;
        expect(renderedHTML).to.match(expectedRegex);
        // 3rd td 
        expectedRegex = /<body>([\s\S]*?)<td align="center" valign="top" style="padding:20px 16px;">/;
        expect(renderedHTML).to.match(expectedRegex);
        // salutation name div 
        expectedRegex = /<body>([\s\S]*?)<div style="font-family:Arial;font-size:16px;line-height:1.5;text-align:left;" >/;
        expect(renderedHTML).to.match(expectedRegex);
    });
    it(checksNum+'8 `success` block and `success` macro render as expected', async () => {
        //check for structure 
        let expectedRegex = /<body>([\s\S]*?)<!-- SUCCESS -->\s*<table([\s\S]*?)>\s*<tr([\s\S]*?)>\s*<td([\s\S]*?)>\s*<div([\s\S]*?)>([\s\S]*?)<\/div>\s*<\/td([\s\S]*?)>\s*<\/tr([\s\S]*?)>\s*<tr([\s\S]*?)>\s*<td([\s\S]*?)>\s*<div([\s\S]*?)>([\s\S]*?)<\/div>\s*<\/td([\s\S]*?)>\s*<\/tr([\s\S]*?)>([\s\S]*?)<\/table>/;
        expect(renderedHTML).to.match(expectedRegex);
        // table style
        expectedRegex = /<body>([\s\S]*?)<table border="0" cellpadding="0" cellspacing="0" width="100%" style="padding:10px 0;max-width: 600px;background:#00703c;background-color:#00703c;" >/;
        expect(renderedHTML).to.match(expectedRegex);
        //success title style
        expectedRegex = /<body>([\s\S]*?)<div style="font-family:helvetica;font-size:24px;font-weight:bold;line-height:1.5;text-align:center;color:#ffffff;">([\s\S]*?)<\/div>/;
        expect(renderedHTML).to.match(expectedRegex);
        //success body style
        expectedRegex = /<body>([\s\S]*?)<div style="font-family:Arial;font-size:18px;line-height:1.5;text-align:center;color:#ffffff;">([\s\S]*?)<\/div>/;
        expect(renderedHTML).to.match(expectedRegex);
    });
    it(checksNum+'9 `bodyParagraph` macro render as expected', async () => {
        // Define the regular expression to match the expected segment
        const expectedRegex = /<body>([\s\S]*?)<tr>\s*<td align="center" valign="top" style="padding:10px 16px;">\s*<div style="font-family:Arial;font-size:16px;line-height:1.5;text-align:left;" >\s*Paragraph\s*<\/div>\s*<\/td>\s*<\/tr>/;
        // Check if the rendered HTML matches the regular expression pattern
        expect(renderedHTML).to.match(expectedRegex);
    });
    it(checksNum+'10 `bodyHeading` macro render as expected', async () => {
        // Heading 1
        let expectedRegex = /<body>([\s\S]*?)<tr>\s*<td align="center" valign="top" style="padding:10px 16px;">\s*<div style="font-family:Arial;font-size:16px;line-height:1.5;text-align:left;" >\s*<h1 style="font-size:28px;font-weight:700;margin: 0;">\s*Heading 1\s*<\/h1>\s*<\/div>\s*<\/td>\s*<\/tr>/;
        expect(renderedHTML).to.match(expectedRegex);
        // Heading 2
        expectedRegex = /<body>([\s\S]*?)<tr>\s*<td align="center" valign="top" style="padding:10px 16px;">\s*<div style="font-family:Arial;font-size:16px;line-height:1.5;text-align:left;" >\s*<h2 style="font-size:24px;font-weight:700;margin: 0;">\s*Heading 2\s*<\/h2>\s*<\/div>\s*<\/td>\s*<\/tr>/;
        expect(renderedHTML).to.match(expectedRegex);
        // Heading 3
        expectedRegex = /<body>([\s\S]*?)<tr>\s*<td align="center" valign="top" style="padding:10px 16px;">\s*<div style="font-family:Arial;font-size:16px;line-height:1.5;text-align:left;" >\s*<h3 style="font-size:20px;font-weight:700;margin: 0;">\s*Heading 3\s*<\/h3>\s*<\/div>\s*<\/td>\s*<\/tr>/;
        expect(renderedHTML).to.match(expectedRegex);
        // Heading 4
        expectedRegex = /<body>([\s\S]*?)<tr>\s*<td align="center" valign="top" style="padding:10px 16px;">\s*<div style="font-family:Arial;font-size:16px;line-height:1.5;text-align:left;" >\s*<h4 style="font-size:18px;font-weight:700;margin: 0;">\s*Heading 4\s*<\/h4>\s*<\/div>\s*<\/td>\s*<\/tr>/;
        expect(renderedHTML).to.match(expectedRegex);
    });
    it(checksNum+'11 `footer` block and `footer` macro render as expected', async () => {
        //check for structure 
        let expectedRegex = /<body>([\s\S]*?)<table([\s\S]*?)>\s*<tr([\s\S]*?)>\s*<td([\s\S]*?)>\s*<div([\s\S]*?)>\s*<a([\s\S]*?)>\s*<strong([\s\S]*?)>([\s\S]*?)<\/strong>\s*<\/a>\s*<\/div>\s*<div([\s\S]*?)>([\s\S]*?)<\/div>\s*<\/td([\s\S]*?)>\s*<\/tr([\s\S]*?)>\s*<\/table>/;
        expect(renderedHTML).to.match(expectedRegex);
        // td style
        expectedRegex = /<body>([\s\S]*?)<td align="center" valign="top" style="padding:10px 16px 10px;border-top: 4px solid #ffad2d;background:#ebf1f3;background-color:#ebf1f3;">/;
        expect(renderedHTML).to.match(expectedRegex);
        // govcy div style
        expectedRegex = /<body>([\s\S]*?)<div style="font-family:Arial; font-size: 24px;text-align:left;margin-bottom: 10px;line-height:1;">/;
        expect(renderedHTML).to.match(expectedRegex);
        // govcy a style
        expectedRegex = /<body>([\s\S]*?)<a href="https:\/\/gov.cy" style="color:#000000; text-decoration: none;font-weight: 500;">/;
        expect(renderedHTML).to.match(expectedRegex);
        // govcy strong style
        expectedRegex = /<body>([\s\S]*?)<strong style="color:#000000; text-decoration: none;font-weight: 500;">/;
        expect(renderedHTML).to.match(expectedRegex);
        // footer second line style
        expectedRegex = /<body>([\s\S]*?)<div style="font-family:Arial;font-size:16px;text-align:left;margin-bottom: 10px;line-height:1;" >/;
        expect(renderedHTML).to.match(expectedRegex);
    });
}
