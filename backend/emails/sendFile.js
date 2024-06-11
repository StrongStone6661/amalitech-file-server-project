const nodemailer = require('nodemailer')
const path = require('path')


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

const sendEmailWithAttachment = async (recipientEmail, filename) => {
    
     const filePath = path.join(__dirname, '../uploads/', filename);

    // Set up email data with unicode symbols
    const mailOptions = {
        from: 'asantesamuel4@gmail.com',         // Sender address
        to: recipientEmail,                   // List of recipients
        subject: 'Lizzy Ventures',           // Subject line
        text: 'Please find the attached file.', // Plain text body
        attachments: [
            {
                filename: filename,
                path: filePath
            }
        ]
    };

    // Send mail with defined transport object
    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

module.exports = sendEmailWithAttachment