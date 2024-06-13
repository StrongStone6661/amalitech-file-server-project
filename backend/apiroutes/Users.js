/* eslint-disable no-undef */

const express = require('express');
const router = express.Router();
const Customers = require('../model/Customers')
require('../config/db')
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const jwt = require('jsonwebtoken');
const sendverificationemail = require('../emails/sendVerificationEmail');
const resetpassword = require('../emails/resetPassword');
require('dotenv').config()


////////////////////////////////////
router.post('/signup', async (req, res) => {
        const { username, email, password } = req.body;

        const hashedpassword = await bcrypt.hash(password, 10);

        const token = crypto.randomBytes(16).toString('hex');

    try {
        

        const newCustomer = new Customers({
            username,
            email,
            password:hashedpassword,
            verificationToken:token,
            verificationTokenExpires:Date.now()+ 3600000   
        });


        const user = await Customers.findOne({email})

        if(user){
            res.json({ message: 'User already exists'})   
        }else{
            await newCustomer.save()
            .then(() => {
                res.status(200).json({ message: 'Check your email for verification' });
                sendverificationemail(email,token)
            })
            .catch((err) => {
                res.status(400).json({ message: 'An error Occurred' });
            });
        }   
    } catch (error) {
        
        res.status(500).json({ message: 'Internal Server Error 2' });
    }
});

router.get('/verify/:token',async (req,res)=>{
    try{
        const user = await Customers.findOne({
            verificationToken: req.params.token,
            verificationTokenExpires: {$gt:Date.now()}
        })

        if(!user){
            return res.status(400).send('Verification link is expired or incorrect')
        }

        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpires = undefined;

        await user.save()

        res.redirect('http://localhost:5173');
        

    }catch(err){
        res.status(400).send(err)
    }
})

router.post('/login', async (req, res) => {
  try{
        const {email,password} = req.body;
        //check if user exists
        const customer = await Customers.findOne({email})
        if(!customer){
            res.status(400).json({message:'User does not exist please register'})
        }else{
            if(customer.isVerified === true){
                const isMatch = await bcrypt.compare(password,customer.password)
                if(isMatch){
                    const token = jwt.sign({ id: customer._id, email: customer.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
                    res.status(200).json({ message: 'Signin Successful', token });
                }else{
                    res.status(400).json({message:'Invalid Credentials,wrong password'})
                }
            }else{
                res.status(400).json({message:'User is not verified,please verify your email'})
            } 
        }  
    }catch(err){
        res.status(400).send(err)
    }
})

router.post('/forget-password', async (req, res)=>{
    try{
        const email =req.body.email
        const token = crypto.randomBytes(8).toString('hex')
        const user = await Customers.findOne({email})
        if(!user){
            res.status(400).json({message:'User does not exist the our database, make sure you register'})
        }

        user.forgotPasswordToken = token;
        user.forgotPasswordExpires = Date.now() + 3600000 
        
        await user.save()
        .then(()=>{
            resetpassword(email,token)
            res.status(200).json({message:'Please check your email for the reset link'})
        }).catch((err)=>{
            res.status(400).json({message:'Something went wrong',err})
        })

    }catch(err){
        res.status(400).json({message:'Something went wrong'})
    }
})



router.post('/reset-password/:token', async (req, res) => {
    const { token } = req.params;
  const { password } = req.body; 
  
    try {
      const user = await Customers.findOne({
        forgotPasswordToken:token,
        forgotPasswordExpires: {$gt: Date.now()}, 
      });
  
      if (!user) {
        return res.status(400).send('Password reset token is invalid or has expired.');
      }
      
      const hashedpassword = await bcrypt.hash(password, 10);
      const newpassword = await Customers.findOneAndUpdate(
        { forgotPasswordToken: token },
        { $set: { password: hashedpassword, forgotPasswordToken: undefined, forgotPasswordExpires: undefined } },
        { new: true }
      );
      if(newpassword){
        res.status(200).json({message:'Password reset successful'})
      }
      
     
    } catch (error) {
      res.status(500).send('Internal server error');
    }
  });




module.exports = router;