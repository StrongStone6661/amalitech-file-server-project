const nodemailer = require("nodemailer");

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

const sendverificationemail = (to, token) => {
    const mailOptions = {
      from: 'asantesamuel4@gmail.com',
      to: to,
      subject: 'Email Verification',
      text: `Please verify your email by clicking the following link: http://localhost:3001/api/verify/${token}`

    };
 
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
        console.error('Error sending email:', error);
        } else {
        console.log('Email verification sent:', info.response);
        }
    });
}

module.exports = sendverificationemail;