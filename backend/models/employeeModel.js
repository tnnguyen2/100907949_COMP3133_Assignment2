const mongoose = require('mongoose');

// Define employee schema
const employeeSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        required: true,
        set: (value) => value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
    },
    salary: {
        type: Number,
        required: true
    }
});


const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;

