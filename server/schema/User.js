const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, 'Full Name is required'], // Required field as per signup form
        trim: true,
        maxlength: [50, 'Full Name cannot exceed 50 characters'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'], // Required for login and signup
        unique: true, // Ensures no duplicate emails
        trim: true,
        lowercase: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email address'],
    },
    password: {
        type: String,
        required: [true, 'Password is required'], // Required for login and signup
        minlength: [6, 'Password must be at least 6 characters long'],
    },
    phoneNumber: {
        type: String,
        required: [true, 'Phone Number is required'], // Required as per signup form
        match: [/^\+?(\d{1,3})?[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/, 'Please provide a valid phone number'],
    },
    gender: {
        type: String,
        required: [true, 'Gender is required'], // Required as per signup form
        enum: ['male', 'female', 'other'], // Options from signup form
    },
    dob: {
        type: Date,
        required: [true, 'Date of Birth is required'], // Required as per signup form
    },
    type: {
        type: String,
        default: 'user', // Default type as per HealthMate design
        enum: ['user', 'admin'], // Can be extended for future roles
    },
    isVerified: {
        type: Boolean,
        default: false, // Tracks OTP verification status
    },
    createdAt: {
        type: Date,
        default: Date.now, // Tracks when user signed up
    },
    lastLogin: {
        type: Date, // Tracks last login time
    },
});

// Pre-save hook to hash password before saving
userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

// Method to compare password for login
userSchema.methods.comparePassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);