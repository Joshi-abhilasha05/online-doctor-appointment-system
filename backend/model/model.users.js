const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define the schema
const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    phone_number: { type: String, required: true },
    address: { type: String, required: true },
    type: { type: String, enum: ['admin', 'patient', 'doctor'], required: true }
});

// Hash password before saving the user
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next(); // Skip hashing if password is not modified
    try {
        const salt = await bcrypt.genSalt(10); // Generate salt
        const hashedPassword = await bcrypt.hash(this.password, salt); // Hash the password
        this.password = hashedPassword; // Assign hashed password to the user's password
        next(); // Proceed with saving the user
    } catch (error) {
        next(error); // Handle errors
    }
});

// Create the model
const User = mongoose.model('User', userSchema);

module.exports = User;
