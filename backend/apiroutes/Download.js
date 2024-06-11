/* eslint-disable no-undef */
const express = require('express')
const router = express.Router()
const File = require('../model/File')
const path = require('path');
const cors = require('cors')

router.use(cors())


router.get('/download/:filename', async (req,res)=>{
        const filename = req.params.filename
        const id = req.query.id;   
  
        try {
          
        const filePath = path.join(__dirname, '../uploads/', filename);
        res.download(filePath,filename, (err) => {
            if (err) {
              console.error("Error while downloading the file:", err);
              res.status(500).send("Error while downloading the file.");
            }

            
          });
          await File.findByIdAndUpdate(id, { $inc: { downloads: 1 } });
     } catch (error) {
        res.send(error)
     }
    
})





module.exports = router




