/* eslint-disable no-undef */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const CustomerSchema = new Schema({
    username: {
        type: String,
        required: true,
        
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
        unique: true
    },
    isVerified: { 
        type: Boolean, 
        default: false 
    },
    verificationToken:String,
    verificationTokenExpires:Date,
    forgotPasswordToken:String,
    forgotPasswordExpires:Date,
})

const Customer = mongoose.model("customers", CustomerSchema);

module.exports = Customer;