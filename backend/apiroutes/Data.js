const express = require('express')
const router = express.Router()
const File = require('../model/File')
require('dotenv').config()
require('../config/db')
const authenticateToken = require('../middleware/auth')



router.get('/allfiles',authenticateToken,async (req,res)=>{
    try{
        const allfiles = await File.find({})
        if(!allfiles){
            res.json({message:'no files uploaded'})
        }

        res.json(allfiles)

    }catch(err){
        res.status(400).json({ message: err.message });
    }
})



module.exports = router