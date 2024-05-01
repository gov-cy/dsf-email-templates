"use strict";
/**
 * Send test email on you mailtrap account. 
 * 
 * To run the script takes 1 argument which is the path of t file for the body of the email
 * 
 * for example:
 * 
 * ```
 * node .\test\mailtrap.js build/test.html
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
import nodemailer from 'nodemailer';
import fs from 'fs/promises';
import { DSFEmailRenderer } from '../src/index.mjs';
import { exit } from 'process';

// async..await is not allowed in global scope, must use a wrapper
async function testMailtrap() {
  
  const myArgs = process.argv.slice(2);
  
  if (myArgs.length < 1) {
    console.log('ERROR: Argument not specified. Specify the path of the HTML file for the body of the email.');
    process.exit(1);
  }
  const renderer = new DSFEmailRenderer();
  // Load template
  const templateContent = await fs.readFile(myArgs[0], 'utf8');
  // Render template
  const htmlBody = renderer.renderFromString(templateContent);

  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.MAILTRAP_USERNAME,
      pass: process.env.MAILTRAP_PASSWORD
    }
  });
  
  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: 'govcy" <noreply@gov.cy>', // sender address
    to: "test@dits.dmrid.gov.cy", // list of receivers
    subject: "{{SERVICE-NAME}}", // Subject line
    // text: `Text`, // plain text body
    html: htmlBody
  });

  console.log("Message sent: %s", info.messageId);

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

// Call testMailtrap() and handle errors
testMailtrap()
    .then(() => {
        console.log('Mailtrap test successful');
    })
    .catch((error) => {
        console.error('An error occurred:', error);
        process.exit(1); // Exit with a non-zero status code
    });