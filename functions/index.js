const { onSchedule } = require('firebase-functions/v2/scheduler');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
require('dotenv').config();

admin.initializeApp();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

exports.sendmonthlyemails = onSchedule(
  {
    schedule: '0 9 1 * *',
    timeZone: 'Europe/Athens',
  },
  async (event) => {
    console.log('start sending emails...');

    try {
      const usersSnapshot = await admin.firestore().collection('users').get();

      for (const userDoc of usersSnapshot.docs) {
        const uid = userDoc.id;
        const userData = userDoc.data();

        const userRecord = await admin.auth().getUser(uid);
        const email = userRecord.email;
        const name = 'User';

        const entries = [];

        for (const [timestamp, entry] of Object.entries(userData)) {
          entries.push({ timestamp, ...entry });
        }

        if (entries.length === 0) continue;

        let emailText = `Dear user,\n\ndon't forget to pay:\n\n`;

        entries.forEach((entry, i) => {
          emailText += `#${i + 1}\n- Timestamp: ${entry.timestamp}\n`;

          for (const [key, value] of Object.entries(entry)) {
            if (key !== 'timestamp') {
              emailText += `  ${key}: ${value}\n`;
            }
          }

          emailText += `\n`;
        });

        emailText += `Thanks for using our app!\nspend team`;

        await transporter.sendMail({
          from: '"spend" <spendwebapp@gmail.com>',
          to: email,
          subject: 'Monthly reminder',
          text: emailText,
        });

        console.log(`Email send to ${email}`);
      }

      return null;
    } catch (err) {
      console.error('❌ error:', err);
    }
  });
