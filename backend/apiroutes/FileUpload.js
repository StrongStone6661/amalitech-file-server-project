/* eslint-disable no-undef */
const express = require('express')
const router = express.Router()
const multer = require('multer')
const File = require('../model/File')
require('dotenv').config()
require('../config/db')
const path = require('path')


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/")
      },
      filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname)
      },
})

const uploadStorage = multer({ storage: storage })



// Single file
router.post("/singlefile", uploadStorage.single("file"), (req, res) => {
  
  // Get the title and description from the request body
  const {title,description} = req.body

  const thefile = req.file  // Get the file from the request

  // Create a new File 
  const file = new File({
    title,
    description,
    filePath: thefile.filename
  })
  
  file.save()

  //return a success message
  if(file){
    return res.status(200).json({message: "success"})
  }else{
    //return a failed upload message
    res.json({message:'failed to upload'})
  }
})


module.exports = router