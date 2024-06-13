/* eslint-disable no-undef */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const CustomerSchema = new Schema({
    name: {
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
    }
})

const Customer = mongoose.model("admin", CustomerSchema);

module.exports = Customer;