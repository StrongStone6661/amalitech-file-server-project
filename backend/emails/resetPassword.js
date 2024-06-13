/* eslint-disable no-undef */
const nodemailer = require('nodemailer')


const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    ignoreTLS: false,
    secure: false,
    auth: {
        user: "asantesamuel4@gmail.com",
        pass: "kpla cwru qxyy pxkj",
    },
});

const resetpassword = (to, token) => {
    const mailOptions = {
      from: 'asantesamuel4@gmail.com',
      to: to,
      subject: 'Password Reset',
      text: `To reset the password clicking the following link But if this is not requested by You then you are free to ignore this : http://localhost:5173/reset-password/${token} `

    };
 
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
        console.error('Error sending email:', error);
        } else {
        console.log('Reset Email sent:', info.response);
        }
    });
}

module.exports = resetpassword;