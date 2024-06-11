const express = require('express')
const router = express.Router()
const sendEmailWithAttachment = require('../emails/sendFile')
const File = require('../model/File')





router.post('/sendemail/:filename',async (req,res)=>{
    const email = req.body.email
    const filename = req.params.filename
    const id = req.query.id;  
    try {
        await sendEmailWithAttachment(email, filename)
        res.status(200).send('Email sent successfully');
        await File.findByIdAndUpdate(id, { $inc: { emailSent: 1 } });
    } catch (error) {
        res.status(500).send('Error sending email');
    }
})

module.exports = router