# DSF-email-templates

Use this project to produce html email templates to be used by DSF. These emails should:

- Follow the HTML best practices for emails (for example max-width: 600px, use of inline styling)
- Minimize the risk of being stuck in “SPAM”
- Make sure it works well with most email clients
- Be responsive (work well on desktop and mobiles)
- Follow accessibility guidelines
- Include the gov.cy branding

The project uses https://mjml.io/ to generate templates which are the simplified manually. 

The project also uses https://mailtrap.io/ for spam analysis and to verify HTML compatibility 

Compatibility with clients: https://mjml.io/faq#use-mjml

## Install

You need to have [Node.js](https://nodejs.org/en/) installed.

### 1. Download the tool

### 2. Install modules

Navigate to your local copies folder though the command line and Run the following command `npm install`

## Project structure

- Source files (in mjml format) are stored under `src` folder 
- Build file (the HTML files built with mjml) are stored under `build` folder
- Distribution files (the templates and components to be used by the DSF services) are stored under `dist` folder
- Scripts for tesing are under the `test` folder

## Bulding with MJML

If your are using Visual Studio Code, you can use the MJML plugin to view the changes visually. 

To save the HTML result to a file of your choice use:


```shell
node_modules\.bin\mjml src\submission-success-2.mjml -o build\examples\submission-success-2.html 
```

You can also watch a file to automatically update the output file (index.html) on any changes:

```shell
node_modules\.bin\mjml --watch src\submission-success-2.mjml -o build\examples\submission-success-2.html 
```

Note for non-Windows users: you may need to replace regular slashes ( `\` ) with backslashes ( `/` ) in all the paths of the above commands.

## Testing

### Mailtrap 

Send test email on you mailtrap account. 
  
To run the script takes 1 argument which is the path of HTML file for the body of the email

for example:
  
```shell
node .\test\mailtrap.js build/examples/submission-success-example.html
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

