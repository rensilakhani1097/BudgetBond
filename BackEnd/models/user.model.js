const mongoose = require('mongoose');

const userschema = new mongoose.Schema({
    username:
    {
        type: String, 
        required: true, 
        unique: true
    },
    firstname: 
    { 
        type: String, 
        required: true 
    },
    lastname: { 
        type: String, 
        required: true 
    },
    email: 
    { 
        type: String, 
        required: true, 
        unique: true 
    },
    mobileno: 
    { 
        type: Number
    },
    password: 
    { 
        type: String, 
        required: true
    },
    googleId: 
    { 
        type: String 
    },
    address: 
    { 
        type: String 
    },
    image: 
    { 
        type: String 
    },
    secret_key: 
    { 
        type: String 
    },
    status: 
    { 
        type: String, 
        enum: ['Active', 'Inactive', 'Suspended'], 
        default: 'Active' 
    },
    lastlogin: 
    { 
        type: Date 
    },
    created_on: 
    { 
        type: Date, 
        default: Date.now 
    },
    updated_on: 
    { 
        type: Date, 
        default: Date.now 
    },
    roleId: 
    { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Role' 
    },
    headOfFamilyId: 
    { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    }
}, {
    timestamps: true,
    collection: 'user'
});
userschema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  });

module.exports = mongoose.model('User', userschema);
