const mongoose = require('mongoose');

const RoleSchema = new mongoose.Schema({
  roleName: { type: String, required: true, unique: true },
  description: { type: String }
}, {
  timestamps: true // Automatically creates createdAt and updatedAt fields
});

module.exports = mongoose.model('Role', RoleSchema);
