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
  
  if (myArgs.length < 1) {
    console.log('ERROR: Argument not specified. Specify the path of the HTML file for the body of the email.');
    exit(0);
  }
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
    //from: '"Fred Foo 👻" <foo@example.com>', // sender address
    from: 'noreply@dits.dmrid.gov.cy', // sender address
    to: "test@dits.dmrid.gov.cy", // list of receivers
    subject: "{{SERVICE-NAME}}", // Subject line
    text: `
    {{SERVICE-NAME}}
    Αγαπητέ / Αγαπητή {{NAME}},
    Έχουμε λάβει την αίτησή σας
    Η ημερομηνία της αίτησης είναι {{DATE}} και ο αριθμός αναφοράς σας είναι {{REFERENCE NUMBER}}.
    Αν χρειαστούμε οποιοδήποτε άλλο στοιχείο κατά τη διάρκεια εξέτασης της αίτησής σας, θα επικοινωνήσουμε μαζί σας.
    Μετά την ολοκλήρωση της εξέτασης θα σας στείλουμε email και sms για το αποτέλεσμα. Μπορείτε, επίσης, να μάθετεπερισσότερες πληροφορίες για την εγγραφή στον Εκλογικό κατάλογο.
    Πληροφορίες σχετικά με τις εκλογές που διεξάγονται στην Κυπριακή Δημοκρατία, μπορείτε να βρείτε στην ιστοσελίδα της Υπηρεσίας Εκλογών.
    Για θέματα που αφορούν την αίτησή σας, επικοινωνήστε:
    Υπηρεσία Εκλογών
    Email: ElectoralRoll@moi.gov.cy
    Τηλέφωνο: 22867640
    Ωράριο: Δευτέρα με Παρασκευή, 8:00 π.μ. – 3:00 μ.μ.
    Μην απαντήσετε σε αυτό το email.`, // plain text body
    html: fs.readFileSync(myArgs[0])
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

main().catch(console.error);