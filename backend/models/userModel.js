const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


// Define user schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
    password: {
        type: String,
        required: true
    }
});

userSchema.pre('save', async function(next){
    const salt = 10;
    this.password = await bcrypt.hash(this.password, 10);
    next();
});


const User = mongoose.model('User', userSchema);

module.exports = User;

