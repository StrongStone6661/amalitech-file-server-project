const express = require('express')
const router = express.Router()
const sendEmailWithAttachment = require('../emails/sendFile')
const File = require('../model/File')





router.post('/sendemail/:filename',async (req,res)=>{
    //extract filename email and id from the request
    const email = req.body.email
    const filename = req.params.filename
    const id = req.query.id;  
    try {
        // Send email with attachment
        await sendEmailWithAttachment(email, filename)
        res.status(200).send('Email sent successfully');
            
        // Update database (increment emailSent field by 1)
        await File.findByIdAndUpdate(id, { $inc: { emailSent: 1 } });
    } catch (error) {
        res.status(500).send('Error sending email');
    }
})

module.exports = router