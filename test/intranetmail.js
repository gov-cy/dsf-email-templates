"use strict";
/**
 * Send test email on you mailtrap account. 
 * 
 * To run the script takes 1 argument which is the path of HTML file for the body of the email
 * 
 * for example:
 * 
 * ```
 * node .\test\mailtrap.js build/submission-success-example.html
 * ```
 * 
 * Note that to use you need to set the mailtrap username and password as followes:
 * 
 * ```
 * #on powershell
 * $env:MAILTRAP_USERNAME = 'xxxxxxxxx'
 * $env:MAILTRAP_PASSWORD = 'yyyyyyyy'

 * #on windows
 * set MAILTRAP_USERNAME=xxxxxxxxx
 * set MAILTRAP_PASSWORD=yyyyyyyy

 * # On Unix 
 * export MAILTRAP_USERNAME=xxxxxxxxx
 * export MAILTRAP_PASSWORD=yyyyyyyy

 * #in javascript
 * cap['browserstack.username'] = process.env.MAILTRAP_USERNAME || 'xxxxxxxxx';
 * cap['browserstack.accessKey'] = process.env.MAILTRAP_PASSWORD || 'yyyyyyyy';
 * ```
 * 
 */
const nodemailer = require("nodemailer");
const fs = require("fs");
const { exit } = require("process");

// async..await is not allowed in global scope, must use a wrapper
async function main() {

  const myArgs = process.argv.slice(2);
  
  if (myArgs.length < 2) {
    console.log('ERROR: Arguments not specified. Specify 1) the path of the HTML file for the body of the email, 2) the list of receivers.');
    process.exit(1);
  }
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "10.189.31.116",
    port: 25,
    tls: {
        rejectUnauthorized: false
    }
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    //from: '"Fred Foo 👻" <foo@example.com>', // sender address
    from: 'noreply@dits.dmrid.gov.cy', // sender address
    to: myArgs[1], // list of receivers
    subject: "{{SERVICE-NAME}}2", // Subject line
    text: `
    Clear text`, // plain text body
    html: fs.readFileSync(myArgs[0])
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

main().catch(console.error);