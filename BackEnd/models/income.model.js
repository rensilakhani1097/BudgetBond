const mongoose = require('mongoose');

const IncomeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Foreign key reference to Users
  amount: { type: Number, required: true },
  source: { type: String, required: true }, // e.g., 'Job', 'Freelancing', etc.
  description: { type: String },
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true }, // Foreign key reference to Categories
  paymentId: { type: String }, // Could reference a Payment model
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
}, {
  timestamps: true
});

module.exports = mongoose.model('Income', IncomeSchema);
