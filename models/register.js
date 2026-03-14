const mongoose = require('mongoose');
const registerSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    voterId: {
        type: String,
        required: true,
        unique: true
    },
    aadhar: {
        type: String,
        required: true,
        unique: true
    },
    mobile: {
        type: String,
        required: true
    },
    fatherName: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    pincode: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Register', registerSchema);