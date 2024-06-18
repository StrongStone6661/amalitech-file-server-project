const express = require('express')
const router  = express.Router()
const Admin = require('../model/authAdmin')
const bcrypt = require('bcrypt')
require('dotenv').config()
const jwt = require('jsonwebtoken')
require('../config/db')





router.post('/signup', async(req,res)=>{
    const {name,email,password} = req.body
    const hashedpassword = await bcrypt.hash(password, 10);
    try{
        
        const admin = await Admin.findOne({email:email})
        if(admin){
            res.status(400).json({msg:"Admin already exists"})
        }
        const newAdmin = new Admin({
            name,
            email,
            password:hashedpassword,
        })
       
        await newAdmin.save().then(()=>{
            res.status(200).json({msg:"admin added"})
        }).catch((err) => {
            res.status(400).json({ message: 'An error Occurred adding admin' });
        });
    }catch{
        res.status(500).json({msg:"Server error"})
    }
    
})


router.post('/login', async (req, res) => {
    const rawPassword = req.body.password;
    console.log('Received password:', rawPassword);
    try {
        const admin = await Admin.findOne(); 
        if (!admin) {
            return res.status(404).json({ msg: "Admin not found" });
        }

        console.log('Admin password from DB:', admin.password);

        const match = await bcrypt.compare(rawPassword, admin.password);
        if (match) {
            const token = jwt.sign({ id: admin._id, email: admin.email }, process.env.ADMIN_JWT_SECRET, { expiresIn: '4h' });
            res.status(200).json({ message: 'Signin Successful', token, admin });
        } else {
            return res.status(401).json({ msg: "Incorrect password" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server error" });
    }
});


module.exports = router