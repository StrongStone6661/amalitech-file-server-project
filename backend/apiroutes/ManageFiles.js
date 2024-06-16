const express = require('express')
const router  =  express.Router()
require('dotenv').config()
const File = require('../model/File')
require('../config/db')


router.get('/delete/:id',async (req,res)=>{
    const id = req.params.id
    const file = await File.findByIdAndDelete(id)
    res.send(file)
})

module.exports = router