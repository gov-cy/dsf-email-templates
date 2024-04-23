Notes for the project

## Project structure

- `bin` contains the command line tools
- `src` contains the source files  
    - `src\njk` contain the nunjucks source base and macros
    - `src\templates` contain the template files used to build the html files
- `build` contains the build HTML files 
- `test` contains the scripts for testing 

## Testing

### Unit tests

Run `npm test`

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
