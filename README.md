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

- `bin` contains the command line tools
- `src` contains the source files  
    - `src\njk` contain the nunjucks source base and macros
    - `src\templates` contain the template files used to build the html files
- `build` contains the build HTML files 
- `test` contains the scripts for testing 

## Bulding with nunjucks components

Use `npm run built` to built the email html file by defining the input and output as arguments. For example:

```shell
npm run build .\src\built-with-nunjucks.js .\src\njk\templates\submission-email.njk .\build\submission-email.html
```

Note for non-Windows users: you may need to replace regular slashes ( `\` ) with backslashes ( `/` ) in all the paths of the above commands.

## Testing

### Mailtrap 

Send test email on you mailtrap account. 
  
To run the script takes 1 argument which is the path of HTML file for the body of the email

for example:
  
```shell
npm run test build/submission-email.html
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
