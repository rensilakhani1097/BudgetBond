const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
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
        type: String
    },
    passwordHash: 
    { 
        type: String, 
        required: true
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
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);
