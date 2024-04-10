# DSF-email-templates

Use this project to produce html email templates to be used by DSF. These emails should:

- Follow the HTML best practices for emails (for example max-width: 600px, use of inline styling)
- Minimize the risk of being stuck in “SPAM”
- Make sure it works well with most email clients
- Be responsive (work well on desktop and mobiles)
- Follow accessibility guidelines
- Include the gov.cy branding

The project uses [nunjucks](https://mozilla.github.io/nunjucks/) templates to built the email html.

The project also uses https://mailtrap.io/ for spam analysis and to verify HTML compatibility 

Compatibility with clients based on mailtrap test on 2024-04-10

| Client     | Desktop | Mobile | Web  | 
| ------     | ------- | ------ |----- |
| Apple mail | 97%     |  95%   | 100% |
| Gmail      | 100%    |  89%   | 92%  |
| Outlook    | 80%     |  93%   | 94%  |
| Yahoo Mail | 100%    |  80%   | 80%  |
| Other      | 100%    |  89%   | 89%  |

## Install

You need to have [Node.js](https://nodejs.org/en/) installed.

### 1. Download the tool

### 2. Install modules

Navigate to your local copies folder though the command line and Run the following command `npm install`

## Project structure

- `src`contains the source files  
    - `src\njk` contain the nunjucks source base and macros
    - `src\templates` contain the template files used to build the html files
- `build` contains the build HTML files 
- `dist` contains the distribution files (the templates and components to be used by the DSF services)
- `test` contains the scripts for testing 

## Bulding with nunjucks components

Use `src\built-with-nunjucks.js` to built the email html file by defining the input and output as arguments. For example:

```shell
node .\src\built-with-nunjucks.js .\src\njk\templates\submission-email.njk .\build\test.html
```

Note for non-Windows users: you may need to replace regular slashes ( `\` ) with backslashes ( `/` ) in all the paths of the above commands.

## Testing

### Mailtrap 

Send test email on you mailtrap account. 
  
To run the script takes 1 argument which is the path of HTML file for the body of the email

for example:
  
```shell
node .\test\mailtrap.js build/test.html
```
  
Note that to use you need to set the mailtrap username and password as follows:
  
On powershell
```shell
$env:MAILTRAP_USERNAME = 'xxxxxxxxx'
$env:MAILTRAP_PASSWORD = 'yyyyyyyy'
```

On windows
```shell
set MAILTRAP_USERNAME=xxxxxxxxx
set MAILTRAP_PASSWORD=yyyyyyyy
```

On Unix 
```shell
export MAILTRAP_USERNAME=xxxxxxxxx
export MAILTRAP_PASSWORD=yyyyyyyy
```

in javascript
```javascript
cap['browserstack.username'] = process.env.MAILTRAP_USERNAME || 'xxxxxxxxx';
cap['browserstack.accessKey'] = process.env.MAILTRAP_PASSWORD || 'yyyyyyyy';
```

### Putsmail

Use https://www.putsmail.com/ to send sample html emails 

## Distribute

Run `node .\src\distribute.js` to create the update the files of the `dist` folder
